# PlaySpot

## Execução rápida (desenvolvimento)

Pré-requisitos:

- Java JDK 17
- Maven
- Node.js + npm
- Docker (opcional para Prometheus/Grafana)

Rodar backend:

```powershell
Set-Location 'c:\Users\pc\programa\machado\faculdade\PlaySpot\playspot'
$env:JAVA_HOME='C:\Users\pc\.jdk\jdk-17.0.16'
.\mvnw spring-boot:run
```

Rodar backend em modo de desenvolvimento sem MySQL (H2 in-memory):

```powershell
Set-Location 'c:\Users\pc\programa\machado\faculdade\PlaySpot\playspot'
$env:JAVA_HOME='C:\Users\pc\.jdk\jdk-17.0.16'
$env:SPRING_PROFILES_ACTIVE='dev'
.\mvnw spring-boot:run
```

Rodar frontend (desenvolvimento):

```powershell
Set-Location 'c:\Users\pc\programa\machado\faculdade\PlaySpot\frontend'
npm install
npm run dev
```

Swagger UI (se backend estiver rodando): `http://localhost:8080/swagger-ui.html`

Endpoints importantes:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`
- Actuator / Prometheus: `http://localhost:8080/actuator/prometheus`
- Quadras CRUD: `GET/POST/PUT/DELETE /api/quadras` and related endpoints
- Reservas CRUD: `GET/POST/PUT/DELETE /api/reservas` and related endpoints

Prometheus + Grafana (opcional via Docker):

```powershell
docker-compose up -d
# Grafana: http://localhost:3000 (admin/admin)
# Prometheus: http://localhost:9090
```

Credenciais padrão para testes:

- Banco: configure em `playspot/src/main/resources/application.properties` (atualmente `root` / `1213`)
- Grafana: `admin` / `admin`
