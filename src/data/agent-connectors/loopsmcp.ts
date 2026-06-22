import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'loopsmcp_bulk_update_tasks',
    description: `Bulk update the status or priority of multiple tasks at once.`,
    params: [
      { name: 'task_ids', type: 'array', required: true, description: `Array of task IDs to update` },
      { name: 'loop_id', type: 'string', required: false, description: `Loop ID to assign all tasks to (null to unassign)` },
      { name: 'priority', type: 'string', required: false, description: `New priority for all tasks` },
      { name: 'status', type: 'string', required: false, description: `New status for all tasks` },
    ],
  },
  {
    name: 'loopsmcp_close_loop',
    description: `Put a loop on hold, pausing work without permanently closing it.`,
    params: [
      { name: 'loop_id', type: 'string', required: true, description: `The loop ID (ULID format)` },
    ],
  },
  {
    name: 'loopsmcp_create_loop',
    description: `Create a new loop to group related tasks into a development cycle.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Loop name (e.g., "v2 Auth Refactor", "Payment Bug Fixes")` },
      { name: 'ai_context', type: 'string', required: false, description: `Agent instructions for this loop: scope, constraints, architecture decisions, specific requirements. This is shown to implementing agents alongside each task.` },
      { name: 'description', type: 'string', required: false, description: `Human-readable description of the loop` },
      { name: 'visibility', type: 'string', required: false, description: `Visibility: "public" (default) or "private"` },
    ],
  },
  {
    name: 'loopsmcp_create_loop_from_tasks',
    description: `Create a new loop and assign a set of existing tasks to it in one operation.`,
    params: [
      { name: 'loop_name', type: 'string', required: true, description: `Name for the new loop` },
      { name: 'task_ids', type: 'array', required: true, description: `Array of task IDs to assign to the new loop` },
      { name: 'loop_description', type: 'string', required: false, description: `Description for the new loop` },
    ],
  },
  {
    name: 'loopsmcp_create_task',
    description: `Create a new task in the workspace with an optional title, body, priority, and loop assignment.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `Task title — a concise summary of what needs to be done` },
      { name: 'body', type: 'string', required: false, description: `Agent prompt: detailed instructions for the AI agent that will implement this task. Include specific requirements, acceptance criteria, and any context needed.` },
      { name: 'loop_id', type: 'string', required: false, description: `Optional loop ID to assign the task to immediately` },
      { name: 'priority', type: 'string', required: false, description: `Task priority (default: none)` },
    ],
  },
  {
    name: 'loopsmcp_delete_task',
    description: `Permanently delete a task by its ID. This action cannot be undone.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `The task ID (ULID format)` },
    ],
  },
  {
    name: 'loopsmcp_get_loop',
    description: `Get a single loop with all its assigned tasks, comments, and AI context.`,
    params: [
      { name: 'loop_id', type: 'string', required: true, description: `The loop ID (ULID format)` },
    ],
  },
  {
    name: 'loopsmcp_get_loop_queue',
    description: `Get the priority-ordered loop queue for the workspace.`,
    params: [
    ],
  },
  {
    name: 'loopsmcp_get_next_work',
    description: `Get the highest-priority loop with approved tasks ready for implementation.`,
    params: [
    ],
  },
  {
    name: 'loopsmcp_get_queue_stats',
    description: `Get work queue statistics for the workspace, including counts of loops with work ready.`,
    params: [
    ],
  },
  {
    name: 'loopsmcp_get_task',
    description: `Get a single task with its full agent prompt (body) and all comments.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `The task ID (ULID format)` },
    ],
  },
  {
    name: 'loopsmcp_get_workflow',
    description: `Get step-by-step instructions for a named Loops workflow (triage, organize, implement, or manage).`,
    params: [
      { name: 'workflow', type: 'string', required: true, description: `Which workflow: triage, organize, implement, or manage` },
    ],
  },
  {
    name: 'loopsmcp_get_workspace',
    description: `Get workspace details including the AI context (project-level agent instructions).`,
    params: [
    ],
  },
  {
    name: 'loopsmcp_list_loops',
    description: `List all loops in the workspace with task counts, statuses, and AI context.`,
    params: [
    ],
  },
  {
    name: 'loopsmcp_list_tasks',
    description: `List unassigned tasks in the workspace, optionally filtered by status or priority.`,
    params: [
      { name: 'priority', type: 'string', required: false, description: `Filter by priority: none, low, medium, high, urgent` },
      { name: 'status', type: 'string', required: false, description: `Filter by status: open (new), approved (ready for implementation), in_progress, shipped (done), rejected` },
    ],
  },
  {
    name: 'loopsmcp_reopen_loop',
    description: `Reopen an on-hold loop, returning it to the active queue.`,
    params: [
      { name: 'loop_id', type: 'string', required: true, description: `The loop ID (ULID format)` },
    ],
  },
  {
    name: 'loopsmcp_reorder_loops',
    description: `Bulk reorder loops in the work queue by passing an array of loop IDs in the desired priority order.`,
    params: [
      { name: 'loop_ids', type: 'array', required: true, description: `Array of loop IDs in priority order (first = highest priority)` },
    ],
  },
  {
    name: 'loopsmcp_set_loop_priority',
    description: `Set the numeric priority of a loop in the work queue (lower number = higher priority).`,
    params: [
      { name: 'loop_id', type: 'string', required: true, description: `The loop ID (ULID format)` },
      { name: 'priority', type: 'number', required: true, description: `The priority value (0 = highest priority)` },
    ],
  },
  {
    name: 'loopsmcp_ship_loop',
    description: `Mark a loop as shipped and notify all members via email.`,
    params: [
      { name: 'loop_id', type: 'string', required: true, description: `The loop ID (ULID format)` },
    ],
  },
  {
    name: 'loopsmcp_update_task',
    description: `Update a task's title, body, status, priority, due date, or loop assignment.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `The task ID (ULID format)` },
      { name: 'body', type: 'string', required: false, description: `New agent prompt (implementation instructions)` },
      { name: 'due_date', type: 'string', required: false, description: `Due date in YYYY-MM-DD format (null to clear)` },
      { name: 'loop_id', type: 'string', required: false, description: `Loop ID to assign to (null to unassign from loop)` },
      { name: 'priority', type: 'string', required: false, description: `New priority` },
      { name: 'status', type: 'string', required: false, description: `New status: approved (approve for implementation), rejected (decline), in_progress (being worked on), shipped (done), on_hold (paused)` },
      { name: 'title', type: 'string', required: false, description: `New task title` },
    ],
  },
]
