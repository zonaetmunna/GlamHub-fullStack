import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export interface PaymentIntentData {
  amount: number; // Amount in cents
  currency: string;
  orderId: string;
  customerId?: string;
  customerEmail: string;
  customerName?: string;
  shippingAddress?: Stripe.PaymentIntentCreateParams.Shipping;
  metadata?: Record<string, string>;
}

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

/**
 * Create a payment intent for an order
 */
export async function createPaymentIntent(
  data: PaymentIntentData
): Promise<PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // Convert to cents
      currency: data.currency.toLowerCase(),
      customer: data.customerId,
      receipt_email: data.customerEmail,
      shipping: data.shippingAddress,
      metadata: {
        orderId: data.orderId,
        customerEmail: data.customerEmail,
        customerName: data.customerName || "",
        ...data.metadata,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      id: paymentIntent.id,
      clientSecret: paymentIntent.client_secret!,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent");
  }
}

/**
 * Retrieve a payment intent
 */
export async function getPaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    throw new Error("Failed to retrieve payment intent");
  }
}

/**
 * Confirm a payment intent
 */
export async function confirmPaymentIntent(
  paymentIntentId: string,
  paymentMethodId?: string
): Promise<Stripe.PaymentIntent> {
  try {
    const params: Stripe.PaymentIntentConfirmParams = {};

    if (paymentMethodId) {
      params.payment_method = paymentMethodId;
    }

    return await stripe.paymentIntents.confirm(paymentIntentId, params);
  } catch (error) {
    console.error("Error confirming payment intent:", error);
    throw new Error("Failed to confirm payment intent");
  }
}

/**
 * Cancel a payment intent
 */
export async function cancelPaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  try {
    return await stripe.paymentIntents.cancel(paymentIntentId);
  } catch (error) {
    console.error("Error cancelling payment intent:", error);
    throw new Error("Failed to cancel payment intent");
  }
}

/**
 * Create or retrieve a Stripe customer
 */
export async function createOrGetCustomer(
  email: string,
  name?: string,
  phone?: string
): Promise<Stripe.Customer> {
  try {
    // First, try to find existing customer
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0];
    }

    // Create new customer if not found
    return await stripe.customers.create({
      email,
      name,
      phone,
    });
  } catch (error) {
    console.error("Error creating/getting customer:", error);
    throw new Error("Failed to create or retrieve customer");
  }
}

/**
 * Create a refund for a payment
 */
export async function createRefund(
  paymentIntentId: string,
  amount?: number,
  reason?: Stripe.RefundCreateParams.Reason
): Promise<Stripe.Refund> {
  try {
    const refundParams: Stripe.RefundCreateParams = {
      payment_intent: paymentIntentId,
    };

    if (amount) {
      refundParams.amount = Math.round(amount * 100); // Convert to cents
    }

    if (reason) {
      refundParams.reason = reason;
    }

    return await stripe.refunds.create(refundParams);
  } catch (error) {
    console.error("Error creating refund:", error);
    throw new Error("Failed to create refund");
  }
}

/**
 * Handle Stripe webhook events
 */
export async function handleWebhookEvent(
  payload: string | Buffer,
  signature: string
): Promise<Stripe.Event> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    throw new Error("Invalid webhook signature");
  }
}

/**
 * Process webhook events
 */
export async function processWebhookEvent(event: Stripe.Event): Promise<void> {
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
        break;

      case "charge.dispute.created":
        await handleChargeDispute(event.data.object as Stripe.Dispute);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook event:", error);
    throw error;
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  try {
    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) {
      console.error("No orderId found in payment intent metadata");
      return;
    }

    // Note: Update order status in database after schema is applied
    console.log(`Payment succeeded for order ${orderId}:`, paymentIntent.id);

    // TODO: Implement after schema update
    // 1. Update order status to PAID
    // 2. Update payment details
    // 3. Send confirmation email
    // 4. Trigger fulfillment process
  } catch (error) {
    console.error("Error handling payment success:", error);
    throw error;
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailure(
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  try {
    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) {
      console.error("No orderId found in payment intent metadata");
      return;
    }

    console.log(`Payment failed for order ${orderId}:`, paymentIntent.id);

    // TODO: Implement after schema update
    // 1. Update order status to FAILED
    // 2. Send payment failure notification
    // 3. Restore product inventory if needed
  } catch (error) {
    console.error("Error handling payment failure:", error);
    throw error;
  }
}

/**
 * Handle charge dispute
 */
async function handleChargeDispute(dispute: Stripe.Dispute): Promise<void> {
  try {
    console.log("Charge dispute created:", dispute.id);

    // TODO: Implement dispute handling
    // 1. Notify admin of dispute
    // 2. Update order status if applicable
    // 3. Prepare dispute response if needed
  } catch (error) {
    console.error("Error handling charge dispute:", error);
    throw error;
  }
}

/**
 * Calculate application fee for marketplace transactions
 */
export function calculateApplicationFee(
  amount: number,
  feePercentage: number = 0.025
): number {
  return Math.round(amount * feePercentage * 100); // Return in cents
}

/**
 * Validate webhook signature (for route handlers)
 */
export function validateWebhookSignature(
  payload: string | Buffer,
  signature: string
): boolean {
  try {
    handleWebhookEvent(payload, signature);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Format amount for display (convert from cents to dollars)
 */
export function formatAmount(
  amountInCents: number,
  currency: string = "USD"
): string {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

/**
 * Get supported payment methods for the application
 */
export function getSupportedPaymentMethods(): string[] {
  return ["card", "apple_pay", "google_pay", "link", "us_bank_account"];
}

export default stripe;
