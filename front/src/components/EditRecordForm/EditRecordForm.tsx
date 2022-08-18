import css from './EditRecordForm.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updatePlateData } from '../../api/api';
import type { PlatesObj } from '../../types/types';

interface Props {
  closeModal: () => void;
  updateRecord: (a: PlatesObj) => void;
  sObj: PlatesObj;
}

const formValidation = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  plateNumber: Yup.string()
    .trim()
    .matches(/^[A-Z]{3}[0-9]{3}$/gm, 'Plate number is not in correct format')
    .required('Plate number is required'),
});

function EditRecordForm({ closeModal, updateRecord, sObj }: Props) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: sObj.name,
      plateNumber: sObj.plate,
    },
    validationSchema: formValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      const updatedData = {
        id: sObj.id,
        name: values.name,
        plate: values.plateNumber,
      };
      const updateresp = await updatePlateData(updatedData);
      if (updateresp.success) {
        action.resetForm();
        updateRecord(updatedData);
        closeModal();
        return;
      }
      alert(updateresp.msg);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Edit record</h2>
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
        <input type="submit" value="Update record" />
      </div>
    </form>
  );
}

export default EditRecordForm;
