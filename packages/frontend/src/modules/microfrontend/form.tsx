import React, { useState } from 'react';
import useAxios from 'axios-hooks';
  
import {
	Redirect, Link, useLocation
  } from "react-router-dom";
  import { Form, Input, Button, Select, Card, Typography, Divider } from 'antd';

  const { Title, Paragraph, Text } = Typography;
  const { Option } = Select;

  function useQuery() {
	return new URLSearchParams(useLocation().search);
  }

const NewMicrofrontend : React.FC<{
	microfrontend:any
}> = ({ microfrontend }) => {
	const isNew = !microfrontend.id;
	const [{ data : result, loading, error }, createmicrofrontend] = useAxios({
		url: `/microfrontends${isNew ? '' : `/${microfrontend.id}`}`,
		method: isNew ? 'POST' : 'PUT'
	}, { manual: true});

	const applicationId = useQuery().get('applicationId');
  
	console.info({ applicationId })
	const onFinish = async (values :any) => {
		await createmicrofrontend({
			data: {
				...values,
				applicationId
			},
		});
	};
  
	const onFinishFailed = (errorInfo : any) => {
	  console.log('Failed:', errorInfo);
	};


	if (result) return <Redirect to="/microfrontend" />

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
		</Card>
	)
  }

  export default NewMicrofrontend;