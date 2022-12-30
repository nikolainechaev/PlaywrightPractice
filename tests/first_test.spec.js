const { test, expext, expect} = require( '@playwright/test');

test('Basic test', async({page})=>{
    await page.goto('https://playwright.dev/');
    const name = await page.innerText('.navbar__title');
    expect(name).toBe('Playwright');
});

test('Trying to log test result', async ({page, context})=> {
    await context.tracing.start({screenshots: true, snapshots: true});
    await page.goto('http://www.uitestingplayground.com/scrollbars');
    await page.click('#hidingButton');
    await context.tracing.stop({path: 'trace.zip'})
})

test('Add/Remove Elements test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    await page.locator('button').click();
    await expect(page.locator('.added-manually')). toBeVisible();
    await page.locator('.added-manually').click();
    await expect(page.locator('.added-manually')). toBeHidden();
});

test('Authentication test', async({browser})=>{
    const context = await browser.newContext({
        httpCredentials:{
            username: "admin",
            password: "admin"
        }
    })
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    const header = await page.$("h3");
    if (header) {
        console.log(await header.textContent());
        expect(await header.textContent()).toBe("Basic Auth")
    }
});
test('Broken Images test', async({page}) => {
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    await expect(page.getByRole('img').nth(1)).toBeVisible();
    // await expect(page.getByRole('img').nth(1)).toHaveAttribute('width', '');
    await expect(page.getByRole('img').nth(2)).toBeVisible();
    // await expect(page.getByRole('img').nth(2)).toHaveAttribute('width:', '');
    await expect(page.getByRole('img').nth(3)).toBeVisible();
    // await expect(page.getByRole('img').nth(3)).toHaveAttribute('width:', 120);


});

test('Challenging DOM test', async({page}) => {
    await page.goto('https://the-internet.herokuapp.com/challenging_dom');
    const firstButton = page.locator('a').nth(1);
    const secondButton = page.locator('a').nth(2);
    const thirdButton = page.locator('a').nth(3);
    await secondButton.click();
    await thirdButton.click();
    await expect(firstButton).toBeVisible();
    await expect(secondButton).toBeVisible();
    await expect(thirdButton).toBeVisible();

});

test('Checkboxes test', async({page}) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    const firstCheckbox = await page.locator('input').nth(0);
    await expect(firstCheckbox).not.toBeChecked();
    const secondCheckbox = await page.locator('input').nth(1);
    await expect(secondCheckbox).toBeChecked();
    await firstCheckbox.click();
    await expect(firstCheckbox).toBeChecked();
    await secondCheckbox.click();
    await expect(secondCheckbox).not.toBeChecked();

});

test('Context Menu test', async({page}) => {
    await page.goto('https://the-internet.herokuapp.com/context_menu');
    const area = await page.locator('#hot-spot');
    await area.click({button:'right'});
});
test('Disappearing Elements test', async({page}) => {

    await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
    const firstLink = await page.locator('li').nth(0);
    await firstLink.click();
    const heading = await page.innerText('.heading');
    await expect(heading).toBe('Welcome to the-internet');

    await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
    const secondLink = await page.locator('li').nth(1);
    await secondLink.click();
    const text = await page.textContent('h1');
    await expect(text).toBe('Not Found');

    await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
    const thirdLink = await page.locator('li').nth(2);
    await thirdLink.click();
    const text2 = await page.textContent('h1');
    await expect(text2).toBe('Not Found');

    await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
    const fourthLink = await page.locator('li').nth(3);
    await fourthLink.click();
    const text3 = await page.innerText('h1');
    await expect(text3).toBe('Not Found');
});
test('Exit Intent test', async({page, context}) => {
    await context.tracing.start({screenshots: true, snapshots: true});
    await page.goto('https://the-internet.herokuapp.com/exit_intent');
    await page.locator('html').dispatchEvent('mouseleave');
    await context.tracing.stop({path: 'traceExitIntent.zip'})
});
test('File Downloader test', async({page}) => {
    await page.goto('https://the-internet.herokuapp.com/download');
    const downloadPromise = page.waitForEvent('download');
    const thirdLink = await page.locator('a').nth(2);
    await thirdLink.click();
    const download = await downloadPromise;
    console.log(await download.path());
    await download.saveAs('Users/nikolainechaev/Desktop/at.docx');
});
test.only('Geolocation test', async({page, context}) => {
    context.setGeolocation({ longitude: 48.858455, latitude: 2.294474 });
    await page.goto('https://the-internet.herokuapp.com/geolocation');
    const button = await page.getByText('Where am I');
    await button.click();
    const linkToGoogle = await page.getByText('See it on Google');
    await linkToGoogle.click();
    await expect(page).toHaveURL('https://www.google.');
});