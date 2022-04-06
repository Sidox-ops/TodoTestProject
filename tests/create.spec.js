const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

const TODO_ITEMS_TEXTS = [
  "Cette todo a été créée par nos tests e2e",
  "Acheter du pain par tests e2e",
];

test.describe("Create two todos and check them", () => {
  test("should allow me to create two todos", async ({ page }) => {
    await page.waitForSelector("[data-test-e2e=input-new-todo]");
    await page.fill("[data-test-e2e=input-new-todo]", TODO_ITEMS_TEXTS[0]);
    await page.keyboard.press("Enter");
    await page.waitForSelector("[data-test-e2e=created-toast]");
    await page.waitForSelector("[data-test-e2e=todo-0]");

    await page.waitForTimeout(2000);

    await page.waitForSelector("[data-test-e2e=input-new-todo]");
    await page.fill("[data-test-e2e=input-new-todo]", TODO_ITEMS_TEXTS[1]);
    await page.keyboard.press("Enter");
    await page.waitForSelector("[data-test-e2e=created-toast]");
    await page.waitForSelector("[data-test-e2e=todo-1]");
  });

  test("Todos we created need to contain the good text", async ({ page }) => {
    // Make sure the text in items correspond to text we fill when created todo.
    let todoText = "";
    todoText = await page.innerText("[data-test-e2e=todo-text-0]");
    expect(todoText).toBe(TODO_ITEMS_TEXTS[0]);
    todoText = await page.innerText("[data-test-e2e=todo-text-1]");
    expect(todoText).toBe(TODO_ITEMS_TEXTS[1]);
  });
});
