import { Box, TextField, Typography, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import ScrollInView from "../../animation/ScrollInView";
import { Toaster, toast } from 'sonner'
import axios from "axios";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    responded: false
  });
  const [btn, setBtn] = useState('Submit')
  const [loading, setLoading] = useState(false)

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Username validation
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }

    // Message validation (at least 30 characters)
    if (formData.message.length < 30) {
      errors.message = "Message must be at least 30 characters.";
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();

    // If there are errors, update the form errors state and show them
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setTimeout(() => setFormErrors({}), 3000); // Clear errors after 3 seconds
      return;
    }

    setLoading(true)
    setBtn(<CircularProgress size={'20px'} sx={{height:'36px'}} />)

    try {
      const response = await axios.post('/api/messages', {message: formData})
      toast.success('Message sent successfully!')

      setFormData({
        name: "",
        email: "",
        message: ""
      })

      setLoading(false)
      setBtn('Submit')


    }catch(e) {
      console.log(e)
    }

  };

  return (
    <ScrollInView direction={'left'}>
      <Toaster />
    <Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, fontFamily: "Poppins", marginBottom: "20px" }}
      >
        Send Us a Message
      </Typography>

      <form>
        {/* Username Field */}
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

        {/* Email Field */}
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

        {/* Message Field */}
        <Box sx={{ position: "relative" }}>
          <TextField
            label="Message"
            name="message"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            sx={{ marginBottom: "20px" }}
            value={formData.message}
            onChange={handleInputChange}
            error={!!formErrors.message}
            helperText={formErrors.message}
          />
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#408663",
            height:"36px",
            ":hover": { backgroundColor: "#306F53" },
            color: "#fff",
            textTransform: "none",
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {btn}
        </Button>
      </form>
    </Box>
    </ScrollInView>
  );
};

export default Contact;
