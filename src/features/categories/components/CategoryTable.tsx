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
  page: number;
  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
};

export function CategoriesTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  page,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
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

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(params.value)}
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

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  const rows = data ? mapDataToGridRows(data) : [];
  const rowCount = data?.meta.total || 0;
  rowsPerPage = rowsPerPage || [10, 20, 30];

  return (
    <Box sx={{ display: "flex", height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={isFetching}
        pagination
        pageSizeOptions={rowsPerPage} // MUI 7 usa `pageSizeOptions`
        paginationMode="server"
        filterMode="server"
        checkboxSelection={false}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        paginationModel={{
          page: page - 1, // Ajuste direto para base 0
          pageSize: perPage,
        }}
        onPaginationModelChange={({ page, pageSize }) => {
          handleOnPageChange(page + 1); // Converte para base 1
          handleOnPageSizeChange(pageSize);
        }}
        onFilterModelChange={handleFilterChange}
        slots={{ toolbar: GridToolbar }}
        slotProps={componentProps}
      />
    </Box>
  );
}
