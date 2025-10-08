import type { TongasoaProps } from '../types';
import '../styles/index.css';
import Title from '../components/Title';

const Tongasoa = ({ name = 'World' }: TongasoaProps) => {
  return (
    <div>
      <Title />
      <h2>Welcome to {name}!</h2>
    </div>
  );
};

export default Tongasoa;
