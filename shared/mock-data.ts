import { Alert, RouteDelay, NewsItem } from './types';
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
  }
];
export const MOCK_DELAYS: RouteDelay[] = [
  { id: 'd1', routeNumber: 'E12', school: 'Lincoln Elementary', status: 'Delayed', delayMinutes: 15, lastUpdated: '07:45 AM' },
  { id: 'd2', routeNumber: 'S45', school: 'West High School', status: 'Cancelled', lastUpdated: '06:15 AM' },
  { id: 'd3', routeNumber: 'N88', school: 'Riverdale Middle', status: 'Delayed', delayMinutes: 30, lastUpdated: '08:00 AM' },
  { id: 'd4', routeNumber: 'M10', school: 'Central Academy', status: 'On Time', lastUpdated: '08:15 AM' },
  { id: 'd5', routeNumber: 'W22', school: 'Lincoln Elementary', status: 'Delayed', delayMinutes: 10, lastUpdated: '07:55 AM' }
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
  }
];