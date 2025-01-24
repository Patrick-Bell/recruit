import { Link, Routes, Route, useLocation, matchPath, useParams } from 'react-router-dom';
import PublicNavbar from '../navbar/PublicNavbar';
import Home from '../pages/Home/Home';
import JobPage from '../pages/Job/JobPage';
import DynamicJobPage from '../pages/Job/DynamicJobPage';
import PermanentRecruit from '../pages/Permanent/PermanentRecruit';
import UploadPage from '../pages/Upload/UploadPage';
import Dashboard from '../admin/Dashboard';
import Helmet from 'react-helmet'
import img from '../images/new-logo.png'
import Login from '../admin/Login';
import ProtectedRoute from './ProtectedRoute';
import SessionExpired from '../pages/Login/SessionExpired';
import NotFound from '../pages/Login/NotFound';
import JobConfirmation from '../pages/Job/JobConfirmation';
import About from '../pages/Home/About';
import ContractRecruit from '../pages/Contract/ContractRecruit';
import ScrollProgress from '../pages/Home/ScrollProgress';
import ContactUs from '../pages/Contact/Contact';


const AppContent = () => {
  const location = useLocation(); // Get the current location


  const getRoute = (path) => {

    if (matchPath("/jobs/:id", location.pathname)) {
      return { title: `Job Details | Fiortech Recruitment Group`,};
  }

    switch (path) {
      case '/':
        return { title: 'Home | Fiortech Recruitment Group' };
      case '/about':
        return { title: 'About | Fiortech Recruitment Group' }
      case '/jobs':
        return { title: 'Jobs | Fiortech Recruitment Group' };
      case '/contact':
        return { title: 'Contact Us | Fiortech Recruitment Group' }
      case '/permanent-recruitment':
        return { title: 'Permanent Recruitment | Fiortech Recruitment Group' };
      case '/contract-recruitment':
        return { title: 'Contract Recruitment | Fiortech Recruitment Group' }
      case '/upload-cv':
        return { title: 'Upload Your CV | Fiortech Recruitment Group' };
      case '/dashboard':
        return { title: 'Admin Dashboard | Fiortech Recruitment Group' };
      case '/login':
        return { title: 'Login | Fiortech Recruitment Group' }
      case '/job-confirmation':
        return { title: 'Job Confirmation | Fiortech Recruitment Group' }
      default:
        return { title: 'Page Not Found | Fiortech Recruitment Group' };
    }
  };
  
  const { title } = getRoute(location.pathname);
  



  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="icon" href={img} />
      </Helmet>

      {/* Conditionally render PublicNavbar based on current path */}
      {location.pathname !== '/dashboard' && location.pathname !== '/login' && location.pathname !== '/session-expired' && location.pathname !== '/job-confirmation' && <PublicNavbar />}
      <ScrollProgress />

      <Routes>
        {/* Define the main route for the home page */}
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />}></Route>
        <Route path='/jobs' element={<JobPage />}></Route>
        <Route path='/jobs/:id' element={<DynamicJobPage />}></Route>
        <Route path='/permanent-recruitment' element={<PermanentRecruit />}></Route>
        <Route path='/contract-recruitment' element={<ContractRecruit />}></Route>
        <Route path='/upload-cv' element={<UploadPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/session-expired' element={<SessionExpired/>}></Route>
        <Route path='*' element={<NotFound />}></Route>
        <Route path='/job-confirmation' element={<JobConfirmation />}></Route>
        <Route path='/contact' element={<ContactUs />}></Route>

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>        
    
    
      </Routes>
    </>
  );
};

export default AppContent;
