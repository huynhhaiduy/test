import React from "react";

class DisplayInfor extends React.Component {
  render() {
    // Destructuring array/object:
    const { listUsers } = this.props; // object
    return (
      <div>
        {listUsers.map((user) => {
          return (
            <div key={user.id}>
              <div>My name is {user.name}.</div>
              <div>I am {user.age} years old.</div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayInfor;
