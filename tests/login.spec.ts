import {test,expect} from '@playwright/test'


// Using a page fixture is the object that allows us to control
//  and interact with a web page (browser tab)
test("Lanuch URL", async ({page})=>{
    await page.goto("https://demo.automationtesting.in/Register.html")
    let title = await page.title();
    console.log(title);
    expect(title).toBe("Register")
    await expect(page).toHaveTitle('Register')
})

// run a command
// npx playwright test -g "Lanuch" --headed
// npx playwright test
// npx playwright test --headed
// npx playwright test --project='Chromium'
// npx playwright test --ui
// npx playwright test --debug
// npx playwright test login.spec.ts --headed


//Selenium uses W3C WebDriver protocol and 
//sends each command as a separate HTTP request to the browser
// driver.

//Playwright uses WebSocket connection is created once
//then connection stays open during execution and closes at the end
//DOM is an API Interface provide by the browser
