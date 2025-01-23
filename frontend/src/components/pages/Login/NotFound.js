import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/new-logo.png';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); // Redirect to homepage or login page
    };

    return (
        <Box 
            sx={{ 
                height: '91vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: '#f5f5f5', // Keep original background color
                padding: 2
            }}
        >
            <Card 
                sx={{ 
                    width: 480, 
                    textAlign: 'center', 
                    padding: 4, 
                    borderRadius: 3, 
                    backdropFilter: 'blur(10px)', 
                    background: 'rgba(255, 255, 255, 0.7)', // Keep original light background
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    color: 'black'
                }}
            >
                <CardContent>
                    {/* Logo */}
                    <img src={logo} alt="Company Logo" style={{ width: 100, marginBottom: 16 }} />

                    {/* Error Code */}
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            fontWeight: 'bold', 
                            color: '#408663', // Red color for error
                            mb: 1 
                        }}
                    >
                        404
                    </Typography>

                    <Typography fontFamily={'Poppins'} variant="h5" sx={{ fontWeight: '700', mb: 1 }}>
                        Oops! Page Not Found
                    </Typography>

                    <Typography variant="subtitle1" sx={{ mt:2, mb: 3, opacity: 0.9 }}>
                        The page you're looking for doesn't exist or has been moved.
                    </Typography>

                    {/* Go Home Button */}
                    <Button 
                        variant="contained" 
                        onClick={handleGoHome} 
                        fullWidth
                        sx={{
                            padding: '12px',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            background: '#408663', // Keep original red for button
                            '&:hover': { opacity: '0.9' } // Slightly darker red on hover
                        }}
                    >
                        Go to Homepage
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default NotFound;
