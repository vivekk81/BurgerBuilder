import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    let ingredList = Object.keys(props.ingredients).map(igkey=>{
        return [...Array(props.ingredients[igkey])].map((_,indx)=>{
            return <BurgerIngredient key={igkey+indx} type={igkey}/>
        })
    }).reduce((arr, el)=>{
        return arr.concat(el)
    }, [])

    if(!ingredList.length){
        ingredList = <p>Please start adding ingredients!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredList}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger