// Defines the columns and rendering logic for the candidate table UI.
import { Button } from "@mui/material";
import Link from "next/link";

export interface CandidateSortProps {
  sortKey: string;
  sortOrder: "asc" | "desc";
  onSort: (key: string) => void;
}

export const candidateColumns = (sortProps?: CandidateSortProps) => {
  const { sortKey, sortOrder, onSort } = sortProps || {};
  const renderSortLabel = (key: string, label: string) => (
    <span
      role="button"
      tabIndex={0}
      aria-label={`Sort by ${label}`}
      style={{ cursor: "pointer", userSelect: "none" }}
      onClick={() => onSort && onSort(key)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSort && onSort(key);
      }}
    >
      {label}
      {sortKey === key ? (sortOrder === "asc" ? " ▲" : " ▼") : ""}
    </span>
  );
  return [
    {
      id: "name",
      label: renderSortLabel ? renderSortLabel("firstName", "Name") : "Name",
      className: "font-semibold text-blue-800",
      render: (c: any) => (
        <div className="flex items-center gap-2 sm:gap-3 min-w-[160px]">
          <span className="flex w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 items-center justify-center text-blue-700 font-bold text-base sm:text-lg shadow-sm">
            {c.firstName.charAt(0)}
            {c.lastName.charAt(0)}
          </span>
          <div className="truncate">
            <div className="font-semibold text-blue-900 text-sm sm:text-base truncate">
              {c.firstName} {c.lastName}
            </div>
            <div className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-none">
              {c.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "department",
      label: renderSortLabel
        ? renderSortLabel("company.name", "Department")
        : "Department",
      className: "font-semibold text-blue-800",
      render: (c: any) => (
        <span className="inline-block bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium max-w-[90px] sm:max-w-none truncate">
          {c.company?.name || ""}
        </span>
      ),
    },
    {
      id: "role",
      label: renderSortLabel ? renderSortLabel("role", "Role") : "Role",
      className: "font-semibold text-blue-800",
      render: (c: any) => (
        <span className="inline-block bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium max-w-[90px] sm:max-w-none truncate">
          {c.role || "Candidate"}
        </span>
      ),
    },
    {
      id: "status",
      label: renderSortLabel ? renderSortLabel("status", "Status") : "Status",
      className: "font-semibold text-blue-800",
      render: (c: any) => (
        <span
          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium max-w-[90px] sm:max-w-none truncate ${
            c.status === "Hired"
              ? "bg-green-200 text-green-800"
              : c.status === "Rejected"
              ? "bg-red-200 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {c.status || "Scheduled"}
        </span>
      ),
    },
    {
      id: "actions",
      label: "Actions",
      className: "font-semibold text-blue-800",
      render: (c: any, user: any) => (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 min-w-[120px]">
          <Button
            component={Link}
            href={`/candidates/${c.id}`}
            variant="outlined"
            size="small"
            sx={{ borderRadius: 2, width: { xs: "100%", sm: "auto" } }}
            fullWidth
          >
            View Details
          </Button>
          {user?.role === "panelist" && (
            <Button
              component={Link}
              href={`/candidates/${c.id}?tab=feedback&feedbackTab=form`}
              variant="contained"
              color="success"
              size="small"
              sx={{ borderRadius: 2, width: { xs: "100%", sm: "auto" } }}
              fullWidth
            >
              Submit Feedback
            </Button>
          )}
        </div>
      ),
    },
  ];
};
