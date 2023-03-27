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
});
