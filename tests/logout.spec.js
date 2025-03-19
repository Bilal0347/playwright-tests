import { test, expect } from "@playwright/test";

test("Test For Logout", async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await page.waitForLoadState('load');
  await expect(page.locator("h1")).toHaveText("Home");

  const logoutBtn = page.locator('button:has-text("Logout")');
  await expect(logoutBtn).toBeVisible();
  logoutBtn.click();

  await page.waitForURL("/login");
  await page.goto(`${baseURL}/`);
  await page.waitForLoadState('load');
  await expect(page).toHaveURL("/login");
  await expect(page.locator("h2")).toHaveText("Demo Login Form");
});
