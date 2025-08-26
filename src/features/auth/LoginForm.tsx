// Login form for user authentication.
"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UserRole } from "./authSlice";
import { useAuthRedux } from "./useAuthRedux";
import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { usersCollection } from "@/lib/constants";

interface LoginFormInputs {
  username: string;
  password: string;
  role: UserRole;
}

const roles: { label: string; value: UserRole }[] = [
  { label: "Admin", value: "admin" },
  { label: "TA Member", value: "ta_member" },
  { label: "Panelist", value: "panelist" },
];

export default function LoginForm() {
  const { login, user, loading, error } = useAuthRedux();
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({});

  const onSubmit = async (data: LoginFormInputs) => {
    const res = await login(
      data.username.trim(),
      data.password.trim(),
      data.role
    );
    setLoginError(res === "Fail" && true);
    setTimeout(() => {
      setLoginError(false);
    }, 2000);
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") router.push("/dashboard/admin");
      else if (user.role === "ta_member") router.push("/dashboard/ta");
      else router.push("/dashboard/panelist");
    }
  }, [user, router]);

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-100 mt-8 mb-8 sm:mt-16 sm:mb-16">
      {loginError && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-white/80">
          <div className="bg-white border-2 border-red-400 rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center animate-fade-in">
            <div className="text-lg font-bold text-red-800 mb-1">
              Access Denied
            </div>
            <div className="text-gray-600">
              You don't have access to this role.
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center mb-6">
        <UserCircleIcon className="w-16 h-16 text-primary-500 mb-2" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900 text-center">
          Sign in to Dashboard
        </h2>
        <p className="text-gray-500 text-sm text-center">
          Enter your credentials to access your dashboard.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
        autoComplete="off"
      >
        <TextField
          sx={{ mt: 2 }}
          label="Username"
          placeholder="Enter your username"
          autoComplete="username"
          fullWidth
          size="small"
          error={!!errors.username}
          helperText={errors.username ? "Username required" : ""}
          {...register("username", { required: true })}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          fullWidth
          size="small"
          error={!!errors.password}
          helperText={errors.password ? "Password required" : ""}
          {...register("password", { required: true })}
        />
        <FormControl
          fullWidth
          size="small"
          error={!!errors.role}
          sx={{ mt: 2 }}
        >
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            label="Role"
            defaultValue={roles[0].value}
            {...register("role", { required: true })}
          >
            <MenuItem value="">Select role</MenuItem>
            {roles.map((r) => (
              <MenuItem key={r.value} value={r.value}>
                {r.label}
              </MenuItem>
            ))}
          </Select>
          {errors.role && (
            <span className="text-red-500 text-xs">Role required</span>
          )}
        </FormControl>
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            mt: 2,
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          startIcon={!loading ? <LockClosedIcon className="w-5 h-5" /> : null}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-4 text-xs text-gray-600">
        <div className="font-semibold mb-1 text-gray-800">
          Demo Admin Credentials
        </div>
        <div>
          {usersCollection.map((user) => (
            <div key={user.username} className="font-medium mb-2">
              <div className="flex flex-col sm:flex-row sm:gap-5">
                <span className="w-full sm:w-[40%]">
                  Username: {user.username}
                </span>
                <span className="w-full sm:w-[40%]">Password: {user.pass}</span>
              </div>
              <div className=" border-b-2 border-gray-200">
                <span className="">( {user.role.toLocaleUpperCase()} )</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
