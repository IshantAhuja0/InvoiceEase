import { getDB } from "../Mongo/mongo.js"
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
const storeInvoice = async (req, res) => {
  const session = (await getDB()).client.startSession(); // Start Mongo session

  try {
    let { firmInfo, customerInfo, invoiceMeta, items } = req.body || {};
    let authorEmail = req.user.email;

    if (!firmInfo?.firmEmail || !customerInfo?.customerEmail || !items?.length) {
      return res.status(400).send({ status: 400, message: "Missing required invoice fields." });
    }

    const db = await getDB();
    const invoices = db.collection('invoices');
    const users = db.collection('register_users');

    let insertedInvoiceId;

    await session.withTransaction(async () => {
      // 1. Insert invoice
      const result = await invoices.insertOne({
        authorEmail,
        firmInfo,
        customerInfo,
        invoiceMeta,
        items,
        createdAt: new Date()
      }, { session });

      if (!result.acknowledged) {
        throw new Error("Invoice insert failed");
      }

      insertedInvoiceId = result.insertedId;

      // 2. Update user
      const resultUser = await users.updateOne(
        { email: authorEmail },
        { $addToSet: { invoices: insertedInvoiceId } },
        { session }
      );

      if (resultUser.matchedCount === 0) {
        throw new Error("User not found");
      }
    });

    // If we reach here, everything in transaction succeeded
    return res.status(200).send({
      status: 200,
      message: "Invoice stored and user updated successfully",
      invoiceId: insertedInvoiceId,
    });

  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Failed to store invoice",
      error: err.message
    });
  } finally {
    await session.endSession(); // Always end the session
  }
};

const getInvoiceArray = async (req, res) => {
  try {
    const email = req.user.email
    if (!email) return res.status(401).json({ status: 401, message: "failed to fetch invoice array ,email not provided. " })

    const db = await getDB()
    const collection = db.collection("register_users")
    const result = await collection.findOne({ email: email })
    if (!result) return res.status(401).json({ status: 401, message: "failed to fetch invoice array ,provided email is not correct or not registered in db." })
    if (!result.invoices) {
      return res.status(200).json({ status: 200, message: "no stored invoice to return.", invoices: [] })
    }
    //function to convert ids to get full invoice records
    const ids = result.invoices
    const invoices = await objectIdToInvoices(ids)
    return res.status(200).json({ status: 200, message: "successfully fetched all invoices of user", invoices: invoices })

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
    return res.status(500).json({ status: 500, message: "internal server error occured while converting object ids to invoices" })
  }
}
const getInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id
    if (!invoiceId) return res.status(401).json({ status: 401, message: "invoice id is required to fetch invoice" })
    const db = await getDB()
    const collection = db.collection("invoices")
    const result = await collection.findOne({ _id: invoiceId })
    if (!result) return res.status(404).json({ status: 404, message: "failed to fetch invoice . invalid invoice id" })
    return res.status(200).json({ status: 200, message: "invoice fetched successfully", data: result })
  } catch (error) {
    return res.status(500).json({ status: 500, message: "failed to fetch invoice . Internal server error" })
  }
}

const deleteInvoice = async (req, res) => {
  try {
    const  authorEmail  = req.user.email;
    const invoiceId = req.params.id;

    if (!invoiceId) return res.status(401).json({ status: 401, message: "invoice id is required to delete invoice" });
    if (!authorEmail) return res.status(401).json({ status: 401, message: "author email is required to delete invoice" });

    const db = await getDB();
    const collection = db.collection("invoices");

    // Delete invoice document
    const result = await collection.deleteOne({ _id: new ObjectId(invoiceId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ status: 404, message: "failed to delete invoice. invalid invoice id" });
    }

    // Remove from user's invoice array
    const authorCollection = db.collection("register_users");
    const removeFromUser = await authorCollection.updateOne(
      { email: authorEmail },
      { $pull: { invoices: invoiceId } }
    );

    if (removeFromUser.modifiedCount === 0) {
      return res.status(404).json({ status: 404, message: "failed to delete invoiceId from user's invoice array" });
    }

    return res.status(200).json({ status: 200, message: "invoice deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "failed to delete invoice. Internal server error" });
  }
};


export { getInvoiceArray, storeInvoice, getInvoice, deleteInvoice }