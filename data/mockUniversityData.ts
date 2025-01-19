import { 
  Course, 
  AcademicProfile,
  StudyGroup,
  AcademicEvent,
  MarketListing,
  Department,
  ResearchOpportunity,
  CampusJob,
  StudentService
} from '../types/university';

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Computer Science',
    professor: 'Dr. Smith',
    schedule: [
      { day: 'Monday', time: '10:00 AM', location: 'Room 101' },
      { day: 'Wednesday', time: '10:00 AM', location: 'Room 101' }
    ],
    description: 'Fundamental concepts of programming and computer science',
    credits: 3,
    department: 'Computer Science'
  },
  {
    id: '2',
    code: 'MATH201',
    name: 'Calculus II',
    professor: 'Dr. Johnson',
    schedule: [
      { day: 'Tuesday', time: '2:00 PM', location: 'Room 205' },
      { day: 'Thursday', time: '2:00 PM', location: 'Room 205' }
    ],
    description: 'Advanced calculus concepts and applications',
    credits: 4,
    department: 'Mathematics'
  }
];

export const mockAcademicProfile: AcademicProfile = {
  major: 'Computer Science',
  minor: 'Mathematics',
  year: 2,
  gpa: 3.8,
  credits: 60,
  advisor: {
    name: 'Dr. Williams',
    email: 'williams@university.edu',
    office: 'Science Building 305',
    officeHours: ['Tuesday 1-3 PM', 'Thursday 1-3 PM']
  },
  courses: {
    current: mockCourses,
    past: []
  }
};

export const mockStudyGroups: StudyGroup[] = [
  {
    id: '1',
    courseId: '1',
    name: 'CS101 Study Group A',
    members: ['1', '2', '3'],
    schedule: [
      { day: 'Friday', time: '3:00 PM', location: 'Library Room 2' }
    ],
    description: 'Weekly study group for CS101'
  }
];

export const mockEvents: AcademicEvent[] = [
  {
    id: '1',
    type: 'lecture',
    title: 'Guest Lecture: AI Ethics',
    description: 'Discussion on ethical implications of AI',
    datetime: new Date('2024-04-15T14:00:00'),
    location: 'Main Auditorium',
    organizer: {
      id: '1',
      name: 'Dr. Brown',
      role: 'Professor'
    },
    department: 'Computer Science',
    rsvpCount: 45
  }
];

export const mockMarketListings: MarketListing[] = [
  {
    id: '1',
    title: 'Calculus Textbook',
    description: 'Used calculus textbook in good condition',
    price: 50,
    type: 'textbook',
    course: 'MATH 101',
    location: 'Library',
    postedAt: new Date('2024-01-15'),
    seller: 'john_doe',
    status: 'active'
  },
  {
    id: '2',
    title: 'Scientific Calculator',
    description: 'TI-84 Plus, barely used',
    price: 75,
    type: 'electronics',
    course: 'MATH 101',
    location: 'Science Building',
    postedAt: new Date('2024-01-14'),
    seller: 'jane_smith',
    status: 'active'
  },
  {
    id: '3',
    title: 'Study Desk',
    description: 'Compact desk perfect for dorm room',
    price: 40,
    type: 'furniture',
    location: 'Dorm A',
    postedAt: new Date('2024-01-13'),
    seller: 'mike_wilson',
    status: 'sold'
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    description: 'Department of Computer Science and Engineering',
    faculty: [
      {
        id: '1',
        name: 'Dr. Smith',
        title: 'Professor',
        email: 'smith@university.edu',
        officeHours: ['Monday 2-4 PM', 'Wednesday 2-4 PM']
      }
    ],
    courses: mockCourses.filter(course => course.department === 'Computer Science'),
    announcements: [
      {
        id: '1',
        title: 'New Course Offering',
        content: 'New AI course available for next semester',
        postedAt: new Date('2024-03-01')
      }
    ]
  }
];

export const mockResearchOpportunities: ResearchOpportunity[] = [
  {
    id: '1',
    title: 'AI Research Assistant',
    professor: 'Dr. Smith',
    department: 'Computer Science',
    description: 'Research position in machine learning lab',
    requirements: ['Python proficiency', 'ML knowledge', 'GPA 3.5+'],
    deadline: new Date('2024-04-30'),
    type: 'paid',
    contactEmail: 'smith@university.edu'
  }
];

export const mockCampusJobs: CampusJob[] = [
  {
    id: '1',
    title: 'Teaching Assistant - CS101',
    department: 'Computer Science',
    type: 'part-time',
    description: 'Assist in CS101 labs and grading',
    requirements: ['Completed CS101 with A', 'Good communication skills'],
    salary: {
      amount: 15,
      period: 'hour'
    },
    contactEmail: 'cs@university.edu',
    deadline: new Date('2024-04-15')
  }
];

