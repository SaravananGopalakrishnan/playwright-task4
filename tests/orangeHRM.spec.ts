import { expect, test } from "../fixture/customsFixture"
import { TestData } from "../utils/TestData";

test("Login", {
    tag: ["@TC_001", "@smoke"]
}, async ({ loginPage, adminPage, loginData }) => {

    const user = loginData[0]!;

    console.log("browser", user.Browser);

    if (user.Browser.toLowerCase() !== test.info().project.name.toLowerCase()) {
        test.skip();
    }

    await loginPage.login(
        "/web/index.php/auth/login",
        user.Username,
        user.Password
    );

    const actualResult = await adminPage.getTitle();

    expect(actualResult).toBe("Dashboard");

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