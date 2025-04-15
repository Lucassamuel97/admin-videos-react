import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CreateCastMember } from "./CreateCastMembers";
import { renderWithProviders } from "../../utils/test-utils";


describe("CreateCastMember", () => {
  it("should render correctly", () => {

    const { asFragment } = renderWithProviders(<CreateCastMember />);
    expect(asFragment()).toMatchSnapshot();
  });
  
});
