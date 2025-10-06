import type { TongasoaProps } from './types/types';

const Tongasoa = ({ name = 'World' }: TongasoaProps) => {
  return <div>Hello {name}!</div>;
};

export default Tongasoa;
