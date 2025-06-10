# Sistema de Níveis de Usuário - PlaySpot

## Visão Geral

O PlaySpot agora possui um sistema de níveis de usuário com três tipos distintos:
- **CLIENTE**: Usuário básico com acesso limitado
- **COMERCIO**: Proprietário de quadras com acesso ao workbench
- **ADMIN**: Administrador com acesso total ao sistema

## Níveis de Acesso

### CLIENTE (Usuário Básico)
- ✅ Visualizar quadras disponíveis na página inicial
- ✅ Fazer reservas
- ✅ Acessar conta pessoal
- ✅ Contatar suporte
- ❌ Não pode acessar o workbench
- ❌ Não pode cadastrar quadras

### COMERCIO (Proprietário)
- ✅ Todas as funcionalidades do CLIENTE
- ✅ Acessar o workbench
- ✅ Cadastrar quadras próprias
- ✅ Visualizar apenas suas quadras
- ✅ Gerenciar reservas das suas quadras
- ✅ Visualizar relatórios financeiros das suas quadras
- ❌ Não pode ver quadras de outros proprietários
- ❌ Não pode gerenciar outros usuários

### ADMIN (Administrador)
- ✅ Todas as funcionalidades do sistema
- ✅ Visualizar todas as quadras de todos os proprietários
- ✅ Gerenciar qualquer quadra
- ✅ Visualizar todas as reservas
- ✅ Acessar painel administrativo
- ✅ Alterar tipos de usuário
- ✅ Gerenciar todos os usuários

## Funcionalidades Implementadas

### Backend (Spring Boot)

#### 1. Modelo de Usuário Atualizado
- Enum `TypeUser` expandido com `ADMIN`
- Validações mantidas

#### 2. Serviço de Autorização (`AuthorizationService`)
- `isAdmin(userId)`: Verifica se é administrador
- `isProprietario(userId)`: Verifica se é proprietário
- `isCliente(userId)`: Verifica se é cliente
- `canAccessWorkbench(userId)`: Verifica acesso ao workbench
- `canViewAllQuadras(userId)`: Verifica se pode ver todas as quadras
- `canManageQuadrasFromProprietario(userId, proprietarioId)`: Verifica se pode gerenciar quadras

#### 3. Controladores Atualizados
- **QuadraController**: Verificações de permissão em todas as operações
- **AdminUserController**: Gerenciamento de usuários (apenas admin)
- **AuthController**: Verificação de permissões
- **LoginController**: Retorna informações de autorização

#### 4. Endpoints de API

##### Quadras
- `GET /api/quadras` - Listar todas (apenas admin)
- `GET /api/quadras/proprietario/{id}` - Listar por proprietário
- `POST /api/quadras/cadastrar` - Cadastrar quadra
- `PUT /api/quadras/{id}` - Atualizar quadra
- `DELETE /api/quadras/{id}` - Excluir quadra

##### Administração (apenas admin)
- `GET /api/admin/usuarios` - Listar todos os usuários
- `GET /api/admin/usuarios/{id}` - Buscar usuário por ID
- `PUT /api/admin/usuarios/{id}/tipo` - Alterar tipo de usuário
- `GET /api/admin/usuarios/tipo/{tipo}` - Buscar por tipo

##### Autorização
- `GET /api/auth/permissions/{userId}` - Verificar permissões
- `GET /api/auth/can-access-workbench/{userId}` - Verificar acesso ao workbench

### Frontend (React)

#### 1. Componentes de Proteção (`AuthComponents.jsx`)
- `ProtectedRoute`: Protege rotas que requerem login
- `ProtectedWorkbenchRoute`: Protege workbench (proprietários e admins)
- `ProtectedAdminRoute`: Protege área administrativa (apenas admins)
- `useUserType`: Hook para verificar tipo de usuário

#### 2. Telas Atualizadas
- **Login**: Armazena informações de autorização
- **Workbench**: Interface adaptada por tipo de usuário
- **MyCourts**: Filtra quadras baseado em permissões
- **RegistrationCourts**: Verificações de autorização
- **AdminPanel**: Painel para gerenciar usuários (apenas admin)

#### 3. Rotas Protegidas
- Workbench e funcionalidades relacionadas protegidas
- Painel admin protegido
- Redirecionamentos automáticos baseados em permissões

