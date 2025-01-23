import GroupsIcon from '@mui/icons-material/Groups';
import TimelineIcon from '@mui/icons-material/Timeline';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import StorageIcon from '@mui/icons-material/Storage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StrollerIcon from '@mui/icons-material/Stroller';

const permSteps = [
  {
    step: 1,
    header: 'Initial Meeting',
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    desc: 'We begin by understanding your unique business requirements to represent your brand effectively. Ideally conducted in person, but video conferencing is also available to suit your needs.'
  },
  {
    step: 2,
    header: 'Market Analysis',
    icon: <TimelineIcon sx={{ fontSize: 40 }} />,
    desc: 'We analyze market trends to align your expectations with current realities. Together, we refine your requirements while considering your company’s culture to create a practical recruitment strategy.'
  },
  {
    step: 3,
    header: 'Sourcing Talent',
    icon: <PhonelinkIcon sx={{ fontSize: 40 }} />,
    desc: 'Leveraging a multi-channel approach, we actively engage candidates through direct outreach, email campaigns, social media, and professional networks to attract the best talent available.'
  },
  {
    step: 4,
    header: 'Interview Coordination',
    icon: <StorageIcon sx={{ fontSize: 40 }} />,
    desc: 'From scheduling interviews to preparing candidates, we manage the entire process. Our goal is to ensure a seamless experience for both you and the candidates, fostering positive interactions throughout.'
  },
  {
    step: 5,
    header: 'Offer Management',
    icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
    desc: 'We maintain transparent communication with candidates from the outset, setting realistic expectations around responsibilities and compensation to ensure a mutually satisfying agreement.'
  },
  {
    step: 6,
    header: 'Post-Placement Care',
    icon: <StrollerIcon sx={{ fontSize: 40 }} />,
    desc: 'Our commitment doesn’t end at placement. We follow up regularly with candidates to ensure they’re thriving in their new role and address any potential challenges early to ensure long-term success.'
  }
];

export default permSteps;
