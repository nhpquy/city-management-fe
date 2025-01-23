import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  // Animation styles for subtle drop-down effect
  const animationStyle = {
    animation: 'dropDown 0.8s ease forwards',
    opacity: 0,
    '@keyframes dropDown': {
      '0%': { transform: 'translateY(-20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '2rem 0' }}>
      {/* Main Content Container */}
      <Container maxWidth="lg">
        {/* Welcome Box */}
        <Box
          sx={{
            ...animationStyle,
            textAlign: 'center',
            marginBottom: '3rem',
            padding: '2rem',
            backgroundColor: '#3f51b5',
            color: 'white',
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              marginBottom: '1rem',
              fontSize: isSmallScreen ? '2rem' : 'clamp(2rem, 5vw, 3rem)',
            }}
          >
            Welcome to City Management System
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: '2rem',
              fontSize: isSmallScreen ? '1rem' : 'clamp(1rem, 3vw, 1.5rem)',
            }}
          >
            A centralized solution for managing all your city data efficiently.
          </Typography>
          <Button
            component={Link}
            to="/dashboard"
            variant="contained"
            sx={{
              backgroundColor: '#ff9800',
              color: 'white',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#e68900',
              },
            }}
          >
            Go to Dashboard
          </Button>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ marginTop: '2rem' }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: '1rem', color: '#3f51b5' }}>
                  Manage City
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                  Easily manage your city records, track details, and maintain an up-to-date roster.
                </Typography>
                <Button
                  component={Link}
                  to="/cities"
                  variant="contained"
                  sx={{
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#333f91',
                    },
                  }}
                >
                  View City Data
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: '1rem', color: '#3f51b5' }}>
                  Monitor Electricity
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                  Provides a comprehensive overview of electricity consumption and outage data across different city.
                </Typography>
                <Button
                  component={Link}
                  to="/electricity-list"
                  variant="contained"
                  sx={{
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#333f91',
                    },
                  }}
                >
                  View Electricity Data
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: '1rem', color: '#3f51b5' }}>
                  Analyze Growth
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                  Use our comprehensive dashboard to analyze city growth and organizational structure.
                </Typography>
                <Button
                  component={Link}
                  to="/dashboard"
                  variant="contained"
                  sx={{
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#333f91',
                    },
                  }}
                >
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            ...animationStyle,
            marginTop: '4rem',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 600, color: '#3f51b5' }}>
            Learn More
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '800px', margin: '0 auto' }}>
            Visit our documentation to learn more about the features, functionalities, and how to get started with our City Management System.
          </Typography>
          <Button
            target="_blank"
            variant="contained"
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              marginTop: '1rem',
              '&:hover': {
                backgroundColor: '#333f91',
              },
            }}
          >
            Documentation
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
