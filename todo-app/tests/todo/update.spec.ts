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

    await todoPage.editTodo(1, "Wash dishes");

    await expect(todoPage.todoCount).toHaveText("2 items left");
  });

  test("should update the list", async () => {
    await todoPage.addToDos(...["Get flowers", "Wash car"]);

    await todoPage.editTodo(1, "Wash dishes");

    await expect(todoPage.todoItems.nth(0)).toHaveText("Get flowers");
    await expect(todoPage.todoItems.nth(1)).toHaveText("Wash dishes");
  });

  test("should persist the update in local storage", async ({ page }) => {
    const todoItems = ["Get flowers", "Wash car"];
    await todoPage.addToDos(...todoItems);

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

test.describe("When completing all todo items", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    todoPage.goto();
  });

  test("should update the count, list and localstorage accordingly", async ({
    page,
  }) => {
    const todoItems = ["Wash car", "Go to bank", "Pick up dry cleaning"];
    await todoPage.addToDos(...todoItems);

    await todoPage.markAllComplete();

    await expect(todoPage.todoCount).toHaveText("0 items left");
    for (let i = 0; i < (await todoPage.todoItems.count()); i++) {
      await expect(todoPage.todoItems.nth(i)).toHaveAttribute(
        "class",
        "completed"
      );
    }
    const todos = await page.evaluate(() =>
      JSON.parse(localStorage["react-todos"])
    );
    expect(todos).toHaveLength(3);
    expect(todos.filter((t) => !t.completed)).toHaveLength(0);
    expect(todos.map((t) => t.title)).toEqual(
      expect.arrayContaining(todoItems)
    );
  });
});
