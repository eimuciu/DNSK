import Button from '../../Button/Button';
import type { PlatesObj } from '../../../types/types';

interface Props {
  sObj: PlatesObj;
  handleDelete: (a: string) => void;
  handleOpenModal: (a: PlatesObj) => void;
}

function PlateCard({ sObj, handleDelete, handleOpenModal }: Props) {
  return (
    <tr>
      <td>{sObj.name}</td>
      <td>{sObj.plate}</td>
      <td>
        <Button clickHandler={() => handleOpenModal(sObj)} text="Edit" />
        <Button
          clickHandler={() => handleDelete(sObj.id as string)}
          text="Delete"
        />
      </td>
    </tr>
  );
}

export default PlateCard;
