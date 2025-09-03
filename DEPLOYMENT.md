# 🚀 Развертывание Landing Memory Bank

## 🎯 Обзор развертывания

Landing Memory Bank поддерживает множество способов развертывания, от локальной разработки до enterprise-решений в облаке.

## 🏠 Локальное развертывание

### 📋 Требования

#### Системные требования
- **ОС**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **Node.js**: 16.0.0 или выше
- **npm**: 8.0.0 или выше
- **Git**: 2.20.0 или выше
- **RAM**: минимум 4GB, рекомендуется 8GB+
- **Диск**: минимум 2GB свободного места

#### Проверка требований
```bash
# Проверка версий
node --version
npm --version
git --version

# Проверка доступной памяти
free -h  # Linux/macOS
wmic computersystem get TotalPhysicalMemory  # Windows
```

### 🚀 Быстрый старт

#### 1. Клонирование репозитория
```bash
# Клонировать репозиторий
git clone https://github.com/mrdudekowski/landing_memory_bank.git
cd landing_memory_bank

# Или скачать ZIP
wget https://github.com/mrdudekowski/landing_memory_bank/archive/main.zip
unzip main.zip
cd landing_memory_bank-main
```

#### 2. Установка зависимостей
```bash
# Установка зависимостей
npm install

# Проверка установки
npm list --depth=0
```

#### 3. Настройка конфигурации
```bash
# Копирование примера конфигурации
cp config.example.json config.json

# Редактирование конфигурации
nano config.json  # Linux/macOS
notepad config.json  # Windows
```

#### 4. Инициализация системы
```bash
# Инициализация Landing Memory Bank
npm run init

# Проверка инициализации
npm run validate-config
```

#### 5. Запуск приложения
```bash
# Запуск в режиме разработки
npm run dev

# Запуск в продакшн режиме
npm start

# Проверка статуса
curl http://localhost:3000/health
```

### 🔧 Настройка окружения

#### Переменные окружения
```bash
# Создание .env файла
cat > .env << EOF
NODE_ENV=development
PORT=3000
HOST=localhost
DEBUG=landing-memory-bank:*
LOG_LEVEL=INFO
EOF

# Или в Windows PowerShell
@"
NODE_ENV=development
PORT=3000
HOST=localhost
DEBUG=landing-memory-bank:*
LOG_LEVEL=INFO
"@ | Out-File -FilePath .env -Encoding UTF8
```

#### Конфигурация для разработки
```json
{
  "system": {
    "environment": "development",
    "debug": true,
    "logLevel": "DEBUG",
    "port": 3000,
    "host": "localhost"
  },
  "database": {
    "type": "sqlite",
    "path": "./data/development.db"
  },
  "security": {
    "ssl": false,
    "cors": {
      "enabled": true,
      "origin": "*"
    }
  }
}
```

## ☁️ Облачное развертывание

### 🚀 Heroku

#### 1. Подготовка к развертыванию
```bash
# Установка Heroku CLI
# macOS
brew install heroku/brew/heroku

# Windows
# Скачать с https://devcenter.heroku.com/articles/heroku-cli

# Ubuntu
curl https://cli-assets.heroku.com/install.sh | sh

# Вход в аккаунт
heroku login
```

#### 2. Создание приложения
```bash
# Создание Heroku приложения
heroku create your-landing-memory-bank

# Добавление переменных окружения
heroku config:set NODE_ENV=production
heroku config:set PORT=80
heroku config:set HOST=0.0.0.0
```

#### 3. Настройка базы данных
```bash
# Добавление PostgreSQL
heroku addons:create heroku-postgresql:mini

# Проверка конфигурации БД
heroku config | grep DATABASE_URL
```

#### 4. Развертывание
```bash
# Добавление Git remote
git remote add heroku https://git.heroku.com/your-landing-memory-bank.git

# Отправка кода
git push heroku main

# Запуск приложения
heroku open
```

### ☁️ AWS (Amazon Web Services)

#### 1. Подготовка AWS
```bash
# Установка AWS CLI
# macOS
brew install awscli

# Windows
# Скачать с https://aws.amazon.com/cli/

# Ubuntu
sudo apt-get install awscli

# Настройка учетных данных
aws configure
```

