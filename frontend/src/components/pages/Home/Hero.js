import { Box, Typography, Button,  } from "@mui/material"
import ScrollInView from "../../animation/ScrollInView"
import Logo from '../../images/test.jpg'


const Hero = () => {

    return (

        <>

    <Box sx={{ position: 'relative' }}>
        {/* Hero Section - Full Background Image */}
        <Box
          sx={{
            height: 'calc(100vh - 50px)', // Full viewport height
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
              background: 'rgba(0, 0, 0, 0.4)', // Dark overlay
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
              Welcome to Fiortech Recruitment Group
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
            <ScrollInView direction={'top'}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#408663',
                ':hover': { backgroundColor: '#306F53' },
                color: '#fff',
                textTransform: 'none',
                padding: '10px 20px',
                fontSize: { xs: '14px', sm: '16px' }, // Responsive font sizes for the button
              }}
            >
              Get Started
            </Button>
            </ScrollInView>
          </Box>
        </Box>
        </Box>
        
        </>
    )
}


export default Hero