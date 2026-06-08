import {test,expect,Locator} from '@playwright/test' 

test('Verify the xpath locator', async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/login");
    // Relative Xpath
    const email:Locator = page.locator("//input[@id='Email']");
    await email.fill("test123@gmail.com");
    const password:Locator = page.locator("//input[@id='Password']");
    await password.fill("Test@123");
    const loginButton:Locator= page.locator("//input[@value='Log in']");
    await loginButton.click();

    const errorValidation:Locator = page.getByText("Login was unsuccessful. Please correct the errors and try again.");
    await expect(errorValidation).toBeVisible();


      // Contains
    const followLoc:Locator = page.locator("//h3[contains(text(),'Follow')]/..//li");
    console.log(await followLoc.first().textContent());
    console.log(await followLoc.last().textContent());
    console.log(await followLoc.nth(2).textContent());
    expect(await followLoc.count()).toBeGreaterThan(0);
    const followList:string[] = await followLoc.allTextContents();
    for(let v of followList){
        console.log("Reading the value: ", v);
    }
    
      // starts-with
    const infoLoc:Locator = page.locator("//h3[starts-with(text(),'Info')]/..//li");
    const infoList:string[] = await infoLoc.allTextContents();
    for(let i in infoList){
        console.log("Print the info ",infoList[i]);
    }
    
    // last()
    const lastInfo:Locator = page.locator("//h3[starts-with(text(),'Info')]/..//li[last()]");
    console.log(await lastInfo.textContent());

    // position()=value
    const randomInfo:Locator = page.locator("//h3[starts-with(text(),'Info')]/..//li[position()=3]");
    console.log(await randomInfo.textContent());
})