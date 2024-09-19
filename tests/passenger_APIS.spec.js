const { test, expect } = require('@playwright/test');

test('visual test3', async ({ page, context }) => {
    test.setTimeout(60000);
    // Open the initial page
    await page.goto('file:///C:/Users/arshetty/Downloads/index.html');

    // Perform actions on the initial page
    await page.locator('#urlSelect').selectOption({ value: 'https://uat.digital.airline.amadeus.com/mh/booking?trace=true' });
    await page.getByPlaceholder('Enter Origin').fill('KUL - Kuala Lumpur');
    await page.getByPlaceholder('Enter Destination').fill('LAX - Los Angeles');
    await page.check('#tripType');
    await page.click('text=Submit');
    const newPage=await page.waitForEvent('popup');
    
    await newPage.waitForLoadState();
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(3000);
    await newPage.click('text=Debug panel');
    await  newPage.click('text=Enable visual testing ')
    await newPage.locator("(//i[@class='close-panel refx-icon-cross'])[1]").click();
    await newPage.waitForSelector('text=Economy');
    const button= await newPage.$('text=Economy');
    button.click();
    await newPage.click('text=Confirm');
   // await newPage.click('text=No, Continue');
    await delay(9000);
    const screenshot = await newPage.screenshot({fullPage:true});

    // Perform visual regression test using .toMatchSnapshot()
    expect(screenshot).toMatchSnapshot();
    
});