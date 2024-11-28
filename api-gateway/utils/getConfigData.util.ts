
import fs from "fs"
import {parse as yamlParse} from "yaml"
import type { Config } from "../types/config.type";
export default async function getConfigData(configPath: string): Promise<Config.ConfigType> {
    try {
        const config = await fs.promises.readFile(configPath, "utf-8");
        return yamlParse(config);
        
    } catch (error) {
        console.log("[-] Error reading config file:", error);
        process.exit(1);
    }
}
