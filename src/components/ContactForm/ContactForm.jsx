import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = { name: "", number: "" };

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Letters and spaces only")
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
    dispatch(addContact({ ...values, id: nanoid() }));
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
          <Field name="name" type="text" />
          <ErrorMessage
            name="name"
            component="div"
            className={styles.errorMessage}
          />
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <Field name="number" type="text" />
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