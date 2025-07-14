import { Page } from '@playwright/test';

export const credentials = {
    email: 'rheatomax97@gmail.com',
    password: '123456'
};

export async function login(page: Page) {
    await page.goto('https://stg.kouri2.com/');
    await page.getByPlaceholder('メールアドレス').fill(credentials.email);
    await page.getByPlaceholder('パスワード').fill(credentials.password);
    await page.getByRole('button', { name: 'ログイン' }).click();
} 