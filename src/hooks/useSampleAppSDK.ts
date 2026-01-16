import { useEffect, useState } from 'react'

type SampleAppComponent = 'Sandbox' | 'SandboxHome'

interface UseSampleAppSDKResult {
  component: any
  isLoading: boolean
  error: string | null
}

interface UseSampleAppSDKOptions {
  apiKey: string
  orgid: string
  component: SampleAppComponent
  validateApiKey?: boolean
  logPrefix?: string
}

export function useSampleAppSDK({
  apiKey,
  orgid,
  component,
  validateApiKey = false,
  logPrefix = '[useSampleAppSDK]',
}: UseSampleAppSDKOptions): UseSampleAppSDKResult {
  const [sdkComponent, setSdkComponent] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log(
      `${logPrefix} Mounting with apiKey:`,
      apiKey ? 'present' : 'missing',
      'orgid:',
      orgid || 'MISSING',
    )

    if (validateApiKey && !apiKey) {
      setError('Missing required configuration: PUBLIC_SAMPLEAPP_API_KEY')
      setIsLoading(false)
      return
    }

    import('@sampleapp.ai/sdk')
      .then((module) => {
        console.log(`${logPrefix} SDK loaded successfully, module:`, Object.keys(module))

        let Component: any = null

        if (component === 'SandboxHome') {
          // Try SandboxHome first (for future SDK versions), fall back to Sandbox
          Component =
            module.SandboxHome ||
            module.Sandbox ||
            module.default?.Sandbox ||
            module.default?.SandboxHome
        } else {
          Component = module.Sandbox
        }

        if (Component) {
          setSdkComponent(() => Component)
        } else {
          setError(`${component} component not found in SDK module`)
          console.error(`${logPrefix} Component not found in module:`, module)
        }
      })
      .catch((err) => {
        console.error(`${logPrefix} Failed to load SDK:`, err)
        setError(`Failed to load SDK: ${err.message}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [apiKey, orgid, component, validateApiKey, logPrefix])

  return { component: sdkComponent, isLoading, error }
}
