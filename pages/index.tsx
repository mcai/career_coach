import Head from "next/head";
import React from "react";
import { CoachJob } from "../models/job";
import { CoachResume } from "../models/resume";
import { JobPage } from "./job";
import { ResumePage } from "./resume";
import { CoverLetterPage } from "./cover_letter";
import { CareerPage } from "./career";
import { languages } from "../utils/languages";

// properties for the Index component
export interface IndexProps {
}

// state for the Index component
export interface IndexState {
  stepIndex: number;
  language: string;
  career: string;
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
      language: "English",
      career: "",
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
    // load the language from session storage
    const savedLanguage = sessionStorage.getItem('language');
    if (savedLanguage) {
      this.setState({ language: savedLanguage });
    }

    // load the career from session storage
    const savedCareer = sessionStorage.getItem('career');
    if (savedCareer) {
      this.setState({ career: savedCareer });
    }

    // load the resume from session storage
    const savedResume = JSON.parse(sessionStorage.getItem('resume') ?? "{}");
    if (savedResume) {
      this.setState({ resume: savedResume });
    }

    // load the job from session storage
    const savedJob = JSON.parse(sessionStorage.getItem('job') ?? "{}");
    if (savedJob) {
      this.setState({ job: savedJob });
    }

    // load the cover letter from session storage
    const savedCoverLetter = sessionStorage.getItem('coverLetter');
    if (savedCoverLetter) {
      this.setState({ coverLetter: savedCoverLetter });
    }

    // load the step index from session storage
    const savedStepIndex = sessionStorage.getItem('stepIndex');
    if (savedStepIndex) {
      this.setState({ stepIndex: parseInt(savedStepIndex) });
    }
  }

  private async fetch(url: string, body: any, stateKey: string, setStateFn: (data: any) => void) {
    if (this.state.submitting) {
      return;
    }

    this.setState({
      error: undefined,
      submitting: true,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (response.status === 200) {
      console.log("Success:", json);

      // update the result
      setStateFn(json[stateKey]);

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

  async fetchCareer() {
    await this.fetch(
      "/api/career",
      {
        language: this.state.language
      },
      'career',
      career => this.setCareer(career)
    )
  }

  async fetchResume() {
    await this.fetch(
      "/api/resume", 
      {
        career: this.state.career,
        language: this.state.language
      }, 
      'resume', 
      resume => this.setResume(resume)
    )
  }

  async fetchJob() {
    await this.fetch(
      "/api/job", 
      { 
        resume: this.state.resume,
        language: this.state.language
      }, 
      'job', 
      job => this.setJob(job)
    )
  }

  async fetchCoverLetter() {
    await this.fetch(
      "/api/cover_letter", 
      { 
        resume: this.state.resume,
        job: this.state.job,
        language: this.state.language
      },
      'coverLetter', 
      coverLetter => this.setCoverLetter(coverLetter)
    )
  }

  handleNext() {
    this.setStepIndex(this.state.stepIndex + 1);
  }

  handlePrevious() {
    this.setStepIndex(this.state.stepIndex - 1);
  }

  handleComplete() {
    this.setStepIndex(0);
  }

  setLanguage(language: string) {
    this.setState({ language: language });
    sessionStorage.setItem('language', language);
  }

  setCareer(career: string) {
    this.setState({ career: career });
    sessionStorage.setItem('career', career);
  }

  setResume(resume: CoachResume) {
    this.setState({ resume: resume });
    sessionStorage.setItem('resume', JSON.stringify(resume));
  }

  setJob(job: CoachJob) {
    this.setState({ job: job });
    sessionStorage.setItem('job', JSON.stringify(job));
  }

  setCoverLetter(coverLetter: string) {
    this.setState({ coverLetter: coverLetter });
    sessionStorage.setItem('coverLetter', coverLetter);
  }

  setStepIndex(stepIndex: number) {
    this.setState({ stepIndex: stepIndex });
    sessionStorage.setItem('stepIndex', stepIndex.toString());
  }

  // function to handle the random button
  handleRandom() {
    switch (this.state.stepIndex) {
      case 0:
        this.fetchCareer();
        break;
      case 1:
        this.fetchResume();
        break;
      case 2:
        this.fetchJob();
        break;
      case 3:
        this.fetchCoverLetter();
        break;
      default:
        break;
    }
  }

  // function to handle the reset button
  handleReset() {
    switch (this.state.stepIndex) {
      case 0:
        this.setCareer("");
      case 1:
        this.setResume({
          name: "",
          phoneNumber: "",
          email: "",
          address: "",
          linkedIn: "",
          education: [],
          workExperience: [],
          skills: [],
        });
        break;
      case 2:
        this.setJob({
          title: "",
          company: "",
          location: "",
          hiringManager: "",
          description: "",
          responsibility: [],
          qualifications: [],
          salary: 0,
          type: "",
        });
        break;
      case 3:
        this.setCoverLetter("");
        break;
      default:
        break;
    }
  }

  // function to render the component
  render() {
    const steps: {title: string, component: React.ReactNode}[] = [
      {
        title: 'Career',
        component: <CareerPage
          career={this.state.career}
          setCareer={(career) => this.setCareer(career)}
        />
      },
      { 
        title: 'Resume', 
        component: <ResumePage
          resume={this.state.resume}
          setResume={(resume) => this.setResume(resume)}
        />
      },
      { 
        title: 'Job', 
        component: <JobPage
          job={this.state.job}
          setJob={(job) => this.setJob(job)}
        />
      },
      { 
        title: 'Cover Letter', 
        component: <CoverLetterPage
          coverLetter={this.state.coverLetter}
          setCoverLetter={(coverLetter) => this.setCoverLetter(coverLetter)}
        />
      },
    ];

    return (
      <div>
        <Head>
          <title>Career Coach</title>
        </Head>

        <div className="custom-form">
          <div className="flex items-center justify-between">
            <div className="w-1/5">
              <select 
                className="custom-form-select"
                value={this.state.language}
                onChange={(e) => this.setLanguage(e.target.value)}
              >
                {
                  languages.map(language => {
                    return (
                      <option key={language.code} value={language.name}>{language.text}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className="w-2/5 text-center">
              <h3 className="custom-header">Step {this.state.stepIndex + 1} of {steps.length} - {steps[this.state.stepIndex].title}</h3>
            </div>

            <div className="w-2/5 flex justify-end">
              <button onClick={() => this.handleReset()} className={`custom-form-button ${this.state.submitting ? 'disabled-button' : 'reset-button'} mr-2`}>Reset</button>
              <button onClick={() => this.handleRandom()} className={`custom-form-button ${this.state.submitting ? 'disabled-button' : 'random-button'} mr-2`}>Random</button>

              {this.state.stepIndex !== 0 && <button
                  className={`custom-form-button ${this.state.submitting ? 'disabled-button' : 'custom-form-button-primary'} mr-2`} 
                  disabled={this.state.submitting}
                  onClick={() => this.handlePrevious()}
              >
                  Previous
              </button>}
              {this.state.stepIndex !== steps.length - 1 && <button
                  className={`custom-form-button ${this.state.submitting ? 'disabled-button' : 'custom-form-button-primary'} mr-2`} 
                  disabled={this.state.submitting}
                  onClick={() => this.handleNext()}
              >
                  Next
              </button>}
              {this.state.stepIndex === steps.length - 1 && <button 
                  className={`custom-form-button ${this.state.submitting ? 'disabled-button' : 'custom-form-button-primary'} mr-2`} 
                  disabled={this.state.submitting}
                  onClick={() => this.handleComplete()}
              >
                  Complete
              </button>}
            </div>
          </div>
        </div>

        {this.state.error && <p className="error-message">{`${this.state.error}`}</p>}

        { steps[this.state.stepIndex].component }
      </div>
    );
  }
}