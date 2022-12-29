import { Button, Card, Col, Row } from "antd";
import React from "react";
import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { dataTypeOptions, tableHeaderOptions } from "../data/constant";
import {
  CustomCheckbox,
  CustomInput,
  CustomInputNumber,
  CustomRadio,
} from "./CustomFormItem";
interface Props {
  control: Control<any>;
  errors: FieldErrors;
  watch: any;
}

function TableColumn(props: Props) {
  const { control, errors, watch } = props;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `tableColumn`,
  });

  const watchTableHeaderType = watch("tableHeaderType");

  const handleAdd = () => {
    append({ dataType: "string" });
  };

  const handleDelete = (index: number) => {
    return () => {
      remove(index);
    };
  };

  return (
    <Row gutter={[24, 24]} style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h3>Table Column</h3>
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <Col span={6}>
        <CustomRadio
          control={control}
          name="tableHeaderType"
          label="tableHeaderType"
          errors={errors}
          options={tableHeaderOptions}
        />
      </Col>
      <Col span={6}>
        <CustomInput
          control={control}
          name="tableRowInterface"
          label="tableRowInterface"
          errors={errors}
        />
      </Col>
      <Col span={6}>
        <CustomCheckbox
          control={control}
          name="tableRowIndex"
          label="rowIndex"
          errors={errors}
        />
      </Col>
      {fields.map((field, index) => (
        <Col span={24} key={field.id}>
          <Card>
            <Row gutter={[24, 0]}>
              <Col offset={20} span={4}>
                <Button style={{ marginTop: 30 }} onClick={handleDelete(index)}>
                  Remove
                </Button>
              </Col>
              <Col span={12}>
                <CustomInput
                  control={control}
                  name={`tableColumn[${index}].title`}
                  label="Title"
                  // errors={errors}
                />
              </Col>
              <Col span={12}>
                <CustomInput
                  control={control}
                  name={`tableColumn[${index}].key`}
                  label="Key"
                  // errors={errors}
                />
              </Col>
              <Col span={12}>
                <CustomRadio
                  control={control}
                  name={`tableColumn[${index}].dataType`}
                  label="DataType"
                  options={dataTypeOptions}
                  // errors={errors}
                />
              </Col>
              <Col span={12}>
                <CustomInputNumber
                  control={control}
                  name={`tableColumn[${index}].width`}
                  label="Width"
                  // errors={errors}
                />
              </Col>
              {watchTableHeaderType === "filter" ? (
                <Col span={12}>
                  <CustomCheckbox
                    control={control}
                    name={`tableColumn[${index}].search`}
                    label="Search"
                    // errors={errors}
                  />
                </Col>
              ) : null}
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default TableColumn;
