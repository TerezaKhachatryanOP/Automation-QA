const email = process.env.EMAIL || "veryGood@example.com";
const password = process.env.PASSWORD || "superSecretPassword123!";

export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: number;
  birth_month: string;
  birth_year: number;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}

export const userRegistrationData: UserRegistrationData = {
  name: "Top",
  email,
  password,
  title: "Miss",
  birth_date: 24,
  birth_month: "May",
  birth_year: 2005,
  firstname: "Tereza",
  lastname: "Khachatryan",
  company: "OP",
  address1: "IDK",
  address2: "Again IDK",
  country: "Armenia",
  zipcode: "123123",
  state: "GoodState",
  city: "Yerevan",
  mobile_number: "+12341234",
};

export interface UserDetails {
  email: string;
  password: string;
}

export const userDetails: UserDetails = {
    email,
    password
}