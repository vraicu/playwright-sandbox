import { test, expect } from "@playwright/test";
import { HomePage } from "../POMs/homePage";

// test.use({ storageState: ".auth/google_user.json" });

// test("Should be able to login with a google account", async ({ page }) => {
//   const homePage = new HomePage(page);
//   await page.goto("https://practice.expandtesting.com/notes/app");

//   await expect(homePage.profileButton).toBeVisible();
// });

test.describe("As a regular user", () => {
  test.use({ storageState: ".auth/regular_user.json" });

  test("should be able to login", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(homePage.profileButton).toBeVisible();
  });
});
