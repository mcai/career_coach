import Head from "next/head";
import React from "react";

// properties for the CoverLetterPage component
export interface CoverLetterPageProps {
  coverLetter: string;
  setCoverLetter: (coverLetter: string) => void;
}

// state for the CoverLetterPage component
export interface CoverLetterPageState {
}

// the CoverLetterPage component
export class CoverLetterPage extends React.Component<CoverLetterPageProps, CoverLetterPageState> {
  constructor(props: CoverLetterPageProps) {
    super(props);

    this.state = {
    };
  }

  // function to render the component
  render() {
    return (
      <div className="h-screen custom-form">
        <div className="h-full">
          <textarea 
            value={(this.props.coverLetter ?? "").trim()} 
            className="cover-letter-textarea h-full"
            onChange={(event) => {this.props.setCoverLetter(event.target.value)}} 
          />
        </div>
      </div>
    );
  };
}