const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

const driverPromise = new Builder().forBrowser(Browser.EDGE).build();
const USERNAME = "f3338o4tl"
const PASSWORD = "XI546njz"

async function auth(driver) {
    await driver.get('https://ispi.cdo.vlsu.ru/');
    await driver.findElement(By.css(".usermenu > span > a")).click()

    const loginButton = await driver.findElement(By.id("loginbtn"))

    await driver.wait(until.elementIsVisible(loginButton), 4000);
    await driver.findElement(By.id("username")).sendKeys(USERNAME)
    await driver.findElement(By.id("password")).sendKeys(PASSWORD)
    await loginButton.click()
}

async function test_one(driver) {

    const course = await driver.findElement(By.css("#frontpage-category-names > div > div.content > div > div:nth-child(1) > div.info > h3 > a"))
    await course.click()

    const semestr = await driver.findElement(By.xpath("//*[@id=\"region-main-shoelace\"]/div/div[2]/div[2]/div/div[5]/div[1]/h3/a"))
    await semestr.click()
}

async function test_two(driver) {
    await driver.findElement(By.id("nav-message-popover-container")).click()
    await driver.wait(until.elementIsVisible(driver.findElement(By.css(".messages"))), 4000);
    const chatButton = await driver.findElement(By.css(".messages > :nth-last-child(1)"))
    await chatButton.click()
    await driver.findElement(By.xpath("//*[@id=\"region-main-shoelace\"]/div/div/div/div[2]/div[3]/div[1]/div[1]/textarea"))
        .sendKeys("Test Message")
    await driver.findElement(By.css(".send-button-container > button")).click()
}

async function run_tests() {
    let driver = await driverPromise
    try {
        await auth(driver)
        await test_one(driver)
        await test_two(driver)
    } catch (e) {
        console.log(e)
    } finally {
        await driver.quit();
    }

    console.log("Tests Passed!")
    // try {
    //     await driver.get('http://www.google.com/ncr');
    //     await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    //     await driver.wait(until.titleIs('webdriver - Google Search'), 4000);
    // } finally {
    //     // await driver.quit();
    // }
}

run_tests()