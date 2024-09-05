import {Stripe as StripeSDK} from 'stripe';
import { StripeWebhookEventResponse, StripWebHookPlyload } from '../types/stripe';


export class Stripe{
    private stripe: StripeSDK;
    constructor(
        private apiKey: string,
        config?: StripeSDK.StripeConfig
    ){
        this.stripe = new StripeSDK(apiKey, config);
    }

    async generatePaymentURL(checkoutDetails: StripeSDK.Checkout.SessionCreateParams): Promise<string> {
        const paymentSession = await this.stripe.checkout.sessions.create(checkoutDetails);
        // console.log(paymentSession);
        
        if (!paymentSession.url) {
            throw new Error("Unable to generate payment URL.");
        }
    
        return paymentSession.url;
    }

    async validateWebhookSignature(webhookPayload:StripWebHookPlyload): Promise<StripeWebhookEventResponse> {
        try {
          const verifiedEvent = await this.stripe.webhooks.constructEventAsync(
            webhookPayload.requestBody,
            webhookPayload.signatureHeader,
            webhookPayload.webHooksSecret  
        );
      
          return {
            event: verifiedEvent,
          };
        } catch (error) {
          return {
            error: error as Error,
          };
        }
      }      
}