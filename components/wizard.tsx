import React from 'react';

interface WizardProps {
    steps: Array<{title: string, component: React.ReactNode}>;
    stepIndex: number;
    setStepIndex: (stepIndex: number) => void;
    onComplete: () => void;
}

interface WizardState {
    isLoading: boolean;
}

export class Wizard extends React.Component<WizardProps, WizardState> {
    constructor(props: WizardProps) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    handleNext() {
        this.setState({ isLoading: true });
        this.props.setStepIndex(this.props.stepIndex + 1);
        this.setState({ isLoading: false });
    }

    handlePrevious() {
        this.setState({ isLoading: true });
        this.props.setStepIndex(this.props.stepIndex - 1);
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <div className="wizard">
                <div className="wizard-step-indicator">
                    Step {this.props.stepIndex + 1} of {this.props.steps.length}
                </div>
                <div className="wizard-step-content">
                    { this.props.steps[this.props.stepIndex].component }
                </div>
                <div className="wizard-navigation-buttons">
                    {this.props.stepIndex !== 0 && <button onClick={() => this.handlePrevious()}>Previous</button>}
                    {this.props.stepIndex !== this.props.steps.length - 1 && <button onClick={() => this.handleNext()}>Next</button>}
                    {this.props.stepIndex === this.props.steps.length - 1 && <button onClick={() => this.props.onComplete()}>Complete</button>}
                </div>
                {this.state.isLoading && <div className="wizard-loading-indicator">Loading...</div>}
            </div>
        )
    }
}
