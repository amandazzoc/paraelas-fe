'use client'
import { Button, Card, Result, Flex } from 'antd';

const App: React.FC = () => (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
        <Card style={{ width: '40rem' }}>
            <Result
                status="404"
                title="404"
                subTitle="Desculpa, a página que você visitou não existe."
                extra={<Button type="primary">Voltar para a página inicial</Button>}
            />
        </Card>
    </Flex>
);

export default App;