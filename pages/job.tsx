import Head from "next/head";
import React from "react";
import { CoachJob } from "../models/job";

// properties for the JobPage component
export interface JobPageProps {
    job: CoachJob;
    fetchJob: () => void;
    setJob: (job: CoachJob) => void;
}

// state for the JobPage component
export interface JobPageState {
}

// the JobPage component
export class JobPage extends React.Component<JobPageProps, JobPageState> {
  constructor(props: JobPageProps) {
    super(props);

    this.state = {
    };
  }

  // function to handle changes to the resume
  handleChange(name: string, value: any) {
    const newJob: CoachJob = {
      ...(this.props.job ?? {}),
      [name]: value,
    };

    this.props.setJob(newJob);
  }

  // function to handle changes to the input fields
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.handleChange(name, value);
  }

  // function to handle the random button
  handleRandom() {
    this.props.fetchJob();
  }

  // function to handle the reset button
  handleReset() {
    const newJob: CoachJob = {
      title: "",
      company: "",
      location: "",
      hiringManager: "",
      description: "",
      responsibility: [],
      qualifications: [],
      salary: 0,
      type: "",
    };

    this.props.setJob(newJob);
  }

  // function to render the component
  render() {
    return (
      <div className="custom-form">
        <Head>
          <title>Career Coach</title>
        </Head>

        <div className="flex justify-between">
          <h3 className="custom-header">Career Coach</h3>
          <div>
            <button onClick={() => this.handleRandom()} className="random-button mx-2">Random</button>
            <button onClick={() => this.handleReset()} className="reset-button">Reset</button>
          </div>
        </div>

        <div className="mt-4">
          <div className="custom-form-group">
            <div className="custom-form-group-one-third">
              <label htmlFor="title">Job Title</label>
              <input
                className="custom-form-input"
                id="name"
                name="name"
                type="text"
                value={this.props.job.title}
                onChange={event => this.handleInputChange(event)}
              />
            </div>

            <div className="custom-form-group-one-third">
              <label htmlFor="company">Company</label>
              <input
                className="custom-form-input"
                id="company"
                name="company"
                type="text"
                value={this.props.job.company}
                onChange={event => this.handleInputChange(event)}
              />
            </div>

            <div className="custom-form-group-one-third">
              <label htmlFor="location">Location</label>
              <input
                className="custom-form-input"
                id="location"
                name="location"
                type="text"
                value={this.props.job.location}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}