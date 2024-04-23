import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const KPI = ({ kpi1, kpi2 }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>KPI 1</Typography>
            <Typography variant="h4">{kpi1}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>KPI 2</Typography>
            <Typography variant="h4">{kpi2}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default KPI;
