import React, { useEffect, useState } from 'react';
import { useLoggedApiRequest } from 'base/hooks/request';

import { Link } from "react-router-dom";
  
import { Card, Button } from 'antd';
import Page from 'base/components/page';
import { List } from 'antd';



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
	console.info('list application')
	const [{ data : applications, loading, error }, refetch] = useLoggedApiRequest('/applications', { manual: true });

	useEffect(() => {
		refetch();
	}, [])

	if (!applications) return null;
	return (
	  <Page
			  title="Applications"
			  actions={[<Button type="primary">New</Button>]}
		>
		  <List
			itemLayout="vertical"
			size="large"
			dataSource={applications}
			renderItem={(application:any) => ( 
				<List.Item
					key={application.id}
					actions={[
						// <IconText icon={StarOutlined} text={repo.stargazers_count} key="list-vertical-star-o" />,
						// <IconText icon={MessageOutlined} text={repo.open_issues} key="list-vertical-message" />,
					]}
					extra={<Link to={`./application/${application.id}`}>Edit</Link>}
				>
					<List.Item.Meta
					// avatar={<Avatar icon={<GithubOutlined />} />}
						title={application.name}
						description={application.description}
					/>
					{'asd'}
			</List.Item>
			)}
		/>
	  </Page>
	);
  }

  export default ApplicationList