import React from "react";
import { ReactComponent as CheckIcon } from "../../Svg/correct.svg";
import { Button } from "react-bootstrap";

const SubmitDetails = (props) => {
  return (
    <div className="submit-container">
      <CheckIcon />
      <div className="form-title">Submit your quote request</div>
      <div className="form-subtitle">
        Please review all the information you previously typed in the past
        steps, and if all is okay, submit your message to receive a project
        quote in 24 - 48 hours.
      </div>
      <Button
        variant="primary"
        className="fb-primary-btn submit-btn"
        onClick={props.handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default SubmitDetails;
