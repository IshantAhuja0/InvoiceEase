import { getDB } from '../../Backend/Mongo/mongo.js';
const storeInvoice = async (req, res) => {
  try {
    let { firmInfo, customerInfo, invoiceMeta, items } = req.body
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
      firmEmail: firmInfo.firmEmail, // Store email for linkage
      firmInfo,
      customerInfo,
      invoiceMeta,
      items,
      createdAt: new Date()         // Store timestamp
    });
    if (!result) {
      return res.status(200).send({
        status: 200,
        message: "Invoice stored in DB successfully",
        invoiceId: result.insertedId,
      });

    }
    res.send({
      status: 200,
      message: "Invoice store in db successful",
      result: result
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
export default storeInvoice;