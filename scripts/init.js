#!/usr/bin/env node

/**
 * Landing Memory Bank - Скрипт инициализации
 * Инициализирует систему и создает необходимую структуру
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

class LandingMemoryBankInitializer {
  constructor() {
    this.projectRoot = process.cwd();
    this.configPath = path.join(this.projectRoot, 'config.json');
    this.dataPath = path.join(this.projectRoot, 'data');
    this.logsPath = path.join(this.projectRoot, 'logs');
    this.backupsPath = path.join(this.projectRoot, 'backups');
  }

  async init() {
    console.log(chalk.blue.bold('\n🧠 Landing Memory Bank - Инициализация системы\n'));
    
    try {
      // Проверка зависимостей
      await this.checkDependencies();
      
      // Создание структуры папок
      await this.createDirectoryStructure();
      
      // Настройка конфигурации
      await this.setupConfiguration();
      
      // Инициализация базы данных
      await this.initializeDatabase();
      
      // Создание скриптов запуска
      await this.createStartupScripts();
      
      // Финальная проверка
      await this.finalCheck();
      
      console.log(chalk.green.bold('\n✅ Landing Memory Bank успешно инициализирован!\n'));
      console.log(chalk.yellow('🚀 Для запуска выполните: npm start'));
      console.log(chalk.yellow('📚 Документация: README.md'));
      
    } catch (error) {
      console.error(chalk.red.bold('\n❌ Ошибка инициализации:'), error.message);
      process.exit(1);
    }
  }

  async checkDependencies() {
    const spinner = ora('Проверка зависимостей...').start();
    
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      if (!await fs.pathExists(packageJsonPath)) {
        throw new Error('package.json не найден. Убедитесь, что вы находитесь в корне проекта.');
      }
      
      const packageJson = await fs.readJson(packageJsonPath);
      if (!packageJson.dependencies) {
        throw new Error('Зависимости не установлены. Выполните npm install');
      }
      
      spinner.succeed('Зависимости проверены');
    } catch (error) {
      spinner.fail('Ошибка проверки зависимостей');
      throw error;
    }
  }

  async createDirectoryStructure() {
    const spinner = ora('Создание структуры папок...').start();
    
    try {
      const directories = [
        this.dataPath,
        this.logsPath,
        this.backupsPath,
        path.join(this.projectRoot, 'src'),
        path.join(this.projectRoot, 'dist'),
        path.join(this.projectRoot, 'tests')
      ];
      
      for (const dir of directories) {
        await fs.ensureDir(dir);
      }
      
      spinner.succeed('Структура папок создана');
    } catch (error) {
      spinner.fail('Ошибка создания структуры папок');
      throw error;
    }
  }

  async setupConfiguration() {
    const spinner = ora('Настройка конфигурации...').start();
    
    try {
      if (!await fs.pathExists(this.configPath)) {
        const configExamplePath = path.join(this.projectRoot, 'config.example.json');
        
        if (await fs.pathExists(configExamplePath)) {
          await fs.copy(configExamplePath, this.configPath);
          spinner.succeed('Конфигурация скопирована из примера');
        } else {
          // Создание базовой конфигурации
          const basicConfig = {
            project: {
              name: "Landing Memory Bank Project",
              type: "landing-page",
              complexity: "medium"
            },
            system: {
              autoMode: true,
              memoryBankSize: "1GB"
            }
          };
          
          await fs.writeJson(this.configPath, basicConfig, { spaces: 2 });
          spinner.succeed('Базовая конфигурация создана');
        }
      } else {
        spinner.succeed('Конфигурация уже существует');
      }
    } catch (error) {
      spinner.fail('Ошибка настройки конфигурации');
      throw error;
    }
  }

  async initializeDatabase() {
    const spinner = ora('Инициализация базы данных...').start();
    
    try {
      const dbPath = path.join(this.dataPath, 'memory-bank.db');
      
      // Создание базовой структуры базы данных
      const dbStructure = {
        version: '1.0.0',
        created: new Date().toISOString(),
        tables: ['knowledge', 'projects', 'modes', 'rules'],
        status: 'initialized'
      };
      
      await fs.writeJson(path.join(this.dataPath, 'db-structure.json'), dbStructure, { spaces: 2 });
      
      // Создание файла .gitkeep для папки data
      await fs.writeFile(path.join(this.dataPath, '.gitkeep'), '');
      
      spinner.succeed('База данных инициализирована');
    } catch (error) {
      spinner.fail('Ошибка инициализации базы данных');
      throw error;
    }
  }

  async createStartupScripts() {
    const spinner = ora('Создание скриптов запуска...').start();
    
    try {
      // Основной файл запуска
      const mainScript = `#!/usr/bin/env node

const { LandingMemoryBank } = require('../dist/index.js');

async function main() {
  try {
    const memoryBank = new LandingMemoryBank();
    await memoryBank.activate();
    
    console.log('🧠 Landing Memory Bank активирован');
  } catch (error) {
    console.error('❌ Ошибка запуска:', error.message);
    process.exit(1);
  }
}

main();
`;
      
      await fs.writeFile(path.join(this.projectRoot, 'scripts/start.js'), mainScript);
      
      // Скрипт разработки
      const devScript = `#!/usr/bin/env node

const { LandingMemoryBank } = require('../dist/index.js');

async function dev() {
  try {
    const memoryBank = new LandingMemoryBank({
      development: true,
      watchMode: true
    });
    
    await memoryBank.activate();
    console.log('🧠 Landing Memory Bank запущен в режиме разработки');
  } catch (error) {
    console.error('❌ Ошибка запуска:', error.message);
    process.exit(1);
  }
}

dev();
`;
      
      await fs.writeFile(path.join(this.projectRoot, 'scripts/dev.js'), devScript);
      
      // Делаем скрипты исполняемыми
      await fs.chmod(path.join(this.projectRoot, 'scripts/start.js'), 0o755);
      await fs.chmod(path.join(this.projectRoot, 'scripts/dev.js'), 0o755);
      
      spinner.succeed('Скрипты запуска созданы');
    } catch (error) {
      spinner.fail('Ошибка создания скриптов запуска');
      throw error;
    }
  }

  async finalCheck() {
    const spinner = ora('Финальная проверка...').start();
    
    try {
      const requiredFiles = [
        'package.json',
        'config.json',
        'README.md'
      ];
      
      const requiredDirs = [
        'data',
        'logs',
        'backups',
        'scripts'
      ];
      
      for (const file of requiredFiles) {
        if (!await fs.pathExists(path.join(this.projectRoot, file))) {
          throw new Error(`Не найден файл: ${file}`);
        }
      }
      
      for (const dir of requiredDirs) {
        if (!await fs.pathExists(path.join(this.projectRoot, dir))) {
          throw new Error(`Не найдена папка: ${dir}`);
        }
      }
      
      spinner.succeed('Финальная проверка пройдена');
    } catch (error) {
      spinner.fail('Ошибка финальной проверки');
      throw error;
    }
  }
}

// Запуск инициализации
if (require.main === module) {
  const initializer = new LandingMemoryBankInitializer();
  initializer.init().catch(console.error);
}

module.exports = LandingMemoryBankInitializer;