export const mockStudentServices: StudentService[] = [
  {
    id: '1',
    type: 'tutoring',
    title: 'CS101 Tutoring',
    description: 'One-on-one tutoring for CS101',
    provider: {
      id: '1',
      name: 'Alex Johnson',
      rating: 4.9,
      qualifications: ['CS Major', 'Former TA for CS101']
    },
    course: 'CS101',
    price: 25,
    availability: ['Monday 4-6 PM', 'Wednesday 4-6 PM']
  }
];

export const mockDepartmentForums = [
  {
    id: '1',
    departmentId: '1', // Computer Science
    title: 'CS General Discussion',
    description: 'General discussion forum for CS department',
    topics: [
      {
        id: '1',
        title: 'Tips for Technical Interviews',
        content: 'Share your experience and tips for technical interviews...',
        author: {
          id: '1',
          name: 'John Smith',
          role: 'student'
        },
        postedAt: new Date('2024-03-01'),
        replies: [
          {
            id: '1',
            content: 'Practice leetcode problems regularly...',
            author: {
              id: '2',
              name: 'Dr. Williams',
              role: 'faculty'
            },
            postedAt: new Date('2024-03-02'),
            likes: 5
          }
        ],
        tags: ['career', 'interviews'],
        pinned: true
      }
    ],
    moderators: ['1'] // Dr. Smith's ID
  }
];

export const mockOfficeHours = [
  {
    id: '1',
    facultyId: '1',
    date: new Date('2024-03-15'),
    startTime: '14:00',
    endTime: '16:00',
    location: 'Science Building 305',
    maxStudents: 4,
    bookedBy: ['1', '2'],
    status: 'available'
  }
];

export const mockMentorshipProgram = {
  id: '1',
  name: 'CS Mentorship Program',
  description: 'Connect with experienced mentors in computer science',
  department: 'Computer Science',
  mentors: [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'faculty',
      department: 'Computer Science',
      expertise: ['AI', 'Machine Learning', 'Python'],
      availability: ['Monday afternoons', 'Wednesday mornings'],
      maxMentees: 3,
      currentMentees: 1,
      bio: 'Professor specializing in AI and Machine Learning'
    }
  ],
  mentees: [
    {
      id: '1',
      name: 'Alice Chen',
      year: 2,
      department: 'Computer Science',
      interests: ['AI', 'Web Development'],
      goals: ['Improve programming skills', 'Research experience'],
      preferredMentorType: ['faculty', 'senior_student']
    }
  ],
  matches: [
    {
      id: '1',
      mentorId: '1',
      menteeId: '1',
      startDate: new Date('2024-02-01'),
      status: 'active',
      meetingSchedule: 'Bi-weekly on Mondays',
      goals: ['Complete a research project', 'Prepare for internships'],
      progress: [
        {
          date: new Date('2024-02-15'),
          notes: 'Discussed research project ideas'
        }
      ]
    }
  ]
};

export const mockResearchCollaborations = [
  {
    id: '1',
    title: 'AI Ethics Research Group',
    description: 'Investigating ethical implications of AI systems',
    department: 'Computer Science',
    leader: {
      id: '1',
      name: 'Dr. Smith',
      role: 'faculty'
    },
    members: [
      {
        id: '2',
        name: 'Jane Doe',
        role: 'student',
        contribution: 'Literature review and data analysis'
      }
    ],
    status: 'recruiting',
    tags: ['AI', 'ethics', 'research'],
    meetings: [
      {
        date: new Date('2024-03-20'),
        location: 'Science Building 301',
        agenda: 'Project kickoff and role assignments'
      }
    ],
    resources: [
      {
        title: 'Research Proposal',
        type: 'document',
        url: 'https://example.com/proposal'
      }
    ]
  }
];

export const mockAlumniNetwork = [
  {
    id: '1',
    name: 'Michael Chang',
    graduationYear: 2020,
    degree: 'BS Computer Science',
    department: 'Computer Science',
    currentPosition: {
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA'
    },
    expertise: ['Full Stack Development', 'Cloud Computing'],
    mentoring: true,
    events: [
      {
        id: '1',
        title: 'Tech Industry Insights',
        date: new Date('2024-04-01'),
        type: 'talk',
        description: 'Discussion about current trends in tech industry'
      }
    ],
    contactInfo: {
      email: 'michael@example.com',
      linkedin: 'linkedin.com/in/michaelchang'
    }
  }
]; 