// GuestCard.tsx
import * as React from 'react';
import { Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { QueryResultRow } from "@vercel/postgres";

interface GuestCardProps {
  guest: QueryResultRow;
}

const GuestCard: React.FC<GuestCardProps> = ({ guest }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">{guest.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {guest.id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Email:</strong> {guest.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Confirmed:</strong> {guest.confirmed ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          {guest.notes && (
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Notes:</strong> {guest.notes}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Last Updated:</strong>{' '}
              {guest.rsvpdate instanceof Date
                ? guest.rsvpdate.toLocaleDateString()
                : 'Unconfirmed'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GuestCard;
