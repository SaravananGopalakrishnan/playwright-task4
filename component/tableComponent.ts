import { Page, Locator } from "@playwright/test";


export class TableComponents {

    constructor(private table:Locator){
        
    }

    async tableVisibility():Promise<boolean> {
      return await this.table.isVisible();
    }

    async rowCount():Promise<number> {
       return await this.table.locator(".oxd-table-card").count();
    }

    async verifyTextInTable(expectedValue:string):Promise<boolean> {
       return await this.table.getByRole("cell", {name:expectedValue}).isVisible();
    }

    async getCellValue(expectedValue:string):Promise<string | null> {
       return await this.table.getByRole("cell", {name:expectedValue}).textContent();
    }

    async verifyRowContains(value:string[]):Promise<boolean>{
        const row:Locator = this.table.locator(".oxd-table-card");
        const rowCount =  await row.count(); 
        console.log(rowCount);

        for(let i =0; i<rowCount; i++){
           const rowText = await row.nth(i).textContent();
           const isMatch = value.every((value)=>{return rowText?.includes(value)})
           if(isMatch){
              return true
           }
        }
         return false;
    }



    
}