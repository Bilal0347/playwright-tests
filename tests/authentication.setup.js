import { test as setup, expect } from "@playwright/test";
import { loginUtil } from "./utils/loginUtil";

const email = "test@maddox123.ai";
const password = "supersecure";
const authFile = "./tests/.auth/user.json";

setup("Authentication", async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await loginUtil(page,  email, password)
  await page.waitForLoadState('load');
  await expect(page.locator('h1')).toHaveText("Home");
  await page.context().storageState({ path: authFile });
});
