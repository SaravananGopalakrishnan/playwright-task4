import { Page, Locator } from "@playwright/test";
import { BasicPage } from "./BasicPage";
import { TableComponents } from "../component/tableComponent";

export class AdminPage extends BasicPage{

  private readonly title:Locator;
  private readonly adminModule:Locator;
  private readonly userName:Locator;
  private readonly searchButton:Locator;
  private readonly tableReult:Locator;
  private readonly editUser:Locator;
  private readonly saveButton:Locator;
  private readonly profile:Locator;
  private readonly logoutButton:Locator;
  private readonly userRoleDropdown:Locator
  private readonly statusDropdown:Locator
  private readonly tableComponent: TableComponents;
  
    constructor(page:Page){
        super(page)
        this.tableReult = this.page.locator(".oxd-table-body");
        this.tableComponent = new TableComponents(this.tableReult);
        this.title = this.page.getByRole("heading",{name:"Dashboard"})
        this.adminModule = this.page.getByRole("link",{name:"Admin"});
        this.userName = this.page.locator("input.oxd-input").nth(1);
        this.searchButton = this.page.getByRole("button",{name:"Search"});
        this.tableReult = this.page.locator(".oxd-table-body").first();
        this.editUser = this.page.locator("button:has(i.bi-pencil-fill)");
        this.saveButton = this.page.getByRole("button",{name:"Save"});
        this.profile = this.page.locator(".oxd-userdropdown-tab");
        this.logoutButton = this.page.getByText("Logout");
        this.userRoleDropdown = this.page.locator(".oxd-select-text-input").nth(0);
        this.statusDropdown = this.page.locator(".oxd-select-text-input").nth(1)
    }
  
    async getTitle():Promise<string|null>{
        const value:string|null = await this.title.textContent()
        return value;
    }

    async navigateAdminModule(){
       await this.adminModule.click();
       await this.page.waitForTimeout(3000);
    }

    async searchUserName(name:string){
      await this.userName.fill(name);
    }

    async clickSearchButton() {
      await this.searchButton.click();
      await this.page.waitForTimeout(3000);
    }

    async searchResultDisplayed():Promise<number>{
       return await this.tableReult.count()
    }

    async editAdminUser() {
      await this.editUser.click();
    }

    async updateUserName(name:string):Promise<void>{
        await this.userName.clear();
        await this.userName.fill(name);
        await this.saveButton.click();
        await this.page.waitForURL("**/admin/viewSystemUsers");
    }

    async userRole(role:string){
      await this.userRoleDropdown.click();
      await this.page.getByRole("option", { name: role }).click();

    }

    async status(option:string){
      await this.statusDropdown.click();
      await this.page.getByRole("option", { name: option }).click();
    }

    async verifySearchResult(value:string[]):Promise<boolean>{
       return this.tableComponent.verifyRowContains(value);
    }

    async verifyTablePresent():Promise<boolean>{
       return this.tableComponent.tableVisibility();
    }

    async getValueTable(expectedValue:string):Promise<string | null>{
      return this.tableComponent.getCellValue(expectedValue);
    }

    async logout(){
      await this.profile.click();
      await this.logoutButton.click();
    }


}