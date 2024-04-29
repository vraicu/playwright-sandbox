import type { Page, Locator } from "@playwright/test";

export class LandingPage {
  public readonly loginButton: Locator;
  public readonly createAnAccountButton: Locator;
  public readonly connectWithGoogleAccountLink: Locator;
  public readonly forgotYourPasswordLink: Locator;

  constructor(public readonly page: Page) {
    this.loginButton = this.page.getByRole("link").filter({ hasText: "Login" });
    this.createAnAccountButton = this.page
      .getByRole("link")
      .filter({ hasText: "Create an account" });
    this.connectWithGoogleAccountLink = this.page
      .getByRole("link")
      .filter({ hasText: "Google account" });
    this.forgotYourPasswordLink = this.page
      .getByRole("link")
      .filter({ hasText: "Forgot your password?" });
  }

  async goto() {
    await this.page.goto("https://practice.expandtesting.com/notes/app");
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async createAnAccount() {
    await this.createAnAccountButton.click();
  }

  async connectWithGoogleAccount() {
    await this.connectWithGoogleAccountLink.click();
  }

  async clickForgotPassword() {
    await this.forgotYourPasswordLink.click();
  }
}
