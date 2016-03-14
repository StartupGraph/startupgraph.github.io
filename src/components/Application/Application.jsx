import React from "react";
import Header from "./Header";
import Main from "./Main";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <footer></footer>
      </div>
    );
  }
}

export default App;
