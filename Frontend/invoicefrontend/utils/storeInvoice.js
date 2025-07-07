import axios from 'axios';

const storeInvoice = async (dataStoringInvoice) => {
  console.log("Storing in DB...");

  try {
    const baseurl = import.meta.env.VITE_BACKEND_PROTECTED_URL;
    // Send invoice data to server
    const bodyWithEmail = { ...dataStoringInvoice };
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
