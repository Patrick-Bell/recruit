import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Box, Typography, useMediaQuery } from "@mui/material"
import {slider} from '../api/Slider'

const animation = { duration: 30000, easing: (t) => t }

const Slider = () => {

    const mobileScreen = useMediaQuery("(max-width:600px)");

  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: { perView: mobileScreen ? 2 : 3, spacing: 10 }, // 👈 Shows 3 slides at once
    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
  })
  return (
    <Box sx={{p:3}} ref={sliderRef} className="keen-slider">
        {slider.map((job, i) => (
            <Box textAlign={'center'} className={`keen-slider__slide number-slide${i}`}>
                <img src={job.icon} />
                <Typography fontWeight={800} variant="subtitle2">{job.job}</Typography>
                <Typography color="grey" variant="caption">{job.skills.join(', ')}</Typography>
            </Box>
        ))}
     
    </Box>
  )
}

export default Slider
