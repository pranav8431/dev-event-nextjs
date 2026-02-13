export interface EventItem {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    title: "React Conference 2026",
    image: "/images/event1.png",
    slug: "react-conference-2026",
    location: "San Francisco, CA",
    date: "March 15, 2026",
    time: "9:00 AM"
  },
  {
    title: "JavaScript Developer Meetup",
    image: "/images/event2.png",
    slug: "javascript-developer-meetup",
    location: "New York, NY",
    date: "February 28, 2026",
    time: "6:30 PM"
  },
  {
    title: "Tech Innovation Summit",
    image: "/images/event3.png",
    slug: "tech-innovation-summit",
    location: "Austin, TX",
    date: "April 10, 2026",
    time: "10:00 AM"
  },
  {
    title: "Web Development Bootcamp",
    image: "/images/event4.png",
    slug: "web-development-bootcamp",
    location: "Seattle, WA",
    date: "May 5, 2026",
    time: "9:00 AM"
  },
  {
    title: "AI & Machine Learning Conference",
    image: "/images/event5.png",
    slug: "ai-machine-learning-conference",
    location: "Boston, MA",
    date: "June 20, 2026",
    time: "8:30 AM"
  },
  {
    title: "Cybersecurity Hackathon",
    image: "/images/event6.png",
    slug: "cybersecurity-hackathon",
    location: "Los Angeles, CA",
    date: "July 12, 2026",
    time: "12:00 PM"
  }
];