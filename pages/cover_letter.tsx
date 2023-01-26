import Head from "next/head";
import React from "react";

// properties for the CoverLetterPage component
export interface CoverLetterPageProps {
    coverLetter?: string;
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
                <textarea 
                    value={(this.props.coverLetter ?? "").trim()} 
                    readOnly 
                    className="cover-letter-textarea h-full">
                </textarea>
            </div>
        );
    };
}