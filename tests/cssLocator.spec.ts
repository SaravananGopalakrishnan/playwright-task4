import {test,expect,Locator} from "@playwright/test"

test("Verify cssLocator", async({page})=>{
   await page.goto("https://demowebshop.tricentis.com/login");
   // tag#id
   const cssId:Locator = page.locator("input#small-searchterms");
   await cssId.fill("Book")

   // tag.class
   const cssClass:Locator = page.locator(".search-box-text");
   await cssClass.fill("Desktop")

   //tag[attribute='value']
   const cssAttribute:Locator = page.locator("input[name='q']");
   await cssAttribute.fill("Computer")

   //tag.class[attribute='value']
   const cssClassAtt:Locator = page.locator("input.search-box-text[name='q']");
   await cssClassAtt.fill("Jewelry")

   // using Absolute CSS
   const cssNthChild:Locator = page.locator("html>body>*:nth-child(3)");
   const cssFirstChild:Locator = page.locator("html>body>*:first-child");
   const cssLastChid:Locator = page.locator("html>body>*:last-child");

   // using start-with , end-with, contians CSS
   const cssStartWith:Locator = page.locator("input[value^='Search']");
   const cssEndWith:Locator = page.locator("input[id$='ms']");
   const cssContains:Locator = page.locator("input[id*='term']");

   // using And Or Condition CSS
   const cssAndCond:Locator = page.locator("input[id*='term'][name='q']");
   const cssOrCond:Locator = page.locator("input[id*='term'],[name='q']");

   // using :not CSS
   const cssNotCond:Locator = page.locator("input[type='text']:not([disabled])");
})