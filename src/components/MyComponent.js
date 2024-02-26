import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  state = {
    listUsers: [
      {
        id: 1,
        name: "Duy",
        age: 25,
      },
      {
        id: 2,
        name: "An",
        age: 30,
      },
      {
        id: 3,
        name: "Bao",
        age: 45,
      },
    ],
  };

  // JSX
  render() {
    return (
      <div>
        <UserInfor />
        <br />
        <br />
        <DisplayInfor listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
