const fs = require('fs');
const path = require('path');

const resultsDir = path.join(__dirname, '../allure-results');

if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
}

// Generar environment.properties para el widget "Environment"
const envContent = `
Browser=Chromium
Environment=${process.env.AMBIENTE ? process.env.AMBIENTE.toUpperCase() : 'QA'}
Framework=Playwright + CucumberJS
Platform=${process.platform}
Node_Version=${process.version}
`;
fs.writeFileSync(path.join(resultsDir, 'environment.properties'), envContent.trim());

// Generar executor.json para el widget "Executors"
const executorContent = {
    name: "Local Execution",
    type: "local",
    buildName: "Local Run - " + new Date().toLocaleString(),
    buildUrl: "http://localhost"
};
fs.writeFileSync(path.join(resultsDir, 'executor.json'), JSON.stringify(executorContent, null, 2));

// ==========================================
// LÓGICA PARA EL WIDGET "TREND" (Historial)
// ==========================================
const reportHistoryDir = path.join(__dirname, '../allure-report/history');
const resultsHistoryDir = path.join(resultsDir, 'history');

// Si existe un reporte anterior, copiamos su historial a los nuevos resultados
if (fs.existsSync(reportHistoryDir)) {
    if (!fs.existsSync(resultsHistoryDir)) {
        fs.mkdirSync(resultsHistoryDir, { recursive: true });
    }
    const files = fs.readdirSync(reportHistoryDir);
    for (const file of files) {
        fs.copyFileSync(
            path.join(reportHistoryDir, file),
            path.join(resultsHistoryDir, file)
        );
    }
    console.log('📈 Historial de ejecuciones copiado con éxito (Trend Widget habilitado).');
}

console.log('✅ Metadatos de Allure generados (Environment y Executor)');
