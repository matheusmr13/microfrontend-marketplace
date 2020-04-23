import React from 'react';
import { useLoggedApiRequest } from 'base/hooks/request';
import { Link } from 'react-router-dom';
import Page from 'base/components/page';

import { Form, Input, Button, Checkbox, Space, Spin } from 'antd';

function Profiile() {
	const [{ data : profile, loading, error }, refetch] = useLoggedApiRequest('/users/me');
	const [{ data : profileSave, loading: savingProfile }, saveProfile] = useLoggedApiRequest({ method: 'PUT', url: '/users/me' }, { manual: true });

	const onFinish = async(fields: any) => {
		await saveProfile({
			data: {
				githubToken: fields.githubToken
			}
		});
	}
	return (
		<Page title="Profile">
			{
				loading ? <Spin size="large" /> : (
				<Form
					name="basic"
					initialValues={profile}
					onFinish={onFinish}
				>
				<Form.Item
					label="Github Token"
					name="githubToken"
				>
					<Input />
				</Form.Item>

				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit" loading={savingProfile}>
							Save
						</Button>
						<Link to="/logout"><Button type="danger">Logout</Button></Link>	
					</Space>
				</Form.Item>
				</Form>
				)
			}
			
		</Page>
	);
  }

  export default Profiile