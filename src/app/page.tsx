/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./page.module.css";
import { Card, Flex, UploadFile, message } from "antd";
import { CadForm } from "./components/Form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeaderCard } from "./components/HeaderCard";

type FieldType = {
  email: string;
  name: string;
  phone: string;
  agreeLGPD: boolean;
  adult: boolean;
  AuthorizationTerm?: UploadFile[];
};

export default function Home() {
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

    if (values.AuthorizationTerm?.[0]?.originFileObj) {
      formData.append("AuthorizationTerm", values.AuthorizationTerm[0].originFileObj);
    }

    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      messageApi.success("Inscrição realizada com sucesso!");
      router.push("/sucesso");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        messageApi.warning("Email já cadastrado.");
      } else {
        messageApi.error("Erro ao enviar o formulário. Tente novamente.");
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
          <HeaderCard />
        </Card>
        <CadForm onSubmit={handleSubmit} loading={loading} />
      </Flex>
    </>
  );
}
