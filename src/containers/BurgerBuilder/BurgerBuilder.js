import React, { Component } from 'react'

import AUX from '../../hoc/HAux/HAux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import axiosInstance from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICE = {
    'meat' : 20,
    'salad' : 24,
    'bacon' : 30,
    'cheese' : 45
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        price: 40,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount () {
        axiosInstance.get('https://react-viv-project.firebaseio.com/ingredients.json')
        .then(res=>{
            this.setState({
                ingredients: res.data
            })
        })
        .catch(error=>{
            this.setState({error: true})
        })
    }
    updadePurchaseState (ingredients) {

        const sum = Object.keys(ingredients).map(igkey=>{
            return ingredients[igkey]
        }).reduce((sum, el)=>{
            return sum + el
        },0)

        this.setState({
            purchasable : sum > 0
        })
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount

        const priceAddition = INGREDIENTS_PRICE[type]
        const newPrice = this.state.price + priceAddition

        this.setState({
            ingredients: updatedIngredients,
            price: newPrice
        })
        this.updadePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if(oldCount <= 0 ){
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount

        const priceDeduction = INGREDIENTS_PRICE[type]
        const newPrice = this.state.price - priceDeduction

        this.setState({
            ingredients: updatedIngredients,
            price: newPrice
        })
        this.updadePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({
            purchasing : true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients : this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'vivek kumawat',
                address: {
                    street: 'teststreet1',
                    zipcode: '302012',
                    country: 'India'
                },
                email:'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axiosInstance.post('/orders.json',order).then(res=>{
            this.setState({loading: false, purchasing: false})
        })
        .catch(error=>{
            this.setState({loading: false, purchasing: false})
        })
        //alert('Purchase continued!')
    }

    render(){
        let disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null 
        

        let burger = this.state.error ? "Ingredients can't be loaded":<Spinner/>
        if(this.state.ingredients){
            burger = (
                <AUX>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.price}
                        ordered={this.purchaseHandler}
                    />
                </AUX>
            )
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.price}
            />
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return(
            <AUX>
                <Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Model>
                {burger}
            </AUX>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance)