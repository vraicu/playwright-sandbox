import { test, expect } from "@playwright/test";
import { Categories, HomePage, Note } from "../POMs/homePage";

test.use({ storageState: ".auth/regular_user.json" });

test("Should be able to add a note", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  const noteTitle = "Wrap up presentation";
  const note: Note = {
    category: Categories.Work,
    completed: false,
    title: noteTitle,
    description: "Include graphs, rearrange slides",
  };

  await homePage.addNewNote(note);

  await expect(homePage.cardHeader).toHaveText(noteTitle);
  await expect(homePage.cardBody).toHaveText(
    "Include graphs, rearrange slides"
  );
  await expect(homePage.cardViewButton(noteTitle)).toBeVisible();
  await expect(homePage.cardEditButton(noteTitle)).toBeVisible();
  await expect(homePage.cardDeleteButton(noteTitle)).toBeVisible();
  await expect(homePage.cardCompleteCheckbox(noteTitle)).toBeVisible();

  // cleanup
  await homePage.deleteNote(note.title);
  await homePage.confirmNoteDeletion();
});
