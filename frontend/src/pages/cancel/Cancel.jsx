import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import Navbar from '../../components/navbar/NavbarComponent';
import { Link as RouterLink } from "react-router-dom";

const Cancel = () => {
  const [bookingId, setBookingId] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Booking ID:', bookingId);
    console.log('Email:', email);

    // Add logic to handle cancellation here
  };

  return (
    <>
      <Navbar />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: 'background.default',
        }}
      >
        <Box
          sx={{
            p: 4,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '300px',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >            
          <Typography variant="h4">
            Cancel Flight
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="bookingId"
              label="Booking ID"
              name="bookingId"
              autoFocus
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              sx={{ marginBottom: 0 }} 
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': { bgcolor: 'black', opacity: 0.8 },
                mb: 2,
                mt: 1
              }}
            >
              Cancel Booking
            </Button>
            <Button
                component={RouterLink}
                to="/"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "gray",
                  color: "white",
                  "&:hover": { bgcolor: "black", opacity: 0.9 },
                }}
              >
                Back
              </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Cancel;
