import { test, expect } from "@playwright/test";
import { HomePage } from "../POMs/homePage";
import { LoginPage } from "../POMs/loginPage";
import { LandingPage } from "../POMs/landingPage";

// test.use({ storageState: ".auth/google_user.json" });

// test("Should be able to login with a google account", async ({ page }) => {
//   const homePage = new HomePage(page);
//   await page.goto("https://practice.expandtesting.com/notes/app");

//   await expect(homePage.profileButton).toBeVisible();
// });

test("Should be able to login", async ({ page }) => {
  const landingPage = new LandingPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await landingPage.goto();
  await landingPage.clickLogin();
  await loginPage.login({
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  });

  await expect(page.getByText("MyNotes")).toBeVisible();
  await expect(homePage.profileButton).toBeVisible();
  await expect(homePage.logoutButton).toBeVisible();
});

test.describe("As a regular user", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  // test("should be able to login", async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   await homePage.goto();

  //   await expect(homePage.profileButton).toBeVisible();
  // });

  test("should be able to logout", async ({ page }) => {
    const homePage = new HomePage(page);
    const landingPage = new LandingPage(page);
    const loginPage = new LoginPage(page);
    await landingPage.goto();
    await landingPage.clickLogin();
    await loginPage.login({
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    });

    await homePage.logout();

    await expect(page.getByText("Welcome to Notes App")).toBeVisible();
    await expect(landingPage.loginButton).toBeVisible();
    await expect(landingPage.createAnAccountButton).toBeVisible();
    await expect(landingPage.forgotYourPasswordLink).toBeVisible();
    await expect(
      page.getByText("Connect with your Google account quickly.")
    ).toBeVisible();
    await expect(landingPage.connectWithGoogleAccountLink).toBeVisible();
  });
});

test.describe("When leaving email and password empty", () => {
  test("should display error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.clickLogin();

    await expect(page.getByText("Email address is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });
});

test.describe("When using an invalid email address", () => {
  test("should display error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login({
      username: "a@",
      password: "password",
    });

    await expect(page.getByText("Email address is invalid")).toBeVisible();
  });
});

test.describe("When using a password less than 6 chars", () => {
  test("should display error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login({
      username: "some@email.com",
      password: "pass",
    });

    await expect(
      page.getByText("Password should be between 6 and 30 characters")
    ).toBeVisible();
  });
});

test.describe("When using an invalid account", () => {
  test("should display error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login({
      username: "some@email.com",
      password: "password",
    });

    await expect(
      page.getByText("Incorrect email address or password")
    ).toBeVisible();
  });
});
