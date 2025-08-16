# Para Elas - Evento de Tecnologia para Mulheres
![cover](https://github.com/user-attachments/assets/0c41a8b5-e49a-4efe-9d74-2c3a32430a2d) 
Inscreva-se, gere seu QR Code e participe do maior evento de tecnologia para mulheres!

---


## Descrição

O projeto paraelas-fe é o front-end do sistema de inscrições do evento Para Elas.  
Permite que participantes realizem o cadastro, enviem documentos e recebam o QR Code via e-mail para apresentar no dia do evento.

**Problema que resolve:**  
Facilita o processo de inscrição, coleta de dados conforme LGPD e envio de documentos de autorização para menores.

**Tecnologias principais:**  
- React
- Next.js (App Router)
- Ant Design
- Axios

**Screenshot:**  
<img width="1413" height="779" alt="image" src="https://github.com/user-attachments/assets/0124e198-70a4-493e-a4a6-4378fe60041f" />
<img width="1408" height="778" alt="image" src="https://github.com/user-attachments/assets/f35ed28a-0393-4757-835b-b272f39b7cf6" />
<img width="888" height="662" alt="image" src="https://github.com/user-attachments/assets/d62bbf5e-77bd-4477-9000-0b4492a44b2e" />

## Deploy

- **Online:** [paraelas-fe.vercel.app](https://paraelas-fe.vercel.app)

---

## Funcionalidades

- Cadastro de participantes
- Upload de termo de autorização para menores
- Geração e exibição de QR Code
- Página de sucesso após inscrição
- Visualização de dados do inscrito via URL
- Validação de campos obrigatórios
- Feedback de erros e sucesso

---

## Tecnologias Utilizadas

- **Front-end:** React, Next.js (App Router)
- **Estilo:** Ant Design, CSS Modules
- **Ferramentas:** Axios (requisições HTTP), QRCode (geração de QR Code)
- **Outras dependências:**  
  - uuid (geração de IDs)
  - @ant-design/icons

---

## Instalação

**Pré-requisitos:**  
- Node.js >= 18
- npm ou yarn

**Clonando o repositório:**
```bash
git clone https://github.com/amandazzoc/paraelas-fe.git
cd paraelas-fe
```

**Instalando dependências:**
```bash
npm install
# ou
yarn
```

**Rodando localmente:**
```bash
npm run dev
# ou
yarn dev
```

---

## Estrutura do Projeto

```
src/
  app/
    components/        # Componentes reutilizáveis (Form, HeaderCard, PdfViewer)
    inscrito/          # Página dinâmica do inscrito
    sucesso/           # Página de sucesso
    error.tsx          # Página de erro global
    not-found.tsx      # Página 404
    layout.tsx         # Layout principal
    page.tsx           # Página inicial
    page.module.css    # Estilos globais
  types/
    formTypes.ts       # Tipos TypeScript para o formulário
```

- **Convenções:**  
  - Componentes em PascalCase
  - Pastas por funcionalidade (inscrito, sucesso)
  - CSS Modules para escopo de estilos

---

## Componentes Principais

- **Form.tsx:** Formulário de inscrição, upload de arquivos, geração de QR Code.
- **formFields.tsx:** Campos do formulário, regras de validação.
- **HeaderCard.tsx:** Cabeçalho estilizado do evento.
- **PdfViewer.tsx:** Visualização de PDF enviado.
- **inscrito/[id]/page.tsx:** Página de detalhes do inscrito.
- **sucesso/page.tsx:** Página de confirmação de inscrição.

---

## API e Integração

- **Endpoint principal:**  
  - `POST https://paraelas-be.vercel.app/` (criação de inscrito)
  - `GET http://paraelas-be.vercel.app/:id` (buscar inscrito por ID)

**Exemplo de requisição:**
```js
const formData = new FormData();
formData.append("name", "Amanda");
formData.append("email", "amanda@gmail.com");
formData.append("phone", "00000000");
formData.append("agreeLGPD", True));
formData.append("adult", False));
formData.append("AuthorizationTerm", file);

await axios.post("http://paraelas-be.vercel.app/", formData);
```

**Exemplo de resposta:**
```json
{
  "_id": "123",
  "name": "Amanda",
  "email": "amanda@gmail.com",
  "phone":  "00000000",
  "agreeLGPD": True,
  "adult": False,
  "AuthorizationTerm": "https://.../file.pdf"
}
```

## Configurações

**Variáveis de ambiente:**  
- `.env.local` : NEXT_PUBLIC_API_URL

**Build/Deploy:**  
- Deploy automático via Vercel

---

## Estilo e UI/UX

- **Fontes:** Padrão Ant Design
- **Cores:** Roxo, lilás, branco (tema do evento)
- **Framework:** Ant Design
- **Guidelines:**  
  - Layout responsivo
  - Feedback visual para erros e sucesso

---

## Contribuição

- Fork, clone e crie branch para novas features.
- Branches: main, feature/[nome], fix/[nome]
- Para rodar em modo dev:
```bash
npm run dev
```

---

## Roadmap e Funcionalidades Futuras

- Dashboard administrativo
- Validação de QR Code
- Exportação de lista de inscritos
- Melhorias de acessibilidade
- Internacionalização

---

## Licença

MIT

---

## Agradecimentos 
À toda a comissão do Para Elas <3
