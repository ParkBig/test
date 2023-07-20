import ToSignUp from "../components/loginSignupPage/ToSignUp";

const SignUp = () => {
  if (localStorage.getItem("access_token")) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  return (
    <ToSignUp />
  );
}

export default SignUp;