#### 2. Создание EC2 инстанса
```bash
# Создание ключевой пары
aws ec2 create-key-pair --key-name landing-memory-bank --query 'KeyMaterial' --output text > landing-memory-bank.pem

# Создание security group
aws ec2 create-security-group --group-name landing-memory-bank-sg --description "Security group for Landing Memory Bank"

# Добавление правил
aws ec2 authorize-security-group-ingress --group-name landing-memory-bank-sg --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name landing-memory-bank-sg --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name landing-memory-bank-sg --protocol tcp --port 443 --cidr 0.0.0.0/0
```

#### 3. Развертывание на EC2
```bash
# Подключение к инстансу
ssh -i landing-memory-bank.pem ubuntu@your-ec2-ip

# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Клонирование репозитория
git clone https://github.com/mrdudekowski/landing_memory_bank.git
cd landing_memory_bank

# Установка зависимостей
npm install

# Настройка PM2
sudo npm install -g pm2
pm2 start scripts/start.js --name "landing-memory-bank"
pm2 startup
pm2 save
```

### 🐳 Docker развертывание

#### 1. Создание Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine

# Установка зависимостей
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Копирование кода
COPY . .

# Создание пользователя
RUN addgroup -g 1001 -S nodejs
RUN adduser -S landing-memory-bank -u 1001
USER landing-memory-bank

# Открытие порта
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]
```

#### 2. Создание docker-compose.yml
```yaml
# docker-compose.yml
version: '3.8'

services:
  landing-memory-bank:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOST=0.0.0.0
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
      - ./config.json:/app/config.json
    restart: unless-stopped
    depends_on:
      - postgres

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=landing_memory_bank
      - POSTGRES_USER=landing_memory_bank
      - POSTGRES_PASSWORD=your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

#### 3. Запуск с Docker
```bash
# Сборка и запуск
docker-compose up -d

# Проверка статуса
docker-compose ps

# Просмотр логов
docker-compose logs -f landing-memory-bank

# Остановка
docker-compose down
```

### ☸️ Kubernetes развертывание

#### 1. Создание namespace
```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: landing-memory-bank
```

#### 2. Создание ConfigMap
```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: landing-memory-bank-config
  namespace: landing-memory-bank
data:
  config.json: |
    {
      "system": {
        "environment": "production",
        "port": 3000,
        "host": "0.0.0.0"
      }
    }
```

#### 3. Создание Deployment
```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: landing-memory-bank
  namespace: landing-memory-bank
spec:
  replicas: 3
  selector:
    matchLabels:
      app: landing-memory-bank
  template:
    metadata:
      labels:
        app: landing-memory-bank
    spec:
      containers:
      - name: landing-memory-bank
        image: landing-memory-bank:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        volumeMounts:
        - name: config
          mountPath: /app/config.json
          subPath: config.json
        - name: data
          mountPath: /app/data
        - name: logs
          mountPath: /app/logs
      volumes:
      - name: config
        configMap:
          name: landing-memory-bank-config
      - name: data
        persistentVolumeClaim:
          claimName: landing-memory-bank-data
      - name: logs
        persistentVolumeClaim:
          claimName: landing-memory-bank-logs
```

#### 4. Создание Service
```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: landing-memory-bank-service
  namespace: landing-memory-bank
spec:
  selector:
    app: landing-memory-bank
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

#### 5. Развертывание в Kubernetes
```bash
# Применение манифестов
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Проверка статуса
kubectl get pods -n landing-memory-bank
kubectl get services -n landing-memory-bank
```

## 🔧 CI/CD Pipeline

### 🚀 GitHub Actions

#### 1. Создание .github/workflows/deploy.yml
```yaml
# .github/workflows/deploy.yml
name: Deploy Landing Memory Bank

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint
    
    - name: Build project
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: |
        echo "Deploying to production..."
        # Добавьте команды развертывания
```

### 🔄 GitLab CI

#### 1. Создание .gitlab-ci.yml
```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm test
    - npm run lint
  only:
    - main
    - develop

build:
  stage: build
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
  only:
    - main

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploying to production..."
    # Добавьте команды развертывания
  only:
    - main
