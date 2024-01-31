import React from "react";
import Message from "./Message";

const messageDummyData = [
  {
    Date: "14/12/2023",
    Role: "Product Owner",
  },
  {
    Date: "20/12/2023",
    Role: "Labourer",
  },
  {
    Date: "30/12/2023",
    Role: "Product Owner",
  },
  {
    Date: "29/12/2023",
    Role: "Product Owner",
  },
];
const Messages = () => {
  return (
    <section className="mt-2 m-4">
      <center><h1>Messages</h1></center>
      <table className="table table-sm mt-2">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Role</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {messageDummyData.map((message, index) => (
            <Message messageData={message} key={index} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Messages;
