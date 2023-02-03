import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setPageLoading(true);
    setErrorMessage(null);

    const price = (paymentMethod === "card" ? 150 : 25) + 5000;

    const clientSecret = await fetchClientSecret(price);

    const responseConfirm = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_SUCCESS_URL
      },
    });

    if (responseConfirm.error) setErrorMessage(responseConfirm.error.message);
    setPageLoading(false);
  };

  const updateSelectedPaymentMethod = (pm) => {
    setPaymentMethod(pm);
    props.paymentMethodType(pm);
  };

  const fetchClientSecret = async (price) => {
    const createPaymentIntentResult = await fetch(
      "/.netlify/functions/createPaymentIntent",
      {
        method: "POST",
        body: JSON.stringify({
          amount: price,
          currency: "AUD"
        }),
      }
    );

    const paymentIntenClientSecret = (await createPaymentIntentResult.json())
      .clientSecret;
    return paymentIntenClientSecret;
  };


  return (
    <form onSubmit={submitForm} className="mb-12">
      <div className="w-full ">
        <PaymentElement
          className="mb-3"
          onReady={() => {
            props.elementReady(true);
          }}
          onChange={(event) => {
            updateSelectedPaymentMethod(event.value.type);
          }}
        />
      </div>
      {pageLoading ? (
        <img className="h-6 w-6 mt-6 mx-auto" src="loading.gif" />
      ) : (
        <button disabled={!stripe} className="buttonPrimary w-full mt-6">
          Submit
        </button>
      )}
      {errorMessage ? (
        <div className="mt-6 text-red text-base text-center text-red-600">
          {errorMessage}
        </div>
      ) : null}
    </form>
  );
};

export default CheckoutForm;