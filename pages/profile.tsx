import Head from "next/head";
import React from "react";
import { CoachProfile, exampleProfilesList } from "../models/profile";
import { ItemList } from "../components/item_list";

// properties for the ProfilePage component
export interface ProfilePageProps {
    profile: CoachProfile;
    setProfile: (profile: CoachProfile) => void;
}

// state for the ProfilePage component
export interface ProfilePageState {
}

// the ProfilePage component
export class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {
  constructor(props: ProfilePageProps) {
    super(props);

    this.state = {
    };
  }

  // function to handle changes to the profile
  handleChange(name: string, value: any) {
    const newProfile: CoachProfile = {
      ...this.props.profile,
      [name]: value,
    };

    this.props.setProfile(newProfile);
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
  handleReset = () => {
    const newProfile: CoachProfile = {
      name: "John Doe",
      gender: "Male",
      age: 25,
      experience: [],
      skills: [],
      interests: [],
    };

    this.setState({
      error: "",
      submitting: false,
    });

    this.props.setProfile(newProfile);
  }

  // function to handle the random button
  handleRandom() {
    const randomIndex = Math.floor(Math.random() * exampleProfilesList.length);
    const newProfile = exampleProfilesList[randomIndex];

    this.props.setProfile(newProfile);
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
                value={this.props.profile.name}
                onChange={event => this.handleInputChange(event)}
              />
            </div>

            <div className="custom-form-group-one-third">
              <label className="custom-form-label" htmlFor="gender">Gender</label>
              <select
                className="custom-form-select"
                id="gender"
                name="gender"
                value={this.props.profile.gender}
                onChange={event => this.handleSelectChange(event)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="custom-form-group-one-third">
              <label className="custom-form-label" htmlFor="age">Age</label>
              <input
                className="custom-form-input"
                id="age"
                name="age"
                type="number"
                value={this.props.profile.age}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
          </div>

          <label className="custom-form-label">Skills</label>
          <ItemList 
            items={this.props.profile.skills}
            onChange={skills => this.handleChange("skills", skills)}
          />

          <label className="custom-form-label">Experience</label>
          <ItemList 
            items={this.props.profile.experience}
            onChange={experience => this.handleChange("experience", experience)}
          />

          <label className="custom-form-label">Interests</label>
          <ItemList 
            items={this.props.profile.interests}
            onChange={interests => this.handleChange("interests", interests)}
          />
        </div>
      </div>
    );
  }
}