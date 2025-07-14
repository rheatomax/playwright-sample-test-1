import { test, expect } from "@playwright/test";

test("new order", async ({ page }) => {
  await page.goto("https://stg.kouri2.com/");
  await page.getByPlaceholder("メールアドレス").click();
  await page.getByPlaceholder("メールアドレス").fill("rheatomax97@gmail.com");
  await page.getByPlaceholder("パスワード").fill("123456");
  await page.getByRole("button", { name: "ログイン" }).click();
  await page.getByRole("link", { name: "新規注文" }).click();
  await page.locator('button:has-text("rhea"):not(:has-text("rheaさん"))').click();
  await page.getByPlaceholder("お届け日を選択してください").click();
  await page.getByText("15", { exact: true }).click();
  await page.locator("div") .filter({ hasText: /^支払いへ進む$/ }).click();
  await page.getByRole("textbox", { name: "Datepicker input" }).getByPlaceholder("yyyy年mm月dd日") .click();
  await page.getByText("15", { exact: true }).click();
  await page.locator("div") .filter({ hasText: /^注文登録$/ }).click();
  await page.getByRole("dialog") .getByRole("button", { name: "注文登録" }).click();
});
