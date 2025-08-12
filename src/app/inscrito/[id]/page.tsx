/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import styles from "@/app/page.module.css";
import { Card, Flex, Space, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import axios from "axios";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/app/components/PdfViewer"), {
  ssr: false,
});

interface Props {
  params: Promise<{ id: string }>;
}

type FieldType = {
  email: string;
  name: string;
  phone: string;
  agreeLGPD: boolean;
  adult: boolean;
  AuthorizationTerm?: string;
};

export default function InscritoPage({ params }: Props) {
  const { id } = React.use(params);
  const [inscritoData, setInscritoData] = React.useState<FieldType | null>(null);

  const getInscritoData = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/${id}`);
      if (response.status !== 200) {
        throw new Error("Erro ao buscar os dados do inscrito");
      }
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar os dados do inscrito");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInscritoData(id);
      setInscritoData(data);
      console.log(data.AuthorizationTerm);
    };
    fetchData();
  }, [id]);

  return (
    <Flex
      align="center"
      justify="center"
      className={styles.page}
      vertical
      gap={5}
    >
      <Card style={{ marginBottom: 16, width: "100%", maxWidth: "610px" }}>
        <Title level={3} style={{ marginBottom: 24, textAlign: "center" }}>
          Detalhes do Inscrito
        </Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
          <b>ID:</b> {id}
        </Text>

        {inscritoData ? (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Flex gap={1}>
              <Text strong style={{ minWidth: 110 }}>
                Nome:
              </Text>
              <Text>{inscritoData.name}</Text>
            </Flex>
            <Flex gap={1}>
              <Text strong style={{ minWidth: 110 }}>
                Email:
              </Text>
              <Text>{inscritoData.email}</Text>
            </Flex>
            <Flex gap={1}>
              <Text strong style={{ minWidth: 110 }}>
                Telefone:
              </Text>
              <Text>{inscritoData.phone}</Text>
            </Flex>
            <Flex gap={1}>
              <Text strong style={{ minWidth: 110 }}>
                Aceitou LGPD:
              </Text>
              <Text>{inscritoData.agreeLGPD ? "Sim" : "Não"}</Text>
            </Flex>
            <Flex gap={1}>
              <Text strong style={{ minWidth: 110 }}>
                Adulto:
              </Text>
              <Text>{inscritoData.adult ? "Sim" : "Não"}</Text>
            </Flex>
            {inscritoData.AuthorizationTerm && (
              <div
                style={{
                  marginTop: 24,
                  border: "1px solid #d9d9d9",
                  borderRadius: 8,
                  overflow: "auto",
                  maxHeight: 700,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <PdfViewer url={`http://localhost:4000/${inscritoData.AuthorizationTerm}`} />
              </div>
            )}
          </Space>
        ) : (
          <Skeleton active />
        )}
      </Card>
    </Flex>
  );
}
