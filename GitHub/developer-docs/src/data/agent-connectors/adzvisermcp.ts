import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_activecampaign',
    description: `Get the list of selectable ActiveCampaign metrics, such as Contacts, Sends, Opens, Clicks, and breakdowns like Campaign Name, List Name etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_adroll',
    description: `Get the list of selectable AdRoll metrics, such as Impressions, Clicks, Spend, Conversions, and breakdowns like Campaign Name, Ad Group, Creative etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_amazon_ads',
    description: `Get the list of selectable Amazon Ads metrics like Purchases, Spend etc. and breakdowns like Campaign name, Keyword text, and ASIN etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_amazon_seller',
    description: `Get the list of selectable Amazon Seller Central metrics like Item price, Orders shipped, etc. and breakdowns like ASIN, Order channel, and Product name etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_apple_ads',
    description: `Get the list of selectable Apple Ads (Apple Search Ads) metrics, such as Impressions, Taps, Installs, Spend, and breakdowns like Campaign Name, Ad Group, Keyword etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_bigcommerce',
    description: `Get the list of selectable BigCommerce metrics like Orders, Revenue, Items sold, and breakdowns like Product name, Customer email, and Order status etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_bing_ads',
    description: `Get the list of selectable Bing Ads metrics like Impressions, Cost, Clicks, etc. and breakdowns like Campaign name, Keyword, and Device type etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_bing_webmaster',
    description: `Get the list of selectable Bing Webmaster metrics like Clicks, Impressions, CTR, and breakdowns like Query, Page URL, and Country etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_callrail',
    description: `Get the list of selectable CallRail metrics like Total calls, Answered calls, Call duration, and breakdowns like Tracking number, Source, and Campaign etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_cm360',
    description: `Get the list of selectable Campaign Manager 360 (CM360) metrics, such as Impressions, Clicks, Conversions, and breakdowns like Campaign Name, Site, Placement etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_dv360',
    description: `Get the list of selectable Display & Video 360 (DV360) metrics, such as Impressions, Clicks, Revenue, and breakdowns like Campaign Name, Insertion Order, Line Item etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_fb_ads',
    description: `Get the list of selectable Facebook Ads metrics, such as Spend, CPC, Clicks, and breakdowns such as Gender, Country, and Device etc. If workspace_name is provided, custom conversions for that workspace will be included in the metrics list.`,
    params: [
      {
        name: 'workspace_name',
        type: 'string',
        required: false,
        description: `Optional workspace name to retrieve custom conversions for the Facebook Ads account in that workspace. If not provided, only standard metrics and breakdowns are returned.`,
      },
    ],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_fb_post',
    description: `Get the list of selectable Facebook Post/Video metrics like Post likes, Post total reactions, etc. and breakdowns like Post message, Post image URL, etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_ga4',
    description: `Get the list of selectable Google Analytics metrics such as Active users, New users, Sessions, and breakdowns like Account name, Session medium, and Country etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_google_ads',
    description: `Get the list of selectable Google Ads metrics, such as Cost, Roas, Impressions, and breakdowns like Device, Keyword Text, and Campaign Name etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_google_my_business',
    description: `Get the list of selectable Google My Business metrics, such as Total views, Phone calls, Bookings, and breakdowns like Location name, Website URL, and Address lines etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_hubspot',
    description: `Get the list of selectable HubSpot metrics like Contacts, Leads, etc. and breakdowns like Company name, Contact email, and Deal ID etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_ig_post',
    description: `Get the list of selectable Instagram Post metrics such as Post Comments, Post Follows, Post Likes, and breakdowns like Media URL, Media Caption, and Media Product Type etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_ig_profile',
    description: `Get the list of selectable Instagram Profile metrics like Profile Follower, Profile Impressions, etc., and breakdowns like Profile ID, Profile Name, and Profile Website etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_klaviyo',
    description: `Get the list of selectable Klaviyo metrics, such as Emails recipients, Received SMS, and breakdowns like Campaign name, Flow name, and Person first name etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_linkedin_ads',
    description: `Get the list of selectable LinkedIn Ads metrics, such as Impressions, Reach, Total spent, and breakdowns like Device, Placement, and Campaign name etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_linkedin_company_page',
    description: `Get the list of selectable LinkedIn Page metrics, such as Content comments, Lifetime followers, Page views, and breakdowns like Content text, and Content URL etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_mailchimp',
    description: `Get the list of selectable Mailchimp metrics, such as Emails sent, Open rate (%), Total clicks, and breakdowns like Campaign name, List name, and Member email etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_marketo',
    description: `Get the list of selectable Marketo metrics, such as Leads Created, Emails Sent, and breakdowns like Program Name, Campaign Name etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_matomo',
    description: `Get the list of selectable Matomo metrics, such as Visits, Pageviews, Bounce Rate, and breakdowns like Page URL, Referrer, Country etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_merchant_center',
    description: `Get the list of selectable Merchant Center metrics, such as Impressions, Clicks, Conversions, and breakdowns like Title, Brand, and Availability etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_omnisend',
    description: `Get the list of selectable Omnisend metrics, such as Emails Sent, Open Rate, Click Rate, and breakdowns like Campaign Name, Automation Name etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_pinterest_ads',
    description: `Get the list of selectable Pinterest Ads metrics, such as Impressions paid, Cost, Video views, and breakdowns like Ad group name, and Targeting location etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_pinterest_organic',
    description: `Get the list of selectable Pinterest Organic metrics like Pin impressions, Saves, Clicks, and breakdowns like Pin title, Board name, and Pin URL etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_pipedrive',
    description: `Get the list of selectable Pipedrive metrics, such as Deals Won, Revenue, Activities, and breakdowns like Pipeline, Deal Owner, Stage etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_reddit_ads',
    description: `Get the list of selectable Reddit Ads metrics like Impressions, Clicks, Spend, and breakdowns like Campaign name, Ad group name, and Subreddit etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_sa360',
    description: `Get the list of selectable Search Ads 360 (SA360) metrics, such as Impressions, Clicks, Cost, Conversions, and breakdowns like Campaign Name, Ad Group, Keyword etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_salesforce',
    description: `Get the list of selectable Salesforce metrics like Opportunity count, Leads, etc. and breakdowns like Opportunity name, Campaign name, etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_search_console',
    description: `Get the list of selectable Google Search Console metrics like Clicks, Positions, etc. and breakdowns like Landing page, and Search query etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_shopify',
    description: `Get the list of selectable Shopify metrics, such as Gross sales, Returns, Shipping, and breakdowns like Customer first name, Product SKU, and Order ID etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_snapchat_ads',
    description: `Get the list of selectable Snapchat Ads metrics such as Impressions, Cost, Leads, and breakdowns like DMA, Ad type, and Campaign name etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_spotify_ads',
    description: `Get the list of selectable Spotify Ads metrics, such as Impressions, Clicks, Spend, Listens, and breakdowns like Campaign Name, Ad Set, Ad Format etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_sprout_social',
    description: `Get the list of selectable Sprout Social metrics, such as Impressions, Engagements, Followers, and breakdowns like Profile, Network, Post Type etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_threads_insights',
    description: `Get the list of selectable Threads Insights metrics like Views, Likes, Replies, Reposts, and breakdowns like Post text, Post ID, and Media type etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_tiktok_ads',
    description: `Get the list of selectable TikTok Ads metrics, such as Clicks, CPM, Cost, and breakdowns like Campaign name, Gender, and Age etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_tiktok_organic',
    description: `Get the list of selectable TikTok Organic metrics like Video views, Likes, Comments, Shares, and breakdowns like Video title, Video ID, and Create time etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_trade_desk',
    description: `Get the list of selectable Trade Desk metrics, such as Impressions, Clicks, Spend, Conversions, and breakdowns like Campaign Name, Ad Group, Creative etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_woo_commerce',
    description: `Get the list of selectable WooCommerce metrics, such as Gross sales, Returns, Items sold, and breakdowns like Order number, Billing first name, and Shipping phone etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_x_ads',
    description: `Get the list of selectable X Ads (Twitter Ads) metrics like Impressions, Clicks, Spend, and breakdowns like Campaign name, Ad group name, and Placement etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_youtube',
    description: `Get the list of selectable YouTube metrics like Video views, Likes, Comments, etc. and breakdowns like Video ID, Video title, and Channel name etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_and_breakdowns_zoho',
    description: `Get the list of selectable Zoho CRM metrics like Leads, Deals, Contacts, and breakdowns like Lead source, Deal stage, and Account name etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_metrics_fb_page',
    description: `Get the list of selectable Facebook Page Insights metrics, such as Total likes, Total reach, Total page views etc.`,
    params: [],
  },
  {
    name: 'adzvisermcp_list_workspace',
    description: `Retrieve a list of workspaces that have been created by the user and their data sources, such as Google Ads, Facebook Ads accounts connected with each.`,
    params: [],
  },
  {
    name: 'adzvisermcp_retrieve_reporting_data',
    description: `Retrieve real-time reporting data from marketing channels like Google Ads, Facebook Ads and Google Analytics. Returns structured data that you can analyze, compare, calculate, and summarize.`,
    params: [
      {
        name: 'adzviser_request',
        type: 'object',
        required: false,
        description: `Optional structured request body specifying platforms, metrics, breakdowns, date ranges, and filters for the report.`,
      },
    ],
  },
]
