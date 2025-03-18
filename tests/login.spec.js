import { test, expect } from "@playwright/test";
import { loginUtil } from "./utilts/loginUtil";


test.describe("Login test", () => {

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL)
    await page.locator('button:has-text("Logout")').click();
  });

  test("Test For Successful Login", async ({ page }) => {  
    await loginUtil(page, 'test@maddox123.ai', 'supersecure')
    await page.waitForURL('/')
    await expect(page.locator('h1')).toHaveText("Home");
  });

  test("Test For Unsuccessful Login", async ({ page }) => {

    await loginUtil(page,  "test@maddox456.ai", "super");
    const errorMessage = await page.textContent("p");
    await expect(errorMessage).toContain(
      "Invalid email or password. Try again."
    );
  });

});
