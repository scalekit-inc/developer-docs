// src/types/agent-connectors.ts

export type ParamType = 'string' | 'boolean' | 'integer' | 'object'

export interface ToolParam {
  name: string
  type: ParamType
  required: boolean
  description: string
}

export interface Tool {
  name: string
  description: string
  params: ToolParam[]
}
