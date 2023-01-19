import Head from "next/head";
import React from "react";
import { CoachDetails, CoachResult, exampleDetailsList } from "../models/details";
import { ItemList } from "../components/item_list";

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
        experience: [],
        skills: [],
        interests: [],
      },
      result: [],
      submitting: false,
    };
  }

  componentDidMount() {
    this.setState({ details: exampleDetailsList[0] });
  }

  handleChange(name: string, value: any) {
    this.setState({
      details: {
        ...this.state.details,
        [name]: value,
      }
    });
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.handleChange(name, value);
  }

  handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.handleChange(name, value);
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

          <label className="custom-form-label">Skills</label>
          <ItemList 
            items={this.state.details.skills}
            onChange={skills => this.handleChange("skills", skills)}
          />

          <label className="custom-form-label">Experience</label>
          <ItemList 
            items={this.state.details.experience}
            onChange={experience => this.handleChange("experience", experience)}
          />

          <label className="custom-form-label">Interests</label>
          <ItemList 
            items={this.state.details.interests}
            onChange={interests => this.handleChange("interests", interests)}
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
                <p className="text-gray-600">Monthly Salary: {job.monthlySalaryLowInDollar} - {job.monthlySalaryHighInDollar}</p>
                <p className="text-gray-600">Degree: {job.degree}</p>
                <p className="text-gray-600">Responsibility: {job.responsibility?.join(", ") ?? ""}</p>
                <p className="text-gray-600">Skills: {job.skills?.join(", ") ?? ""}</p>
                <p className="text-gray-600">Experience: {job.experience?.join(", ") ?? ""}</p>
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