// Button to log out the current user.
"use client";
import { useAuthRedux } from "./useAuthRedux";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Button from "@mui/material/Button";

export default function LogoutButton() {
  const { logout } = useAuthRedux();
  return (
    <Button
      className="flex items-center gap-2"
      onClick={() => {
        logout();
      }}
      variant="contained"
      color="error"
      sx={{ px: 3, py: 1.5, borderRadius: 2, fontWeight: 600 }}
      aria-label="Logout"
    >
      <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-500" />
      Logout
    </Button>
  );
}
