import type { APIRoute } from 'astro'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'

export const prerender = false

export const GET: APIRoute = async () => {
  const result: Record<string, unknown> = {}
  try {
    result['import.meta.url'] = import.meta.url
    result.cwd = process.cwd()
  } catch (e) {
    result.metaError = String(e)
  }

  try {
    const require = createRequire(import.meta.url)
    const wasmPath = require.resolve('canvaskit-wasm/bin/full/canvaskit.wasm')
    result.resolvedWasmPath = wasmPath
    result.wasmExists = fs.existsSync(wasmPath)
    if (result.wasmExists) {
      result.wasmSize = fs.statSync(wasmPath).size
    }
  } catch (e) {
    result.resolveError = e instanceof Error ? e.message : String(e)
  }

  try {
    const candidates = [
      '/var/task/node_modules/canvaskit-wasm',
      path.join(process.cwd(), 'node_modules/canvaskit-wasm'),
    ]
    result.dirChecks = candidates.map((p) => ({
      path: p,
      exists: fs.existsSync(p),
      isSymlink: fs.existsSync(p) ? fs.lstatSync(p).isSymbolicLink() : false,
      target: fs.existsSync(p) && fs.lstatSync(p).isSymbolicLink() ? fs.readlinkSync(p) : null,
    }))
  } catch (e) {
    result.dirError = String(e)
  }

  try {
    result.taskRoot = fs.existsSync('/var/task') ? fs.readdirSync('/var/task').slice(0, 20) : null
  } catch (e) {
    result.taskRootError = String(e)
  }

  return new Response(JSON.stringify(result, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  })
}
