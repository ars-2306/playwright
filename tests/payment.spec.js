const { test, expect } = require('@playwright/test');

test('visual test5', async ({ page, context }) => {
    test.setTimeout(120000);
    // Open the initial page
    await page.goto('file:///C:/Users/arshetty/Downloads/index.html');

    // Perform actions on the initial page
    await page.locator('#urlSelect').selectOption({ value: 'https://uat.digital.airline.amadeus.com/mh/booking?trace=true' });
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
    await delay(9000);
    
    await newPage.getByPlaceholder('Your first name').fill('Aryan');
    await newPage.getByPlaceholder('Your last name').fill('Shetty');
    await newPage.getByPlaceholder('Your email address').first().fill('test@testing.com');
    await newPage.getByText('Confirm email').fill('test@testing.com');
    await newPage.getByPlaceholder('Your mobile phone').fill('1234567891');
    await newPage.getByPlaceholder('Your country calling code').fill('91');
    await newPage.getByPlaceholder('Your country calling code').click();
    await newPage.getByText('Skip to Payment').click();
    await delay(13000);

    const screenshot = await newPage.screenshot({fullPage:true});
    // Perform visual regression test using .toMatchSnapshot()
    expect(screenshot).toMatchSnapshot();
    
});