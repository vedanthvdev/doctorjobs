import React from "react";
import SignUp from "../../signup/SignUp";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { withRouter } from "../../../setupTests";
import { shallow } from "enzyme";

import axios from "axios";
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

  // it("should not make an axios post request when passwords do not match 2", () => {
  //   const wrapper = render(withRouter(<SignUp />));
  //   wrapper.setState({
  //     regPassword: "password",
  //     regConfirmPassword: "notpassword",
  //   });
  //   const spy = jest.spyOn(axios, "post");
  //   wrapper.instance().handleValidation();
  //   expect(spy).not.toHaveBeenCalled();
  // });

  // it("should make an axios post request when passwords match", () => {
  //   const wrapper = render(withRouter(<SignUp />));
  //   wrapper.setState({
  //     regPassword: "password",
  //     regConfirmPassword: "password",
  //   });
  //   const spy = jest.spyOn(axios, "post");
  //   wrapper.instance().handleValidation();
  //   expect(spy).toHaveBeenCalled();
  // });
});
