import { Alert, RouteDelay, NewsItem, FAQItem, ContactDistrict } from './types';
export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    message: 'Significant snowfall expected. Please check your route status early tomorrow morning.',
    severity: 'warning',
    date: '2024-05-20T18:00:00Z'
  },
  {
    id: 'a2',
    message: 'All Zone 4 buses are cancelled today due to hazardous road conditions.',
    severity: 'critical',
    date: '2024-05-21T06:30:00Z'
  },
  {
    id: 'a3',
    message: 'Route E12 is experiencing mechanical issues. A replacement bus is en route.',
    severity: 'info',
    date: '2024-05-21T07:15:00Z'
  },
  {
    id: 'a4',
    message: 'Emergency road repairs on Highway 7 are causing 20+ minute delays for all North-bound routes.',
    severity: 'warning',
    date: '2024-05-21T07:45:00Z'
  },
  {
    id: 'a5',
    message: 'Reminder: Friday is a Professional Development day. No school for elementary students.',
    severity: 'info',
    date: '2024-05-22T09:00:00Z'
  },
  {
    id: 'a6',
    message: 'Gas Leak reported near Central High. All buses are being diverted to the secondary entrance.',
    severity: 'critical',
    date: '2024-05-21T08:10:00Z'
  }
];
export const MOCK_DELAYS: RouteDelay[] = [
  { id: 'd1', routeNumber: 'E12', school: 'Lincoln Elementary', status: 'Delayed', delayMinutes: 15, lastUpdated: '07:45 AM' },
  { id: 'd2', routeNumber: 'S45', school: 'West High School', status: 'Cancelled', lastUpdated: '06:15 AM' },
  { id: 'd3', routeNumber: 'N88', school: 'Riverdale Middle', status: 'Delayed', delayMinutes: 30, lastUpdated: '08:00 AM' },
  { id: 'd4', routeNumber: 'M10', school: 'Central Academy', status: 'On Time', lastUpdated: '08:15 AM' },
  { id: 'd5', routeNumber: 'W22', school: 'Lincoln Elementary', status: 'Delayed', delayMinutes: 10, lastUpdated: '07:55 AM' },
  { id: 'd6', routeNumber: 'E01', school: 'East Side Middle', status: 'On Time', lastUpdated: '08:05 AM' },
  { id: 'd7', routeNumber: 'E05', school: 'North Point Academy', status: 'Delayed', delayMinutes: 20, lastUpdated: '08:10 AM' },
  { id: 'd8', routeNumber: 'E09', school: 'South Oak Elementary', status: 'On Time', lastUpdated: '08:00 AM' },
  { id: 'd9', routeNumber: 'N05', school: 'North Point Academy', status: 'Cancelled', lastUpdated: '06:30 AM' },
  { id: 'd10', routeNumber: 'S12', school: 'South Oak Elementary', status: 'Delayed', delayMinutes: 45, lastUpdated: '07:30 AM' },
  { id: 'd11', routeNumber: 'W03', school: 'Riverdale Middle', status: 'On Time', lastUpdated: '08:15 AM' },
  { id: 'd12', routeNumber: 'E15', school: 'Central Academy', status: 'Delayed', delayMinutes: 12, lastUpdated: '08:20 AM' },
  { id: 'd13', routeNumber: 'E20', school: 'Lincoln Elementary', status: 'On Time', lastUpdated: '08:05 AM' },
  { id: 'd14', routeNumber: 'N14', school: 'West High School', status: 'Delayed', delayMinutes: 25, lastUpdated: '07:50 AM' },
  { id: 'd15', routeNumber: 'S08', school: 'East Side Middle', status: 'On Time', lastUpdated: '08:12 AM' },
  { id: 'd16', routeNumber: 'W11', school: 'Central Academy', status: 'Delayed', delayMinutes: 8, lastUpdated: '08:18 AM' },
  { id: 'd17', routeNumber: 'E03', school: 'South Oak Elementary', status: 'On Time', lastUpdated: '07:45 AM' },
  { id: 'd18', routeNumber: 'N22', school: 'North Point Academy', status: 'On Time', lastUpdated: '08:00 AM' },
  { id: 'd19', routeNumber: 'S19', school: 'West High School', status: 'Delayed', delayMinutes: 35, lastUpdated: '07:55 AM' },
  { id: 'd20', routeNumber: 'W07', school: 'Lincoln Elementary', status: 'Cancelled', lastUpdated: '06:45 AM' },
  { id: 'd21', routeNumber: 'M04', school: 'East Side Middle', status: 'On Time', lastUpdated: '08:02 AM' },
  { id: 'd22', routeNumber: 'M09', school: 'Riverdale Middle', status: 'Delayed', delayMinutes: 18, lastUpdated: '08:14 AM' }
];
export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'New Student Portal Launch',
    summary: 'The transportation portal has been upgraded with real-time tracking features for parents.',
    date: '2024-05-15',
    category: 'Update'
  },
  {
    id: 'n2',
    title: 'Driver Recruitment Drive',
    summary: 'Join our team of professional drivers. Competitive pay and flexible hours available.',
    date: '2024-05-10',
    category: 'Employment'
  },
  {
    id: 'n3',
    title: 'Annual Safety Excellence Awards',
    summary: 'Recognizing our drivers who achieved 10+ years of accident-free service this month.',
    date: '2024-05-18',
    category: 'Safety'
  },
  {
    id: 'n4',
    title: 'Summer School Registration',
    summary: 'Bus registration for summer programs is now open. Apply by June 1st to guarantee a seat.',
    date: '2024-05-20',
    category: 'Community'
  },
  {
    id: 'n5',
    title: 'Severe Weather Protocol Update',
    summary: 'Review our updated procedures for early dismissals during winter storm warnings.',
    date: '2024-05-12',
    category: 'Weather'
  },
  {
    id: 'n6',
    title: 'New Electric Bus Pilot Program',
    summary: 'Three new zero-emission electric buses will join the North District fleet starting next week.',
    date: '2024-05-21',
    category: 'Update'
  }
];
export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'f1',
    category: 'Eligibility',
    question: 'How do I know if my child is eligible for the bus?',
    answer: 'Eligibility is based on the distance between your primary residence and the designated school. Generally, elementary students living more than 1.6km and secondary students living more than 3.2km away are eligible.'
  },
  {
    id: 'f2',
    category: 'Safety',
    question: 'What happens during extreme weather?',
    answer: 'In the event of severe weather, cancellations are announced by 6:30 AM via our website, social media, and local radio stations. If buses are cancelled in the morning, they do not run in the afternoon.'
  },
  {
    id: 'f3',
    category: 'Operations',
    question: 'Can my child bring a large musical instrument on the bus?',
    answer: 'Large items are permitted only if they can be safely stored on the student’s lap or under the seat without obstructing the aisle or taking up another student’s seat.'
  }
];
export const MOCK_CONTACTS: ContactDistrict[] = [
  {
    id: 'c1',
    name: 'North District Office',
    phone: '(555) 900-1000',
    email: 'north@transithub.edu',
    zones: ['Zone 1', 'Zone 2'],
    address: '4500 Northern Blvd, Metro City'
  },
  {
    id: 'c2',
    name: 'South District Office',
    phone: '(555) 900-2000',
    email: 'south@transithub.edu',
    zones: ['Zone 3', 'Zone 4', 'Zone 5'],
    address: '1200 Southern Ave, Metro City'
  }
];