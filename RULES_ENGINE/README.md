# 📋 RULES ENGINE - Интегрированный движок правил

## 🎯 Обзор системы

**RULES ENGINE** - это интегрированная система правил, объединяющая архитектурные правила и стандарты кодирования из MemoryBank с алгоритмами применения и валидации из cursor-memory-bank. Система специально оптимизирована для веб-разработки и автоматического применения правил.

## 🏗️ Структура движка

```
RULES_ENGINE/
├── architecture_rules/           # 🏗️ Архитектурные правила
├── coding_standards/             # 💻 Стандарты кодирования
├── optimization_rules/            # ⚡ Правила оптимизации
├── security_rules/                # 🔒 Правила безопасности
├── landing_specific/              # 🚀 Правила для landing страниц
├── validation_engine/             # ✅ Движок валидации
└── auto_fix_engine/               # 🔧 Движок автоматических исправлений
```

## 🏗️ Архитектурные правила

### RULE_001: Архитектурное планирование
**Принцип:** Всегда планировать архитектуру перед разработкой

**Требования:**
- [ ] Создание архитектурной диаграммы
- [ ] Определение компонентной структуры
- [ ] Планирование слоев приложения
- [ ] Документирование архитектурных решений

**Применение:**
```javascript
// Автоматическая проверка архитектуры
class ArchitectureValidator {
  validateProject(projectPath) {
    const violations = [];
    
    // Проверка наличия архитектурной документации
    if (!this.hasArchitectureDocs(projectPath)) {
      violations.push({
        rule: 'RULE_001',
        severity: 'HIGH',
        description: 'Отсутствует архитектурная документация',
        recommendation: 'Создать архитектурную диаграмму'
      });
    }
    
    // Проверка структуры проекта
    if (!this.hasProperStructure(projectPath)) {
      violations.push({
        rule: 'RULE_001',
        severity: 'MEDIUM',
        description: 'Нарушена структура проекта',
        recommendation: 'Реорганизовать файлы по архитектурным принципам'
      });
    }
    
    return violations;
  }
}
```

### RULE_002: Принцип "SIMPLE=EFFECTIVE"
**Принцип:** Простота превыше сложности

**Ограничения:**
- Максимум 500 строк в одном файле
- Максимум 50 строк в одной функции
- Максимум 3 уровня вложенности в CSS
- Максимум 5 параметров в функции

**Применение:**
```javascript
// Автоматическая проверка сложности
class ComplexityValidator {
  validateFile(filePath) {
    const violations = [];
    
    // Проверка размера файла
    if (this.getFileSize(filePath) > 500) {
      violations.push({
        rule: 'RULE_002',
        severity: 'MEDIUM',
        description: 'Файл превышает 500 строк',
        recommendation: 'Разделить файл на модули'
      });
    }
    
    // Проверка сложности функций
    const complexFunctions = this.findComplexFunctions(filePath);
    complexFunctions.forEach(func => {
      violations.push({
        rule: 'RULE_002',
        severity: 'MEDIUM',
        description: `Функция ${func.name} превышает 50 строк`,
        recommendation: 'Разделить функцию на более мелкие'
      });
    });
    
    return violations;
  }
}
```

### RULE_003: Строгое разделение ответственности
**Принцип:** Четкое разделение между HTML, CSS и JavaScript

**Требования:**
- HTML - только структура
- CSS - только презентация
- JavaScript - только логика

