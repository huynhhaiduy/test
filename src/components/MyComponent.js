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

  handleOnChangeInput = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and I am from {this.state.address}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <input
            type="text"
            onChange={(event) => this.handleOnChangeInput(event)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
