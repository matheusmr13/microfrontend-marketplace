import React, { useState } from 'react';
import { useLoggedApiRequest } from 'base/hooks/request';
  
import {
	Redirect, Link, useLocation,useHistory
  } from "react-router-dom";
  import { Form, Input, Button, Select, Card, Typography, Timeline, Table } from 'antd';
import useQuery from 'base/hooks/query-param';
  const { Title, Paragraph, Text } = Typography;
  const { Option } = Select;

  

const NewMicrofrontend : React.FC<{
	microfrontend:any
}> = ({ microfrontend }) => {
	const isNew = !microfrontend.id;
	const history = useHistory();

	const [{ data : result, loading, error }, createmicrofrontend] = useLoggedApiRequest({
		url: `/microfrontends${isNew ? '' : `/${microfrontend.id}`}`,
		method: isNew ? 'POST' : 'PUT'
	}, { manual: true});

	const applicationId = useQuery().get('applicationId');
	const onFinish = async (values :any) => {
		await createmicrofrontend({
			data: {
				...values,
				applicationId
			},
		});
		history.goBack();
	};
  
	const onFinishFailed = (errorInfo : any) => {
	  console.log('Failed:', errorInfo);
	};

	const columns = [
		{
		  title: 'Created at',
		  dataIndex: 'createdAt',
		  key: 'createdAt'
		},
		{
		  title: 'Name',
		  dataIndex: 'name',
		  key: 'name',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		  },
		{
		  title: 'Action',
		  render: (asd: any) => {
		  	return <span>
				  <Button>Aprove</Button>
				</span>
		  },
		//   render: (text, record) => (
		// 	<span>
		// 	  <a style={{ marginRight: 16 }}>Invite {record.name}</a>
		// 	  <a>Delete</a>
		// 	</span>
		//   ),
		},
	  ];


	if (result) return null

	return (
		<Card title={isNew ? 'Creating' : `Editing ${microfrontend.name}`} style={{ margin: '32px'}}>
			<Form
			labelCol={{ span: 2}}
			name="basic"
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			>
			<Form.Item
				label="Name"
				name="name"
				rules={[{ required: true, message: 'Your microfrontend name.' }]}
			>
				<Input />
			</Form.Item>

			{/* <Form.Item name="type" label="type" rules={[{ required: true }]}>
				<Select
					placeholder="Select a option and change input text above"
					allowClear
				>
					<Option value="menu">male</Option>
					<Option value="order_type">female</Option>
					<Option value="order_type">female</Option>
					<Option value="other">other</Option>
				</Select>
				</Form.Item> */}

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Save
				</Button>
			</Form.Item>
			</Form>

			{
				isNew ? null : (
					<>
						<Title>Versions</Title>
						<Table columns={columns} dataSource={microfrontend.versions.map((v: any) => ({ ...v, key: v.id}))} />

						<Title>History</Title>
						<Timeline>
							{microfrontend.versions.map((version : any) => (
								<Timeline.Item key={version.id} color="green">Version {version.name} created at {version.createdAt}</Timeline.Item>
							))}
						</Timeline>
					</>
				)
			}
		</Card>
	)
  }

  export default NewMicrofrontend;