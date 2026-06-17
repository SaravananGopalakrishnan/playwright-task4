import { expect, test } from "../fixture/customsFixture"
import { TestData } from "../utils/TestData";
import { createJiraBug } from "../scripts/create-jira-bug";



test.afterEach(async ({}, testInfo) => {

  if (testInfo.status === "failed") {

    console.log("Creating Jira Bug...");

    const issueKey = await createJiraBug(
      testInfo.title,
      testInfo.error?.message || "Unknown Error"
    );

      console.log(`JIRA Ticket: ${issueKey}`);

    await testInfo.attach("Jira Ticket", {
      body: Buffer.from(issueKey),
      contentType: "text/plain",
    });
  }

});


test("Login", {
    tag: ["@TC_001", "@smoke"]
}, async ({ loginPage, adminPage, loginData }) => {

    const user = loginData[0]!;

    console.log("TCID:", user.TCID);
    console.log("Browser:", user.Browser);
    console.log("Project:", test.info().project.name);

    if (user.Browser.toLowerCase() !== test.info().project.name.toLowerCase()) {
        test.skip();
    }

    await loginPage.login(
        "/web/index.php/auth/login",
        user.Username,
        user.Password
    );

    const actualResult = await adminPage.getTitle();

    expect(actualResult).toBe("Dashboard123");

});

test("Checking Admin Search", {
    tag: ["@TC_002", "@admin"]
}, async ({ loginPage, adminPage, loginData }) => {

    const user = loginData[0]!;


    const adminData = TestData.getAdminUser();


    await loginPage.login(
        "/web/index.php/auth/login",
        user.Username,
        user.Password
    );

    await adminPage.navigateAdminModule();

    await adminPage.searchUserName(
        adminData.validSearchName.searchName
    );

    await adminPage.userRole("Admin");

    await adminPage.status("Enabled");

    await adminPage.clickSearchButton();

    const actualCount = await adminPage.searchResultDisplayed();

    expect(actualCount).toBe(1);

    const actualValueList =
        await adminPage.verifySearchResult(adminData.expectedSearchResult);

    expect(actualValueList).toBe(true);

});

test("Saving And Logout", {
    tag: ["@TC_003", "@regression"]
}, async ({ loginPage, adminPage, loginData }) => {

    const user = loginData[0]!;

    const adminData = TestData.getAdminUser();

    await loginPage.login(
        "/web/index.php/auth/login",
        user.Username,
        user.Password
    );

    await adminPage.navigateAdminModule();

    await adminPage.editAdminUser();

    await adminPage.updateUserName(
        adminData.validSearchName.updateName
    );

    await adminPage.logout();

});