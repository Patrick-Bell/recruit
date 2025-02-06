import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import BugReportIcon from "@mui/icons-material/BugReport";
import PaletteIcon from "@mui/icons-material/Palette";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import Underline from "../../animation/Underline";
import { FlipTilt } from "react-flip-tilt";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

const Specialisms = () => {

  
  const specialisms = [
    {
      title: "Web",
      icon: <CodeIcon sx={{ fontSize: 40, color: "#408663" }} />,
      description:
        "We build responsive, accessible, and scalable web applications.",
      jobs: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
    },
    {
      title: "Mobile",
      icon: <SmartphoneIcon sx={{ fontSize: 40, color: "#408663" }} />,
      description:
        "Crafting seamless mobile experiences for Android and iOS platforms.",
      jobs: ["iOS Developer", "Android Developer", "React Native Developer"],
    },
    {
      title: "Quality Assurance",
      icon: <BugReportIcon sx={{ fontSize: 40, color: "#408663" }} />,
      description:
        "Ensuring software quality through comprehensive testing strategies.",
      jobs: ["QA Engineer", "SDET", "Automation Tester"],
    },
    {
      title: "UI/UX Design",
      icon: <PaletteIcon sx={{ fontSize: 40, color: "#408663" }} />,
      description:
        "Designing intuitive user experiences and visually engaging interfaces.",
      jobs: ["UI Designer", "UX Designer", "Product Designer"],
    },
    {
      title: "Data Engineering",
      icon: <StorageIcon sx={{ fontSize: 40, color: "#408663" }} />,
      description:
        "Transforming raw data into actionable insights for informed decision-making.",
      jobs: ["Data Engineer", "ETL Developer", "Data Analyst"],
    },
    {
      title: "Cloud Computing",
      icon: <CloudIcon sx={{ fontSize: 40, color: "#408663" }} />,
      description:
        "Building secure, scalable, and efficient cloud-based solutions.",
      jobs: ["Cloud Engineer", "DevOps Engineer", "Cloud Architect"],
    },
  ];

  return (
    <Box id='specialisms' sx={{ padding: { xs: 3, sm: 5 }, backgroundColor: "#f9f9f9" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Header */}
                <Underline>
                <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: "Poppins", display: "inline-block", fontSize: { xs: '1.5rem', sm: '2rem' }, }}>
                    Our Specialisms
                  </Typography>
                    </Underline>                
                    <Typography component={'a'} href="/about#cover" fontFamily={'Poppins'} fontWeight={700} fontSize={'large'} sx={{ display: 'flex', alignItems: 'center', color: '#408663', cursor: 'pointer', textDecoration:'none' }}>
                    View More<ArrowCircleRightIcon sx={{ marginLeft: '5px' }} />
                </Typography>
            </Box>

      

      {/* Grid Layout */}
      <Grid container spacing={4}>
        {specialisms.map((specialism, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FlipTilt
              front={
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: "12px",
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    maxHeight:'216.938px',
                    marginTop:'5px',
                    ":hover": {
                      transform: "translateY(-10px)", // Slight lift on hover
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    {specialism.icon}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        marginTop: "15px",
                        fontFamily: "Poppins",
                        color: "#333",
                      }}
                    >
                      {specialism.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        marginTop: "10px",
                        lineHeight: 1.6,
                        fontSize: "0.95rem",
                      }}
                    >
                      Expertise in {specialism.title.toLowerCase()} ensures we
                      deliver top talent for every stage of the tech lifecycle.
                    </Typography>
                  </CardContent>
                </Card>
              }
              back={
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: "12px",
                    textAlign: "center",
                    backgroundColor: "#f4f4f4",
                    minHeight:'216.938px',
                  }}
                >
                  <CardContent>
                   
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        marginTop: "10px",
                        lineHeight: 1.6,
                        fontSize: "0.95rem",
                      }}
                    >
                      {specialism.description}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#408663",
                        marginTop: "15px",
                        fontWeight: 600,
                        fontFamily: "Poppins",
                      }}
                    >
                      Jobs We Hire For:
                    </Typography>
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: 0,
                        marginTop: "10px",
                        fontSize: "0.95rem",
                        color: "#555",
                      }}
                    >
                      {specialism.jobs.map((job, idx) => (
                        <li key={idx}>• {job}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Specialisms;
