import React from "react";
import AddUserInfor from "./AddUserInfor";
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
        age: 16,
      },
      {
        id: 3,
        name: "Bao",
        age: 45,
      },
    ],
  };

  handleAddNewUser = (userObj) => {
    console.log(">>> check data from parent: ", userObj);
    this.setState({
      listUsers: [userObj, ...this.state.listUsers],
    });
  };

  // JSX
  render() {
    return (
      <div>
        <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
        <br />
        <br />
        <DisplayInfor listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
