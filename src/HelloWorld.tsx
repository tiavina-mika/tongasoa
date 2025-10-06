import type { HelloWorldProps } from './types/types';

const HelloWorld = ({ name = 'World' }: HelloWorldProps) => {
  return <div>Hello {name}!</div>;
};

export default HelloWorld;
