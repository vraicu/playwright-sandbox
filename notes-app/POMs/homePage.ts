import type { Page, Locator } from "@playwright/test";

enum Categories {
  Home = "Home",
  Work = "Work",
  Personal = "Personal",
}

type Note = {
  category: Categories;
  completed: boolean;
  title: string;
  description: string;
};

export class HomePage {
  public readonly profileButton: Locator;
  private readonly logoutButton: Locator;

  // search
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  // add new notes
  private readonly addNoteButton: Locator;
  private readonly categorySelect: Locator;
  private readonly completedCheckbox: Locator;
  private readonly titleInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly createNoteButton: Locator;
  private readonly cancelNoteButton: Locator;
  private readonly closeNoteButton: Locator;

  // categories
  private readonly allNotesButton: Locator;
  private readonly homeNotesButton: Locator;
  private readonly workNotesButton: Locator;
  private readonly personalNotesButton: Locator;

  public readonly Url: string = "https://practice.expandtesting.com/notes/app";

  constructor(public readonly page: Page) {
    this.profileButton = this.page.getByTestId("profile");
    this.logoutButton = this.page.getByTestId("logout");

    this.searchInput = this.page.getByTestId("search-input");
    this.searchButton = this.page.getByTestId("search-btn");

    this.addNoteButton = this.page.getByTestId("add-new-note");
    this.categorySelect = this.page.getByTestId("note-category");
    this.completedCheckbox = this.page.getByTestId("note-completed");
    this.titleInput = this.page.getByTestId("note-title");
    this.descriptionInput = this.page.getByTestId("note-description");
    this.createNoteButton = this.page.getByTestId("note-submit");
    this.cancelNoteButton = this.page.getByTestId("note-cancel");
    this.closeNoteButton = this.page.locator('button[aria-label="Close"]');

    this.allNotesButton = this.page.getByTestId("category-all");
    this.homeNotesButton = this.page.getByTestId("category-home");
    this.workNotesButton = this.page.getByTestId("category-work");
    this.personalNotesButton = this.page.getByTestId("category-personal");
  }

  async goto() {
    await this.page.goto(this.Url);
  }

  async addNewNote(note: Note) {
    await this.categorySelect.selectOption(note.category);
    if (note.completed) {
      await this.completedCheckbox.check();
    }
    await this.titleInput.fill(note.title);
    await this.descriptionInput.fill(note.description);
    await this.createNoteButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
