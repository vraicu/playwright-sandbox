import { test, expect } from "@playwright/test";
import { TodoPage } from "../../POMs/todo-page";

test.describe("When all filter is selected", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    todoPage.goto();
  });

  test("should contain both complete and incomplete todo items", async () => {
    await todoPage.addToDos(...["Walk the dog", "Buy more treats"]);
    await todoPage.markAsComplete("Buy more treats");

    const filter = todoPage.getFilter("All");
    await expect(filter).toHaveAttribute("class", "selected");
    await expect(todoPage.todoCount).toHaveText("1 item left");
    await expect(todoPage.todoItems).toHaveCount(2);
  });
});

test.describe("When active filter is selected", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    todoPage.goto();
  });

  test("should contain only incomplete todo items", async () => {
    await todoPage.addToDos(...["Walk the dog", "Buy more treats"]);
    await todoPage.markAsComplete("Buy more treats");

    await todoPage.selectFilter("Active");

    const filter = todoPage.getFilter("Active");
    await expect(filter).toHaveAttribute("class", "selected");
    await expect(todoPage.todoCount).toHaveText("1 item left");
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.nth(0)).toHaveText("Walk the dog");
  });
});

test.describe("When completed filter is selected", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    todoPage.goto();
  });

  test("should contain only complete todo items", async () => {
    await todoPage.addToDos(...["Walk the dog", "Buy more treats"]);
    await todoPage.markAsComplete("Buy more treats");

    await todoPage.selectFilter("Completed");

    const filter = todoPage.getFilter("Completed");
    await expect(filter).toHaveAttribute("class", "selected");
    await expect(todoPage.todoCount).toHaveText("1 item left");
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.nth(0)).toHaveText("Buy more treats");
  });
});
