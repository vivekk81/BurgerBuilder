import React, { Component } from 'react'

import AUX from '../../hoc/AUX'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENTS_PRICE = {
    'meat' : 20,
    'salad' : 24,
    'bacon' : 30,
    'cheese' : 45
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price: 40,
        purchasable: false
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
    render(){
        let disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <AUX>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.price}
                />    
            </AUX>
        )
    }
}

export default BurgerBuilder