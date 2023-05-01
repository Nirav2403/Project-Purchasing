import React, { Component } from "react";
import cx from "classnames";
import { ReactComponent as Development } from "../../Svg/code.svg";
import { ReactComponent as WebDesign } from "../../Svg/web.svg";
import { ReactComponent as Marketing } from "../../Svg/mice.svg";
import { ReactComponent as Other } from "../../Svg/setting.svg";

const sevicesTypes = [
  { label: "Development", icon: Development },
  { label: "Web Design", icon: WebDesign },
  { label: "Marketing", icon: Marketing },
  { label: "Other", icon: Other },
];

class ServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { formData } = this.props || {};
    if (formData?.service) {
      this.props.handleFormData({
        disableNextStep: false,
      });
    }
  }

  handleServiceDetails = (label) => {
    const { formData } = this.props || {};
    this.props.handleFormData({
      formData: {
        ...formData,
        service: label,
      },
      disableNextStep: false,
    });
  };

  render() {
    const { formData, showErrors } = this.props || {};
    return (
      <div className="form-service-details">
        <div className="form-title">Our services</div>
        <div className="form-subtitle">
          Please select which service you are interested in.
        </div>
        <div className="service-fields form-fields">
          {sevicesTypes.map((item) => (
            <div
              className={cx("service-content-box", {
                active: item.label === formData?.service,
              })}
              onClick={() => this.handleServiceDetails(item.label)}
            >
              <item.icon />
              <div className="service-title">{item.label}</div>
            </div>
          ))}
        </div>
        {showErrors && (
          <span className="error">Please select any one service</span>
        )}
      </div>
    );
  }
}

export default ServiceDetails;
