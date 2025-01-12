import axios from "axios";
import { useEffect, useRef } from "react";
import { useRazorpayContext } from "../context/RazorpayContext";
interface RenderRazorpayProps {
    orderId: string;
    keyId: string;
    keySecret: string;
    musicId: string;
    amount: number;
  }

  declare global {
    interface Window {
      Razorpay: any; 
    }
  }


export const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        console.log("Razorpay script already loaded");
        resolve(true);
        return;
      }
  
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        resolve(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        reject(new Error(`Failed to load script: ${src}`));
      };
      document.body.appendChild(script);
    });
  };
  

export const RenderRazorpay:React.FC<RenderRazorpayProps> = ({ orderId,
    keyId,
    keySecret,
    musicId,
    amount,}) => {
            const paymentId = useRef<any>(null);
            const paymentMethod = useRef<any>(null);
            const {setDisplayRazorpay} = useRazorpayContext();
            const options:RazorpayOptions = {
                key: keyId,
                amount,
                currency: 'INR',
                order_id: orderId,
                name: 'Musify',
                handler:async (response) => {
                  setDisplayRazorpay(false);  
                  await axios.post('/payment-capture', {response, musicId}, {withCredentials: true} )
                },
                modal: {
                    confirm_close: true,
                    ondismiss: () => {
                      console.log("payment modal closed by user");
                      setDisplayRazorpay(false);
                    }
                },

                prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "900 0090000"
    },
            }

            const displayRazorpay = async (options: RazorpayOptions) => {
                const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
              console.log("display called")
                if(!res){
                    console.log('Razorpay SDK failed to load. Are you online?');
      return;
                }
                if (!window.Razorpay) {
                    console.error("Razorpay is not available on the window object.");
                    return;
                  }
                  if(res) {
                    console.log("opend")
                  }
                const rzpl = new window.Razorpay(options);
                rzpl.on('payment-submit', (response: any) => {
                    paymentMethod.current = response.method;
                }) 
                rzpl.on('payment-failed', (response: any) => {
                    paymentId.current =  response.error.metadata.payment_id;
                })

                rzpl.open();
            }

            const handlePayment = async (status: string, orderDetails: OrderInterface) => {
                await axios.post("http://localhost/3000/payment", {
                    status, orderDetails
                });
            }

            useEffect(() => {
                console.log('in razorpay');
                displayRazorpay(options);
              }, []);

        return null

}