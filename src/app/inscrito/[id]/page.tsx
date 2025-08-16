'use client'
import React, { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { Card, Flex, Space, Skeleton, Typography, Alert } from "antd";
import axios from "axios";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { FieldInscribedType } from "@/types/formTypes";

const { Title, Text } = Typography;

const PdfViewer = dynamic(() => import("@/app/components/PdfViewer"), {
  ssr: false,
});

async function getInscritoData(id: string): Promise<FieldInscribedType> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
  if (response.status !== 200) {
    throw new Error("Erro ao buscar os dados do inscrito");
  }
  return response.data;
}

export default function InscritoPage() {
  const { id } = useParams<{ id: string }>();
  const [inscritoData, setInscritoData] = useState<FieldInscribedType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const infoFields = [
    { label: "Nome:", value: inscritoData?.name },
    { label: "Email:", value: inscritoData?.email },
    { label: "Telefone:", value: inscritoData?.phone },
    { label: "Aceitou LGPD:", value: inscritoData?.agreeLGPD ? "Sim" : "Não" },
    { label: "Adulto:", value: inscritoData?.adult ? "Sim" : "Não" },
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);

    getInscritoData(id)
      .then((data) => {
        setInscritoData(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar dados do inscrito.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" className={styles.page}>
        <Skeleton active />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" className={styles.page}>
        <Alert message={error} type="error" />
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      justify="center"
      className={styles.page}
      vertical
      gap={5}
    >
      <Card>
        <Title level={3} style={{ marginBottom: 24, textAlign: "center" }}>
          Detalhes do Inscrito
        </Title>

        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Text type="secondary" style={{ display: "block"}}>
          <b>ID:</b> {id}
        </Text>
          {infoFields.map(({ label, value }) => (
            <Flex gap={1} key={label}>
              <Text strong style={{ minWidth: 110 }}>
                {label}
              </Text>
              <Text>{value}</Text>
            </Flex>
          ))}

          {inscritoData?.AuthorizationTerm && (
            <div className={styles.pdf}>
              <PdfViewer
                url={`${inscritoData.AuthorizationTerm}`}
              />
            </div>
          )}
        </Space>
      </Card>
    </Flex>
  );
}
