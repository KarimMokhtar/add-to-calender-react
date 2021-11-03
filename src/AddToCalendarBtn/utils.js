export const CALENDAR_OPTIONS = [
  {
    label: 'Google',
    value: 'google'
  },
  {
    label: 'Outlook',
    value: 'outlook'
  },
  {
    label: 'Yahoo',
    value: 'yahoo'
  },
  {
    label: 'ics',
    value: 'ics'
  }
];

const generateDuration = (event) => {
  const minutes = Math.floor((+new Date(event.endsAt) - +new Date(event.startsAt)) / 60 / 1000);
  return `${Math.floor(minutes / 60)}:${`0${minutes % 60}`.slice(-2)}`;
};

const formatTime = (time) => new Date(time).toISOString().replace(/[-:]|\.\d{3}/g, '');

const buildURL = (base, query) => Object.keys(query).reduce(
  (accum, key, index) => {
    const value = query[key];

    if (value !== null) {
      return `${accum}${index === 0 ? '?' : '&'}${key}=${encodeURIComponent(value)}`;
    }
    return accum;
  },
  base
);

const buildGoogleCalendarUrl = (event) => buildURL('https://calendar.google.com/calendar/render', {
  action: 'TEMPLATE',
  dates: `${formatTime(event.startsAt)}/${formatTime(event.endsAt)}`,
  location: event.location,
  text: event.name,
  details: event.details,
});

const buildOutlookCalendarUrl = (event) => buildURL('https://outlook.live.com/owa', {
  rru: 'addevent',
  startdt: formatTime(event.startsAt),
  enddt: formatTime(event.endsAt),
  subject: event.name,
  location: event.location,
  body: event.details,
  allday: false,
  uid: new Date().getTime().toString(),
  path: '/calendar/view/Month',
});

const buildYahooCalendarUrl = (event) => buildURL('https://calendar.yahoo.com', {
  v: 60,
  view: 'd',
  type: 20,
  title: event.name,
  st: formatTime(event.startsAt),
  dur: generateDuration(event),
  desc: event.details,
  in_loc: event.location,
});

const buildICSCalendarUrl = (event) => {
  const components = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `URL:${document.URL}`,
    `DTSTART:${formatTime(event.startsAt)}`,
    `DTEND:${formatTime(event.endsAt)}`,
    `SUMMARY:${event.name}`,
    `DESCRIPTION:${event.details}`,
    `LOCATION:${event.location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return encodeURI(`data:text/calendar;charset=utf8,${components.join('\n')}`);
};

export const generateEventURLs = (event) => ({
  google: buildGoogleCalendarUrl(event),
  outlook: buildOutlookCalendarUrl(event),
  yahoo: buildYahooCalendarUrl(event),
  ics: buildICSCalendarUrl(event),
});
