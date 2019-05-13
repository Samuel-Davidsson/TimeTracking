import { toast } from "react-toastify";

const errorHandler = error => {
  debugger;
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      toast.error("Token has expired logging you out in 5sec..") &
      setTimeout(() => {
        window.location.href = "/Timetracker/";
      }, 5000)
    );
  } else return toast.error(error);
};
export default errorHandler;
