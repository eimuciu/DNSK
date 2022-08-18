import css from './Modal.module.scss';

interface Props {
  children: JSX.Element;
  showModal: boolean;
  closeModal: () => void;
}

function Modal({ children, showModal, closeModal }: Props) {
  const modalStyles = showModal ? 'flex' : 'none';
  return (
    <div style={{ display: modalStyles }} className={css.main}>
      <div role="button" className={css.icon} onClick={closeModal}>
        <i className="fa fa-close"></i>
      </div>
      <div className={css.content}>{children}</div>
    </div>
  );
}

export default Modal;
