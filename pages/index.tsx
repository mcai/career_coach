import Head from "next/head";
import React from "react";
import { Wizard } from "../components/wizard";
import { CoachJob } from "../models/job";
import { CoachProfile } from "../models/profile";
import { CoachResume } from "../models/resume";
import JobsPage from "./jobs";
import ProfilePage from "./profile";

// properties for the Index component
export interface IndexProps {
}

// state for the Index component
export interface IndexState {
  stepIndex: number;
  profile: CoachProfile;
  jobs: CoachJob[];
  selectedJobIndex: number | undefined;
  resume: CoachResume | undefined;
}

// the Index component
export default class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);

    this.state = {
      stepIndex: 0,
      profile: {
        name: "John Doe",
        gender: "Male",
        age: 25,
        experience: [],
        skills: [],
        interests: [],
      },
      jobs: [],
      selectedJobIndex: undefined,
      resume: undefined,
    };
  }

  // function to be called when the component is mounted
  componentDidMount() {
    // load the profile from session storage
    const savedProfile = JSON.parse(sessionStorage.getItem('profile') ?? "{}");
    if (savedProfile) {
      this.setState({ profile: savedProfile });
    }
  }

  handleSetStepIndex(stepIndex: number) {
    this.setState({ stepIndex });
  }

  handleSetProfile(profile: CoachProfile) {
    this.setState({ profile });
    sessionStorage.setItem('profile', JSON.stringify(profile));
  }

  handleSetJobs(jobs: CoachJob[]) {
    this.setState({ jobs });
  }

  handleSetSelectedJobIndex(index: number | undefined) {
    this.setState({ selectedJobIndex: index });
  }

  handleSetResume(resume: CoachResume) {
    this.setState({ resume });
  }

  // function to render the component
  render() {
    const steps: {title: string, component: React.ReactNode}[] = [
      { 
        title: 'Step 1 - Profile', 
        component: <ProfilePage
          stepIndex={this.state.stepIndex}
          setStepIndex={(stepIndex) => this.handleSetStepIndex(stepIndex)}
          profile={this.state.profile}
          setProfile={(profile) => this.handleSetProfile(profile)}
          setJobs={(jobs) => this.handleSetJobs(jobs)}
        />
      },
      { 
        title: 'Step 2', 
        component: <JobsPage
          stepIndex={this.state.stepIndex}
          setStepIndex={( stepIndex) => this.handleSetStepIndex(stepIndex)}
          profile={this.state.profile}
          jobs={this.state.jobs}
          selectedJobIndex={this.state.selectedJobIndex}
          setSelectedJobIndex={(index) => this.handleSetSelectedJobIndex(index)}
          setResume={(resume) => this.handleSetResume(resume)}
        />
      },
      { 
        title: 'Step 3', 
        component: <h1>Step 3</h1> 
      },
      { 
        title: 'Step 4', 
        component: <h1>Step 4</h1> 
      },
    ];

    return (
      <div>
        <Head>
          <title>Career Coach</title>
        </Head>

        <Wizard 
          steps={steps} 
          onComplete={() => {}} 
          stepIndex={this.state.stepIndex} 
          setStepIndex={(stepIndex) => this.handleSetStepIndex(stepIndex)} 
        />
      </div>
    );
  }
}