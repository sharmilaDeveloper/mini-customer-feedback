import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFeedback, Feedback } from "../service/feedbackservice";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress 
} from "@mui/material";

const FeedbackTable: React.FC = () => {
  const { data: feedbackList, isLoading, error } = useQuery({
    queryKey: ["feedbackList"],
    queryFn: fetchFeedback,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load feedback</Typography>;

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Customer</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rating</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Feedback</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbackList?.map((feedback: Feedback) => (
            <TableRow key={feedback.id}>
              <TableCell>{feedback.customerName}</TableCell>
              <TableCell>{feedback.phoneNumber}</TableCell>
              <TableCell>{feedback.rating} ⭐</TableCell>
              <TableCell>{feedback.feedbackText}</TableCell>
              <TableCell>{new Date(feedback.createdAt!).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeedbackTable;