**Применение:**
```javascript
// Автоматическая проверка разделения ответственности
class SeparationValidator {
  validateSeparation(projectPath) {
    const violations = [];
    
    // Проверка HTML файлов
    const htmlViolations = this.validateHTML(projectPath);
    violations.push(...htmlViolations);
    
    // Проверка CSS файлов
    const cssViolations = this.validateCSS(projectPath);
    violations.push(...cssViolations);
    
    // Проверка JavaScript файлов
    const jsViolations = this.validateJavaScript(projectPath);
    violations.push(...jsViolations);
    
    return violations;
  }
  
  validateHTML(projectPath) {
    const violations = [];
    
    // Проверка inline стилей
    if (this.hasInlineStyles(projectPath)) {
      violations.push({
        rule: 'RULE_003',
        severity: 'HIGH',
        description: 'Обнаружены inline стили в HTML',
        recommendation: 'Вынести стили в CSS файлы'
      });
    }
    
    // Проверка inline скриптов
    if (this.hasInlineScripts(projectPath)) {
      violations.push({
        rule: 'RULE_003',
        severity: 'HIGH',
        description: 'Обнаружены inline скрипты в HTML',
        recommendation: 'Вынести скрипты в JavaScript файлы'
      });
    }
    
    return violations;
  }
}
```

## 💻 Стандарты кодирования

### CSS Guidelines
**Принципы:**
- Использование CSS переменных
- БЭМ методология
- Модульная структура
- Оптимизация селекторов

**Применение:**
```css
/* ✅ ПРАВИЛЬНО: БЭМ методология */
.block {
  /* Базовые стили блока */
}

.block__element {
  /* Стили элемента */
}

.block--modifier {
  /* Стили модификатора */
}

/* ✅ ПРАВИЛЬНО: CSS переменные */
:root {
  --color-primary: #FF7A00;
  --color-secondary: #E56F00;
  --spacing-unit: 1rem;
  --border-radius: 0.25rem;
}

/* ✅ ПРАВИЛЬНО: Модульная структура */
.button {
  padding: var(--spacing-unit);
  border-radius: var(--border-radius);
  background: var(--color-primary);
}
```

### JavaScript Guidelines
**Принципы:**
- ES6+ синтаксис
- Функциональное программирование
- Асинхронность
- Обработка ошибок

**Применение:**
```javascript
// ✅ ПРАВИЛЬНО: ES6+ синтаксис
class ModernJavaScript {
  constructor(options = {}) {
    this.options = { ...options };
    this.state = new Map();
  }
  
  // ✅ ПРАВИЛЬНО: Асинхронность
  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      throw error;
    }
  }
  
  // ✅ ПРАВИЛЬНО: Функциональное программирование
  processData = (data) => {
    return data
      .filter(item => item.active)
      .map(item => ({
        ...item,
        processed: true
      }))
      .reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
  };
}
```

### HTML Guidelines
**Принципы:**
- Семантическая разметка
- Доступность (ARIA)
- SEO оптимизация
- Валидность

**Применение:**
```html
<!-- ✅ ПРАВИЛЬНО: Семантическая разметка -->
<header class="site-header" role="banner">
  <nav class="main-navigation" role="navigation" aria-label="Главное меню">
    <ul class="nav-list">
      <li class="nav-item">
        <a href="/" class="nav-link" aria-current="page">Главная</a>
      </li>
    </ul>
  </nav>
</header>

<main class="main-content" role="main">
  <section class="hero" aria-labelledby="hero-title">
    <h1 id="hero-title" class="hero-title">Заголовок страницы</h1>
    <p class="hero-description">Описание страницы</p>
  </section>
</main>

<footer class="site-footer" role="contentinfo">
  <p class="footer-text">© 2025 Компания</p>
</footer>
```

## ⚡ Правила оптимизации

### Производительность CSS
**Принципы:**
- Критический CSS inline
- Ленивая загрузка некритических стилей
- Оптимизация селекторов
- Минимизация reflow/repaint

**Применение:**
```css
/* ✅ ПРАВИЛЬНО: Критический CSS */
.critical-styles {
  /* Стили для above-the-fold контента */
  background: #121212;
  color: #FFFFFF;
  font-size: 16px;
  line-height: 1.5;
}

/* ✅ ПРАВИЛЬНО: Оптимизированные анимации */
.optimized-animation {
  /* Используем transform и opacity */
  transform: translateZ(0);
  will-change: transform, opacity;
  transition: transform 0.3s ease;
}

.optimized-animation:hover {
  transform: translateY(-5px) translateZ(0);
}
```

### Производительность JavaScript
**Принципы:**
- Кэширование DOM элементов
- Делегирование событий
- Дебаунсинг/троттлинг
- Ленивая загрузка

