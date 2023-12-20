import { Box, Typography } from "@mui/material";
import React from "react";
import TableWithProviders from "../../Components/Table/Table";

const fakeData = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', state: 'CA' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', state: 'NY' },
  { id: '3', firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', state: 'TX' },
  { id: '4', firstName: 'Alice', lastName: 'Williams', email: 'alice.williams@example.com', state: 'FL' },
  { id: '5', firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com', state: 'GA' },
  { id: '6', firstName: 'Eva', lastName: 'Jones', email: 'eva.jones@example.com', state: 'IL' },
  { id: '7', firstName: 'Frank', lastName: 'Miller', email: 'frank.miller@example.com', state: 'MI' },
  { id: '8', firstName: 'Grace', lastName: 'Taylor', email: 'grace.taylor@example.com', state: 'WA' },
  { id: '9', firstName: 'Henry', lastName: 'Clark', email: 'henry.clark@example.com', state: 'OR' },
];

const AdminDashboard = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "90%", margin: "auto", marginTop: "15px",marginBottom:'10px' }}>
        <Typography variant="h3" color="text.secondary">
          Admin Dashboard
        </Typography>
      </Box>
      <TableWithProviders data={fakeData} />
    </Box>
  );
};

export default AdminDashboard;
