import{test,expect,Locator} from "@playwright/test"

test("Verify the single dropdown",async({page})=>{
   await page.goto("https://demo.automationtesting.in/Register.html");
   // Select the value from dropdown in 4 ways
   const skill:Locator = page.locator("#Skills");
  // await skill.selectOption("Android"); // Visible text
  // await skill.selectOption({value:"APIs"}); // Using Value Attribute
  // await skill.selectOption({label:"C++"}); // Using Label
  // await skill.selectOption({index:1}); // Using Index

   await page.waitForTimeout(3000);
 
 // Capture the value
   const skillOption:Locator = page.locator("#Skills>option");
   await expect(skillOption).toHaveCount(78);
   const optionList:string[] = await skillOption.allTextContents();
   console.log(optionList);
   //const afterTrim:string[] = optionList.map(element=>element.trim())

 // Print the value
 for(const opt of optionList){
    console.log(opt);
 }

 // Check Option present in the dropdown\
 expect(optionList).toContain("C++");

})