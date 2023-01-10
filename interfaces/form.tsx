import { FormItemProps } from "antd";
import { ReactNode } from "react";

export interface CommonFormProps<T> {
  name: string;
  label: ReactNode;
  showError?: boolean;
  className?: string;
  wrapperProps?: FormItemProps;
  childProps?: T;
  onChangeCallBack?: (value: any, options?: any) => void;
  onBlurCallBack?: () => void;
}
