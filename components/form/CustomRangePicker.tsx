import { ErrorMessage } from "@hookform/error-message";
import { DatePicker, Form, TimeRangePickerProps, Typography } from "antd";
import React from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { CommonFormProps } from "../../interfaces/form";

const { RangePicker } = DatePicker;

const { Text } = Typography;

function CustomRangePicker(props: CommonFormProps<TimeRangePickerProps>) {
  const {
    name,
    label,
    showError = true,
    childProps,
    wrapperProps,
    onChangeCallBack = undefined,
    onBlurCallBack = undefined,
  } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleOnChange = (onChange: (value: any) => void) => {
    return (value: any) => {
      onChange(value);
      if (onChangeCallBack instanceof Function) {
        onChangeCallBack(value);
      }
    };
  };

  const handleOnBlur = (onBlur: () => void) => {
    return () => {
      onBlur();
      if (onBlurCallBack instanceof Function) {
        onBlurCallBack();
      }
    };
  };

  const isHaveError = React.useMemo(() => {
    return get(errors, `${name}`, undefined);
  }, [errors, name]);

  const errorElement = React.useMemo(() => {
    return showError && errors ? (
      <Text type="danger">{<ErrorMessage errors={errors} name={name} />}</Text>
    ) : null;
  }, [showError, errors, name]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, value, onChange, onBlur } }) => (
        <Form.Item
          {...wrapperProps}
          label={label}
          help={errorElement}
          validateStatus={isHaveError ? "error" : undefined}
        >
          <RangePicker
            {...childProps}
            ref={ref}
            value={value}
            onChange={handleOnChange(onChange)}
            onBlur={handleOnBlur(onBlur)}
          />
        </Form.Item>
      )}
    />
  );
}

export default CustomRangePicker;
