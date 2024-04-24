import { test, expect } from "@playwright/test";

test("Should be able to register", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/notes/app");
  await page.getByRole("link").filter({ hasText: "Create an account" }).click();
  await page
    .getByTestId("register-email")
    .fill(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}@mail.com`);
  await page.getByTestId("register-name").fill("John Doe");
  await page.getByTestId("register-password").fill(process.env.PASSWORD);
  await page
    .getByTestId("register-confirm-password")
    .fill(process.env.PASSWORD);
  await page.getByRole("button").filter({ hasText: "Register" }).click();

  await expect(
    page.getByRole("heading").filter({ hasText: "Register" })
  ).toBeVisible();
  await expect(page.locator("div.alert-success b")).toHaveText(
    "User account created successfully"
  );
  await expect(
    page.getByRole("link").filter({ hasText: "Click here to log in" })
  ).toBeVisible();
});

test("Should display error when account is already in use", async ({
  page,
}) => {
  await page.goto("https://practice.expandtesting.com/notes/app");
  await page.getByRole("link").filter({ hasText: "Create an account" }).click();
  await page.getByTestId("register-email").fill(process.env.USERNAME);
  await page.getByTestId("register-name").fill("John Doe");
  await page.getByTestId("register-password").fill(process.env.PASSWORD);
  await page
    .getByTestId("register-confirm-password")
    .fill(process.env.PASSWORD);
  await page.getByRole("button").filter({ hasText: "Register" }).click();

  await expect(page.getByTestId("alert-message")).toHaveText(
    "An account already exists with the same email address"
  );
});
