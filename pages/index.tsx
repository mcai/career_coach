import Head from "next/head";
import React from "react";
import { CoachDetails, CoachResult, exampleDetailsList } from "./details";

export interface IndexProps {
}

export interface IndexState {
  details: CoachDetails;
  result: CoachResult[];
}

export default class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);

    this.state = {
      details: {
        gender: "",
        age: "",
        country: "",
        career: "",
        educationExperience: "",
        workExperience: "",
        hobbies: "",
        interests: "",
      },
      result: [],
    };
  }

  componentDidMount() {
    this.setState({ details: exampleDetailsList[0] });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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

  async handleSubmit(event: any) {
    event.preventDefault();
  
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
  
    // clear the form
    event.target.reset();
  }

  render() {
    return (
      <div className="p-6">
        <Head>
          <title>Career Coach</title>
        </Head>

        <h3 className="text-2xl font-medium">
          Career Coach
        </h3>

        <form className="mt-4" onSubmit={this.handleSubmit.bind(this)}>
          <label className="block font-medium text-gray-700" htmlFor="gender">Gender</label>
          <input
            className="bg-gray-200 rounded-lg p-2 w-full"
            id="gender"
            name="gender"
            type="text"
            value={this.state.details.gender}
            onChange={this.handleChange}
          />

          <label className="block font-medium text-gray-700" htmlFor="age">Age</label>
          <input
            className="bg-gray-200 rounded-lg p-2 w-full"
            id="age"
            name="age"
            type="text"
            value={this.state.details.age}
            onChange={this.handleChange}
          />

          <label className="block font-medium text-gray-700" htmlFor="country">Country</label>
          <input
            className="bg-gray-200 rounded-lg p-2 w-full"
            id="country"
            name="country"
            type="text"
            value={this.state.details.country}
            onChange={this.handleChange}
          />

          <label className="block font-medium text-gray-700" htmlFor="career">Career</label>
          <input
            className="bg-gray-200 rounded-lg p-2 w-full"
            id="career"
            name="career"
            type="text"
            value={this.state.details.career}
            onChange={this.handleChange}
          />

          <label className="block font-medium text-gray-700" htmlFor="educationExperience">Educational Experiences</label>
          <input
            className="bg-gray-200 rounded-lg p-2 w-full"
            id="educationExperience"
            name="educationExperience"
            type="text"
            value={this.state.details.educationExperience}
            onChange={this.handleChange}
          />

          <label className="block font-medium text-gray-700" htmlFor="workExperience">Work Experiences</label>
          <input
            className="bg-gray-200 rounded-lg p-2 w-full"
            id="workExperience"
            name="workExperience"
            type="text"
            value={this.state.details.workExperience}
            onChange={this.handleChange}
          />

          <label className="block font-medium text-gray-700" htmlFor="hobbies">Hobbies</label>
          <input
            className="bg-gray-200 rounded-lg p-2 w-full"
            id="hobbies"
            name="hobbies"
            type="text"
            value={this.state.details.hobbies}
            onChange={this.handleChange}
          />

          <label className="block font-medium text-gray-700" htmlFor="interests">Interests</label>
          <input
            className="bg-gray-200 rounded-lg p-2 w-full"
            id="interests"
            name="interests"
            type="text"
            value={this.state.details.interests}
            onChange={this.handleChange}
          />

          <button type="submit" className="mt-4 bg-indigo-500 text-white rounded-lg p-2 hover:bg-indigo-600">Submit</button>
          <button type="reset" className="ml-2 mt-4 bg-gray-300 text-gray-800 rounded-lg p-2 hover:bg-gray-400">Clear</button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-medium">Recommended Job Positions</h3>
          <ul className="text-gray-700 list-disc">
            {this.state.result.map((job, index) => (
              <li key={index}>
                <p className="font-medium">{job.name}</p>
                <p className="text-gray-600">{job.description}</p>
                <p className="text-red-500">Missing Skills: {job.missingSkills}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}