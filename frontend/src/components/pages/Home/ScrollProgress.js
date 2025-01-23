import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Fade } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 300); // Show when scrolled over 300px
    };

    const handleScroll = () => requestAnimationFrame(updateProgress);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fade in={isVisible}>
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: 60,
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          zIndex: 100,
          cursor: "pointer",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <CircularProgress variant="determinate" value={scrollProgress} size={50} thickness={5} />
        <ArrowUpwardIcon
          sx={{
            position: "absolute",
            color: "#408663",
            fontSize: 24,
          }}
        />
      </Box>
    </Fade>
  );
};

export default ScrollProgress;
