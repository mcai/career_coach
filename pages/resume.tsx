import Head from "next/head";
import React from "react";
import { CoachResume } from "../models/resume";
import { ItemList } from "../components/item_list";

// properties for the ResumePage component
export interface ResumePageProps {
    resume: CoachResume;
    fetchResume: () => void;
    setResume: (resume: CoachResume) => void;
}

// state for the ResumePage component
export interface ResumePageState {
}

// the ResumePage component
export class ResumePage extends React.Component<ResumePageProps, ResumePageState> {
  constructor(props: ResumePageProps) {
    super(props);

    this.state = {
    };
  }

  // function to handle changes to the resume
  handleChange(name: string, value: any) {
    const newResume: CoachResume = {
      ...this.props.resume,
      [name]: value,
    };

    this.props.setResume(newResume);
  }

  // function to handle changes to the input fields
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.handleChange(name, value);
  }

  // function to handle changes to the select fields
  handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.handleChange(name, value);
  }

  // function to handle the reset button
  handleReset() {
    const newResume: CoachResume = {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      linkedIn: "",
      education: [],
      workExperience: [],
      skills: [],
    };

    this.props.setResume(newResume);
  }

  // function to handle the random button
  handleRandom() {
    this.props.fetchResume();
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
              <label className="custom-form-label" htmlFor="name">Name</label>
              <input
                className="custom-form-input"
                id="name"
                name="name"
                type="text"
                value={this.props.resume.name}
                onChange={event => this.handleInputChange(event)}
              />
            </div>

            <div className="custom-form-group-one-third">
              <label className="custom-form-label" htmlFor="phoneNumber">Phone Number</label>
              <input
                className="custom-form-input"
                id="phoneNumber"
                name="phoneNumber"
                value={this.props.resume.phoneNumber}
                onChange={event => this.handleInputChange(event)}
              />
            </div>

            <div className="custom-form-group-one-third">
              <label className="custom-form-label" htmlFor="email">Email</label>
              <input
                className="custom-form-input"
                id="email"
                name="email"
                value={this.props.resume.email}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
          </div>

          <div className="custom-form-group">
            <div className="custom-form-group-half">
              <label className="custom-form-label" htmlFor="address">Address</label>
              <input
                className="custom-form-input"
                id="address"
                name="address"
                value={this.props.resume.address}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
            <div className="custom-form-group-half">
              <label className="custom-form-label" htmlFor="linkedIn">LinkedIn</label>
              <input
                className="custom-form-input"
                id="linkedIn"
                name="linkedIn"
                value={this.props.resume.linkedIn}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
          </div>

          <label className="custom-form-label">Education</label>
          <ItemList 
            items={this.props.resume.education}
            onChange={education => this.handleChange("education", education)}
          />

          <label className="custom-form-label">Work Experience</label>
          <ItemList 
            items={this.props.resume.workExperience}
            onChange={workExperience => this.handleChange("workExperience", workExperience)}
          />

          <label className="custom-form-label">Skills</label>
          <ItemList 
            items={this.props.resume.skills}
            onChange={skills => this.handleChange("skills", skills)}
          />
        </div>
      </div>
    );
  }
}