import { useEffect, useState } from 'react'

interface SandboxWrapperProps {
  apiKey: string
  sandboxId: string
  env?: Record<string, string>
}

export default function SandboxWrapper({ apiKey, sandboxId, env }: SandboxWrapperProps) {
  const [Sandbox, setSandbox] = useState<any>(null)

  useEffect(() => {
    // Dynamically import the SDK only on the client
    import('@sampleapp.ai/sdk').then((module) => {
      setSandbox(() => module.Sandbox)
    })
  }, [])

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
        <Sandbox apiKey={apiKey} sandboxId={sandboxId} env={env} />
      </div>
    </div>
  )
}
