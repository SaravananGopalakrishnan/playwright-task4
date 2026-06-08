import { Page, Locator } from "@playwright/test";
import { BasicPage } from "./BasicPage";
import { TestData } from "../utils/TestData";

export class LoginPage extends BasicPage{

    private readonly username:Locator;
    private readonly password:Locator;
   // private readonly  loginButton: Locator;
    
    constructor(page:Page){
        super(page);
        this.username = this.page.getByPlaceholder("Username");
        this.password = this.page.getByPlaceholder("Password");
        //this.loginButton = this.page.getByRole("button",{name:"Login"});

    }

    loginButton():Locator{
        return this.page.getByRole("button",{name:"Login"});
    }

    async login(url:string){
        const users = TestData.getUser();
        await this.navigate(url);
        await this.username.fill(users.validUser.username);
        await this.password.fill(users.validUser.password);
        await this.loginButton().click();
        await this.page.waitForTimeout(2000);
    }



}