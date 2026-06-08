import{test,expect,Locator} from "@playwright/test"

test("Verify SortedDropdown", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
   // Capture the value
   const skillOption:Locator = page.locator("#animals>option");
   const optionList:string[] = await skillOption.allTextContents();
   console.log(optionList);
   const afterTrim:string[] = optionList.map(ele=>ele.trim());
   // Sort the value - spreed operator - is used for not impact the orginal list
   const beforSort:string[] = [...afterTrim];
   console.log(beforSort);
   const sortedValue:string[] = [...afterTrim].sort();
   console.log(sortedValue);
   expect(beforSort).toEqual(sortedValue);

   await page.waitForTimeout(3000);

})