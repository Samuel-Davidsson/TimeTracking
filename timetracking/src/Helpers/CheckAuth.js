const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return localStorage.clear()((window.location.href = "/Timetracker/"));
  }
  return true;
};
export default checkAuth;
