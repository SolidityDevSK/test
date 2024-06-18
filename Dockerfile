FROM node:18-alpine

# Çalışma dizinini belirle ve oluştur
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package.json package-lock.json ./

# Proje bağımlılıklarını yükle
RUN npm install

# Proje dosyalarını kopyala
COPY . .

# .env dosyasını kopyala
COPY .env .env

# Uygulamanın 3000 portunda çalışacağını belirle
EXPOSE 3000

# Uygulamayı başlat
CMD npm run dev
