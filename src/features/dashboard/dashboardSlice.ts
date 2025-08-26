// Redux slice for dashboard state and actions.
import { createSlice } from "@reduxjs/toolkit";

interface KPIData {
  interviews: number;
  avgFeedback: number;
  noShows: number;
}

interface DashboardState {
  kpi: KPIData;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  kpi: { interviews: 0, avgFeedback: 0, noShows: 0 },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setKPI(state, action) {
      state.kpi = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setKPI, setLoading, setError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
