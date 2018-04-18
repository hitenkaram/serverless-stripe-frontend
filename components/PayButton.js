import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import config from '../config';

class PayButton extends React.Component {
  constructor(props) {
    super(props);
     // This binding is necessary to make `this` work in the callback
    this.onToken = this.onToken.bind(this);
  }

  async onToken(token) { // Token returned from Stripe
    const res = await fetch(config.stripe.apiUrl, { // Backend API url
      method: 'POST',
      body: JSON.stringify({
        token,
        charge: {
          amount: this.props.amount,
          currency: config.stripe.currency,
        },
      }),
    });
    const data = await res.json();
    console.log('onToken'); // Logs for ease of debugging
    console.log(data);
  }

  render() {
    return (
      <StripeCheckout
      name="Sphere Identity Ltd." // the pop-in header title
      description="Serverless Stripe POC" // the pop-in header subtitle
      image="https://s3.ap-south-1.amazonaws.com/sphereidentity-static-resources/SI-Icon-iPhone-120x120px.png"
      ComponentClass="div"
      panelLabel="Pay" // prepended to the amount in the bottom pay button
      token={this.onToken}
      email={this.email}
      amount={this.props.amount}
      currency={config.stripe.currency}
      stripeKey={config.stripe.apiKey}
      locale="auto"
      // email="info@vidhub.co"
      // Note: Enabling either address option will give the user the ability to
      // fill out both. Addresses are sent as a second parameter in the token callback.
      // shippingAddress
      // billingAddress={false}
      // Note: enabling both zipCode checks and billing or shipping address will
      // cause zipCheck to be pulled from billing address (set to shipping if none provided).
      zipCode={false}
      alipay // accept Alipay (default false)
      bitcoin={false} // accept Bitcoins (default false)
      allowRememberMe={false} // "Remember Me" option (default true)
      opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
      closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
      // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
      // you are using multiple stripe keys
      reconfigureOnUpdate={false}
      // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
      // useful if you're using React-Tap-Event-Plugin
      // triggerEvent="onTouchTap"
  >
      <button className="btn btn-primary">
      <img height="40" width="50" src="https://image.flaticon.com/icons/svg/814/814878.svg"/></button>
</StripeCheckout>
      // <StripeCheckout
      //   name="Sphere Identity Ltd."
      //   description="Serverless Stripe POC"
      //   image="https://s3.ap-south-1.amazonaws.com/sphereidentity-static-resources/SI-Icon-iPhone-120x120px.png"
      //   token={this.onToken}
      //   email={this.email}
      //   amount={this.props.amount}
      //   currency={config.stripe.currency}
      //   stripeKey={config.stripe.apiKey} // Stripe publishable API key
      //   allowRememberMe={true}
      //   // <button className="btn btn-default">Pyio</button>
      //  />
    );
  }
}

PayButton.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default PayButton;
