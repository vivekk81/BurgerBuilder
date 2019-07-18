import React from 'react'

import Aux from '../../../hoc/HAux/HAux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(igkey=>{
    return( 
      <li key={igkey}>
        <span style={{textTransform: 'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}
      </li>
    )
  })
  return(
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total price: {props.price}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType={'Danger'} clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType={'Success'} clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  )
}

export default orderSummary