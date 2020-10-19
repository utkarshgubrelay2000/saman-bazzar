import React, {  useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
function Auth(props) {
  const [redirect, setRedirect] = useState(null);

  var OPTIONS = {
    method: "POST",
    data: { token: props.match.params.id },
    url: "http://localhost:8080/admin/verification",
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("signup");
  Axios(OPTIONS)
    .then((response) => {
      console.log(response.data);
      if (response.data.succes) {
        localStorage.setItem("verficationuserId", response.data.succes);
        setRedirect(response.data.succes);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return <>{redirect ? <Redirect to="/" /> : "Redirecting"}</>;
}
export default Auth;
