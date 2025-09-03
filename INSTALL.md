# 📥 Установка Landing Memory Bank

Подробная инструкция по установке и настройке Landing Memory Bank в вашем проекте.

## 🎯 Варианты установки

### 1. 📦 Установка как NPM пакет (Рекомендуется)

```bash
# Установка в существующий проект
npm install @landing-memory-bank/core

# Или с yarn
yarn add @landing-memory-bank/core
```

### 2. 🐙 Клонирование репозитория

```bash
# Клонировать репозиторий
git clone https://github.com/mrdudekowski/landing_memory_bank.git

# Перейти в папку
cd landing_memory_bank

# Установить зависимости
npm install
```

### 3. 📥 Скачивание ZIP архива

1. Перейти на [GitHub репозиторий](https://github.com/mrdudekowski/landing_memory_bank)
2. Нажать кнопку "Code" → "Download ZIP"
3. Распаковать архив в нужную папку
4. Установить зависимости: `npm install`

## 🔧 Требования к системе

### 📋 Минимальные требования

- **Node.js**: 16.0.0 или выше
- **npm**: 8.0.0 или выше
- **Git**: для клонирования (опционально)
- **Оперативная память**: минимум 512MB
- **Дисковое пространство**: минимум 100MB

### 🚀 Рекомендуемые требования

- **Node.js**: 18.0.0 или выше
- **npm**: 9.0.0 или выше
- **Оперативная память**: 2GB или больше
- **Дисковое пространство**: 500MB или больше

### 🌐 Поддерживаемые платформы

- ✅ **Windows**: 10, 11
- ✅ **macOS**: 10.15 (Catalina) или выше
- ✅ **Linux**: Ubuntu 18.04+, CentOS 7+, Debian 9+
- ✅ **WSL**: Windows Subsystem for Linux

## 🚀 Пошаговая установка

### Шаг 1: Проверка системы

```bash
# Проверить версию Node.js
node --version

# Проверить версию npm
npm --version

# Проверить версию Git (если используется)
git --version
```

### Шаг 2: Скачивание Landing Memory Bank

```bash
# Вариант 1: Git clone
git clone https://github.com/mrdudekowski/landing_memory_bank.git
cd landing_memory_bank

# Вариант 2: Скачать ZIP
# 1. Перейти на https://github.com/mrdudekowski/landing_memory_bank
# 2. Нажать "Code" → "Download ZIP"
# 3. Распаковать в нужную папку
# 4. Перейти в папку
cd landing_memory_bank
```

### Шаг 3: Установка зависимостей

```bash
# Установить все зависимости
npm install

# Или с yarn
yarn install

# Проверить установку
npm list --depth=0
```

### Шаг 4: Настройка конфигурации

```bash
# Создать конфигурационный файл
cp config.example.json config.json

# Отредактировать настройки
nano config.json
# или
code config.json
```

### Шаг 5: Инициализация системы

```bash
# Запустить инициализацию
npm run init

# Или вручную
node scripts/init.js
```

### Шаг 6: Проверка установки

```bash
# Запустить систему
npm start

# Или в режиме разработки
npm run dev
```

## 🔧 Интеграция в существующий проект

### Вариант 1: Как модуль

```bash
# В папке вашего проекта
mkdir -p lib
cp -r ../landing_memory_bank ./lib/LandingMemoryBank

# Добавить в package.json
npm install ./lib/LandingMemoryBank
```

### Вариант 2: Как подмодуль Git

```bash
# В папке вашего проекта
git submodule add https://github.com/mrdudekowski/landing_memory_bank.git
git submodule update --init --recursive
```

### Вариант 3: Прямое копирование

```bash
# Скопировать только нужные файлы
cp -r ../landing_memory_bank/CORE ./src/memory-bank
cp -r ../landing_memory_bank/RULES_ENGINE ./src/rules
```

## ⚙️ Конфигурация

### 📝 Основные настройки

```json
{
  "project": {
    "name": "My Landing Page",
    "type": "landing-page",
    "complexity": "medium"
  },
  "system": {
    "autoMode": true,
    "memoryBankSize": "1GB"
  }
}
```

### 🌐 Настройки веб-разработки

```json
{
  "webDevelopment": {
    "frameworks": ["react", "vue", "vanilla"],
    "cssMethodology": "BEM",
    "responsiveDesign": true,
    "accessibility": "WCAG 2.1 AA"
  }
}
```

## 🎮 Первое использование

### 🚪 Активация системы

```javascript
// Базовое использование
import { LandingMemoryBank } from './LandingMemoryBank';

const memoryBank = new LandingMemoryBank({
  projectType: 'landing-page',
  complexity: 'medium',
  autoMode: true
});

// Активировать
await memoryBank.activate();
```

### 🔄 Переключение режимов

```javascript
// Ручное переключение
await memoryBank.switchMode('VAN_MODE');
await memoryBank.switchMode('PLAN_MODE');
await memoryBank.switchMode('CREATIVE_MODE');

// Автоматический режим
memoryBank.setAutoMode(true);
```

## 🐛 Устранение неполадок

### ❌ Частые проблемы

#### Проблема: Система не запускается

```bash
# Решение 1: Проверить зависимости
npm install

# Решение 2: Проверить конфигурацию
node scripts/validate-config.js

# Решение 3: Очистить кэш
npm run clean
```

#### Проблема: Режимы не переключаются

```javascript
// Решение: Проверить контекст
const context = memoryBank.getCurrentContext();
console.log('Current context:', context);

// Принудительное переключение
await memoryBank.forceSwitchMode('VAN_MODE');
```

#### Проблема: Знания не сохраняются

```bash
# Решение 1: Проверить права доступа
chmod 755 ./data

# Решение 2: Проверить диск
df -h

# Решение 3: Пересоздать базу
npm run reset-database
```

### 📋 Логи и отладка

```javascript
// Включить подробное логирование
memoryBank.setLogLevel('DEBUG');

// Просмотр логов
const logs = memoryBank.getLogs();
console.log(logs);

// Экспорт логов
await memoryBank.exportLogs('./logs.json');
```

## 🔧 Разработка и расширение

### 🚀 Запуск в режиме разработки

```bash
# Запуск с автоматической перезагрузкой
npm run dev

# Запуск тестов
npm test

# Запуск тестов с покрытием
npm run test:coverage
```

### 🔧 Создание собственного режима

```javascript
// Создание кастомного режима
class CustomMode extends BaseMode {
  constructor() {
    super('CUSTOM_MODE', 'Custom functionality');
  }
  
  async execute(context) {
    // Ваша логика
    return { success: true };
  }
}

// Регистрация режима
memoryBank.registerMode(new CustomMode());
```

## ✅ Проверка установки

После установки выполните следующие команды для проверки:

```bash
# Проверить версию
npm list landing-memory-bank

# Проверить статус системы
npm run validate-config

# Запустить тесты
npm test

# Запустить систему
npm start
```

Если все команды выполнились успешно, значит Landing Memory Bank установлен корректно! 🎉

---
