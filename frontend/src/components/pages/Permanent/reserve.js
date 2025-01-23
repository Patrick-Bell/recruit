<Box
sx={{
  display: "flex",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
  marginTop: "20px",
}}
>
{permSteps.map((step, i) => (
  <Box
    key={i}
    sx={{
      position: "relative",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "20px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      marginBottom: "20px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      width: { xs: "100%", sm: "80%" },
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        ".step-step": {background:'#408663'},
        ".step-icon": {color:'#408663'},
        ".step-header": {color:'black'},
        ".step-desc": {color:'black'}
      },
    }}
  >
    {/* Step Number */}
    <Box
    className='step-step'
      sx={{
        width: "60px",
        height: "60px",
        backgroundColor: "grey",
        color: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "1.2rem",
        transition: "background-color 0.3s ease",
      }}
    >
      {step.step}
    </Box>

    {/* Vertical Line */}
    {i < permSteps.length + 1 && (
      <Box
        sx={{
          position: "absolute",
          left: "30px", // Align with the step number circle
          top: "100%",
          margin: 'auto auto',
          width: "20px",
          height: "20px",
          background: '#408663',
          backgroundSize: "4px 4px",
        }}
      />
    )}

    {/* Icon and Content */}
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      {/* Icon */}
      <Box
      className='step-icon'
        sx={{
          color: "grey",
          fontSize: "2.5rem",
          transition: "color 0.3s ease",
        }}
      >
        {step.icon}
      </Box>

      {/* Text */}
      <Box>
        <Typography
        className="step-header"
          sx={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "grey",
            transition: "color 0.3s ease",
          }}
        >
          {step.header}
        </Typography>
        <Typography
        className="step-desc"
          sx={{
            fontSize: "1rem",
            color: "grey",
            transition: "color 0.3s ease",
          }}
        >
          {step.desc}
        </Typography>
      </Box>
    </Box>
  </Box>
))}
</Box>