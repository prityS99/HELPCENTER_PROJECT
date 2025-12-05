import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const therapyData = [
  { name: 'CBT', sessions: 120 },
  { name: 'Trauma Therapy', sessions: 80 },
  { name: 'Marital Therapy', sessions: 60 },
  { name: 'Stress Mgmt', sessions: 100 },
];

const Dashboard: React.FC = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Psychological Help Centre Overview
      </Typography>
      <Typography variant="body1" paragraph>
        Our centre is dedicated to empowering mental wellness through compassionate care. We offer personalised therapies including cognitive behavioural therapy, trauma-informed therapy, marital therapy, and stress management. Our expert psychologists support individuals of all ages for emotional, relational, and psychological well-being through both online and face-to-face sessions.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 4, height: 350 }}>
        <Typography variant="h6" gutterBottom>
          Therapy Sessions Distribution
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={therapyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sessions" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard;
