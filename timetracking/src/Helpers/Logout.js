const logout = () => {
  localStorage.clear();
  window.location.href = "/timetracker";
};

export default logout;
