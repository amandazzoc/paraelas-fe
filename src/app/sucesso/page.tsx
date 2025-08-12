import React from "react";
import { Button, Card, Flex, Result } from "antd";

const App: React.FC = () => {
  return (
    <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "40rem" }}>
        <Result
          status="success"
          title="Inscrição realizada!"
          subTitle="Enviaremos um e-mail com o seu QR Code daqui a alguns minutos. Você deverá apresentá-lo na entrada do evento."
          extra={
            <Button type="primary" href="/">
              Voltar para a página inicial
            </Button>
          }
        />
      </Card>
    </Flex>
  );
};

export default App;
