# Developer docs

Glossary for Scalekit developer-docs. Implementation details do not belong here.

## Language

**Session middleware**:
Official SaaSKit helpers that own hosted login, the encrypted session cookie, token refresh, and logout for a web framework.
_Avoid_: Adapter, integration, framework support

**Frameworks**:
Official AgentKit helpers that map Scalekit tools into an agent framework such as LangChain.
_Avoid_: Session middleware, web adapter

**SDK**:
The language client plus any first-party framework helper that ships in that client.
_Avoid_: Adapter (for web-framework helpers)
