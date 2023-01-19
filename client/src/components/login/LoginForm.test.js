import React from "react";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { withRouter } from "../../setupTests";
import axios from "axios";

jest.mock("axios");

afterEach(cleanup);

const routerSetup = () => {
  return render(withRouter(<LoginForm />));
};

const setup = () => {
  const utils = routerSetup();
  const inputEmail = utils.getByPlaceholderText("Email");
  const inputPassword = utils.getByPlaceholderText("Password");
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
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByTestId("submit");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

describe("LoginFormttest", () => {
  it("submits the form and navigates to the profile page on success", async () => {
    const mockSetUser = jest.fn();
    const mockSetError = jest.fn();
    axios.post.mockResolvedValue({ data: { message: "" } });

    const { getByTestId } = render(
      withRouter(<LoginForm setUser={mockSetUser} setError={mockSetError} />)
    );

    const emailInput = getByTestId("email");
    const passwordInput = getByTestId("password");
    const submitButton = getByTestId("submit");

    fireEvent.change(emailInput, { target: { value: "a.b@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "asnn" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith({
        email: "a.b@gmail.com",
        password: "asnn",
      });
      expect(mockSetError).toHaveBeenCalledWith("");
    });
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
