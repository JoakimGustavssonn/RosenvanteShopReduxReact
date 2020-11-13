import React, { Component } from 'react'
import { connect } from 'react-redux';



class ContactForm extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
        email:'',
        subject:'',
        meddelande: '',
        isSubmitted: '',
        
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
                    this.state.isSubmitted = true;
                    this.setState({email: '', subject: '', meddelande:''});

                  }
                  
            }

            else
            {
              alert ("Message failed to send")
            }      
    };

      
      
      onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value})
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


          
           <div>
                 {this.state.isSubmitted ?
                      <div> <h2> Tack för ditt meddelande!</h2> </div> 
                      
                  : <form  onSubmit={this.handleSubmit} method="POST" >
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
                      onChange={this.onChange}
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
                  <button onClick ={this.onChange} >Skicka förfrågan</button>
                  </form>
          }
          </div>
       
        );
      }
    }

    const mapStateToProps = state =>({
      cartItems: state.cart.items,
      responseToPost: state
      })

export default connect  (mapStateToProps)(ContactForm);