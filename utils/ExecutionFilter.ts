import { ConfigReader } from "./ConfigReader";
import { ExcelReader } from "./ExcelReader";
import { LoginExcelData } from "../interface/LoginExcelData";

export class ExecutionFilter {

    static getExecutionData(): LoginExcelData[] {


        const config =
            ConfigReader.getExecutionConfig();

        const excelData =
            ExcelReader.getLoginData();


        if (config.mode === "all") {
            return excelData;
        }

        if (config.mode === "group") {

            return excelData.filter(data =>
                config.groups?.includes(data.Group)
            );

        }

        if (config.mode === "tcid") {

            return excelData.filter(data =>
                config.tcids?.includes(data.TCID)
            );

        }

        return [];
    }
}