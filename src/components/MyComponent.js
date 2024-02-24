import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Duy",
    age: 25,
    address: "Saigon",
  };

  handleClick(event) {
    // console.log(">> click my button");
    console.log("My name is ", this.state.name);

    this.setState({
      name: "Hai Duy",
    });
  }

  handleOnMouseOver(event) {
    console.log(event.pageX);
  }

  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and I am from {this.state.address}
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
        <button
          onClick={(event) => {
            this.handleClick(event);
          }}
        >
          Click me
        </button>
      </div>
    );
  }
}

export default MyComponent;
