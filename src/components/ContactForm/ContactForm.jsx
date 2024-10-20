import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = { name: "", number: "" };

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄє\s]+$/, "Letters and spaces only")
      .min(3, "Must be at least 3 characters")
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    number: Yup.string()
      .matches(/^[\d-]+$/, "Digits only")
      .min(3, "Must be at least 3 digits")
      .max(50, "Must be 50 digits or less")
      .required("Required"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className={styles.formContainer}>
        <div>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" pattern="^[a-zA-Zа-яА-Я]+([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$" title="Name may contain only letters and spaces."  />
          <ErrorMessage
            name="name"
            component="div"
            className={styles.errorMessage}
          />
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <Field
            name="number"
            type="text"
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Phone number must be at least 10 digits long or follow the format +380931112233 or +38 093 333 4455."
          />
          <ErrorMessage
            name="number"
            component="div"
            className={styles.errorMessage}
          />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
