const { test, expect } = require('@playwright/test');

test('promo', async ({ page, context }) => {
    // Open the initial page
    await page.goto('https://www.malaysiaairlines.com/us/en/home.html');

    // Perform actions on the initial page
    await page.getByRole('button', { name: 'Accept all cookies' }).click();
    await page.locator('(//input[@aria-label="From"])[1]').fill('pen');
    await page.keyboard.press('Enter');
    await page.locator('(//input[@aria-label="To"])[1]').fill('kul');
    await page.keyboard.press('Enter');
    
    await page.locator("(//label[@class='inline-flex cursor-pointer relative md:hidden'])[1]").click();
    await page.locator('//button[@data-date="2023-11-23"]').click();
    await page.locator("//button[@class='CTAButton flex rounded-5xl justify-center gap-2 styleType-primary sizeType-small w-auto mx-auto md:mx-auto'][normalize-space()='Done']").click();
    await page.getByRole('button', { name: 'Find me a flight now' }).click();
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(3000);
    const screenshot = await page.screenshot({fullPage:true});

    // Perform visual regression test using .toMatchSnapshot()
    expect(screenshot).toMatchSnapshot();

    // Close the new page and context
    await page.close();
    
});
