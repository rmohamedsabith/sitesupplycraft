import React from 'react'

const Verification = () => {
  
  return (
    <div>
    <div>Verification</div>
    
<form>
        <label for="seller_id">Seller ID:</label>
        <input type="text" id="seller_id" name="seller_id" required/><br/><br/>

        <label for="full_name">Owner/Full Name:</label>
        <input type="text" id="full_name" name="full_name" required/><br/><br/>

        <label for="license_no">License No.:</label>
        <input type="text" id="license_no" name="license_no" required/><br/><br/>

        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required/><br/><br/>

        <label for="phone_no">Phone No.:</label>
        <input type="tel" id="phone_no" name="phone_no" required/><br/><br/>

        <label for="district">District:</label>
        <input type="text" id="district" name="district" required/><br/><br/>

        <label for="address">Address:</label>
        <input type="text" id="address" name="address" required/><br/><br/>

        <label for="landmark">Landmark (Optional):</label>
        <input type="text" id="landmark" name="landmark"/><br/><br/>

        <label for="business_registration_certificate">Business Registration Certificate:</label>
        <input type="file" id="business_registration_certificate" name="business_registration_certificate" accept="image/*" required/><br/><br/>

        <label for="current_bill">Current Bill:</label>
        <input type="file" id="current_bill" name="current_bill" accept="image/*" required/><br/><br/>

        <button type="submit" name="approve">Approve</button>
        <button type="reset" name="cancel">Cancel</button>
</form>
</div>

  )
}

export default Verification
