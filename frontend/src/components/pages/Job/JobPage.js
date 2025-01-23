import {
  Grid,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Button,
  Divider,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DevicesIcon from "@mui/icons-material/Devices";
import { green, grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import ScrollInView from "../../animation/ScrollInView";
import jobImg from "../../images/jobs.jpg";
import Underline from "../../animation/Underline";
import Footer from "../Home/Footer";
import CancelIcon from '@mui/icons-material/Cancel';


const JobPage = () => {
  const [filters, setFilters] = useState({
    jobType: [],
    jobLocation: [],
    jobHybrid: [],
  });

  const changePictureOrientation = useMediaQuery("(max-width:800px)");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([])
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);
  const [search, setSearch] = useState({
    searchKeyword: "",
    searchLocation: ""

  })


  const jobTypes = jobs.map(job => job.job_type)
  const uniqueJobTypes = [...new Set(jobTypes)];
  const jobTypeCount = uniqueJobTypes.map((type) => {
    return {
      type,
      count: jobs.filter((job) => job.job_type.toLowerCase() === type.toLowerCase()).length,
    };
  });
  

  const jobLocations = jobs.map(job => job.job_location)
  const uniqueJobLocations = [...new Set(jobLocations)]
  const jobLocationCount = uniqueJobLocations.map((type) => {
    return {
      type,
      count: jobs.filter((job) => job.job_location.toLowerCase() === type.toLowerCase()).length,
    };
  });



  const resetFilters = () => {
    setFilters({
      jobType: [],
      jobLocation: [],
      jobHybrid: []
    })
    setSearch({
      searchKeyword: "",
      searchLocation: ""
    })
  }


  useEffect(() => {
    axios
      .get("/api/jobs")
      .then((response) => {
        setJobs(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  const hybrid = jobs.filter(job => job.job_hybrid === 'hybrid')
  const remote = jobs.filter(job => job.job_hybrid === 'remote')


  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[name] = [...updatedFilters[name], value];
      } else {
        updatedFilters[name] = updatedFilters[name].filter((item) => item !== value);
      }
      console.log(updatedFilters)
      return updatedFilters;
    });
  };

  const directToPage = (id, name) => {
    navigate(`/jobs/${id}?name=${name}`);
    window.scrollTo({top:0})
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 


  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesKeyword = search.searchKeyword
        ? job.job_title.toLowerCase().includes(search.searchKeyword.toLowerCase()) || job.job_desc.some((desc) => desc.toLowerCase().includes(search.searchKeyword.toLowerCase()))
        : true;
  
      const matchesLocation = search.searchLocation
        ? job.job_location.toLowerCase().includes(search.searchLocation.toLowerCase())
        : true;
  
      const matchesType = filters.jobType.length
        ? filters.jobType.includes(job.job_type.toLowerCase())
        : true;
  
        const matchesLocationFilter = filters.jobLocation.length
        ? filters.jobLocation.some((location) => location.toLowerCase() === job.job_location.toLowerCase())
        : true;
      
  
      const matchesHybrid = filters.jobHybrid.length
        ? filters.jobHybrid.includes(job.job_hybrid.toLowerCase())
        : true;
  
      return matchesKeyword && matchesLocation && matchesType && matchesLocationFilter && matchesHybrid;
    });
  
    setFilteredJobs(filtered);
  }, [filters, jobs, search]);
  


    const loadMore = () => {
      setVisibleCount((prevCount) => prevCount + 4);
    };



  return (
    <>
      <Box
        sx={{
          height: { xs: "auto", md: "60vh" },
          display: changePictureOrientation ? "block" : "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: { xs: 2, sm: 4 },
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Text Section */}
        <Box
          sx={{
            flex: 1,
            textAlign: "left",
            zIndex: 0.7,
            padding: { xs: "20px", sm: "40px" },
          }}
        >
          <ScrollInView direction={"bottom"}>
            <Underline>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              }}
            >
              Technology Jobs
            </Typography>
            </Underline>
          </ScrollInView>
          <ScrollInView direction={"top"}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.2rem" },
                marginTop: "20px",
                lineHeight: 1.6,
                maxWidth: "600px",
              }}
            >
              If you are searching for a permanent or contract job in technology, search our latest UK jobs below. If you can’t find a job that matches your needs,{" "}
              <span style={{ color: "#408663", fontWeight: 800, cursor: "pointer" }}>register your details</span> and we
              will review your CV and look to match your skills and experience with new jobs when they become available.
            </Typography>
          </ScrollInView>
        </Box>

        {/* Image Section */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${jobImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: { xs: "200px", md: "100%" },
            borderRadius: "10px",
            boxShadow: 3,
            zIndex:0.3
          }}
        />
      </Box>


