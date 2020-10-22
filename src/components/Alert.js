import React from 'react'
import {Alert} from 'react-bootstrap'
function AlertDismissible() {
      
    return (
      <>
        <Alert  variant="success">
          <Alert.Heading>How's it going?!</Alert.Heading>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
            lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
            fermentum.
          </p>
          <hr />
         
        </Alert>
  
              </>
    );
  }
  
  export default AlertDismissible