import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/test-utils";
import { CategoryList } from "./ListCategory";


describe("CategoryList", () => {
  it("should render correctly", () => {

    const { asFragment } = renderWithProviders(<CategoryList />);
    expect(asFragment()).toMatchSnapshot();
  });
  
});
