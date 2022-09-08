import { Button, Col, Row } from "antd";
import React from "react";
import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { CustomInput, CustomRadio } from "./CustomFormItem";
interface Props {
  control: Control<any>;
  errors: FieldErrors;
}

function FormSearch(props: Props) {
  const { control, errors } = props;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `formSearch`,
  });

  const handleAdd = () => {
    append({ type: "input" });
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
        <h3>Form Search</h3>
        <Button onClick={handleAdd}>Add</Button>
      </div>
      {fields.map((field, index) => (
        <Col span={24} key={field.id}>
          <Row gutter={[24, 0]}>
            <Col span={8}>
              <CustomInput
                control={control}
                name={`formSearch[${index}].title`}
                label="Title"
                // errors={errors}
              />
            </Col>
            <Col span={8}>
              <CustomInput
                control={control}
                name={`formSearch[${index}].key`}
                label="Key"
                // errors={errors}
              />
            </Col>
            <Col span={4}>
              <CustomRadio
                control={control}
                name={`formSearch[${index}].type`}
                label="Key"
                options={[
                  { value: "input", label: "Input" },
                  { value: "select", label: "Select" },
                ]}
                // errors={errors}
              />
            </Col>
            <Col span={4}>
              <Button style={{ marginTop: 30 }} onClick={handleDelete(index)}>
                Remove
              </Button>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
}

export default FormSearch;
