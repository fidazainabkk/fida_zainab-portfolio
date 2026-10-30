export const BASE = import.meta.env.BASE_URL
export const EMAIL = 'fidazainabkk@gmail.com'

// Contact form: paste your free Web3Forms access key here (see README). Leave empty to use the Gmail fallback.
export const WEB3FORMS_KEY = ''

// Everything a skill can be "used in" (taken from the CV)
export const places = {
  seat: { kind: 'Project', title: 'Seat Booking System', year: '2025', note: 'Full-stack MERN app for browsing showtimes and choosing seats.' },
  interest: { kind: 'Project', title: 'Interest Calculator Website', year: '2024', note: 'React app that calculates simple interest from live inputs.' },
  pothole: { kind: 'Project', title: 'Pothole Detection and Drowsiness Prevention', year: '2023 to 2024', note: 'Front end for a mobile driver-safety app with OpenCV alerts.' },
  bitbridge: { kind: 'Work', title: 'Full-stack Software Engineer, BitBridge Technologies', year: 'June 2026 to now', note: 'Test suites, integrated testing and defect reports on an enterprise project.' },
  luminar: { kind: 'Training', title: 'MERN Stack Developer, Luminar Technolab', year: 'Sept 2024 to March 2025', note: 'Built MERN apps and learned Git, GitHub and the SDLC.' },
  google: { kind: 'Certificate', title: 'Google Data Analytics Professional Certificate', year: 'May to June 2026', note: 'Coursework with SQL, Python, Excel and Tableau.' },
}

// [name, comfortable (1) or basics (0), where it was used]
export const skillGroups = [
  { label: 'Build', skills: [
    ['JavaScript',1,['seat','interest','luminar']], ['HTML5',1,['seat','interest']], ['CSS3',1,['seat','interest']],
    ['ReactJS',0,['seat','interest','luminar']], ['NodeJS',0,['seat','luminar']], ['ExpressJS',1,['seat','luminar']],
    ['MongoDB',1,['seat','luminar']], ['Tailwind CSS',1,['seat']], ['Bootstrap',1,['seat','interest']],
    ['React Bootstrap',1,['interest']], ['C',1,[]], ['C++',0,[]],
  ]},
  { label: 'Test and tools', skills: [
    ['Manual testing',1,['bitbridge']], ['Test case writing',1,['bitbridge']], ['Defect reporting',1,['bitbridge']],
    ['Agile and TDD',1,['bitbridge']], ['Git',1,['luminar']], ['GitHub',1,['luminar']], ['Postman',1,[]], ['VS Code',1,[]],
  ]},
  { label: 'Data', skills: [
    ['Microsoft Excel',1,['google']], ['SQL',0,['google']], ['Python',0,['pothole','google']],
    ['Tableau',0,['google']], ['Power BI',0,[]],
  ]},
]

export const projects = [
  { id: 'seat', title: 'Seat Booking System', year: '2025', stack: 'MERN', tags: ['React', 'Node.js', 'MongoDB'],
    summary: 'A full-stack app where users browse movie showtimes and pick seats interactively.',
    points: ['React.js front end connected to Express.js APIs, updating seat states in real time.', 'MongoDB schemas for bookings, theatre seat maps and movie availability.', 'Input validation and endpoints that lock booked seats and save them to the database.'],
    tools: 'JavaScript, HTML5, CSS3, Bootstrap, Tailwind CSS, MongoDB, Express, React, Node', link: 'https://github.com/fidazainabkk' },
  { id: 'pothole', title: 'Pothole Detection and Drowsiness Prevention', year: '2023 to 2024', stack: 'Python, CV', tags: ['Python'],
    summary: 'A mobile safety app that warns drivers about road hazards and fatigue.',
    points: ['Built the front end showing real-time driver alerts and hazard warnings.', 'Used OpenCV live video to trigger visual and audio prompts from eye-blink patterns.', 'Showed live GPS coordinates and logged hazards from accelerometer and gyroscope sensors.', 'Tested responsiveness across screen layouts and light conditions.'],
    tools: 'Python, OpenCV, Inertial Measurement Units, GPS' },
  { id: 'interest', title: 'Interest Calculator Website', year: '2024', stack: 'React', tags: ['React'],
    summary: 'A responsive web app that calculates simple interest from principal, rate and tenure.',
    points: ['Form handling and state management with React hooks (useState) for live results.', 'Styled with React Bootstrap for a clean layout on any screen size.'],
    tools: 'HTML5, CSS3, Bootstrap, ReactJS, JavaScript' },
]
export const filters = ['All', 'React', 'Node.js', 'MongoDB', 'Python']

export const experience = [
  { when: 'June 2026 to now', role: 'Full-stack Software Engineer', org: 'BitBridge Technologies', points: [
    'Onboarded onto a large enterprise project through deep codebase walkthroughs of its architecture and business logic.',
    'Built user interfaces and integrated front-end components to client specifications.',
    'Wrote end-to-end test suites and functional test cases covering legacy and new features.',
    'Ran integrated testing across multi-tier layers, finding bugs, performance bottlenecks and edge-case failures.',
    'Produced testing reports and defect logs with senior developers to speed up fixes.',
    'Worked in Agile and TDD processes to build, test and deploy features.'] },
  { when: 'Sept 2024 to March 2025', role: 'MERN Stack Developer (Training)', org: 'Luminar Technolab', points: [
    'Built responsive web apps with ReactJS, NodeJS, ExpressJS and MongoDB, from concept to deployment.',
    'Connected front-end components to database endpoints for CRUD operations.',
    'Learned Git and GitHub workflows and the full software development lifecycle.'] },
]

export const education = [
  { title: 'B.Tech, Computer Science and Engineering', org: 'Eranad Knowledge City Technical Campus, Manjeri, Kerala', meta: '2020 to 2024, CGPA 8.46/10' },
  { title: 'Higher Secondary Education', org: 'Darul Uloom Higher Secondary School, Kerala', meta: '2018 to 2020, 88.2%' },
  { title: 'Google Data Analytics Professional Certificate', org: 'Coursera', meta: 'May to June 2026' },
  { title: 'MERN Full Stack Development', org: 'National Council of Technology and Training', meta: 'Sept 2024 to Feb 2025' },
]

export const marquee = ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JavaScript', 'Python', 'SQL', 'Tableau', 'Power BI', 'Postman', 'Git']
