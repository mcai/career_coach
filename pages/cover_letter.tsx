import Head from "next/head";
import React from "react";

// properties for the CoverLetterPage component
export interface CoverLetterPageProps {
  coverLetter: string;
  fetchCoverLetter: () => void;
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

  // function to handle the random button
  handleRandom() {
    this.props.fetchCoverLetter();
  }

  // function to handle the reset button
  handleReset() {
    this.props.setCoverLetter("");
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