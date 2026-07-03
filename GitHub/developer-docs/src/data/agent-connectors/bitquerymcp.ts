import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'bitquerymcp_accumulating_traders_by_token',
    description: `Find wallets with the highest net buy volume for a token over a given time window.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `Token contract address. Lowercase 0x-hex for EVM; base58 for Solana/Tron.`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: true,
        description: `Token_Network — Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, or Solana.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max traders to return.` },
      {
        name: 'min_net_buy_usd',
        type: 'integer',
        required: false,
        description: `Filter out traders whose net accumulation is below this USD threshold.`,
      },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours. Max 720 (30 days).`,
      },
    ],
  },
  {
    name: 'bitquerymcp_currency_ohlcv',
    description: `Retrieve OHLCV (open, high, low, close, volume) price series for a well-known currency like USDC, USDT, or WETH.`,
    params: [
      {
        name: 'currency_id',
        type: 'string',
        required: true,
        description: `Currency_Id — lower-case name for well-known currencies (e.g. usdc, usdt, weth), or \`bid:<blockchain>\` for native currencies (e.g. bid:eth, bid:solana).`,
      },
      {
        name: 'interval_seconds',
        type: 'integer',
        required: false,
        description: `Candle size in seconds. One of 1, 3, 5, 10, 30, 60, 300, 900, 1800, 3600.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max candles to return (most recent first).`,
      },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours from now. Keep reasonable relative to interval size.`,
      },
    ],
  },
  {
    name: 'bitquerymcp_currency_price',
    description: `Get the latest price for a well-known currency such as USDC, USDT, or WETH.`,
    params: [
      {
        name: 'currency_id',
        type: 'string',
        required: true,
        description: `Currency_Id — lower-case name for well-known currencies (e.g. usdc, usdt, weth), or \`bid:<blockchain>\` for native currencies (e.g. bid:eth, bid:solana).`,
      },
    ],
  },
  {
    name: 'bitquerymcp_currency_supply',
    description: `Retrieve the total and circulating supply for a well-known currency.`,
    params: [
      {
        name: 'currency_id',
        type: 'string',
        required: true,
        description: `Currency_Id — lower-case name for well-known currencies (e.g. usdc, usdt, weth), or \`bid:<blockchain>\` for native currencies (e.g. bid:eth, bid:solana).`,
      },
    ],
  },
  {
    name: 'bitquerymcp_execute_sql',
    description: `Execute a raw SQL query against the Bitquery blockchain data warehouse and return the results.`,
    params: [
      { name: 'sql', type: 'string', required: true, description: `The SQL statement to execute.` },
    ],
  },
  {
    name: 'bitquerymcp_find_currencies',
    description: `Search for well-known currencies by name or symbol and return matching results.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Case-insensitive substring matched against Currency_Name and Currency_Symbol (e.g. "usdc", "ether").`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max rows to return.` },
    ],
  },
  {
    name: 'bitquerymcp_find_token_by_address',
    description: `Look up a token's metadata and trading details using its contract address and blockchain.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `Token address. Lowercase 0x-hex for EVM; base58 as-is for Solana/Tron.`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: true,
        description: `Token_Network — one of Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, Solana.`,
      },
    ],
  },
  {
    name: 'bitquerymcp_find_tokens',
    description: `Search for tokens by name or symbol across one or all blockchains and return matching results.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Case-insensitive substring matched against Token_Name and Token_Symbol (e.g. "pepe", "wrapped eth").`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: false,
        description: `Exact Token_Network to restrict to — one of Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, Solana. Pass empty string to search all chains.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max rows to return.` },
    ],
  },
  {
    name: 'bitquerymcp_pair_ohlcv',
    description: `Retrieve OHLCV price series for a specific base/quote token pair on a given blockchain.`,
    params: [
      {
        name: 'base_address',
        type: 'string',
        required: true,
        description: `Base token contract address (the asset being priced). Lowercase 0x-hex for EVM; base58 as-is for Solana/Tron.`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: true,
        description: `Token_Network — Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, or Solana. Base and quote must be on the same network.`,
      },
      {
        name: 'quote_address',
        type: 'string',
        required: true,
        description: `Quote token contract address (the asset the price is expressed in — e.g. WETH, USDC, WSOL).`,
      },
      {
        name: 'interval_seconds',
        type: 'integer',
        required: false,
        description: `Candle size in seconds. One of 1, 3, 5, 10, 30, 60, 300, 900, 1800, 3600.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max candles to return (most recent first).`,
      },
      {
        name: 'quote_in',
        type: 'string',
        required: false,
        description: `"usd" (default) for USD-priced candles; "quote" for candles priced in the quote token.`,
      },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours from now.`,
      },
    ],
  },
  {
    name: 'bitquerymcp_pair_price',
    description: `Get the latest price of a base token denominated in a quote token on a given blockchain.`,
    params: [
      {
        name: 'base_address',
        type: 'string',
        required: true,
        description: `Base token contract address (the asset whose price and supply you want). Lowercase 0x-hex for EVM; base58 as-is for Solana/Tron.`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: true,
        description: `Token_Network — Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, or Solana. Base and quote must be on the same network.`,
      },
      {
        name: 'quote_address',
        type: 'string',
        required: true,
        description: `Quote token contract address (the asset the price is expressed in — e.g. WETH, USDC, WSOL).`,
      },
    ],
  },
  {
    name: 'bitquerymcp_profitable_traders_by_token',
    description: `Find the most profitable traders (by realized PnL) for a token over a given time window.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `Token contract address. Lowercase 0x-hex for EVM; base58 for Solana/Tron.`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: true,
        description: `Token_Network — Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, or Solana.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max traders to return.` },
      {
        name: 'min_pnl_usd',
        type: 'integer',
        required: false,
        description: `Filter out traders whose estimated total P&L is below this USD threshold.`,
      },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours. Max 720 (30 days).`,
      },
    ],
  },
  {
    name: 'bitquerymcp_token_ohlcv',
    description: `Retrieve OHLCV price series for a token by contract address on a given blockchain.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `Token contract address. Lowercase 0x-hex for EVM; base58 as-is for Solana/Tron.`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: true,
        description: `Token_Network — Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, or Solana.`,
      },
      {
        name: 'interval_seconds',
        type: 'integer',
        required: false,
        description: `Candle size in seconds. One of 1, 3, 5, 10, 30, 60, 300, 900, 1800, 3600.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max candles to return (most recent first).`,
      },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours from now. Keep reasonable relative to interval size (e.g. 24 for 1m candles, 720 for 1h candles).`,
      },
    ],
  },
  {
    name: 'bitquerymcp_token_price',
    description: `Get the latest price and market cap for a token by its contract address.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `Token contract address. Lowercase 0x-hex for EVM; base58 as-is for Solana/Tron.`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: true,
        description: `Token_Network — Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, or Solana.`,
      },
    ],
  },
  {
    name: 'bitquerymcp_token_supply',
    description: `Retrieve the total and circulating supply for a token by its contract address.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `Token contract address. Lowercase 0x-hex for EVM; base58 as-is for Solana/Tron.`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: true,
        description: `Token_Network — Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, or Solana.`,
      },
    ],
  },
  {
    name: 'bitquerymcp_top_traders_by_network',
    description: `Find the most active or highest-volume DEX traders on a blockchain over a given time window.`,
    params: [
      {
        name: 'blockchain',
        type: 'string',
        required: true,
        description: `Token_Network — Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, or Solana.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max traders to return.` },
      {
        name: 'min_trade_usd',
        type: 'integer',
        required: false,
        description: `Minimum per-trade USD size to count. 0 = all trades.`,
      },
      { name: 'sort', type: 'string', required: false, description: `One of volume_usd, trades.` },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours. Keep small — max 24.`,
      },
    ],
  },
  {
    name: 'bitquerymcp_top_traders_by_pair',
    description: `Find the top traders for a specific base/quote token pair over a given time window.`,
    params: [
      {
        name: 'base_address',
        type: 'string',
        required: true,
        description: `Base token contract address (the asset whose net position you want to measure). Lowercase 0x-hex for EVM; base58 for Solana/Tron.`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: true,
        description: `Token_Network — Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, or Solana.`,
      },
      {
        name: 'quote_address',
        type: 'string',
        required: true,
        description: `Quote token contract address (the asset used to price the base — e.g. WETH, USDC, USDT).`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max traders to return.` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `One of volume_usd, trades, net_buy_usd, realized_usd.`,
      },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours. Max 720 (30 days).`,
      },
    ],
  },
  {
    name: 'bitquerymcp_top_traders_by_token',
    description: `Find the most active or highest-volume traders for a specific token over a given time window.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `Token contract address. Lowercase 0x-hex for EVM; base58 as-is for Solana/Tron.`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: true,
        description: `Token_Network — Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, or Solana.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max traders to return.` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `One of volume_usd, trades, net_buy_usd, realized_usd.`,
      },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours. Max 720 (30 days).`,
      },
    ],
  },
  {
    name: 'bitquerymcp_trader_activity',
    description: `Retrieve a wallet's trading activity bucketed by time interval to show trading patterns.`,
    params: [
      {
        name: 'trader_address',
        type: 'string',
        required: true,
        description: `Wallet address. Lowercase 0x-hex for EVM; base58 as-is for Solana/Tron.`,
      },
      {
        name: 'bucket',
        type: 'string',
        required: false,
        description: `Time-bucket granularity. One of minute, fifteenmin, hour (default), day.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max buckets to return (most recent first).`,
      },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours. Max 720 (30 days).`,
      },
    ],
  },
  {
    name: 'bitquerymcp_trader_positions',
    description: `Retrieve the current token positions held by a trader wallet across blockchains.`,
    params: [
      {
        name: 'trader_address',
        type: 'string',
        required: true,
        description: `Wallet address. Lowercase 0x-hex for EVM; base58 as-is for Solana/Tron.`,
      },
      {
        name: 'blockchain',
        type: 'string',
        required: false,
        description: `Optional Token_Network filter. Pass '' for all chains.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max positions to return.` },
      {
        name: 'min_position_usd',
        type: 'integer',
        required: false,
        description: `Keep only positions whose |Position_Value_Usd| ≥ this USD threshold.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `One of position_usd, pnl_usd, realized_usd, volume_usd, last_trade.`,
      },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours. Max 720 (30 days).`,
      },
    ],
  },
  {
    name: 'bitquerymcp_trader_profile',
    description: `Get a summary profile of a wallet's recent trading behavior, including tokens traded and volume.`,
    params: [
      {
        name: 'trader_address',
        type: 'string',
        required: true,
        description: `Wallet address. Lowercase 0x-hex for EVM; base58 as-is for Solana/Tron.`,
      },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours. Max 720 (30 days).`,
      },
    ],
  },
  {
    name: 'bitquerymcp_trending_tokens',
    description: `Find trending tokens by volume or trade count on a blockchain over a given time window.`,
    params: [
      {
        name: 'blockchain',
        type: 'string',
        required: false,
        description: `Token_Network to restrict to — Ethereum, Arbitrum, Base, Matic, Optimism, Binance Smart Chain, Tron, Solana. Pass empty string for all chains.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max tokens to return.` },
      {
        name: 'min_volume_usd',
        type: 'integer',
        required: false,
        description: `Minimum window USD volume to be included. Raise when ranking by price change to avoid illiquid noise.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `One of volume_usd, gainers, losers, price_change.`,
      },
      {
        name: 'window_hours',
        type: 'integer',
        required: false,
        description: `Look-back window in hours. Typical 1, 6, 24. Max 168.`,
      },
    ],
  },
]
