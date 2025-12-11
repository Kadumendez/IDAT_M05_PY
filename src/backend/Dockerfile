# 1. IMAGEN BASE: Usamos Node 18 sobre Alpine 
FROM node:18-alpine

# 2. DIRECTORIO DE TRABAJO:
WORKDIR /app

# 3. CACHÉ DE DEPENDENCIAS (Paso clave):
COPY package*.json ./

# 4. INSTALACIÓN:
RUN npm install

# 5. CÓDIGO FUENTE:
COPY . .

# 6. COMPILACIÓN:
RUN npm run build

# 7. PUERTO:
EXPOSE 3000

# 8. COMANDO DE INICIO:
CMD ["npm", "start"]