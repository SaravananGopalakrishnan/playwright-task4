import{test,expect,Locator} from "@playwright/test"

test("Verify MultiDropdown", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const color:Locator = page.locator("#colors");
    await color.selectOption(["Red", "Green", "Yellow"]); // Visible Text
   // await color.selectOption([{value:"blue"},{value:"white"}]); // Using value Attribute
   // await color.selectOption([{label:"Yellow"},{label:"White"}]); // Using Label
   // await color.selectOption([{index:2},{index:3}]); // Using Index

    await page.waitForTimeout(3000);
  // Capture the value
   const skillOption:Locator = page.locator("#colors>option");
   const optionList:string[] = await skillOption.allTextContents();
   console.log(optionList);
   const afterTrim:string[] = optionList.map(ele=>ele.trim());

  // Print the value
    for(const opt of afterTrim){
      console.log(opt);
   }

})