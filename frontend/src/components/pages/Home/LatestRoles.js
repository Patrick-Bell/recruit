import { Box, Typography, Button, Card, CardContent, useMediaQuery, Chip } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Underline from "../../animation/Underline";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import softwareImg from '../../images/software-engineering.jpg';
import cyberImg from '../../images/cyber-security-img.jpg'
import dataImg from '../../images/data-engineering-img.jpg'
import mobileImg from '../../images/mobile-app-development.jpg'
import testingImg from '../../images/testing-img.jpg'
import uxImg from '../../images/ux-img.jpg'
import cloudImg from '../../images/cloud-img.jpg'

const generateImgForJob = (title) => {
    const jobTitle = title.toLowerCase();
    if (jobTitle.includes('ux') || jobTitle.includes('ui') || jobTitle.includes('design') || jobTitle.includes('designer') || jobTitle.includes('product')) {
        return uxImg;
    } else if (jobTitle.includes('cyber') || jobTitle.includes('security')) {
        return cyberImg;
    } else if (jobTitle.includes('data')) {
        return dataImg;
    } else if (jobTitle.includes('mobile') || jobTitle.includes('app')) {
        return mobileImg;
    } else if (jobTitle.includes('testing') || jobTitle.includes('test') || jobTitle.includes('qa') || jobTitle.includes('sdet') || jobTitle.includes('quality')) {
        return testingImg;
    } else if (jobTitle.includes('cloud')) {
        return cloudImg;
    }
    return softwareImg;
}

const LatestRoles = () => {
    const [jobs, setJobs] = useState([])
    const navigate = useNavigate()


    const mobileScreen = useMediaQuery('(max-width: 600px)');
    const tabletScreen = useMediaQuery('(max-width: 900px)');    
    
    
    const fetchJobs = async () => {
        const response = await axios.get('/api/jobs')
        setJobs(response.data)
        console.log(response.data, 'new jobs')
    }
        

    useEffect(() => {
        fetchJobs()
    }, [])

    const handleJobClick = (id) => {
        navigate(`/jobs/${id}`)
        window.scrollTo({top:0})
    }

    if (jobs.length === 0) {
        return ""
    }
    
    return (
        <Box id='latest-roles' sx={{ padding: { xs: 3, sm: 5 }, backgroundColor: "#f9f9f9" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Header */}
                <Underline>
                <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: "Poppins", display: "inline-block", fontSize: { xs: '1.5rem', sm: '2rem' }, }}>
                    Latest Roles
                    </Typography>
                    </Underline>                
                    <Typography component={'a'} href="/jobs" fontFamily={'Poppins'} fontWeight={700} fontSize={'large'} sx={{ display: 'flex', alignItems: 'center', color: '#408663', cursor: 'pointer', textDecoration:'none' }}>
                    View Roles<ArrowCircleRightIcon sx={{ marginLeft: '5px' }} />
                </Typography>
            </Box>

            {/* Swiper for roles */}
            <Swiper
            style={{padding:'10px'}}
                spaceBetween={30}
                slidesPerView={mobileScreen ? 1 : tabletScreen ? 2 : 3}  // Adjust number of slides based on screen size
                navigation={{
                    prevEl: '.custom-swiper-button-prev',
                    nextEl: '.custom-swiper-button-next'
                }} 
                modules={[Navigation, Autoplay]}
                className="mySwiper"
                loop
            >
                {jobs.map((job, index) => (
                    <SwiperSlide key={index}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                borderRadius: "12px",
                                backgroundColor: "#fff",
                                transition: "transform 0.3s, box-shadow 0.3s",
                                ":hover": {
                                    transform: "translateY(-10px)",
                                    boxShadow: 6,
                                },
                                overflow: "hidden",
                            }}
                        >
                            {/* Image Section */}
                            <Box
                                sx={{
                                    height: "180px",
                                    backgroundImage: `url(${generateImgForJob(job.job_title)})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    position:'relative'
                                }}
                            />
                            <Chip sx={{position:'absolute', top:5, right:5, zIndex:10, background:'#408663', color:'white', fontFamily:'Poppins', fontWeight:600}} label={job?.job_type}></Chip>

                            {/* Content Section */}
                            <CardContent sx={{ padding: "20px" }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        marginBottom: "10px",
                                        fontFamily: "Poppins",
                                        color: "#333",
                                    }}
                                >
                                    {job?.job_title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#555",
                                        marginBottom: "15px",
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    <LocationOnIcon sx={{ fontSize: "1rem", marginRight: "5px" }} />
                                    {job.job_location} {` |  ${job.job_hybrid}`}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#777",
                                        lineHeight: 1.6,
                                        fontSize: "0.95rem",
                                    }}
                                >
                                {job.job_desc && job.job_desc.length > 0 ? job.job_desc[0].slice(0, 100) + (job.job_desc[0].length > 50 ? "..." : "") : "No description available"}
                                </Typography>
                            </CardContent>

                            {/* Footer Section */}
                            <Box
                                sx={{
                                    padding: "10px 20px",
                                    borderTop: "1px solid #eee",
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'flex-end'
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => handleJobClick(job.id)}
                                    sx={{
                                        backgroundColor: "#408663",
                                        ":hover": { backgroundColor: "#306F53" },
                                        color: "#fff",
                                        textTransform: "none",
                                        padding: "8px 16px",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    Apply Now
                                </Button>
                            </Box>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>

    <Box sx={{ display: 'flex', justifyContent: 'right', width: '99.8%', marginTop:'10px' }}>
    {/* Navigation Buttons on the Left */}
    <Box sx={{ display: 'flex', alignItems: 'right' }}>
      <Button
        className="custom-swiper-button-prev"
        variant="contained"
        sx={{ color: 'white', marginRight: 1 }}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        className="custom-swiper-button-next"
        variant="contained"
        sx={{ color: 'white'}}
      >
        <ArrowRightIcon />
      </Button>
    </Box>
    </Box>

        </Box>
    );
};

export default LatestRoles;
