import React from "react";

// properties for the CareerPage component
export interface CareerPageProps {
  career: string;
  setCareer: (career: string) => void;
}

// state for the CareerPage component
export interface CareerPageState {
}

// the CareerPage component
export class CareerPage extends React.Component<CareerPageProps, CareerPageState> {
  constructor(props: CareerPageProps) {
    super(props);

    this.state = {
    };
  }

  // function to render the component
  render() {
    return (
      <div className="h-screen custom-form">
        <div>
          <div className="custom-form-group">
            <div className="custom-form-group-full">
              <input
                className="custom-form-input"
                id="career"
                name="career"
                value={this.props.career}
                onChange={event => {this.props.setCareer(event.target.value)}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
}