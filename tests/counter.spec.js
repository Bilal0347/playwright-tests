import { test, expect } from "@playwright/test";

test.describe("Counter Functionality", () => {

  let incrementBtn;
  let decrementBtn;
  let resetBtn;
  let counter;
 
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('load');
    await expect(page.locator("h2")).toHaveText("Counter");

    incrementBtn = page.getByRole("button", { name: "+" });
    decrementBtn = page.getByRole("button", { name: "-" });
    resetBtn = page.getByRole("button", { name: "Reset" });
    counter = page.locator('p');
  });

  test("Increment button increases the counter", async () => {
    await incrementBtn.click();
    await expect(counter).toHaveText("1");
  });

  test("Decrement button decreases the counter", async () => {

    await incrementBtn.click(); // Set counter to 1
    await decrementBtn.click();
    await expect(counter).toHaveText("0");
  });

  test("Reset button resets the counter", async () => {

    await incrementBtn.click(); // Set counter to 1
    await resetBtn.click();
    await expect(counter).toHaveText("0");
  });

});
