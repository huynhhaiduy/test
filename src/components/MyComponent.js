import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  // JSX
  render() {
    const myAge = 50;
    const myInfor = ["a", "b", "c"];
    return (
      <div>
        <UserInfor />
        <br />
        <br />
        <DisplayInfor name="Duy" age="25" />
        <hr />
        <DisplayInfor name="An" age={myAge} myInfor={myInfor} />
      </div>
    );
  }
}

export default MyComponent;
