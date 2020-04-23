import * as React from 'react';
import { useLoggedApiRequest, useGithubApiRequest } from 'base/hooks/request';
import useQuery from 'base/hooks/query-param';
import { Descriptions, Button } from 'antd';
import Page from 'base/components/page';
import { Redirect } from 'react-router-dom';

function ImportApplication () {
	const repositoryName = useQuery().get('repository');

	const [{ data : repository, loading : loadingRepository }, fetch] = useGithubApiRequest(`/repos/${repositoryName}`);

	const [{ data : result, loading : loadingImport, error }, importRepo] = useLoggedApiRequest({
		url: `/applications/import`,
		method: 'POST'
	}, { manual: true});

	const handleImportButton = async () => {
		await importRepo({
			data: {
				repositoryName
			}
		})

	}

	if (!loadingImport && result) return <Redirect to={`./${result.id}`} />;
	if (loadingRepository || !repository) return <span>loading</span>;

  return (
	<Page title="Import repository">
		<Descriptions title="Repository infos">
			<Descriptions.Item label="Name">{repository.name}</Descriptions.Item>
		</Descriptions>
		<div>
			<Button type="primary" disabled={loadingImport} onClick={handleImportButton}>Import</Button>
		</div>
	</Page>
  );
}

export default ImportApplication;