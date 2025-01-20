import { Schema,model } from "mongoose"

const paymentSchema = new Schema({
   amount : {
    required  : String,

   }
})
const payment = model("paymentSchema",paymentSchema)

export default payment