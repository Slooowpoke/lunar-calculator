import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PhaseForBirthdaySchema from "../form-schemas/PhaseForBirthdaySchema";
import Button from "./ui/Button";

const PhaseForBirthday = ({
  phase,
  percentage,
  fetchPhaseForDateOnLocation,
  resetPhaseForBirthday
}) => {
  if (phase) {
    return (
      <div>
        <p>{`The phase on your birthday was a ${phase} at ${percentage}`}</p>
        <Button onClick={resetPhaseForBirthday} type="button">
          Click here to calculate a different date
        </Button>
      </div>
    );
  }
  return (
    <Formik
      initialValues={{ date: "" }}
      validationSchema={PhaseForBirthdaySchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        fetchPhaseForDateOnLocation(values.date);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <p>
            To get the phase for your birthday, please enter your date of birth
            below
          </p>
          <div className="field-group">
            <Field name="date" type="date" />
            <br />
            <ErrorMessage name="date" className="error-message" />
            <br />
            <br />
            <Button type="submit">
              Get phase for your birthday at your current location
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

PhaseForBirthday.propTypes = {
  phase: PropTypes.string,
  percentage: PropTypes.string,
  fetchPhaseForDateOnLocation: PropTypes.func.isRequired,
  resetPhaseForBirthday: PropTypes.func.isRequired
};

PhaseForBirthday.defaultProps = {
  phase: false,
  percentage: ""
};

export default PhaseForBirthday;
