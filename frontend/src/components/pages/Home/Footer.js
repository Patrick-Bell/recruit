import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import { Email, LocationOn, Phone } from '@mui/icons-material';
import Logo from '../../images/new-logo-bg.png';
import { informationLinks, quickLinks, solutionLinks } from '../../api/Footer';
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (link) => {
    if (link.includes("#")) {
      const [path, hash] = link.split("#");
  
      if (location.pathname === path) {
        window.scrollTo({ top: 0 });
  
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const offset = 80; // Adjust this based on your navbar height
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
          }
        }, 500);
      } else {
        navigate(path);
  
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const offset = 80; // Adjust for navbar height
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
          }
        }, 600);
      }
    } else {
      window.scrollTo({ top: 0 });
  
      setTimeout(() => {
        navigate(link);
      }, 500);
    }
  };
  

  return (
    <Box
      sx={{
        background: '#408663',
        color: 'white',
        padding: '30px 20px', // Reduced padding for a more compact look
        fontFamily: 'Arial, sans-serif',
        textAlign: 'left',
      }}
    >
      {/* Main Footer Grid */}
      <Grid container spacing={3} sx={{ width: '100%', }}>
        {/* Logo Section */}
        <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
          <img src={Logo} alt="Company Logo" style={{ width: '180px' }} /> {/* Slightly smaller logo */}
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} sm={3}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, marginBottom: 1 }}>Quick Links</Typography>
          <Box>
            {quickLinks.map((link, i) => (
              <Typography 
                key={i}
                onClick={() => handleNavigation(link?.link)}
                sx={{
                  fontSize: '14px',
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  transition: 'margin-left 0.3s ease',
                  "&:hover": { marginLeft: '8px' }
                }}
              >
                {link.name}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Get in Touch */}
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, marginBottom: 1 }}>Get in Touch</Typography>
          <Box>
            {informationLinks.map((link, i) => (
              <Typography 
                key={i}
                onClick={() => handleNavigation(link?.link)}
                sx={{
                  fontSize: '14px',
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  transition: 'margin-left 0.3s ease',
                  "&:hover": { marginLeft: '8px' }
                }}
              >
                {link.name}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Solutions */}
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, marginBottom: 1 }}>Solutions</Typography>
          <Box>
            {solutionLinks.map((link, i) => (
              <Typography 
                key={i}
                onClick={() => handleNavigation(link?.link)}
                sx={{
                  fontSize: '14px',
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  transition: 'margin-left 0.3s ease',
                  "&:hover": { marginLeft: '8px' }
                }}
              >
                {link.name}
              </Typography>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Divider for separation */}
      <Divider sx={{ backgroundColor: 'white', margin: '20px 0' }} />

      {/* Contact Info - Centered Below */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
            <Email sx={{ marginRight: '6px', fontSize: '18px' }} /> A.OCallaghan@fiortechgroup.com
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
            <LocationOn sx={{ marginRight: '6px', fontSize: '18px' }} /> UK, London
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
            <Phone sx={{ marginRight: '6px', fontSize: '18px' }} /> 07826 117721
          </Typography>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
        &copy; 2025 Fiortech Recruitment Group. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
