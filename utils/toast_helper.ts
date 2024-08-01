//* importing TOast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//* Success Toast
const successToast = (
  message: string,
  duration = 2000,
  position = "top-right"
) => {
  toast.success(message, {
    position: <any>position,
    autoClose: duration,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

//* Error Toast
const errorToast = (
  message: string,
  duration = 2000,
  position = "top-right"
) => {
  toast.error(message, {
    position: <any>position,
    autoClose: duration,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export { successToast, errorToast };
