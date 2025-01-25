import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { findOneJob } from "../../routes/JobsRoutes";
import { findOneApplicant } from "../../routes/ApplicantRoutes";
import {
    Container,
    Typography,
    Paper,
    CircularProgress,
    Box,
    Divider,
    Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import ConfettiExplosion from "react-confetti-explosion";
import NotFound from "../Login/NotFound";

const JobConfirmation = () => {
    const [job, setJob] = useState(null);
    const [applicant, setApplicant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false); // State to trigger confetti
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const applicantId = queryParams.get("applicant_id");
    const jobId = queryParams.get("job_id");

    useEffect(() => {
        const storedApplicant = sessionStorage.getItem("applicantData");
        const storedJobId = sessionStorage.getItem("jobId");

        if (storedApplicant && storedJobId) {
            const applicantData = JSON.parse(storedApplicant);

            setApplicant(applicantData);

            const fetchJob = async () => {
                try {
                    const jobResponse = await findOneJob(storedJobId);
                    setJob(jobResponse);
                } catch (error) {
                    console.error("Error fetching job:", error);
                } finally {
                    setLoading(false);
                    setShowConfetti(true); // Show confetti when the data is ready
                }
            };

            fetchJob();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!job || !applicant) {
        return (
            <Box sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: '100%' }}>
                <Container maxWidth="lg" sx={{ position: 'relative' }}>
                    {/* Confetti Explosion */}
                    {showConfetti && (
                        <Box sx={{ position: "absolute", top: '25%', left: '50%', zIndex: 9999, transform: 'translateX(-50%)' }}>
                            <ConfettiExplosion force={0.8} duration={5000} particleCount={200} />
                        </Box>
                    )}

                    <Paper elevation={4} sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem' } }}>
                            🎉 Thank You
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                            Your application for the position has been received.
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {/* Next Steps */}
                        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                            What's Next?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                            Our recruitment team will review your application and aim to contact you within the next few days.
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {/* Contact Information */}
                        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                            Questions?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                            If you need further assistance, feel free to reach out to us{" "}
                            <Typography component="span" fontWeight="bold">
                                here
                            </Typography>
                            .
                        </Typography>

                        <Box display="flex" justifyContent="center" gap={2} sx={{ mt: 4 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<HomeIcon />}
                                onClick={() => navigate("/")}
                                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                            >
                                Home
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<WorkIcon />}
                                onClick={() => navigate("/jobs")}
                                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                            >
                                View More Jobs
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: '100%' }}>
            <Container maxWidth="lg" sx={{ position: 'relative' }}>
                {/* Confetti Explosion */}
                {showConfetti && (
                    <Box sx={{ position: "absolute", top: '25%', left: '50%', zIndex: 9999, transform: 'translateX(-50%)' }}>
                        <ConfettiExplosion force={0.8} duration={5000} particleCount={200} />
                    </Box>
                )}

                <Paper elevation={4} sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem' } }}>
                        🎉 Thank You, {applicant.first_name}!
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                        Your application for the{" "}
                        <Typography component="span" fontWeight="bold">
                            {job.job_title}
                        </Typography>{" "}
                        position has been received.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* Job Summary */}
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                        Job Summary
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                        <strong>Job Type:</strong> {job.job_type}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                        {job.job_type === 'permanent' ? (
                            <span><strong>Salary:</strong> £{job.lower_salary.toLocaleString()} - £{job.higher_salary.toLocaleString()} per annum</span>
                        ) : (
                            <span><strong>Rate:</strong> £{job.lower_rate.toLocaleString()} - £{job.higher_rate.toLocaleString()} per day - {job.contract_determine} ir35</span>
                        )}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* Next Steps */}
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                        What's Next?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                        Our recruitment team will review your application and aim to contact you within the next few days.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* Contact Information */}
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                        Questions?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                        If you need further assistance, feel free to reach out to us{" "}
                        <Typography component="span" fontWeight="bold">
                            here
                        </Typography>
                        .
                    </Typography>

                    <Box display="flex" justifyContent="center" gap={2} sx={{ mt: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<HomeIcon />}
                            onClick={() => navigate("/")}
                            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                        >
                            Home
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<WorkIcon />}
                            onClick={() => navigate("/jobs")}
                            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                        >
                            View More Jobs
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default JobConfirmation;
