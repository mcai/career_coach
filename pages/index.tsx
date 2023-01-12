import Head from "next/head";
import React from "react";

export interface IndexProps {
}

export interface IndexState {
  result: string;
}

export default class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);

    this.state = {
      result: "",
    };
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    
    // get the form data out of state
    const details = event.target.details.value;
  
    const response = await fetch("/api/coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ details }),
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
      <div>
        <Head>
          <title>Career Coach</title>
        </Head>

        <main>
          <h3>
            Give us a few details about yourself and we'll help you find the right career for you.
          </h3>

          <form onSubmit={this.handleSubmit.bind(this)}>
            {/* a text area for the user to enter their details */}
            <label htmlFor="details">Details</label>
            <textarea id="details" name="details" />

            {/* a submit button */}
            <button type="submit">Submit</button>

            {/* a button to clear the form */}
            <button type="reset">Clear</button>
          </form>

          <div>
            <h3>Result</h3>
            <p>Here are the result of your career coach</p>
            <p>{this.state?.result}</p>
          </div>
        </main>
      </div>
    );
  }
}