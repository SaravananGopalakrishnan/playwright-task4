import{test,expect,Locator} from "@playwright/test"

test("Verify the Text Input Field", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const firstName:Locator = page.locator("#name");
    await expect(firstName).toBeVisible();
    const maxLength: string|null = await firstName.getAttribute("maxlength");
    expect(maxLength).toBe("15"); // await do need 
    await firstName.fill("saravanan");
    const inputData:string = await firstName.inputValue() // retrive the data
    console.log(inputData);
    expect(inputData).toBe("saravanan");
   await page.waitForTimeout(3000);
})

test("Verify the radio Button", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const radioBut:Locator = page.locator("#male");
    await expect(radioBut).toBeEnabled();
    await radioBut.check();
    await expect(radioBut).toBeChecked();
    if(await radioBut.isChecked()){
        const fBut:Locator = page.locator("#female");
        fBut.check();
    }
    await page.waitForTimeout(3000);
})

test.only("Verify the checkbox",async({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  // Case 1: Specific CheckBox
  const sunCheckBox:Locator = page.locator("#sunday");
  await expect(sunCheckBox).toBeVisible();
  await sunCheckBox.check();
  await expect(sunCheckBox).toBeChecked();

  // Case 2: Select All the Check Box
  const option:string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
  const checkBoxEles:Locator[] = option.map(element=>page.getByLabel(element));
  const NumberEle:number = checkBoxEles.length;
  console.log(NumberEle);
  for(const checkBoxEle of checkBoxEles){
      const actual:string | null= await checkBoxEle.textContent();
     if(actual?.includes("Sunday")){
        await checkBoxEle.check();
     }
      await expect(checkBoxEle).toBeChecked();
  }
    
  await page.waitForTimeout(3000);

  // Case 3 Unselect All the Check Box
  for(const checkBoxEle of checkBoxEles){
      if(await checkBoxEle.isChecked())
      await checkBoxEle.uncheck();
      expect(checkBoxEle).not.toBeChecked();
  }

  await page.waitForTimeout(3000);

  // Case 4 Select the last 3 checkbox
  for(const checkBox of checkBoxEles.slice(4 - NumberEle)){
    await checkBox.check();
    await expect(checkBox).toBeChecked();
  }

  await page.waitForTimeout(3000);

  // Case 5 Select the checkbox value pass through the Attribute
  const c:string = "Monday"
  await page.getByLabel(c).check();

})