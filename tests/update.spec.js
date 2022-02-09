const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

const TODO_ITEMS_TEXTS = [
  'cette todo a ete modifiee',
];

test.describe('Update todo', () => {
  test('should allow me to update the first todo item', async ({ page }) => {
    // Check if there is one todo at first position todoList
    await page.waitForSelector('[data-test-e2e=edit-todo-0]');
    // click on edit button of the first todo 
    await page.click('[data-test-e2e=edit-todo-0]');
    // Wait if the text change to input
    await page.waitForSelector('[data-test-e2e=edit-todo-input-0]');
    // fill the input
    await page.fill('[data-test-e2e=edit-todo-input-0]', 'cette todo a ete modifiee');
    // press enter for send update of first todo
    await page.keyboard.press('Enter');

    // Make sure the first item in list is equal to TODO_ITEMS_TEXTS[0].
    let todoText = await page.innerText('[data-test-e2e=todo-text-0]');
    expect(todoText).toBe(TODO_ITEMS_TEXTS[0]);
  });
})
