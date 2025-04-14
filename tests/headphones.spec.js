import { test, expect } from '@playwright/test';
test ("поиск по ВБ", async ({page}) => {
  await page.goto("https://www.wildberries.ru/")
  await page.waitForTimeout(2000)
  const input= await page.locator("input#searchInput")
  await input.pressSequentially("наушники", {delay: 100})
  await page.keyboard.press("Enter")
  await page.waitForTimeout(3000)

// начало урока 3


//  Нажимаем на кнопку фильтр
const filterButton= await page.getByRole("button",{name:'Все фильтры'})
await filterButton.click()
await page.waitForTimeout(1000)
await expect(page.getByRole('heading',{ name: 'Фильтры' })).toBeVisible()
await page.waitForTimeout(2000)

//  Задаём сумму в интервале от 2000 до 5000 и проверяем маску(разаря, границы числового значенимя) для импут 

const startInput= await page.locator("input[name='startN']")
const endInput= await page.locator("input[name='endN']")

// Проверяем starN и endN отбражаются на странице 

await expect(startInput).toBeVisible()

// await - ожидаем 
// expect - элемент
// (startInput) - элемент
// .toBeVisible - метод проверки 

await expect(endInput).toBeVisible()
// Убираем значеине по умолчанию в строке "ОТ" вводим свои 
await startInput.clear()
await startInput.pressSequentially("2000", {delay: 100})
// пауза
await page.waitForTimeout(2000)
// Убираем значеине по умолчанию в строке "ДО" вводим свои 
await endInput.clear()
await endInput.pressSequentially("5000", {delay: 100})
await page.waitForTimeout (2000)

// будем искать по категории

const category= await page.locator("li.filter__item").getByText("Наушники", {exact:true})
await expect(category).toBeVisible()
await category.click()
await page.waitForTimeout(1500)

// Поиск по брендам

const brand= await page.locator("li.filter__item").getByText("Xiaomi", {exact:true})
await expect(brand).toBeVisible()
await brand.click()
await page.waitForTimeout(1500)

// Поиск по цвету 

const color= await page.locator("li.filter__item").getByText("белый", {exact:true})
await expect(color).toBeVisible()
await color.click()
await page.waitForTimeout(1500)

// Вид наушников 

const headphoneType= await page.locator("li.filter__item").getByText("охватывающие", {exact:true})
await expect(headphoneType).toBeVisible()
await headphoneType.click()
await page.waitForTimeout(1500)

const showButton= await page.locator("button.filters-desktop__btn-main.btn-main")
await expect(showButton).toBeVisible()
await showButton.click()
await page.waitForTimeout(2500)


const headphones= await page.locator("article#c346528176")
await expect(headphones).toBeVisible()
await headphones.click()
await page.waitForTimeout(3000)

});
