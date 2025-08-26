// Admin-only UI for managing user roles.
"use client";
import React, { useEffect, useState } from "react";
import MuiTable from "@/components/MuiTable";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAuthRedux } from "@/features/auth/useAuthRedux";
import { useRouter } from "next/navigation";

const mockUsers = [
  { id: 1, name: "michaelw", role: "admin" },
  { id: 2, name: "Bob", role: "panelist" },
  { id: 3, name: "Carol", role: "ta" },
];

const roles = ["admin", "panelist", "ta"];

export default function RoleManagement() {
  const { user } = useAuthRedux();
  const router = useRouter();
  const [users, setUsers] = useState(mockUsers);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  const canManageRoles = user?.role === "admin";

  const columns = [
    {
      id: "name",
      label: "Name",
      width: 120,
      render: (row: any) => (
        <span className="font-medium text-gray-800">{row.name}</span>
      ),
    },
    {
      id: "role",
      label: "Role",
      width: 100,
      render: (row: any) => (
        <span className="capitalize text-blue-700 font-semibold">
          {row.role}
        </span>
      ),
    },
    {
      id: "actions",
      label: canManageRoles ? "Actions" : "",
      render: (row: any) =>
        canManageRoles ? (
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel id={`role-select-label-${row.id}`}>Role</InputLabel>
            <Select
              labelId={`role-select-label-${row.id}`}
              value={row.role}
              label="Role"
              onChange={(e) => handleRoleChange(row.id, e.target.value)}
              disabled={row.name === user?.username}
              className="bg-white disabled:bg-gray-100"
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <span className="text-gray-400 text-sm">No access</span>
        ),
    },
  ];

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  if (!user) return null;

  return (
    <div className="relative w-full max-w-[98vw] sm:max-w-2xl mx-auto mt-2 sm:mt-8 p-2 xs:p-3 sm:p-6 bg-white rounded-xl shadow border border-gray-200">
      <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-4 text-gray-900 text-center sm:text-left">
        Role Management (Admin Only)
      </h2>
      <div className="">
        <MuiTable
          columns={columns}
          rows={users}
          pagination={false}
          containerClassName="border border-gray-200 rounded min-w-[340px]"
          // tableProps={{ className: "w-full" }}
          // tableSize={{ minWidth: "40vw", height: "auto" }}
        />
      </div>
      {!canManageRoles && (
        <Alert severity="error" className="mt-4">
          You do not have permission to manage roles.
        </Alert>
      )}
    </div>
  );
}
