import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'stripemcp_cancel_subscription',
    description: `Immediately cancel an active Stripe subscription. The subscription ends at the current period and no further charges are made. This is irreversible — use Update Subscription to pause or downgrade instead.`,
    params: [
      {
        name: 'subscription',
        type: 'string',
        required: true,
        description: `ID of the subscription to cancel immediately. Cancellation is permanent — the subscription cannot be reactivated.`,
      },
    ],
  },
  {
    name: 'stripemcp_create_coupon',
    description: `Create a discount coupon that applies a percentage or fixed amount off. Use percent_off for percentage discounts or amount_off+currency for fixed discounts. Set duration to once, forever, or repeating.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Internal name for the coupon shown in the Stripe dashboard and on invoices.`,
      },
      {
        name: 'amount_off',
        type: 'number',
        required: false,
        description: `Fixed discount amount in the smallest currency unit (e.g. 500 = .00 off). Requires currency. Use this or percent_off — not both.`,
      },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `Required when using amount_off. Three-letter ISO currency code matching the discount amount.`,
      },
      {
        name: 'duration',
        type: 'string',
        required: false,
        description: `How long the coupon applies: once (first invoice only), forever (all invoices), or repeating (for duration_in_months months).`,
      },
      {
        name: 'duration_in_months',
        type: 'number',
        required: false,
        description: `Number of months the discount applies when duration is repeating.`,
      },
      {
        name: 'percent_off',
        type: 'number',
        required: false,
        description: `Percentage discount between 0 and 100. Use this or amount_off — not both.`,
      },
    ],
  },
  {
    name: 'stripemcp_create_customer',
    description: `Create a new Stripe customer record with a name and optional email. Returns the customer ID (cus_...) used in invoices, subscriptions, and payment intents.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full name of the customer as it will appear on invoices and receipts.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Customer email address. Used for receipt delivery and customer lookup.`,
      },
    ],
  },
  {
    name: 'stripemcp_create_invoice',
    description: `Create a draft invoice for a customer. The invoice starts in draft status — add line items with Create Invoice Item, then call Finalize Invoice to mark it ready for payment.`,
    params: [
      {
        name: 'customer',
        type: 'string',
        required: true,
        description: `ID of the Stripe customer to bill. Add line items with Create Invoice Item after creating the invoice.`,
      },
      {
        name: 'days_until_due',
        type: 'number',
        required: false,
        description: `Payment due date expressed as days from today. Used for net-terms invoices (e.g. 30 for net-30). Leave blank for invoices collected immediately.`,
      },
    ],
  },
  {
    name: 'stripemcp_create_invoice_item',
    description: `Add a line item to an existing draft invoice using a price ID. The invoice must be in draft status. Both the customer and invoice IDs are required to associate the item correctly.`,
    params: [
      {
        name: 'customer',
        type: 'string',
        required: true,
        description: `ID of the customer the invoice belongs to. Must match the customer on the invoice.`,
      },
      {
        name: 'invoice',
        type: 'string',
        required: true,
        description: `ID of the draft invoice to add this line item to. Invoice must be in draft status.`,
      },
      {
        name: 'price',
        type: 'string',
        required: true,
        description: `ID of the price to add as a line item. The price determines amount and currency.`,
      },
    ],
  },
  {
    name: 'stripemcp_create_payment_link',
    description: `Create a shareable payment link for a price. Returns a URL that customers can open to complete payment without a custom checkout integration. Requires at least one payment method enabled in your Stripe dashboard.`,
    params: [
      {
        name: 'price',
        type: 'string',
        required: true,
        description: `ID of the price to sell via this link. The price must be active.`,
      },
      {
        name: 'quantity',
        type: 'number',
        required: true,
        description: `Number of units to include in the payment. Use 1 for single-item purchases.`,
      },
    ],
  },
  {
    name: 'stripemcp_create_price',
    description: `Create a one-time or recurring price for a product. Amounts are in the smallest currency unit (cents for USD). Omit recurring for one-time prices; include it for subscription billing.`,
    params: [
      {
        name: 'currency',
        type: 'string',
        required: true,
        description: `Three-letter ISO 4217 currency code (lowercase). Must match the currency of your Stripe account.`,
      },
      {
        name: 'product',
        type: 'string',
        required: true,
        description: `ID of the product this price belongs to. Create a product first if you do not have one.`,
      },
      {
        name: 'unit_amount',
        type: 'number',
        required: true,
        description: `Price in the smallest currency unit (e.g. cents for USD). 2000 = .00. Use 0 for free prices.`,
      },
      {
        name: 'recurring',
        type: 'object',
        required: false,
        description: `Include to create a recurring/subscription price. Omit for one-time prices. interval must be day, week, month, or year.`,
      },
    ],
  },
  {
    name: 'stripemcp_create_product',
    description: `Create a product in Stripe representing a good or service. Products are the parent objects for prices — create a product first, then attach prices to it.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Product name shown on invoices and in the Stripe dashboard.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional product description shown on invoices and checkout pages.`,
      },
    ],
  },
  {
    name: 'stripemcp_create_refund',
    description: `Issue a full or partial refund for a succeeded PaymentIntent. Omit amount to refund the full charge. The PaymentIntent must have a successful charge — refunding a pending or failed intent will error.`,
    params: [
      {
        name: 'payment_intent',
        type: 'string',
        required: true,
        description: `ID of the PaymentIntent to refund. The payment must have a succeeded charge. Get it from the charge or invoice object.`,
      },
      {
        name: 'amount',
        type: 'integer',
        required: false,
        description: `Amount to refund in cents. Omit to refund the full amount. Must be less than or equal to the original charge amount.`,
      },
      {
        name: 'human_confirmation',
        type: 'object',
        required: false,
        description: `Optional confirmation object for human-in-the-loop approval flows. Pass {"confirmed": true} to bypass the approval step when running in an automated context.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for the refund. Valid values: duplicate, fraudulent, requested_by_customer. Shown on the refund receipt.`,
      },
    ],
  },
  {
    name: 'stripemcp_fetch_stripe_resources',
    description: `Retrieve a Stripe object by its ID. Works with any Stripe resource ID (cus_..., pi_..., in_..., sub_..., prod_..., price_..., dp_...). Returns the full object details.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of any Stripe object to retrieve (e.g. cus_..., pi_..., in_..., sub_..., prod_..., price_..., dp_...). The resource type is inferred from the ID prefix.`,
      },
    ],
  },
  {
    name: 'stripemcp_finalize_invoice',
    description: `Finalize a draft invoice to lock it and make it ready for payment. After finalization, the invoice status changes from draft to open and a PaymentIntent is created automatically.`,
    params: [
      {
        name: 'invoice',
        type: 'string',
        required: true,
        description: `ID of the draft invoice to finalize. Finalization locks the invoice and generates a PaymentIntent for collection.`,
      },
    ],
  },
  {
    name: 'stripemcp_get_stripe_account_info',
    description: `Retrieve information about the connected Stripe account, including account ID, business name, country, currency, and account type (standard, express, or custom).`,
    params: [],
  },
  {
    name: 'stripemcp_retrieve_balance',
    description: `Retrieve the current balance for the connected Stripe account, broken down by currency and availability (available vs. pending funds).`,
    params: [],
  },
  {
    name: 'stripemcp_search_stripe_documentation',
    description: `Search Stripe official documentation and API reference for answers. Use this to look up Stripe concepts, API parameters, error codes, or integration guidance.`,
    params: [
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `The question or topic to search Stripe documentation for.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Programming language for code examples in results. Defaults to no specific language.`,
      },
      {
        name: 'search_only_api_ref',
        type: 'boolean',
        required: false,
        description: `Set to true to search only the API reference. Set to false (default) to search all documentation including guides and tutorials.`,
      },
    ],
  },
  {
    name: 'stripemcp_search_stripe_resources',
    description: `Search Stripe resources using the format resource:query (e.g. customers:name:"Acme" or invoices:status:"open"). Valid resources: customers, payment_intents, charges, invoices, prices, products, subscriptions.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query in resource:search_term format. Valid resources: customers, payment_intents, charges, invoices, prices, products, subscriptions. Example: customers:name:"Acme" or invoices:status:"open".`,
      },
    ],
  },
  {
    name: 'stripemcp_send_stripe_mcp_feedback',
    description: `Submit feedback about a Stripe MCP tool experience. Use source=user for feedback from a human, source=agent for feedback generated by an AI agent.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Additional context about what you were trying to do when you used the tool.`,
      },
      {
        name: 'quote',
        type: 'string',
        required: true,
        description: `A direct quote or specific observation about the tool experience.`,
      },
      {
        name: 'sentiment',
        type: 'string',
        required: true,
        description: `Sentiment of the feedback. Valid values: positive, negative, neutral.`,
      },
      {
        name: 'source',
        type: 'string',
        required: true,
        description: `Who generated this feedback. Valid values: user (human feedback), agent (AI-generated feedback).`,
      },
      {
        name: 'tool_name',
        type: 'string',
        required: false,
        description: `Name of the specific Stripe MCP tool this feedback is about.`,
      },
    ],
  },
  {
    name: 'stripemcp_stripe_api_details',
    description: `Get the full parameter schema for a specific Stripe API operation. Use stripe_api_search to find the operation ID first (e.g. GetCustomers, PostRefunds), then call this to see all available parameters.`,
    params: [
      {
        name: 'stripe_api_operation_id',
        type: 'string',
        required: true,
        description: `The Stripe API operation ID to get details for. Get valid IDs from stripe_api_search (e.g. GetCustomers, PostRefunds, PostSubscriptions).`,
      },
    ],
  },
  {
    name: 'stripemcp_stripe_api_execute',
    description: `Execute any Stripe API operation by its operation ID and parameters. Use stripe_api_search to discover available operations and stripe_api_details to see their parameters before executing.`,
    params: [
      {
        name: 'parameters',
        type: 'object',
        required: true,
        description: `Parameters to pass to the Stripe API operation. Must match the schema returned by stripe_api_details. Pass as a JSON object.`,
      },
      {
        name: 'stripe_api_operation_id',
        type: 'string',
        required: true,
        description: `The Stripe API operation ID to execute. Use stripe_api_search to find available operations and stripe_api_details to see required parameters.`,
      },
      {
        name: 'human_confirmation',
        type: 'object',
        required: false,
        description: `Optional confirmation object for human-in-the-loop approval flows. Pass {"confirmed": true} to bypass the approval step when running in an automated context.`,
      },
    ],
  },
  {
    name: 'stripemcp_stripe_api_search',
    description: `Search available Stripe API operations by keyword. Returns operation IDs (e.g. PostCustomers, GetSubscriptions) with their HTTP method and parameters — use these with stripe_api_details or stripe_api_execute.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Keyword to search Stripe API operations. Returns operation IDs with their HTTP method and parameters. Examples: "create customer", "list invoices", "refund".`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of operations to return. Defaults to all matches.`,
      },
    ],
  },
  {
    name: 'stripemcp_stripe_integration_recommender',
    description: `Get a recommendation on which Stripe integration pattern best fits a use case (e.g. Checkout, Payment Intents, Billing). Describe the payment scenario in the answer field.`,
    params: [
      {
        name: 'answer',
        type: 'string',
        required: true,
        description: `Describe your payment scenario or what you want to build. Be specific about whether payments are one-time or recurring, and whether you need a hosted checkout or custom UI.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Additional context about your integration requirements, constraints, or current setup.`,
      },
      {
        name: 'plan_id',
        type: 'string',
        required: false,
        description: `Optional Stripe product or plan ID if you already have a pricing structure set up. Must follow format lplan_... Leave blank if not applicable.`,
      },
    ],
  },
  {
    name: 'stripemcp_update_dispute',
    description: `Submit evidence or update an open Stripe dispute (chargeback). Pass submit=true to send the evidence to Stripe immediately, or false to save it as a draft for later submission.`,
    params: [
      {
        name: 'dispute',
        type: 'string',
        required: true,
        description: `ID of the dispute to update. Get dispute IDs from the Stripe dashboard or by listing disputes via stripe_api_execute with GetDisputes.`,
      },
      {
        name: 'evidence',
        type: 'object',
        required: false,
        description: `Evidence object to submit for the dispute. Include fields like customer_purchase_ip, product_description, and shipping_documentation as applicable.`,
      },
      {
        name: 'submit',
        type: 'boolean',
        required: false,
        description: `Set to true to submit the evidence to Stripe immediately. Set to false to save as a draft. Once submitted, evidence cannot be changed.`,
      },
    ],
  },
  {
    name: 'stripemcp_update_subscription',
    description: `Update an active subscription — change its price, quantity, or proration behavior. Use proration_behavior=create_prorations to credit unused time when upgrading plans.`,
    params: [
      {
        name: 'subscription',
        type: 'string',
        required: true,
        description: `ID of the subscription to update.`,
      },
      {
        name: 'items',
        type: 'array',
        required: false,
        description: `Array of subscription items to update. Each item needs the subscription item ID (si_...) and new price ID. Used to change plan or quantity.`,
      },
      {
        name: 'proration_behavior',
        type: 'string',
        required: false,
        description: `How to handle proration when changing plans mid-cycle. create_prorations credits unused time; none skips proration; always_invoice immediately bills the difference.`,
      },
    ],
  },
]
