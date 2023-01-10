import { Button, Col, Form, Input, Row, Space, Typography, Layout } from "antd";
import { startCase } from "lodash";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  generateForm,
  generateInterface,
  generateLocale,
  generateTableColumn,
} from "../../function/generate";
import { copyTextToClipboard } from "../../utils";
import Common from "./Common";
import FormSearchCreate from "./FormSearchCreate";
import TableColumn from "./TableColumn";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const { Title } = Typography;
const { TextArea } = Input;
const { Header } = Layout;

function Generate() {
  const schema = yup.object({
    key: yup.string().required("required"),
  });

  const formMethod = useForm<any>({
    defaultValues: {
      tableHeaderType: "none",
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = formMethod;
  const [result, setResult] = React.useState<any>(() => undefined);

  const setResultValue = (key: string, resultString: string) => {
    setResult((prev: any) => ({ ...prev, [key]: resultString }));
  };

  const onGenerate = (values: any) => {
    generateLocale(values, setResultValue);
    generateForm(values, setResultValue);
    generateTableColumn(values, setResultValue);
    generateInterface(values, setResultValue);
  };

  const resultArr = React.useMemo(() => {
    return [
      {
        key: "locale",
      },
      {
        key: "form",
      },
      {
        key: "table",
      },
      {
        key: "column",
      },
      {
        key: "interface",
      },
    ];
  }, []);

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <Button onClick={handleSubmit(onGenerate)}>Generate</Button>
      </Header>
      <Layout style={{ padding: 30, height: "100vh", overflow: "auto" }}>
        <Row gutter={[12, 12]}>
          <Col md={12}>
            <Form layout="vertical">
              <FormProvider {...formMethod}>
                <Common />
                <FormSearchCreate name="search" />
                <FormSearchCreate name="form" />
                <TableColumn name="table" />
              </FormProvider>
            </Form>
          </Col>
          <Col md={12}>
            <Row gutter={[24, 24]}>
              {resultArr?.map((item) => (
                <Col key={item.key} md={24}>
                  <Space
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    align="center"
                  >
                    <Title level={3}>{startCase(item.key)} </Title>
                    <Button onClick={() => copyTextToClipboard(item.key)}>
                      Copy
                    </Button>
                  </Space>
                  <TextArea
                    id={item.key}
                    value={result?.[item.key]}
                    style={{ height: 150 }}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default Generate;
