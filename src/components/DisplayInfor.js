import React from "react";

class DisplayInfor extends React.Component {
  render() {
    // Destructuring array/object:
    const { age, name } = this.props; // object

    return (
      <div>
        <div>My name is {name}.</div>
        <div>I am {age} years old.</div>
      </div>
    );
  }
}

export default DisplayInfor;
