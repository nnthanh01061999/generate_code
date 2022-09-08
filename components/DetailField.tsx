import { Button, Col, Row } from "antd";
import React from "react";
import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { CustomInput, CustomRadio } from "./CustomFormItem";
interface Props {
  control: Control<any>;
  errors: FieldErrors;
}

function DetailField(props: Props) {
  const { control, errors } = props;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `detailField`,
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
        <h3>Detail Field</h3>
        <Button onClick={handleAdd}>Add</Button>
      </div>
      {fields.map((field, index) => (
        <Col span={24} key={field.id}>
          <Row gutter={[24, 0]}>
            <Col span={20}>
              <CustomInput
                control={control}
                name={`detailField[${index}].title`}
                label="Title"
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

export default DetailField;
