import { toast } from "react-toastify";

const errorHandler = error => {
  const token = localStorage.getItem("token");
  if (!token && error === "") {
    return (
      toast.error("Token has expired logging you out in 5sec..") &
      setTimeout(() => {
        window.location.href = "/timetracker";
      }, 5000)
    );
  } else return toast.error(error);
};
export default errorHandler;
