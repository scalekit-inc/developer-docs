import { useSampleAppSDK } from '../../hooks/useSampleAppSDK'

interface SandboxWrapperProps {
  apiKey: string
  orgid: string
  sandboxId: string
}

export default function SandboxWrapper({ apiKey, orgid, sandboxId }: SandboxWrapperProps) {
  const {
    component: Sandbox,
    isLoading,
    error,
  } = useSampleAppSDK({
    apiKey,
    orgid,
    component: 'Sandbox',
    validateApiKey: false,
    logPrefix: '[SandboxWrapper]',
  })

  if (error) {
    return <ErrorState error={error} />
  }

  if (isLoading) {
    return <LoadingState message="Loading sandbox..." />
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
        <Sandbox apiKey={apiKey} orgid={orgid} sandboxId={sandboxId} env={{}} theme="light" />
      </div>
    </div>
  )
}

function ErrorState({ error }: { error: string }) {
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

function LoadingState({ message }: { message: string }) {
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
      {message}
    </div>
  )
}
