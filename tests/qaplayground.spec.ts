import { test, expect } from "@playwright/test";

test("QA Playground Home Page", async ({ page }) => {
  await page.goto("https://qaplayground.dev/");
  await expect(page).toHaveTitle(/Playground/);
});