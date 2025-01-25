import React from "react";
import { Box, Typography, Grid, Avatar, Button, Container, Card, CardContent, IconButton } from "@mui/material";
import Logo from "../../images/about-us.jpg";
import Underline from "../../animation/Underline";
import Footer from "./Footer";
import coreValues from "../../api/CoreValues";
import generalRecruitmentSteps from "../../api/GeneralRecruitmentProcess";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ScrollInView from '../../animation/ScrollInView'
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const About = () => {


  return (
    <>
      {/* Hero Section */}
      <Box sx={{ position: 'relative' }}>
        {/* Hero Section - Full Background Image */}
        <Box
          sx={{
            height: '50vh', // Full viewport height
            backgroundImage: `url(${Logo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
          }}
        >
          {/* Optional Overlay for better text visibility */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.6)', // Dark overlay
              zIndex: 1,
            }}
          />

          {/* Hero Content */}
          <Box sx={{ zIndex: 2 }}>
            <ScrollInView direction={'bottom'}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                marginBottom: '20px',
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, // Responsive font sizes
              }}
            >
              About
            </Typography>
            </ScrollInView>
            <ScrollInView direction={'bottom'}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                fontFamily: 'Poppins',
                marginBottom: '30px',
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' }, // Responsive font sizes
              }}
            >
              Connecting Talent with Opportunity
            </Typography>
            </ScrollInView>
          </Box>
        </Box>
        </Box>



      {/* Our Mission */}
      <Box id='mission' sx={{ padding: { xs: 3, sm: 5 } }}>
  <Underline>
    <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: "Poppins", display: "inline-block" }}>
      Our Mission
    </Typography>
  </Underline>
  <Typography sx={{ fontFamily: "Poppins", marginTop: 2, lineHeight: 1.8 }}>
    At <strong>Fiortech Recruitment Group</strong>, we envision a future where talent and opportunity are never limited by location, background, or industry. Our vision is to connect the world’s most talented individuals with organizations that champion innovation, diversity, and growth. We aspire to create a global network of professionals, empowering them with the skills and resources they need to succeed in an ever-evolving job market.
  </Typography>
  <Typography sx={{ fontFamily: "Poppins", marginTop: 2, lineHeight: 1.8 }}>
    We are committed to fostering an inclusive, sustainable workforce that values diversity and strives to create lasting impact both in business and society. By embracing cutting-edge technology and innovative hiring solutions, we aim to deliver unparalleled recruitment services that prioritize long-term success and development.
  </Typography>
  <Typography sx={{ fontFamily: "Poppins", marginTop: 2, lineHeight: 1.8 }}>
    Through our deep industry expertise, we will continue to support businesses in identifying and attracting the best talent while driving professional growth for individuals across all sectors.
  </Typography>
  <Typography sx={{ fontFamily: "Poppins", marginTop: 2, lineHeight: 1.8 }}>
    Together, we are shaping the future of work, one meaningful connection at a time.
  </Typography>
</Box>




      {/* Core Values */}
      <Box id='values' sx={{ padding: { xs: 3, sm: 5 }, backgroundColor: "#f9f9f9" }}>
        <Underline>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontFamily: "Poppins",
              display: "inline-block",
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            Our Values
          </Typography>
        </Underline>
        <Typography sx={{ marginBottom: '20px', fontFamily: 'Poppins', marginTop:1 }}>
          At <strong>Fiortech Recruitment Group</strong>, we take pride in our core values. They are embedded into everything we do and stand for.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
  {coreValues.map((item, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Box 
        sx={{ 
          textAlign: 'center', 
          backgroundColor: '#408663', 
          padding: '20px', 
          borderRadius: '10px', 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Centers content vertically
          alignItems: 'center', // Centers content horizontally
        }}
      >
        <IconButton 
          sx={{ 
            backgroundColor: 'white', 
            color: '#408663', 
            padding: '20px', 
            borderRadius: '50%', 
            "&:hover": { backgroundColor: 'white' } 
          }}
        >
          {item.icon}
        </IconButton>
        <Typography variant="h6" sx={{ marginTop: '20px', fontWeight: 700, color: 'white' }}>
          {item.title}
        </Typography>
        <Typography sx={{ color: 'white' }}>
          {item.description}
        </Typography>
      </Box>
    </Grid>
  ))}
</Grid>

      </Box>

      <Box id='process' sx={{ padding: { xs: 3, sm: 5 }, backgroundColor: "white" }}>
  <Underline>
  <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontFamily: "Poppins",
              width: 'auto', // Ensure width adjusts based on the text content
              display: 'inline-block', // Ensures the text stays on the same line
              fontSize: { xs: '1.5rem', sm: '2rem' }, // Responsive font sizes
            }}
          >
            Our Recruitment Process
          </Typography>
  </Underline>
  <Typography sx={{ fontFamily: "Poppins", marginTop: 2, }}>
    We specialize in delivering tailored recruitment solutions. Our process is designed to identify and secure the most qualified talent for your specific needs. We prioritize efficiency without compromising on quality, ensuring that both our clients and candidates have a seamless experience.
  </Typography>

  <Grid container spacing={4} sx={{ marginTop: 1}}>
    {generalRecruitmentSteps.map((step, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
                <ScrollInView direction={'top'}>
        <Card sx={{ padding: 3, boxShadow: 3, borderRadius: '10px', backgroundColor: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            {/* Optional Icon - Add if you have icons */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#408663',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                marginRight: 2,
              }}
            >
              <Typography>{i + 1}</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: "Poppins", color: "#408663" }}>
              {step.header}
            </Typography>
          </Box>
          <Typography sx={{ fontFamily: "Poppins", color: "#333" }}>
            {step.desc}
          </Typography>
        </Card>
        </ScrollInView>
      </Grid>
    ))}
  </Grid>
</Box>







<Box id='solutions' sx={{ padding: { xs: 3, sm: 5 },  backgroundColor: "#f9f9f9" }}>
<Underline>
<Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontFamily: "Poppins",
              width: 'auto', // Ensure width adjusts based on the text content
              display: 'inline-block', // Ensures the text stays on the same line
              fontSize: { xs: '1.5rem', sm: '2rem' }, // Responsive font sizes
            }}
          >
            Our Solutions
          </Typography>
  </Underline>
      <Typography sx={{ marginTop: 2, fontFamily: "Poppins", color: "#333"}}>
        We offer tailored recruitment services for both permanent and contract roles to meet your business needs. Whether you're looking for long-term professionals or short-term talent for specific projects, we have you covered!
      </Typography>

      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {/* Permanent Recruitment Card */}
        <Grid item xs={12} sm={6} md={4}>
        <ScrollInView direction={'left'}>
          <Card sx={{ padding: 3, backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 3, "&:hover": { borderLeft: "5px solid #408663" }, transition: 'border-left 0.3s ease'}}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#408663" }}>
              Permanent Recruitment
            </Typography>
            <Typography sx={{ marginTop: 2, fontFamily: "Poppins", color: "#333", lineHeight: 1.8 }}>
              We help businesses find long-term professionals who drive growth and stability. Trust us to connect you with the best talent for your permanent staffing needs.
            </Typography>
            <Typography
              component="a"
              href="/permanent-recruitment"
              sx={{
                marginTop: 2,
                display: "inline-flex",
                alignItems: "center",
                color: "#408663",
                fontWeight: 700,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              View Permanent Solutions <ArrowCircleRightIcon sx={{ marginLeft: "5px" }} />
            </Typography>
          </Card>
          </ScrollInView>
        </Grid>

        {/* Contract Recruitment Card */}
        <Grid item xs={12} sm={6} md={4}>
        <ScrollInView direction={'left'}>
        <Card sx={{ padding: 3, backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 3, "&:hover": { borderLeft: "5px solid #408663" }, transition: 'border-left 0.3s ease'}}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#408663" }}>
              Contract Recruitment
            </Typography>
            <Typography sx={{ marginTop: 2, fontFamily: "Poppins", color: "#333", lineHeight: 1.8 }}>
              We provide expert contract talent for short-term projects and business agility. Our flexible solutions ensure you have the right professionals for your project needs.
            </Typography>
            <Typography
              component="a"
              href="/contract-recruitment"
              sx={{
                marginTop: 2,
                display: "inline-flex",
                alignItems: "center",
                color: "#408663",
                fontWeight: 700,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              View Contract Solutions <ArrowCircleRightIcon sx={{ marginLeft: "5px" }} />
            </Typography>
          </Card>
          </ScrollInView>
        </Grid>
      </Grid>
    </Box>


        
  {/* Meet the Founder */}
<Box
  id="founder"
  sx={{
    display: "flex",
    flexWrap: "wrap", // Ensures responsiveness
    alignItems: "stretch",
    justifyContent: "center",
    margin: 2,
    padding: { xs: 2, sm: 5 },
  }}
>
  {/* Left Section - Green Background with "Meet the Founder" */}
  <Box
    sx={{
      width: { xs: "100%", sm: "50%" },
      backgroundColor: "#408663",
      color: "white",
      padding: { xs: "20px", sm: "40px" },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      borderTopLeftRadius: { xs: 8, sm: 8 },
      borderBottomLeftRadius: { xs: 0, sm: 8 },
      borderTopRightRadius: { xs: 8, sm: 0 }, // Rounded top corners for mobile
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        fontFamily: "Poppins",
        marginBottom: 3,
        fontSize: { xs: "1.8rem", sm: "2.2rem" }, // Adjust size for mobile
      }}
    >
      Meet the Founder
    </Typography>
  </Box>

  {/* Right Section - Avatar, Name, Job Title, and Description */}
  <Box
    sx={{
      width: { xs: "100%", sm: "50%" },
      padding: { xs: "30px", sm: "40px" },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      height: "auto", // Allow for natural height
    }}
  >
    <Avatar
      src="https://media.licdn.com/dms/image/v2/C4D03AQEPJ8VWrDALfg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1637824501437?e=1741824000&v=beta&t=E_pGmlZHPiyR2TSp9QVZZC6snerxj5J3SVnNruUU_Ms"
      sx={{
        width: { xs: 150, sm: 200 }, // Adjust size for mobile
        height: { xs: 150, sm: 200 },
        border: "2px solid #408663",
        marginBottom: 2,
        boxShadow: 3,
      }}
    />
    <Typography
      variant="h5"
      sx={{
        fontWeight: 600,
        fontFamily: "Poppins",
        marginBottom: 1,
        fontSize: { xs: "1.5rem", sm: "1.8rem" },
      }}
    >
      Aaron O'Callaghan
    </Typography>
    <Typography
      sx={{
        fontStyle: "italic",
        color: "gray",
        marginBottom: 2,
        fontSize: { xs: "0.9rem", sm: "1rem" },
      }}
    >
      Founder & CEO
    </Typography>
    <Typography
      sx={{
        fontFamily: "Poppins",
        color: "#333",
        lineHeight: 1.8,
        maxWidth: "600px",
        mx: "auto",
        fontSize: { xs: "0.9rem", sm: "1rem" },
        marginTop: 2,
      }}
    >
      With years of experience in the recruitment industry, Aaron has helped
      countless professionals land their dream roles and has built a strong
      network of top-tier companies seeking the best talent.
    </Typography>

    {/* LinkedIn Icon */}
    <Box sx={{ mt: 2 }} component={"a"} target="_blank" href="https://www.linkedin.com/in/aaron-o-callaghan/">
      <LinkedInIcon
        fontSize="large"
        sx={{
          color: "#0077b5",
          cursor: "pointer",
          fontSize: { xs: "2rem", sm: "2.5rem" },
        }}
      />
    </Box>


</Box>
</Box>


      {/* Footer */}
      <Footer />
    </>
  );
};

export default About;
