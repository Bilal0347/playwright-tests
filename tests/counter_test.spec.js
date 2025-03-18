import { test, expect } from '@playwright/test';

test('Counter updates correctly with increment/decrement/reset', async ({ page,baseURL }) => {

    await page.goto(baseURL);
    await expect(page.locator('h2')).toHaveText("Counter");
    const incrementBtn = page.getByRole('button', { name: '+' });
    const decrementBtn = page.getByRole('button', { name: '-' });
    const resetBtn = page.getByRole('button', { name: 'Reset' });
    const counter = page.locator('p');
    await page.pause()
    await expect(counter).toHaveText('0');
    // Test increment
    await incrementBtn.click();
    await incrementBtn.click();
    await expect(counter).toHaveText('2');

    // Test decrement
    await decrementBtn.click();
    await expect(counter).toHaveText('1');

    // Test reset
    await resetBtn.click();
    await expect(counter).toHaveText('0');
});