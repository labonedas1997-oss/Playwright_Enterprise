import { expect, Expect, Page } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class PIMClass{
    private readonly addEmployeeLinkSelector = "//a[text()='Add Employee']";
    private readonly addFirstNameInputSelector = "//input[@name='firstName']";
    private readonly addLastNameInputSelector = "//input[@name='lastName']";
    private readonly saveButtonSelector = "//button[@type='submit']";
    private readonly ValidatorSelector = "//div[@class='orangehrm-edit-employee-name']//h6";
    constructor (private page: Page){

    }
    async addNewEmployee(fName: string, lName: string){
        await this.page.locator(this.addEmployeeLinkSelector).click();
        logger.info('add employee link is clicked');
        await this.page.locator(this.addFirstNameInputSelector).fill(fName);
        logger.info(`fname is added: ${fName}`);
        await this.page.locator(this.addLastNameInputSelector).fill(lName);
        logger.info(`lname is added: ${lName}`);
        await this.page.locator(this.saveButtonSelector).click();
        logger.info('Save button is clickeds');
    }

    async validateEmployeeAdded(fName: string, lName: string){
    await await this.page.locator(this.ValidatorSelector).waitFor({ state: 'visible', timeout: 30000 })
       await expect(this.page.locator(this.ValidatorSelector)).toContainText(`${fName} ${lName}`);
       logger.info('Employee is added');
    }
}
