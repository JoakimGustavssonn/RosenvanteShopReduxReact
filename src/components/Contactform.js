import React, { Component } from 'react'
import { connect } from 'react-redux';
import {formBasket} from '../actions/cartActions';







class ContactForm extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
        email:'',
        subject:'',
        meddelande: '',
        
      };
          
      handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/.netlify/functions/server/api/postmessage', {
          method:'POST',
          headers: {            
            'Content-Type': 'application/json'
          },    

          body: JSON.stringify({
             email: this.state.email,
              subject: this.state.subject,
              meddelande: this.state.meddelande
            }),
        
        });

        const body = await response.text();

        this.setState({ responseToPost: body });
        console.log(this.state.responseToPost);

            if (this.state.responseToPost === 'success') 
            {
              alert ("Message Sent.")

              if (this.state.stringData === body.text)
                  {
                    console.log('TRUE');
                    this.resetForm()
                  }
                  
            }

            else
            {
              alert ("Message failed to sent")
            }      
    };

    resetForm = () => {
      this.setState({email: '', subject: '', meddelande:''})
      window.location.reload();

}

      //
      onChange = (e) => this.setState({ [e.target.name]: e.target.value})
      ;
      onChange2 = (e) => {
      const {cartItems} = this.props
      const stringData = cartItems.reduce((result, item) => {

      return  `${item.title} ${item.id} ${result} . Pris: ${item.pris} \n \n ` // Email content
        
      }, "")

        this.setState({
        meddelande: stringData,
          
              
      });
      
      
    }        
      
    render() {

      
      
     
      

        return (
          <div className="App">
            <header className="App-header">
            
        
                               

            </header>
            <p></p>
            <form  onSubmit={this.handleSubmit} method="POST" >
              <p > 
                <strong>Skriv in din mailadress:</strong>
                
              </p>
                        
              <input
                type="email"
                value={this.state.email}
                name="email"
                onChange={this.onChange} 
                required

              /><br/> <br/>

              <input
                type="hidden"
                value= {this.state.meddelande}
                name="meddelande"
                onChange={this.onChange2}
                required
             /><br/>  <br/>

       
                <strong>Subject</strong>
                <br/> <br/>
               <input
                type="text"
                value= {this.state.subject}
                name= "subject"
                onChange={this.onChange}
                
              /><br/> <br/>
            <button onClick ={this.onChange2} >Skicka förfrågan</button>
            </form>
            
          </div>
        );
      }
    }

    const mapStateToProps = state =>({
      cartItems: state.cart.items,
      responseToPost: state
      })

export default connect  (mapStateToProps, {formBasket})(ContactForm);