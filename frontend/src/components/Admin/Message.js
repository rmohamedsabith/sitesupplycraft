import React from "react";

const Message = ({ messageData, index }) => {
  return (
    <tr key={index}>
      <td>{messageData.Date}</td>
      <td>{messageData.Role}</td>
      <td>
        <button type="button" className="btn btnstyle">
          View
        </button>
      </td>
    </tr>
  );
};

export default Message;
