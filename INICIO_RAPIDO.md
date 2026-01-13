# 🚀 Guia Rápido de Início - PlaySpot

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Configure o Banco de Dados

```sql
CREATE DATABASE playspot;
```

Edite `playspot/src/main/resources/application.properties`:
```properties
spring.datasource.password=SUA_SENHA_AQUI
```

### 2️⃣ Inicie o Backend

```bash
cd playspot
./mvnw spring-boot:run
```

✅ Backend rodando em `http://localhost:8080`
📚 Swagger em `http://localhost:8080/swagger-ui.html`

### 3️⃣ Inicie o Frontend

```bash
cd frontend
npm install  # Apenas na primeira vez
npm run dev
```

✅ Frontend rodando em `http://localhost:5173`

### 4️⃣ Teste a Aplicação

1. Acesse `http://localhost:5173`
2. Clique em "Cadastrar"
3. Crie sua conta
4. Faça login

🎉 Pronto! Você está usando o PlaySpot!

---

## 📱 Funcionalidades Principais

### Como Cliente
1. **Ver quadras disponíveis** na página inicial
2. **Fazer reservas** (em breve no frontend)
3. **Gerenciar minhas reservas**
4. **Atualizar meu perfil**

### Como Proprietário (COMERCIO)
1. **Cadastrar quadras**
   - Workbench → Cadastrar Quadra
2. **Gerenciar minhas quadras**
   - Workbench → Minhas Quadras
3. **Ver reservas das minhas quadras**
   - Workbench → Reservas
4. **Acompanhar financeiro**
   - Workbench → Financeiro

### Como Administrador (ADMIN)
1. **Gerenciar todos os usuários**
   - Workbench → Painel Admin
2. **Ver todas as quadras do sistema**
3. **Ver todas as reservas**
4. **Alterar tipo de usuário**

---

## 🔑 Usuários de Teste (Após Cadastro)

Para testar diferentes níveis de acesso, altere o tipo do usuário no banco:

```sql
-- Tornar usuário em proprietário
UPDATE users SET tipo_cliente = 'COMERCIO' WHERE email_user = 'seu@email.com';

-- Tornar usuário em admin
UPDATE users SET tipo_cliente = 'ADMIN' WHERE email_user = 'seu@email.com';
```

---

## 🧪 Testar a API com Swagger

1. Acesse `http://localhost:8080/swagger-ui.html`
2. Encontre o endpoint desejado
3. Clique em "Try it out"
4. Preencha os dados
5. Clique em "Execute"

### Exemplos Práticos

#### Cadastrar Usuário
```json
POST /api/usuarios/cadastrar
{
  "nameUser": "João Silva",
  "passwordUser": "senha123",
  "emailUser": "joao@email.com",
  "tipoCliente": "CLIENTE",
  "dataNascimento": "1990-01-01",
  "cpf": "123.456.789-00",
  "estado": "SP",
  "cidade": "São Paulo",
  "bairro": "Centro",
  "rua": "Rua Teste",
  "numero": "123",
  "cep": "01234-567",
  "telefone": "(11) 98765-4321"
}
```

#### Fazer Login
```json
POST /api/usuarios/login
{
  "emailUser": "joao@email.com",
  "passwordUser": "senha123"
}
```

#### Cadastrar Quadra
```json
POST /api/quadras/cadastrar
Headers: userId: 1
{
  "idProprietario": 1,
  "nomeQuadra": "Arena Soccer",
  "estado": "SP",
  "cidade": "São Paulo",
  "bairro": "Mooca",
  "rua": "Rua da Mooca",
  "numero": "100",
  "cep": "03102-000",
  "esporte": "Futebol",
  "telefone": "(11) 3333-4444",
  "valorHora": 80.00
}
```

#### Criar Reserva
```json
POST /api/reservas/criar
Headers: userId: 1
{
  "usuario": { "idUser": 1 },
  "quadra": { "idQuadra": 1 },
  "dataReserva": "2026-02-15",
  "horarioInicio": "18:00:00",
  "horarioFim": "19:00:00",
  "valorHora": 80.00,
  "valorTotal": 80.00
}
```

---

## 🐛 Problemas Comuns

### Backend não inicia
- ✅ Verifique se o MySQL está rodando
- ✅ Confirme usuário e senha no `application.properties`
- ✅ Verifique se a porta 8080 está livre

### Frontend não inicia
- ✅ Execute `npm install` primeiro
- ✅ Verifique se a porta 5173 está livre
- ✅ Verifique a versão do Node.js (18+)

### Login não funciona
- ✅ Se tinha usuários antes da atualização, [migre as senhas](GUIA_MIGRACAO_SENHAS.md)
- ✅ Verifique se o backend está rodando
- ✅ Verifique no console do navegador se há erros

### Erro de CORS
- ✅ Verifique se o frontend está em `http://localhost:5173`
- ✅ O backend já está configurado para aceitar requisições dessa origem

---

## 📊 Estrutura do Projeto

```
PlaySpot/
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   └── assets/       # Imagens e recursos
│   └── package.json
│
├── playspot/             # Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/playspot/
│   │   │   │   ├── config/      # Configurações
│   │   │   │   ├── controller/  # Controllers REST
│   │   │   │   ├── dto/         # DTOs
│   │   │   │   ├── model/       # Entidades JPA
│   │   │   │   ├── repository/  # Repositories
│   │   │   │   ├── service/     # Lógica de negócio
│   │   │   │   └── util/        # Utilitários
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/         # Testes
│   └── pom.xml
│
├── ATUALIZACOES.md              # Log de atualizações
├── GUIA_MIGRACAO_SENHAS.md      # Guia de migração
├── SISTEMA_NIVEIS_USUARIO.md    # Doc do sistema de níveis
└── README.md                     # Documentação principal
```

---

## 🎓 Próximos Passos

1. ✅ **Explore o Swagger** - Teste todos os endpoints
2. ✅ **Cadastre algumas quadras** - Crie dados de teste
3. ✅ **Faça reservas via API** - Use o Swagger para testar
4. 🔜 **Integre o frontend** - Conecte as telas com as APIs
5. 🔜 **Implemente JWT** - Adicione autenticação com tokens
6. 🔜 **Deploy** - Coloque online!

---

## 💡 Dicas

- Use o **Swagger** para entender todas as APIs disponíveis
- O **Workbench** adapta-se automaticamente ao tipo de usuário
- **Admins** veem todas as quadras, proprietários veem apenas as suas
- Reservas verificam automaticamente **conflitos de horário**
- Senhas são **criptografadas automaticamente** com BCrypt

---

## 📚 Documentação Completa

- [README.md](README.md) - Documentação principal
- [ATUALIZACOES.md](ATUALIZACOES.md) - Lista de atualizações
- [GUIA_MIGRACAO_SENHAS.md](GUIA_MIGRACAO_SENHAS.md) - Migração de senhas
- [SISTEMA_NIVEIS_USUARIO.md](SISTEMA_NIVEIS_USUARIO.md) - Sistema de permissões

---

**Divirta-se desenvolvendo! 🚀**
