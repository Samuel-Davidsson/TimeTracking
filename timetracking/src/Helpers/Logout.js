const Logout = () => {
  localStorage.clear();
  window.location.href = "/timetracker";
};

export default Logout;
