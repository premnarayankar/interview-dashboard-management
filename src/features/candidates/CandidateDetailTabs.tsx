"use client";
// Candidate detail view with tabs for profile, schedule, and feedback.
import React, { useEffect, useState } from "react";
import FeedbackForm from "./FeedbackForm";
import { apiGet } from "@/lib/api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button"; // Added import for MUI Button
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CandidateDetailTabs({ userId }: { userId: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(
    searchParams.get("tab") === "feedback" ? "feedback" : "profile"
  );
  const [profile, setProfile] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [feedbackTab, setFeedbackTab] = useState<"list" | "form">(
    searchParams.get("feedbackTab") === "form" ? "form" : "list"
  );

  useEffect(() => {
    apiGet(`/users/${userId}`).then((res) => setProfile(res.data));
    apiGet("/todos", { userId }).then((res) => setSchedule(res.data.todos));
    apiGet("/posts", { userId }).then((res) => setFeedback(res.data.posts));
  }, [userId]);

  return (
    <div className="h-[90vh] md:h-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-2 xs:p-3 sm:p-6 mt-2 sm:mt-8 mx-auto w-full max-w-[95vw] sm:max-w-[500px]">
      <Button
        type="button"
        variant="outlined"
        sx={{ mb: { xs: 1, sm: 2 }, fontWeight: 600, borderRadius: 2 }}
        onClick={() => router.replace("/candidates")}
        className="w-full sm:w-auto mb-2"
      >
        <span className="text-blue-600">&larr; Back to Dashboard</span>
      </Button>
      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Profile" value="profile" />
        <Tab label="Schedule" value="schedule" />
        <Tab label="Feedback" value="feedback" />
      </Tabs>
      {tab === "profile" && profile && (
        <div
          className="py-4 w-full"
          style={{ minHeight: 300, maxHeight: 350, overflowY: "auto" }}
        >
          <div className="flex flex-col items-center gap-4 py-4 ">
            <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full bg-blue-200 flex items-center justify-center text-2xl xs:text-3xl sm:text-4xl font-bold text-blue-700 shadow-md">
              {profile.firstName?.charAt(0)}
              {profile.lastName?.charAt(0)}
            </div>
            <div className="text-center w-full px-2">
              <div className="font-extrabold text-lg xs:text-xl sm:text-2xl text-blue-900 mb-1 break-words">
                {profile.firstName} {profile.lastName}
              </div>
              <div className="text-gray-500 mb-2 text-xs xs:text-sm break-all">
                {profile.email}
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-2">
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {profile.company?.name || ""}
                </span>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  {profile.role || "Candidate"}
                </span>
              </div>
              <div className="mb-1">
                <span className="font-medium text-gray-700">Resume:</span>{" "}
                <a
                  href="/Prem-Narayankar-Resume.pdf"
                  download
                  className="text-blue-600 underline font-medium"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === "schedule" && (
        <div
          className="py-4 w-full"
          style={{ minHeight: 300, maxHeight: 450, overflowY: "auto" }}
        >
          <ul>
            {schedule.map((todo: any) => (
              <li
                key={todo.id}
                className="flex items-center gap-2 bg-blue-50 rounded-lg px-2 xs:px-3 sm:px-4 py-2 shadow-sm text-blue-800 mb-3 text-xs xs:text-sm sm:text-base"
              >
                <span className="flex-1 break-words">{todo.todo}</span>
                {todo.completed ? (
                  <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-xs font-semibold">
                    Done
                  </span>
                ) : (
                  <span className="text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full text-xs font-semibold">
                    Pending
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === "feedback" && (
        <div
          className="py-4 w-full"
          style={{ minHeight: 300, maxHeight: 450, overflowY: "auto" }}
        >
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-base xs:text-lg sm:text-xl font-bold text-blue-800">
              Feedback
            </span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
              {feedback.length} entries
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
            <Button
              type="button"
              variant={feedbackTab === "list" ? "contained" : "outlined"}
              color="primary"
              sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                fontWeight: 600,
                borderRadius: 2,
                width: { xs: "100%", sm: "auto" },
              }}
              onClick={() => setFeedbackTab("list")}
            >
              Feedback List
            </Button>
            <Button
              type="button"
              variant={feedbackTab === "form" ? "contained" : "outlined"}
              color="primary"
              sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                fontWeight: 600,
                borderRadius: 2,
                width: { xs: "100%", sm: "auto" },
              }}
              onClick={() => setFeedbackTab("form")}
            >
              Add Feedback
            </Button>
          </div>
          {feedbackTab === "list" && (
            <div className="rounded-xl border border-blue-100 bg-white shadow-inner overflow-hidden mb-4">
              <ul>
                {feedback.map((post: any) => (
                  <li
                    key={post.id}
                    className="flex flex-col gap-1 bg-blue-50 hover:bg-blue-100 transition rounded-lg px-2 xs:px-3 sm:px-5 py-2 sm:py-3 shadow-sm mb-2 border-l-4 border-blue-200 mt-3 text-xs xs:text-sm sm:text-base"
                    style={{ marginBottom: 8 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-blue-800 text-sm xs:text-base">
                        {post.title}
                      </span>
                      <span className="text-xs text-gray-400">#{post.id}</span>
                    </div>
                    <span className="text-gray-700 text-xs xs:text-sm leading-snug">
                      {post.body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {feedbackTab === "form" && (
            <div className="mt-2">
              <FeedbackForm userId={userId} feedbackTab={feedbackTab} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
