import { test, expect } from "@playwright/test";

// Get All Products List
test("GET request", async ({ request }) => {
  const response = await request.get(
    "https://automationexercise.com/api/productsList",
  );
  const data = await response.json();
  expect(response.status()).toBe(200);
});

// POST To Search Product
test("POST request", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/searchProduct",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        search_product: "top",
      },
    },
  );

  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty("products");
  expect(data.products.length).toBeGreaterThan(0);
});

//POST To Search Product without search_product parameter
test('POST request without "search_product" parameter', async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/searchProduct",
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      form: { name: "My product" },
    },
  );
  const data = await response.json();
  expect(data).toHaveProperty("message");
  expect(data.message).toContain("search_product parameter is missing");
  expect(data.responseCode).toBe(400);
});

// POST To Verify Login with valid details
test("POST request to verify login detais", async ({ request }) => {
  const password = "superSecretPassword123!";
  const email = "veryGood@example.com";
  const response = await request.post(
    "https://automationexercise.com/api/verifyLogin",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: { password, email },
    },
  );

  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty("message");
  expect(data.message).toBe("User exists!");
});

// POST To Verify Login with invalid details
test("POST request to verify login details", async ({ request }) => {
  const password = "invalid-password";
  const email = "invalid-mail";
  const response = await request.post(
    "https://automationexercise.com/api/verifyLogin",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: { password, email },
    },
  );
  expect(response.status()).toBe(200);
  const data = await response.json();

  expect(data).toHaveProperty("message");
  expect(data.message).toBe("User not found!");

  expect(data).toHaveProperty("responseCode");
  expect(data.responseCode).toBe(404);
});

// POST To Create/Register User Account
test("POST request to create account", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/createAccount",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        name: "Top",
        email: `veryGood+${Date.now()}@example.com`,
        password: "superSecretPassword123!",
        title: "Miss",
        birth_date: 24,
        birth_month: "May",
        birth_year: 2005,
        firstname: "Tereza",
        lastname: "Lhachatryan",
        company: "OP",
        address1: "IDK",
        address2: "Again IDK",
        country: "Armenia",
        zipcode: "123123",
        state: "GoodState",
        city: "Yerevan",
        mobile_number: "+12341234",
      },
    },
  );

  expect(response.status()).toBe(200);
  const data = await response.json();

  expect(data).toHaveProperty("responseCode");
  expect(data.responseCode).toBe(201);
  expect(data).toHaveProperty("message");
  expect(data.message).toBe("User created!");
});

// DELETE To Delete User Account
test("DELETE request to delete account", async ({ request }) => {
  const password = "superSecretPassword123!";
  const email = "veryGood@example.com";

  const response = await request.delete(
    "https://automationexercise.com/api/deleteAccount",
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      form: { email, password },
    },
  );

  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty("responseCode");
  expect(data.responseCode).toBe(200);
  expect(data).toHaveProperty("message");
  expect(data.message).toBe("Account deleted!");
});

// Print products with price greater than 1000
test("GET request to print products with price greater than 1000", async ({
  request,
}) => {
  const response = await request.get(
    "https://automationexercise.com/api/productsList",
  );
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty("products");

  const result = data.products.filter((item) => {
    const price = Number(item.price.replace("Rs. ", ""));
    return price > 1000;
  });

  expect(result.length).toBeGreaterThan(0);
  console.log(data);
});

// Print products with category: Tops
test("GET request to print products with specific category", async ({
  request,
}) => {
  const response = await request.get(
    "https://automationexercise.com/api/productsList",
  );
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  expect(data).toHaveProperty("products");

  const result = data.products.filter((product) => {
    if (Array.isArray(product.category)) {
      return product.category.some((cat) => cat.name === "Tops");
    }
    return product.category?.name === "Tops";
  });
  expect(result.length).toBeGreaterThan(0);
});
