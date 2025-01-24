import React from "react";
import { Container, TextField, Button, Typography, Grid, Paper, Link } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";

const ContactUs = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Have questions? We'd love to hear from you!
      </Typography>

      <Grid container spacing={4} sx={{ mt: 3 }}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Send us a message
            </Typography>
            <form>
              <TextField fullWidth label="Your Name" variant="outlined" margin="normal" required />
              <TextField fullWidth label="Email Address" type="email" variant="outlined" margin="normal" required />
              <TextField fullWidth label="Subject" variant="outlined" margin="normal" />
              <TextField fullWidth label="Message" multiline rows={4} variant="outlined" margin="normal" required />
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Details
            </Typography>
            <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOn sx={{ mr: 1 }} /> 123 Main Street, City, Country
            </Typography>
            <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Phone sx={{ mr: 1 }} /> +1 (123) 456-7890
            </Typography>
            <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Email sx={{ mr: 1 }} /> contact@example.com
            </Typography>

            {/* Social Links */}
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="#" sx={{ mr: 2 }}>Facebook</Link>
            <Link href="#" sx={{ mr: 2 }}>Twitter</Link>
            <Link href="#">LinkedIn</Link>
          </Paper>
        </Grid>
      </Grid>

      {/* Google Maps Embed (Optional) */}
      <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Our Location
        </Typography>
        <iframe
          title="Google Maps"
          width="100%"
          height="300"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=New+York"
          allowFullScreen
        />
      </Paper>
    </Container>
  );
};

export default ContactUs;
