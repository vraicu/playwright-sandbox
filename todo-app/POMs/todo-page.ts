import type { Page, Locator } from "@playwright/test";
export class TodoPage {
  private readonly editInputBox: Locator;
  private readonly completeAll: Locator;
  private readonly clearCompleted: Locator;
  public readonly inputBox: Locator;
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
    await this.page.getByTestId("todo-title").nth(index).dblclick();

    while (length > 0) {
      await this.editInputBox.nth(index).press("Backspace");
      length--;
    }
  }

  async editTodo(index: number, text: string) {
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
}
