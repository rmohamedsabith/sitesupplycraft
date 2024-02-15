import React from 'react'; // Import React
import { Link } from 'react-router-dom'; // Import Link if you're using it
import './Verifications.css'

function Verifications() {
  return (
<center>
    <hr/>
    <h2><u>Processing Account Details</u></h2>
    <hr/>
    <div className="tableDetails">
    <table className="table">
    <thead>
      <tr>
        <th scope="col"><b>Date</b></th>
        <th scope="col"><b>Name</b></th>
        <th scope="col"><b>Status</b></th>
        <th scope="col"><b>Option</b></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td scope="row">2023/08/23</td>
        <td>Mark</td>
        <td style={{color:'orange'}}>Processing...</td>
        <td><div><Link to={'1'} className="buttonDark">View</Link></div></td>
      </tr>
      <tr>
        <td scope="row">2023/08/23</td>
        <td>Jacob</td>
        <td style={{color:'orange'}}>Processing...</td>
        <td><div><Link to={'2'} className="buttonDark">View</Link></div></td>
      </tr>
      <tr>
        <td scope="row">2023/06/23</td>
        <td>Sahan</td>
        <td style={{color:'orange'}}>Processing...</td>
        <td><div><Link to={'3'} className="buttonDark">View</Link></div></td>
      </tr>
      <tr>
        <td scope="row">2023/09/23</td>
        <td>Supun</td>
        <td style={{color:'orange'}}>Processing...</td>
        <td><div><Link to={'4'} className="buttonDark">View</Link></div></td>
      </tr>
      <tr>
        <td scope="row">2023/12/23</td>
        <td>Milan</td>
        <td style={{color:'orange'}}>Processing...</td>
        <td><div><Link to={'5'} className="buttonDark">View</Link></div></td>
      </tr>
      <tr>
        <td scope="row">2023/09/23</td>
        <td>Supun</td>
        <td style={{color:'orange'}}>Processing...</td>
        <td><div><Link to={'4'} className="buttonDark">View</Link></div></td>
      </tr>
      <tr>
        <td scope="row">2023/09/23</td>
        <td>Supun</td>
        <td style={{color:'orange'}}>Processing...</td>
        <td><div><Link to={'4'} className="buttonDark">View</Link></div></td>
      </tr>
      <tr>
        <td scope="row">2023/09/23</td>
        <td>Supun</td>
        <td style={{color:'orange'}}>Processing...</td>
        <td><div><Link to={'4'} className="buttonDark">View</Link></div></td>
      </tr>
    </tbody>
  </table>
  </div>
  <hr/>
  </center>
 
  );
}

export default Verifications;

