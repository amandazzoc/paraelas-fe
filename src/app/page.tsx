/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./page.module.css";
import { Alert, Card, Flex, UploadFile, message } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Paragraph from "antd/es/typography/Paragraph";
import { CadForm } from "./components/Form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QRCode from "qrcode";

type FieldType = {
  email: string;
  name: string;
  phone: string;
  agreeLGPD: boolean;
  adult: boolean;
  AuthorizationTerm?: UploadFile[];
};

export default function Home() {
  const [qr, setQr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values: FieldType) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("agreeLGPD", String(values.agreeLGPD));
    formData.append("adult", String(values.adult));

    if (
      values.AuthorizationTerm &&
      values.AuthorizationTerm[0]?.originFileObj
    ) {
      formData.append(
        "AuthorizationTerm",
        values.AuthorizationTerm[0].originFileObj
      );
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      const inscrito = response.data;

      const url = `http://localhost:3000/inscrito/${inscrito._id}`;
      const qrCode = await QRCode.toDataURL(url);
      setQr(qrCode);

      messageApi.open({
        type: "success",
        content: "Inscrição realizada com sucesso!",
      });
      router.push("/sucesso");
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error) && error.response?.status === 409) {
        messageApi.open({
          type: "warning",
          content: "Email já cadastrado.",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Erro ao enviar o formulário. Tente novamente.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Flex
        align="center"
        justify="center"
        className={styles.page}
        vertical
        gap={5}
      >
        <Card
          cover={
            <img
              alt="example"
              src="/cover.jpg"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          }
          style={{ width: "100%", maxWidth: "610px", marginBottom: 16 }}
        >
          <Flex vertical>
            <Title level={2}>
              Para Elas - Evento de Tecnologia para Mulheres
            </Title>
            <Title level={5} style={{ marginTop: 0 }}>
              Bem-vinda ao &quot;Para Elas&quot; - Evento de Tecnologia para
              Mulheres!
            </Title>
            <Flex vertical>
              <Paragraph>
                O evento acontecerá no dia 11 de dezembro, das 18h30 às 22h.
              </Paragraph>
              <Paragraph style={{ marginBottom: 0 }}>
                Lembre-se de que{" "}
                <Text strong>
                  {" "}
                  a inscrição não garante a vaga; a confirmação da sua
                  participação será feita pela comissão via WhatsApp.
                </Text>
              </Paragraph>
              <Paragraph>
                Preencha o formulário com as suas informações e logo te
                enviaremos mensagem. Agradecemos a sua participação, estamos
                ansiosas para vê-la no evento!
              </Paragraph>
              <Alert
                message="* Indica uma pergunta obrigatória"
                closable
                style={{ backgroundColor: "#f6e9fb", borderColor: "#d3b2e0" }}
              />
            </Flex>
          </Flex>
        </Card>
        <CadForm onSubmit={handleSubmit} loading={loading} />
      </Flex>
    </>
  );
}
