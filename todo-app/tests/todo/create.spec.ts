import { test, expect } from "@playwright/test";
import { TodoPage } from "../../POMs/todo-page";

test.describe("When creating todo(s)", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    todoPage.goto();
  });

  test("should append at the end of the list", async () => {
    const todoItems = ["Groceries", "Laundry"];

    await todoPage.addToDos(...todoItems);

    for (let i = 0; i < todoItems.length; i++) {
      await expect(todoPage.todoItems.nth(i)).toHaveText(todoItems[i]);
    }
  });

  test("should increase the count of items left", async () => {
    const todoItems = ["Groceries", "Laundry"];

    await todoPage.addToDos(...todoItems);

    await expect(todoPage.todoCount).toHaveText("2 items left");
  });

  test("should be persisted in local storage", async ({ page }) => {
    const todoItems = ["Groceries", "Laundry"];

    await todoPage.addToDos(...todoItems);

    const todos = await page.evaluate(() =>
      JSON.parse(localStorage["react-todos"])
    );
    expect(todos).toHaveLength(2);
    expect(todos.filter((t) => t.completed)).toHaveLength(0);
    expect(todos.map((t) => t.title)).toEqual(
      expect.arrayContaining(todoItems)
    );
  });
});
