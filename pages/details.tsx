export interface CoachDetails {
  gender: string;
  age: string;
  country: string;
  currentJob: string;
  educationExperience: string;
  workExperience: string;
  hobbies: string;
  interests: string;
}

export const exampleDetailsList: CoachDetails[] = [
  {
    gender: 'Female',
    age: '25',
    country: 'United States',
    currentJob: 'Software Developer',
    educationExperience: 'Bachelor of Computer Science from XYZ University',
    workExperience: '2 years of experience in web development',
    hobbies: 'reading, hiking, yoga',
    interests: 'artificial intelligence, machine learning',
  }
];

export interface CoachResult {
  name: string;
  requirements: {
    monthlySalaryLowInDollar: number;
    monthlySalaryHighInDollar: number;
    degree: string;
    responsibility: string;
    experience: string;
    skills: string[];
  };
  relatedCompanies: string[];
  relatedProducts: string[];
  interviewQuestions: string[];
}
