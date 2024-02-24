import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Duy",
    age: 25,
    address: "Saigon",
  };

  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and I am from {this.state.address}
      </div>
    );
  }
}

export default MyComponent;
