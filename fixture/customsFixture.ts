import { test as base } from "@playwright/test" // we create our own custom test use base
import { AdminPage } from "../pages/AdminPage"
import { LoginPage } from "../pages/LoginPage"
import { LoginExcelData } from "../interface/LoginExcelData"
import { ExecutionFilter } from "../utils/ExecutionFilter";

type PageFixture =  {
    loginPage : LoginPage,
    adminPage : AdminPage,
    loginData : LoginExcelData[];
}

export const test = base.extend<PageFixture>({
    loginPage: async({page},use)=>{
        await use(new LoginPage(page));
    },

    adminPage: async({page},use)=>{
        await use(new AdminPage(page));
    },

    loginData: async({},use)=>{
        const executionData = ExecutionFilter.getExecutionData();
        await use(executionData);
    }
})

export { expect } from "@playwright/test";