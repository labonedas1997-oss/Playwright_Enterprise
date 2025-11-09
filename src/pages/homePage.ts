import { expect, Expect, Page } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import PIMClass from "../pages/PIMPage";

export default class homePage{
    private readonly TimeAtWorkSelector = "//p[text()='Time at Work']";
    private readonly PIMLinkSelector = "//a//span[text()='PIM']";

    constructor(private page: Page){

    }
    async validateService(){
        await expect(await this.page.locator(this.TimeAtWorkSelector)).toBeVisible({timeout: 17000}).catch((error) => {
      logger.error(`Error clicking login button: ${error}`);
      throw error; // rethrow the error if needed
    }).then(()=>logger.info("Time at Work is visible"));
    }
     
    async navigateToPIM(){
        await expect(await this.page.locator(this.PIMLinkSelector)).toBeVisible();
        logger.info("PIM Link is present");
        await this.page.locator(this.PIMLinkSelector).click();
        logger.info("PIM Link is clicked");
        return new PIMClass(this.page);

    }

}