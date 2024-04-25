import { Page, Locator } from "@playwright/test";

export class ResetYourPasswordPage {
  public readonly emailAddressInput: Locator;
  public readonly sendResetLinkButton: Locator;
  public readonly goBackToLoginButton: Locator;

  constructor(public readonly page: Page) {
    this.emailAddressInput = this.page.getByTestId("forgot-password-email");
    this.sendResetLinkButton = this.page.getByTestId("forgot-password-submit");
    this.goBackToLoginButton = this.page.getByTestId("login-view");
  }

  async goto() {
    await this.page.goto(
      "https://practice.expandtesting.com/notes/app/forgot-password"
    );
  }

  async sendResetLink(email) {
    await this.emailAddressInput.fill(email);
    await this.sendResetLinkButton.click();
  }

  async clickGoBackToLogin() {
    await this.goBackToLoginButton.click();
  }
}
