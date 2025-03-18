export async function loginUtil(page, email, password, ) {
  await page.goto('/login');
  await page.locator('[id="email-input"]').fill(email);
  await page.locator('[id="password-input"]').fill(password);
  await page.locator('button:has-text("Login")').click();
 
}