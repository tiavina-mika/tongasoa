import Tongosoa, { type TongasoaProps } from 'tongasoa';
import './App.css';

const name: TongasoaProps['name'] = 'Mik';

const App = () => {
  return (
    <div className="demo-app">
      <h1>Demo to test the package Tongasoa</h1>
      <Tongosoa name={name} isTitleVisible={false} />
    </div>
  );
};

export default App;
