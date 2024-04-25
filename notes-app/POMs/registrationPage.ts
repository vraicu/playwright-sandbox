import { Page, Locator } from "@playwright/test";

export type RegistrationForm = {
  email: string;
  name: string;
  password: string;
};

export class RegistrationPage {
  public readonly emailAddressInput: Locator;
  public readonly nameInput: Locator;
  public readonly passwordInput: Locator;
  public readonly confirmPasswordInput: Locator;
  public readonly registerButton: Locator;
  public readonly registerWithGoogleButton: Locator;
  public readonly registerWithLinkedInButton: Locator;
  public readonly logInLink: Locator;

  constructor(public readonly page: Page) {
    this.emailAddressInput = this.page.getByTestId("register-email");
    this.nameInput = this.page.getByTestId("register-name");
    this.passwordInput = this.page.getByTestId("register-password");
    this.confirmPasswordInput = this.page.getByTestId(
      "register-confirm-password"
    );
    this.registerButton = this.page.getByTestId("register-submit");
    this.registerWithGoogleButton = this.page.getByRole("link").filter({
      hasText: "Register with Google",
    });
    this.registerWithLinkedInButton = this.page.getByRole("link").filter({
      hasText: "Register with LinkedIn",
    });
    this.logInLink = this.page.getByTestId("login-view");
  }

  async goto() {
    await this.page.goto(
      "https://practice.expandtesting.com/notes/app/register"
    );
  }

  async fillRegistrationForm(form: RegistrationForm) {
    await this.emailAddressInput.fill(form.email);
    await this.nameInput.fill(form.name);
    await this.passwordInput.fill(form.password);
    await this.confirmPasswordInput.fill(form.password);
  }

  async submitForm() {
    await this.registerButton.click();
  }

  async clickRegisterWithGoogle() {
    await this.registerWithGoogleButton.click();
  }

  async clickRegisterWithLinkedIn() {
    await this.registerWithLinkedInButton.click();
  }

  async clickLogIn() {
    await this.logInLink.click();
  }
}
