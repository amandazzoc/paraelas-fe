import { FormField } from "@/types/formTypes";
import { Input } from "antd";

export const formFields: FormField[] = [
  {
    label: "E-mail",
    name: "email",
    rules: [{ required: true, message: "Por favor, insira seu e-mail!" }],
    input: <Input />,
  },
  {
    label: "Nome",
    name: "name",
    rules: [{ required: true, message: "Por favor, insira seu nome!" }],
    input: <Input />,
  },
  {
    label: "WhatsApp",
    name: "phone",
    rules: [{ required: true, message: "Por favor, insira seu WhatsApp!" }],
    input: <Input />,
    style: { marginBottom: 0 },
  },
];