import { Page } from "@playwright/test";
import homePage from "./homePage";

export default class loginPage{
    private readonly uNameInputSelector = "//input[@name='username']";
    private readonly passWordInputSelector = "//input[@name='password']";
    private readonly loginButtonSelector = "//button[@type='submit']";

    constructor(private page: Page){

    }
    async navigateToLoginPage(){
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    }
    async fillUsername(username: string){
        await this.page.locator(this.uNameInputSelector).fill(username);
        
    }
    async fillPassword(pass : string){
        await this.page.locator(this.passWordInputSelector).fill(pass);
    }
    async clickLoginButton(){
        const loginButton = await this.page.locator(this.loginButtonSelector);
        // await loginButton.click()
        //await loginButton.waitFor({ state: "visible" });
        await loginButton.click();
        await this.page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", { timeout: 5000 })
 /* await Promise.all([
    this.page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", { timeout: 5000 }),
    loginButton.click(),
  ]); */
        const homePageObj = new homePage(this.page);
    return homePageObj;
    }
     
}