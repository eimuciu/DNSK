import css from './RegisterPlateForm.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postPlateData } from '../../api/api';
import type { PlatesObj } from '../../types/types';

interface Props {
  closeModal: () => void;
  addNewRecord: (a: PlatesObj) => void;
}

const formValidation = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  plateNumber: Yup.string()
    .trim()
    .matches(/^[A-Z]{3}[0-9]{3}$/gm, 'Plate number is not in correct format')
    .required('Plate number is required'),
});

function RegisterPlateForm({ closeModal, addNewRecord }: Props) {
  const formik = useFormik({
    initialValues: {
      name: '',
      plateNumber: '',
    },
    validationSchema: formValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      const postresp = await postPlateData({
        name: values.name,
        plate: values.plateNumber,
      });
      if (postresp.success) {
        action.resetForm();
        addNewRecord(postresp.data);
        closeModal();
        return;
      }
      alert(postresp.msg);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Plate registration</h2>
      <div className={css.inputContainer}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Owner name"
        />
        <span className={css.error}>
          {formik.touched.name && formik.errors.name}
        </span>
      </div>
      <div className={css.inputContainer}>
        <label htmlFor="plateNumber">Plate number</label>
        <input
          id="plateNumber"
          name="plateNumber"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.plateNumber}
          placeholder="Car plate number"
        />
        <span className={css.error}>
          {formik.touched.plateNumber && formik.errors.plateNumber}
        </span>
      </div>
      <div>
        <input type="submit" value="Register plate" />
      </div>
    </form>
  );
}

export default RegisterPlateForm;
