const getCurrentUser = () => {
  // console.log(localStorage.getItem("currentUser"))
  return JSON.parse(localStorage.getItem("currentUser"));
};

export default getCurrentUser