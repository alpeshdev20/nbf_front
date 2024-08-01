import { Root } from "@/interfaces/PaymentResponse";
import { get } from "@/utils/fetch";

const initiatePayment = async (
  userId: string,
  subscriptionId: number
): Promise<Root | null> => {
  try {
    const response = await get(
      `${process.env.API_URL}initiate-payment?user_id=${userId}&subscription_id=${subscriptionId}`
    );
    return response?.response ? response : null;
  } catch (error) {
    console.error("Error initiating payment:", error);
    return null;
  }
};

export default initiatePayment;
