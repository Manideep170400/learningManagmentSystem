import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import checkOutFrom from './checkOutForm';

const payment = () => {
    const stripePromise = loadStripe("pk_test_51QfGSQDLJsRBb6YoEv80IzJyvSGQQizhdmVJbi6mxiCdsqPV1qRtdLQiod2lbfwofrbtNMJp6Jh9TbJ1jYBNy8Rh00I03L5VZW")
    return (
        <div>
            <Elements stripe={stripePromise}/>
            <checkOutFrom/>
        </div>
    )
}

export default payment