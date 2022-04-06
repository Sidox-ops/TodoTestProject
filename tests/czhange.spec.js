const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("Check todos and check their states", () => {
  test("should check the second todo and verify is position in completed todos", async ({
    page,
  }) => {
    await page.waitForSelector("[data-test-e2e=check-todo-1]");
    await page.click("[data-test-e2e=check-todo-1]");
    await page.click("[data-test-e2e=apply-filter-completed]");
    await page.waitForSelector("[data-test-e2e=todo-1]");
  });

  test("should verify if first todo unchecked are in active position", async ({
    page,
  }) => {
    await page.click("[data-test-e2e=apply-filter-active]");
    await page.waitForSelector("[data-test-e2e=todo-0]");
  });

  test("should uncheck the second todo and verify is position in completed todos", async ({
    page,
  }) => {
    await page.click("[data-test-e2e=apply-filter-completed]");
    await page.waitForSelector("[data-test-e2e=check-todo-1]");
    await page.click("[data-test-e2e=check-todo-1]");
    await page.click("[data-test-e2e=apply-filter-active]");
    await page.waitForSelector("[data-test-e2e=todo-1]");
  });
});
