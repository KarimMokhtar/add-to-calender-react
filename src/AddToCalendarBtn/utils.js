export const MEETING_DATA = {
  zoom_id: "123456",
  zooom_password: "465646",
  interviewer: "Zeina Abdulsamad",
  startAt: "2021-12-20T10:00:00Z",
  endAt: "2021-12-20T11:00:00Z",
  details: `Event details go here`,
  timeZone: "Europe/Berlin",
};

export const CALENDAR_OPTIONS = [
  {
    label: "Google",
    value: "google",
  },
  {
    label: "Outlook",
    value: "outlook",
  },
  {
    label: "Apple",
    value: "apple",
  },
  {
    label: "ics",
    value: "ics",
  },
];


const formatTime = time => new Date(time).toISOString().replace(/[-:]|\.\d{3}/g, "");
const formatOutlookTime = time => new Date(time).toISOString();

const buildURL = (base, query) =>
  Object.keys(query).reduce((accum, key, index) => {
    const value = query[key];

    if (value !== null) {
      return `${accum}${index === 0 ? "?" : "&"}${key}=${encodeURIComponent(value)}`;
    }
    return accum;
  }, base);

const buildGoogleCalendarUrl = event =>
  buildURL("https://calendar.google.com/calendar/render", {
    action: "TEMPLATE",
    dates: `${formatTime(event.startsAt)}/${formatTime(event.endsAt)}`,
    location: event.location,
    text: event.name,
    details: event.details,
    ctz: event.timeZone,
  });

const buildOutlookCalendarUrl = event =>
  buildURL("https://outlook.live.com/owa", {
    rru: "addevent",
    startdt: formatOutlookTime(event.startsAt),
    enddt: formatOutlookTime(event.endsAt),
    subject: event.name,
    location: event.location,
    body: event.details,
    allday: false,
    uid: new Date().getTime().toString(),
    path: "/calendar/view/Month",
  });


const buildICSCalendarUrl = event => {
  const components = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `URL:${document.URL}`,
    `DTSTART:${formatTime(event.startsAt)}`,
    `DTEND:${formatTime(event.endsAt)}`,
    `SUMMARY:${event.name}`,
    `DESCRIPTION:${event.details}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return encodeURI(`data:text/calendar;charset=utf8,${components.join("\n")}`);
};

export const generateEventURLs = event => ({
  google: buildGoogleCalendarUrl(event),
  outlook: buildOutlookCalendarUrl(event),
  apple: buildICSCalendarUrl(event),
  ics: buildICSCalendarUrl(event),
});
