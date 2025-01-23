import React, { useState } from "react";
import { Box, Typography, Grid, Button, TextField, CircularProgress } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ScrollInView from "../../animation/ScrollInView";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete'
import { toast, Toaster } from "sonner";

const UploadCV = () => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(false); // Error state for file upload
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({}); // Errors for form fields
  const [btn, setBtn] = useState('Submit')
  const [loading, setLoading] = useState(false)

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
      setError(false); // Clear error when a file is uploaded
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setError(false); // Clear error when a file is uploaded
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Enter a valid 11-digit phone number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();

    if (!uploadedFile) {
      setError(true); // Highlight file upload section
      setTimeout(() => setError(false), 3000); // Remove error after 3 seconds
    }

    if (Object.keys(errors).length > 0 || !uploadedFile) {
      setFormErrors(errors); // Show form validation errors
      setTimeout(() => setFormErrors({}), 3000)
      return;
    }

    const formDataToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(`candidate[${key}]`, formData[key]); // Notice the 'applicant' key
    });
  
    // Append the uploaded file (CV)
    if (uploadedFile) {
      formDataToSubmit.append("candidate[cv_file]", uploadedFile); // The 'cv' field is nested under 'applicant'
    }

    setLoading(true)
    setBtn(<CircularProgress size={'20px'} sx={{height:'36px'}} />)

    try {
      const response = await axios.post('/api/candidates', formDataToSubmit )
      toast.success('CV Successfully sent!')
      setFormData({
        name: "",
        phone: "",
        email: ""
      })
      setUploadedFile(null)

      setLoading(false)
      setBtn('Submit')

    }catch(e) {
      console.log(e)
    }

    // Clear errors and proceed with form submission
    setFormErrors({});
    
  };

  return (
    <ScrollInView direction={'right'}>
      <Toaster/>
    <Box>
          <Typography
            variant="h6"
            sx={{fontWeight: 700,
              fontFamily: "Poppins",
              width: 'auto', // Ensure width adjusts based on the text content
              display: 'inline-block',
              marginBottom: "20px"}}
          >
            Upload Your CV and Contact Information
          </Typography>

          {/* Name */}
          <TextField
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            value={formData.name}
            onChange={handleInputChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
          />

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            value={formData.phone}
            onChange={handleInputChange}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
          />

          {/* Email */}
          <TextField
            label="Email"
            name="email"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            value={formData.email}
            onChange={handleInputChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />

          {!uploadedFile ? (
          <Box
            sx={{
              border: error
                ? "4px dotted red"
                : dragOver
                ? "4px solid #306F53"
                : "2px dashed #408663",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center",
              backgroundColor: error ? "#ffe6e6" : dragOver ? "#e8f5e9" : "#fff",
              transition: "background-color 0.3s, border 0.3s",
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadFileIcon
              sx={{
                fontSize: "48px",
                color: error ? "red" : "#408663",
                marginBottom: "10px",
                transition: "color 0.3s",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                marginBottom: "10px",
                color: error ? "red" : "#555",
              }}
            >
              Drag & drop your CV here or click to upload
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: error ? "red" : "#408663",
                ":hover": { backgroundColor: error ? "#cc0000" : "#306F53" },
                color: "#fff",
                textTransform: "none",
                transition: "background-color 0.3s",
              }}
            >
              Choose File
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Box>
          ):(
            <Box sx={{ display:'flex', alignItems:'center', border:'1px solid lightgrey', p:2, justifyContent:'space-between' }}>
          <Typography variant="body2"sx={{ color: "#333"}}>Uploaded: {uploadedFile.name}</Typography>
          <DeleteIcon sx={{"&:hover": { cursor:'pointer', color:'red'}}} onClick={() => setUploadedFile()} />
          </Box>
          )}



          
  

          {/* Submit Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#408663",
              ":hover": { backgroundColor: "#306F53" },
              color: "#fff",
              textTransform: "none",
              marginTop: "20px",
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {btn}
          </Button>
          </Box>
          </ScrollInView>
  );
};

export default UploadCV;
