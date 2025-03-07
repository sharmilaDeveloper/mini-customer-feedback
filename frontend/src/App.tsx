import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Dashboard from "./components/Dashboard";
import FeedbackForm from "./components/FeedbackForm";
import "./App.css"

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Router>
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/submit" element={<FeedbackForm />} />
          </Routes>
        </Container>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
