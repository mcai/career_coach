import Head from "next/head";
import React from "react";
import { ItemList } from "../components/item_list";
import { CoachJob } from "../models/job";

// properties for the JobPage component
export interface JobPageProps {
    job: CoachJob;
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

  // function to render the component
  render() {
    return (
      <div className="custom-form">
        <div className="mt-4">
          <div className="custom-form-group">
            <div className="custom-form-group-half">
              <label htmlFor="title">Job Title</label>
              <input
                className="custom-form-input"
                id="title"
                name="title"
                type="text"
                value={this.props.job.title}
                onChange={event => this.handleInputChange(event)}
              />
            </div>

            <div className="custom-form-group-half">
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
          </div>

          <div className="custom-form-group">
            <div className="custom-form-group-half">
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

            <div className="custom-form-group-half">
              <label htmlFor="hiringManager">Hiring Manager</label>
              <input
                className="custom-form-input"
                id="hiringManager"
                name="hiringManager"
                type="text"
                value={this.props.job.hiringManager}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
          </div>

          <div className="custom-form-group">
            <div className="custom-form-group-full">
              <label htmlFor="description">Description</label>
              <input
                className="custom-form-input"
                id="description"
                name="description"
                type="text"
                value={this.props.job.description}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
          </div>

          <label className="custom-form-label">Responsibility</label>
          <ItemList 
            items={this.props.job.responsibility}
            onChange={responsibility => this.handleChange("responsibility", responsibility)}
          />

          <label className="custom-form-label">Qualifications</label>
          <ItemList 
            items={this.props.job.qualifications}
            onChange={qualifications => this.handleChange("qualifications", qualifications)}
          />

          <div className="custom-form-group">
            <div className="custom-form-group-half">
              <label htmlFor="salary">Salary</label>
              <input
                className="custom-form-input"
                id="salary"
                name="salary"
                type="number"
                value={this.props.job.salary}
                onChange={event => this.handleInputChange(event)}
              />
            </div>

            <div className="custom-form-group-half">
              <label htmlFor="type">Type</label>
              <input
                className="custom-form-input"
                id="type"
                name="type"
                type="text"
                value={this.props.job.type}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}