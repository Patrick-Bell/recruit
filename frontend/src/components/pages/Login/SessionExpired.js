import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/new-logo.png'; // Ensure you have a logo file in the correct path

const SessionExpired = () => {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/login'); // Redirect to login page
    };

    return (
        <Box 
            sx={{ 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: '#f5f5f5' 
            }}
        >
            <Card sx={{ width: 400, textAlign: 'center', padding: 3, boxShadow: 3 }}>
                <CardContent>
                    <img src={logo} alt="Company Logo" style={{ width: 250, marginBottom: 16 }} />

                    <Typography variant="h5" gutterBottom>
                        Session Expired
                    </Typography>

                    <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
                        Your session has expired due to inactivity. Please log in again to continue.
                    </Typography>

                    <Button variant="contained" color="primary" onClick={handleGoToLogin} fullWidth>
                        Return to Login
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SessionExpired;
