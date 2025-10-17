import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import type { FormValues } from '@/types';

type Props = {
  values: FormValues;
  onSubmit?: (values: Props['values']) => void;
};

const Form = ({ values, onSubmit }: Props) => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<Props['values']>(values);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

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

    // Simple validation example
    if (name === 'name' && !inputValue) {
      setErrors((prev) => ({ ...prev, name: 'Name is required' }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };

        delete newErrors[name as keyof FormValues];
        return newErrors;
      });
    }
  };

  const handleClick = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) return;

    onSubmit?.(formValues);
    setIsFormVisible(false);
    setErrors({});
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
      <form
        className="person-form"
        style={{ marginTop: 16 }}
        onSubmit={handleSubmit}
      >
        {/* name */}
        <div className="form-control">
          <label>Name</label>
          <input
            required
            type="text"
            value={formValues?.name}
            onChange={handleChange('name')}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        {/* photo */}
        <div className="form-control">
          <label>Photo</label>
          <input
            accept="image/*"
            type="file"
            onChange={handleChange('photo')}
          />
          {errors.photo && <span className="error">{errors.photo}</span>}
        </div>
        <div className="form-footer">
          <button type="submit">Validate</button>
          <button
            className="cancel-button"
            type="button"
            onClick={() => setIsFormVisible(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
