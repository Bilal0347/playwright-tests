import { test, expect } from "@playwright/test";
import { loginUtil } from "./utils/loginUtil";


test.describe("Login Flow", () => {

  test("Successful login with valid credentials", async ({ page }) => {  
   
    await loginUtil(page, 'test@maddox123.ai', 'supersecure')

    await page.waitForLoadState('load');
    await page.waitForSelector('h1'); 
    await expect(page.locator('h1')).toHaveText("Home");
  });

  
  test("Invalid credentials show error message", async ({ page }) => {

    await loginUtil(page,  "test@maddox456.ai", "super");


    await page.waitForSelector("p");
    const errorMessage = await page.locator("p").innerText();
    
    await expect(errorMessage).toContain(
      "Invalid email or password. Try again."
    );
  });

   test("Empty form submission shows browser validation", async ({ page }) => {
    await page.goto('/login');
    const emailInput = page.locator('[id="email-input"]');
    const passwordInput = page.locator('[id="password-input"]');
    await page.locator('button:has-text("Login")').click();

    // Verify browser validation messages
    expect(await emailInput.evaluate(el => el.validationMessage)).toBeTruthy();
    expect(await passwordInput.evaluate(el => el.validationMessage)).toBeTruthy();
  });

  test("Email format validation", async ({ page }) => {
    await page.goto('/login');
    const emailInput = page.locator('[id="email-input"]');
    await emailInput.fill('test');
    await page.locator('button:has-text("Login")').click();

    expect(await emailInput.evaluate(el => el.validationMessage)).toBeTruthy();
  });

});
