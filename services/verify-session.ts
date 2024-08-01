import { post } from "@/utils/fetch";

export default function verifySession() {
  try {
    post(`${process.env.API_URL}verify-session`, {})
      .then((data) => {
        if (data.status === 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  } catch (error) {
    return false;
  }
}
