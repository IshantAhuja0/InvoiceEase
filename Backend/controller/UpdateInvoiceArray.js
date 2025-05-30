import { getDB } from "../Mongo/mongo.js"
const updateInvoiceArray = async (req, res) => {
  try {
    const email = req.params.email
    const { invoiceId } = req.body
    if (!email || !invoiceId) {
      return res.status(401).json({ status: 401, message: "userId or invoiceId not provided. Invalid credentials" })
    }
    const db = await getDB()
    const collection =await  db.collection('register_users')
    const result = await collection.updateOne(
      { email: email },
      { $push: { invoices: invoiceId } }
    )
    return res.status(200).json({status:200,message:"Invoices array updated successfully"})
  } catch (error) {
return res.status(500).json({status:500,message:"Internal server error while updating invoices array"})
  }
}
export default updateInvoiceArray