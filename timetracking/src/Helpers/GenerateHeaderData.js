const generateHeaderData = () => {
  var token = localStorage.getItem("token");

  return {
    "content-type": "application/json",
    authorization: `Bearer ${token}`
  };
};
export default generateHeaderData;
