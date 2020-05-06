import React, { useState } from "react";
import { useLoggedApiRequest } from "base/hooks/request";

import { Redirect, Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  Typography,
  Divider,
  Space,
} from "antd";

import { default as DetailsComponent } from './details';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const NewApplication: React.FC<{
  application: any;
}> = ({ application }) => {
  const isNew = !application.id;
  const [
    { data: result, loading, error },
    createApplication,
  ] = useLoggedApiRequest(
    {
      url: `/applications${isNew ? "" : `/${application.id}`}`,
      method: isNew ? "POST" : "PUT",
    },
    { manual: true }
  );

  const [{ data: microfrontends }] = useLoggedApiRequest(`/microfrontends?applicationId=${application.id}`);

  const onFinish = async (values: any) => {
    await createApplication({
      data: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (!loading && result) return <Redirect to="../application" />;

  return (
    <Card
      title={isNew ? "Creating" : `Editing ${application.name}`}
      style={{ margin: "32px" }}
    >
      <Form
        labelCol={{ span: 2 }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={application}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Your microfrontend name." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Link to={`./${application.id}/deploy`}>
              <Button type="ghost" >
                New Deploy
              </Button>
            </Link>
          </Space>
        </Form.Item>
      </Form>

      {isNew ? null : (
        <>
          <Typography>
            <Title>Micros</Title>
          </Typography>
          <div className="Application__microfrontend-list">
            {microfrontends && microfrontends.map((microfrontend: any) => (
              <Card
                key={microfrontend.id}
                title={microfrontend.name}
                extra={
                  <Link to={`../microfrontend/${microfrontend.id}`}>Edit</Link>
                }
                style={{ width: 300, marginRight: "18px" }}
              >
                {microfrontend.name}
              </Card>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export const Details = () => <DetailsComponent Component={NewApplication} />;
export const New = () => <NewApplication application={{}} />;
