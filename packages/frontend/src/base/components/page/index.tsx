import * as React from "react";

import { Typography, Row, Col, Divider, Space } from "antd";
const { Title } = Typography;

export interface IPageProps {
  title: string;
  children: React.ReactNode;
  actions?: Array<React.ReactNode>;
}

export default class Page extends React.Component<IPageProps> {
  public render() {
    const { title, children, actions } = this.props;
    return (
      <article style={{ padding: "36px" }}>
        <section>
          <Row align="middle">
            <Col flex={1}>
              <Title>{title}</Title>
            </Col>
            <Col style={{ textAlign: "center" }}>{actions}</Col>
          </Row>
        </section>
        <Divider />
        <section className="page__content">{children}</section>
      </article>
    );
  }
}
