import { Button, Col, Form, notification, Row, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { camelCase, snakeCase } from "lodash";
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
  titleCase,
} from "../data/funcGenCodeSplit";
import { stringFormat } from "../data/utils";
import { CustomCheckbox, CustomInput, CustomRadio } from "./CustomFormItem";
import FormCreate from "./FormCreate";
import FormSearch from "./FormSearch";
import TableColumn from "./TableColumn";
const { Text } = Typography;

function GenerateCode() {
  const [resultJson, setResultJson] = React.useState("");
  const [resultForm, setResultForm] = React.useState("");
  const [resultTable, setResultTable] = React.useState("");
  const [resultTableColumn, setResultTableColumn] = React.useState("");
  const [resultInterface, setResultInterface] = React.useState("");
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
    let resultText = `"${camelCase(value.key)}.title":"${titleCase(
      value.title
    )}",\n`;
    if (value.action?.includes("ACTION_CREATE")) {
      resultText += `"${camelCase(value.key)}.createTitle":"Tạo ${titleCase(
        value.title
      )}",\n`;
    }
    if (value.action?.includes("ACTION_UPDATE")) {
      resultText += `"${camelCase(
        value.key
      )}.updateTitle":"Chỉnh Sửa ${titleCase(value.title)}",\n`;
    }
    if (value.action?.includes("ACTION_VIEW_DETAIL")) {
      resultText += `"${camelCase(
        value.key
      )}.detailTitle":"Chi tiết ${titleCase(value.title)}",\n`;
    }
    resultText += value.tableColumn?.reduce(
      (prev: any, cur: any) =>
        prev +
        `"${camelCase(value.key)}.${camelCase(cur.key)}":"${titleCase(
          cur.title
        )}",\n`,
      ""
    );
    resultText += value.formSearch?.reduce(
      (prev: any, cur: any) =>
        prev +
        `"${camelCase(value.key)}.search.${camelCase(cur.key)}":"${titleCase(
          cur.title
        )}",\n`,
      ""
    );
    resultText += value.formSearch?.reduce(
      (prev: any, cur: any) =>
        prev +
        `"${camelCase(value.key)}.search.${camelCase(
          cur.key
        )}.placeholder":"Vui Lòng ${
          cur.type === "input" ? "Nhập " : "Chọn "
        }${titleCase(cur.title)}",\n`,
      ""
    );
    resultText += value.formCreate?.reduce(
      (prev: any, cur: any) =>
        prev +
        `"${camelCase(value.key)}.form.${camelCase(cur.key)}":"${titleCase(
          cur.title
        )}",\n`,
      ""
    );
    resultText += value.formCreate?.reduce(
      (prev: any, cur: any) =>
        prev +
        `"${camelCase(value.key)}.form.${camelCase(
          cur.key
        )}.placeholder":"Vui Lòng ${
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

  const columnRenderByType = (type: string, key: string) => {
    switch (type) {
      case "string":
        return `value.key.${snakeCase(key)} || '--';`;
      case "date":
        return `formatDate(value.key.create_date, DATE_FORMAT, true) || '--';`;
      case "number":
        return `numberWithCommas(value.key.cod_fee) || '--';`;
      case "boolean":
        return `!!value.key.${snakeCase(key)};`;
      default:
        return `value.key.${snakeCase(key)} || '--';`;
    }
  };

  const columnAlignByType = (type: string) => {
    switch (type) {
      case "string":
        return `left`;
      case "date":
        return `center`;
      case "number":
        return `right`;
      case "boolean":
        return `center`;
      default:
        return `left`;
    }
  };

  const generateCodeTableColumn = (value: any) => {
    const key = snakeCase(value.key);
    const headerCell =
      value?.tableHeaderType === "none"
        ? `<p className="header-title header-align-center">{{1}}</p>`
        : `<CustomDataGridHeader {0} caption={{1}} name={{2}} filters={filters} {3} />}`;

    let resultText =
      (value?.tableRowIndex
        ? `<Column
    alignment={'center'}
    dataType="string"
    width={60}
    allowResizing={false}
    allowGrouping={false}
    allowSearch={false}
    caption={messages['common.index']}
    headerCellComponent={() => <p className="header-title header-align-center">{messages['common.index']}</p>}
    cellRender={(value: IRenderDataGrid<${
      value.tableRowInterface || "any"
    }>) => {
        return numberWithCommas(value.row.dataIndex + 1);
    }}
/>\n`
        : "") +
      value.tableColumn?.reduce((prev: any, cur: any) => {
        const columnKey = `TC_${key?.toUpperCase()}_${cur.key?.toUpperCase()}`;
        return (
          prev +
          ` <Column
          alignment="${columnAlignByType(cur.dataType)}"
          dataType="${cur.dataType}"
          minWidth={164}
          width={${cur.width || 164}}
          allowResizing={true}
          dataField={${columnKey}}
          caption={messages['${camelCase(key)}.${camelCase(cur.key)}']}
          headerCellComponent={() => ${stringFormat(
            headerCell,
            cur.search ? `ref={columnRef[${columnKey}]} ` : "",
            `messages['${camelCase(key)}.${camelCase(cur.key)}']`,
            `${columnKey}`,
            cur.search ? `onChange={onSearchChange}` : ""
          )}}
          cellRender={(value: IRenderDataGrid<${
            value.tableRowInterface || "any"
          }>) => {
              return ${columnRenderByType(cur.dataType, cur.key)}
          }}
      />\n`
        );
      }, "");
    setResultTableColumn(resultText);
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

  const generateFormInterface = (value: any) => {
    const key = snakeCase(value.key);
    const orinalKey =
      value.key?.charAt(0)?.toLocaleUpperCase() + value?.key?.slice(1);
    let resultText = "";
    if (value.formSearch?.length) {
      resultText += `export type ${orinalKey}SearchFormSearch = {\n`;
      resultText += value.formSearch?.reduce(
        (prev: any, cur: any) =>
          prev +
          `[FS_${key?.toUpperCase()}_${cur.key?.toUpperCase()}]:${
            cur.interface
          }\n`,
        ""
      );
      resultText += "}\n";
    }
    if (value.formCreate?.length) {
      resultText += `export type ${orinalKey}FormValues = {\n`;
      resultText += value.formCreate?.reduce(
        (prev: any, cur: any) =>
          prev +
          `[FC_${key?.toUpperCase()}_${cur.key?.toUpperCase()}]:${
            cur.interface
          }\n`,
        ""
      );
      resultText += "}\n";
    }
    setResultInterface(resultText);
  };

  const onSubmit = (value: any) => {
    generateCodeJson(value);
    generateCodeForm(value);
    generateCodeTable(value);
    generateCodeTableColumn(value);
    generateSiteCode(value);
    generateFormInterface(value);
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
                  label="Key (camel)"
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
                <TableColumn control={control} errors={errors} watch={watch} />
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
              <Text>Form Interface</Text>
              <Button onClick={() => copyTextToClipboard("formInterface")}>
                Copy
              </Button>
              <TextArea
                id="formInterface"
                value={resultInterface}
                style={{ height: 250 }}
              />
            </Col>
            <Col span={12}>
              <Text>TABLE COLUMN</Text>
              <Button onClick={() => copyTextToClipboard("tableColumn")}>
                Copy
              </Button>
              <TextArea
                id="tableColumn"
                value={resultTableColumn}
                style={{ height: 250 }}
              />
            </Col>
            <Col span={12}>
              <Text>Json form</Text>
              <Button onClick={() => copyTextToClipboard("jsonForm")}>
                Copy
              </Button>
              <TextArea
                id="jsonForm"
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
