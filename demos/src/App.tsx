import Tongosoa, { type TongasoaProps } from 'tongasoa';
import './App.css';

const name: TongasoaProps['name'] = 'Mik';

const App = () => {
  return (
    <>
      <div>
        <h1>Demo to test the package Tongasoa</h1>
      </div>
      <Tongosoa name={name} />
    </>
  );
};

export default App;
