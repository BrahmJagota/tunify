interface RazorpayOptions {
    key: string; 
    amount: number; 
    currency: string; 
    name?: string; 
    description?: string;
    order_id?: string;
    handler?: (response: RazorpayResponse) => void; 
    prefill?: {
      name?: string; 
      email?: string; 
      contact?: string; 
    };
    modal?: {}
    callback_url? :string;
    notes?: Record<string, string>; 
    theme?: {
      color?: string; 
    };
  }
  
  interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }
  
  declare global {
    interface Window {
      Razorpay: any; 
    }
  }


  interface OrderInterface {
    orderId: string;
    amount: number;
  }

  interface OrderInterface2 {
    data: {

    orderId: string;
    amount: number;
  }
  }