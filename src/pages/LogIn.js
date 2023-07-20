import ToLogIn from "../components/loginSignupPage/ToLogIn";

const LogIn = () => {
  if (localStorage.getItem("access_token")) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  return (
    <ToLogIn />
  );
}

export default LogIn;