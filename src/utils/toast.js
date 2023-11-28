import { toast } from "react-toastify";


export function toastSuccess(message) {
  toast.success(message, {
    position: "top-center",
    autoClose: 3500,
    hideProgressBar: false,
    pauseOnHover: false,
    theme: "dark",
  });
}

export function toastError(message) {
  toast.error(message, {
    position: "top-center",
    autoClose: 3500,
    hideProgressBar: false,
    pauseOnHover: false,
    theme: "dark",
  });
}

export function toastWarning(message) {
  toast.warning(message, {
    position: "top-center",
    autoClose: 3500,
    hideProgressBar: false,
    pauseOnHover: false,
    theme: "dark",
  });
}