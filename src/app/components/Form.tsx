"use client";
import { Button, Card, Checkbox, Flex, Form, Input, Radio } from "antd";
import Link from "antd/es/typography/Link";

type FieldType = {
  email: string;
  name: string;
  whatsapp: string;
  agreeLGPD: boolean;
  adult: boolean;
  AuthorizationTerm?: File;
};

export function CadForm() {
  const [form] = Form.useForm<FieldType>();

  const onReset = () => {
    form.resetFields();
  };

  return (
        <Form form={form} name="cadForm" initialValues={{ remember: true }} layout="vertical">
            <Card style={{marginBottom: 16 }}>
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
                    name="whatsapp"
                    rules={[{ required: true, message: "Por favor, insira seu WhatsApp!" }]}
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
            <Form.Item>
                <Flex justify="space-between">
                    <Button htmlType="submit" color="primary" variant="solid">
                        Enviar
                    </Button>
                    <Button htmlType="button" onClick={onReset} color="primary" variant="outlined" style={{ backgroundColor: "transparent" }}>
                        Limpar
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
  );
}
