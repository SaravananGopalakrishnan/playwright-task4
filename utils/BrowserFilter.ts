import { LoginExcelData } from "../interface/LoginExcelData";

export class BrowserFilter {

    static getBrowserData(
        data: LoginExcelData[],
        browserName: string
    ): LoginExcelData[] {

        return data.filter(
            row =>
                row.Browser.toLowerCase()
                ===
                browserName.toLowerCase()
        );

    }

}