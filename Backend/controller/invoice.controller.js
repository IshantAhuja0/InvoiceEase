import { getDB } from "../Mongo/mongo.js"
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
const storeInvoice = async (req, res) => {
  try {
    let { firmInfo, customerInfo, invoiceMeta, items, authorEmail } = req.body
    console.log(authorEmail)
    // Optional: Validate required fields
    if (!firmInfo?.firmEmail || !customerInfo?.customerEmail || !items || items.length === 0) {
      return res.status(400).send({
        status: 400,
        message: "Missing required invoice fields.",
      });
    }

    let db = await getDB()
    let collection = db.collection('invoices')

    const result = await collection.insertOne({
      authorEmail, // Store email for linkage
      firmInfo,
      customerInfo,
      invoiceMeta,
      items,
      createdAt: new Date()         // Store timestamp
    });
    if (!result.acknowledged) {
      return res.status(200).send({
        status: 200,
        message: "Invoice stored in DB successfully",
        invoiceId: result.insertedId,
      });

    }
    res.send({
      status: 200,
      message: "Invoice store in db successful",
      result: result,
      insertedId: result.insertedId
    })
  }
  catch (err) {
    console.log("error catched while storing incoive to db in StroreInvoice.js line23")
    return res.status(500).send({
      status: 500,
      message: "Internal server error while storing invoice",
      error: err.message
    });
  }
}
const updateInvoiceArray = async (req, res) => {
  try {
    const email = req.params.email; // ✅ or req.body.email if needed
    const { invoiceId } = req.body;

    if (!email || !invoiceId) {
      return res.status(401).json({
        status: 401,
        message: "Email or invoiceId not provided. Invalid credentials",
      });
    }

    const db = await getDB();
    const collection = db.collection("register_users");

    const result = await collection.updateOne(
      { email: email },
      { $addToSet: { invoices: invoiceId } } // prevent duplicates
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Invoices array updated successfully",
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while updating invoices array",
    });
  }
};

const getInvoiceArray = async (req, res) => {
  try {
    const email = req.params.email
    console.log(email)
    if (!email) return res.status(401).json({ status: 401, message: "failed to fetch invoice array ,email not provided. " })

    const db = await getDB()
    const collection = db.collection("register_users")
    const result = await collection.findOne({ email: email })
    if (!result) return res.status(401).json({ status: 401, message: "failed to fetch invoice array ,provided email is not correct or not registered in db." })
    if (!result.invoices) {
      res.status(200).json({ status: 200, message: "no stored invoice to return.", invoices: [] })
    }
    //function to convert ids to get full invoice records
    const ids = result.invoices
    const invoices = await objectIdToInvoices(ids)
    res.status(200).json({ status: 200, message: "successfully fetched all invoices of user", invoices: invoices })

  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal server error. failed to fetch invoice array ." })
  }
}
//this is not a controller but a function used in getInvoiceArray
const objectIdToInvoices = async (ids) => {
  try {
    const db = await getDB()
    const collection = db.collection("invoices")
    //this just converts id of string to actual datatype of id and now we have objectIds that can direclty be searched in db.
    const objectIds = ids.map((id) => new ObjectId(id));

    //  Perform a single query with `$in` (1 DB call)
    //objectIds is a array that contains actual object id that can be searched as it is.
    const results = await collection.find({ _id: { $in: objectIds } }).toArray();

    return results
  } catch (error) {
    console.log("conversion from ids to invoices failed in objectIdToInvoices function")
  }
}
export { getInvoiceArray, storeInvoice, updateInvoiceArray }