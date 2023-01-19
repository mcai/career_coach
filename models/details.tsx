export interface CoachDetails {
  gender: string;
  age: string;
  skills: string[];
  experience: string[];
  interests: string[];
}

export const exampleDetailsList: CoachDetails[] = [
  {
    gender: 'Female',
    age: '25',
    skills: [
      'C++',
      'Java', 
      'Python'
    ],
    experience: [
      'Bachelor of Computer Science from XYZ University',
      '2 years of experience in web development',
    ],
    interests: [
      'artificial intelligence', 
      'machine learning'
    ]
  },
  {
    gender: 'Male',
    age: '32',
    skills: [
      'JavaScript',
      'React',
      'Node.js'
    ],
    experience: [
      'Master of Computer Science from ABC University',
      '5 years of experience in full-stack development',
      '1 year of experience in mobile app development',
    ],
    interests: [
      'cloud computing',
      'serverless architecture'
    ]
  },
  {
    gender: 'Female',
    age: '38',
    skills: [
      'C#',
      'ASP.NET', 
      'SQL'
    ],
    experience: [
      'Bachelor of Computer Engineering from LMN University',
      '10 years of experience in software development',
    ],
    interests: [
      'cryptography',
      'information security'
    ]
  },
  {
    gender: 'Male',
    age: '27',
    skills: [
      'Java',
      'Spring', 
      'MongoDB'
    ],
    experience: [
      'Master of Computer Science from PQR University',
      '3 years of experience in back-end development',
    ],
    interests: [
      'microservices',
      'containerization'
    ]
  },
  {
    gender: 'Female',
    age: '31',
    skills: [
      'Java',
      'Android', 
      'Kotlin'
    ],
    experience: [
      'Bachelor of Computer Science from STU University',
      '5 years of experience in mobile app development',
    ],
    interests: [
      'augmented reality',
      'virtual reality'
    ]
  },
  {
    gender: 'Male',
    age: '35',
    skills: [
      'PHP',
      'Laravel', 
      'MySQL'
    ],
    experience: [
      'Master of Computer Science from JKL University',
      '7 years of experience in web development',
    ],
    interests: [
      'e-commerce',
      'payment gateway integration'
    ]
  }
];

export interface CoachJob {
  name: string;
  monthlySalaryLowInDollar: number;
  monthlySalaryHighInDollar: number;
  degree: string;
  responsibility: string[];
  skills: string[];
  experience: string[];
  relatedCompanies: string[];
  relatedProducts: string[];
  interviewQuestions: string[];
}
