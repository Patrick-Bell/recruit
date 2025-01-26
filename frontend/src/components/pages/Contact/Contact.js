import React from "react";
import { Container, TextField, Button, Typography, Grid, Paper, Box, Link } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import Contact from "../Home/Contact";
import ScrollInView from "../../animation/ScrollInView";
import Logo from '../../images/questions.jpg';
import Footer from "../Home/Footer";

const ContactUs = () => {
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {/* Hero Section */}
        <Box
          sx={{
            height: '40vh',
            backgroundImage: `url(${Logo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            padding: '0 20px',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.6)',
              zIndex: 1,
            }}
          />
          <Box sx={{ zIndex: 2 }}>
            <ScrollInView direction="bottom">
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Poppins',
                  marginBottom: '20px',
                  fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                }}
              >
                Contact Us
              </Typography>
            </ScrollInView>
            <ScrollInView direction="bottom">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  fontFamily: 'Poppins',
                  marginBottom: '30px',
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' },
                }}
              >
                Have questions? We’d love to hear from you!
              </Typography>
            </ScrollInView>
          </Box>
        </Box>
      </Box>

      <Container sx={{ mt: 5, mb:5 }}>
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
              <Contact /> {/* Your contact form */}
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: "Poppins", display: "inline-block", fontSize: { xs: '1.5rem', sm: '2rem' }, }}>
              Contact Us
            </Typography>
              <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocationOn sx={{ mr: 1 }} /> UK, London
              </Typography>
              <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Phone sx={{ mr: 1 }} /> 07826 117721
              </Typography>
              <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Email sx={{ mr: 1 }} /> A.OCallaghan@fiortechgroup.com
              </Typography>

              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontFamily: "Poppins", marginBottom: "5px", marginTop:'20px' }}
            >
                Follow Us
            </Typography>
              <Box>
                <Link href="https://www.linkedin.com/company/fiortechrecruitmentgroup/" target='_blank'>LinkedIn</Link>
              </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default ContactUs;
