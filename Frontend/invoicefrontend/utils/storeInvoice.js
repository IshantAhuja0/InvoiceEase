import axios from 'axios';

const storeInvoice = async (dataStoringInvoice) => {
  console.log("Storing in DB...");

  try {
            const baseurl = import.meta.env.VITE_BACKEND_PROTECTED_URL;
        console.log("base" + baseurl);
    const userdataRaw = sessionStorage.getItem("user data");
    const userdata = JSON.parse(userdataRaw);
    const authorEmail = userdata?.email;

    if (!authorEmail) {
      throw new Error("Author email missing from localStorage");
    }
    // Send invoice data to server
    const bodyWithEmail = { ...dataStoringInvoice, authorEmail };
    console.log(bodyWithEmail)
    const response = await axios.post(
      `${baseurl}/storeinvoice`,
      bodyWithEmail,
      {
        withCredentials: true, // ✅ required for sending cookie
        timeout: 10000
      }
    );

    console.log("Invoice stored, status:", response.status);

    // Update owner's invoice list
    const invoiceId = response.data.insertedId;
    console.log("Updating invoice array for:", authorEmail, invoiceId);

    const encodedEmail = encodeURIComponent(authorEmail);

    const updateOwnerRecord = await axios.patch(
      `${baseurl}/updateinvoicearray/${encodedEmail}`,
      { invoiceId },
      {
        withCredentials: true, // ✅ include cookie in PATCH too
        timeout: 5000
      }
    );

    console.log("Invoice array updated, status:", updateOwnerRecord.status);

    return {
      status: 200,
      message: "Invoice stored and owner record updated successfully",
    };

  } catch (error) {
    console.error("❌ Error in storing invoice or updating array:", error.message);
    return error.response || { status: 500, message: "Unexpected error occurred" };
  }
};

export { storeInvoice };
