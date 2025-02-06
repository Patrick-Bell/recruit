import { Typography, Box, Tab, Tabs, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dynamicImg from "../../images/dynamic.png";
import ScrollInView from "../../animation/ScrollInView";
import Footer from '../Home/Footer'
import { toast, Toaster } from 'sonner'
import JobApplicationSection from './JobApplicationSection'
import JobDescription from "./JobDescription";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from "react-router-dom";


const DynamicJobPage = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const { name } = useParams()
  const [job, setJob] = useState(null); // State to hold job data
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    job_id: id,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    location: "",
    availability: "",
    cover_letter: "",
    profile: ""
  });
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState(false); // Error state for file upload
  const [errors, setErrors] = useState({})
  const [btnLoading, setBtnLoading] = useState(false)
  const [btn, setBtn] = useState('Apply')
  const [pageLoading, setPageLoading] = useState(true)

  const navigate = useNavigate()


  const goToJobs = () => {
    window.location.href = '/jobs'
  }

  const validateFile = (file) => {
    const validFileTypes = ["application/pdf"];
    const maxFileSize = 5 * 1024 * 1024; // 5MB
  
    if (!validFileTypes.includes(file.type)) {
;
      return "Please upload a valid PDF file.";
    }
  
    if (file.size > maxFileSize) {
      return "File size must be less than 5MB.";
    }
  
    return null; // No errors
  };
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const findJob = async () => {
    try {
      const response = await axios.get(`/api/jobs/${id}`);
      setJob(response.data); // Set job data
    } catch (error) {
      console.error("Error fetching job details:", error);
      setJob(false); // Explicitly set job to false when not found
    } finally {
      setPageLoading(false); // Ensure loading stops after fetch attempt
    }
  };

  useEffect(() => {
    findJob();
  }, []);


  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setFileError(false); // Clear error when a file is uploaded
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFileError(false); // Clear error when a file is uploaded
    }
  };


  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
  
    // Check required fields
    const requiredFields = ['first_name', 'last_name', 'email', 'phone_number', 'location', 'availability', 'profile'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').toUpperCase()} is required.`;
        isValid = false;
      }
    });
  
    // Validate email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
  
    // Validate phone number (basic pattern)
    const phonePattern = /^[0-9]{11}$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
      isValid = false;
    }
  
    // Check if a file is uploaded and validate it
    if (!uploadedFile) {
      newErrors.file = "CV is required.";
      setFileError(true); // Trigger the error state for file upload
      isValid = false;
    } else {
      const fileError = validateFile(uploadedFile);
      if (fileError) {
        newErrors.file = fileError;
        setFileError(true); // Set the error state for file upload
        isValid = false;
      }
    }
  
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setTimeout(() => {
        setErrors({});
      }, 3000);
      return;
    }

    //
  
    const formDataToSubmit = new FormData();
  
    // Append the applicant data
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(`applicant[${key}]`, formData[key]); 
    });
  
    // Append the uploaded file (CV)
    if (uploadedFile) {
      formDataToSubmit.append("applicant[cv]", uploadedFile); 
    }
  
    setBtnLoading(true);
    setBtn(<CircularProgress size={'20px'} sx={{ height: '36px' }} />);
  
    try {
      // Timeout set to 100 seconds
      const response = await axios.post("/api/applicants", formDataToSubmit, {
        timeout: 100000, // 100 seconds timeout
      });

    const applicantId = response.data;  // Example: assuming the response contains the new applicant ID
    const jobId = formData.job_id; 
    const randomId = Math.random().toString(36).substr(2, 9)
    console.log(randomId)

        sessionStorage.setItem("applicantData", JSON.stringify(applicantId));
        sessionStorage.setItem("jobId", jobId);
  
      navigate(`/job-confirmation/${randomId}`);
  

      setBtnLoading(false);
      setBtn('Apply');
  
      console.log("Application submitted successfully:", response.data);
    } catch (error) {
      // Check if the error is a timeout
      if (error.code === 'ECONNABORTED') {
        console.error("Request timed out:", error);
        toast.error("Request timed out. Please try again later.");
      } else {
        console.error("Error submitting application:", error);
        toast.error('Application failed. Please try again.');
      }
      setBtnLoading(false);
      setBtn('Apply');
    }
  };
  

  if (pageLoading) {
    return (
      <>
        <Box
          sx={{
            backgroundImage: `url(${dynamicImg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "86vh",
            position: "relative",
            margin: '10px',
            borderRadius: '10px',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "overlay",
          }}
        >
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      </>
    );
  }
  
  

  if (!job) {
    return (
      <>
      <Box
        sx={{
          backgroundImage: `url(${dynamicImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "86vh",
          position: "relative",
          margin: '10px',
          borderRadius: '10px',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Fallback background color
          backgroundBlendMode: "overlay", // Darken the image for better contrast
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <ScrollInView direction={'bottom'}>
            <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: "10px", fontFamily: 'Poppins' }}>
              Job cannot be found or is no longer available
            </Typography>
            <Button onClick={goToJobs} variant="contained">Search All Jobs</Button>
          </ScrollInView>
        </Box>
      </Box>
      </>
    )
  }

  return (
    <>
    <Toaster />
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          backgroundImage: `url(${dynamicImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "70vh",
          position: "relative",
          margin: '10px',
          borderRadius: '10px',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Fallback background color
          backgroundBlendMode: "overlay", // Darken the image for better contrast
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <ScrollInView direction={'bottom'}>
            <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: "10px", fontFamily: 'Poppins' }}>
              {job?.job_title || "Loading..."}
            </Typography>
            <Typography variant="h6">
              {job?.job_type && job?.job_location
                ? `${job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)} | ${job.job_location.charAt(0).toUpperCase() + job.job_location.slice(1)} | ${job.job_hybrid.charAt(0).toUpperCase() + job.job_hybrid.slice(1)}`
                : "Details Loading..."}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', marginTop: "10px" }}>
              Posted on {job?.created_at ? (new Date(job?.created_at).toLocaleDateString('en-GB')) : "N/A"}
            </Typography>
          </ScrollInView>
        </Box>
      </Box>



      {/* Tabs for Job Description and Apply */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
        <Tabs value={value} onChange={handleChange} aria-label="job details tabs">
          <Tab label="Job Description" />
          <Tab label="Apply" />
        </Tabs>
      </Box>




      {/* Job Details Section */}
      <Box fullWidth sx={{ padding: { xs: "20px 10px", sm: "20px 40px" }, backgroundColor: "#fff", borderRadius: "8px", }}>
        {/* Grid Layout */}
          {/* Left Column - Job Description */}
          {value === 0 && (
            <JobDescription job={job} setValue={setValue} />
          )}

          {/* Right Column - Apply Section */}
          {value === 1 && (
            <JobApplicationSection
            handleDragLeave={handleDragLeave} handleDragOver={handleDragOver} formData={formData} dragOver={dragOver} handleDrop={handleDrop} handleFileChange={handleFileChange}
            handleInputChange={handleInputChange} handleSubmit={handleSubmit} errors={errors} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} fileError={fileError}
            btn={btn} btnLoading={btnLoading}
            />
          )}
      </Box>
      <Footer/>
    </>
  );
};

export default DynamicJobPage;
