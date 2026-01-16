import { useSampleAppSDK } from '../../hooks/useSampleAppSDK'

interface SandboxHomeWrapperProps {
  apiKey: string
  orgid: string
}

export default function SandboxHomeWrapper({ apiKey, orgid }: SandboxHomeWrapperProps) {
  const {
    component: SandboxHome,
    isLoading,
    error,
  } = useSampleAppSDK({
    apiKey,
    orgid,
    component: 'SandboxHome',
    validateApiKey: true,
    logPrefix: '[SandboxHomeWrapper]',
  })

  if (error) {
    return <ErrorState error={error} />
  }

  if (isLoading) {
    return <LoadingState message="Loading sandbox catalog..." />
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
