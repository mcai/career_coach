import Head from "next/head";
import React from "react";
import { CoachProfile } from "../models/profile";
import { CoachJob } from "../models/job";
import { CoachResume } from "../models/resume";

// properties for the JobsPage component
export interface JobsPageProps {
    stepIndex: number;
    setStepIndex: (stepIndex: number) => void;
    profile: CoachProfile;
    jobs: CoachJob[];
    selectedJobIndex: number | undefined;
    setSelectedJobIndex: (index: number | undefined) => void;
    setResume: (resume: CoachResume) => void;
}

// state for the JobsPage component
export interface JobsPageState {
    error?: any;
    submitting: boolean;
}

// the JobsPage component
export default class JobsPage extends React.Component<JobsPageProps, JobsPageState> {
  constructor(props: JobsPageProps) {
    super(props);

    this.state = {
      error: undefined,
      submitting: false,
    };
  }

  // function to be called when the component is mounted
  componentDidMount() {
  }

  // function to handle changes to the radio fields
  handleJobSelectionIndexChange = (index: number) => {
    this.props.setSelectedJobIndex(index);
  }

  // function to handle the form submission
  async handleSubmit(event: any) {
    event.preventDefault();

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
        profile: this.props.profile,
        job: this.props.jobs[this.props.selectedJobIndex || 0],
      }),
    });
  
    const json = await response.json();
  
    if (response.status === 200) {
        console.log("Success:", json);
  
        // update the result
        this.props.setResume(json.resume);
    } else {
        console.error("Error:", json);

        // update the results
        this.setState({ error: json.error });
    }
    
    // clear the submitting flag
    this.setState({ submitting: false });
  }

  // function to render the component
  render() {
    return (
      <div className="custom-form">
        <Head>
          <title>Career Coach</title>
        </Head>

        <div className="mt-6">
          <h3 className="text-lg font-medium">Recommended Job Positions</h3>
          <ul className="text-gray-700 list-disc" id="results">
            {this.props.jobs?.map((job, index) => (
              <li key={index} id={`result-${index}`}>
                <p className="font-medium">{job.name}</p>
                <p className="text-gray-600">Monthly Salary: {job.monthlySalaryLowInDollar} - {job.monthlySalaryHighInDollar}</p>
                <p className="text-gray-600">Degree: {job.degree}</p>
                <p className="text-gray-600">Responsibility: {job.responsibility?.join(", ") ?? ""}</p>
                <p className="text-gray-600">Skills: {job.skills?.join(", ") ?? ""}</p>
                <p className="text-gray-600">Experience: {job.experience?.join(", ") ?? ""}</p>
                <p className="text-gray-600">Related Companies: {job.relatedCompanies?.join(", ") ?? ""}</p>
                <p className="text-gray-600">Related Products: {job.relatedProducts?.join(", ") ?? ""}</p>
                <p className="text-gray-600">Interview Questions: {job.interviewQuestions?.join(", ") ?? ""}</p>
                <div className="mt-2">
                  <input 
                    type="radio" 
                    name="selectedJobIndex" 
                    value={index} 
                    id={`job-${index}`} 
                    onChange={event => this.handleJobSelectionIndexChange(parseInt(event.target.value))}
                    checked={this.props.selectedJobIndex === index}
                  />
                  <label className="ml-2" htmlFor={`job-${index}`}>Select</label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {this.state.error && <p className="error-message">{`${this.state.error}`}</p>}
      </div>
    );
  }
}