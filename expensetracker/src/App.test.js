import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PassReset from "./Components/PasswordReset/PassReset";
describe("PathReset", () => {
  test("does not render", () => {
    render(<PassReset />);
    const role = screen.getByRole("button");
    userEvent.click(role);
    const outputElement = screen.queryByText("PassWord Reset", {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
  test("renders", () => {
    render(<PassReset />);
    const role = screen.getByRole("button");
    userEvent.click(role);
    const outputElement = screen.queryByText("Loading...", {
      exact: false,
    });
    expect(outputElement).not.toBeInTheDocument();
  });
});
