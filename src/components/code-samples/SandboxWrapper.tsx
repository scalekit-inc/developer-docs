import { useEffect, useState } from 'react'

interface SandboxWrapperProps {
  apiKey: string
  orgid: string
  sandboxId: string
}

export default function SandboxWrapper({ apiKey, orgid, sandboxId }: SandboxWrapperProps) {
  const [Sandbox, setSandbox] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log(
      '[SandboxWrapper] Mounting with apiKey:',
      apiKey ? 'present' : 'missing',
      'orgid:',
      orgid,
      'sandboxId:',
      sandboxId,
    )

    // Dynamically import the SDK only on the client
    import('@sampleapp.ai/sdk')
      .then((module) => {
        console.log('[SandboxWrapper] SDK loaded successfully, module:', Object.keys(module))
        if (module.Sandbox) {
          setSandbox(() => module.Sandbox)
        } else {
          setError('Sandbox component not found in SDK module')
          console.error('[SandboxWrapper] Sandbox not found in module:', module)
        }
      })
      .catch((err) => {
        console.error('[SandboxWrapper] Failed to load SDK:', err)
        setError(`Failed to load SDK: ${err.message}`)
      })
  }, [apiKey, orgid, sandboxId])

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

  if (!Sandbox) {
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
        Loading sandbox...
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
        <Sandbox apiKey={apiKey} orgid={orgid} sandboxId={sandboxId} env={{}} />
      </div>
    </div>
  )
}
