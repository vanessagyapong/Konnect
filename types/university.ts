export interface Course {
  id: string;
  code: string;
  name: string;
  professor: string;
  schedule: {
    day: string;
    time: string;
    location: string;
  }[];
  description: string;
  credits: number;
  department: string;
}

export interface AcademicProfile {
  major: string;
  minor?: string;
  year: number;
  gpa?: number;
  credits: number;
  advisor: {
    name: string;
    email: string;
    office: string;
    officeHours: string[];
  };
  courses: {
    current: Course[];
    past: Course[];
  };
}

export interface StudyGroup {
  id: string;
  courseId: string;
  name: string;
  members: string[];
  schedule: {
    day: string;
    time: string;
    location: string;
  }[];
  description: string;
}

export interface AcademicEvent {
  id: string;
  type: 'lecture' | 'seminar' | 'workshop' | 'office-hours' | 'club-meeting';
  title: string;
  description: string;
  datetime: Date;
  location: string;
  organizer: {
    id: string;
    name: string;
    role: string;
  };
  department?: string;
  course?: string;
  rsvpCount: number;
}

export interface MarketListing {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'textbook' | 'electronics' | 'furniture' | 'other';
  course?: string;
  location?: string;
  postedAt: Date;
  seller: string;
  status: 'active' | 'sold';
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  faculty: {
    id: string;
    name: string;
    title: string;
    email: string;
    officeHours: string[];
  }[];
  courses: Course[];
  announcements: {
    id: string;
    title: string;
    content: string;
    postedAt: Date;
  }[];
}

export interface ResearchOpportunity {
  id: string;
  title: string;
  professor: string;
  department: string;
  description: string;
  requirements: string[];
  deadline: Date;
  type: 'paid' | 'credit' | 'volunteer';
  contactEmail: string;
}

export interface CampusJob {
  id: string;
  title: string;
  department: string;
  type: 'work-study' | 'part-time' | 'full-time' | 'internship';
  description: string;
  requirements: string[];
  salary?: {
    amount: number;
    period: 'hour' | 'month' | 'year';
  };
  contactEmail: string;
  deadline: Date;
}

export interface StudentService {
  id: string;
  type: 'tutoring' | 'notes' | 'study-group' | 'other';
  title: string;
  description: string;
  provider: {
    id: string;
    name: string;
    rating: number;
    qualifications: string[];
  };
  course?: string;
  price?: number;
  availability: string[];
}

export interface DepartmentForum {
  id: string;
  departmentId: string;
  title: string;
  description: string;
  topics: ForumTopic[];
  moderators: string[]; // faculty IDs
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: 'student' | 'faculty' | 'alumni';
  };
  postedAt: Date;
  replies: ForumReply[];
  tags: string[];
  pinned: boolean;
}

export interface ForumReply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: 'student' | 'faculty' | 'alumni';
  };
  postedAt: Date;
  likes: number;
}

export interface OfficeHoursSlot {
  id: string;
  facultyId: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  maxStudents: number;
  bookedBy: string[]; // student IDs
  status: 'available' | 'full' | 'cancelled';
}

export interface MentorshipProgram {
  id: string;
  name: string;
  description: string;
  department: string;
  mentors: Mentor[];
  mentees: Mentee[];
  matches: MentorMatch[];
}

export interface Mentor {
  id: string;
  name: string;
  role: 'faculty' | 'alumni' | 'senior_student';
  department: string;
  expertise: string[];
  availability: string[];
  maxMentees: number;
  currentMentees: number;
  bio: string;
}

export interface Mentee {
  id: string;
  name: string;
  year: number;
  department: string;
  interests: string[];
  goals: string[];
  preferredMentorType: ('faculty' | 'alumni' | 'senior_student')[];
}

export interface MentorMatch {
  id: string;
  mentorId: string;
  menteeId: string;
  startDate: Date;
  status: 'pending' | 'active' | 'completed';
  meetingSchedule: string;
  goals: string[];
  progress: {
    date: Date;
    notes: string;
  }[];
}

export interface ResearchCollaboration {
  id: string;
  title: string;
  description: string;
  department: string;
  leader: {
    id: string;
    name: string;
    role: 'faculty' | 'student' | 'researcher';
  };
  members: {
    id: string;
    name: string;
    role: 'faculty' | 'student' | 'researcher';
    contribution: string;
  }[];
  status: 'recruiting' | 'active' | 'completed';
  tags: string[];
  meetings: {
    date: Date;
    location: string;
    agenda: string;
  }[];
  resources: {
    title: string;
    type: 'document' | 'link' | 'code';
    url: string;
  }[];
}

export interface AlumniNetwork {
  id: string;
  name: string;
  graduationYear: number;
  degree: string;
  department: string;
  currentPosition: {
    title: string;
    company: string;
    location: string;
  };
  expertise: string[];
  mentoring: boolean;
  events: {
    id: string;
    title: string;
    date: Date;
    type: 'networking' | 'workshop' | 'talk';
    description: string;
  }[];
  contactInfo: {
    email: string;
    linkedin?: string;
  };
} 