# Reto de Automatización QA – FrontEnd (Sauce Demo)

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-239120?style=for-the-badge&logo=cucumber&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Allure Report](https://img.shields.io/badge/Allure_Report-F75C29?style=for-the-badge&logo=allure&logoColor=white)

Este repositorio contiene una solución empresarial y de alto rendimiento para la automatización de pruebas End-to-End (E2E) en la plataforma web [Sauce Demo](https://www.saucedemo.com/). El framework está desarrollado utilizando **Playwright**, **Cucumber (BDD)**, **TypeScript** y un pipeline robusto de **CI/CD con GitHub Actions + GitHub Pages**.

---

## 🚀 1. Instrucciones de Configuración y Arranque

Asegúrate de tener [Node.js v20+](https://nodejs.org/) instalado en tu sistema antes de comenzar.

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/JLevanoArbizu/levanocode-qa-frontend-playwright.git
   cd levanocode-qa-frontend-playwright
   ```

2. **Instalar las dependencias de forma limpia**:
   ```bash
   npm ci
   ```

3. **Descargar e instalar los navegadores de Playwright**:
   ```bash
   npx playwright install chromium
   ```

4. **Configurar Credenciales Locales**:
   Crea tus archivos de credenciales basados en las plantillas de ejemplo. Duplica el archivo `config/env/.env.example` y renómbralo como:
   *   `config/env/.env.qa` (Entorno de pruebas QA)
   *   `config/env/.env.prod` (Entorno de Producción)

   *Nota: Estos archivos están excluidos de Git en `.gitignore` para proteger la seguridad del framework.*

---

## 🎭 2. Guía de Ejecución de Pruebas en Local

El framework está optimizado para correr de forma híbrida: **Headed (con ventana visible) y ralentizado (SlowMo: 300ms) en local** para facilitar la depuración, y **Headless (silencioso) en la nube** para velocidad en CI/CD.

### A. Ejecución Rápida (Consola - Fast Feedback)
Ideal para ejecuciones ágiles en segundo plano mientras escribes código:
*   **Ejecutar en QA:**
    ```bash
    npm run test:qa
    ```
*   **Ejecutar en Desarrollo (DEV):**
    ```bash
    npm run test:dev
    ```
*   **Ejecutar en Producción (PROD):**
    ```bash
    npm run test:prod
    ```

### B. Ejecución Completa (Pruebas + Allure Dashboard + Servidor Web)
Este comando corre tus escenarios, inyecta metadatos del sistema operativo/navegador, unifica la tendencia histórica y **abre automáticamente una pestaña en tu navegador** con el tablero interactivo de Allure:
*   **Ejecutar en QA con Dashboard:**
    ```bash
    npm run test:allure:qa
    ```
*   **Ejecutar en DEV con Dashboard:**
    ```bash
    npm run test:allure:dev
    ```
*   **Ejecutar en PROD con Dashboard:**
    ```bash
    npm run test:allure:prod
    ```

### C. Ejecución Avanzada Filtrada por Etiquetas (Tags)
Cucumber te permite filtrar escenarios dinámicamente usando el separador `--` por consola. Esto funciona con cualquiera de los comandos anteriores:
*   **Correr solo pruebas de humo (`@smoke`) en QA:**
    ```bash
    npm run test:qa -- --tags "@smoke"
    ```
*   **Correr solo la suite de regresión (`@regression`) en DEV:**
    ```bash
    npm run test:dev -- --tags "@regression"
    ```
*   **Correr un flujo específico (ej. `@compra`) con reporte Allure:**
    ```bash
    npm run test:allure:qa -- --tags "@compra"
    ```
*   **Excluir un tag específico (ej. omitir pruebas fallidas temporales):**
    ```bash
    npm run test:qa -- --tags "not @failing"
    ```

---

## 📊 3. Estrategia Híbrida de Reportabilidad y Evidencias

El framework implementa dos motores de reporte para cubrir todas las audiencias (QA, Devs y Stakeholders):

### A. Cucumber HTML Report (Local / Feedback Técnico)
*   **Ubicación:** `reports/cucumber-report.html`
*   **Uso:** Un reporte jerárquico muy ligero de una sola página. Muestra los pasos Gherkin ejecutados y adjunta de forma interactiva las **capturas de pantalla tomadas automáticamente únicamente ante fallos**.

### B. Allure Report Dashboard (Ejecutivo / Trazabilidad Cloud)
*   **Ubicación Local:** `allure-report/index.html` (Servido mediante `npm run report:open`)
*   **Ubicación Cloud (GitHub Pages):** Desplegado automáticamente a la web pública del repositorio tras cada ejecución.
*   **Características Premium configuradas:**
    *   **Trend Widget:** Muestra la línea de tendencia histórica de éxitos y fallos en tus últimos builds.
    *   **Environment Metadata:** Muestra dinámicamente el SO, la versión de Node y el navegador en el que corrió la prueba.
    *   **Severity Tagging:** Clasifica tus escenarios por severidad (`@severity:blocker`, `@severity:minor`, etc.).
    *   **Inline Screenshots:** Capturas a pantalla completa embebidas directamente en el paso que causó el error.

---

## ☁️ 4. Pipeline de CI/CD en GitHub Actions

El archivo `.github/workflows/tests.yml` automatiza la ejecución ante cada `push`, `pull_request` o mediante **disparador manual (workflow_dispatch)**:

1.  **Contenedor Oficial de Playwright:** El pipeline corre en `mcr.microsoft.com/playwright:v1.60.0-jammy` garantizando consistencia absoluta del sistema operativo.
2.  **Seguridad Extrema (GitHub Secrets):** Las variables sensibles (`BASE_URL`, `SAUCE_USERNAME`, `SAUCE_PASSWORD`) se inyectan dinámicamente de forma encriptada en la nube.
3.  **Preservación de Historial (Trend):** El pipeline descarga dinámicamente la carpeta `history/` de la rama `gh-pages` antes de compilar el nuevo reporte Allure.
4.  **Autopublicación en GitHub Pages:** Sube de manera autónoma los resultados estáticos de Allure a la rama `gh-pages`, actualizando el link web público del reporte al instante.

---

## 🏛️ 5. Patrones de Diseño e Ingeniería de Calidad

*   **Page Object Model (POM):** Arquitectura limpia basada en una clase `BasePage.ts` que encapsula esperas dinámicas y acciones comunes, heredada por las páginas específicas (`LoginPage`, `InventoryPage`, etc.).
*   **World Pattern:** Aislamiento total de los contextos de navegación (`BrowserContext`) entre escenarios, preparando el framework para ejecuciones paralelas masivas sin fuga de memoria.
*   **Smart Evidences:** El gancho `After` en `hooks.ts` evalúa el resultado de la prueba. Toma fotos pesadas **exclusivamente si el escenario falló**, manteniendo el framework ligero y optimizado.

---

## 📁 6. Estructura Completa del Proyecto

```text
Playwright/
├── .github/workflows/
│   └── tests.yml              # Pipeline de CI/CD (GitHub Actions)
├── allure-report/                 # [GENERADO/IGNORADO] Reporte web interactivo final listo para visualizar.
├── allure-results/                # [TEMPORAL/IGNORADO] Archivos JSON crudos y fotos de la última ejecución.
├── config/env/
│   ├── .env.example           # Plantilla/Guía de ejemplo para credenciales locales.
│   ├── .env.qa                # Variables de entorno exclusivas para QA (Ignorado en Git).
│   └── .env.prod              # Variables de entorno exclusivas para Producción (Ignorado en Git).
├── docs/
│   ├── plan_mejoras_fases_completo.md # Hoja de ruta y roadmap de mejoras del framework.
│   └── resumen_arquitectura_proyecto.md # Resumen técnico detallado de la arquitectura.
├── features/
│   ├── compra.feature             # Escenario Gherkin E2E de compra completa y Checkout.
│   └── login.feature              # Escenarios Gherkin de Autenticación (Happy Path, bloqueos y DDT).
├── reports/
│   ├── cucumber-report.html       # [GENERADO] Reporte técnico nativo de Cucumber en formato HTML.
│   └── screenshots/               # Almacena evidencias visuales en formato PNG (Solo ante fallos).
├── scripts/
│   └── allure-metadata.js         # Inyecta dinámicamente sistema operativo, Node y navegador en Allure.
├── src/
│   ├── pages/                     # Capa de Interacción (POM)
│   │   ├── BasePage.ts            # Clase padre con métodos, esperas y aserciones comunes.
│   │   ├── LoginPage.ts           # Interacciones de la interfaz de inicio de sesión.
│   │   ├── InventoryPage.ts       # Acciones dentro del catálogo de productos.
│   │   ├── CartPage.ts            # Validaciones del listado de compras en el carrito.
│   │   └── CheckoutPage.ts        # Acciones para rellenar datos y finalizar transacciones.
│   ├── steps/                     # Capa de Enlace (Gherkin -> TS)
│   │   ├── compra.steps.ts
│   │   └── login.steps.ts
│   └── support/                   # Ciclo de Vida y Configuración del framework
│       ├── hooks.ts               # Setup, carga dinámica de .env y captura en fallo.
│       └── world.ts               # World Pattern para el aislamiento dinámico de contextos.
├── cucumber.js                    # Archivo de configuración global de CucumberJS.
├── package.json                   # Scripts NPM y gestión de dependencias del framework.
└── tsconfig.json                  # Configuración estricta de compilación de TypeScript.
```