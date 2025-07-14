import { test, expect } from "@playwright/test";
import { login } from './utils/auth';

test.describe("PA_1084", () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    /*Pre-requites:
        Set the Contract plan to Gold
    */
    test("Check shipping settings", async ({ page }) => {
        await page.getByRole("button", { name: ' 設 定 ' }).click(); 
        await page.getByRole("link", { name: '設定' }).click();
        await page.getByRole("link", { name: '配送の設定' }).click();
        await expect.soft(page.getByRole('cell', { name: '北海道' }).first()).toBeVisible();
        const inputField = page.getByRole('row', { name: '北海道 北海道 ￥' }).getByLabel('');
        await page.getByRole('row', { name: '北海道 北海道 ￥'}).getByLabel('').fill('2000');
        await expect.soft(inputField).toBeVisible();
        await expect.soft(inputField).toHaveValue("2000");
        await page.getByRole('button', {name:'保存'}).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: '新規注文' }).click();
        await page.mouse.move(150, 300);
        await page.locator('button:has-text("rhea"):not(:has-text("rheaさん"))').click();
        await page.getByRole('radio', { name: '配送' }).check();
        // await page.getByRole('button', { name: '福岡県' }).click();
        await page.locator('.v-col-sm-5').first().click();
        await page.getByText('北海道').click();
        await page.getByPlaceholder('お届け日を選択してください').click();
        await page.getByText('28', { exact: true }).click();
        await page.locator('div').filter({ hasText: /^支払いへ進む$/ }).click();

        await expect.soft(page.getByRole('cell', { name: '￥2,000.00' }).first()).toBeVisible();
        console.log('✅ Found cell containing 2000');

        await page.getByRole("button", { name: ' 設 定 ' }).click(); 
        await page.getByRole("link", { name: '設定' }).click();
        await page.getByRole("link", { name: '配送の設定' }).click();
        await expect.soft(page.getByRole('cell', { name: '北海道' }).first()).toBeVisible();
        await page.getByRole('row', { name: '北海道 北海道 ￥' }).getByLabel('').fill('1000');
        await expect.soft(page.getByRole('row', { name: '北海道 北海道 ￥' }).getByLabel('')).toHaveValue('1000');
        await page.getByRole('button', {name:'保存'}).click();
        await page.waitForLoadState('networkidle');
        console.log('✅ Inputted 1000');

        await page.getByRole('link', { name: '新規注文' }).click();
        await page.mouse.move(150, 300);
        // await page.locator('button:has-text("rhea"):not(:has-text("rheaさん"))').click({timeout: 90000, force: true});
        // await page.mouse.move(150, 300);
        await page.locator('button:has-text("rhea"):not(:has-text("rheaさん"))').click();
        await page.getByRole('radio', { name: '配送' }).check();
        // await page.getByRole('button', { name: '福岡県' }).click();
        await page.locator('.v-col-sm-5').first().click();
        await page.getByText('北海道').click();
        await page.getByPlaceholder('お届け日を選択してください').click();
        await page.getByText('28', { exact: true }).click();
        await page.locator('div').filter({ hasText: /^支払いへ進む$/ }).click();

        await expect.soft(page.getByRole('cell', { name: '￥1,000.00' }).first()).toBeVisible();
        console.log('✅ Found cell containing 1000');
    
    });
});
