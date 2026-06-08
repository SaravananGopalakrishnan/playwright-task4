import {test,expect,Locator} from "@playwright/test"

test("Verify the buildIn Locator", async({page})=>{
   //page.getByAltText() to locate an element, usually image, by its text alternative.
   await page.goto("https://demo.automationtesting.in/Register.html");
   const logo:Locator = page.getByAltText("image not displaying");
   await expect(logo).toBeVisible();

   //page.getByText() to locate by text content (Locate element using visible text)
   const hobbies:Locator = page.getByText("Cricket");
   await expect(hobbies).toBeVisible();

   //page.getByPlaceholder() to locate an input by placeholder. (Locate the element using placeholder)
   const firstName:Locator = page.getByPlaceholder("First Name");
   await firstName.fill("Saravanan");
   const  lastName:Locator = page.getByPlaceholder("Last Name");
   await lastName.fill("G");

   // page.getByLabel() to locate a form control by associated label's text.
   const addressVisible:Locator = page.getByLabel("Address");
   //await expect(addressVisible).toBeVisible();

   //page.getByRole() to locate by explicit and implicit accessibility attributes.
   const emailAddress:Locator = page.getByRole('textbox',{ name:'Email address*'});
   //await emailAddress.fill("test@gmail.com");
   await page.locator('[ng-model="EmailAdress"]').fill('test@gmail.com');

   //page.getByTitle() to locate an element by its title attribute.(Locate the element using Title)
   
   //page.getByTestId() //to locate an element based on its data-testid attribute 
   //(other attributes can be configured).
   const title:Locator = page.getByTestId("todo-title");

})

// Absolute Xpath provides the full path from the root of the document to the target element
// Relative Xpath directly jumps to the element using attribute
