import { test, expect } from "@playwright/test";
import { TodoPage } from "../../POMs/todo-page";

test.describe("When updating a todo item", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    todoPage.goto();
  });

  test("should not impact the count of left items", async () => {
    await todoPage.addToDos(...["Get flowers", "Wash car"]);

    await todoPage.clearTodo(1, "Wash car".length);
    await todoPage.editTodo(1, "Wash dishes");

    await expect(todoPage.todoCount).toHaveText("2 items left");
  });

  test("should update the list", async () => {
    await todoPage.addToDos(...["Get flowers", "Wash car"]);

    await todoPage.clearTodo(1, "Wash car".length);
    await todoPage.editTodo(1, "Wash dishes");

    await expect(todoPage.todoItems.nth(0)).toHaveText("Get flowers");
    await expect(todoPage.todoItems.nth(1)).toHaveText("Wash dishes");
  });

  test("should persist the update in local storage", async ({ page }) => {
    const todoItems = ["Get flowers", "Wash car"];
    await todoPage.addToDos(...todoItems);

    await todoPage.clearTodo(0, "Get flowers".length);
    await todoPage.editTodo(0, "Wash dishes");

    const todos = await page.evaluate(() =>
      JSON.parse(localStorage["react-todos"])
    );
    expect(todos).toHaveLength(2);
    expect(todos.map((t) => t.title)).toEqual(
      expect.arrayContaining(["Wash dishes", "Wash car"])
    );
  });
});
