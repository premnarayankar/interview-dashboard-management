"use client";
// Main candidate list page with search, pagination, and table display.
import React, { useEffect, useState, Suspense } from "react";
import { fetchCandidates } from "./candidatesAPI";
import TextField from "@mui/material/TextField";

const MuiTable = React.lazy(() => import("@/components/MuiTable"));
import { candidateColumns } from "./candidateTableData";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthRedux } from "../auth/useAuthRedux";

type SortKey = "firstName" | "company.name" | "role" | "status";
type SortOrder = "asc" | "desc";

interface FetchCandidatesParams {
  limit: number;
  skip: number;
  sortBy: string;
  order: string;
  q?: string;
}

export default function CandidateList() {
  const { user } = useAuthRedux();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>("firstName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        let params: FetchCandidatesParams = {
          limit: rowsPerPage,
          skip: page * rowsPerPage,
          sortBy: sortKey,
          order: sortOrder,
        };
        if (debouncedSearch) {
          params.q = debouncedSearch;
          params.skip = page * rowsPerPage;
        }
        const res = await fetchCandidates(params);
        if (!ignore) {
          setList(res.data.users);
          setTotal(res.data.total);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch candidates");
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [page, rowsPerPage, debouncedSearch, sortKey, sortOrder]);

  return (
    <section className="p-6 bg-white rounded-xl border border-blue-100 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center  mb-2">
        <header className="text-2xl text-blue-900 font-bold">
          Candidate List
        </header>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <TextField
          label="Search by username"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setPage(0);
          }}
          className="w-full md:w-64"
        />
      </div>

      <Suspense fallback={<div>Loading table...</div>}>
        <MuiTable
          tableSize={{ width: "85vw", height: "70vh" }}
          columns={candidateColumns({
            sortKey,
            sortOrder,
            onSort: (key: string) => {
              if (sortKey === key) {
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
              } else {
                setSortKey(key as SortKey);
                setSortOrder("asc");
              }
            },
          })}
          rows={list}
          user={user}
          headSx={{ backgroundColor: "#eff6ff" }}
          containerClassName="rounded-xl border border-blue-100 shadow-sm"
          loading={loading}
          error={error}
          pagination={true}
          page={page}
          count={total}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
        />
      </Suspense>
    </section>
  );
}
