import { expect, test } from "@playwright/test";

test("opens the world map and first level", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "CodeQuest" })).toBeVisible();
  await Promise.all([
    page.waitForURL("**/worlds"),
    page.getByRole("link", { name: /enter world map/i }).click(),
  ]);
  await expect(page.getByRole("heading", { name: "World Map" })).toBeVisible();
  await page.getByRole("link", { name: /data village/i }).click();
  await expect(page.getByRole("heading", { name: "Data Village" })).toBeVisible();
});

test("shows hidden test totals after a successful run", async ({ page }) => {
  await page.route("**/execute", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        stdout: "gold coin\n", stderr: "", exit_code: 0, timed_out: false, duration_ms: 120,
        friendly_error: null, error_type: null, output_truncated: false, cancelled: false,
        tests_passed: 1, tests_total: 1, test_results: [true],
      }),
    });
  });
  await page.goto("/level/1-1");
  const onboarding = page.getByRole("button", { name: /begin quest/i });
  if (await onboarding.isVisible()) await onboarding.click();
  await page.getByRole("button", { name: /start coding/i }).click();
  await page.getByRole("button", { name: /^run$/i }).click();
  await expect(page.getByText("Passed", { exact: true })).toBeVisible();
  await expect(page.getByText("Every hidden test passed", { exact: false })).toBeVisible();
});

test("renders the level editor on a mobile viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/level/1-6");
  await page.getByRole("button", { name: /start coding/i }).click();
  await expect(page.getByText("Program input")).toBeVisible();
  await expect(page.locator(".monaco-editor")).toBeVisible();
});
