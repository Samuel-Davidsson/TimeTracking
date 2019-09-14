const logout = () => {
  localStorage.clear();
  window.location.href = "/Timetracker";
};

export default logout;
