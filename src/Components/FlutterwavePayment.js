/*import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

const FlutterwavePayment = () => {
  const config = {
    public_key: 'YOUR_FLUTTERWAVE_PUBLIC_KEY', // Replace with your Flutterwave public key
    tx_ref: Date.now(),
    amount: 100, // Amount to be paid
    currency: 'KES',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@example.com',
      phonenumber: '0700000000',
      name: 'John Doe',
    },
    customizations: {
      title: 'Payment for Service',
      description: 'Payment for mechanic service',
      logo: 'https://your-logo-url.com/logo.png',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay Now',
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // Close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
};

export default FlutterwavePayment;*/
