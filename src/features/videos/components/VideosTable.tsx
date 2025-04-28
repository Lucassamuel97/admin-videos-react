import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
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
import { Results } from "../../../types/Videos";
import { Genre } from "../../../types/Genres";
import { Category } from "../../../types/Category";

type Props = {
    data: Results | undefined;
    perPage: number;
    page: number;
    isFetching: boolean;
    rowsPerPage?: number[];
    handleOnPageChange: (page: number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageSizeChange: (perPage: number) => void;
    handleDelete: (id: string) => void;
};

export function VideosTable({
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
            field: "title",
            headerName: "Title",
            flex: 1,
            renderCell: renderNameCell,
        },
        {
            field: "genres",
            headerName: "Genres",
            flex: 1,
            renderCell: renderGenresCell,
        },
        {
            field: "categories",
            headerName: "Categories",
            flex: 1,
            renderCell: renderCategoriesCell,
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
        const { data: videos } = data;
        return videos.map((video) => ({
            id: video.id,
            title: video.title,
            genres: video.genres,
            categories: video.categories,
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
                to={`/videos/edit/${rowData.id}`}
            >
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        );
    }

    function renderGenresCell(params: GridRenderCellParams) {
        const genres = params.value as Genre[];
        const twoFirstGenres = genres.slice(0, 2);
        const remainingGenres = genres.length - twoFirstGenres.length;

        return (
            <Box
            sx={{
              display: "flex",
              overflowX: {
                xs: "auto",
                md: "hidden",
              },
              overflowY: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "100%",         // força o conteúdo a respeitar a célula
              flexWrap: "nowrap",       // impede quebra em linha
              gap: 1,
            }}
          >
            {twoFirstGenres.map((genre) => (
              <Chip
                key={genre.name}
                label={genre.name}
                sx={{
                  fontSize: "0.6rem",
                  flexShrink: 0,
                }}
              />
            ))}
          
            {remainingGenres > 0 && (
              <Tooltip title={genres.map((genre) => genre.name).join(", ")}>
                <Chip
                  label={`+${remainingGenres}`}
                  sx={{
                    fontSize: "0.6rem",
                    flexShrink: 0,
                  }}
                />
              </Tooltip>
            )}
          </Box>
          
        );
    }

    function renderCategoriesCell(params: GridRenderCellParams) {
        const categories = params.value as Category[];
        const twoFirstCategories = categories.slice(0, 2);
        const remainingCategories = categories.length - twoFirstCategories.length;

        return (
            <Box
            sx={{
              display: "flex",
              overflowX: {
                xs: "auto",
                md: "hidden",
              },
              overflowY: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "100%",         // força o conteúdo a respeitar a célula
              flexWrap: "nowrap",       // impede quebra em linha
              gap: 1,
            }}
          >
                {twoFirstCategories.map((category, index) => (
                    <Chip
                        key={index}
                        sx={{
                            fontSize: "0.6rem",
                            marginRight: 1,
                        }}
                        label={category.name}
                    />
                ))}
                {remainingCategories > 0 && (
                    <Tooltip
                        title={categories.map((category) => category.name).join(", ")}
                    >
                        <Chip
                            sx={{
                                fontSize: "0.6rem",
                                marginRight: 1,
                            }}
                            label={`+${remainingCategories}`}
                        />
                    </Tooltip>
                )}
            </Box>
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
