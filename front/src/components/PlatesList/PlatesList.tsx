import { useState } from 'react';
import css from './PlatesList.module.scss';
import type { PlatesObj } from '../../types/types';
import PlateCard from './PlateCard/PlateCard';
import Modal from '../Modal/Modal';
import useModalController from '../Modal/useModalController';
import EditRecordForm from '../EditRecordForm/EditRecordForm';
import { deletePlateData } from '../../api/api';

interface Props {
  platesData: PlatesObj[];
  deleteRecord: (a: string) => void;
  updateRecord: (a: PlatesObj) => void;
}

function PlatesList({ platesData, deleteRecord, updateRecord }: Props) {
  const [sObj, setSObj] = useState<PlatesObj>({ name: '', plate: '' });
  const { showModal, closeModal, openModal } = useModalController();

  const handleOpenModal = (sObj: PlatesObj) => {
    setSObj(sObj);
    openModal();
  };

  const handleDelete = async (id: string) => {
    const confirmation = window.confirm(
      'Are you sure you like to delete the record?',
    );
    if (confirmation) {
      const deleteresp = await deletePlateData(id);
      if (deleteresp.success) {
        deleteRecord(id);
        return;
      }
      alert(deleteresp.msg);
    }
  };

  return (
    <>
      <Modal showModal={showModal} closeModal={closeModal}>
        <EditRecordForm
          closeModal={closeModal}
          updateRecord={updateRecord}
          sObj={sObj}
        />
      </Modal>
      <table className={css.table}>
        <thead>
          <tr>
            <th>Owner name</th>
            <th>Plate number</th>
            <th>Control panel</th>
          </tr>
        </thead>
        <tbody>
          {platesData.map((sObj) => (
            <PlateCard
              key={sObj.id}
              sObj={sObj}
              handleDelete={handleDelete}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PlatesList;
