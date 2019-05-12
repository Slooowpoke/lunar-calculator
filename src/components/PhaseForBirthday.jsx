import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PhaseForBirthdaySchema from "../form-schemas/PhaseForBirthdaySchema";

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
        <button onClick={resetPhaseForBirthday} type={"button"}>
          Click here to calculate a different date
        </button>
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
            <ErrorMessage name="date" />
          </div>
          <button type="submit">Get phase for current location</button>
        </Form>
      )}
    </Formik>
  );
};

PhaseForBirthday.propTypes = {
  phase: PropTypes.string,
  percentage: PropTypes.string,
  fetchPhaseForDateOnLocation: PropTypes.func.isRequired
};

PhaseForBirthday.defaultProps = {
  phase: false,
  percentage: ""
};

export default PhaseForBirthday;
