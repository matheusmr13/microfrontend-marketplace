
import React from 'react';

import useAxios from 'axios-hooks';
import {
	useParams,
  } from "react-router-dom";

  import ApplicationForm from './form';

  
function ApplicationDetails () {
	let { applicationId } = useParams();
	const [{ data : application, loading, error }, refetch] = useAxios(`/applications/${applicationId}`);


	if (loading) return <div>loading</div>;

	return (
	<ApplicationForm application={application} />  
	);
  }

  export default ApplicationDetails