import Head from "next/head";
import React from "react";
import { CoachCoverLetter } from "../models/cover_letter";

// properties for the CoverLetterPage component
export interface CoverLetterPageProps {
    coverLetter?: CoachCoverLetter;
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
            <div>
                <Head>
                    <title>Cover Letter</title>
                </Head>
                <h1>Cover Letter</h1>
                <p>Here is your cover letter:</p>
                <pre>{this.props.coverLetter?.content ?? ""}</pre>
            </div>
        );
    };
}