const GenerateHeaderData = () => {
  var token = localStorage.getItem("token");

  return {
    "content-type": "application/json",
    authorization: `Bearer ${token}`
  };
};
export default GenerateHeaderData;
