import Countdown from 'react-countdown';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CountDown({ date }) {
    const navigate = useNavigate();

    // Completionist message (when the countdown completes)
    const Completionist = () => {
        // Redirect to the home page or another route upon completion
        navigate('/');
    };

    // Renderer for displaying the countdown
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render the completion state and trigger navigation
            return <Completionist />;
        } else {
            console.log(date)
        }
    };

    return (
        <Countdown date={date} renderer={renderer} />
    );
}

export default CountDown;