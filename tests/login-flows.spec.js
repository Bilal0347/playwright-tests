import { test, expect } from "@playwright/test";
import { loginUtil } from "./utils/loginUtil";


test.describe("Login test", () => {

  test("Test For Successful Login", async ({ page }) => {  
   
    await loginUtil(page, 'test@maddox123.ai', 'supersecure')

    await page.waitForLoadState('load');
    await expect(page.locator('h1')).toHaveText("Home");
  });

  
  test("Test For Unsuccessful Login", async ({ page }) => {

    await loginUtil(page,  "test@maddox456.ai", "super");

    await page.waitForLoadState('load');
    const errorMessage = await page.locator("p").innerText();
    
    await expect(errorMessage).toContain(
      "Invalid email or password. Try again."
    );
  });

});
