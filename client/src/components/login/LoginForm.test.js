import React from "react";

import { render, fireEvent, cleanup } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { withRouter } from "../../setupTests";

jest.mock("axios");

afterEach(cleanup);

const routerSetup = () => {
  return render(withRouter(<LoginForm />));
};

const setup = () => {
  const utils = routerSetup();
  const inputEmail = utils.getByPlaceholderText("Email*");
  const inputPassword = utils.getByPlaceholderText("Password*");
  const submitBtn = utils.getByText("Log In");

  return {
    inputEmail,
    inputPassword,
    submitBtn,
    ...utils,
  };
};

describe("LoginForm", () => {
  it("displays the correct form inputs", () => {
    const { getByPlaceholderText, getByTestId } = routerSetup();
    const emailInput = getByPlaceholderText("Email*");
    const passwordInput = getByPlaceholderText("Password*");
    const submitButton = getByTestId("submit");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

test("Test email and password input and submit button", () => {
  const { inputEmail, inputPassword, submitBtn } = setup();
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();
});

test("Test email and password input value change", () => {
  const { inputEmail, inputPassword } = setup();
  fireEvent.change(inputEmail, { target: { value: "test@email.com" } });
  fireEvent.change(inputPassword, { target: { value: "password123" } });
  expect(inputEmail.value).toBe("test@email.com");
  expect(inputPassword.value).toBe("password123");
});
