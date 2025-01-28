
import ReactTimeAgo from 'react-time-ago';
import moment from 'moment-timezone';
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'

TimeAgo.addDefaultLocale(en)

export default function DaysPosted({ date }) {
  if (date) {
    
    return (
        <span><ReactTimeAgo date={date} timeStyle='specific' /></span>
    );
  } 
}
