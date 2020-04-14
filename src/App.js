import React, { useState } from "react";
import "./App.css";
import { getAlphaNumericValues } from "./service/alphaNumericService";
import { cloneDeep } from "lodash";

function App() {
  const [state, setState] = useState({
    results: [],
    userInput: "",
    pageNumber: 1,
    totalPages: 0,
    totalResults: 0,
    showError: false,
    errorMessage: [],
    pageFirst: 1,
    pageSecond: 2,
    pagethird: 3
  });
  const navStyle = {
    display: "inline-block"
  }
  function onSubmit(event) {
    event.preventDefault();
    updateResults(1);
  }

  function updateResults(pageNumber){
    getAlphaNumericValues(state.userInput, pageNumber)
      .then((res) => {
        let cloned = cloneDeep(state);
        cloned.results = res.response;
        cloned.pageNumber = res.pageNumber;
        cloned.totalPages = res.totalPages;
        cloned.totalResults = res.totalResults;
        cloned.showError = false;
        cloned.errorMessage = "";
        if(pageNumber===1){
          cloned.pageFirst = 1;
          cloned.pageSecond = 2;
          cloned.pagethird = 3;
        }
        setState(cloned);
      })
      .catch((error) => {
        let cloned = cloneDeep(state);
        cloned.showError = true;
        cloned.errorMessage = "" + error;
        cloned.results = [];
        cloned.pageNumber = 1;
        cloned.totalPages = 0;
        cloned.totalResults = 0;
        cloned.pageFirst = 1;
        cloned.pageSecond = 2;
        cloned.pagethird = 3;
        setState(cloned);
      });
  }

  function updateInput(e) {
    let cloned = cloneDeep(state);
    cloned.userInput = e.target.value;
    setState(cloned);
  }

  function incrementPages(){
      if(state.pagethird<state.totalPages){
        let cloned = cloneDeep(state);
        cloned.pageFirst = cloned.pageFirst+1;
        cloned.pageSecond = cloned.pageSecond+1;
        cloned.pagethird = cloned.pagethird+1;
        setState(cloned);
      }
  }

  function decrementPages(){
    if(state.pageFirst>1){
      let cloned = cloneDeep(state);
      cloned.pageFirst = cloned.pageFirst-1;
      cloned.pageSecond = cloned.pageSecond-1;
      cloned.pagethird = cloned.pagethird-1;
      setState(cloned);
    }
  }

  function callPage(event){
    updateResults(event.target.id);
  }

  return (
    <div className="text-center">
      <h1 className="page-header">React App</h1>
      <div>
        <form onSubmit={onSubmit}>
          <p>Enter the number to generate alpha numeric numbers</p>
          <input
            onChange={updateInput}
            value={state.userInput}
            id="userInput"
            className="user-input"
          ></input>
          <input type="submit"></input>
        </form>
      </div>
      {state.showError && (
        <div className="alert alert-danger" role="alert">
          {state.errorMessage}
        </div>
      )}
      {state.results.length > 0 && (
        <div>
          <label>Showing {state.totalResults} results</label>
          <ul className="list-group">
            {state.results &&
              state.results.map((res) => {
                return <li key={res}>{res}</li>;
              })}
          </ul>
        </div>
      )}
      {state.totalPages > 0 && (
        <nav aria-label="Page navigation example" style={navStyle}>
          <ul className="pagination text-center">
            <li className="page-item">
              <button className="page-link" onClick={decrementPages}>...</button>
            </li>
            <li className="page-item">
              <button key={state.pageFirst} id={state.pageFirst} className="page-link" onClick={callPage}>{state.pageFirst}</button>
            </li>
            <li className="page-item">
              <button key={state.pageSecond} id={state.pageSecond} className="page-link" onClick={callPage}>{state.pageSecond}</button>
            </li>
            <li className="page-item">
              <button key={state.pagethird} id={state.pagethird} className="page-link" onClick={callPage}>{state.pagethird}</button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={incrementPages}>...</button>
            </li>
            <li className="page-item disabled" >
              <label className="page-link">of {state.totalPages} pages</label>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default App;
