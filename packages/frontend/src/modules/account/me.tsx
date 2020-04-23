import React from 'react';
import Page from 'base/components/page';
import { Input, Form, Button } from 'antd';

function Me() {
	const onFinish = (fields : any) => {
		console.info({ fields })
	}

	const onFinishFailed = () => { 
		console.info('deu errado')
	}

	return (
	  <Page title="Me">
		  			<Form
			labelCol={{ span: 2}}
			name="basic"
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			>
			<Form.Item
				label="Token"
				name="token"
				rules={[{ required: true, message: 'your token' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Save
				</Button>
			</Form.Item>
			</Form>

	  </Page>
	);
  }

  export default Me