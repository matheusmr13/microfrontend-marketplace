import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

import { Link } from "react-router-dom";
  
import './list.css';
import { Card } from 'antd';



const ApplicationCard : React.FC<{
	application: any
}> = ({ application }) => {
	return (
		<Card title={application.name} extra={<Link to={`/application/${application.id}`}>Edit</Link>} style={{ width: 300, marginRight: '18px' }}>
			<p>Name: {application.name}</p>
		</Card>
	)
}

function ApplicationList() {
	const [{ data : applications, loading, error }, refetch] = useAxios('/applications', { manual: true });

	useEffect(() => {
		refetch();
	}, [])

	if (!applications) return null;
	return (
	  <div className="ApplicationList">
		<Card title="Create application" extra={<Link to="/application/new">New</Link>} style={{ width: 300, marginRight: '18px'  }}>
			Create application
		</Card>
		{applications.map((application: any) => (
			<ApplicationCard key={application.id} application={application} />
		))}
	  </div>
	);
  }

  export default ApplicationList