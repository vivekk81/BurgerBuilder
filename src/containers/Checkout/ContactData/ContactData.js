import React from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends React.Component{
    state ={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value:'fastest', displayValue: 'Fastest'},
                    {value:'cheapest', displayValue: 'Cheapest'}
                ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules){
        let isValid = true
        if(!rules){
            return true
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid = value.trim().length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.trim().length <= rules.maxLength && isValid
        }

        return isValid
    }

    inputChangeHandler = (event, inputIndentifier) => {
        const updatedOrderForm = {...this.state.orderForm}
        const updatedFormElement = {
            ...updatedOrderForm[inputIndentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIndentifier] = updatedFormElement
        
        let formIsValid = true
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState( { loading: true } )
        const formData = {}
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false, purchasing: false } );
                this.props.history.push('/')
            } )
            .catch( error => {
                this.setState( { loading: false, purchasing: false } );
            } );
    }

    render(){
        const formElementsArray = []
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement=>{
                    return<Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event)=>this.inputChangeHandler(event,formElement.id)}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                    />
                })}
                <Button
                    btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData