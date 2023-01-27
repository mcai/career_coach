import Head from "next/head";
import React from "react";
import { Wizard } from "../components/wizard";
import { CoachJob } from "../models/job";
import { CoachResume } from "../models/resume";
import { JobPage } from "./job";
import { ResumePage } from "./resume";
import { CoverLetterPage } from "./cover_letter";

// properties for the Index component
export interface IndexProps {
}

// state for the Index component
export interface IndexState {
  stepIndex: number;
  resume: CoachResume;
  job: CoachJob;
  coverLetter: string;
  error?: any;
  submitting: boolean;
}

// the Index component
export default class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);

    this.state = {
      stepIndex: 0,
      resume: {
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        linkedIn: "",
        education: [],
        workExperience: [],
        skills: [],
      },
      job: {
        title: "",
        company: "",
        location: "",
        hiringManager: "",
        description: "",
        responsibility: [],
        qualifications: [],
        salary: 0,
        type: "",
      },
      coverLetter: "",
      error: undefined,
      submitting: false,
    };
  }

  // function to be called when the component is mounted
  componentDidMount() {
    // load the resume from session storage
    const savedResume = JSON.parse(sessionStorage.getItem('resume') ?? "{}");
    if (savedResume) {
      this.setState({ resume: savedResume });
    }
  }

  async fetchResume() {
    if (this.state.submitting) {
      return;
    }

    this.setState({
      error: undefined,
      submitting: true,
    });

    const response = await fetch("/api/resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      }),
    });

    const json = await response.json();

    if (response.status === 200) {
      console.log("Success:", json);

      // update the result
      this.setState({ resume: json.resume });

      // clear the submitting flag
      this.setState({ submitting: false });
    } else {
      console.error("Error:", json);

      // update the results
      this.setState({ error: json.error });

      // clear the submitting flag
      this.setState({ submitting: false });
    }
  }

  async fetchJob() {
    if (this.state.submitting) {
      return;
    }

    this.setState({ 
      error: undefined,
      submitting: true,
    });

    const response = await fetch("/api/job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        resume: this.state.resume,
      }),
    });
  
    const json = await response.json();
  
    if (response.status === 200) {
      console.log("Success:", json);
  
      // update the result
      this.setState({ job: json.job });
    
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

  async fetchCoverLetter() {
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
        resume: this.state.resume,
        job: this.state.job,
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
        this.fetchJob();
        break;
      case 1:
        this.fetchCoverLetter();
        break;
    }
  }

  handlePrevious() {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
  }

  handleComplete() {
    this.setState({ stepIndex: 0 });
  }

  handleSetResume(resume: CoachResume) {
    this.setState({ resume: resume });
    sessionStorage.setItem('resume', JSON.stringify(resume));
  }

  // function to render the component
  render() {
    const steps: {title: string, component: React.ReactNode}[] = [
      { 
        title: 'Resume', 
        component: <ResumePage
          resume={this.state.resume}
          fetchResume={() => this.fetchResume()}
          setResume={(resume) => this.handleSetResume(resume)}
        />
      },
      { 
        title: 'Job', 
        component: <JobPage
          job={this.state.job}
          fetchJob={() => this.fetchJob()}
          setJob={(job) => this.setState({ job: job })}
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
          onComplete={() => this.handleComplete()}
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