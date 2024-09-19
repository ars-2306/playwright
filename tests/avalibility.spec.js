const { test, expect } = require('@playwright/test');

test('visual test1', async ({ page, context }) => {
    // Open the initial page
    await page.goto('file:///C:/Users/arshetty/Downloads/index.html');

    // Perform actions on the initial page
    await page.locator('#urlSelect').selectOption({ value: 'https://uat.digital.airline.amadeus.com/mh/booking?trace=true' });
    await page.check('#tripType');
    await page.click('text=Submit');
    const newPage=await page.waitForEvent('popup');
    await newPage.waitForLoadState();
    await newPage.click('text=Debug panel');
    await  newPage.click('text=Enable visual testing ')
    await newPage.locator("(//i[@class='close-panel refx-icon-cross'])[1]").click();
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(3000);
    const screenshot = await newPage.screenshot({fullPage:true});

    // Perform visual regression test using .toMatchSnapshot()
    expect(screenshot).toMatchSnapshot();

    // Close the new page and context
    await newPage.close();
    
});