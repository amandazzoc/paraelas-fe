"use client";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Radio,
  Upload,
} from "antd";
import type { UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import Paragraph from "antd/es/typography/Paragraph";
import { useState } from "react";

type FieldType = {
  email: string;
  name: string;
  phone: string;
  agreeLGPD: boolean;
  adult: boolean;
  AuthorizationTerm?: UploadFile[];
};

const requiredRule = (msg: string) => ({ required: true, message: msg });

const textFields: { label: keyof FieldType; message: string }[] = [
  { label: "email", message: "Por favor, insira seu e-mail!" },
  { label: "name", message: "Por favor, insira seu nome!" },
  { label: "phone", message: "Por favor, insira seu WhatsApp!" },
];

const cardStyle = { marginBottom: 16 };
const maxWidthStyle = { width: "610px", marginBottom: 16 };

export function CadForm({ onSubmit, loading }: { onSubmit: (values: FieldType) => void; loading: boolean }) {
  const [form] = Form.useForm<FieldType>();
  const [isMinor, setIsMinor] = useState<boolean | null>(null);

  const onReset = () => {
    form.resetFields();
    setIsMinor(null);
  };

  const onValuesChange = (changedValues: Partial<FieldType>) => {
    if (changedValues.adult !== undefined) setIsMinor(changedValues.adult === false);
  };

  return (
    <Form
      form={form}
      name="cadForm"
      layout="vertical"
      onValuesChange={onValuesChange}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Card style={cardStyle}>
        {textFields.map(({ label, message }) => (
          <Form.Item<FieldType>
            key={label}
            label={label.charAt(0).toUpperCase() + label.slice(1)}
            name={label}
            rules={[requiredRule(message)]}
          >
            <Input />
          </Form.Item>
        ))}
      </Card>

      <Card style={maxWidthStyle}>
        <div style={{ marginBottom: 16 }}>
          <Link
            href="https://www.gov.br/mds/pt-br/acesso-a-informacao/privacidade-e-protecao-de-dados/lgpd"
            target="_blank"
          >
            Lei Geral de Proteção de Dados Pessoais (LGPD)
          </Link>
        </div>
        <Form.Item<FieldType>
          name="agreeLGPD"
          valuePropName="checked"
          rules={[requiredRule("Por favor, aceite os termos de LGPD!")]}
        >
          <Checkbox>Eu li e aceito os termos de LGPD</Checkbox>
        </Form.Item>
      </Card>

      <Card style={maxWidthStyle}>
        <Form.Item<FieldType>
          label="Você é maior de idade?"
          name="adult"
          rules={[requiredRule("Por favor, confirme que você é maior de idade!")]}
        >
          <Radio.Group>
            <Radio value={true}>Sim</Radio>
            <Radio value={false}>Não</Radio>
          </Radio.Group>
        </Form.Item>
      </Card>

      {isMinor && (
        <>
          <Card style={{ ...maxWidthStyle }}>
            <Alert
              message="Termo de Autorização"
              type="info"
              showIcon
              style={{ marginBottom: 16, backgroundColor: "#f6e9fb", borderColor: "#d3b2e0" }}
            />
            <Paragraph>
              Se você for menor de idade, peça aos seus pais ou responsáveis para que assine o Termo de Autorização no link abaixo e faça o envio do arquivo assinado.
            </Paragraph>
            <Link
              href="https://drive.google.com/file/d/1alHiffZi2g0f6bR130-669hTN0z_NdLi/view?usp=sharing"
              target="_blank"
            >
              PDF Termo de Autorização
            </Link>
          </Card>

          <Card style={{ ...maxWidthStyle }}>
            <Form.Item<FieldType>
              label="Envie o Termo de Autorização assinado aqui."
              name="AuthorizationTerm"
              valuePropName="fileList"
              getValueFromEvent={e => (Array.isArray(e) ? e : e?.fileList)}
              rules={[requiredRule("Por favor, envie o Termo de Autorização!")]}
            >
              <Upload name="file" listType="text" maxCount={1} accept=".pdf,image/*">
                <Button icon={<UploadOutlined />}>Enviar termo assinado</Button>
              </Upload>
            </Form.Item>
          </Card>
        </>
      )}

      <Form.Item>
        <Flex justify="space-between">
          <Button htmlType="submit" type="primary" loading={loading}>
            Enviar
          </Button>
          <Button htmlType="button" onClick={onReset} type="default" ghost>
            Limpar
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
}
