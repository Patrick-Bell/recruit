import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HandshakeIcon from '@mui/icons-material/Handshake';
import VerifiedIcon from '@mui/icons-material/Verified';

const contractSteps = [
  {
    step: 1,
    header: 'Consultation & Planning',
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    desc: 'We start by understanding your project scope, required skill sets, and contract duration to develop a targeted hiring strategy that meets your specific business needs.'
  },
  {
    step: 2,
    header: 'Talent Sourcing',
    icon: <SearchIcon sx={{ fontSize: 40 }} />,
    desc: 'Utilizing our extensive contractor database and proactive search methods, we identify highly skilled professionals available for short-term or long-term engagements.'
  },
  {
    step: 3,
    header: 'Candidate Engagement',
    icon: <PhonelinkRingIcon sx={{ fontSize: 40 }} />,
    desc: 'We quickly reach out to qualified candidates, conduct initial screenings, and assess their availability, skills, and experience to ensure they align with your project requirements.'
  },
  {
    step: 4,
    header: 'Compliance & Onboarding',
    icon: <AssignmentTurnedInIcon sx={{ fontSize: 40 }} />,
    desc: 'We handle contract negotiations, and compliance documentation, ensuring that all legal and administrative requirements are met before the contractor starts.'
  },
  {
    step: 5,
    header: 'Placement & Support',
    icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
    desc: 'Once placed, we maintain open communication with both you and the contractor to ensure a smooth transition, providing any necessary support throughout the contract period.'
  },
  {
    step: 6,
    header: 'Contract Review & Extension',
    icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
    desc: 'As the contract approaches its end, we assist in reviewing performance, negotiating extensions, or sourcing a replacement if needed to ensure business continuity.'
  }
];

export default contractSteps;
