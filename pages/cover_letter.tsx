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
      <div className="custom-form">
        <div className="mt-4">
          <textarea 
            value={(this.props.coverLetter ?? "").trim()} 
            readOnly 
            className="cover-letter-textarea h-full"
            onChange={(event) => {this.props.setCoverLetter(event.target.value)}} 
          />
        </div>
      </div>
    );
  };
}