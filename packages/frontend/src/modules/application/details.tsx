import React from "react";

import { useLoggedApiRequest } from "base/hooks/request";
import { useParams, Link } from "react-router-dom";

import ApplicationForm from "./form";
import { Form, Input, Button, Select, Card, Typography, Divider } from "antd";

function ApplicationDetails() {
  let { applicationId } = useParams();
  const [{ data: application, loading, error }, refetch] = useLoggedApiRequest(
    `/applications/${applicationId}`
  );

  if (loading) return <div>loading</div>;

  return (
    <div>
      {/* <a target="_blank" href={`http://localhost:8080/applications/${applicationId}/meta`}> Meta.json</a> */}
      <ApplicationForm application={application} />
    </div>
  );
}

export default ApplicationDetails;
