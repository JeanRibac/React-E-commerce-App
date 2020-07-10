import React from 'react';
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_NNpt00UOVaPngffRpF5jJYUV009Perv2Kd"

    const onToken = token =>{
        console.log(token)
        alert("Payment Successful")
    }
    return (
        <StripeCheckout
            label = "Pay Now"
            name = "CRWN Clothing"
            billingAddress
            shippingAddress
            image = {"https://sendeyo.com/up/d/f3eb2117da"}
            description ={`Your total is $${price}`}
            ammoun t= {priceForStripe}
            panelLabel = "Pay Now"
            token = {onToken}
            stripeKey={publishableKey}
        />
    )
}
export default StripeCheckoutButton; 