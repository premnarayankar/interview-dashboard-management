// Main dashboard view with KPIs and filters.
"use client";
import React, { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  StarIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setKPI, setLoading, setError } from "./dashboardSlice";
import { fetchTodos, fetchPosts } from "./dashboardAPI";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useDebounce } from "@/hooks/useDebounce";

export default function DashboardView() {
  const dispatch = useDispatch();
  const { kpi, loading } = useSelector((state: RootState) => state.dashboard);
  const [role, setRole] = useState<string>("");
  const [interviewer, setInterviewer] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("");

  const debouncedRole = useDebounce(role, 400);
  const debouncedInterviewer = useDebounce(interviewer, 400);
  const debouncedDateRange = useDebounce(dateRange, 400);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const [todosRes, feedbackRes] = await Promise.all([
          fetchTodos({ limit: 100 }),
          fetchPosts({ limit: 100 }),
        ]);
        const interviews = todosRes.data.todos.filter(
          (t: any) => !t.completed
        ).length;
        const feedbacks = feedbackRes.data.posts;
        const avgFeedback = feedbacks.length
          ? (
              feedbacks.reduce(
                (sum: number, f: any) => sum + ((f.id % 5) + 1),
                0
              ) / feedbacks.length
            ).toFixed(2)
          : 0;
        const noShows = todosRes.data.todos.filter(
          (t: any) => !t.completed && t.id % 7 === 0
        ).length;
        if (!ignore) {
          dispatch(
            setKPI({ interviews, avgFeedback: Number(avgFeedback), noShows })
          );
        }
      } catch (err: any) {
        if (!ignore) {
          dispatch(
            setError(err.response?.data?.message || "Failed to fetch KPIs")
          );
        }
      } finally {
        if (!ignore) dispatch(setLoading(false));
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [dispatch, debouncedRole, debouncedInterviewer, debouncedDateRange]);

  return (
    <main className="p-2 sm:p-4 md:p-6 bg-white rounded-xl border border-blue-100 shadow-sm w-full max-w-5xl mx-auto">
      <div className="py-2 px-1 sm:py-4 sm:px-4 md:px-8">
        <section>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 md:gap-6 mb-6 w-full">
            <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="ta_member">TA Member</MenuItem>
                <MenuItem value="panelist">Panelist</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Interviewer"
              placeholder="Interviewer"
              value={interviewer}
              onChange={(e) => setInterviewer(e.target.value)}
              size="small"
              sx={{ minWidth: 100, flex: 1 }}
            />
            <TextField
              label="Date"
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 100, flex: 1 }}
            />
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 flex flex-col items-center min-w-[140px]">
              <CalendarDaysIcon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-sm sm:text-base md:text-lg text-blue-900 text-center">
                Interviews This Week
              </h3>
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-800 mt-2">
                {loading ? "--" : kpi.interviews}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-300 rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 flex flex-col items-center min-w-[140px]">
              <StarIcon className="w-7 h-7 sm:w-8 sm:h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-sm sm:text-base md:text-lg text-green-900 text-center">
                Avg. Feedback Score
              </h3>
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-800 mt-2">
                {loading ? "--" : kpi.avgFeedback}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-red-300 rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 flex flex-col items-center min-w-[140px]">
              <XCircleIcon className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 mb-2" />
              <h3 className="font-semibold text-sm sm:text-base md:text-lg text-red-900 text-center">
                No-Shows
              </h3>
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-800 mt-2">
                {loading ? "--" : kpi.noShows}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
