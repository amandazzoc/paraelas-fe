import { UploadFile } from "antd";

export type FieldType = {
  email: string;
  name: string;
  phone: string;
  agreeLGPD: boolean;
  adult: boolean;
  AuthorizationTerm?: UploadFile[];
};

export type FormField = {
  label: string;
  name: keyof FieldType;
  rules: import("antd/es/form").Rule[];
  input: JSX.Element;
  style?: React.CSSProperties;
};

export type FieldInscribedType = {
  email: string;
  name: string;
  phone: string;
  agreeLGPD: boolean;
  adult: boolean;
  AuthorizationTerm?: string;
};
