import React, { Component } from "react";
import cx from "classnames";

const budgetList = [
  { label: "$5.000 - $10.000" },
  { label: "$10.000 - $20.000" },
  { label: "$20.000 - $50.000" },
  { label: "$50.000 +" },
];

class BudgetDetails extends Component {
  componentDidMount() {
    const { formData } = this.props || {};
    if (formData?.budget) {
      this.props.handleFormData({
        formData: {
          ...formData,
          budget: formData?.budget,
        },
        disableNextStep: false,
      });
    }
  }

  handleBudgetDetails = (label) => {
    const { formData } = this.props || {};
    this.props.handleFormData({
      formData: {
        ...formData,
        budget: label,
      },
      disableNextStep: false,
    });
  };

  render() {
    const { formData, showErrors } = this.props || {};
    return (
      <div className="form-budget-details">
        <div className="form-title">What’s your project budget?</div>
        <div className="form-subtitle">
          Please select the project budget range you have in mind.
        </div>
        <div className="service-fields form-fields">
          {budgetList.map((item, index) => (
            <label className="budget-label" htmlFor={`budget-${index}`}>
              <div
                className={cx("service-content-box", {
                  active: item.label === formData?.budget,
                })}
                onClick={() => this.handleBudgetDetails(item.label)}
              >
                <input
                  id={`budget-${index}`}
                  type="radio"
                  checked={item.label === formData?.budget}
                />
                <div className="service-title">{item.label}</div>
              </div>
            </label>
          ))}
        </div>
        {showErrors && <span className="error">Please select budget</span>}
      </div>
    );
  }
}

export default BudgetDetails;
