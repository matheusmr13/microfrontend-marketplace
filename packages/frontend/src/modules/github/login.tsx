import React, { useEffect } from "react";

import useLoggedUser from "base/hooks/user";

import { Redirect, useLocation } from "react-router-dom";

import { useApiRequest } from "base/hooks/request";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Login(props: { handleLogin: Function }) {
  const { handleLogin } = props;
  const query = useQuery();
  const code = query.get("code");
  const [{ data, loading, error }, refetch] = useApiRequest({
    url: `/oauth/github?code=${code}`,
    method: "POST",
  });

  useEffect(() => {
    if (data) {
      handleLogin(data);
    }
  })

  return <div>Loading</div>;
}

export default Login;
