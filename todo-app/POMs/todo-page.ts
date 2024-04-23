import type { Page, Locator } from "@playwright/test";
import os from "os";

export class TodoPage {
  private readonly editInputBox: Locator;
  private readonly completeAll: Locator;
  public readonly clearCompleted: Locator;
  private readonly inputBox: Locator;
  public readonly todoItems: Locator;
  public readonly todoCount: Locator;

  constructor(public readonly page: Page) {
    this.inputBox = this.page.locator("input.new-todo");
    this.todoItems = this.page.getByTestId("todo-item");
    this.todoCount = this.page.getByTestId("todo-count");
    this.editInputBox = this.page.locator("input.edit");
    this.completeAll = this.page.locator("input.toggle-all");
    this.clearCompleted = this.page.getByRole("button", {
      name: "Clear completed",
    });
  }

  async goto() {
    await this.page.goto("https://demo.playwright.dev/todomvc/");
  }

  async markAllComplete() {
    await this.completeAll.check();
  }

  async unmarkAllComplete() {
    await this.completeAll.uncheck();
  }

  async removeAllCompleted() {
    await this.clearCompleted.click();
  }

  async addToDo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press("Enter");
  }

  async addToDos(...texts: string[]) {
    for (const text of texts) {
      await this.addToDo(text);
    }
  }

  async clearTodo(index: number, length: number) {
    const todo = this.page.getByTestId("todo-title").nth(index);
    await todo.dblclick();
    const key = os.platform() === "darwin" ? "Meta" : "Control";
    await this.editInputBox.nth(index).press(`${key}+a`);
    await this.editInputBox.nth(index).press("Backspace");
  }

  async submitChanges(index: number) {
    await this.editInputBox.nth(index).press("Enter");
  }

  getTodo(text: string) {
    return this.todoItems.filter({ hasText: text });
  }

  async markAsComplete(text: string) {
    const todo = this.todoItems.filter({
      hasText: text,
    });
    await todo.locator("input.toggle").check();
  }

  async editTodo(index: number, text: string) {
    await this.page.getByTestId("todo-title").nth(index).dblclick();
    await this.editInputBox.nth(index).fill(text);
    await this.editInputBox.nth(index).blur();
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel("Delete").click();
  }

  async removeAll() {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover();
      await this.todoItems.getByLabel("Delete").first().click();
    }
  }

  getFilter(text: string) {
    return this.page
      .getByRole("listitem")
      .filter({ hasText: text })
      .getByRole("link");
  }

  async selectFilter(text: string) {
    const filter = this.getFilter(text);
    await filter.click();
  }
}
