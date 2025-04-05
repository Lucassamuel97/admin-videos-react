import { IconButton, Typography, Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Results } from "../../../types/Category";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
};

export function CategoriesTable({
  data,
  perPage,
  isFetching,
  rowsPerPage = [10, 20, 30],
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
  // MUI usa page baseado em zero, então subtraímos 1 aqui
  const [paginationModel, setPaginationModel] = useState({
    page: (data?.meta.current_page || 1) - 1,
    pageSize: perPage,
  });

  useEffect(() => {
    if (data?.meta.current_page !== undefined) {
      setPaginationModel((prev) => ({
        ...prev,
        page: data.meta.current_page - 1, // Backend envia 1-based, DataGrid usa 0-based
      }));
    }
  }, [data?.meta.current_page]);
  

  const handlePaginationModelChange = (model: { page: number; pageSize: number }) => {
    setPaginationModel(model);
    handleOnPageChange(model.page); // já está em base 0
    handleOnPageSizeChange(model.pageSize);
  };

  const slotProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {
        debounceMs: 500,
      },
    },
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    {
      field: "id",
      headerName: "Actions",
      type: "string",
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      isActive: category.is_active,
      created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
    }));
  }

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(params.row.id)}
        aria-label="delete"
        data-testid="delete-button"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  const rows = data ? mapDataToGridRows(data) : [];
  const rowCount = data?.meta.total || 0;

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={isFetching}
        pagination
        paginationMode="server"
        filterMode="server"
        checkboxSelection={false}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        onFilterModelChange={handleFilterChange}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={slotProps}
        pageSizeOptions={rowsPerPage}
      />
    </Box>
  );
}
