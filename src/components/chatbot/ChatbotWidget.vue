<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'
import { ref, computed, nextTick, watch, onMounted } from 'vue'
import { renderMarkdown } from './renderMarkdown'

const chatApiUrl = import.meta.env.PUBLIC_CHATBOT_API_URL ?? 'http://localhost:3001'

const isOpen = ref(false)
const messagesEl = ref<HTMLElement | null>(null)

const { messages, input, handleSubmit, isLoading } = useChat({
  api: `${chatApiUrl}/api/chat`,
})

const suggestions = [
  'How do I set up SSO with Okta?',
  'How does SCIM provisioning work?',
  'How do AI agents authenticate with OAuth?',
  'What is Full Stack Auth?',
]
const showSuggestions = computed(() => messages.value.length === 0)

watch(
  messages,
  async () => {
    await nextTick()
    if (messagesEl.value) {
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight
    }
  },
  { deep: true },
)

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      isOpen.value = !isOpen.value
      if (isOpen.value) nextTick(() => document.getElementById('sk-input')?.focus())
    }
    if (e.key === 'Escape') isOpen.value = false
  })

  // Expose identify API for host app to pass user context
  ;(window as any).ScalekitChat = {
    identify: (user: { email?: string; name?: string; orgId?: string; orgName?: string }) => {
      ;(window as any).__scalekitChatUser = user
    },
  }
})

function open() {
  isOpen.value = true
  nextTick(() => document.getElementById('sk-input')?.focus())
}

function getUser() {
  return (window as any).__scalekitChatUser ?? {}
}

function onSubmit(e: Event) {
  const user = getUser()
  handleSubmit(e as SubmitEvent, {
    body: { userId: user.email ?? '', orgId: user.orgId ?? '' },
  })
}

function sendSuggestion(q: string) {
  input.value = q
  const user = getUser()
  handleSubmit(new Event('submit') as SubmitEvent, {
    body: { userId: user.email ?? '', orgId: user.orgId ?? '' },
  })
}
</script>

<template>
  <!-- Overlay backdrop -->
  <div
    id="sk-overlay"
    :class="{ 'sk-open': isOpen }"
    role="dialog"
    aria-modal="true"
    aria-label="Docs assistant"
    :aria-hidden="String(!isOpen)"
    @click.self="isOpen = false"
  >
    <div id="sk-modal">
      <!-- Header -->
      <div id="sk-modal-header">
        <div id="sk-modal-header-left">
          <div id="sk-modal-icon">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span id="sk-modal-title">Docs assistant</span>
        </div>
        <div id="sk-modal-header-right">
          <span id="sk-modal-hint">Press <kbd>Esc</kbd> to close</span>
          <button id="sk-modal-close" aria-label="Close" @click="isOpen = false">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div id="sk-messages" ref="messagesEl">
        <!-- Welcome -->
        <div class="sk-msg sk-msg-assistant">
          <div class="sk-bubble">
            Hi! Ask me anything about Scalekit — SSO, SCIM, Agent Auth, MCP, or full-stack auth.
            I'll search the docs and answer based on what's there.
          </div>
        </div>

        <!-- Suggestion pills -->
        <div v-if="showSuggestions" id="sk-suggestions">
          <button
            v-for="q in suggestions"
            :key="q"
            class="sk-suggestion"
            @click="sendSuggestion(q)"
          >
            {{ q }}
          </button>
        </div>

        <!-- Chat messages -->
        <template v-for="msg in messages" :key="msg.id">
          <div v-if="msg.role === 'user'" class="sk-msg sk-msg-user">
            <div class="sk-bubble sk-bubble-user">{{ msg.content }}</div>
          </div>
          <div
            v-else-if="msg.role === 'assistant' && typeof msg.content === 'string'"
            class="sk-msg sk-msg-assistant"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="sk-bubble sk-prose" v-html="renderMarkdown(msg.content)" />
          </div>
        </template>

        <!-- Typing indicator -->
        <div v-if="isLoading" class="sk-msg sk-msg-assistant">
          <div class="sk-bubble sk-typing"><span /><span /><span /></div>
        </div>
      </div>

      <!-- Input -->
      <form id="sk-input-area" @submit.prevent="onSubmit">
        <input
          id="sk-input"
          v-model="input"
          type="text"
          placeholder="Ask anything about Scalekit…"
          autocomplete="off"
          aria-label="Your question"
          :disabled="isLoading"
        />
        <button id="sk-send" type="submit" aria-label="Send" :disabled="!input.trim() || isLoading">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>

      <div id="sk-footer">
        AI-generated answers. May contain errors — verify with the linked docs.
      </div>
    </div>
  </div>

  <!-- Trigger pill -->
  <button id="sk-trigger" aria-label="Ask the docs AI (⌘K)" @click="open">
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6366f1"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
    <span>Ask AI</span>
    <kbd>⌘K</kbd>
  </button>
</template>

<style>
/* Trigger pill */
#sk-trigger {
  all: unset;
  position: fixed !important;
  bottom: 24px;
  right: 24px;
  z-index: 9997;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px 8px 10px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}
#sk-trigger:hover {
  border-color: #6366f1;
}
#sk-trigger kbd {
  display: inline-flex;
  align-items: center;
  padding: 1px 5px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 11px;
  color: #6b7280;
  font-family: inherit;
}

