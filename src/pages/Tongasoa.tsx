import { useEffect, useState } from 'react';

import type { FormValues, TongasoaProps } from '@/types';

import logo from '@/assets/logo.svg';
import DisplayProfileImage from '@/components/DisplayProfileImage';
import Form from '@/components/Form';

import '../styles/form.css';
import '../styles/index.css';

const Tongasoa = ({ name = 'World', isTitleVisible = true }: TongasoaProps) => {
  const [values, setValues] = useState<FormValues>({ name: '' });

  useEffect(() => {
    setValues({ name });
  }, [name]);

  const handleRemovePhoto = () => {
    setValues((prev) => ({ ...prev, photo: undefined }));
  };

  const handleSubmit = (newValues: FormValues) => {
    setValues(newValues);
  };

  return (
    <div className="container">
      {/* Title */}
      {isTitleVisible && (
        <h1 className="page-title">
          <img alt="Logo" src={logo} width="60" />
          <p>Tongasoa</p>
        </h1>
      )}

      {/* Form */}
      <Form values={values} onSubmit={handleSubmit} />
      {/* Photo Preview */}
      {values.photo && (
        <DisplayProfileImage photo={values.photo} onRemovePhoto={handleRemovePhoto} />
      )}
      {/* Result Message */}
      <p className="result-message">
        Hello
        <b> {values.name}</b>!
      </p>
    </div>
  );
};

export default Tongasoa;