<ScrollInView direction={'bottom'}>
      <Box
  sx={{
    margin: '-30px 50px 0 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow for more depth
    backgroundColor: '#fff',
    zIndex: 3,
    gap: 2, // Adds consistent spacing between children
  }}
>
  {/* Keyword Input */}
  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
    <Box component={'span'} sx={{display:'flex', alignItems:'center'}}>
    <Typography
      variant="subtitle2"
      sx={{ fontWeight: 600, fontSize: '14px', color: '#333', textAlign: 'left', marginRight:'5px' }}
    >
      Keyword
    </Typography>
    <Typography variant="subtitle2" color="grey">
</Typography>
    </Box>
    <TextField
      variant="standard"
      placeholder="Enter a keyword"
      size="small"
      sx={{border:'none', background:'transparent'}}
      InputProps={{disableUnderline:true}}
      name="searchKeyword"
    value={search.searchKeyword}
    onChange={handleSearchChange}
    />
  </Box>

  {/* Separator */}
  <Typography
    sx={{
      fontSize: '20px',
      fontWeight: 300,
      color: '#ddd', // Light separator for a minimalist look
    }}
  >
    |
  </Typography>

  {/* Location Input */}
  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', }}>
    <Typography
      variant="subtitle2"
      sx={{ fontWeight: 600, fontSize: '14px', color: '#333', textAlign: 'left' }}
    >
      Location
    </Typography>
    <TextField
    variant="standard"
      placeholder="Enter a location"
      size="small"
      InputProps={{disableUnderline:true}}
      sx={{border:'none', background:'transparent'}}
      name="searchLocation"
    value={search.searchLocation}
    onChange={handleSearchChange}
    />
  </Box>

  {/* Search Button */}
  <Button
    variant="contained"
    sx={{
      backgroundColor: '#408663',
      color: '#fff',
      fontWeight: 600,
      textTransform: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '16px',
      '&:hover': {
        backgroundColor: '#30694b', // Darker green on hover
      },
    }}
  >
    Search
  </Button>
