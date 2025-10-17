import type { FormValues } from '../types';

import '../styles/form.css';
import '../styles/index.css';

type Props = {
  photo: FormValues['photo'];
  onRemovePhoto: () => void;
};
const DisplayProfileImage = ({ photo, onRemovePhoto }: Props) => {
  return (
    <div className="photo-preview">
      <img
        alt="Preview"
        src={typeof photo === 'string' ? photo : photo ? URL.createObjectURL(photo) : undefined}
      />
      <button className="remove-photo-button" onClick={onRemovePhoto}>
        x
      </button>
    </div>
  );
};

export default DisplayProfileImage;