## Como Usar

### 1. Testando o Sistema

#### Criar Usuários de Teste
```sql
-- Cliente básico
INSERT INTO users (name_user, email_user, password_user, tipo_cliente, data_nascimento, cpf) 
VALUES ('João Cliente', 'cliente@test.com', '123456', 'CLIENTE', '1990-01-01', '123.456.789-01');

-- Proprietário
INSERT INTO users (name_user, email_user, password_user, tipo_cliente, data_nascimento, cpf) 
VALUES ('Maria Proprietária', 'proprietario@test.com', '123456', 'COMERCIO', '1985-05-15', '987.654.321-01');

-- Administrador
INSERT INTO users (name_user, email_user, password_user, tipo_cliente, data_nascimento, cpf) 
VALUES ('Admin Sistema', 'admin@test.com', '123456', 'ADMIN', '1980-12-31', '111.222.333-44');
```

#### Fluxo de Teste
1. **Login como Cliente**: Acesso limitado, não pode acessar workbench
2. **Login como Proprietário**: Pode acessar workbench, gerenciar próprias quadras
3. **Login como Admin**: Acesso total, pode gerenciar tudo

### 2. Alterando Tipos de Usuário

#### Via Painel Admin (Recomendado)
1. Faça login como administrador
2. Acesse o "Painel Admin" no workbench
3. Selecione o usuário e altere o tipo

#### Via API Direta
```bash
curl -X PUT http://localhost:8080/api/admin/usuarios/1/tipo \
  -H "Content-Type: application/json" \
  -H "userId: 3" \
  -d '"ADMIN"'
```

## Segurança

### Validações Implementadas
- Verificação de permissões em cada endpoint
- Headers de userId obrigatórios nas requisições protegidas
- Redirecionamentos automáticos para acesso negado
- Validação no frontend e backend

### Próximas Melhorias Sugeridas
- Implementar JWT tokens para autenticação mais segura
- Adicionar logs de auditoria
- Implementar rate limiting
- Adicionar confirmação por email para alterações críticas

## Estrutura de Arquivos Modificados

### Backend
- `model/User.java` - Enum TypeUser atualizado
- `service/AuthorizationService.java` - Novo serviço de autorização
- `controller/QuadraController.java` - Verificações de permissão
- `controller/AdminUserController.java` - Novo controlador admin
- `controller/AuthController.java` - Novo controlador de auth
- `controller/LoginController.java` - Retorno de permissões
- `repository/UserRepository.java` - Método findByTipoCliente
- `service/UserService.java` - Métodos de gerenciamento

### Frontend
- `AuthComponents.jsx` - Componentes de proteção
- `Login.jsx` - Armazenamento de auth
- `Workbench.jsx` - Interface adaptativa
- `MyCourts.jsx` - Filtragem por permissões
- `RegistrationCourts.jsx` - Verificações de auth
- `AdminPanel.jsx` - Novo painel admin
- `main.jsx` - Rotas protegidas
- `Workbench.css` - Estilos atualizados

## Troubleshooting

### Problemas Comuns

1. **"Acesso negado" no workbench**
   - Verificar se o usuário é COMERCIO ou ADMIN
   - Verificar se o localStorage tem as informações corretas

2. **Não consegue ver quadras**
   - Admin deve usar endpoint /api/quadras
   - Proprietário deve usar /api/quadras/proprietario/{id}

3. **Erro 403 nas requisições**
   - Verificar se o header userId está sendo enviado
   - Verificar se o usuário tem permissão para a operação

### Debug
```javascript
// Verificar informações do usuário no localStorage
console.log('User Info:', localStorage.getItem('userInfo'));
console.log('User Type:', localStorage.getItem('userType'));
console.log('Can Access Workbench:', localStorage.getItem('canAccessWorkbench'));
```

## Considerações Finais

O sistema de níveis de usuário está completamente implementado e funcional. Ele fornece:
- Controle granular de acesso
- Interface adaptativa baseada em permissões
- Segurança em múltiplas camadas
- Facilidade de gerenciamento para administradores

O sistema está pronto para produção e pode ser facilmente expandido com novos tipos de usuário ou permissões conforme necessário.
