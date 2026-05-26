import * as path from 'path';
import * as fs from 'fs';
import { Before, After, AfterStep, Status } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import * as dotenv from 'dotenv';


const entorno = process.env.AMBIENTE || 'qa';
const envPath = path.resolve(__dirname, `../../config/env/.env.${entorno}`);
dotenv.config({ path: envPath });
console.log(`Preparando framework...`);
console.log(`Entorno activo: ${entorno.toUpperCase()}`);

const screenshotsDir = path.join(process.cwd(), 'reports', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshotName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
    const screenshotPath = path.join(screenshotsDir, `${screenshotName}_failed.png`);
    
    const screenshot = await this.page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
    
    this.attach(screenshot, 'image/png');
  }
  
  await this.cleanup();
});

/*
AfterStep(async function (this: CustomWorld, step) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
});
*/