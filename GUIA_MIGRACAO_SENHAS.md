# 🔐 Guia de Migração de Senhas para BCrypt

## ⚠️ IMPORTANTE - Leia antes de continuar!

Com as atualizações implementadas, agora usamos **BCrypt** para criptografar senhas. Isso significa que:

- ✅ Novos usuários terão senhas automaticamente criptografadas
- ❌ Usuários existentes ainda têm senhas em **texto plano** no banco de dados
- 🚨 **Login não funcionará para usuários antigos** até migrar as senhas!

---

## 🛠️ Como Migrar as Senhas Existentes

### Opção 1: Migração Automática (Recomendado)

1. **Faça backup do banco de dados primeiro!**
   ```bash
   mysqldump -u root -p playspot > backup_playspot.sql
   ```

2. **Ative o profile de migração**
   
   Edite `application.properties`:
   ```properties
   # Adicione esta linha temporariamente
   spring.profiles.active=migrate-passwords
   ```

3. **Inicie o backend**
   ```bash
   cd playspot
   ./mvnw spring-boot:run
   ```

4. **Aguarde a migração**
   
   Você verá no console:
   ```
   ==============================================
   INICIANDO MIGRAÇÃO DE SENHAS PARA BCRYPT
   ==============================================
   ✅ Senha migrada para usuário: user1@email.com
   ✅ Senha migrada para usuário: user2@email.com
   ==============================================
   MIGRAÇÃO CONCLUÍDA!
   Total de senhas migradas: 10
   ==============================================
   ```

5. **Desative o profile**
   
   Remova ou comente a linha em `application.properties`:
   ```properties
   # spring.profiles.active=migrate-passwords
   ```

6. **Reinicie o backend normalmente**

---

### Opção 2: Migração Manual (SQL)

Se preferir não usar o script automático, você pode atualizar manualmente:

```sql
-- ATENÇÃO: Este é apenas um exemplo!
-- Você precisará gerar o hash BCrypt para cada senha

-- Para a senha "123456", o hash BCrypt é:
-- $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

UPDATE users 
SET password_user = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE id_user = 1;
```

**Gerar hashes BCrypt:**
- Online: https://bcrypt-generator.com/
- Ou use o próprio backend (criar endpoint temporário)

---

### Opção 3: Resetar Todas as Senhas

Se for um ambiente de desenvolvimento/teste:

```sql
-- Define senha padrão "senha123" para todos (hash BCrypt)
UPDATE users 
SET password_user = '$2a$10$YourBCryptHashHere';

-- Notifique os usuários para alterarem a senha
```

---

## 🧪 Testar se Funcionou

### 1. Verificar no Banco de Dados

```sql
SELECT id_user, email_user, 
       SUBSTRING(password_user, 1, 10) as hash_inicio
FROM users;
```

Senhas migradas devem começar com `$2a$`, `$2b$` ou `$2y$`.

### 2. Testar Login

```bash
POST http://localhost:8080/api/usuarios/login
Content-Type: application/json

{
  "emailUser": "teste@email.com",
  "passwordUser": "senha_original"
}
```

Se retornar o usuário, a migração funcionou!

---

## 🔍 Troubleshooting

### Problema: "Login não funciona após migração"

**Causa:** A senha original foi perdida durante a migração.

**Solução:** Resetar a senha do usuário:

1. Gerar novo hash:
   ```bash
   # Use https://bcrypt-generator.com/
   # Ou crie endpoint temporário no backend
   ```

2. Atualizar no banco:
   ```sql
   UPDATE users 
   SET password_user = 'novo_hash_bcrypt'
   WHERE email_user = 'usuario@email.com';
   ```

### Problema: "Script de migração não executa"

**Causa:** Profile não está ativo.

**Solução:** Verifique `application.properties`:
```properties
spring.profiles.active=migrate-passwords
```

### Problema: "Erro ao salvar usuário"

**Causa:** Campo `password_user` pode ser pequeno demais.

**Solução:** Aumentar tamanho da coluna:
```sql
ALTER TABLE users 
MODIFY COLUMN password_user VARCHAR(255);
```

---

## 📋 Checklist de Migração

- [ ] Backup do banco de dados criado
- [ ] Profile de migração ativado
- [ ] Backend iniciado e migração executada
- [ ] Console mostra "MIGRAÇÃO CONCLUÍDA"
- [ ] Profile de migração desativado
- [ ] Backend reiniciado normalmente
- [ ] Login testado e funcionando
- [ ] Script de migração deletado (opcional)

---

## ⚠️ Avisos Importantes

1. **NÃO execute o script de migração mais de uma vez!**
   - Ele vai criptografar senhas já criptografadas
   - Tornando impossível fazer login

2. **Faça backup antes!**
   - Se algo der errado, você pode restaurar

3. **Teste em desenvolvimento primeiro**
   - Nunca teste em produção diretamente

4. **Senhas antigas não podem ser recuperadas**
   - BCrypt é uma via única (não há "descriptografar")
   - Guarde as senhas originais se necessário

5. **Remova o script após a migração**
   - Para evitar execução acidental

---

## 🎯 Próximos Passos Após Migração

1. ✅ Todas as senhas agora estão seguras com BCrypt
2. ✅ Novos cadastros usarão automaticamente BCrypt
3. ✅ Sistema de login funcionando corretamente
4. 🔜 Implementar JWT para autenticação completa
5. 🔜 Adicionar "esqueci minha senha" funcional
6. 🔜 Força de senha no frontend

---

## 📞 Suporte

Se encontrar problemas durante a migração:

1. Verifique os logs do backend
2. Consulte a documentação do Spring Security
3. Restaure o backup se necessário

**Boa sorte com a migração! 🚀**
