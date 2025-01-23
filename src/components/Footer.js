import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: '#3f51b5',
        color: 'white',
        padding: '2rem 0',
        marginTop: '2rem',
        boxShadow: 3,
      }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={4} alignItems="flex-start">
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: '1rem' }}>
              About Us
            </Typography>
            <Typography variant='body2'>
              We provide a City Management System that helps you manage your cities and energy data with ease.
            </Typography>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12} md={4} >
            <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: '1rem' }}>
              Contact Us
            </Typography>
            <Typography variant='body2'>
              Project Maintainer:{' '}
              <Link href='https://github.com/nhpquy' color='inherit'
                    sx={{ textDecoration: 'underline', '&:hover': { color: '#f57c00' } }}>
                Quy Nguyen
              </Link>
            </Typography>
            <Typography variant='body2'>
              Email:{' '}
              <Link href='mailto:nhpquyit@gmail.com' color='inherit'
                    sx={{ textDecoration: 'underline', '&:hover': { color: '#f57c00' } }}>
                nhpquyit@gmail.com
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
