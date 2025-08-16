import { Alert, Flex } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

export function HeaderCard() {
  return (
    <Flex vertical>
      <Title level={3}>Para Elas - Evento de Tecnologia para Mulheres</Title>
      <Title level={5} style={{ marginTop: 0 }}>
        Bem-vinda ao &quot;Para Elas&quot; - Evento de Tecnologia para Mulheres!
      </Title>
      <Flex vertical>
        <Paragraph>O evento acontecerá no dia 11 de dezembro, das 18h30 às 22h.</Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          Lembre-se de que{" "}
          <Text strong>
            a inscrição não garante a vaga; a confirmação da sua participação será feita pela comissão via WhatsApp.
          </Text>
        </Paragraph>
        <Paragraph>
          Preencha o formulário com as suas informações e logo te enviaremos mensagem. Agradecemos a sua participação, estamos ansiosas para vê-la no evento!
        </Paragraph>
        <Alert
          message="* Indica uma pergunta obrigatória"
          closable
          style={{ backgroundColor: "#f6e9fb", borderColor: "#d3b2e0" }}
        />
      </Flex>
    </Flex>
  );
}
