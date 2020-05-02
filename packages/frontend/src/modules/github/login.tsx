import React from "react";

import useLoggedUser from "base/hooks/user";

import { Redirect, useLocation } from "react-router-dom";

import { useApiRequest } from "base/hooks/request";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Login() {
  const [auth, setAuth] = useLoggedUser();
  const query = useQuery();
  const code = query.get("code");
  const [{ data, loading, error }, refetch] = useApiRequest({
    url: `/oauth/github?code=${code}`,
    method: "POST",
  });

  if (auth) {
    return <Redirect to="/home" />;
  }

  if (data) {
    setAuth(data);
    return <Redirect to="/home" />;
  }

  // if (error) {
  //   console.info(error);
  //   window.location.href = '/';
  // }

  return <div>hue</div>;
}

export default Login;
