import { render, screen } from "@testing-library/react";
import { Header } from "./Header";


describe("Header", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});