# AI ACADEMIC TOOL - Cloud & DevOps Project

![Status](https://img.shields.io/badge/Status-Active-success)
![AWS](https://img.shields.io/badge/AWS-EC2%20%7C%20ECR-orange)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![Terraform](https://img.shields.io/badge/Terraform-IaC-purple)
![CI/CD](https://img.shields.io/badge/GitHub-Actions-black)

## 📑 Índice
1. [Introducción y Objetivos](#📋-introducción-y-objetivos)
2. [Diseño de Arquitectura](#🏗️-diseño-de-arquitectura)
3. [Stack Tecnológico](#🧰-stack-tecnológico)
4. [Estructura del proyecto](#📁-estructura-del-proyecto)
5. [Prerrequisitos](#📌-prerrequisitos)
6. [Instalación y Ejecución Local (Paso a Paso)](#🚀-instalación-y-ejecución-local-paso-a-paso)
  - [Backend](#backend)
  - [Frontend](#frontend)
7. [Contenerización con Docker](#🐳-contenerización-con-docker)
  - [Construir y ejecutar localmente](#construir-y-ejecutar-localmente)
  - [Publicar imágenes en AWS ECR](#publicar-imágenes-en-aws-ecr)
8. [Infraestructura en AWS (Terraform)](#🏗️-infraestructura-en-aws-terraform)
9. [Pipeline CI/CD](#⚙️-pipeline-cicd)
10. [Testing y QA](#✅-testing-y-qa)
11. [Resolución de problemas](#🛠️-resolución-de-problemas-comunes)
12. [Referencias](#📚-referencias)
13. [Equipo](#🤝-equipo)

---

## 📋 Introducción y Objetivos

Proyecto que entrega un asistente vocacional basado en IA, desplegado en contenedores y administrado con prácticas Cloud & DevOps en AWS. El objetivo es proporcionar una aplicación escalable, reproducible y fácil de desarrollar localmente.

---

## 🏗️ Diseño de Arquitectura

Mapa conceptual (ASCII) adaptado al proyecto:

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ HTTP/80
       ▼
┌──────────────────────────────────┐
│   Elastic IP / Load Balancer     │
│   (puerto 80 -> frontend)        │
└─────────────┬────────────────────┘
              │
              ▼
   ┌───────────────────────────────┐       ┌───────────────────────────┐
   │ Frontend (Nginx)              │─────> │ Backend API (Express)     │
   │ - Sirve build de Vite/React   │  API  │ - Rutas REST / Websockets │
   │ - Puerto 80 (contenedor)      │       │ - Puerto 3000             │
   └─────────────┬─────────────────┘       └────────────┬──────────────┘
                 │ Pull desde ECR                       │ llama/Groq
                 ▼                                      ▼
   ┌───────────────────────────────┐      ┌──────────────────────┐
   │ AWS ECR (Container Registry)  │<-----│ Groq / LLM (externo) │
   │ - Imágenes frontend/backend   │      └──────────────────────┘
   └─────────────┬─────────────────┘
                 │
                 ▼
   ┌───────────────────────────────┐
   │ EC2 (Docker Engine) / Hosts   │
   │ - Ejecuta contenedores        │
   │ - Provisionado por Terraform  │
   └───────────────────────────────┘
```
Flujo de despliegue (CI/CD):

GitHub Actions -> Build Docker -> Push a ECR -> EC2 pull & run

Notas:
- `infra/` contiene la configuración Terraform (EC2, ECR, security groups).
- `src/frontend` y `src/backend` son las piezas desplegables como imágenes.
- El backend puede comunicarse externamente con Groq (LLM) usando su API key.


---

## 🧰 Stack Tecnológico
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Contenedores: Docker
- IaC: Terraform
- Registro: AWS ECR
- Hosting: AWS EC2 (elastic IP) / Docker Engine
- CI/CD: GitHub Actions

---

## 📁 Estructura del proyecto

Estructura adaptada al repositorio actual (resumen):


```
IDAT_M05_PY/
├── NOTES DK.TXT
├── README.md
├── ci/
│   └── cd/
│       └── pipeline-info.txt
├── docs/
│   └── arquitectura.md
├── infra/                  # Terraform (ec2, ecr, etc.)
│   ├── ec2.tf
│   ├── ecr.tf
│   ├── main.tf
│   ├── outputs.tf
│   ├── terraform.tfstate
│   └── variables.tf
├── src/
│   ├── backend/            # Backend Node.js + Dockerfile
│   │   ├── chat_api_test.pc.json
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       └── server.ts
│   └── frontend/           # Frontend Vite + Tailwind + Dockerfile
│       ├── bun.lockb
│       ├── Dockerfile
│       ├── package.json
│       ├── vite.config.ts
│       ├── public/
│       │   └── robots.txt
│       └── src/
│           ├── main.tsx
│           ├── App.tsx
│           ├── pages/
│           └── components/
└── .gitignore (y otros archivos de configuración)
```

Notas:
- Actualiza esta sección si agregas nuevas carpetas (por ejemplo `.github/` o scripts de despliegue).
- Para ver detalles de un submódulo, navega a la carpeta y lista archivos (`ls` / `dir`).


## 📌 Prerrequisitos
- Git
- Node.js 18+ y npm (o pnpm/yarn)
- Docker Desktop (Linux containers)
- AWS CLI v2 configured (creds con permisos ECR/Terraform)
- Terraform v1.0+
- (Opcional) Newman para ejecutar colecciones Postman

Comprueba versiones:

```powershell
node -v
npm -v
docker --version
terraform -v
aws --version
```

---

## 🚀 Instalación y Ejecución Local (Paso a Paso)

Clonar el repositorio:

```bash
git clone https://github.com/Kadumendez/IDAT_M05_PY.git
cd IDAT_M05_PY
```

### Backend

1. Ir al directorio del backend:

```bash
cd src/backend
```

2. Crear un archivo `.env` (ejemplo mínimo):

```
PORT=3000
GROQ_API_KEY=tu_groq_api_key
```

3. Instalar dependencias y ejecutar en modo desarrollo:

```bash
npm install
npm run dev
```

4. Producción (si existe script `start`):

```bash
npm run build    # si aplica
npm start
```

### Frontend

1. Ir al directorio del frontend:

```bash
cd ../../src/frontend
```

2. Instalar dependencias y ejecutar:

```bash
npm install
npm run dev      # Vite - desarrollo en hot-reload
```

3. Para producción (build estático servido por Nginx en el Dockerfile del frontend):

```bash
npm run build
# luego usar el Dockerfile incluido para empaquetar con Nginx
```

---

## 🐳 Contenerización con Docker

### Construir y ejecutar localmente

#### Backend (local)

Desde `src/backend`:

```bash
docker build -t chat-beca18-backend:latest .
docker run --rm -p 3000:3000 --env-file .env --name chat-backend chat-beca18-backend:latest
```

#### Frontend (Nginx)

Desde `src/frontend`:

```bash
docker build -t chat-beca18-frontend:latest .
docker run --rm -p 8080:80 --name chat-frontend chat-beca18-frontend:latest
```

Si prefieres usar `docker compose` (no incluido por defecto), crea un `docker-compose.yml` con servicios `frontend` y `backend` y ejecuta `docker compose up --build`.

### Publicar imágenes en AWS ECR

1. Obtener el endpoint del repositorio ECR (o crear repositorio en la consola / Terraform):

2. Login en ECR:

```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
```

3. Etiquetar y pushear (ejemplo backend):

```bash
docker tag chat-beca18-backend:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/chat-beca18-backend:latest
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/chat-beca18-backend:latest
```

Repetir para `chat-beca18-frontend`.

---

## 🏗️ Infraestructura en AWS (Terraform)

Los archivos de Terraform están en `infra/`.

Comandos básicos:

```bash
cd infra
terraform init
terraform plan -out=tfplan
terraform apply "tfplan"
# o
terraform apply -auto-approve
```

Después del `apply`, puedes obtener outputs (por ejemplo URL del ECR) con:

```bash
terraform output -json
terraform output ecr_repository_url
```

Si Terraform crea recursos ECR, recuerda usar esa URL para taggear y pushear tus imágenes.

---

## ⚙️ Pipeline CI/CD

El pipeline (ubicado en `.github/workflows/`) normalmente realiza:
- Checkout
- Instalación de dependencias y tests
- Build de imágenes Docker
- Login en ECR (usando secrets de GitHub)
- Push de imágenes a ECR
- (Opcional) Trigger de despliegue en EC2/ECS o con Terraform

En tus GitHub Secrets debes configurar al menos:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `GROQ_API_KEY`

Ejemplo de pasos para GitHub Actions:

- Build & Test
- aws ecr login
- docker build, tag, push
- terraform apply (si lo deseas desde CI, con cuidado)

---

## ✅ Testing y QA

- Pruebas unitarias/integración: `npm test` (si está definido)
- Newman (Postman):

```bash
newman run path/to/collection.json -e path/to/env.json
```

- Pruebas manuales rápidas:

```bash
curl http://localhost:3000/health
curl http://localhost:8080
```

---

## 🛠️ Resolución de problemas comunes
- Si `npm run dev` falla en frontend: elimina `node_modules` y reinstala `npm ci` o `npm install`.
- Si Docker no arranca: reinicia Docker Desktop y verifica que WSL2 (Windows) esté activo.
- Errores ECR al pushear: verifica `aws ecr get-login-password` y permisos IAM.
- Terraform: si hay drift, usa `terraform plan` y revisión manual antes del `apply`.

---

## 📚 Referencias
- Amazon Web Services — documentación ECR/EC2
- Terraform — documentación oficial
- Docker — guías oficiales
- Node.js & Express — documentación oficial
- React & Vite — documentación oficial

---

## 🤝 Equipo
- Kadú Desposorio Mendez 
- Nataly Salcedo Guerra

---

[Click para volver al inicio](#ai-academic-tool---cloud--devops-project)

