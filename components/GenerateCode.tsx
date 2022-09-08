import { Button, Col, Form, notification, Row, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useForm } from "react-hook-form";
import {
  actionOptions,
  importContanst_,
  modalOptions,
  paginationOptions,
} from "../data/constant";
import {
  defineModal,
  importColumnKey,
  importComponent,
  importContanst,
  importFormKey,
  importInterfaces,
  importModal,
  importQueryString,
  snakeCase,
  titleCase,
} from "../data/funcGenCodeSplit";
import { CustomCheckbox, CustomInput, CustomRadio } from "./CustomFormItem";
import FormCreate from "./FormCreate";
import FormSearch from "./FormSearch";
import TableColumn from "./TableColumn";
const { Text } = Typography;

function GenerateCode() {
  const [resultJson, setResultJson] = React.useState("");
  const [resultForm, setResultForm] = React.useState("");
  const [resultTable, setResultTable] = React.useState("");
  const [resultSite, setResultSite] = React.useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<any>();

  const watchValues = watch();

  const copyTextToClipboard = (id: string) => {
    var copyText = document.getElementById(id) as HTMLInputElement;
    if (copyText) {
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      navigator.clipboard.writeText(copyText.value);
    }
    notification.open({
      message: "Copy to Clipboard",
      description: "Code have been copy to clipboard",
    });
  };

  const generateCodeJson = (value: any) => {
    let resultText = `"${value.key}.title":"${titleCase(value.title)}",\n`;
    resultText += `"${value.key}.createTitle":"Tạo ${titleCase(
      value.title
    )}",\n`;
    resultText += `"${value.key}.updateTitle":"Chỉnh Sửa ${titleCase(
      value.title
    )}",\n`;
    resultText += `"${value.key}.detailTitle":"Chi tiết ${titleCase(
      value.title
    )}",\n`;
    resultText += value.tableColumn?.reduce(
      (prev: any, cur: any) =>
        prev + `"${value.key}.${cur.key}":"${titleCase(cur.title)}",\n`,
      ""
    );
    resultText += value.formSearch?.reduce(
      (prev: any, cur: any) =>
        prev + `"${value.key}.search.${cur.key}":"${titleCase(cur.title)}",\n`,
      ""
    );
    resultText += value.formSearch?.reduce(
      (prev: any, cur: any) =>
        prev +
        `"${value.key}.search.${cur.key}.placeholder":"Vui Lòng ${
          cur.type === "input" ? "Nhập " : "Chọn "
        }${titleCase(cur.title)}",\n`,
      ""
    );
    resultText += value.formCreate?.reduce(
      (prev: any, cur: any) =>
        prev + `"${value.key}.form.${cur.key}":"${titleCase(cur.title)}",\n`,
      ""
    );
    resultText += value.formCreate?.reduce(
      (prev: any, cur: any) =>
        prev +
        `"${value.key}.form.${cur.key}.placeholder":"Vui Lòng ${
          cur.type === "input" ? "Nhập " : "Chọn "
        }${titleCase(cur.title)}",\n`,
      ""
    );

    setResultJson(resultText);
  };

  const generateCodeForm = (value: any) => {
    const key = snakeCase(value.key);
    let resultText = `//FORM SEARCH ${key?.toUpperCase()}\n`;
    resultText += value.formSearch?.reduce(
      (prev: any, cur: any) =>
        prev +
        `export const FS_${key?.toUpperCase()}_${cur.key?.toUpperCase()}="${
          cur.key
        }";\n`,
      ""
    );
    resultText += `//FORM CREATE ${key?.toUpperCase()}\n`;
    resultText += value.formCreate?.reduce(
      (prev: any, cur: any) =>
        prev +
        `export const FC_${key?.toUpperCase()}_${cur.key?.toUpperCase()}="${
          cur.key
        }";\n`,
      ""
    );
    setResultForm(resultText);
  };

  const generateCodeTable = (value: any) => {
    const key = snakeCase(value.key);
    let resultText =
      `//${key?.toUpperCase()}\n` +
      value.tableColumn?.reduce(
        (prev: any, cur: any) =>
          prev +
          `export const TC_${key?.toUpperCase()}_${cur.key?.toUpperCase()}="${
            cur.key
          }";\n`,
        ""
      );
    setResultTable(resultText);
  };

  const generateSiteCode = (value: any) => {
    const key = value.key;

    let resultText = importContanst_;
    resultText += importColumnKey(key);
    resultText += importContanst(value.action, value.pagination);
    resultText += importFormKey(value);
    resultText += importModal(value);
    resultText += importInterfaces(value);
    resultText += importQueryString(key);
    resultText += importComponent(value);
    resultText += defineModal(value);
    setResultSite(resultText);
  };

  const onSubmit = (value: any) => {
    generateCodeJson(value);
    generateCodeForm(value);
    generateCodeTable(value);
    generateSiteCode(value);
  };

  return (
    <div style={{ padding: 30 }}>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <h3>Form</h3>

          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Button htmlType="submit" shape="round" type="primary">
              Generate
            </Button>
            <Row gutter={[24, 0]}>
              <Col span={12}>
                <CustomInput
                  control={control}
                  name="title"
                  label="Title"
                  errors={errors}
                />
              </Col>
              <Col span={12}>
                <CustomInput
                  control={control}
                  name="key"
                  label="Key"
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <CustomCheckbox
                  control={control}
                  name="action"
                  label="Action"
                  errors={errors}
                  options={actionOptions}
                />
              </Col>
              <Col span={12}>
                <CustomCheckbox
                  control={control}
                  name="modal"
                  label="Modal"
                  errors={errors}
                  options={modalOptions}
                />
              </Col>
              <Col span={12}>
                <CustomRadio
                  control={control}
                  name="pagination"
                  label="Pagination"
                  errors={errors}
                  options={paginationOptions}
                />
              </Col>
              <Col span={24}>
                <FormSearch control={control} errors={errors} />
              </Col>
              <Col span={24}>
                <FormCreate control={control} errors={errors} />
              </Col>
              <Col span={24}>
                <TableColumn control={control} errors={errors} />
              </Col>
              {/* <Col span={24}>
                <DetailField control={control} errors={errors} />
              </Col> */}
            </Row>
          </Form>
        </Col>
        <Col span={12}>
          <h3>Code</h3>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Text>Language Json</Text>
              <Button onClick={() => copyTextToClipboard("json")}>Copy</Button>
              <TextArea id="json" value={resultJson} style={{ height: 250 }} />
            </Col>
            <Col span={12}>
              <Text>Form key</Text>
              <Button onClick={() => copyTextToClipboard("form")}>Copy</Button>
              <TextArea id="form" value={resultForm} style={{ height: 250 }} />
            </Col>
            <Col span={12}>
              <Text>Table key</Text>
              <Button onClick={() => copyTextToClipboard("table")}>Copy</Button>
              <TextArea
                id="table"
                value={resultTable}
                style={{ height: 250 }}
              />
            </Col>
            <Col span={12}>
              <Text>Json form</Text>
              <Button onClick={() => copyTextToClipboard("table")}>Copy</Button>
              <TextArea
                id="table"
                value={JSON.stringify(watchValues)}
                style={{ height: 250 }}
              />
            </Col>
            <Col span={24}>
              <Text>Site</Text>
              <Button onClick={() => copyTextToClipboard("site")}>Copy</Button>
              <TextArea id="site" value={resultSite} style={{ height: 800 }} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default GenerateCode;
