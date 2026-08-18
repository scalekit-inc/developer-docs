import { existsSync } from 'node:fs'
import { register } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export async function resolve(specifier, context, nextResolve) {
  if (
    (specifier.startsWith('./') || specifier.startsWith('../')) &&
    !/\.[a-zA-Z][a-zA-Z0-9]*$/.test(specifier)
  ) {
    const parentPath = context.parentURL ? fileURLToPath(context.parentURL) : process.cwd()
    const candidate = join(dirname(parentPath), `${specifier}.ts`)
    if (existsSync(candidate)) {
      return {
        shortCircuit: true,
        url: pathToFileURL(candidate).href,
      }
    }
  }

  return nextResolve(specifier, context)
}

register(import.meta.url)