```

## 🔒 Безопасность развертывания

### 🛡️ SSL/TLS сертификаты

#### Let's Encrypt (бесплатно)
```bash
# Установка Certbot
sudo apt-get install certbot

# Получение сертификата
sudo certbot certonly --standalone -d your-domain.com

# Автоматическое обновление
sudo crontab -e
# Добавить строку:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

#### Nginx конфигурация
```nginx
# /etc/nginx/sites-available/landing-memory-bank
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 🔐 Переменные окружения

#### Безопасное хранение секретов
```bash
# Создание .env.production
cat > .env.production << EOF
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
DATABASE_URL=postgresql://user:password@localhost:5432/landing_memory_bank
JWT_SECRET=your-super-secret-jwt-key
API_KEY=your-api-key
EOF

# Установка прав доступа
chmod 600 .env.production
```

## 📊 Мониторинг и логирование

### 📈 Prometheus + Grafana

#### 1. Создание prometheus.yml
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'landing-memory-bank'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/metrics'
```

#### 2. Запуск мониторинга
```bash
# Запуск Prometheus
docker run -d \
  -p 9090:9090 \
  -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus

# Запуск Grafana
docker run -d \
  -p 3001:3000 \
  grafana/grafana
```

### 📝 Логирование

#### Winston конфигурация
```javascript
// config/logging.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'landing-memory-bank' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

## 🔄 Обновление и миграция

### 📦 Обновление приложения

#### Автоматическое обновление
```bash
# Создание скрипта обновления
cat > update.sh << 'EOF'
#!/bin/bash
echo "Updating Landing Memory Bank..."

# Остановка приложения
pm2 stop landing-memory-bank

# Обновление кода
git pull origin main

# Установка зависимостей
npm install

# Запуск приложения
pm2 start landing-memory-bank

echo "Update completed!"
EOF

chmod +x update.sh

# Добавление в cron для автоматического обновления
crontab -e
# Добавить строку:
# 0 2 * * 0 /path/to/landing-memory-bank/update.sh
```

#### Миграция базы данных
```bash
# Создание скрипта миграции
cat > migrate.sh << 'EOF'
#!/bin/bash
echo "Running database migrations..."

# Резервное копирование
cp data/landing_memory_bank.db data/backup_$(date +%Y%m%d_%H%M%S).db

# Запуск миграций
npm run migrate

echo "Migration completed!"
EOF

chmod +x migrate.sh
```

## 🚨 Устранение неполадок

### 🔍 Диагностика проблем

#### Проверка состояния системы
```bash
# Проверка процессов
ps aux | grep node
pm2 status

# Проверка портов
netstat -tulpn | grep :3000
lsof -i :3000

# Проверка логов
tail -f logs/system.log
tail -f logs/error.log

# Проверка ресурсов
htop
df -h
free -h
```

#### Перезапуск сервисов
```bash
# Перезапуск PM2
pm2 restart landing-memory-bank

# Перезапуск Nginx
sudo systemctl restart nginx

# Перезапуск PostgreSQL
sudo systemctl restart postgresql
```

### 📊 Анализ производительности

#### Lighthouse CI
```bash
# Установка Lighthouse CI
npm install -g @lhci/cli

# Запуск анализа
lhci autorun

# Просмотр результатов
lhci open
```

#### Load testing
```bash
# Установка Artillery
npm install -g artillery

# Создание теста нагрузки
cat > load-test.yml << EOF
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "API endpoints"
    requests:
      - get:
          url: "/api/health"
      - get:
          url: "/api/projects"
EOF

# Запуск теста
artillery run load-test.yml
```

---

## 📞 Поддержка развертывания

Если у вас возникли проблемы с развертыванием:

- **Email**: deployment@landingmemorybank.com
- **Telegram**: [@landing_memory_bank_deployment](https://t.me/landing_memory_bank_deployment)
- **Discord**: [#deployment](https://discord.gg/landing-memory-bank)
- **GitHub Issues**: [Создать issue](https://github.com/mrdudekowski/landing_memory_bank/issues/new)

---

**Последнее обновление**: 2025-01-09  
**Версия руководства**: 1.0.0  
**Следующее обновление**: 2025-04-09
