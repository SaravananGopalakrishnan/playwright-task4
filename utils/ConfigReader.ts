import * as fs from "fs";
import { ExecutionConfig } from "../interface/executionConfig";

export class ConfigReader {

    static getExecutionConfig(): ExecutionConfig {
        return JSON.parse(
            fs.readFileSync(
                "./testData/configExecution.json",
                "utf8"
            )
        );
    }
}