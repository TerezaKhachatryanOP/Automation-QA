import { test, expect } from "@playwright/test";
import { userRegistrationData } from "../Fixtures/userData.ts";

const BASE_URL = process.env.BASE_URL || "https://automationexercise.com/api";

// Get All Products List
test("GET request", async ({ request }) => {
  const response = await request.get(`${BASE_URL}/productsList`);
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty("products");
  expect(Array.isArray(data.products)).toBeTruthy();
});

// POST To Search Product
test("POST request", async ({ request }) => {
  const response = await request.post(`${BASE_URL}/searchProduct`, {
    form: {
      search_product: "top",
    },
  });

  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty("products");
  expect(data.products.length).toBeGreaterThan(0);
});

//POST To Search Product without search_product parameter
test('POST request without "search_product" parameter', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/searchProduct`, {
    form: { name: "My product" },
  });
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty("message");
  expect(data.message).toContain("search_product parameter is missing");
  expect(data.responseCode).toBe(400);
});

// POST To Verify Login with invalid details
test("POST request to verify login details", async ({ request }) => {
  const password = process.env.INVALID_PASSWORD;
  const email = process.env.EMAIL;
  const response = await request.post(`${BASE_URL}/verifyLogin`, {
    form: { password, email },
  });
  expect(response.status()).toBe(200);
  const data = await response.json();

  expect(data).toHaveProperty("message");
  expect(data.message).toBe("User not found!");

  expect(data).toHaveProperty("responseCode");
  expect(data.responseCode).toBe(404);
});

test.describe.serial("User account management", async () => {
  // POST To Create/Register User Account.
  test("POST request to create account", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/createAccount`, {
      form: {
        ...userRegistrationData,
      },
    });

    expect(response.status()).toBe(200);
    const data = await response.json();

    expect(data).toHaveProperty("responseCode");
    expect(data.responseCode).toBe(201);
    expect(data).toHaveProperty("message");
    expect(data.message).toBe("User created!");
  });
  // POST To Verify Login with valid details
  test("POST request to verify login detais", async ({ request }) => {
    const password = process.env.PASSWORD;
    const email = process.env.EMAIL;
    const response = await request.post(`${BASE_URL}/verifyLogin`, {
      form: { password, email },
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("message");
    expect(data.message).toBe("User exists!");
  });
  // DELETE To Delete User Account
  test("DELETE request to delete account", async ({ request }) => {
    const password = process.env.PASSWORD;
    const email = process.env.EMAIL;

    const response = await request.delete(`${BASE_URL}/deleteAccount`, {
      form: { email, password },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty("responseCode");
    expect(data.responseCode).toBe(200);
    expect(data).toHaveProperty("message");
    expect(data.message).toBe("Account deleted!");
  });
});

// Print products with price greater than 1000
test("GET request to print products with price greater than 1000", async ({
  request,
}) => {
  const response = await request.get(`${BASE_URL}/productsList`);
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty("products");

  const result = data.products.filter((item) => {
    const price = Number(item.price.replace("Rs. ", ""));
    return price > 1000;
  });

  expect(result.length).toBeGreaterThan(0);
});

// Print products with category: Tops
test("GET request to print products with specific category", async ({
  request,
}) => {
  const response = await request.get(`${BASE_URL}/productsList`);
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty("products");

  const result = data.products.filter((product) => {
    return product.category?.category === "Tops";
  });
  expect(result.length).toBeGreaterThan(0);
});

// Print products with user type: Women
test("GET request to print products with type Women", async ({ request }) => {
  const response = await request.get(`${BASE_URL}/productsList`);
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty("products");

  const result = data.products.filter(
    (product) => product.category?.usertype?.usertype === "Women",
  );
  expect(result.length).toBeGreaterThan(0);
});
