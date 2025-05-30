import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function checkJWT() {
  const userdataRaw = localStorage.getItem('user data');
  if (!userdataRaw) return { valid: false, reason: 'No user data in storage' };

  try {
    const userdata = JSON.parse(userdataRaw);
    const token = userdata?.token;
    const autherEmail = userdata?.email
    if (!token) return { valid: false, reason: 'No token found' };

    const decoded = jwtDecode(token);

    // Check if expired
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
    if (decoded.exp < currentTime) {
      localStorage.removeItem('user data');
      return { valid: false, reason: 'Token expired' };
    }

    return { valid: true, user: decoded, token, autherEmail };
  } catch (err) {
    localStorage.removeItem('user data');
    return { valid: false, reason: 'Invalid token' };
  }
}

const storeInvoice = async (dataStoringInvoice) => {
  console.log("Storing in DB...");
  try {
    const jwtStatus = checkJWT();
    if (!jwtStatus.valid) {
      console.warn("JWT invalid:", jwtStatus.reason);
      return { status: 401, message: jwtStatus.reason };
    }

    const { token, autherEmail } = jwtStatus;
    console.log(token, autherEmail)
    const bodyWithToken = { ...dataStoringInvoice, token, autherEmail }
    const response = await axios.post(
      'http://localhost:5000/api/protected/storeinvoice',
      bodyWithToken,
    );

    console.log("Response status for storing invoice:", response.status);

    //update the owner's record to store id of invoice
    const email = autherEmail;
    const invoiceId = response.data.insertedId;
    console.log("details for storing invoice array "+email+invoiceId)

    const encodedEmail = encodeURIComponent(email);
    const updateOwnerRecord = await axios.patch(`http://localhost:5000/api/protected/updateinvoicearray/${encodedEmail}`, { invoiceId, token })
    if (!updateOwnerRecord) return { status: 500, message: "Failed to update invoices array while adding in owner's record" };
    return { status: 200, message: "Invoice stored successfully" };
  } catch (error) {
    console.log("Axios error:", error);
    return error.response || { status: 500, message: "Unexpected error" };
  }
};

export default storeInvoice;
