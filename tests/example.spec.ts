import { test, expect } from "@playwright/test";

test.describe("chromium only", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "Chromium only!");

  test("has title @title", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test("get started link", async ({ page, browserName }) => {
    test.skip(browserName === "firefox", "stil working on it");
    await page.goto("https://playwright.dev/");

    // Click the get started link.
    await page.getByRole("link", { name: "star" }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
  });
});