</Box>
</ScrollInView>




      {/* Main Content */}
      <Box sx={{ margin: "20px 50px 10px 50px"}}>
        <Grid container spacing={2}>
          {/* Filters Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ border: `1px solid ${grey[400]}`, padding: "16px", borderRadius: "8px", backgroundColor: "#fff" }}>

            <FormControl fullWidth margin="normal">
              <Typography textAlign={'right'}>There are currently <Box fontWeight={800} color={'#408663'} component={'span'}>{jobs.length}</Box> open jobs</Typography>
              </FormControl>

              <Divider/>
              
              {/* Job Type Filter */}
              <FormControl fullWidth margin="normal">
                <FormLabel sx={{ fontWeight: 600, color: "#333" }}>Job Type</FormLabel>
                {jobTypeCount.map((jobType) => (
                  <FormControlLabel
                    key={jobType.type}
                    control={
                      <Checkbox
                        checked={filters.jobType.includes(jobType.type)}
                        onChange={handleFilterChange}
                        name="jobType"
                        value={jobType.type}
                        sx={{ color: "#408663" }}
                      />
                    }
                    label={`${jobType.type.toUpperCase()}  (${jobType.count})`}
                  />
                ))}
              </FormControl>

              <Divider/>

              {/* Job Location Filter */}
              <FormControl fullWidth margin="normal">
                <FormLabel sx={{ fontWeight: 600, color: "#333" }}>Location</FormLabel>
                {jobLocationCount.map((locationType) => (
                  <FormControlLabel
                    key={locationType.type}
                    control={
                      <Checkbox
                        checked={filters.jobLocation.includes(locationType.type)}
                        onChange={handleFilterChange}
                        name="jobLocation"
                        value={locationType.type}
                        sx={{ color: "#408663" }}
                      />
                    }
                    label={`${locationType.type.toUpperCase()} (${locationType.count})`}
                  />
                ))}
              </FormControl>

              <Divider/>

              {/* Hybrid/Remote Filter */}
              <FormControl fullWidth margin="normal">
            <FormLabel sx={{ fontWeight: 600, color: "#333" }}>Working Environment</FormLabel>
            {["hybrid", "remote"].map((option) => {
              const jobCount = option === "hybrid" ? hybrid.length : remote.length;
              return (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={filters.jobHybrid.includes(option)}
                      onChange={handleFilterChange}
                      name="jobHybrid"
                      value={option}
                      sx={{ color: "#408663" }}
                    />
                  }
                  label={`${option.toUpperCase()} (${jobCount})`}
                />
              );
            })}
          </FormControl>
            </Box>
          </Grid>




          {/* Job Listings */}
          <Grid item xs={12} md={8}>
            {filteredJobs.length > 0 ? (
              <Box>
              {filteredJobs
              .slice(0, visibleCount)
                .map((job) => (
                  <Box
                    key={job.id}
                    sx={{
                      marginBottom: "16px",
                      padding: "16px",
                      border: `1px solid ${grey[300]}`,
                      borderRadius: "8px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#333", fontWeight: 800 }}>
                      {job.job_title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: grey[600], fontSize: 16 }}>
                      {job.job_type === "contract"
                        ? `Rate: £${(job.lower_rate ?? 0).toLocaleString()} - £${(job.higher_rate ?? 0).toLocaleString()} per day`
                        : `Salary: £${(job.lower_salary ?? 0).toLocaleString()} - £${(job.higher_salary ?? 0).toLocaleString()} per annum`}
                    </Typography>
                    <Divider sx={{ margin: "15px 0" }} />
                    <Typography variant="body2" sx={{ color: grey[600], display:'flex', alignItems:'center' }}>
                      <WorkIcon sx={{ fontSize: 16, marginRight: 1 }} /> {job.job_type ? job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1) : ''}
                    </Typography>
                    <Typography variant="body2" sx={{ color: grey[600], display:'flex', alignItems:'center' }}>
                      <LocationOnIcon sx={{ fontSize: 16, marginRight: 1 }} /> {job.job_location ? job.job_location.charAt(0).toUpperCase() + job.job_location.slice(1) : ''}
                    </Typography>
                    <Typography variant="body2" sx={{ color: grey[600], display:'flex', alignItems:'center' }}>
                      <DevicesIcon sx={{ fontSize: 16, marginRight: 1 }} /> {job.job_hybrid ? job.job_hybrid.charAt(0).toUpperCase() + job.job_hybrid.slice(1) : ''}
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: "8px", color: "#333" }}>
                      {job.job_desc[0]}... <Box onClick={() => directToPage(job.id, job.job_title)} sx={{color:'#408663', cursor:'pointer'}} fontWeight={800} component={'span'}>read more</Box>
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{ color: "#408663", marginTop: 2 }}
                      onClick={() => directToPage(job.id, job.job_title)}
                    >
                      Apply Now
                    </Button>
                  </Box>
                ))}
                <Button sx={{display: visibleCount >= filteredJobs.length ? 'none' : 'block', marginBottom:'20px'}} onClick={loadMore} fullWidth variant="contained">Load more</Button>
            </Box>
            ):(
              <Box sx={{border: `1px solid ${grey[400]}`, p:2, borderRadius:'10px', position:'relative', minHeight:'311px' }}>
                <Box sx={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
                <CancelIcon sx={{color:'grey', display:'flex', alignItems:'center', margin:'auto auto', fontSize:'50px'}}/>
                <Typography sx={{textAlign:'center', color:'grey'}}>No Jobs Available. Please refine your search or click <Box onClick={resetFilters} component={'span'} style={{color:'#408663', fontWeight:800, cursor:'pointer'}}>here</Box> to reset your filters.</Typography>
                </Box>
              </Box>
            )}
            
          </Grid>





        </Grid>
      </Box>




      <Footer/>
    </>
  );
};

export default JobPage;
