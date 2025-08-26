// Feedback form for panelists using react-hook-form and API submission.
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
// import { apiPost } from "@/lib/api";

interface FeedbackInputs {
  score: number;
  strengths: string;
  areas: string;
}

export default function FeedbackForm({
  feedbackTab,
}: {
  userId: number;
  feedbackTab: string;
}) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FeedbackInputs>({ mode: "onChange" });
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    feedbackTab === "form" && user?.role === "panelist"
      ? setShowForm(true)
      : setShowForm(false);
  }, [user?.role, feedbackTab]);

  const onSubmit = async (data: FeedbackInputs) => {
    try {
      // await apiPost(`/posts?userId=${userId}`, data);
      reset();
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (e) {
      // Optionally handle error
    }
  };

  return showForm ? (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-blue-400 rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center animate-fade-in">
            <div className="text-lg font-bold text-blue-800 mb-1">
              Feedback Submitted!
            </div>
            <div className="text-gray-600">Thank you for your feedback.</div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 max-w-xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col gap-4 animate-fade-in"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg text-blue-800">
            Submit Feedback
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <TextField
              label={
                <span className="flex items-center gap-1">Overall Score</span>
              }
              type="number"
              inputProps={{ min: 1, max: 5 }}
              fullWidth
              size="small"
              placeholder="1-5"
              error={!!errors.score}
              helperText={errors.score ? "Score is required (1-5)" : ""}
              {...register("score", {
                required: true,
                min: 1,
                max: 5,
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="flex-1">
            <TextField
              label={<span className="flex items-center gap-1">Strengths</span>}
              type="text"
              fullWidth
              size="small"
              placeholder="e.g. Communication, Problem Solving"
              error={!!errors.strengths}
              helperText={errors.strengths ? "Strengths required" : ""}
              {...register("strengths", { required: true })}
            />
          </div>
        </div>
        <div>
          <TextField
            label={
              <span className="flex items-center gap-1">
                Areas for Improvement
              </span>
            }
            type="text"
            fullWidth
            size="small"
            placeholder="e.g. Time Management, Technical Skills"
            error={!!errors.areas}
            helperText={errors.areas ? "Areas required" : ""}
            {...register("areas", { required: true })}
          />
        </div>
        <div className="flex gap-3 mt-4 justify-end">
          <Button
            type="button"
            variant="outlined"
            onClick={() => router.back()}
            sx={{ px: 3, py: 1.5, borderRadius: 2, fontWeight: 600 }}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid || isSubmitting}
            sx={{ px: 3, py: 1.5, borderRadius: 2, fontWeight: 600 }}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </div>
      </form>
    </>
  ) : (
    <div className="text-gray-500 h-[200px] flex justify-center items-center">
      <h1 className="text-lg sm:text-2xl text-center">
        ONLY PANELIST CAN ACCESS THIS FORM
      </h1>
    </div>
  );
}