/* Overlay */
#sk-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease;
}
#sk-overlay.sk-open {
  opacity: 1;
  pointer-events: auto;
}

/* Modal */
#sk-modal {
  width: 100%;
  max-width: 640px;
  margin: 0 16px;
  background: #fff;
  border-radius: 16px;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.18),
    0 0 0 1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  max-height: 72vh;
  overflow: hidden;
  transform: translateY(-8px) scale(0.98);
  transition: transform 0.18s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #111827;
}
#sk-overlay.sk-open #sk-modal {
  transform: translateY(0) scale(1);
}

/* Header */
#sk-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: #6366f1;
  flex-shrink: 0;
  border-radius: 16px 16px 0 0;
}
#sk-modal-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
#sk-modal-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
#sk-modal-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}
#sk-modal-header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
#sk-modal-hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 4px;
}
#sk-modal-hint kbd {
  display: inline-block;
  padding: 1px 5px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  font-family: inherit;
}
#sk-modal-close {
  all: unset;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
#sk-modal-close:hover {
  background: rgba(255, 255, 255, 0.28);
}

/* Messages */
#sk-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 120px;
}
#sk-messages::-webkit-scrollbar {
  width: 4px;
}
#sk-messages::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}

.sk-msg {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.sk-msg-user {
  align-items: flex-end;
}
.sk-msg-assistant {
  align-items: flex-start;
}

.sk-bubble {
  max-width: 88%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13.5px;
  line-height: 1.6;
  word-wrap: break-word;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #111827;
  background: #f3f4f6;
  border-bottom-left-radius: 4px;
}
.sk-bubble-user {
  background: #6366f1;
  color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 4px;
  white-space: pre-wrap;
}

/* Markdown prose */
.sk-prose p {
  display: block;
  margin: 0 0 8px;
}
.sk-prose p:last-child {
  margin-bottom: 0;
}
.sk-prose h1,
.sk-prose h2,
.sk-prose h3 {
  display: block;
  font-weight: 600;
  color: #111827;
  margin: 12px 0 4px;
  line-height: 1.3;
}
.sk-prose h1 {
  font-size: 16px;
}
.sk-prose h2 {
  font-size: 14.5px;
}
.sk-prose h3 {
  font-size: 13.5px;
}
.sk-prose ul,
.sk-prose ol {
  display: block;
  margin: 6px 0 8px;
  padding-left: 18px;
}
.sk-prose li {
  display: list-item;
  margin: 3px 0;
}
.sk-prose ul li {
  list-style-type: disc;
}
.sk-prose ol li {
  list-style-type: decimal;
}
.sk-prose strong {
  font-weight: 600;
  color: #111827;
}
.sk-prose em {
  font-style: italic;
}
.sk-prose a {
  color: #6366f1;
  text-decoration: underline;
}
.sk-prose code {
  display: inline;
  background: #e5e7eb;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'SF Mono', 'Fira Code', ui-monospace, monospace;
  color: #111827;
}
.sk-prose pre {
  display: block;
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 8px;
  padding: 12px 14px;
  margin: 8px 0;
  overflow-x: auto;
  font-family: 'SF Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 12px;
  line-height: 1.6;
  white-space: pre;
}
.sk-prose pre code {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: inherit;
}
.sk-prose hr {
  display: block;
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 10px 0;
}

/* Sources */
.sk-sources {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 8px;
  font-size: 12px;
  color: #6b7280;
}
.sk-sources strong {
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 2px;
}
.sk-source-link {
  display: block;
  color: #6366f1;
  text-decoration: none;
  padding: 2px 0;
}
.sk-source-link:hover {
  text-decoration: underline;
}

/* Typing indicator */
.sk-typing {
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 6px 2px;
  background: transparent;
}
.sk-typing span {
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #9ca3af;
  animation: sk-bounce 1.1s ease-in-out infinite;
}
.sk-typing span:nth-child(2) {
  animation-delay: 0.18s;
}
.sk-typing span:nth-child(3) {
  animation-delay: 0.36s;
}
@keyframes sk-bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  30% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

/* Suggestions */
#sk-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}
.sk-suggestion {
  all: unset;
  display: inline-block;
  padding: 6px 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  font-size: 12.5px;
  color: #4b5563;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  white-space: nowrap;
  line-height: 1.4;
}
.sk-suggestion:hover {
  border-color: #6366f1;
  color: #6366f1;
}

/* Input area */
#sk-input-area {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-top: 1px solid #f3f4f6;
  flex-shrink: 0;
  background: #fff;
}
#sk-input {
  flex: 1;
  height: 38px;
  padding: 0 13px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 13.5px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f9fafb;
  color: #111827;
  outline: none;
}
#sk-input:focus {
  border-color: #6366f1;
  background: #fff;
}
#sk-input::placeholder {
  color: #9ca3af;
}
#sk-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

#sk-send {
  all: unset;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  flex-shrink: 0;
}
#sk-send:hover:not(:disabled) {
  background: #4f46e5;
}
#sk-send:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* Footer */
#sk-footer {
  text-align: center;
  font-size: 11px;
  color: #9ca3af;
  padding: 6px 16px 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  flex-shrink: 0;
}
</style>
