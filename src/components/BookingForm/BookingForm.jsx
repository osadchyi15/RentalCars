import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./BookingForm.module.css";
import * as Yup from "yup";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({ field, form, ...props }) => {
  return (
    <DatePicker
      {...props}
      selected={field.value}
      onChange={(date) => form.setFieldValue(field.name, date)}
      dateFormat="yyyy-MM-dd"
      placeholderText="Booking date"
    />
  );
};

const BookingForm = () => {
  const initialValues = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Must at least three symbols"),

    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
        "Email must be like: example@domain.com"
      )
      .required("Email is required"),

    date: Yup.date()
      .typeError("Date format must be YYYY-MM-DD")
      .min(new Date(), "Date in the future"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const bookingData = {
      name: values.name,
      email: values.email,
      date: values.date,
      comment: values.comment,
    };

    toast.success(
      "Thank you for your submission.\nA manager will get in touch with you soon."
    );

    resetForm();
  };

  return (
    <div className={s.bookingForm}>
      <div className={s.formTitle}>
        <p className={s.formTitleMain}>Book your car now</p>
        <p className={s.formTitleSecondary}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <label>
            <Field name="name" className={s.input} placeholder="Name*" />
            <ErrorMessage name="name" component="div" className={s.error} />
          </label>

          <label>
            <Field name="email" className={s.input} placeholder="Email*" />
            <ErrorMessage name="email" component="div" className={s.error} />
          </label>

          <label>
            <Field
              name="date"
              component={DatePickerField}
              className={s.input}
            />
            <ErrorMessage name="date" component="div" className={s.error} />
          </label>

          <label>
            <Field
              as="textarea"
              name="comment"
              className={s.input}
              placeholder="Comment"
              rows="5"
            />
          </label>

          <button type="submit" className={s.sendBtn}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default BookingForm;
