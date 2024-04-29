import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../POMs/loginPage";
import { LandingPage } from "../POMs/landingPage";
import { HomePage } from "../POMs/homePage";
import fs from "node:fs/promises";

// setup("authenticate as a regular user via UI", async ({ page }) => {
//   const landingPage = new LandingPage(page);
//   const loginPage = new LoginPage(page);
//   const homePage = new HomePage(page);
//   await landingPage.goto();
//   await landingPage.clickLogin();
//   await loginPage.login({
//     username: process.env.USERNAME,
//     password: process.env.PASSWORD,
//   });

//   await page.waitForURL(homePage.Url);
//   await expect(homePage.profileButton).toBeVisible();

//   await page.context().storageState({ path: ".auth/regular_user.json" });
// });

setup("authenticate as a regular user via API", async ({ request }) => {
  const response = await request.post(
    "https://practice.expandtesting.com/notes/api/users/login",
    {
      data: {
        email: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
    }
  );

  const responseJson = await response.json();
  await fs.writeFile(
    ".auth/regular_user_api.json",
    JSON.stringify(
      {
        cookies: [],
        origins: [
          {
            origin: "https://practice.expandtesting.com",
            localStorage: [
              {
                name: "token",
                value: responseJson.data.token,
              },
            ],
          },
        ],
      },
      null,
      2
    )
  );
});
