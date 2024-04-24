import { FullConfig, firefox, expect } from "@playwright/test";
import { LandingPage } from "./POMs/landingPage";
import { GoogleLoginPage } from "./POMs/googleLoginPage";
import { HomePage } from "./POMs/homePage";

async function logAsGoogleUser(page) {
  const landingPage = new LandingPage(page);
  const googleLoginPage = new GoogleLoginPage(page);
  const homePage = new HomePage(page);

  await page.goto("https://practice.expandtesting.com/notes/app/");
  await landingPage.connectWithGoogleAccount();
  await googleLoginPage.setEmail(process.env.GOOGLE_USER);
  await googleLoginPage.clickNext();
  await googleLoginPage.setPassword(process.env.GOOGLE_PASS);
  await googleLoginPage.clickNext();

  await expect(homePage.profileButton).toBeVisible();

  await page.context().storageState({ path: "./.auth/google_user.json" });
}

export default async function globalSetup(config: FullConfig) {
  const browser = await firefox.launch();
  const page = await browser.newPage();

  await logAsGoogleUser(page);

  await browser.close();
}
