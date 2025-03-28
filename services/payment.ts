import { Root } from "@/interfaces/PaymentResponse";
import { get } from "@/utils/fetch";

const initiatePayment = async (
  userId: string,
  subscriptionId: number,
  couponCode?: string
): Promise<Root | null> => {
  console.log("Received in initiatePayment:", { userId, subscriptionId, couponCode });

  try {
    let url = `${process.env.API_URL}initiate-payment?user_id=${userId}&subscription_id=${subscriptionId}`;
    
    if (couponCode) {
      url += `&coupon_id=${couponCode}`;
    }

    console.log("Final API URL:", url); // ✅ Check if couponCode is included

    const response = await get(url);
    return response?.response ? response : null;
  } catch (error) {
    console.error("Error initiating payment:", error);
    return null;
  }
};

export default initiatePayment;
