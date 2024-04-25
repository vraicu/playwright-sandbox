import { ResetYourPasswordPage } from "../POMs/resetYouPasswordPage";
import { test, expect } from "@playwright/test";

test.describe("When I click send me reset link without filling in an email", () => {
  test("should display an error", async ({ page }) => {
    const resetYourPasswordPage = new ResetYourPasswordPage(page);
    resetYourPasswordPage.goto();

    await resetYourPasswordPage.sendResetLinkButton.click();

    await expect(page.getByText("Email address is required")).toBeVisible();
  });
});

test.describe("When I fill in an incorrect email", () => {
  test("should display an error", async ({ page }) => {
    const resetYourPasswordPage = new ResetYourPasswordPage(page);
    resetYourPasswordPage.goto();

    await resetYourPasswordPage.sendResetLink("someguy@somemail");

    await expect(page.getByText("Email address is invalid")).toBeVisible();
  });
});

test.describe("When I fill in a email that is not associated to an accountd", () => {
  test("should display an error", async ({ page }) => {
    const resetYourPasswordPage = new ResetYourPasswordPage(page);
    resetYourPasswordPage.goto();

    await resetYourPasswordPage.sendResetLink("someguy@somemail.com");

    await expect(page.getByTestId("alert-message")).toContainText(
      "No account found with the given email address"
    );
  });
});

test.describe("When I fill in a valid email", () => {
  test("should send reset link", async ({ page }) => {
    const resetYourPasswordPage = new ResetYourPasswordPage(page);
    resetYourPasswordPage.goto();

    await resetYourPasswordPage.sendResetLink(process.env.USERNAME);

    await expect(
      page.getByRole("heading").filter({ hasText: "Reset your password" })
    ).toBeVisible();
    await expect(page.getByTestId("alert-message")).toContainText(
      `An e-mail with a link to reset the password has been sent to ${process.env.USERNAME}`
    );
    await expect(
      page.getByText("Click here to back to home page")
    ).toBeVisible();
  });
});
