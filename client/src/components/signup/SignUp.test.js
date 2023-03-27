import React from "react";
import SignUp from "./SignUp";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { withRouter } from "../../setupTests";
jest.mock("axios");

afterEach(() => {
  cleanup();
});

const routerSetup = () => {
  return render(withRouter(<SignUp />));
};

describe("SignUp", () => {
  it("should render a form", () => {
    const wrapper = routerSetup();
    expect(wrapper.findByTestId("signup-form")).toBeTruthy();
  });

  it("should set error state to empty string when passwords match", async () => {
    routerSetup();
    const passwordInput = await screen.getByTestId("password");
    passwordInput.value = "password";
    fireEvent.change(passwordInput);

    const confirmPasswordInput = await screen.getByTestId("confirm-password");
    confirmPasswordInput.value = "password";
    fireEvent.change(confirmPasswordInput);
  });
});
