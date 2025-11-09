import {expect, test} from "@playwright/test";
import  loginPage from "../pages/loginPage";
import { encrypt } from "../utils/CryptojsUtil";
import { decrypt } from "../utils/CryptojsUtil";
import {encryptEnvFile, decryptEnvFile} from "../utils/EncryptEnvFile";
import logger from "../utils/LoggerUtil";
import cdata from "../testdata/sampleFake.json";
import { convertCsvFileToJsonFile } from "../utils/CsvtoJsonUtil";
import {demoOutput} from '../testdata/fakerSample';
import {generateTestData, exportToJson, exportToCsv} from '../utils/FakerDataUtil';


    for(const c of cdata){
test(`add employee ${c.fname} ${c.lname}`, async({page}) =>{
       const loginTest = new loginPage(page);
      await loginTest.navigateToLoginPage();
       await loginTest.fillUsername(decrypt(process.env.username!));
      await loginTest.fillPassword(decrypt(process.env.password!));    
    
       const home = await loginTest.clickLoginButton();
      await home.validateService();
      const pim = await home.navigateToPIM();
      await pim.addNewEmployee(c.fname, c.lname);
      logger.info("Test for adding employee is completed");
      await page.waitForTimeout(15000);
      await pim.validateEmployeeAdded(c.fname, c.lname); 
}) }   
  
test.skip('csv to json conversion', async() =>{
    convertCsvFileToJsonFile("data.csv", "dataDemo.json");
})

test.skip('faker demo', async() =>{
    const testData = generateTestData(3);

    exportToJson(testData, 'sampleFake.json');
    exportToCsv(testData, 'sampleFake.csv');
})

test.skip('sample decrypt', async({page}) =>{
    //decryptEnvFile();
    encryptEnvFile();
})