import { Typography, Box, Button, Grid, TextField, Divider, } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from '@mui/icons-material/Delete';
import ScrollLinked from "../../animation/ScrollLinked";

const JobApplicationSection = ({ btnLoading, btn, formData, handleDragLeave, handleDragOver, handleSubmit, handleInputChange, handleFileChange, handleDrop, errors, uploadedFile, dragOver, fileError, setUploadedFile  }) => {

    return (
        <>
            <ScrollLinked>
              <Box sx={{maxWidth:'100%', margin:'auto auto'}}>
                <Typography variant="h4" fontFamily={'Poppins'} fontWeight={800} textAlign={'center'} marginBottom={'20px'}>Application Form</Typography>

                <Typography fontFamily={'Poppins'} fontWeight={500} marginBottom={'10px'}>Personal Details:</Typography>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="first_name"
                fullWidth
                variant="outlined"
                value={formData.first_name}
                onChange={handleInputChange}
                error={!!errors.first_name}
                helperText={errors.first_name}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                label="Last Name"
                name="last_name"
                fullWidth
                variant="outlined"
                value={formData.last_name}
                onChange={handleInputChange}
                error={errors.last_name}
                helperText={errors.last_name}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                label="Email"
                name="email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                helperText={errors.email}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                label="Phone Number"
                name="phone_number"
                fullWidth
                variant="outlined"
                value={formData.phone_number}
                onChange={handleInputChange}
                error={errors.phone_number}
                helperText={errors.phone_number}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                label="City of Residence"
                name="location"
                fullWidth
                variant="outlined"
                value={formData.location}
                onChange={handleInputChange}
                error={errors.location}
                helperText={errors.location}
                />
                </Grid>
                </Grid>

                <Divider sx={{margin:"40px 0"}}/>

                <Typography fontFamily={'Poppins'} fontWeight={500} marginBottom={'10px'}>Availability:</Typography>
                <Grid container spacing={2}>
                 <Grid item xs={12}>
                <TextField
                label="Notice Period"
                name="availability"
                fullWidth
                variant="outlined"
                value={formData.availability}
                onChange={handleInputChange}
                error={errors.availability}
                helperText={errors.availability}
                />
                </Grid>
                </Grid>

                <Divider sx={{margin:"40px 0"}}/>

                <Typography fontFamily={'Poppins'} fontWeight={500} marginBottom={'10px'}>Profile:</Typography>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                label="LinkedIn Profile"
                name="profile"
                fullWidth
                variant="outlined"
                value={formData.profile}
                onChange={handleInputChange}
                error={errors.profile}
                helperText={errors.profile}
                />
                </Grid>
                </Grid>

                <Divider sx={{margin:"40px 0"}}/>

                <Typography fontFamily={'Poppins'} fontWeight={500} marginBottom={'10px'}>Documents:</Typography>
                <Grid container spacing={2}>
  
                <Grid item xs={12}>
                <TextField
                label="Cover Letter (optional)"
                name="cover_letter"
                multiline
                rows={10}
                fullWidth
                variant="outlined"
                value={formData.cover_letter}
                onChange={handleInputChange}
                error={errors.cover_letter}
                helperText={errors.cover_letter}
                />
                </Grid>



              <Grid item xs={12}>
              {!uploadedFile ? (
                <Box
            sx={{
              border: fileError
                ? "2px dotted red"
                : dragOver
                ? "2px solid #306F53"
                : "1px dashed #408663",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center",
              backgroundColor: fileError ? "#ffe6e6" : dragOver ? "#e8f5e9" : "#fff",
              transition: "background-color 0.3s, border 0.3s",
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadFileIcon
              sx={{
                fontSize: "48px",
                color: fileError ? "red" : "#408663",
                marginBottom: "10px",
                transition: "color 0.3s",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                marginBottom: "10px",
                color: fileError ? "red" : "#555",
              }}
            >
              Drag & drop your CV here or click to upload
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: fileError ? "red" : "#408663",
                ":hover": { backgroundColor: fileError ? "#cc0000" : "#306F53" },
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
                <>
              <Box sx={{ marginTop: "20px", display:'flex', alignItems:'center', border:'1px solid lightgrey', p:2, justifyContent:'space-between' }}>
              <Typography variant="body2"sx={{ color: "#333"}}>Uploaded: {uploadedFile.name}</Typography>
              <DeleteIcon onClick={() => setUploadedFile()} />
              </Box>
              
                </>
              )}
                

          {fileError && <Typography color="error">Please upload a valid PDF file less than 5MB</Typography>}

          {/* Submit Button */}
          <Button
          onClick={handleSubmit}
            variant="contained"
            disabled={btnLoading}
            sx={{
              backgroundColor: "#408663",
              ":hover": { backgroundColor: "#306F53" },
              color: "#fff",
              textTransform: "none",
              marginTop: "20px",
              height:'36px'
            }}
          >
            {btn}
          </Button>
                </Grid>
                </Grid>
                

              </Box>
              </ScrollLinked>
              </>
    )
        
}


export default JobApplicationSection