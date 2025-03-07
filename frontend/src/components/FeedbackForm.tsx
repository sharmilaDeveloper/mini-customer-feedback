import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FeedbackFormData {
  customerName: string;
  phoneNumber: string;
  rating: number;
  feedbackText: string;
}

const FeedbackForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>();
 const navigate = useNavigate();
  const onSubmit = async (data: FeedbackFormData) => {
    try {
    
      const trimmedData = {
        ...data,
        customerName: data.customerName.trim(),
        phoneNumber: data.phoneNumber.trim(),
        feedbackText: data.feedbackText.trim(),
      };

      await axios.post("http://localhost:5000/api/feedback", trimmedData);
      alert("Feedback submitted successfully!");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight="bold"  gutterBottom>
              Give a new feedback
            </Typography>
      <div className="heading">
      <Typography variant="h5" gutterBottom>
        Submit Feedback
      </Typography>
    <Button 
            variant="contained" 
            color="primary" 
            sx={{ mb: 2, mt:5 , fontSize: "1rem", px: 3, py: 1, borderRadius: "8px", boxShadow: 2, height: "30px"}} 
            onClick={() => navigate("/")}
          >
           Dashboard
          </Button>
     </div>
      <TextField
        fullWidth
        label="Customer Name"
        {...register("customerName", { required: "Customer name is required", minLength: { value: 3, message: "Minimum 3 characters" } })}
        margin="normal"
        error={!!errors.customerName}
        helperText={errors.customerName?.message}
      />

      {/* Phone Number */}
      <TextField
        fullWidth
        label="Phone Number"
        type="tel"
        {...register("phoneNumber", {
          required: "Phone number is required",
          pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" },
        })}
        margin="normal"
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
      />

      {/* Rating */}
      <TextField
        fullWidth
        label="Rating (1-5)"
        type="number"
        {...register("rating", {
          required: "Rating is required",
          min: { value: 1, message: "Minimum rating is 1" },
          max: { value: 5, message: "Maximum rating is 5" },
        })}
        margin="normal"
        error={!!errors.rating}
        helperText={errors.rating?.message}
      />

      {/* Feedback */}
      <TextField
        fullWidth
        label="Feedback"
        multiline
        rows={4}
        {...register("feedbackText", {
          required: "Feedback is required",
          minLength: { value: 10, message: "Minimum 10 characters" },
        })}
        margin="normal"
        error={!!errors.feedbackText}
        helperText={errors.feedbackText?.message}
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit Feedback
      </Button>
    </Box>
  );
};

export default FeedbackForm;
