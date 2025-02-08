const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

(async function example() {
    const browser = Browser.CHROME
    const baseUrl = 'https://www.cermati.com/app/gabung'
    let phone = '087783872222'
    let email = 'aaaaaaemail@gmail.com'
    let fistname = 'fistname'
    let lastname = 'lastname'
    let successCriteria = "Verifikasi No. Handphone"
    
    let driver = await new Builder().forBrowser(browser).build();
    try {

        await driver.get(baseUrl);
        await driver.wait(until.titleIs('Daftar'), 5000);

        // Fill in the form fields
        driver.findElement(By.xpath('//*[@id="mobilePhone"]')).sendKeys(phone);
        await driver.findElement(By.xpath('//*[@id="email"]')).sendKeys(email);
        await driver.findElement(By.xpath('//*[@id="firstName"]')).sendKeys(fistname);
        await driver.findElement(By.xpath('//*[@id="lastName"]')).sendKeys(lastname);

        // Click the submit button
        await driver.findElement(By.xpath('//*[@id="__next"]/main/div/div/div[2]/div/button')).click();

        // wait until page reload
        await driver.wait(until.titleIs(successCriteria), 5000)

        // Get the actual text from the page
        let actualText = await driver.findElement(By.xpath('//*[@id="__next"]/main/div/div/div[1]/div[1]/h1')).getText();

        // Assert the actual text matches the expected text
        let result = assert.equal(actualText, "Verifikasi No. Handphone", `Expected "${successCriteria}", but got "${actualText}"`);
        console.log(result)

    } finally {
        await driver.quit();
    }
})();
