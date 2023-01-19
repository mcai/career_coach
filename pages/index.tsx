import Head from "next/head";
import React from "react";
import { CoachDetails, CoachResult, exampleDetailsList } from "./details";

export interface IndexProps {
}

export interface IndexState {
  details: CoachDetails;
  result: CoachResult[];
  submitting: boolean;
}

export default class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);

    this.state = {
      details: {
        gender: "",
        age: "",
        country: "",
        currentJob: "",
        educationExperience: "",
        workExperience: "",
        hobbies: "",
        interests: "",
      },
      result: [],
      submitting: false,
    };
  }

  componentDidMount() {
    this.setState({ details: exampleDetailsList[0] });
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      details: {
        ...this.state.details,
        [name]: value,
      }
    });
  }

  handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log(`name: ${name}, value: ${value}`);

    this.setState({
      details: {
        ...this.state.details,
        [name]: value,
      }
    });
  }

  async handleSubmit(event: any) {
    event.preventDefault();

    if (this.state.submitting) {
      return;
    }

    // set the submitting flag
    this.setState({ submitting: true });

    // update the result
    this.setState({ result: [] });
  
    const response = await fetch("/api/coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        details: this.state.details,
      }),
    });
  
    const data = await response.json();
  
    if (response.status === 200) {
      console.log("Success:", data);
  
      // update the result
      this.setState({ result: data.result });
    } else {
      console.error("Error:", data);

      // update the results
      this.setState({ result: data.error });
    }
    
    // clear the submitting flag
    this.setState({ submitting: false });

    // scroll to the results
    const results = document.getElementById("results");
    if (results) {
      results.scrollIntoView({ behavior: "smooth" });
    }

    // focus on the results
    const firstResult = document.getElementById("result-0");
    if (firstResult) {
      firstResult.focus();
    }
  }

  render() {
    return (
      <div className="custom-form">
        <Head>
          <title>Career Coach</title>
        </Head>

        <h3 className="custom-header">
          Career Coach
        </h3>

        <form className="mt-4" onSubmit={event => this.handleSubmit(event)}>
          <div className="custom-form-group">
            <div className="custom-form-group-half">
              <label className="custom-form-label" htmlFor="gender">Gender</label>
              <select
                className="custom-form-select"
                id="gender"
                name="gender"
                value={this.state.details.gender}
                onChange={event => this.handleSelectChange(event)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="custom-form-group-half">
              <label className="custom-form-label" htmlFor="age">Age</label>
              <input
                className="custom-form-input"
                id="age"
                name="age"
                type="number"
                value={this.state.details.age}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
          </div>

          <div className="custom-form-group">
            <div className="custom-form-group-half">
              <label className="custom-form-label" htmlFor="country">Country</label>
              <select
                className="custom-form-select"
                id="country"
                name="country"
                value={this.state.details.country}
                onChange={event => this.handleSelectChange(event)}
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
              </select>
            </div>

            <div className="custom-form-group-half">
              <label className="custom-form-label" htmlFor="currentJob">Current Job</label>
              <select
                className="custom-form-select"
                id="currentJob"
                name="currentJob"
                value={this.state.details.currentJob}
                onChange={event => this.handleSelectChange(event)}
              >
                <option value="Software Developer">Software Developer</option>
                <option value="Hardware Developer">Hardware Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <label className="custom-form-label" htmlFor="educationExperience">Educational Experiences</label>
          <input
            className="custom-form-input"
            id="educationExperience"
            name="educationExperience"
            type="text"
            value={this.state.details.educationExperience}
            onChange={event => this.handleInputChange(event)}
          />

          <label className="custom-form-label" htmlFor="workExperience">Work Experiences</label>
          <input
            className="custom-form-input"
            id="workExperience"
            name="workExperience"
            type="text"
            value={this.state.details.workExperience}
            onChange={event => this.handleInputChange(event)}
          />

          <label className="custom-form-label" htmlFor="hobbies">Hobbies</label>
          <input
            className="custom-form-input"
            id="hobbies"
            name="hobbies"
            type="text"
            value={this.state.details.hobbies}
            onChange={event => this.handleInputChange(event)}
          />

          <label className="custom-form-label" htmlFor="interests">Interests</label>
          <input
            className="custom-form-input"
            id="interests"
            name="interests"
            type="text"
            value={this.state.details.interests}
            onChange={event => this.handleInputChange(event)}
          />

          <button type="submit" className="custom-form-button custom-form-button-primary" disabled={this.state.submitting}>
            Submit
          </button>
          <button type="reset" className="custom-form-button custom-form-button-secondary ml-2" disabled={this.state.submitting}>
            Clear
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-medium">Recommended Job Positions</h3>
          <ul className="text-gray-700 list-disc" id="results">
            {this.state.result?.map((job, index) => (
              <li key={index} id={`result-${index}`}>
                <p className="font-medium">{job.name}</p>
                <p className="text-gray-600">Monthly Salary: {job.requirements.monthlySalaryLowInDollar} - {job.requirements.monthlySalaryHighInDollar}</p>
                <p className="text-gray-600">Degree: {job.requirements.degree}</p>
                <p className="text-gray-600">Responsibility: {job.requirements.responsibility}</p>
                <p className="text-gray-600">Experience: {job.requirements.experience}</p>
                <p className="text-gray-600">Skills: {job.requirements.skills?.join(", ") ?? ""}</p>
                <p className="text-gray-600">Related Companies: {job.relatedCompanies?.join(", ") ?? ""}</p>
                <p className="text-gray-600">Related Products: {job.relatedProducts?.join(", ") ?? ""}</p>
                <p className="text-gray-600">Interview Questions: {job.interviewQuestions?.join(", ") ?? ""}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}