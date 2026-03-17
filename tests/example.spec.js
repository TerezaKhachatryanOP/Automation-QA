import { test, expect } from '@playwright/test';

// Get All Products List
test('GET request', async ({ request }) => {
  const response = await request.get('https://automationexercise.com/api/productsList');
  const data = await response.json();
  expect(response.status()).toBe(200);
  console.log(data);
});

// POST To Search Product
test('POST request', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/searchProduct', {
    headers: {
      'Content-Type': "application/x-www-form-urlencoded"
    },
    form: {
      search_product: "top"
    }
  });

  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty('products');
  expect(data.products.length).toBeGreaterThan(0);

  console.log(data);
});

//POST To Search Product without search_product parameter
test('POST request without "search_product" parameter', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/searchProduct', {
    headers: { 'Content-Type': "application/x-www-form-urlencoded" },
    form: { name: "My product" }
  });
  const data = await response.json();
  expect(data).toHaveProperty('message');
  expect(data.message).toContain('search_product parameter is missing');

  expect(data.responseCode).toBe(400);
  console.log(data);
});


//POST To Verify Login with valid details
test('POST request to verify login detaild', async ({request}) => {
  const password = "superSecretPassword123!"
  const email = "veryGood@example.com"
  const response = await request.post('https://automationexercise.com/api/verifyLogin', {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }, 
    form: { password , email }
  })
  expect(response.status()).toBe(200)
  const data = await response.json()

  if(data.user){ 
    expect(data.user).toHaveProperty('email')
    expect(data.user.email).toBe("veryGood@example.com")

    expect(data.user).toHaveProperty('password')
    expect(data.user.password).toBe("superSecretPassword123!")

    expect(data).toHaveProperty('message');
    expect(data.message).toBe('User exists!');
  } else {
    expect(data).toHaveProperty('message')
    expect(data.message).toContain('User not found!')
  }
})