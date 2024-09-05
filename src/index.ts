import { Stripe } from "./lib/stripe";

//THis is testing function of Stripe Class
async function run() {
    const stripe = new Stripe('Use Personal Stripe api key'); 
    
    //Example testing data
     const checkoutDetails: any = {
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Test Product',
                    },
                     unit_amount: 2000, //($20)
                },
                quantity: 1,
            }
        ],
        mode: 'payment', 
        success_url: 'https://abc.com/success',
        cancel_url: 'https://abc.com/cancel',
    };

    try {
        const url = await stripe.generatePaymentURL(checkoutDetails);
        console.log('Generated URL:', url);
    } catch (error) {
        console.error('Error generating URL:', error.message);
    }
}
run();
