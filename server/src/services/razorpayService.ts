import Razorpay from "razorpay";


export const createOrder =async (amount: string) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY as string,
        key_secret: process.env.RAZORPAY_SECRET 
    })
    
    const options = {
        amount,
        currency: "INR",
        receipt: "unique id",
        payment_capture: 1
    }

    try{
        const response = await razorpay.orders.create(options)
        const result = {
            orderId: response.id,
            currency: response.currency,
            amount: response.amount,
            error: undefined
        }
        return result;
    }   catch(err) {
        const error = "Not able to create order. Please try again!";
        return error 
    }   

}