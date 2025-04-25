import { render } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import { GenresTable } from "./GenresTable";

const Props = {
  data: undefined,
  page: 1,
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 25, 50],
  handleOnPageChange: () => {},
  handleFilterChange: () => {},
  handleOnPageSizeChange: () => {},
  handleDelete: () => {},
};

const mockData = {
  data: [
    {
      id: "123",
      name: "test",
      is_active: true,
      deleted_at: null,
      created_at: "2021-03-01T00:00:00.000000Z",
      updated_at: "2021-03-01T00:00:00.000000Z",
    },
  ],
  meta: {
    to: 1,
    from: 1,
    path: "http://localhost:8000/api/categories",
    total: 1,
    per_page: 1,
    last_page: 1,
    current_page: 1,
  },
  links: {
    first: "http://localhost:8000/api/cast_members?page=1",
    last: "http://localhost:8000/api/cast_members?page=1",
    prev: "",
    next: "",
  },
};

describe("GenreTable", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<GenresTable {...Props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CategoryTable with loading", () => {
    const { asFragment } = render(
      <GenresTable {...Props} isFetching={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render GenresTable with data", () => {
    const { asFragment } = renderWithProviders(
      <GenresTable {...Props} data={mockData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render GenresTable with data and loading", () => {
    const { asFragment } = renderWithProviders(
      <GenresTable {...Props} data={mockData} isFetching={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render GenresTable with data and loading and delete", () => {
    const { asFragment } = renderWithProviders(
      <GenresTable
        {...Props}
        data={mockData}
        isFetching={true}
        handleDelete={() => {
          console.log("delete");
        }}
      />
    );
    //  expect to find the delete button
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render GenresTable with data categories", () => {
    const { asFragment } = renderWithProviders(
      <GenresTable
        {...Props}
        data={{
          ...mockData,
          data: [
            {
              ...mockData.data[0],
              categories: [
                {
                  id: "1",
                  name: "test",
                  description: "test",
                  is_active: true,
                  created_at: "2021-09-01T00:00:00.000000Z",
                  updated_at: "2021-09-01T00:00:00.000000Z",
                  deleted_at: "",
                },
              ],
            },
          ],
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render GenresTable with Inactive value", () => {
    const { asFragment } = renderWithProviders(
      <GenresTable
        {...Props}
        data={{
          ...mockData,
          data: [{ ...mockData.data[0], is_active: false }],
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

});