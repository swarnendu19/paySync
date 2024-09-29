// Auth response after obtaining access token or API authentication
export interface IRazorpayAuthResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
  }
  
  // Options for initializing Razorpay client
  export interface IRazorpayOptions {
    keyId: string;         // Razorpay API Key ID
    keySecret: string;     // Razorpay API Key Secret
    sandbox?: boolean;     // Whether to use sandbox environment or not
  }
  
  // Payload required to create a Razorpay order
  export interface IRazorpayPayload {
    amount: number;        // Amount in the smallest currency unit (e.g., 100 for INR 1.00)
    currency: string;      // The currency in which the payment is to be made (e.g., "INR")
    receipt?: string;      // Receipt number for tracking
    payment_capture?: number; // Auto capture (1) or manual capture (0)
    notes?: Record<string, string>; // Additional notes
  }
  
  // Response after creating an order in Razorpay
  export interface IRazorpayOrderResponse {
    id: string;            // Order ID
    entity: string;        // Entity type (e.g., "order")
    amount: number;        // Amount in the smallest currency unit
    currency: string;      // Currency used (e.g., "INR")
    receipt: string;       // Receipt number
    status: string;        // Status of the order (e.g., "created")
    attempts: number;      // Number of attempts for the payment
    created_at: number;    // Timestamp of when the order was created
    notes?: Record<string, string>; // Any additional notes
  }
  