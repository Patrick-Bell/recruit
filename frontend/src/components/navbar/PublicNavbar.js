import { useState, useEffect } from 'react';
import { Box, Button, Typography, Drawer, IconButton } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate, useLocation } from "react-router-dom";


const PublicNavbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (link) => {
    if (link.includes("#")) {
      const [path, hash] = link.split("#");
  
      // Close both desktop and mobile menus before navigating
      handleMenuClose();
      setMobileMenuOpen(false);
      setOpenMobileMenu(null);
  
      setTimeout(() => {
        if (location.pathname === path) {
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              const offset = 60; // Adjust based on navbar height
              const elementPosition = element.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
            }
          }, 300);
        } else {
          navigate(path);
  
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              const offset = 60;
              const elementPosition = element.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
            }
          }, 600);
        }
      }, 200); // Small delay ensures menu closes before navigation
    } else {
      // Ensure mobile and desktop menus are closed
      handleMenuClose();
      setMobileMenuOpen(false);
      setOpenMobileMenu(null);
  
      setTimeout(() => {
        window.scrollTo({ top: 0 });
        navigate(link);
      }, 300);
    }
  };
  
  
  


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuOpen = (menu) => {
    setOpenMenu(menu);
  };

  const handleMenuClose = () => {
    setOpenMenu(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuOpen = (menu) => {
    setOpenMobileMenu(openMobileMenu === menu ? null : menu)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 20px',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
          boxShadow: isScrolled ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'transparent',
          transition: 'background 0.3s ease, box-shadow 0.3s ease, margin 0.5s ease',
          position: 'sticky',
          top: isScrolled ? 10 : 0,
          zIndex: 1000,
          margin: isScrolled ? '0 15px' : '0',
          borderRadius: isScrolled ? '10px' : '0',
          background: isScrolled ? 'rgba(255, 255, 255, 0.8)' : '#fff',
        }}
      >
        {/* Logo */}
        <Box sx={{}}>
          <Typography component={'a'} href='/' fontFamily={'Poppins'} fontWeight={800} sx={{textDecoration:'none', color:'black'}}>
            Fiortech
          </Typography>
        </Box>

        {/* Navigation for Desktop */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Box
            sx={{ position: 'relative' }}
            onMouseEnter={() => handleMenuOpen('dashboard')}
            onMouseLeave={handleMenuClose}
          >
            <Button
              sx={{
                textTransform: 'none',
                color: '#333',
                fontWeight: 500,
                ':hover': { color: '#408663' },
              }}
            >
              Candidates{' '}
              <ArrowDropUpIcon
                sx={{
                  transform: openMenu === 'dashboard' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Button>
            {openMenu === 'dashboard' && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: '#fff',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px',
                  zIndex: 10,
                  minWidth: '150px',
                  padding: '8px 0',
                }}
              >
                <Typography
                  sx={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    ':hover': { backgroundColor: '#f0f0f0' },
                  }}
                  onClick={() => {handleNavigation('/jobs')}}
                >
                  View Jobs
                </Typography>
                <Typography
                  sx={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    ':hover': { backgroundColor: '#f0f0f0' },
                  }}
                  onClick={() => {handleNavigation('/#specialisms')}}
                >
                  Our Specialisms
                </Typography>
                <Typography
                  sx={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    ':hover': { backgroundColor: '#f0f0f0' },
                  }}
                  onClick={() => {handleNavigation('/upload-cv')}}
                >
                  Upload CV
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{ position: 'relative' }}
            onMouseEnter={() => handleMenuOpen('solutions')}
            onMouseLeave={handleMenuClose}
          >
            <Button
              sx={{
                textTransform: 'none',
                color: '#333',
                fontWeight: 500,
                ':hover': { color: '#408663' },
              }}
            >
              Clients{' '}
              <ArrowDropUpIcon
                sx={{
                  transform: openMenu === 'solutions' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Button>
            {openMenu === 'solutions' && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: '#fff',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px',
                  zIndex: 10,
                  minWidth: '150px',
                  padding: '8px 0',
                }}
              >
                <Typography
                  sx={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    ':hover': { backgroundColor: '#f0f0f0' },
                  }}
                  onClick={() => {handleNavigation('/permanent-recruitment')}}
                >
                  Permanent Solutions
                </Typography>
                <Typography
                  sx={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    ':hover': { backgroundColor: '#f0f0f0' },
                  }}
                  onClick={() => handleNavigation('/contract-recruitment')}
                >
                  Contract Solutions
                </Typography>
                <Typography
                  sx={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    ':hover': { backgroundColor: '#f0f0f0' },
                  }}
                  onClick={() => {handleNavigation('/about#process')}}
                >
                  Our Processes
                </Typography>
                <Typography
                  sx={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    ':hover': { backgroundColor: '#f0f0f0' },
                  }}
                  onClick={() => {handleNavigation('/about#founder')}}
                >
                  Meet The Team
                </Typography>
              </Box>
            )}
          </Box>

          <Button onClick={() => handleNavigation('/#contact')} variant="outlined">
            Contact
          </Button>
        </Box>

        {/* Hamburger Icon for Mobile */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={handleMobileMenuToggle}
        >
          <MenuIcon />
        </IconButton>
      </Box>











      <Drawer
  anchor="right"
  open={mobileMenuOpen}
  onClose={handleMobileMenuToggle}
  sx={{
    '& .MuiDrawer-paper': {
      width: '250px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      height: '95%', // Ensures full height for proper alignment
    },
  }}
>
  <Box>
    <Button
      sx={{
        textTransform: 'none',
        color: '#333',
        fontWeight: 500,
        textAlign: 'left',
        ':hover': { color: '#408663' },
      }}
      fullWidth
      onClick={() => handleMobileMenuOpen('dashboard')}
    >
      Candidates
      <ArrowDropUpIcon sx={{ transform: openMobileMenu === 'dashboard' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
    </Button>
    {openMobileMenu === 'dashboard' && (
      <Box>
        <Box onClick={() => handleNavigation('/jobs')} sx={{ display: 'flex', alignItems: 'center', padding: '8px', marginLeft: '10px', "&:hover": { color: 'green', cursor: 'pointer' } }}> <ArrowRightIcon fontSize='14px' /> <Typography fontSize={'14px'}>View Jobs</Typography></Box>
        <Box onClick={() => handleNavigation('/#specialisms')} sx={{ display: 'flex', alignItems: 'center', padding: '8px', marginLeft: '10px', "&:hover": { color: 'green', cursor: 'pointer' } }}> <ArrowRightIcon fontSize='14px' /> <Typography fontSize={'14px'}>Our Specialisms</Typography></Box>
        <Box onClick={() => handleNavigation('/upload-cv')} sx={{ display: 'flex', alignItems: 'center', padding: '8px', marginLeft: '10px', "&:hover": { color: 'green', cursor: 'pointer' } }}> <ArrowRightIcon fontSize='14px' /> <Typography fontSize={'14px'}>Upload CV</Typography></Box>
      </Box>
    )}

    <Button
      fullWidth
      sx={{
        textTransform: 'none',
        color: '#333',
        fontWeight: 500,
        ':hover': { color: '#408663' },
      }}
      onClick={() => handleMobileMenuOpen('solution')}
    >
      Clients
      <ArrowDropUpIcon sx={{ transform: openMobileMenu === 'solution' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
    </Button>
    {openMobileMenu === 'solution' && (
      <Box>
        <Box onClick={() => handleNavigation('/permanent-recruitment')} sx={{ display: 'flex', alignItems: 'center', padding: '8px', marginLeft: '10px', "&:hover": { color: 'green', cursor: 'pointer' } }}> <ArrowRightIcon fontSize='14px' /> <Typography fontSize={'14px'}>Permanent Solutions</Typography></Box>
        <Box onClick={() => handleNavigation('/contract-recruitment')} sx={{ display: 'flex', alignItems: 'center', padding: '8px', marginLeft: '10px', "&:hover": { color: 'green', cursor: 'pointer' } }}> <ArrowRightIcon fontSize='14px' /> <Typography fontSize={'14px'}>Contract Solutions</Typography></Box>
        <Box onClick={() => handleNavigation('/about#process')} sx={{ display: 'flex', alignItems: 'center', padding: '8px', marginLeft: '10px', "&:hover": { color: 'green', cursor: 'pointer' } }}> <ArrowRightIcon fontSize='14px' /> <Typography fontSize={'14px'}>Our Process</Typography></Box>
        <Box onClick={() => handleNavigation('/about#founder')} sx={{ display: 'flex', alignItems: 'center', padding: '8px', marginLeft: '10px', "&:hover": { color: 'green', cursor: 'pointer' } }}> <ArrowRightIcon fontSize='14px' /> <Typography fontSize={'14px'}>Meet the Team</Typography></Box>
      </Box>
    )}
  </Box>

  {/* Bottom Section for Contact & Upload CV Buttons */}
  <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Button
      fullWidth
      sx={{
        textTransform: 'none',
        color: '#333',
        fontWeight: 500,
        ':hover': { color: '#408663' },
      }}
      onClick={() => {handleNavigation('/#contact')}}
    >
      Contact
    </Button>
    <Button
      fullWidth
      sx={{
        backgroundColor: '#408663',
        ':hover': { backgroundColor: '#306F53' },
        color: '#fff',
      }}
    >
      Upload CV
    </Button>
  </Box>
</Drawer>

    </>
  );
};

export default PublicNavbar;
