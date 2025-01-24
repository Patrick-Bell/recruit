import { Box, Typography, Button, Grid, Card , CardContent } from "@mui/material";
import Logo from '../../images/test.jpg'
import Footer from './Footer'
import UploadCV from "./UploadCV";
import Contact from "./Contact";
import LatestRoles from "./LatestRoles";
import ScrollInView from "../../animation/ScrollInView";
import Underline from '../../animation/Underline'
import Specialisms from "./Specialisms";
import Hero from "./Hero";
 



const Home = () => {



  return (
    <Box sx={{overflow:'hidden'}}>


      {/* Hero Section */}
      <Hero />

      <Box id='about-us' sx={{ padding: { xs: 3, sm: 5 }, backgroundColor: "#f5f5f5" }}>
   

      {/* Grid Layout for Content */}
      <Grid container spacing={4}>
        {/* Left Column (Image or Media) */}

        {/* Right Column (Text) */}
        <Grid item xs={12} sm={8}>
          <ScrollInView direction={'bottom'}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontFamily: "Poppins",
              color: "#333",
              marginBottom: "20px",
              scrollMarginTop:'80px'
            }}
          >
            Fiortech Recruitment Group is a dynamic and innovative recruitment firm committed to reshaping the way businesses and professionals connect.
          </Typography>
          </ScrollInView>
          <ScrollInView direction={'bottom'}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              color: "#555",
              textAlign: "justify",
            }}
          >
            Our mission is to empower companies with the talent they need to thrive while helping individuals unlock their full career potential. By leveraging a personalized approach and modern recruitment strategies, we aim to make hiring seamless, efficient, and impactful. Whether you're an employer seeking exceptional candidates or a professional in search of the next step in your career, Fiortech is here to bridge the gap.
            <br />
            <br />
            At Fiortech, we pride ourselves on understanding the unique challenges faced by businesses and job seekers in today’s ever-evolving job market. We go beyond traditional recruitment by focusing on building meaningful relationships, deeply understanding the needs of our clients, and delivering tailored solutions.
          </Typography>
          </ScrollInView>
          <ScrollInView direction={'left'}>
          <Button
            href="/about"
            variant="contained"
            sx={{
              marginTop: "20px",
              backgroundColor: "#408663",
              ":hover": { backgroundColor: "#306F53" },
              color: "#fff",
              textTransform: "none",
              fontFamily:'Poppins'
            }}
          >
            Learn More
          </Button>
          </ScrollInView>
        </Grid>


        <Grid item xs={12} sm={4}>
        <ScrollInView direction={'right'}>
          <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundImage: 'url("https://media.licdn.com/dms/image/v2/C4D03AQEPJ8VWrDALfg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1637824501437?e=1741824000&v=beta&t=E_pGmlZHPiyR2TSp9QVZZC6snerxj5J3SVnNruUU_Ms")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                boxShadow: 3,
                height: "500px", // Adjust as needed   height:'100px'
            }}
          />
          </ScrollInView>
        </Grid>
      </Grid>
    </Box>



<Specialisms />
<LatestRoles/>



<Box sx={{ padding: { xs: 3, sm: 5 }, backgroundColor: "#f9f9f9" , overflow:'hidden'}}>
      {/* Header */}
   <Underline>
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        fontFamily: "Poppins",
        width: '100%', // Ensure width adjusts based on the text content
        display: 'inline-block', // Ensures the text stays on the same line
      }}
    >
      Contact Us
    </Typography>
    </Underline>
      <Grid container spacing={2}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Contact />
        </Grid>
          <Grid item xs={12} md={6}>
        <UploadCV/>
        </Grid>
      </Grid>

    
    </Box>

    <Footer />

    

    </Box>
  );
};

export default Home;
