import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Stepper, Step, StepLabel, Paper, Grid, Typography, FormControl, InputLabel, Select, MenuItem, InputAdornment, Tab, Tabs, Checkbox, IconButton, Divider } from "@mui/material";
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addJob, fetchJobs } from "../routes/JobsRoutes";
import Dashboard from "./Dashboard";

// Steps for the Stepper
const steps = ['Job Information', 'Permanent/Contract', 'Description', 'Review & Submit'];

const AddJob = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    job_title: "",
    job_type: "",
    job_desc: [],
    job_hybrid: "",
    job_location: "",
    industry: "",
    lower_salary: 0,
    higher_salary: 0,
    lower_rate: 0,
    higher_rate: 0,
    contract_determine: "",
    contract_length: "",
    job_skills: [],
    job_benefits: [],
  })
  const [value, setValue] = useState(0);
  const [jobs, setJobs] = useState([])
  const [totals, setTotals] = useState({ perm: [], contract: [], total: 0, recent: [] });

  const getJobs = async () => {
    const response = await fetchJobs();
    console.log(response, "get all the jobs");
  
    // Get the current date and subtract 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
    // Filter jobs posted in the last 7 days
    const recentJobs = response.filter(job => {
      const jobDate = new Date(job.created_at); // Convert job date to Date object
      return jobDate >= sevenDaysAgo; // Check if within last 7 days
    });
  
    const permJobs = response.filter(job => job.job_type === "permanent");
    const contractJobs = response.filter(job => job.job_type === "contract");
    const totalJobs = response.length

    setTotals({
      perm: permJobs,
      contract: contractJobs,
      total: totalJobs,
      recent: recentJobs
    })
  
  }

  useEffect(() => {
    getJobs()
  }, [])

  // Handle Next Step
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Handle Back Step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
        const response = await addJob(formData)
        console.log(response)
        setActiveStep(0)
        setFormData({
            job_title: "",
            job_type: "",
            job_desc: [],
            job_hybrid: "",
            job_location: "",
            industry: "",
            lower_salary: 0,
            higher_salary: 0,
            lower_rate: 0,
            higher_rate: 0,
            contract_determine: "",
            contract_length: "",
            job_skills: [],
            job_benefits: [],
          })
            
    }catch(e) {
        console.log(e)
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addSkill = () => {
    setFormData({ ...formData, job_skills: [...formData.job_skills, ""] });
  };

  // Function to remove a skill field
  const removeSkill = (index) => {
    const updatedSkills = formData.job_skills.filter((_, i) => i !== index);
    setFormData({ ...formData, job_skills: updatedSkills });
  };

  // Function to handle skill input change
  const handleSkillChange = (index, value) => {
    const updatedSkills = formData.job_skills.map((skill, i) => i === index ? value : skill);
    setFormData({ ...formData, job_skills: updatedSkills });
  };

  const addBenefit = () => {
    setFormData({ ...formData, job_benefits: [...formData.job_benefits, ""] });
  };

  // Function to remove a skill field
  const removeBenefit = (index) => {
    const updatedBenefits = formData.job_benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, job_benefits: updatedBenefits });
  };

  // Function to handle skill input change
  const handleBenefitChange = (index, value) => {
    const updatedDesc = formData.job_benefits.map((skill, i) => i === index ? value : skill);
    setFormData({ ...formData, job_benefits: updatedDesc });
  };

  const addDesc = () => {
    setFormData({ ...formData, job_desc: [...formData.job_desc, ""] });
  };

  // Function to remove a skill field
  const removeDesc = (index) => {
    const updatedDesc = formData.job_desc.filter((_, i) => i !== index);
    setFormData({ ...formData, job_desc: updatedDesc });
  };

  // Function to handle skill input change
  const handleDescChange = (index, value) => {
    const updatedDesc = formData.job_desc.map((skill, i) => i === index ? value : skill);
    setFormData({ ...formData, job_desc: updatedDesc });
  }


  // Step Content based on the active step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Job Title"
                variant="outlined"
                fullWidth
                value={formData.job_title}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                sx={{ borderRadius: "10px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  value={formData.job_type}
                  label="Job Type"
                  onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                >
                  <MenuItem value="permanent">Permanent</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                value={formData.job_location}
                onChange={(e) => setFormData({ ...formData, job_location: e.target.value })}
                sx={{ borderRadius: "10px" }}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Model</InputLabel>
                <Select
                  value={formData.job_hybrid}
                  label="Job Type"
                  onChange={(e) => setFormData({ ...formData, job_hybrid: e.target.value })}
                >
                  <MenuItem value="remote">Remote</MenuItem>
                  <MenuItem value="hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Industry"
                variant="outlined"
                fullWidth
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                sx={{ borderRadius: "10px" }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Permanent" />
              <Tab label="Contract" />
            </Tabs>
            {value === 0 ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Lower Salary"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={formData.lower_salary}
                    onChange={(e) => setFormData({ ...formData, lower_salary: e.target.value })}
                    sx={{ borderRadius: "10px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyPoundIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Higher Salary"
                    variant="outlined"
                    fullWidth
                    value={formData.higher_salary}
                    onChange={(e) => setFormData({ ...formData, higher_salary: e.target.value })}
                    sx={{ borderRadius: "10px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyPoundIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Lower Rate"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={formData.lower_rate}
                    onChange={(e) => setFormData({ ...formData, lower_rate: e.target.value })}
                    sx={{ borderRadius: "10px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyPoundIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Higher Rate"
                    variant="outlined"
                    fullWidth
                    value={formData.higher_rate}
                    onChange={(e) => setFormData({ ...formData, higher_rate: e.target.value })}
                    sx={{ borderRadius: "10px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyPoundIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Job Type</InputLabel>
                    <Select
                      value={formData.contract_determine}
                      label="Job Type"
                      onChange={(e) =>
                        setFormData({ ...formData, contract_determine: e.target.value })
                      }
                      sx={{
                        borderRadius: "10px",
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                        },
                      }}
                    >
                      <MenuItem value="inside">Inside IR35</MenuItem>
                      <MenuItem value="outside">Outside IR35</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Contract Length"
                    variant="outlined"
                    fullWidth
                    input="number"
                    value={formData.contract_length}
                    onChange={(e) => setFormData({ ...formData, contract_length: e.target.value })}
                    sx={{ borderRadius: "10px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography>months</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            {/* Skills */}
            <Grid container spacing={3}>
            {/* Skills Section */}
            <Grid item xs={12} sx={{marginLeft:'25px'}}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:'10px'}}>
            <Typography fontFamily={'Poppins'} fontWeight={800}>Skills</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={addSkill}
                startIcon={<AddIcon />}
              >
                Add Skill
              </Button>
              </Box>
              <Divider/>

              {formData.job_skills.map((skill, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={10} marginTop={'10px'}>
                    <TextField
                      label={`Skill ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      sx={{ borderRadius: "10px" }}
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <RemoveIcon sx={{cursor:'pointer'}} color="error" onClick={() => removeSkill(index)}/>
                            </InputAdornment>
                          ),
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>

         

            {/* Benefits */}
            <Grid container spacing={3}>
            {/* Skills Section */}
            <Grid item xs={12} sx={{marginLeft:'25px'}}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:'10px'}}>
            <Typography fontFamily={'Poppins'} fontWeight={800}>Benefits</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={addBenefit}
                startIcon={<AddIcon />}
              >
                Add Benefit
              </Button>
              </Box>
              <Divider />
              {formData.job_benefits.map((benefit, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={10} marginTop={'10px'}>
                    <TextField
                      label={`Benefit ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      sx={{ borderRadius: "10px" }}
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <RemoveIcon sx={{cursor:'pointer'}} color="error" onClick={() => removeBenefit(index)}/>
                            </InputAdornment>
                          ),
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
              

              <Grid item xs={12}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:'10px'}}>
            <Typography fontFamily={'Poppins'} fontWeight={800}>Description</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={addDesc}
                startIcon={<AddIcon />}
              >
                Add Paragraph
              </Button>
              </Box>
              <Divider/>

              {formData.job_desc.map((para, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={10} marginTop={'10px'}>
                    <TextField
                      label={`Paragraph ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      value={para}
                      onChange={(e) => handleDescChange(index, e.target.value)}
                      sx={{ borderRadius: "10px" }}
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <RemoveIcon sx={{cursor:'pointer'}} color="error" onClick={() => removeDesc(index)}/>
                            </InputAdornment>
                          ),
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
          </Grid>
            </Grid>
          </Grid>
            



          </Grid>
        );
      case 3:
        return (
          <Box>
            <Typography fontFamily={'Poppins'} variant="subtitle1" sx={{ mb: 2 }}>
              Review Your Information:
            </Typography>
            <Box>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Job Title:</Typography>
              <Typography variant="subtitle2">
                <strong>{formData.job_title}</strong> 
              </Typography>
              </Box>
              <Divider/>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Job Type:</Typography>
              <Typography variant="subtitle2">
                <strong>{formData.job_type}</strong>
              </Typography>
              </Box>
              <Divider/>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Job Location:</Typography>
              <Typography variant="subtitle2">
                <strong>{formData.job_location}</strong>
              </Typography>
              </Box>
              <Divider/>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Working Model:</Typography>
              <Typography variant="subtitle2">
                <strong>{formData.job_hybrid}</strong>
              </Typography>
              </Box>
              <Divider/>
              {formData.job_type === 'contract' ? (
                <>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Lower Rate:</Typography>
              <Typography variant="subtitle2">
                <strong>£{formData.lower_rate}</strong>  p/day
              </Typography>
              </Box>
              <Divider/>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Higher Rate:</Typography>
              <Typography variant="subtitle2">
                <strong>£{formData.higher_rate}</strong> p/day
              </Typography>
              </Box>
              <Divider/>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Contract Determination</Typography>
              <Typography variant="subtitle2">
                <strong>{formData.contract_determine}</strong> IR35
              </Typography>
              </Box>
              <Divider/>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Contract Length</Typography>
              <Typography variant="subtitle2">
                <strong>{formData.contract_length}</strong> months
              </Typography>
              </Box>
              <Divider/>
                </>
              ):(
                <>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Lower Salary</Typography>
              <Typography variant="subtitle2">
              <strong>£{(Number(formData.lower_salary)).toLocaleString('en-GB')}</strong>
              </Typography>
              </Box>
              <Divider/>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Higher Salary</Typography>
              <Typography variant="subtitle2">
              <strong>£{(Number(formData.higher_salary)).toLocaleString('en-GB')}</strong>
              </Typography>
              </Box>
              <Divider/>
                </>
              )}
              <Box sx={{display:'block', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Skills</Typography>
              <Typography variant="subtitle2">
              <strong>
                {formData.job_skills.map((char, index) => (
                    <div key={index}> - {char}</div>
                ))}
                </strong>
              </Typography>
              </Box>
              <Divider/>
              <Box sx={{display:'block', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Benefits</Typography>
              <Typography variant="subtitle2">
              <strong>
                {formData.job_benefits.map((char, index) => (
                    <div key={index}> - {char}</div>
                ))}
                </strong>
              </Typography>
              </Box>
              <Divider/>
              <Box sx={{display:'block', alignItems:'center', justifyContent:'space-between'}}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="subtitle2">
                <strong>{formData.job_desc.map((p, i) => (
                  <div style={{marginTop:'5px'}} key={i}>{p}</div>
                ))}</strong>
              </Typography>
              </Box>
              <Divider/>
            </Box>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box>

<Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">Total Jobs</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{totals.total}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>all time</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">Permanent Jobs</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{totals.perm.length}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>all time</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">Contract Jobs</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{totals.contract.length}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>all time</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">Recent Jobs</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{totals.recent.length}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>last 7 days</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>



      <Grid container spacing={3}>
        {/* Left Section for Vertical Stepper */}
        <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column" }}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel sx={{ fontWeight: "bold", color: "#333" }}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        {/* Right Section for Form Content */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: "#ffffff" }}>
            {getStepContent(activeStep)}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  borderRadius: "10px",
                  fontWeight: "600",
                  borderColor: "#00796b",
                  color: "#00796b",
                  '&:hover': {
                    borderColor: "#004d40",
                    backgroundColor: "#e0f2f1",
                  },
                }}
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: "10px",
                    fontWeight: "600",
                    backgroundColor: "#00796b",
                    '&:hover': {
                      backgroundColor: "#004d40",
                    },
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1}
                  sx={{
                    borderRadius: "10px",
                    fontWeight: "600",
                    backgroundColor: "#00796b",
                    '&:hover': {
                      backgroundColor: "#004d40",
                    },
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddJob;
