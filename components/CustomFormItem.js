import { CaretDownOutlined, CheckOutlined } from "@ant-design/icons";
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker,
  Typography,
} from "antd";
import { get } from "lodash";
import React from "react";
import { Controller } from "react-hook-form";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Text } = Typography;

export const phoneRegExp = /(0?)([1-9]{1})([0-9]{8})\b/;
export const passwordRegExp = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z]).*[0-9].*.*$/;

export function CustomSelect(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    required = undefined,
    extra = undefined,
    suffixIcon = undefined,
    onChangeCallBack = undefined,
    onBlurCallBack = undefined,
    styleForm = {},
    options = [],
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  const customOnBlur = (onBlur) => {
    return (e) => {
      onBlur(e);
      if (onBlurCallBack) {
        onBlurCallBack(e);
      }
    };
  };

  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              required={required}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <Select
                ref={ref}
                suffixIcon={suffixIcon || <CaretDownOutlined />}
                options={[...options]}
                value={value}
                onChange={customOnChange(onChange)}
                onBlur={customOnBlur(onBlur)}
                {...ortherProps}
                menuItemSelectedIcon={
                  <CheckOutlined style={{ color: "#fff" }} />
                }
                className={`${ortherProps.className || ""} ${
                  get(errors, name, "") ? "custom-error" : ""
                } custom-input`}
              />
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomDatePicker(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    required = undefined,
    extra = undefined,
    onChangeCallBack = undefined,
    onBlurCallBack = undefined,
    styleForm = {},
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  const customOnBlur = (onBlur) => {
    return (e) => {
      onBlur(e);
      if (onBlurCallBack) {
        onBlurCallBack(e);
      }
    };
  };

  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              required={required}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <DatePicker
                ref={ref}
                style={{ width: "100%" }}
                value={value}
                onChange={customOnChange(onChange)}
                onBlur={customOnBlur(onBlur)}
                {...ortherProps}
                className={`${ortherProps.className || ""} ${
                  get(errors, name, "") ? "custom-error" : ""
                } custom-input`}
              />
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomRangePicker(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    required = undefined,
    extra = undefined,
    onChangeCallBack = undefined,
    onBlurCallBack = undefined,
    styleForm = {},
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  const customOnBlur = (onBlur) => {
    return (e) => {
      onBlur(e);
      if (onBlurCallBack) {
        onBlurCallBack(e);
      }
    };
  };

  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              required={required}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <RangePicker
                ref={ref}
                style={{ width: "100%" }}
                value={value}
                onChange={customOnChange(onChange)}
                onBlur={customOnBlur(onBlur)}
                {...ortherProps}
                className={`${ortherProps.className || ""} ${
                  get(errors, name, "") ? "custom-error" : ""
                } custom-input`}
              />
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomTimePicker(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    required = undefined,
    extra = undefined,
    onChangeCallBack = undefined,
    onBlurCallBack = undefined,
    styleForm = {},
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  const customOnBlur = (onBlur) => {
    return (e) => {
      onBlur(e);
      if (onBlurCallBack) {
        onBlurCallBack(e);
      }
    };
  };
  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              required={required}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <TimePicker
                ref={ref}
                style={{ width: "100%" }}
                value={value}
                onChange={customOnChange(onChange)}
                onBlur={customOnBlur(onBlur)}
                {...ortherProps}
                className={`${ortherProps.className || ""} ${
                  get(errors, name, "") ? "custom-error" : ""
                } custom-input`}
              />
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomInput(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    required = undefined,
    extra = undefined,
    onChangeCallBack = undefined,
    onBlurCallBack = undefined,
    styleForm = {},
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  const customOnBlur = (onBlur) => {
    return () => {
      onBlur();
      if (onBlurCallBack) {
        onBlurCallBack();
      }
    };
  };
  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              required={required}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <Input
                ref={ref}
                value={value}
                onChange={customOnChange(onChange)}
                onBlur={customOnBlur(onBlur)}
                {...ortherProps}
                className={`${ortherProps.className || ""} ${
                  get(errors, name, "") ? "custom-error" : ""
                } custom-input`}
              />
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomInputPassword(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    required = undefined,
    extra = undefined,
    onChangeCallBack = undefined,
    onBlurCallBack = undefined,
    styleForm = {},
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  const customOnBlur = (onBlur) => {
    return () => {
      onBlur();
      if (onBlurCallBack) {
        onBlurCallBack();
      }
    };
  };
  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              required={required}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <Input.Password
                ref={ref}
                value={value}
                onChange={customOnChange(onChange)}
                onBlur={customOnBlur(onBlur)}
                {...ortherProps}
                className={`${ortherProps.className || ""} ${
                  get(errors, name, "") ? "custom-error" : ""
                } custom-input`}
              />
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomTextArea(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    required = undefined,
    extra = undefined,
    onChangeCallBack = undefined,
    onBlurCallBack = undefined,
    styleForm = {},
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  const customOnBlur = (onBlur) => {
    return (e) => {
      onBlur(e);
      if (onBlurCallBack) {
        onBlurCallBack(e);
      }
    };
  };
  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              required={required}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <TextArea
                ref={ref}
                value={value}
                onChange={customOnChange(onChange)}
                onBlur={customOnBlur(onBlur)}
                {...ortherProps}
                className={`${ortherProps.className || ""} ${
                  get(errors, name, "") ? "custom-error" : ""
                } custom-input`}
              />
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomTextAreaHtml(props) {
  const {
    name,
    control,
    errors = undefined,
    onChangeCallBack = undefined,
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <textarea
              ref={ref}
              value={value}
              onChange={customOnChange(onChange)}
              {...ortherProps}
              className={`${ortherProps.className || ""} ${
                get(errors, name, "") ? "custom-error" : ""
              } custom-input`}
            ></textarea>
          )}
        />
      )}
    </>
  );
}

export function CustomInputNumber(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    required = undefined,
    extra = undefined,
    onChangeCallBack = undefined,
    onBlurCallBack = undefined,
    styleForm = {},
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  const customOnBlur = (onBlur) => {
    return (e) => {
      onBlur(e);
      if (onBlurCallBack) {
        onBlurCallBack(e);
      }
    };
  };
  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              required={required}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <InputNumber
                ref={ref}
                style={{ width: "100%" }}
                value={value}
                onChange={customOnChange(onChange)}
                onBlur={customOnBlur(onBlur)}
                {...ortherProps}
                className={`${ortherProps.className || ""} ${
                  get(errors, name, "") ? "custom-error" : ""
                } custom-input`}
              />
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomInputNumberic(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    required = undefined,
    extra = undefined,
    onChangeCallBack = undefined,
    onBlurCallBack = undefined,
    styleForm = {},
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      const { value } = e.target;
      const reg = /^\d*(\.\d*)?$/;

      if (reg.test(value) || value === "") {
        onChange(value);
      } else {
        onChange("");
      }

      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  const customOnBlur = (onChange) => {
    return (e) => {
      const { value } = e.target;
      let valueTemp = value;

      if (value.charAt(value.length - 1) === "." || value === "-") {
        valueTemp = value.slice(0, -1);
      }

      onChange(valueTemp.replace(/0*(\d+)/, "$1"));

      if (onBlurCallBack) {
        onBlurCallBack(e);
      }
    };
  };
  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              required={required}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <Input
                ref={ref}
                style={{ width: "100%" }}
                value={value}
                onChange={customOnChange(onChange)}
                onBlur={customOnBlur(onChange)}
                {...ortherProps}
                className={`${ortherProps.className || ""} ${
                  get(errors, name, "") ? "custom-error" : ""
                } custom-input`}
              />
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomRadio(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    extra = undefined,
    required = undefined,
    options = [],
    onChangeCallBack = undefined,
    styleForm = {},
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              required={required}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <Radio.Group
                ref={ref}
                options={[...options]}
                value={value}
                onChange={customOnChange(onChange)}
                {...ortherProps}
                className={`${ortherProps.className || ""} ${
                  get(errors, name, "") ? "custom-error" : ""
                } custom-input`}
              />
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomCheckbox(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    extra = undefined,
    options = [],
    onChangeCallBack = undefined,
    styleForm = {},
    labelCheckbox,
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              {options && options.length > 0 ? (
                <Checkbox.Group
                  ref={ref}
                  options={[...options]}
                  value={value}
                  onChange={customOnChange(onChange)}
                  {...ortherProps}
                  className={`${ortherProps.className || ""} ${
                    get(errors, name, "") ? "custom-error" : ""
                  } custom-input`}
                />
              ) : (
                <Checkbox
                  ref={ref}
                  checked={value}
                  onChange={customOnChange(onChange)}
                  {...ortherProps}
                  className={`${ortherProps.className || ""} ${
                    get(errors, name, "") ? "custom-error" : ""
                  } custom-input`}
                >
                  {labelCheckbox}
                </Checkbox>
              )}
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomSwitch(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    extra = undefined,
    onChangeCallBack = undefined,
    styleForm = {},
    hideError = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <Switch
                ref={ref}
                checked={value}
                onChange={customOnChange(onChange)}
                {...ortherProps}
                className={`${ortherProps.className || ""} ${
                  get(errors, name, "") ? "custom-error" : ""
                } custom-input`}
              />
            </Form.Item>
          )}
        />
      )}
    </>
  );
}

export function CustomSwitchV2(props) {
  const {
    name,
    label,
    control,
    errors = undefined,
    extra = undefined,
    onChangeCallBack = undefined,
    styleForm = {},
    hideError = false,
    checkedLabel,
    unCheckedLabel,
    disabled = false,
    ...ortherProps
  } = props;

  const customOnChange = (onChange) => {
    return (e) => {
      onChange(e);
      if (onChangeCallBack) {
        onChangeCallBack(e);
      }
    };
  };

  return (
    <>
      {name && control && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item
              style={styleForm}
              label={label}
              extra={extra}
              help={
                !hideError && errors ? (
                  <Text style={{ color: "#ff4d4f" }}>
                    {get(errors, `${name}.message`, "")}
                  </Text>
                ) : undefined
              }
            >
              <div
                className={`switch-container ${
                  value ? "switch-container-checked" : ""
                } ${disabled ? "switch-container-disabled" : ""}`}
              >
                <Switch
                  ref={ref}
                  className={`switch ${value ? "switch-checked" : ""} ${
                    disabled ? "switch-disabled" : ""
                  }`}
                  checked={value}
                  onChange={customOnChange(onChange)}
                  disabled={disabled}
                  {...ortherProps}
                />
                <span
                  className={`title ${value ? "title-checked" : ""} ${
                    disabled ? "title-disabled" : ""
                  }`}
                >
                  {value ? checkedLabel : unCheckedLabel}
                </span>
              </div>
            </Form.Item>
          )}
        />
      )}
    </>
  );
}
