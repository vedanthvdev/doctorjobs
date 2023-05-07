import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";

describe("NavBar component", () => {
  it("should highlight the active link based on the current pathname", () => {
    const mockPathname = "/jobs";
    Object.defineProperty(window, "location", {
      value: { pathname: mockPathname },
      writable: true,
    });

    render(
      <Router>
        <NavBar />
      </Router>
    );

    expect(screen.getByTestId("jobs-navbar")).toHaveClass("active");
  });
});
