export interface StripWebHookPlyload{
    signatureHeader: string;
    webHooksSecret: string;
    requestBody: string;
}

export type StripeWebhookEventResponse = {
    event?: any;   
    error?: Error;  
  };
  