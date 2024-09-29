import axios from 'axios';
import { PaymentGateway, PaymentConfig } from '../types/razorpayTypes';

export class Razorpay implements PaymentGateway {
  private apiKey: string = '';
  private secretKey: string = '';

  initialize(config: PaymentConfig): void {
    this.apiKey = config.apiKey || '';
    this.secretKey = config.secretKey || '';
  }

  async charge(amount: number, currency: string, customerDetails: any): Promise<any> {
    try {
      const response = await axios.post(
        'https://api.razorpay.com/v1/orders',
        {
          amount: amount * 100,
          currency: currency,
          receipt: `receipt#${Math.floor(Math.random() * 100)}`,
          payment_capture: 1,
        },
        {
          auth: {
            username: this.apiKey,
            password: this.secretKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      //@ts-ignore
      throw new Error(`Razorpay charge failed: ${error.response?.data?.error?.description || error.message}`);
    }
  }
}
