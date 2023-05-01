import React, { Component } from "react";
import cx from "classnames";
import { Button } from "react-bootstrap";
import ContactDetails from "./ContactDetails";
import ServiceDetails from "./ServiceDetails";
import BudgetDetails from "./BudgetDetails";
import SubmitDetails from "./SubmitDetails";
import PreviewDetails from "./PreviewDetails";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      disableNextStep: true,
    };
  }

  moveStep = (next) => {
    const { currentStep, disableNextStep } = this.state;
    if (next && disableNextStep) {
      this.setState({ showErrors: true });
      return;
    }
    this.setState({
      currentStep: next ? currentStep + 1 : currentStep - 1,
      showErrors: false,
      disableNextStep: true,
    });
  };

  renderProgressBar = () => {
    const { currentStep } = this.state;
    const steps = [1, 2, 3, 4];
    return steps.map((item) => (
      <div className={cx(`progress-step`, { done: item <= currentStep })}>
        <div className="progress-step-number">{item}</div>
        {item !== steps.length && (
          <div className="progress-line">
            <div
              className={cx(`progress-active-line-${item}`, {
                active: item === currentStep,
              })}
            />
          </div>
        )}
      </div>
    ));
  };

  handleFormData = (data) => {
    this.setState({ ...this.state, ...data });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
      formData: null,
      currentStep: 1,
      disableNextStep: true,
    });
  };

  renderFormDetails = () => {
    const { currentStep, formData, showErrors } = this.state;
    switch (currentStep) {
      case 1:
        return (
          <ContactDetails
            handleFormData={this.handleFormData}
            formData={formData}
            showErrors={showErrors}
          />
        );
      case 2:
        return (
          <ServiceDetails
            handleFormData={this.handleFormData}
            formData={formData}
            showErrors={showErrors}
          />
        );
      case 3:
        return (
          <BudgetDetails
            handleFormData={this.handleFormData}
            formData={formData}
            showErrors={showErrors}
          />
        );
      case 4:
        return (
          <SubmitDetails
            handleFormData={this.handleFormData}
            formData={formData}
            handleSubmit={this.handleSubmit}
          />
        );
      default:
        return (
          <ContactDetails
            handleFormData={this.handleFormData}
            formData={formData}
            showErrors={showErrors}
          />
        );
    }
  };

  render() {
    const { currentStep, showModal, formData } = this.state;
    return (
      <div className="form-container">
        <div>
          <div className="form-heading">Get a project quote</div>
          <div className="form-subheading">
            Please fill the form below to receive a quote for your project. Feel
            free to add as much detail as needed.
          </div>
        </div>
        <div className="form-section">
          <div className="form-progressbar">{this.renderProgressBar()}</div>
          <div className="form-details">{this.renderFormDetails()}</div>
        </div>

        <div className="form-action-btns">
          {currentStep !== 1 && (
            <Button
              variant="secondary"
              className="fb-primary-btn form-prev-btn"
              onClick={() => this.moveStep(false)}
            >
              Previous step
            </Button>
          )}
          {currentStep !== 4 && (
            <Button
              className="fb-primary-btn form-next-btn"
              onClick={() => this.moveStep(true)}
            >
              Next step
            </Button>
          )}
          <PreviewDetails
            showModal={showModal}
            onCloseModal={this.onCloseModal}
            formData={formData}
          />
        </div>
      </div>
    );
  }
}

export default Form;
