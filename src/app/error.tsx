"use client";
import { Button, Card, Flex, Result } from "antd";

const App: React.FC = () => (
  <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
    <Card style={{ width: "40rem" }}>
      <Result
        status="500"
        title="500"
        subTitle="Desculpa, ocorreu um erro interno."
        extra={
          <Button type="primary" href="/">
            Voltar para a página inicial
          </Button>
        }
      />
    </Card>
  </Flex>
);

export default App;
