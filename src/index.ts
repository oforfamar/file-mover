import * as dotenv from 'dotenv';
import { readConfig } from "./readConfig";

dotenv.config();

async function main() {
  const config = await readConfig(process.env.configFile);
}

main();
