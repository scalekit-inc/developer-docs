import { useEffect, useState } from 'react'

interface SandboxHomeWrapperProps {
  apiKey: string
  orgid: string
}

export default function SandboxHomeWrapper({ apiKey, orgid }: SandboxHomeWrapperProps) {
  const [SandboxHome, setSandboxHome] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log(
      '[SandboxHomeWrapper] Mounting with apiKey:',
      apiKey ? 'present' : 'missing',
      'orgid:',
      orgid || 'MISSING',
    )

    if (!apiKey) {
      setError('Missing required configuration: PUBLIC_SAMPLEAPP_API_KEY')
      return
    }

    // Dynamically import the SDK only on the client
    import('@sampleapp.ai/sdk')
      .then((module) => {
        console.log('[SandboxHomeWrapper] SDK loaded successfully, module:', Object.keys(module))
        // Try SandboxHome first (for future SDK versions), fall back to Sandbox
        const Component =
          module.SandboxHome ||
          module.Sandbox ||
          module.default?.Sandbox ||
          module.default?.SandboxHome
        if (Component) {
          setSandboxHome(() => Component)
        } else {
          setError('Sandbox/SandboxHome not found in SDK module')
          console.error('[SandboxHomeWrapper] Component not found in module:', module)
        }
      })
      .catch((err) => {
        console.error('[SandboxHomeWrapper] Failed to load SDK:', err)
        setError(`Failed to load SDK: ${err.message}`)
      })
  }, [apiKey, orgid])

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          padding: '2rem',
          color: 'red',
        }}
      >
        <div>Error: {error}</div>
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Check browser console for details
        </div>
      </div>
    )
  }

  if (!SandboxHome) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          padding: '2rem',
        }}
      >
        Loading sandbox catalog...
      </div>
    )
  }

  return (
    <div
      className="sandbox-wrapper-container"
      style={{
        width: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        display: 'block',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="sandbox-container"
        style={{
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <SandboxHome apiKey={apiKey} orgid={orgid} />
      </div>
    </div>
  )
}
