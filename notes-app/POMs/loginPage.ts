import type { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly emailAddressInput: Locator;
  private readonly passwordInput: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly loginButton: Locator;
  private readonly loginWithGoogleButton: Locator;
  private readonly loginWithLinkedInButton: Locator;
  private readonly createFreeAccountLink: Locator;

  constructor(public readonly page: Page) {
    this.emailAddressInput = this.page.getByTestId("login-email");
    this.passwordInput = this.page.getByTestId("login-password");
    this.forgotPasswordLink = this.page
      .getByRole("link")
      .filter({ hasText: "Forgot password" });
    this.loginButton = this.page
      .getByRole("button")
      .filter({ hasText: "Login" });
    this.loginWithGoogleButton = this.page
      .getByRole("link")
      .filter({ hasText: "Login with Google" });
    this.loginWithLinkedInButton = this.page
      .getByRole("link")
      .filter({ hasText: "Login with LinkedIn" });
    this.createFreeAccountLink = this.page
      .getByRole("link")
      .filter({ hasText: "Create a free account!" });
  }

  async goto() {
    await this.page.goto("https://practice.expandtesting.com/notes/app/login");
  }

  async login({ username, password }) {
    await this.setEmail(username);
    await this.setPassword(password);
    await this.clickLogin();
  }

  async setEmail(username) {
    await this.emailAddressInput.fill(username);
  }

  async setPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async loginWithGoogle() {
    await this.loginWithGoogleButton.click();
  }

  async loginWithLinkedIn() {
    await this.loginWithLinkedInButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickCreateNewAccount() {
    await this.createFreeAccountLink.click();
  }
}
