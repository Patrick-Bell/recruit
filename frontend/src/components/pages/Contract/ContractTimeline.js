import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import contractSteps from "../../api/ContractRecruitmentProcess";

const RecruitmentTimeline = () => {
  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <VerticalTimeline>
        {contractSteps.map(({ step, header, icon, desc }) => (
          <VerticalTimelineElement
            key={step}
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#408663", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #408663" }}
            lineColor={'black'}
            iconStyle={{ background: "#408663", color: "#fff" }}
            icon={icon}
          >
            <Typography className="vertical-timeline-element-title" variant="h6" component="h3" fontWeight={900}>
              {header}
            </Typography>
            <Typography>{desc}</Typography>
          </VerticalTimelineElement>
        ))}
        {/* Final Step with Star Icon */}
        <VerticalTimelineElement
          iconStyle={{ background: "gold", color: "#fff" }}
          icon={<StarIcon sx={{ fontSize: 40 }} />}
          contentArrowStyle={{ borderRight: "7px solid gold" }}
        >
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Box>
  );
};

export default RecruitmentTimeline;
