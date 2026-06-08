import { LoginExcelData } from "../interface/LoginExcelData";
import * as XLSX from "xlsx";

export class ExcelReader {
    static getLoginData(): LoginExcelData[] {
        const workbook = XLSX.readFile("./testData/LoginData.xlsx");

        const sheet = workbook.Sheets["Sheet1"]

        if (!sheet) {
            throw new Error("Sheet1 not found");
        }

        const data = XLSX.utils.sheet_to_json<LoginExcelData>(sheet);

        for (const row of data) {

            if (!row.TCID) {
                throw new Error("TCID is mandatory");
            }

            if (!row.Group) {
                throw new Error("Group is mandatory");
            }

            if (!row.Browser) {
                throw new Error("Browser is mandatory");
            }
        }

        return data;

    }
}

