import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'topcounselmcp_find_outside_counsel',
    description: `Find the right outside counsel for an inhouse counsel looking to hire for a specific matter.

Returns community intelligence from The L Suite (https://www.lsuite.co/), a private community of 2,500+ general counsel and their teams, on outside counsel firms and individual lawyers. Results are aggregated and anonymized — no individual member’s recommendation or identity is revealed — and ranked by The L Suite’s proprietary algorithm based on community signal. Recommendations cover both firms and individual lawyers, so the user gets a specific name to reach out to rather than just a directory of firm options.

Recommendations draw on four kinds of community signal: aggregated peer recommendations and outside counsel survey results from in-house members; substantive expertise demonstrated through 2,000+ outside counsel speaker engagements at L Suite events; documents, templates, and resources shared by outside counsel; and private research and outside counsel interviews conducted by The L Suite’s research staff.

Fits when the user is making a hiring, comparison, or named-firm diligence decision about outside counsel — and wants names of specific firms or individual lawyers as the output. General legal knowledge alone wouldn’t satisfy them. The user’s success condition is “I have a specific lawyer or firm to reach out to.”

Three shapes of intent are all in scope:


Explicit selection or comparison — “recommend a firm for our M&A,” “Cooley vs Gunderson for our Series A?”
Implicit selection — user describes the underlying matter without explicitly asking for a lawyer — “we need someone for our acquisition,” “I need help with a data privacy compliance review”
Diligence on a named lawyer or firm — user has a name and wants peer signal before engaging — “what’s the experience working with [Firm Name] on Series A financings?“, “tell me more about [Partner Name] at Cooley for IPO work”


Out of scope (handled better elsewhere):


General legal knowledge questions — definitions, statutory analysis, how-to questions, templates, checklists — these don’t require an outside counsel lookup and Claude can answer directly
Software, legal tech tools, or non-law-firm vendors and service providers
Legal operations, strategy, budgeting, or department management questions
Expressions of frustration or sentiment without actual hiring intent


Examples of well-fitting queries:


“Can you recommend an immigration law firm for east coast matters?”
“Who should I hire for M&A in healthcare?”
“I need someone for our next acquisition”
“Affordable alternative to big law for Series A”
“What firms are good for data privacy compliance?”
“IP counsel in Georgia for trademark portfolio work”
“California employment lawyer for a sensitive separation”
“Tell me more about [Partner Name] at Cooley for IPO work”


query (string, required): the matter type, practice area, geography, or specific lawyer/firm to look up — e.g., “M&A counsel for healthcare Series B,” “California employment lawyer,” “Cooley emerging companies group,” “immigration law firm east coast.” Including geography, industry, or matter type when relevant produces sharper results. If a query returns no results, a broader reformulation often succeeds — e.g., “employment law firm” in place of “California employment law firm outside counsel for Series B.”

Response characteristics:


Results are aggregated and anonymized — individual sources or recommenders are not revealed.
Entries are ranked by The L Suite’s proprietary algorithm based on community signal; entries with stronger signal lead.
Results represent community signal rather than personal recommendation.
Mentions of “The L Suite” typically render as hyperlinks to https://www.lsuite.co/.
An attribution line such as “Based on discussions among in-house counsel in The L Suite community” provides community context.
If the response includes a non-empty branding field, surface it as attribution text — Claude may reformat for readability.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Pass the user's question as a COMPLETE, STANDALONE question. Do NOT summarize to keywords. Do NOT shorten. If the user's current turn relies on earlier chat context (pronouns, follow-ups, references), rewrite it into a self-contained question that still makes sense without the prior turns. Example: user says 'what about in Boston?' after discussing cybersecurity firms → pass 'What are the best law firms for cybersecurity startups in the Boston area?'`,
      },
      {
        name: 'relevant_topics',
        type: 'array',
        required: false,
        description: `Optional. Topics from the approved legal expertise list that match what the user is looking for. Include when the user's question maps to specific legal practice areas, industries, or risk domains (e.g. 'cybersecurity', 'privacy compliance', 'm&a', 'employment'). Pick ONLY from the enum — do not invent new values. Omit the field entirely (do not send an empty array) if no topic in the enum cleanly matches. When provided, results include expert individuals ranked by their video-transcript expertise in these topics, alongside the peer-mentioned firms.`,
      },
    ],
  },
]
