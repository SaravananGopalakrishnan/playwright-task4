import {test,expect,Locator} from "@playwright/test"

test("Verify the xpathAxes", async({page})=>{
     await page.goto("https://www.w3schools.com/html/html_tables.asp");
     
     //parent axes
     const parentAxes:Locator = page.locator("//td[text()='Germany']/parent::tr");
     await expect(parentAxes).toContainText("Germany");
     console.log(await parentAxes.textContent());

     //child axes
     const childAxes = page.locator("//table[@id='customers']//tr/child::td");
     await expect(childAxes).toHaveCount(18);
     const tableValue:string[] = await childAxes.allTextContents();
     const headerValue:string[] = ["Company","Contact","Country"]
     for(let i of tableValue){
        console.log(i);
        if(headerValue.includes(i.trim())){
         console.log("Header value is matched");
        }
     }

     //ancestor axes
     const ancestorAxes:Locator = page.locator("//td[text()='Germany']/ancestor::table/tbody/tr");
     const ancesValue:string[] = await ancestorAxes.allTextContents();
     for(let j of ancesValue){
        console.log("Print the value in the table",j)
        if(j.includes("Austria")){
             expect(j).toContain("Ernst Handel");
        }
     }


     // descendant axes
     const descendantAxes:Locator = page.locator("//table[@id='customers']/descendant::td");
     await expect(descendantAxes).toHaveCount(18);

     // following-sibling 
     const followSiblingAxes:Locator = page.locator("//table[@id='customers']/descendant::td/following-sibling::td");
     await expect(followSiblingAxes).toHaveCount(12);

     // preceding-sibling 
     const precedSiblingAxes:Locator = page.locator("//table[@id='customers']/descendant::td/preceding-sibling::td");
     await expect(precedSiblingAxes).toHaveCount(12);
})