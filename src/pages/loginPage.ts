import { Page } from "@playwright/test";
import homePage from "./homePage";
import logger from "../utils/LoggerUtil";

export default class loginPage{
    private readonly uNameInputSelector = "//input[@name='username']";
    private readonly passWordInputSelector = "//input[@name='password']";
    private readonly loginButtonSelector = "//button[@type='submit']";

    constructor(private page: Page){

    }
    async navigateToLoginPage(){
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        logger.info("Navigated to login.salesforce.com");
    }
    async fillUsername(username: string){
        await this.page.locator(this.uNameInputSelector).fill(username);
        logger.info("Filled username");
        
    }
    async fillPassword(pass : string){
        await this.page.locator(this.passWordInputSelector).fill(pass);
        logger.info("Filled pasword");
    }
    async clickLoginButton(){
        const loginButton = await this.page.locator(this.loginButtonSelector);
        // await loginButton.click()
        //await loginButton.waitFor({ state: "visible" });
        await loginButton.click().catch((error) => {
        logger.error(`Error clicking login button: ${error}`);
        throw error; // rethrow the error if needed
      })
      .then(() => logger.info("Clicked login button"));;
        await this.page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", { timeout: 5000 })
 /* await Promise.all([
    this.page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", { timeout: 5000 }),
    loginButton.click(),
  ]); */
        const homePageObj = new homePage(this.page);
    return homePageObj;
    }
     
}