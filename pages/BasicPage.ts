import { Page } from "@playwright/test";

export class BasicPage {
    page: Page;
    constructor(page:Page){
        this.page = page
    }

    async navigate(url:string){
        await this.page.goto(url);
    }

}