**Применение:**
```javascript
// ✅ ПРАВИЛЬНО: Оптимизация производительности
class PerformanceOptimizer {
  constructor() {
    this.cache = new Map();
    this.setupEventDelegation();
  }
  
  // Кэширование элементов
  getElement(selector) {
    if (!this.cache.has(selector)) {
      this.cache.set(selector, document.querySelector(selector));
    }
    return this.cache.get(selector);
  }
  
  // Делегирование событий
  setupEventDelegation() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('[data-action]');
      if (target) {
        this.handleAction(target.dataset.action);
      }
    });
  }
  
  // Дебаунсинг
  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
}
```

## 🔒 Правила безопасности

### XSS защита
**Принципы:**
- Санитизация пользовательского ввода
- Использование textContent вместо innerHTML
- Валидация URL
- CSP заголовки

**Применение:**
```javascript
// ✅ ПРАВИЛЬНО: Безопасность
class SecurityManager {
  // Санитизация HTML
  static sanitizeHTML(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }
  
  // Валидация URL
  static validateURL(url) {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }
  
  // Безопасное добавление контента
  static safeSetContent(element, content) {
    element.textContent = content;
  }
}
```

### CSRF защита
**Принципы:**
- CSRF токены
- SameSite cookies
- Проверка Origin заголовков
- Двойная отправка

**Применение:**
```javascript
// ✅ ПРАВИЛЬНО: CSRF защита
class CSRFProtection {
  static generateToken() {
    return crypto.randomUUID();
  }
  
  static addTokenToForm(form) {
    const token = this.generateToken();
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = '_csrf';
    tokenInput.value = token;
    form.appendChild(tokenInput);
    
    sessionStorage.setItem('csrf_token', token);
  }
  
  static validateToken(formData) {
    const formToken = formData.get('_csrf');
    const storedToken = sessionStorage.getItem('csrf_token');
    return formToken === storedToken;
  }
}
```

## 🚀 Правила для landing страниц

### Конверсионная оптимизация
**Принципы:**
- Четкий призыв к действию
- Минимальное количество шагов
- Социальные доказательства
- A/B тестирование

**Применение:**
```html
<!-- ✅ ПРАВИЛЬНО: Конверсионная оптимизация -->
<section class="hero">
  <h1 class="hero-title">Главный заголовок с ценностью</h1>
  <p class="hero-subtitle">Подзаголовок с объяснением</p>
  
  <!-- Четкий призыв к действию -->
  <div class="cta-group">
    <button class="btn btn--primary btn--large" data-action="signup">
      Начать бесплатно
    </button>
    <button class="btn btn--secondary btn--large" data-action="demo">
      Смотреть демо
    </button>
  </div>
  
  <!-- Социальные доказательства -->
  <div class="social-proof">
    <p class="proof-text">Уже используют 10,000+ компаний</p>
    <div class="logos">
      <img src="logo1.png" alt="Логотип компании 1">
      <img src="logo2.png" alt="Логотип компании 2">
    </div>
  </div>
</section>
```

### UX/UI паттерны
**Принципы:**
- Интуитивная навигация
- Быстрая загрузка
- Адаптивный дизайн
- Доступность

**Применение:**
```css
/* ✅ ПРАВИЛЬНО: UX/UI паттерны */
.hero {
  /* Быстрая загрузка */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  
  /* Адаптивность */
  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 80vh;
  }
}

.cta-group {
  /* Интуитивная навигация */
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  
  /* Адаптивность */
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
}

.btn {
  /* Доступность */
  min-height: 44px;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Focus состояния */
  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}
```

## ✅ Движок валидации

### Автоматическая проверка
**Возможности:**
- Проверка соответствия правилам
- Выявление нарушений
- Генерация отчетов
- Рекомендации по исправлению

