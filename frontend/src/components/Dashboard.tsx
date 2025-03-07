import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "../service/feedbackservice";
import { Box, CircularProgress, Typography, Card, CardContent, Grid, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import FeedbackTable from "./FeedbackTable";

const Dashboard: React.FC = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["feedbackStats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const [showFeedbackTable, setShowFeedbackTable] = useState(false)

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error" variant="h6">
          Failed to load feedback statistics
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Customer Feedback Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/submit"
        sx={{ mb: 3, fontSize: "1rem", px: 3, py: 1, borderRadius: "8px", boxShadow: 2 }}
      >
        Submit Feedback
      </Button>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ borderRadius: "10px", boxShadow: 3, backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="textSecondary">
                Total Feedback
              </Typography>
              <Typography variant="h3" color="primary">
                {stats?.totalFeedback ?? "N/A"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ borderRadius: "10px", boxShadow: 3, backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="textSecondary">
                Average Rating
              </Typography>
              <Typography variant="h3" color="primary">
                {stats?.averageRating ? stats.averageRating.toFixed(1) : "N/A"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Ratings
      </Typography>

      {stats?.countByRating && Object.keys(stats.countByRating).length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {Object.entries(stats.countByRating).map(([rating, count]) => (
            <Grid item key={rating}>
              <Card sx={{ minWidth: 100, borderRadius: "10px", boxShadow: 3, backgroundColor: "#e3f2fd" }}>
                <CardContent>
                  <Typography variant="h6">{rating} ⭐</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="textSecondary">No feedback available.</Typography>
      )}

<Button 
        variant="contained" 
        color="primary" 
        sx={{ mb: 2, mt:5 , fontSize: "1rem", px: 3, py: 1, borderRadius: "8px", boxShadow: 2 }} 
        onClick={() => setShowFeedbackTable(!showFeedbackTable)}
      >
        {showFeedbackTable ? "Hide Feedbacks" : "View Feedbacks"}
      </Button>

      {showFeedbackTable && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Feedback List
          </Typography>
          <FeedbackTable />
        </>
      )}

    </Box>
  );
};

export default Dashboard;
