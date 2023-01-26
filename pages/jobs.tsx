import Head from "next/head";
import React from "react";
import { CoachJob } from "../models/job";

// properties for the JobsPage component
export interface JobsPageProps {
    jobs: CoachJob[];
    selectedJobIndex: number | undefined;
    setSelectedJobIndex: (index: number | undefined) => void;
}

// state for the JobsPage component
export interface JobsPageState {
}

// the JobsPage component
export class JobsPage extends React.Component<JobsPageProps, JobsPageState> {
  constructor(props: JobsPageProps) {
    super(props);

    this.state = {
    };
  }

  // function to be called when the component is mounted
  componentDidMount() {
  }

  // function to handle changes to the radio fields
  handleJobSelectionIndexChange = (index: number) => {
    this.props.setSelectedJobIndex(index);
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
      </div>
    );
  }
}