import React from "react";
import ReactDOM from "react-dom";
import Downshift from "downshift";
import { all as starWarsNames } from "starwars-names";
import matchSorter from 'match-sorter';

const items = starWarsNames.map(name => ({
  value: name,
  id: name.toLocaleLowerCase()
}));

const stateReducer = (state, changes) => {
  if (changes.type === Downshift.stateChangeTypes.blurButton) {
    return { ...changes, isOpen: true}
  }
  
  return changes

};

const itemToString = item => (item ? item.value : "");

const getItems = value => value ? matchSorter(items, value, {key: ['value']}) : items;

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Autocompeate Rocks</h1>
        <div>
          <Downshift stateReducer={stateReducer} itemToString={itemToString}>
            {({
              getLabelProps,
              getInputProps,
              getMenuProps,
              getItemProps,
              getToggleButtonProps,
              isOpen,
              highlightedIndex,
              selectedItem,
              clearSelection,
              inputValue
            }) => (
              <div>
                <label {...getLabelProps()}>Select a Star Wars</label>
                <input {...getInputProps()} />
                <button {...getToggleButtonProps()}>
                  {isOpen ? "close" : "open"}
                </button>
                {selectedItem ? <button onClick={clearSelection}>x</button> : null}
                <ul
                  {...getMenuProps({
                    style: { maxHeight: 300, overflowY: "scroll", position: 'absolute', backgroundColor: 'white' }
                  })}
                >
                  {isOpen
                    ? getItems(inputValue).map((item, index) => (
                        <li
                          {...getItemProps({
                            item,
                            key: item.id,
                            style: {
                              backgroundColor:
                                index === highlightedIndex ? "gray" : null
                            }
                          })}
                        >
                          {item.value}
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            )}
          </Downshift>
        </div>
        <h2>Something after DownShift</h2>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
