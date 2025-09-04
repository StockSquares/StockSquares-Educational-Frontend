import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import Cookies from "js-cookie";
import { useLoginData } from "./useLoginData";
import { useAuth } from "../../Context/AuthContext";
import { FormValidation } from "../../components/general/formValidation/FormValidation";
import LoginUi from "./LoginUi";
import * as Yup from "yup";

const loginForm = Yup.object().shape({
  email: FormValidation.email,
  password: FormValidation.password,
});

function Login() {
  const login = useLoginData();
  const navigate = useNavigate();
  const { setDecodedUser } = useAuth();
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (updatedData) => {
    try {
      const res = await login.mutateAsync({
        url: "https://stocksquare1.runasp.net/api/Account/Login",
        updatedData,
      });

      setIsError(false);

      setDecodedUser(res.data["token"]);
      // Cookies.set("token", res.data["token"]);
      // navigate(ROUTES.HOME);
      navigate(`/${res.data['role']}`);

    } catch (e) {
      console.log("error sendind");
      setIsError(true);
    }
  };
  return (
    <LoginUi
      loginForm={loginForm}
      isError={isError}
      handleSubmit={handleSubmit}
    />
  );
}

export default Login;
