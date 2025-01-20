import { PaymentElement } from "@stripe/react-stripe-js";

const checkOutFrom = () => {
    return (
        <div>
            <PaymentElement/>
            <button>submit</button>
        </div>
    )
}

export default checkOutFrom