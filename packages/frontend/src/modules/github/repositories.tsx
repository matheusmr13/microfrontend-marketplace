import React from 'react';

import { List, Avatar, Typography } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, GithubOutlined } from '@ant-design/icons';

import useLoggedUser from 'base/hooks/user';
import { useGithubApiRequest } from 'base/hooks/request';
import { Link, useRouteMatch } from 'react-router-dom';
import Page from 'base/components/page';



const IconText : React.FC<{
	icon:any,
	text:any 
}> = ({ icon, text }) => (
	<span>
	  {React.createElement(icon, { style: { marginRight: 8 } })}
	  {text}
	</span>
);

  const Repos : React.FC<{
}> = () => {
	const [user] = useLoggedUser();
	const match = useRouteMatch();
  const [{ data: repos, loading}, fetchRepos] = useGithubApiRequest('/user/repos?type=owner');

  return (
	  <Page title="Github Repositories">
		<List
			itemLayout="vertical"
			size="large"
			loading={loading}
			dataSource={repos}
			renderItem={(repo:any) => ( 
				<List.Item
					key={repo.id}
					actions={[
						<IconText icon={StarOutlined} text={repo.stargazers_count} key="list-vertical-star-o" />,
						<IconText icon={MessageOutlined} text={repo.open_issues} key="list-vertical-message" />,
					]}
					extra={<Link to={`./application/import?repository=${repo.full_name}`}>Import</Link>}
				>
					<List.Item.Meta
					avatar={<Avatar icon={<GithubOutlined />} />}
					title={repo.name}
					description={repo.description}
					/>
					{'asd'}
			</List.Item>
			)}
		/>
	</Page>
  );
}


export default Repos;
