import {expect, test} from "@playwright/test";
import  loginPage from "../pages/loginPage";
//import homePage from "../pages/homePage";

test('tests', async({page})=>{
   // test.setTimeout(50000);
  const loginTest = new loginPage(page);
  await loginTest.navigateToLoginPage();
  await loginTest.fillUsername("Admin");
  await loginTest.fillPassword("admin123");
  
  const home = await loginTest.clickLoginButton();
  await home.validateService();
})