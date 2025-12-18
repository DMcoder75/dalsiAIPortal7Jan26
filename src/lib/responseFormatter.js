/**
 * Response Formatter
 * Converts plain text AI responses into beautifully formatted HTML
 * Applies professional styling with headers, sections, lists, and color-coded boxes
 */

/**
 * Parse and format response text into structured HTML
 * Detects patterns like headers, lists, sections and applies styling
 */
export const formatResponseText = (text) => {
  if (!text || typeof text !== 'string') return text

  let html = text

  // Convert markdown-style headers to styled headers
  html = html.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-semibold text-purple-300 mb-3 mt-4">$1</h3>')
  html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-semibold text-purple-300 mb-3 mt-4">$1</h2>')
  html = html.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold text-white mb-4 mt-6">$1</h1>')

  // Convert bold text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-200">$1</strong>')

  // Convert italic text
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-slate-300">$1</em>')

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-2 py-1 rounded text-amber-300 text-sm font-mono">$1</code>')

  // Convert bullet lists
  html = html.replace(/^\s*[-•]\s+(.*?)$/gm, '<li class="text-sm text-slate-300 ml-4">• $1</li>')
  html = html.replace(/(<li[^>]*>.*?<\/li>)/s, '<ul class="space-y-1 my-2">$1</ul>')

  // Convert numbered lists
  html = html.replace(/^\s*(\d+)\.\s+(.*?)$/gm, '<li class="text-sm text-slate-300 ml-4">$1. $2</li>')

  // Wrap in paragraphs
  const lines = html.split('\n')
  let inList = false
  const formatted = lines.map(line => {
    if (line.includes('<li') || line.includes('<ul') || line.includes('</ul>')) {
      inList = true
      return line
    }
    if (line.includes('<h') || line.includes('</h') || line.includes('<ul') || line.includes('</ul>')) {
      inList = false
      return line
    }
    if (line.trim() === '') {
      return ''
    }
    if (!inList && !line.includes('<') && line.trim()) {
      return `<p class="text-sm text-slate-300 leading-relaxed mb-2">${line}</p>`
    }
    return line
  }).join('\n')

  return formatted
}

/**
 * Create a styled highlight box for important information
 */
export const createHighlightBox = (content, type = 'default') => {
  const typeClasses = {
    default: 'bg-purple-500/10 border-l-4 border-purple-500',
    success: 'bg-green-500/10 border-l-4 border-green-500',
    info: 'bg-blue-500/10 border-l-4 border-blue-500',
    warning: 'bg-yellow-500/10 border-l-4 border-yellow-500'
  }
  return `<div class="rounded p-4 my-4 ${typeClasses[type]}">${content}</div>`
}

/**
 * Create a status badge
 */
export const createStatusBadge = (label, status = 'complete') => {
  const statusClasses = {
    complete: 'bg-green-500/20 text-green-300 border border-green-500/30',
    progress: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
  }
  return `<span class="inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[status]}">${label}</span>`
}

/**
 * Create a code block with syntax highlighting
 */
export const createCodeBlock = (code, language = 'text') => {
  return `<pre class="bg-slate-800/50 border border-slate-700 rounded p-4 my-3 overflow-x-auto"><code class="text-sm text-slate-300 font-mono">${escapeHtml(code)}</code></pre>`
}

/**
 * Create a section with header and content
 */
export const createSection = (title, content) => {
  return `
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-purple-300 mb-3">${title}</h3>
      <div class="space-y-3">${content}</div>
    </div>
  `
}

/**
 * Create a feature card
 */
export const createFeatureCard = (title, description) => {
  return `
    <div class="bg-purple-500/10 border border-purple-500/30 rounded p-3 inline-block">
      <h4 class="font-semibold text-purple-300 text-sm mb-1">${title}</h4>
      <p class="text-xs text-slate-300">${description}</p>
    </div>
  `
}

/**
 * Escape HTML special characters
 */
export const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

/**
 * Apply professional styling to response text
 * Wraps content in styled containers with proper spacing and colors
 */
export const applyProfessionalStyling = (text) => {
  if (!text || typeof text !== 'string') return text

  // Format the text with markdown-style patterns
  let formatted = formatResponseText(text)

  // Wrap entire response in a styled container
  return `
    <div class="space-y-4 text-slate-200">
      ${formatted}
    </div>
  `
}

/**
 * Parse response and detect sections to apply targeted formatting
 */
export const parseAndFormatResponse = (text) => {
  if (!text || typeof text !== 'string') return text

  // Apply professional styling
  return applyProfessionalStyling(text)
}

export default {
  formatResponseText,
  createHighlightBox,
  createStatusBadge,
  createCodeBlock,
  createSection,
  createFeatureCard,
  escapeHtml,
  applyProfessionalStyling,
  parseAndFormatResponse
}
