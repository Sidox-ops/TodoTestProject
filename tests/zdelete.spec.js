const { test } = require("@playwright/test");

test.describe("Delete todo", () => {
  test("should show a flash message", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("[data-test-e2e-clean=delete]");
    await page.click("[data-test-e2e-clean=delete]");
    await page.waitForSelector("[data-test-e2e=deleted-toast]");
    await page.waitForSelector("[data-test-e2e=delete-todo-1]");
    await page.click("[data-test-e2e=delete-todo-1]");
    await page.waitForSelector("[data-test-e2e=deleted-toast]");
    await page.waitForTimeout(2000);
  });
});
