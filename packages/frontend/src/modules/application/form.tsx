import React, { useState } from 'react';
import useAxios from 'axios-hooks';
  
import {
	Redirect, Link
  } from "react-router-dom";
  import { Form, Input, Button, Select, Card, Typography, Divider } from 'antd';

  const { Title, Paragraph, Text } = Typography;
  const { Option } = Select;

const NewApplication : React.FC<{
	application:any
}> = ({ application }) => {
	const isNew = !application.id;
	const [{ data : result, loading, error }, createApplication] = useAxios({
		url: `/applications${isNew ? '' : `/${application.id}`}`,
		method: isNew ? 'POST' : 'PUT'
	}, { manual: true});

  
	const onFinish = async (values :any) => {
		await createApplication({
			data: values
		});
	};
  
	const onFinishFailed = (errorInfo : any) => {
	  console.log('Failed:', errorInfo);
	};


	if (result) return <Redirect to="/application" />

	return (
		<Card title={isNew ? 'Creating' : `Editing ${application.name}`} style={{ margin: '32px'}}>
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
						<Typography>
							<Title>Micros</Title>
						</Typography>
							<div className="Application__microfrontend-list">
								<Card title="Create microfrontend" extra={<Link to={`/microfrontend/new?applicationId=${application.id}`} >New</Link>} style={{ width: 300, marginRight: '18px'  }}>
									Create microfrontend
								</Card>
								{application.microfrontends.map((microfrontend: any) => (
									<Card title={microfrontend.name} extra={<Link to={`/microfrontend/${microfrontend.id}`} >Edit</Link>} style={{ width: 300, marginRight: '18px'  }}>
										{microfrontend.name}
									</Card>
								))}
							</div>
					</>
				)
			}
		</Card>
	)
  }

  export default NewApplication;