import React, { Component } from 'react'
import Downshift from "downshift";
import styled from "styled-components";

const stateReducer = (state, changes) => {
  // console.log(
  //   changes.selectedItem ? JSON.stringify(changes.selectedItem) : null
  // );
  console.log(changes);
  return changes;
};

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;
const Inner = styled.div`
  /* position: ${props => (props.isOpen ? "absolute" : "static")}; */
`;

const DropDown = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0.3em 0;
  max-height: 300px;
  overflow-y: auto;
  position: absolute;
  background-color: #f5f5f5;
  width: 200px;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: none;
`;

const DropItem = styled.li`
  font: 16px arial;
  padding: 0.2em 0.5em;
  cursor: pointer;
  text-transform: uppercase;
`;

const Trigger = styled.button`
  border: 1px solid transparent;
  border-color: ${props => (props.isOpen ? "black" : null)};
  width: ${props => (props.isOpen ? "200px" : "auto")};
  border-bottom: none;
  font: 16px arial;
  padding: 0.5em;
  display: inline-flex;
  align-items: center;
  outline: none;
  & span:first-child {
    margin-right: 1em;
    display: inline-block;
  }
`;

const itemToString = item => (item ? item.value : "");

const getItems = (value, items) => {
  console.log(value);
  return value ? items.filter(item => item.value !== value) : items;
};

const Up = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1683 1331l-166 165q-19 19-45 19t-45-19l-531-531-531 531q-19 19-45 19t-45-19l-166-165q-19-19-19-45.5t19-45.5l742-741q19-19 45-19t45 19l742 741q19 19 19 45.5t-19 45.5z" />
  </svg>
);

const Down = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z" />
  </svg>
);

export default class SelectBox extends Component {
  render() {
    const {items} = this.props;
    return (
      <Wrapper className="Wrapper" ref={ el => this.dropDown = el } >
        <Downshift
          itemToString={itemToString}
          stateReducer={stateReducer}
          defaultSelectedItem={{ value: "featured", id: 1 }}
          defaultIsOpen={false}
        >
          {({
            getMenuProps,
            getItemProps,
            getToggleButtonProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => (
              <div>
                <Inner className="Inner" isOpen={isOpen}>
                  <Trigger {...getToggleButtonProps()} isOpen={isOpen}>
                    <span>{inputValue ? inputValue : "select"}</span>
                    <span>{isOpen ? <Up /> : <Down />}</span>
                  </Trigger>
                  {isOpen ? (
                    <DropDown {...getMenuProps()}>
                      {isOpen
                        ? getItems(inputValue, items).map((item, index) => (
                          <DropItem
                            {...getItemProps({
                              item,
                              key: item.id,
                              style: {
                                textDecoration:
                                  highlightedIndex === index ? 'underline' : 'none',
                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                              },
                            })}
                          >
                            <span>{item.value}</span>
                          </DropItem>
                        ))
                        : null}
                    </DropDown>
                  ) : null}
                </Inner>
              </div>
            )}
        </Downshift>
      </Wrapper>
    )
  }
}
