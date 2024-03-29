import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for(let param of query.entries()){
            //['salad', '1']
            if(param[0] === 'price'){
                price = +param[1]
            }else{
                ingredients[param[0]] = +param[1]
            }
        }
        console.log(ingredients)
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinueded={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    //component = {ContactData}
                    // if want to pass data to component will use in following way.
                    render = {(props)=>(<ContactData ingredients={this.state.ingredients}
                        price={this.state.totalPrice} {...props}
                    />)}
                />
            </div>
        );
    }
}

export default Checkout;