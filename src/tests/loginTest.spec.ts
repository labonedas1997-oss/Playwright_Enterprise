import {expect, test} from "@playwright/test";
import  loginPage from "../pages/loginPage";
import { encrypt } from "../utils/CryptojsUtil";
import { decrypt } from "../utils/CryptojsUtil";
import {encryptEnvFile, decryptEnvFile} from "../utils/EncryptEnvFile";
//import homePage from "../pages/homePage";

test('tests', async({page})=>{
   // test.setTimeout(50000);
  const loginTest = new loginPage(page);
  await loginTest.navigateToLoginPage();
  await loginTest.fillUsername(decrypt(process.env.username!));
  await loginTest.fillPassword(decrypt(process.env.password!));
  
  const home = await loginTest.clickLoginButton();
  await home.validateService();
  //const pim = await home.navigateToPIM();
  //await pim.addNewEmployee();


})

test.skip('env test', async({page})=>{
   /* const plainText = 'Hello world!';
   const encrptedText = encrypt(plainText);
   console.log('SALT', process.env.SALT);
   console.log('encrypted text', encrptedText);
   const decryptText = decrypt(encrptedText);
   console.log('decrypted text', decryptText); */
   encryptEnvFile();
   //decryptEnvFile();
})