const { test, expect } = require("@playwright/test");

test("dashboard loads health check and feature flag section", async ({ page }) => {
  await page.goto("/?userId=chaeyoung");

  await expect(page.locator("h1")).toContainText(/AIOSS/);
  await expect(page.locator("#health")).toContainText(/Healthy/);
  await expect(page.locator("#currentUser")).toContainText("chaeyoung");
  await expect(page.locator("#flagList")).toContainText("doraDashboard");
  await expect(page.locator("#abVariant")).toContainText(/A|B/);
});