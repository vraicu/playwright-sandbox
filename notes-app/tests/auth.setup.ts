import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../POMs/loginPage";
import { LandingPage } from "../POMs/landingPage";
import { HomePage } from "../POMs/homePage";

setup("authenticate as regular user", async ({ page }) => {
  const landingPage = new LandingPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await landingPage.goto();
  await landingPage.clickLogin();
  await loginPage.login({
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  });

  await page.waitForURL(homePage.Url);
  await expect(homePage.profileButton).toBeVisible();

  await page.context().storageState({ path: ".auth/regular_user.json" });
});
