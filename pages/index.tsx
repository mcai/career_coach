import Head from "next/head";
import React from "react";
import { Wizard } from "../components/wizard";
import { CoachJob } from "../models/job";
import { CoachProfile } from "../models/profile";
import { CoachCoverLetter } from "../models/cover_letter";
import { JobsPage } from "./jobs";
import { ProfilePage } from "./profile";
import { CoverLetterPage } from "./cover_letter";

// properties for the Index component
export interface IndexProps {
}

// state for the Index component
export interface IndexState {
  stepIndex: number;
  profile: CoachProfile;
  jobs: CoachJob[];
  selectedJobIndex?: number;
  coverLetter?: CoachCoverLetter;
  error?: any;
  submitting: boolean;
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
      coverLetter: undefined,
      error: undefined,
      submitting: false,
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

  async handleProfileSubmit() {
    if (this.state.submitting) {
      return;
    }

    this.setState({ 
      error: undefined,
      submitting: true,
    });

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        profile: this.state.profile,
      }),
    });
  
    const json = await response.json();
  
    if (response.status === 200) {
      console.log("Success:", json);
  
      // update the result
      this.setState({ jobs: json.jobs });
    
      // clear the submitting flag
      this.setState({ submitting: false });

      // move to the next step
      this.setState({ stepIndex: this.state.stepIndex + 1 });
    } else {
      console.error("Error:", json);

      // update the results
      this.setState({ error: json.error });
    
      // clear the submitting flag
      this.setState({ submitting: false });
    }
  }

  async handleJobsSubmit() {
    if (this.state.submitting) {
      return;
    }

    this.setState({ 
      error: undefined,
      submitting: true,
    });

    const response = await fetch("/api/cover_letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile: this.state.profile,
        job: this.state.jobs[this.state.selectedJobIndex || 0],
      }),
    });
  
    const json = await response.json();
  
    if (response.status === 200) {
        console.log("Success:", json);
  
        // update the result
        this.setState({ coverLetter: json.coverLetter });
    
        // clear the submitting flag
        this.setState({ submitting: false });

        // move to the next step
        this.setState({ stepIndex: this.state.stepIndex + 1 });
    } else {
        console.error("Error:", json);

        // update the results
        this.setState({ error: json.error });
    
        // clear the submitting flag
        this.setState({ submitting: false });
    }
  }

  handleNext() {
    switch(this.state.stepIndex) {
      case 0:
        this.handleProfileSubmit();
        break;
      case 1:
        this.handleJobsSubmit();
        break;
    }
  }

  handlePrevious() {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
  }

  handleSetProfile(profile: CoachProfile) {
    this.setState({ profile });
    sessionStorage.setItem('profile', JSON.stringify(profile));
  }

  handleSetSelectedJobIndex(index: number | undefined) {
    this.setState({ selectedJobIndex: index });
  }

  // function to render the component
  render() {
    const steps: {title: string, component: React.ReactNode}[] = [
      { 
        title: 'Profile', 
        component: <ProfilePage
          profile={this.state.profile}
          setProfile={(profile) => this.handleSetProfile(profile)}
        />
      },
      { 
        title: 'Jobs', 
        component: <JobsPage
          jobs={this.state.jobs}
          selectedJobIndex={this.state.selectedJobIndex}
          setSelectedJobIndex={(index) => this.handleSetSelectedJobIndex(index)}
        />
      },
      { 
        title: 'Cover Letter', 
        component: <CoverLetterPage
          coverLetter={this.state.coverLetter}
        />
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
          handleNext={() => this.handleNext()}
          handlePrevious={() => this.handlePrevious()}
          submitting={this.state.submitting}
        />

        {this.state.error && <p className="error-message">{`${this.state.error}`}</p>}
      </div>
    );
  }
}