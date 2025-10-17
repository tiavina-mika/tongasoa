import type { TongasoaProps } from '../types';
import '../styles/index.css';
import Title from '@/components/Title';
import reactLogo from '@/assets/react.svg';

const Tongasoa = ({ name = 'World' }: TongasoaProps) => {
  return (
    <div>
      <img alt="Logo" src={reactLogo} width="60" />
      <Title />
      <h2>Welcome to {name}!</h2>
    </div>
  );
};

export default Tongasoa;
