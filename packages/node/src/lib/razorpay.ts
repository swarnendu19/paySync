import { IRazorpayAuthResponse, IRazorpayOptions, IRazorpayOrderResponse, IRazorpayPayload } from "../types/razorpayTypes";
import { PayFetch } from "../utils/fetch";

export class Razorpay extends PayFetch {
  constructor(private options: IRazorpayOptions) {
    super();
  }

  private getApiBaseUrl() {
    if (this.options.sandbox) {
      return "https://api.sandbox.razorpay.com";
    }
    return "https://api.razorpay.com";
  }

  private getKeyId() {
    return this.options.keyId;
  }

  private getKeySecret() {
    return this.options.keySecret;
  }

  private getApiOrderUrl() {
    return `${this.getApiBaseUrl()}/v1/orders`;
  }

  async getAccessToken() {
    const url = `${this.getApiBaseUrl()}/v1/auth`;

    const auth = btoa(`${this.getKeyId()}:${this.getKeySecret()}`);

    const [response] = await this.jsonFetch<IRazorpayAuthResponse>(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    return response.access_token;
  }

  async createOrder(payload: IRazorpayPayload) {
    const accessToken = await this.getAccessToken();

    const [res] = await this.jsonFetch<IRazorpayOrderResponse>(
      this.getApiOrderUrl(),
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.id) {
      throw new Error("Failed to create order");
    }

    return res;
  }
}
