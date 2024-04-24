import { test as setup, expect } from "@playwright/test";

setup("authenticate as regular user", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/notes/app");
  await page.getByRole("link").filter({ hasText: "Login" }).click();
  await page.getByTestId("login-email").fill(process.env.USERNAME);
  await page.getByTestId("login-password").fill(process.env.PASSWORD);
  await page.getByRole("button").filter({ hasText: "Login" }).click();
  await page.context().storageState({ path: "./.auth/regular_user.json" });
  await page.waitForURL("https://practice.expandtesting.com/notes/app");
  await expect(page.getByRole("link", { name: "Profile" })).toBeVisible();

  await page.context().storageState({ path: ".auth/regular_user.json" });
});
