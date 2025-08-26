// Reusable Material-UI table component with optional pagination.
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";

interface Column {
  id: string;
  label: string | React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  align?: "right" | "left" | "center";
  className?: string;
  render?: (row: any, user?: any) => React.ReactNode;
}

interface TableSize {
  minHeight?: string | number;
  maxHeight?: string | number;
  height?: string | number;
  minWidth?: string | number;
  width?: string | number;
  maxWidth?: string | number;
}

interface MuiTableProps {
  columns: Column[];
  rows: any[];
  user?: any;
  headSx?: object;
  containerClassName?: string;
  containerSx?: object;
  loading?: boolean;
  error?: string | null;
  pagination?: boolean;
  page?: number;
  count?: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions?: number[];
  paginationProps?: object;
  emptyMessage?: string;
  tableProps?: object;
  tableSize?: TableSize;
}

export default function MuiTable({
  columns,
  rows,
  user,
  headSx,
  containerClassName,
  containerSx,
  loading,
  error,
  pagination,
  page: externalPage,
  count: externalCount,
  onPageChange: externalOnPageChange,
  rowsPerPage: externalRowsPerPage,
  onRowsPerPageChange: externalOnRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 100],
  paginationProps,
  emptyMessage = "No data found.",
  tableProps,
  tableSize,
}: MuiTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event: unknown, newPage: number) => {
    if (externalOnPageChange) externalOnPageChange(event, newPage);
    else setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (externalOnRowsPerPageChange) externalOnRowsPerPageChange(event);
    else {
      setRowsPerPage(+event.target.value);
      setPage(0);
    }
  };

  const currentPage = externalPage !== undefined ? externalPage : page;
  const currentRowsPerPage =
    externalRowsPerPage !== undefined ? externalRowsPerPage : rowsPerPage;
  const paginatedRows = rows;
  const totalCount = externalCount !== undefined ? externalCount : rows.length;

  return (
    <div>
      <TableContainer
        className={containerClassName}
        sx={{
          minHeight: tableSize?.minHeight || "70vh",
          height: tableSize?.height,
          maxHeight: tableSize?.maxHeight,
          minWidth: tableSize?.minWidth || "auto",
          width: tableSize?.width,
          maxWidth: tableSize?.maxWidth,
          ...containerSx,
        }}
      >
        <Table stickyHeader aria-label="sticky table" {...tableProps}>
          <TableHead>
            <TableRow sx={headSx}>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align || "left"}
                  className={col.className}
                  style={{
                    minWidth: col.minWidth,
                    width: col.width,
                    maxWidth: col.maxWidth,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  style={{ color: "#d32f2f" }}
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row, idx) => (
                <TableRow key={row.id || idx} hover>
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      align={col.align || "left"}
                      className={col.className}
                      style={{
                        minWidth: col.minWidth,
                        width: col.width,
                        maxWidth: col.maxWidth,
                      }}
                    >
                      {col.render ? col.render(row, user) : row[col.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <div className="w-full overflow-x-auto mt-2 flex justify-center">
          <div className="min-w-[320px] max-w-full">
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={totalCount}
              rowsPerPage={currentRowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              {...paginationProps}
            />
          </div>
        </div>
      )}
    </div>
  );
}
