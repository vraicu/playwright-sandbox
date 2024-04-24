import type { Page, Locator } from "@playwright/test";

export class GoogleLoginPage {
  private readonly emailAddressInput: Locator;
  private readonly passwordInput: Locator;
  private readonly nextButton: Locator;

  constructor(public readonly page: Page) {
    this.emailAddressInput = this.page.locator("#identifierId");
    this.passwordInput = this.page.locator('input[name="Passwd"]');
    this.nextButton = this.page.getByRole("button").filter({ hasText: "Next" });
  }

  async setEmail(email) {
    await this.emailAddressInput.fill(email);
  }

  async setPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickNext() {
    await this.nextButton.click();
  }
}
