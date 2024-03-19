import './App.css';
import CurrencyConverter from './CurrencyConverter';
import Header from './Header';
import Modal from './Modal';

function App() {
  return (
    <div className="App">
      <Header title={'Currency Converter'}/>
      <Modal>
        <CurrencyConverter />
      </Modal>
    </div>
  );
}

export default App;
