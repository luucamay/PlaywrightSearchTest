import { test, expect } from '@playwright/test';

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro');

  await page.getByRole('button', { name: 'Search' }).click();
  // role=button[name="Search"

  await page.getByPlaceholder('Search docs').click();

  await page.getByPlaceholder('Search docs').fill('hascontent');

  // .DocSearch-NoResults p
  await expect(page.locator('.DocSearch-NoResults p')).toBeVisible();

  await expect(page.locator('.DocSearch-NoResults p')).toHaveText('No results for "hascontent"');

})

test('Limpiar el input de busqueda', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro');

  await page.getByRole('button', { name: 'Search' }).click();
  // role=button[name="Search"

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await searchBox.fill('somerandomtext');

  await expect(searchBox).toHaveAttribute('value', 'somerandomtext');

  await page.getByRole('button', { name: 'Clear the query' }).click();

  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro');

  await page.getByRole('button', { name: 'Search' }).click();
  // role=button[name="Search"

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await page.getByPlaceholder('Search docs').fill('Havetext');

  // Verity there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});