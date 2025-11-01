import { expect, Expect, Page } from "@playwright/test";

export default class homePage{
    private readonly serviceSelector = "//p[text()='Time at Work']";

    constructor(private page: Page){

    }
    async validateService(){
        await expect(await this.page.locator(this.serviceSelector)).toBeVisible({timeout: 17000});
    }
}