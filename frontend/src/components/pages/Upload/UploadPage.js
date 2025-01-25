import { Box, Typography, Grid, IconButton, Divider, useMediaQuery } from "@mui/material";
import permImg from '../../images/sendcv.jpg';
import UploadCV from '../Home/UploadCV'
import Footer from '../Home/Footer'
import ScrollInView from "../../animation/ScrollInView";
import Underline from "../../animation/Underline";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const UploadPage = () => {
  
  const changePictureOrientation = useMediaQuery("(max-width:800px)");

  const borderAnimation = {
    hidden: { width: "0%" },
    visible: { width: "auto", transition: { duration: 2, ease: "easeInOut" } },
  };

  const handleScroll = () => {
    window.scrollTo({ top: 500, behavior:'smooth'})
  }


  return (
    <>
      {/* Main Section Container with Flexbox */}
      <Box 
        sx={{
          height: '70vh', // Height adjusted for better proportions
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
            <Underline>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, // Responsive font sizes
              lineHeight: 1.2, // Line height for readability
            }}
          >
            Upload Your CV
          </Typography>
          </Underline>
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
        Submit your CV, and we’ll reach out to discuss the market, your career goals, and match you with current or upcoming opportunities.         
        </Typography>
          </ScrollInView>

          <Typography onClick={() => handleScroll()} fontWeight={800} sx={{marginTop:'20px', display:'flex', alignItems:'center', "&:hover": { color:'#408663', cursor:'pointer' }}}>Submit CV <ArrowCircleRightIcon sx={{marginLeft:'5px'}} /></Typography>
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

      <Box id='cv-section' sx={{ padding: { xs: 3, sm: 5 }, backgroundColor: "#f9f9f9" }}>
        <UploadCV/>
      </Box>

        
      <Footer />
     
         

     



    </>
  );
};

export default UploadPage;
