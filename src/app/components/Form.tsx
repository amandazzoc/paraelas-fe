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
import type { FormProps, UploadFile } from "antd";
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

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

type Props = {
  onSubmit: (values: FieldType) => void;
  loading: boolean;
};

export function CadForm(props: Props) {
  const { onSubmit, loading } = props;
  const [form] = Form.useForm<FieldType>();
  const [isMinor, setIsMinor] = useState<boolean | null>(null);

  const onReset = () => {
    form.resetFields();
    setIsMinor(null);
  };

  const handleValuesChange = (changedValues: Partial<FieldType>) => {
    if (changedValues.adult !== undefined) {
      setIsMinor(changedValues.adult === false);
    }
  };

  return (
    <Form
      form={form}
      name="cadForm"
      initialValues={{ remember: true }}
      layout="vertical"
      onValuesChange={handleValuesChange}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Card style={{ marginBottom: 16 }}>
        <Form.Item<FieldType>
          label="E-mail"
          name="email"
          rules={[{ required: true, message: "Por favor, insira seu e-mail!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Nome"
          name="name"
          rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="WhatsApp"
          name="phone"
          rules={[
            { required: true, message: "Por favor, insira seu WhatsApp!" },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Input />
        </Form.Item>
      </Card>
      <Card style={{ width: "100%", maxWidth: "800px", marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <Link
            href="https://www.gov.br/mds/pt-br/acesso-a-informacao/privacidade-e-protecao-de-dados/lgpd"
            target="_blank"
          >
            Lei Geral de Proteção de Dados Pessoais (LGPD)
          </Link>
        </div>
        <Form.Item<FieldType>
          label="Concorda com o envio dos dados, atendendo à LGPD (Lei Geral de Proteção de Dados)"
          name="agreeLGPD"
          valuePropName="checked"
          rules={[
            { required: true, message: "Por favor, aceite os termos de LGPD!" },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Checkbox>Eu li e aceito os termos de LGPD</Checkbox>
        </Form.Item>
      </Card>
      <Card style={{ width: "100%", maxWidth: "800px", marginBottom: 16 }}>
        <Form.Item<FieldType>
          label="Você é maior de idade?"
          name="adult"
          rules={[
            {
              required: true,
              message: "Por favor, confirme que você é maior de idade!",
            },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Radio.Group>
            <Radio value={true}>Sim</Radio>
            <Radio value={false}>Não</Radio>
          </Radio.Group>
        </Form.Item>
      </Card>
      {isMinor && (
        <>
          <Card
            style={{
              width: "100%",
              maxWidth: "600px",
              marginBottom: 16,
            }}
          >
            <Alert
              message="Termo de Autorização"
              type="info"
              showIcon
              style={{
                marginBottom: 16,
                backgroundColor: "#f6e9fb",
                borderColor: "#d3b2e0",
              }}
            />
            <Paragraph>
              Se você for menor de idade, peça aos seus pais ou responsáveis
              para que assine o Termo de Autorização do link abaixo e faça o
              envio do arquivo assinado
            </Paragraph>
            <Link
              href="https://drive.google.com/file/d/1alHiffZi2g0f6bR130-669hTN0z_NdLi/view?usp=sharing"
              target="_blank"
            >
              PDF Termo de Autorização
            </Link>
          </Card>
          <Card
            style={{
              width: "100%",
              maxWidth: "600px",
              marginBottom: 16,
            }}
          >
            <Form.Item<FieldType>
              label="Envie o Termo de Autorização assinado aqui."
              name="AuthorizationTerm"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              rules={[
                {
                  required: true,
                  message: "Por favor, envie o Termo de Autorização!",
                },
              ]}
            >
              <Upload
                name="file"
                listType="text"
                maxCount={1}
                accept=".pdf,image/*"
              >
                <Button icon={<UploadOutlined />}>Enviar termo assinado</Button>
              </Upload>
            </Form.Item>
          </Card>
        </>
      )}
      <Form.Item>
        <Flex justify="space-between">
          <Button htmlType="submit" color="primary" variant="solid">
            Enviar
          </Button>
          <Button
            htmlType="button"
            onClick={onReset}
            color="primary"
            variant="outlined"
            style={{ backgroundColor: "transparent" }}
            loading={loading}
          >
            Limpar
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
}