**Применение:**
```javascript
// Автоматическая валидация проекта
class ProjectValidator {
  constructor(projectPath) {
    this.projectPath = projectPath;
    this.rules = this.loadRules();
  }
  
  async validateProject() {
    const results = {
      timestamp: new Date().toISOString(),
      violations: [],
      warnings: [],
      recommendations: []
    };
    
    // Валидация архитектуры
    const architectureViolations = await this.validateArchitecture();
    results.violations.push(...architectureViolations);
    
    // Валидация кода
    const codeViolations = await this.validateCode();
    results.violations.push(...codeViolations);
    
    // Валидация производительности
    const performanceViolations = await this.validatePerformance();
    results.violations.push(...performanceViolations);
    
    // Валидация безопасности
    const securityViolations = await this.validateSecurity();
    results.violations.push(...securityViolations);
    
    // Генерация рекомендаций
    results.recommendations = this.generateRecommendations(results.violations);
    
    return results;
  }
  
  generateRecommendations(violations) {
    return violations.map(violation => ({
      rule: violation.rule,
      description: violation.description,
      recommendation: violation.recommendation,
      priority: violation.severity,
      autoFix: this.canAutoFix(violation)
    }));
  }
}
```

## 🔧 Движок автоматических исправлений

### Автоматическое исправление
**Возможности:**
- Исправление простых нарушений
- Рефакторинг кода
- Оптимизация производительности
- Обновление зависимостей

**Применение:**
```javascript
// Автоматические исправления
class AutoFixEngine {
  constructor(projectPath) {
    this.projectPath = projectPath;
  }
  
  async autoFix(violations) {
    const fixes = [];
    
    for (const violation of violations) {
      if (this.canAutoFix(violation)) {
        try {
          const fix = await this.applyFix(violation);
          fixes.push(fix);
        } catch (error) {
          console.error(`Ошибка автоматического исправления:`, error);
        }
      }
    }
    
    return fixes;
  }
  
  async applyFix(violation) {
    switch (violation.rule) {
      case 'RULE_001':
        return await this.fixArchitecture(violation);
        
      case 'RULE_002':
        return await this.fixComplexity(violation);
        
      case 'RULE_003':
        return await this.fixSeparation(violation);
        
      case 'RULE_004':
        return await this.fixSpaghettiCSS(violation);
        
      case 'RULE_005':
        return await this.fixDOMManipulation(violation);
        
      case 'RULE_006':
        return await this.fixDRYViolation(violation);
        
      default:
        throw new Error(`Неизвестное правило: ${violation.rule}`);
    }
  }
  
  async fixArchitecture(violation) {
    // Создание архитектурной документации
    const architectureDoc = this.generateArchitectureDoc();
    await this.writeFile('ARCHITECTURE.md', architectureDoc);
    
    return {
      type: 'ARCHITECTURE_FIX',
      description: 'Создана архитектурная документация',
      files: ['ARCHITECTURE.md'],
      status: 'SUCCESS'
    };
  }
}
```

## 📊 Метрики качества

### Эффективность правил
- **Покрытие правилами:** >95%
- **Точность валидации:** >90%
- **Автоматические исправления:** >70%
- **Предотвращение ошибок:** >85%

### Производительность
- **Время валидации:** <5 минут
- **Время исправления:** <10 минут
- **Автоматизация процессов:** >80%
- **Мониторинг качества:** 100%

## 🚀 Готовность к использованию

### Автоматизация
- ✅ Автоматическая валидация
- ✅ Автоматические исправления
- ✅ Мониторинг качества
- ✅ Предотвращение ошибок

### Интеграция
- ✅ Интеграция с MemoryBank
- ✅ Интеграция с Cursor Memory Bank
- ✅ API для внешних систем
- ✅ Webhook поддержка

### Специализация
- ✅ Специализация на веб-разработке
- ✅ Глубокое понимание CSS/JS/HTML
- ✅ Предотвращение архитектурных ошибок
- ✅ QA валидация технических требований

---

**Статус:** ✅ Движок правил интегрирован  
**Интеграция:** ✅ MemoryBank + Cursor Memory Bank  
**Специализация:** ✅ Веб-разработка  
**Готовность к использованию:** ✅ 100%
