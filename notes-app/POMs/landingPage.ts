import type { Page, Locator } from "@playwright/test";

export class LandingPage {
  private readonly loginButton: Locator;
  private readonly createAnAccountButton: Locator;
  private readonly connectWithGoogleAccountLink: Locator;
  private readonly forgotYourPasswordLink: Locator;

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
    await this.page.goto("/");
  }

  async login() {
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
