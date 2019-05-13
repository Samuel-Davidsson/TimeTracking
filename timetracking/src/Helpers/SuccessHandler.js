import { toast } from "react-toastify";
const successHandler = () => {
  toast.success("Uppgifterna har sparats!");
  setTimeout(() => {}, 5000);
};
export default successHandler;
