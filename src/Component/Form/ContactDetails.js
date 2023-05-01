import React, { Component } from "react";
import cx from "classnames";
import { ReactComponent as PersonIcon } from "../../Svg/person.svg";
import { ReactComponent as MailIcon } from "../../Svg/mail.svg";
import { ReactComponent as PhoneIcon } from "../../Svg/phone.svg";
import { ReactComponent as CompanyIcon } from "../../Svg/company.svg";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        email: "",
        phoneNumber: "",
        company: "",
      },
      validation: {},
    };
  }

  componentDidMount() {
    const { formData } = this.props || {};
    if (formData) {
      this.setState({ data: formData });
      this.props.handleFormData({
        disableNextStep: false,
      });
    }
  }

  handleValidation = (name, value) => {
    let validation = { ...this.state.validation };
    if (!value) {
      validation = {
        ...validation,
        [name]: {
          error: true,
          errorMessage: `Please Enter ${
            name === "phoneNumber"
              ? "phone Number"
              : name === "company"
              ? "company name"
              : name
          }`,
        },
      };
    } else if (name === "email" && !emailRegex.test(value)) {
      validation = {
        ...validation,
        [name]: {
          error: true,
          errorMessage: "Please enter valid email",
        },
      };
    } else if (
      name === "phoneNumber" &&
      !phoneRegex.test(value?.replace(/ +/g, ""))
    ) {
      validation = {
        ...validation,
        [name]: {
          error: true,
          errorMessage: "Please enter valid phone number",
        },
      };
    } else {
      validation = {
        ...validation,
        [name]: {},
      };
    }
    this.setState({ validation }, () => {
      const { data, validation } = this.state;
      const dataFields = Object.keys(data);
      const errors = dataFields.some(
        (field) => !data[field] || validation?.[field]?.error
      );
      this.props.handleFormData({ disableNextStep: !!errors });
    });
  };

  handleChange = (e) => {
    const { data } = this.state;
    const { name, value } = e.target || {};
    this.setState({ data: { ...data, [name]: value } }, () => {
      this.props.handleFormData({
        formData: {
          ...this.props.formData,
          ...this.state.data,
        },
      });
    });
  };

  handleBlur = (e) => {
    const { name, value } = e.target || {};
    this.handleValidation(name, value);
  };

  handleErrorMessage = (name) => {
    const { formData, showErrors } = this.props || {};
    const { validation } = this.state;
    return (
      (showErrors && (!formData || (formData && !formData[name]))) ||
      validation?.[name]?.error
    );
  };

  render() {
    const { data } = this.state;
    const { name, email, company, phoneNumber, validation } = data || {};
    return (
      <div className="form-contact-details">
        <div className="form-title">Contact details</div>
        <div className="form-subtitle">
          Lorem ipsum dolor sit amet consectetur adipisc.
        </div>
        <div className={cx("contact-fields form-fields")}>
          <div>
            <label htmlFor="contact-name">Name</label>
            <div className="position-relative">
              <input
                id="contact-name"
                type="text"
                name="name"
                defaultValue={name}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="John Carter"
                className={cx({
                  "input-error": this.handleErrorMessage("name"),
                })}
              />
              <PersonIcon />
            </div>
            {this.handleErrorMessage("name") && (
              <span className="error">
                {validation?.name?.errorMessage || "Please enter name"}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="contact-email">Email</label>
            <div className="position-relative">
              <input
                id="contact-email"
                type="text"
                name="email"
                defaultValue={email}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Email address"
                className={cx({
                  "input-error": this.handleErrorMessage("email"),
                })}
              />
              <MailIcon />
            </div>
            {this.handleErrorMessage("email") && (
              <span className="error">
                {validation?.email?.errorMessage || "Please enter email"}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="phone-number">Phone Number</label>
            <div className="position-relative">
              <input
                id="phone-number"
                name="phoneNumber"
                type="text"
                defaultValue={phoneNumber}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="(123) 456 - 7890"
                className={cx({
                  "input-error": this.handleErrorMessage("phoneNumber"),
                })}
              />
              <PhoneIcon />
            </div>
            {this.handleErrorMessage("phoneNumber") && (
              <span className="error">
                {validation?.phoneNumber?.errorMessage ||
                  "Please enter phone number"}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="company-name">Company</label>
            <div className="position-relative">
              <input
                id="company-name"
                name="company"
                type="text"
                defaultValue={company}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Company name"
                className={cx({
                  "input-error": this.handleErrorMessage("company"),
                })}
              />
              <CompanyIcon />
            </div>
            {this.handleErrorMessage("company") && (
              <span className="error">
                {validation?.company?.errorMessage ||
                  "Please enter company name"}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ContactDetails;
