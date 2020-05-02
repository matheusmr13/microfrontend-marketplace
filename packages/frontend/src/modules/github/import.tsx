import React, { useState } from "react";
import { useLoggedApiRequest, useGithubApiRequest } from "base/hooks/request";
import Page from "base/components/page";
import { Redirect, useParams } from "react-router-dom";

import { Descriptions, Button, Form, Input, Radio } from "antd";

function ImportRepository() {
	const { owner, repositoryName } = useParams();
	const repositoryFullName = `${owner}/${repositoryName}`;
	const [form] = Form.useForm();
	const [importType, setImportType] = useState("application");

	const onFormChanged = (values: any) => {
		if (values.importType) setImportType(values.importType);
	};

	const [
		{ data: repository, loading: loadingRepository },
		fetch,
	] = useGithubApiRequest(`/repos/${repositoryFullName}`);
	const [
		{ data: resultImportApplication, loading: loadingImportApplication },
		importApplication,
	] = useLoggedApiRequest(
		{
			url: `/applications/import`,
			method: "POST",
		},
		{ manual: true }
	);
	const [
		{ data: resultImportMicrofrontend, loading: loadingImportMicrofrontend },
		importMicrofrontend,
	] = useLoggedApiRequest(
		{
			url: `/microfrontends/import`,
			method: "POST",
		},
		{ manual: true }
	);

	const onFinish = async (values: any) => {
		if (values.importType === "application") {
			await importApplication({
				data: {
					repositoryName: repositoryFullName,
					packageName: values.packageName,
				},
			});
			return;
		}

		await importMicrofrontend({
			data: {
				repositoryName: repositoryFullName,
				applicationId: values.applicationId,
				packageName: values.packageName,
			},
		});
	};

	if (!loadingImportApplication && resultImportApplication)
		return (
			<Redirect to={`../../../application/${resultImportApplication.id}`} />
		);
	if (!loadingImportMicrofrontend && resultImportMicrofrontend)
		return (
			<Redirect to={`../../../microfrontend/${resultImportMicrofrontend.id}`} />
		);
	if (loadingRepository || !repository) return <span>loading</span>;

	return (
		<Page title="Import repository">
			<Form
				form={form}
				initialValues={{
					importType,
				}}
				onValuesChange={onFormChanged}
				onFinish={onFinish}
			>
				<Descriptions title="Repository infos">
					<Descriptions.Item label="Name">{repository.name}</Descriptions.Item>
				</Descriptions>
				<Form.Item label="Package name" name="packageName">
					<Input />
				</Form.Item>
				<Form.Item label="Import type" name="importType">
					<Radio.Group value={importType}>
						<Radio.Button value="application">Application</Radio.Button>
						<Radio.Button value="microfrontend">Microfrontend</Radio.Button>
					</Radio.Group>
				</Form.Item>

				{importType === "microfrontend" && (
					<Form.Item label="Application Id" name="applicationId">
						<Input />
					</Form.Item>
				)}

				<div>
					<Button
						htmlType="submit"
						type="primary"
						disabled={loadingImportMicrofrontend || loadingImportApplication}
					>
						Import
          </Button>
				</div>
			</Form>
		</Page>
	);
}

export default ImportRepository;
