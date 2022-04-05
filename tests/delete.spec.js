const { test, expect } = require('@playwright/test');

test.describe('Delete todo', () => {
    test('should show a flash message', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('[data-test-e2e=delete-todo-0]');
        await page.click('[data-test-e2e=delete-todo-0]');
        await page.waitForSelector('[data-test-e2e=delete-toast]');
    });
});