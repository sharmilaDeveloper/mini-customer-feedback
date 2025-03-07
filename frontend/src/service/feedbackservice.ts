import axios from "axios";

const API_URL = "http://localhost:5000/api/feedback";

export interface Feedback {
  id?: number;
  customerName: string;
  phoneNumber: string;
  rating: number;
  feedbackText: string;
  createdAt?: string;
}

export interface StatsData {
  totalFeedback: number;
  averageRating: number;
  countByRating: Record<string, number>; 
}


export const fetchFeedback = async (): Promise<Feedback[]> => {
  const response = await axios.get<Feedback[]>(API_URL);
  return response.data;
};


export const fetchStats = async (): Promise<StatsData> => {
  const response = await axios.get<StatsData>(`${API_URL}/stats`);
  return response.data;
};


export const submitFeedback = async (feedback: Feedback): Promise<Feedback> => {
  const response = await axios.post<Feedback>(API_URL, feedback);
  return response.data;
};
