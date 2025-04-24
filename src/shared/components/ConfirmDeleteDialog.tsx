// ConfirmDeleteDialog.tsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
  } from "@mui/material";
  
  type ConfirmDeleteDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
  };
  
  export const ConfirmDeleteDialog = ({
    open,
    onClose,
    onConfirm,
    title = "Confirmar exclusão",
    description = "Tem certeza que deseja deletar este item? Esta ação não pode ser desfeita.",
  }: ConfirmDeleteDialogProps) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  