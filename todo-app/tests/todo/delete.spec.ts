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

const filters = ["All", "Active", "Completed"];
for (const filter of filters) {
  test.describe(`When ${filter} is selected`, () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
      todoPage = new TodoPage(page);
      await todoPage.goto();
    });

    test("should be able to remove todo item by clicking delete", async ({
      page,
    }) => {
      const todo = "Do laundry";
      await todoPage.addToDo(todo);
      if (filter === "Completed") {
        await todoPage.markAsComplete(todo);
      }

      await todoPage.selectFilter(filter);
      await todoPage.remove(todo);

      await expect(todoPage.todoCount).not.toBeVisible();
      const todos = await page.evaluate(() =>
        JSON.parse(localStorage["react-todos"])
      );
      expect(todos).toHaveLength(0);
    });
  });
}

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

test.describe("When there are no completed todo items", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("clear completed is not visible", async () => {
    await todoPage.addToDos(...["Groceries", "Cook dinner", "Buy flowers"]);

    await expect(todoPage.clearCompleted).not.toBeVisible();
  });
});
