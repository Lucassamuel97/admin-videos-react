import { IconButton, Typography, Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Results } from "../../../types/CastMembers";

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

export function CastMemberTable({
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
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      renderCell: renderNameCell,
    },
    {
      flex: 1,
      field: "type",
      headerName: "Type",
      renderCell: renderTypeCell,
    },
    {
      flex: 1,
      field: "id",
      headerName: "Actions",
      renderCell: renderActionsCell,
    },
  ];

  function renderTypeCell(rowData: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {rowData.value === 1 ? "Diretor" : "Actor"}
      </Typography>
    );
  }


  function mapDataToGridRows(data: Results) {
    const { data: castMembers } = data;
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
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
        to={`/cast-members/edit/${rowData.id}`}
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
