import * as Yup from "yup";

export default Yup.object().shape({
  date: Yup.date().required("The date field is required"),
});
