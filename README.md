# Reto de Automatización QA – FrontEnd (Sauce Demo)

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-239120?style=for-the-badge&logo=cucumber&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

Este repositorio contiene la resolución del reto de automatización End-to-End (E2E) para la aplicación web [Sauce Demo](https://www.saucedemo.com/), desarrollado con **Playwright**, **Cucumber (BDD)** y **TypeScript**.

---

##  1. Instrucciones de Configuración

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema antes de comenzar.

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/JLevanoArbizu/levanocode-qa-frontend-playwright.git
   cd levanocode-qa-frontend-playwright
   ```

2. **Instalar las dependencias del proyecto**:
   ```bash
   npm install
   ```

3. **Instalar los navegadores necesarios para Playwright**:
   ```bash
   npx playwright install
   ```

---

##  2. Ejecución de Pruebas

El framework está preparado para ejecutarse bajo diferentes ambientes y mediante filtros de etiquetas (Tags) configurados en los archivos Gherkin.

### Ejecución General y Multi-Ambiente
Las pruebas leen dinámicamente la URL desde `data/config.json`. Puedes controlar el ambiente usando la variable de entorno `ENV` (Ejemplos para Windows PowerShell):

* **Ejecutar suite completa en QA (Por Defecto)**:
  ```powershell
  $env:ENV="qa"; npm run test:html
  ```
  *(O simplemente ejecuta `npm run test:html` en la terminal).*

* **Ejecutar en otros ambientes**:
  ```powershell
  $env:ENV="dev"; npm run test:html
  $env:ENV="prod"; npm run test:html
  ```

### Ejecución Filtrada por Etiquetas (Tags)
Para apuntar a funcionalidades o flujos específicos:

* **Happy Path / Flujo principal (`@smoke`)**:
  ```powershell
  npm run test:html -- --tags "@smoke"
  ```
* **Validaciones de errores y bloqueos (`@negative`)**:
  ```powershell
  npm run test:html -- --tags "@negative"
  ```
* **Módulo de Autenticación (`@login`)**:
  ```powershell
  npm run test:html -- --tags "@login"
  ```
* **Flujo completo de Compra E2E (`@compra` o `@e2e`)**:
  ```powershell
  npm run test:html -- --tags "@compra"
  ```

---

##  3. Reportes y Evidencias

Al ejecutar cualquier prueba con el comando `npm run test:html`, se autogenerará un reporte detallado.

* **Ubicación**: `reports/cucumber-report.html`
* **Contenido**: Abre el archivo `.html` en cualquier navegador web para visualizar la ejecución paso a paso, los tiempos de respuesta y las **capturas de pantalla de auditoría visual** embebidas automáticamente en el reporte.

---

##  4. Cobertura del Reto y Criterios de Aceptación

El framework ha sido diseñado para cumplir con la historia de usuario principal:
> *Como un cliente de Sauce Demo, quiero poder iniciar sesión, agregar productos al carrito y completar una compra para poder adquirir los productos que necesito.*

Se han automatizado y validado los siguientes escenarios:
- [x] El usuario puede iniciar sesión con credenciales válidas (`standard_user`).
- [x] El usuario no puede iniciar sesión con credenciales inválidas o bloqueadas (`locked_out_user`).
- [x] El usuario puede agregar un producto al carrito desde la página de productos.
- [x] El usuario puede ver los productos agregados en el carrito de compras.
- [x] El usuario puede completar el proceso de compra hasta la confirmación final.

---

##  5. Informe de Estrategia de Automatización y Patrones

El framework está construido bajo principios modernos de desarrollo de software en pruebas (SDET), enfocándose en la escalabilidad y el mantenimiento:

1. **Page Object Model (POM)**: Aplicación central de este patrón de diseño para encapsular localizadores y acciones de la UI en clases específicas. Esto garantiza que cualquier cambio en la interfaz de Sauce Demo solo requiera una actualización en un único lugar del código.
2. **Behavior-Driven Development (BDD)**: Uso de Gherkin para redactar *Feature files* en un lenguaje ubicuo, separando la lógica de negocio de la implementación técnica mediante *Step Definitions*.
3. **Data-Driven Testing (DDT)**: Separación total de los datos de prueba. Las credenciales (`standard_user`, `locked_out_user`, etc.) residen en `data/users.json`, mientras que las URLs de ambiente están en `data/config.json`.
4. **Escenarios Dinámicos y Reusables**: Implementación de `Scenario Outlines` parametrizados, permitiendo evaluar múltiples caminos felices y tristes maximizando la reutilización de código.
5. **Observabilidad y Manejo de Fallos**: Integración de hooks (`AfterStep` y `After`) para la toma de capturas de pantalla automáticas en cada paso y recolección de evidencias estructuradas en caso de fallos.

---

##  6. Estructura del Proyecto

```text
/
├── data/                    # Fuentes de Datos (DDT)
│   ├── config.json          # URLs de los ambientes (dev, qa, prod)
│   └── users.json           # Credenciales y perfiles de prueba
├── features/                # Escenarios de prueba escritos en Gherkin (.feature)
├── src/
│   ├── pages/               # Clases Page Object Model (POM)
│   ├── steps/               # Definiciones de pasos (Step Definitions) en TypeScript
│   └── support/             # Configuración del framework (hooks y Custom World)
├── reports/                 # Resultados de ejecución (Reportes HTML y Capturas)
├── cucumber.js              # Configuración base del test runner de Cucumber
├── package.json             # Dependencias del ecosistema Node
├── playwright.config.ts     # Configuración base para navegadores de Playwright
└── tsconfig.json            # Configuración para la compilación de TypeScript
```