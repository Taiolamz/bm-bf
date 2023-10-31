import Login from "../../components/pages/auth/login/login";
import ForgotPassword from "../../components/pages/auth/forgotPassword/forgot-password";
import NewPassword from "../../components/pages/auth/newPassword/new-password";

export const Auth_rouite_group = [
  {
    path: "/login",
    element: Login ,
  },
  {
    path: "/forgot-password",
    element: ForgotPassword ,
  },
  {
    path: "/new-password",
    element: NewPassword ,
  },
];
