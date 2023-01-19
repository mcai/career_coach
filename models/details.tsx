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
  }
];

export interface CoachResult {
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
