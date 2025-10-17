import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import type { FormValues } from '@/types';

type Props = {
  values: FormValues;
  onSubmit?: (values: Props['values']) => void;
};
const Form = ({ values, onSubmit }: Props) => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<Props['values']>(values);

  useEffect(() => {
    setFormValues(values);
  }, [values]);

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    let inputValue: string | File = value;

    if (e.target.type === 'file' && e.target.files) {
      inputValue = e.target.files[0];
    }

    setFormValues((prev) => ({ ...prev, [name]: inputValue }));
  };

  const handleClick = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(formValues);
    setIsFormVisible(false);
  };

  if (!isFormVisible) {
    return (
      <button className="open-form-button" onClick={handleClick}>
        Update your profile
      </button>
    );
  }

  return (
    <div className="form-container">
      <form className="person-form" style={{ marginTop: 16 }} onSubmit={handleSubmit}>
        {/* name */}
        <div className="form-control">
          <label>Name</label>
          <input required type="text" value={formValues?.name} onChange={handleChange('name')} />
        </div>
        {/* photo */}
        <div className="form-control">
          <label>Photo</label>
          <input required accept="image/*" type="file" onChange={handleChange('photo')} />
        </div>
        <div className="form-footer">
          <button type="submit">Validate</button>
          <button className="cancel-button" type="button" onClick={() => setIsFormVisible(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
