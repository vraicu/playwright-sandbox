import { test, expect } from "@playwright/test";
import { TodoPage } from "../../POMs/todo-page";

test.describe("When I dbclick a todo item, remove it via backspace strokes and press enter", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("should update the count", async () => {
    await todoPage.addToDos(...["Groceries", "Buy flowers"]);

    await todoPage.clearTodo(0, "Groceries".length);
    await todoPage.submitChanges(0);

    await expect(todoPage.todoCount).toHaveText("1 item left");
  });

  test("should update the list", async () => {
    await todoPage.addToDos(...["Groceries", "Cook dinner", "Buy flowers"]);

    await todoPage.clearTodo(1, "Cook dinner".length);
    await todoPage.submitChanges(1);

    await expect(todoPage.todoItems.nth(0)).toHaveText("Groceries");
    await expect(todoPage.todoItems.nth(1)).toHaveText("Buy flowers");
  });

  test("should update the localstorage", async ({ page }) => {
    await todoPage.addToDos(...["Groceries", "Cook dinner", "Buy flowers"]);

    await todoPage.clearTodo(2, "Buy flowers".length);
    await todoPage.submitChanges(2);

    const todos = await page.evaluate(() =>
      JSON.parse(localStorage["react-todos"])
    );
    expect(todos).toHaveLength(2);
    expect(todos.map((t) => t.title)).toEqual(
      expect.arrayContaining(["Groceries", "Cook dinner"])
    );
  });
});

test.describe("When I hover over a todo item, click on the remove button", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("should update the count, list and localstorage", async ({ page }) => {
    await todoPage.addToDos(...["Groceries", "Cook dinner", "Buy flowers"]);

    await todoPage.remove("Cook dinner");

    await expect(todoPage.todoCount).toHaveText("2 items left");
    await expect(todoPage.getTodo("Groceries")).toHaveText("Groceries");
    await expect(todoPage.getTodo("Buy flowers")).toHaveText("Buy flowers");
    const todos = await page.evaluate(() =>
      JSON.parse(localStorage["react-todos"])
    );
    expect(todos).toHaveLength(2);
    expect(todos.map((t) => t.title)).toEqual(
      expect.arrayContaining(["Groceries", "Buy flowers"])
    );
  });
});

test.describe("When I clear completed todo items", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("should update the count, list and localstorage", async ({ page }) => {
    await todoPage.addToDos(...["Groceries", "Cook dinner", "Buy flowers"]);

    await todoPage.markAsComplete("Cook dinner");
    await todoPage.removeAllCompleted();

    await expect(todoPage.todoCount).toHaveText("2 items left");
    await expect(todoPage.getTodo("Groceries")).toHaveText("Groceries");
    await expect(todoPage.getTodo("Buy flowers")).toHaveText("Buy flowers");
    const todos = await page.evaluate(() =>
      JSON.parse(localStorage["react-todos"])
    );
    expect(todos).toHaveLength(2);
    expect(todos.map((t) => t.title)).toEqual(
      expect.arrayContaining(["Groceries", "Buy flowers"])
    );
  });
});
