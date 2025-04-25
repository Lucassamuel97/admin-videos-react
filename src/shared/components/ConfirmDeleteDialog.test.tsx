import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";

describe("ConfirmDeleteDialog", () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
  };

  it("should render with default title and description", () => {
    renderWithProviders(<ConfirmDeleteDialog {...defaultProps} />);

    expect(screen.getByText("Confirmar exclusão")).toBeInTheDocument();
    expect(
      screen.getByText("Tem certeza que deseja deletar este item? Esta ação não pode ser desfeita.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /deletar/i })).toBeInTheDocument();
  });

  it("should render with custom title and description", () => {
    renderWithProviders(
      <ConfirmDeleteDialog
        {...defaultProps}
        title="Apagar usuário"
        description="Tem certeza que deseja apagar este usuário?"
      />
    );

    expect(screen.getByText("Apagar usuário")).toBeInTheDocument();
    expect(screen.getByText("Tem certeza que deseja apagar este usuário?")).toBeInTheDocument();
  });

  it("should call onClose when Cancelar is clicked", () => {
    renderWithProviders(<ConfirmDeleteDialog {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("should call onConfirm when Deletar is clicked", () => {
    renderWithProviders(<ConfirmDeleteDialog {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /deletar/i }));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it("should not render anything when open is false", () => {
    renderWithProviders(<ConfirmDeleteDialog {...defaultProps} open={false} />);
    expect(screen.queryByText("Confirmar exclusão")).not.toBeInTheDocument();
  });
});
