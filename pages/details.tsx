export interface CoachDetails {
  gender: string;
  age: string;
  country: string;
  career: string;
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
    career: 'Software Developer',
    educationExperience: 'Bachelor of Computer Science from XYZ University',
    workExperience: '2 years of experience in web development',
    hobbies: 'reading, hiking, yoga',
    interests: 'artificial intelligence, machine learning',
  }
];

export interface CoachResult {
  name: string;
  description: string;
  missingSkills: string[];
}
