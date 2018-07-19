import React from "react";
import ReactDOM from "react-dom";
import SelectBox from './components/selectBox/index'

const items = [
  { value: "featured", id: 1 },
  { value: "price high to low", id: 2 },
  { value: "price low to high", id: 3 },
  { value: "new arrivals", id: 4 },
  { value: "top rated", id: 5 }
];

class App extends React.Component {
  render() {
    return <div>
        <h1>Autocompeate Rocks</h1>
        <div>
          <span>Some text before</span>
          <SelectBox items={items} />
          <span>Text after</span>
        </div>
        <h2>Something after DownShift</h2>
      </div>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
