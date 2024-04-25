import { test, expect } from "@playwright/test";
import { RegistrationPage, RegistrationForm } from "../POMs/registrationPage";

test("After clicking Create an account the registration form should be visible", async ({
  page,
}) => {
  const registrationPage = new RegistrationPage(page);
  await page.goto("https://practice.expandtesting.com/notes/app");
  await page.getByRole("link").filter({ hasText: "Create an account" }).click();

  await expect(
    page.getByRole("heading").filter({ hasText: "Register" })
  ).toBeVisible();
  await expect(registrationPage.emailAddressInput).toBeVisible();
  await expect(registrationPage.nameInput).toBeVisible();
  await expect(registrationPage.passwordInput).toBeVisible();
  await expect(registrationPage.confirmPasswordInput).toBeVisible();
  await expect(registrationPage.registerButton).toBeVisible();
  await expect(registrationPage.registerWithGoogleButton).toBeVisible();
  await expect(registrationPage.registerWithLinkedInButton).toBeVisible();
  await expect(
    page.locator("span").filter({ hasText: "Do you have an account?" })
  ).toBeVisible();
  await expect(registrationPage.logInLink).toBeVisible();
});

test("Should be able to register", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const registrationForm: RegistrationForm = {
    email: `${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}@mail.com`,
    name: "John Doe",
    password: process.env.PASSWORD ?? "ILJ(@*(EKJ2231))",
  };
  await registrationPage.goto();
  await registrationPage.fillRegistrationForm(registrationForm);
  await registrationPage.submitForm();

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
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goto();
  const registrationForm: RegistrationForm = {
    email: process.env.USERNAME ?? "john.doe@mail.com",
    name: "John Doe",
    password: process.env.PASSWORD ?? "ILJ(@*(EKJ2231))",
  };
  await registrationPage.fillRegistrationForm(registrationForm);
  await registrationPage.submitForm();

  await expect(page.getByTestId("alert-message")).toHaveText(
    "An account already exists with the same email address"
  );
});

test("Should display error(s) when required fields are left empty", async ({
  page,
}) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goto();
  await registrationPage.submitForm();

  await expect(
    page.getByText("Email address is required", { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText("Password is required", { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText("User name is required", { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText("Confirm Password is required", { exact: true })
  ).toBeVisible();
});
