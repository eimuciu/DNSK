import css from './Header.module.scss';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import RegisterPlateForm from '../RegisterPlateForm/RegisterPlateForm';
import useModalController from '../Modal/useModalController';
import type { PlatesObj } from '../../types/types';

interface Props {
  searchTerm: string;
  handleSearch: (e: any) => void;
  addNewRecord: (a: PlatesObj) => void;
}

function Header({ searchTerm, handleSearch, addNewRecord }: Props) {
  const { showModal, closeModal, openModal } = useModalController();
  return (
    <>
      <Modal showModal={showModal} closeModal={closeModal}>
        <RegisterPlateForm
          closeModal={closeModal}
          addNewRecord={addNewRecord}
        />
      </Modal>
      <div className={css.main}>
        <h1>Plate register</h1>
        <div className={css.inputContainer}>
          <Button text="Register new plate" clickHandler={openModal} />
          <input
            onChange={handleSearch}
            value={searchTerm}
            type="text"
            placeholder="Search plate number..."
          />
        </div>
      </div>
    </>
  );
}

export default Header;
