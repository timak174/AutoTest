import { test, expect } from '@playwright/test';
test ("поиск по ВБ", async ({page}) => {
  await page.goto("https://www.wildberries.ru/")
  await page.waitForTimeout(2000)
  const input= await page.locator("input#searchInput")
  await input.pressSequentially("компьютерный коврик", {delay: 100})
  await page.keyboard.press("Enter")
  await page.waitForTimeout(3000)

  
  // Начало урока 4
  const buttonFilter= await page.locator("button.dropdown-filter__btn.dropdown-filter__btn--all")
  await buttonFilter.click()
  await page.waitForTimeout(1000)
  await expect(page.getByText('РАСПРОДАЖА', { exact: true }).first()).toBeVisible();

  // ищем свитч распродажа - кликаем по нему, проверяем класс
  const switchSale= await page.locator("button[aria-label='Кнопка']").first()
  await expect(switchSale).toBeVisible()
  await switchSale.click()
  await expect(switchSale).toHaveClass("btn-switch__btn j-list-item active")

  // проверяем фича на разряды у импут
  const startInput= await page.locator("input[name='startN']")
  const endInput= await page.locator("input[name='endN']")
  await expect(startInput).toBeVisible()
  await expect(endInput).toBeVisible()
  await page.waitForTimeout(1500)
  
  // очищаем от начального значения, вводим новые значения ввиде чисел и проверям маску(шаблон)
  await startInput.clear()
  await startInput.pressSequentially("1231", {delay: 100})
  await expect(startInput).toHaveValue('1 231')

  // фокусируемся на ипуте "ДО", очищаем от начального значения, вводим новые значения ввиде чисел и проверям маску(шаблон)
  await endInput.focus()
  await endInput.clear()
  await endInput.pressSequentially("3213", {delay: 100})
  await expect(endInput).toHaveValue("3 213")
  await page.waitForTimeout(1500)


  // поиск фильтра по цвету
  const color= await page.locator("li.filter__item.filter__item--color").getByText("голубой", {exact:true})
  await expect(color).toBeVisible()
  await color.click()
  await page.waitForTimeout(1500)

  // кнопка "показать" отоброожает заданные значения 
  const buttonAll= await page.locator("button.filters-desktop__btn-main.btn-main")
  await expect(buttonAll).toBeVisible()
  await buttonAll.click()
  await page.waitForTimeout(2000)
  
  // вывод колличество выбранных фильров 
  const filterСounter= await page.locator("span.dropdown-filter__count")
  await expect(filterСounter).toHaveText("3")

});
