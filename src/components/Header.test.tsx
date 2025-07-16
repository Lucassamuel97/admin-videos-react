import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "./Header";

// Mock da KeycloakConfig
vi.mock("../../KeycloackConfig", () => ({
  keycloak: {
    logout: vi.fn(),
    login: vi.fn(),
    init: vi.fn(),
    authenticated: true,
    token: "fake-token"
  }
}));

// Importação após o mock
import { keycloak } from "../../KeycloackConfig";
describe("Header", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Header toggle={() => {}} theme="dark" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with light theme", () => {
    const { asFragment } = render(<Header toggle={() => {}} theme="light" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with dark theme", () => {
    const { asFragment } = render(<Header toggle={() => {}} theme="dark" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle logout", () => {
    render(<Header toggle={() => {}} theme="dark" />);

    const logoutButton = screen.getByRole("button", { name: /Logout/i });
    expect(logoutButton).toBeInTheDocument();

    logoutButton.click();

    expect(keycloak.logout).toHaveBeenCalled();
  });
});