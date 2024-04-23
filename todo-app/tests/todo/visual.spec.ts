import { test, expect } from "@playwright/test";
import { TodoPage } from "../../POMs/todo-page";

test.describe("Landing page", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("should match snapshot", async ({ page }) => {
    await expect(page).toHaveScreenshot();
  });
});
