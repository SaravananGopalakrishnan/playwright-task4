import{test,expect,Locator} from "@playwright/test"

test("Verify duplicateDropdown", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
   // Capture the value
   const skillOption:Locator = page.locator("#colors>option");
   const optionList:string[] = await skillOption.allTextContents();
   console.log(optionList);
   const afterTrim:string[] = optionList.map(ele=>ele.trim());
   // Remove Duplicate
   const unique = new Set<String>();
   const duplicate:string[] = [];
   for(const c of afterTrim){
    if(unique.has(c)){
        duplicate.push(c);
    }
    else{
        unique.add(c);
    }
   }

   console.log(duplicate);

})