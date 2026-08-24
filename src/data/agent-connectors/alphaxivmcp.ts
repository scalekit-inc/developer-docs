import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'alphaxivmcp_answer_pdf_queries',
    description: `Returns raw filtered page content from one PDF as XML. Supports arXiv, alphaXiv, and Semantic Scholar abstract pages. Multiple queries on the same paper can be batched into one call.`,
    params: [
      {
        name: 'paper',
        type: 'string',
        required: true,
        description: `The paper to read, as an ID ('2307.12307'), a URL ('https://arxiv.org/pdf/2307.12307', 'https://www.alphaxiv.org/abs/2307.12307'), or a title or keyword ('DeepSeek-V4'). An title resolves to a single best match, which you should prefer instead of using lookup_paper.`,
      },
      {
        name: 'queries',
        type: 'array',
        required: true,
        description: `A brief description of what information you're looking for in the paper.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_create_folder',
    description: `Create a new custom folder in the user's library. Optionally nest it under parent_folder_id (from list_library). Returns the new folder_id.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name to give the new folder (1-100 characters).`,
      },
      {
        name: 'parent_folder_id',
        type: 'string',
        required: false,
        description: `Nest the new folder under this existing folder.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_delete_folder',
    description: `Delete a folder and its paper memberships (the papers themselves are not deleted). The publications and private-papers folders cannot be deleted. Get folder_id from list_library.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The folder_id of the folder to delete, obtained from list_library.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_discover_papers',
    description: `Discovers and ranks multiple candidate papers for a research topic. Use for literature discovery, related work, or broad topical coverage.`,
    params: [
      {
        name: 'difficulty',
        type: 'number',
        required: true,
        description: `A 1-10 estimate of how much retrieval effort this request warrants.`,
      },
      {
        name: 'keywords',
        type: 'array',
        required: true,
        description: `3-4 concise keyword terms for exact-name, acronym, method, benchmark, author, or title matching.`,
      },
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `A detailed semantic description of the papers that would best answer the user's request.`,
      },
      {
        name: 'prioritize',
        type: 'string',
        required: false,
        description: `What to weigh once topical relevance is accounted for. Omit it for the default, which grounds results in roughly the past year of work while letting strong older matches through. Use 'recency' when the request is about what is new — 'latest work', 'what has X been up to', 'recent papers' — which ranks the newest plausible matches first, needing no date bound and excluding nothing. Use 'historical' for seminal, foundational, or best-known work, where lifetime standing outweighs freshness. Use 'popular' only where the request names popularity, votes, or community standing — 'best' on its own asks which work is strongest, not which is most upvoted — which gives community votes the dominant weight among the topically relevant matches and mostly ignores age; for a pure most-popular list with no subject to search for, browse_paper_feed is the better tool.`,
      },
      {
        name: 'published_after',
        type: 'string',
        required: false,
        description: `Only return papers first published on or after this date (YYYY-MM-DD). Omit it unless the request names a real boundary, e.g. 'since 2024' — this excludes papers outright, so to merely favour new work set prioritize to 'recency' instead of guessing a cutoff.`,
      },
      {
        name: 'published_before',
        type: 'string',
        required: false,
        description: `Only return papers first published on or before this date (YYYY-MM-DD). Omit it unless the request names a historical window, e.g. 'before AlexNet' or 'papers from 2025'. Results thin out the further back and narrower the window is; report what comes back rather than retrying the same window.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_find_researchers',
    description: `The first tool for researcher affiliations, organization rosters, who left an organization, career moves, and what researchers are doing now. It composes name or subject relevance, current affiliation or role, citation range, position history, and verified coauthorship. Never use this tool merely to resolve a name for another call; pass the name directly to that profile or relationship call. Advising and lab-membership questions are answered here: coauthored_with returns the joint-work record behind each candidate, and require_position_overlap narrows it to people who were at the same place at the same time. Position constraints bind to one LinkedIn experience row. Returns [SLUG=...] handles.`,
    params: [
      {
        name: 'affiliation',
        type: 'string',
        required: false,
        description: `Current organization ('DeepSeek', 'UC Berkeley'). Every indexed spelling of it is matched, so write the name plainly and never spell out variants yourself. For a historical organization use position.affiliation, or include_past_affiliations as shorthand.`,
      },
      {
        name: 'include_past_affiliations',
        type: 'boolean',
        required: false,
        description: `Shorthand for a past position at \`affiliation\`, excluding researchers whose current affiliation still matches. Use \`position\` for role or date constraints.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Results per page. Defaults to 12, or 50 for a relationship search, whose rows are one line each.`,
      },
      {
        name: 'max_citations',
        type: 'integer',
        required: false,
        description: `Citation ceiling, e.g. to find rising researchers who are not yet famous.`,
      },
      {
        name: 'min_citations',
        type: 'integer',
        required: false,
        description: `Citation floor, to keep a roster to established researchers.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `1-based page over the same ordering. Every result says whether more matched beyond it, so page on when the answer needs the tail rather than re-running a narrower search. A page that reports no total is not a count of the roster; only the last page of a search establishes one.`,
      },
      {
        name: 'position',
        type: 'object',
        required: false,
        description: `Composable LinkedIn position-history filter. Affiliation, role, status, and every date bound apply to the same experience row. For a recent departure use a past position with ended_after and end-date ordering; combine with top-level affiliation or role for transitions.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `A person's name only when identifying that person is the final task, or a research subject ('mechanistic interpretability'). Never use this to resolve an anchor for another call; pass the name directly there. Omit for structured roster, relationship, or career queries.`,
      },
      {
        name: 'relationship',
        type: 'object',
        required: false,
        description: `Coauthorship evidence from linked public alphaXiv papers, one line per coauthor: shared papers, what share of that person's own output the collaboration is, how often they lead a paper the anchor closes, the years it ran, and their current position. require_position_overlap composes it with position history to add shared time.`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Current role to filter by, token-matched ('professor' matches assistant and associate professors; 'phd student'). Only current roles are indexed. Omit or leave empty when not filtering by role.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `'relevance' ranks a query, or relationship strength for a relationship-only search, otherwise citations. 'recent_activity' ranks by latest linked paper. 'relationship_strength' requires relationship.`,
      },
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `Research subject to answer from authorship of papers on it, for 'who works on X' and 'who does prominent work on X'. One concept in the vocabulary its own papers use — name the architecture, benchmark, or subfield, and spell out an acronym alongside it. Never concatenate several related concepts to widen the net.`,
      },
      {
        name: 'topic_authors',
        type: 'string',
        required: false,
        description: `Which byline slot \`topic\` weights: 'lead' for the students and postdocs who drive the work, 'senior' for the PIs who close the author list, 'any' for both.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_follow_researcher',
    description: `Follow a researcher so their new papers reach the user's feed. Idempotent: following someone already followed changes nothing. Get the slug from find_researchers, get_researcher, or a /@<slug> profile URL.`,
    params: [
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `Researcher slug, as returned in [SLUG=...] handles and rendered at /@<slug>.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_get_paper_content',
    description: `Get the content of an arXiv/alphaXiv paper as text. By default returns a structured AI-generated intermediate report. Use the fullText option to get raw extracted text.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `An arXiv or alphaXiv URL` },
      {
        name: 'fullText',
        type: 'boolean',
        required: false,
        description: `If true, return the full extracted text instead of the intermediate report.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_get_researcher',
    description: `Gets compact profiles for one or many researchers. Pass full names or exact raw [SLUG=...] handles together in \`researchers\`; each name resolves to the best-matching indexed researcher, tolerating a misspelling. Never use get_researcher merely before get_researcher_papers; a larger or date-bounded paper question goes directly there. Current positions and up to five curated past positions are returned by default; request additional sections with \`include\`. Papers are independently opt-in for small profile context. For compact current-role enrichment of names extracted from a webpage, use resolve_researchers.`,
    params: [
      {
        name: 'researchers',
        type: 'array',
        required: true,
        description: `One to 25 researcher full names or exact raw slugs. Names resolve to the best-matching indexed researcher; a corrected spelling is reported inline.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Additional sections to return. Available sections: bio, full curated position_history, raw linkedin_experience, education, citation_trajectory, coauthors, alphaxiv_account, and links.`,
      },
      {
        name: 'paper_limit',
        type: 'integer',
        required: false,
        description: `Papers per researcher. Defaults to 3.`,
      },
      {
        name: 'papers',
        type: 'string',
        required: false,
        description: `Optional paper context. notable selects high-attention work and one cross-organization paper when available; recent orders by publication date.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_get_researcher_papers',
    description: `Papers on alphaXiv for one or many researchers, grouped per researcher. Pass full names or exact raw [SLUG=...] handles together in \`researchers\`; each name resolves to the best-matching indexed researcher, tolerating a misspelling. Never call get_researcher or find_researchers first for one named person's papers. Sort 'recent' with published_after answers what-are-they-doing-now; 'cited' answers best-known work. Paper [ID=...] handles chain into the paper tools.`,
    params: [
      {
        name: 'researchers',
        type: 'array',
        required: true,
        description: `One to 25 researcher full names or exact raw slugs. Names resolve to the best-matching indexed researcher; a corrected spelling is reported inline.`,
      },
      {
        name: 'limit_per_researcher',
        type: 'integer',
        required: false,
        description: `Maximum number of papers to return per researcher (1-25). Defaults to 10.`,
      },
      {
        name: 'published_after',
        type: 'string',
        required: false,
        description: `Only papers first published on or after this date (YYYY-MM-DD). Use with sort 'recent' for activity windows; omit unless the request names one.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `'cited' for notable work, 'recent' for current activity, 'viewed' for alphaXiv attention.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_list_followed_researchers',
    description: `List the researcher profiles the user follows, with each one's slug, name, current headline or affiliation, and citation count. Following a researcher surfaces their new papers in the user's alphaXiv feed. Pass a slug from here to get_researcher or get_researcher_papers for the full profile.`,
    params: [],
  },
  {
    name: 'alphaxivmcp_list_library',
    description: `List the user's alphaXiv library: their folders (bookmark collections) with folder_id, name, type, parent_id, sharing_status, and paper_count. Set include_papers to also list papers per folder. Pass paper_ids_or_urls to check which folders already contain specific papers. The default folders 'default-to-read', 'default-reading', and 'default-completed' represent reading status; a paper may belong to any number of folders at once.`,
    params: [
      {
        name: 'include_papers',
        type: 'boolean',
        required: false,
        description: `Also list the papers inside each folder (capped per folder).`,
      },
      {
        name: 'paper_ids_or_urls',
        type: 'array',
        required: false,
        description: `Report which folders already contain each of these papers.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_move_papers_between_folders',
    description: `Move papers from a source folder to a destination folder in a single atomic operation: each paper is added to the destination and removed from the source. A paper already in the destination is reported as a duplicate and left untouched in the source. Get folder ids from list_library.`,
    params: [
      {
        name: 'from_folder_id',
        type: 'string',
        required: true,
        description: `The folder_id of the source folder, obtained from list_library.`,
      },
      {
        name: 'paper_ids_or_urls',
        type: 'array',
        required: true,
        description: `One or more papers to move, each as an arXiv id or an alphaXiv/arXiv URL.`,
      },
      {
        name: 'to_folder_id',
        type: 'string',
        required: true,
        description: `The folder_id of the destination folder, obtained from list_library.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_read_files_from_github_repository',
    description: `Reads the contents of a file or directory from the paper's codebase repository. Returns repository structure for '/', directory listing for directories, or file contents for files.`,
    params: [
      {
        name: 'githubUrl',
        type: 'string',
        required: true,
        description: `The URL of the paper's codebase repository.`,
      },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The path to the file or directory. Use '/' to get the entire repository structure.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_remove_papers_from_folder',
    description: `Remove one or more papers from a single folder in the user's library. Only affects the given folder; the paper stays in any others. Get folder_id from list_library.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The folder_id of the folder to remove the papers from, obtained from list_library.`,
      },
      {
        name: 'paper_ids_or_urls',
        type: 'array',
        required: true,
        description: `One or more papers to remove from the folder, each as an arXiv id or an alphaXiv/arXiv URL.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_rename_folder',
    description: `Rename a custom folder. Only custom folders can be renamed, not the default reading-status or publications folders. Get folder_id from list_library.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The folder_id of the custom folder to rename, obtained from list_library.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The new name for the folder (1-100 characters).`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_resolve_researchers',
    description: `Turns a list of people extracted from a webpage or other external source into current, citeable alphaXiv researcher entries. Use this once after reading a roster, team page, award list, or similar source, before repeating its possibly stale affiliations. Pass every person in one batch. Optional personal URLs and related researchers disambiguate names; related anchors are matching context, not proof of the source's claimed relationship.`,
    params: [
      {
        name: 'people',
        type: 'array',
        required: true,
        description: `Up to 50 externally named people to identify in one call.`,
      },
      {
        name: 'related_researchers',
        type: 'array',
        required: false,
        description: `Optional full names or exact raw slugs related to the whole list; coauthorship only disambiguates.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_save_papers_to_folder',
    description: `Add one or more papers (by arXiv id or alphaXiv/arXiv URL) to a folder in the user's library. Papers not yet in the database are fetched from arXiv. Omit folder_id to save to the 'Want to read' folder. Get folder_id from list_library. Adding is idempotent and never removes a paper from its other folders.`,
    params: [
      {
        name: 'paper_ids_or_urls',
        type: 'array',
        required: true,
        description: `One or more papers to add, each as an arXiv id or an alphaXiv/arXiv URL.`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Target folder. Defaults to the user's 'Want to read' folder.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_unfollow_researcher',
    description: `Stop following a researcher. Idempotent: unfollowing someone not followed changes nothing. Get the slug from list_followed_researchers.`,
    params: [
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `Researcher slug, as returned in [SLUG=...] handles and rendered at /@<slug>.`,
      },
    ],
  },
]
