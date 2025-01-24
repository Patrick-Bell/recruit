import { Box, Typography, Grid, IconButton, Divider, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import permImg from '../../images/contract-bg.jpg';
import ContractTimeline from '../Contract/ContractTimeline'
import whatToExpect from '../../api/WhatToExpect'
import UploadCV from '../Home/UploadCV'
import Contact from "../Home/Contact";
import Footer from '../Home/Footer'
import ScrollInView from "../../animation/ScrollInView";
import Underline from "../../animation/Underline";
import contractExpect from "../../api/contractWhatExpect";


const ContractRecruit = () => {
  
  const changePictureOrientation = useMediaQuery("(max-width:800px)");

  const borderAnimation = {
    hidden: { width: "0%" },
    visible: { width: "auto", transition: { duration: 2, ease: "easeInOut" } },
  };


  return (
    <Box sx={{overflow:'hidden'}}>
      {/* Main Section Container with Flexbox */}
      <Box 
        sx={{
          height: '75vh', // Height adjusted for better proportions
          display: changePictureOrientation ? 'block' : 'flex',
          justifyContent: 'space-between', // Space between text and image
          alignItems: 'center', // Vertically centers content
          padding: { xs: 2, sm: 4 }, // Responsive padding for better spacing
          margin: 0, // Remove margin around container
          backgroundColor: '#f5f5f5', // Light background to make text stand out
        }}
      >
        {/* Text Section */}
        <Box 
          sx={{
            flex: 1, 
            color: '#333', // Darker color for the text for better contrast
            textAlign: 'left', 
            zIndex: 1, // Ensure text is above the image
            padding: { xs: '20px', sm: '40px' }, // Add padding for responsiveness
          }}
        >
          <ScrollInView direction={'bottom'}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, // Responsive font sizes
              lineHeight: 1.2, // Line height for readability
              flexWrap:'wrap'
            }}
          >
            Contract Recruitment Solutions
          </Typography>
          </ScrollInView>
          <ScrollInView direction={'top'}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              marginTop: '20px',
              lineHeight: '1.6',
              maxWidth: '600px', // Constrained width for text for better readability
            }}
          >
            We specialize in connecting permanent talent with innovative companies across various industries. 
            Our recruitment solutions ensure that every placement is a long-term success.
          </Typography>
          </ScrollInView>
        </Box>

        {/* Image Section */}
        <Box
          sx={{
            flex: 1, 
            backgroundImage: `url(${permImg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '100%', // Ensure image fills the full height of the container
            width: '100%', // Ensure image fills the width of the container
            borderRadius: '10px', // Add rounded corners for a polished effect
            boxShadow: 3, // Subtle shadow to give depth and separation
            zIndex: 0, // Ensure image is behind the text
          }}
        />
      </Box>

      {/* Optional: Add more content below */}
      <Box sx={{ padding: { xs: 3, sm: 5 }, backgroundColor: "#f9f9f9" }}>
        {/* Header */}
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
            What can you expect?
          </Typography>
          </Underline>

        <Typography sx={{ marginBottom: '30px' }}>
        Hiring contract talent presents unique challenges, including tight deadlines, fluctuating workloads, and the need for specialized skills on short notice. Managing short-term hires efficiently while ensuring quality and compliance can be complex. By partnering with us, you will achieve...</Typography>

        {/* Benefits Grid */}
        <Grid container spacing={0} justifyContent="center" backgroundColor='#408663' width='100%' margin='auto auto'>
    {contractExpect.map((item, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Box sx={{ textAlign: 'center', backgroundColor: '#408663', padding: '20px', borderRadius: '10px' }}>
          <IconButton sx={{ backgroundColor: 'white', color: '#408663', padding: '20px', borderRadius: '50%', "&:hover": { backgroundColor: 'white' } }}>
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



        

      <Box sx={{ padding: { xs: 3, sm: 5 }, backgroundColor: "#f9f9f9" }}>
        {/* Header */}
        <motion.div
          variants={borderAnimation}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          style={{
            display: 'inline-block',
            borderBottom: '5px solid #408663',
            marginBottom: '30px',
            whiteSpace: 'nowrap', // Ensures the text stays on one line
          }}
        >
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
        </motion.div>

        <Typography sx={{ marginBottom: '30px' }}>
        We have a streamlined contract recruitment process designed for efficiency, flexibility, and speed. Our approach ensures clear communication, regular progress updates, and a seamless experience for both clients and candidates. From sourcing highly skilled professionals to managing contracts and compliance, we handle every step to keep your business agile and fully resourced. The process includes:
        </Typography>
  

                <ContractTimeline />

              <Box sx={{margin: '20px 0', textAlign:'center',}}>
                <Typography fontWeight={600} variant="subtitle1">Contact us now if you have any upcoming recruitment needs. Likewise, feel free to reach out for an informal conversation about current market trends and how partnering with
                  <Typography component={'span'} fontWeight={800} sx={{color:'green'}}> Fiortech</Typography> can benefit your business.
                </Typography>
                </Box>


        <motion.div
    variants={borderAnimation}
    initial="hidden"
    whileInView="visible"
    exit="hidden"
    style={{
      display: 'inline-block',
      borderBottom: '5px solid #408663',
      marginBottom: '30px',
      whiteSpace: 'nowrap', // Ensures the text stays on one line
    }}
  >
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
  </motion.div>

                <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Contact />
        </Grid>
          <Grid item xs={12} md={6}>
        <UploadCV/>
        </Grid>
      </Grid>
      
            </Box>
            <Footer/>



    </Box>
  );
};

export default ContractRecruit;
