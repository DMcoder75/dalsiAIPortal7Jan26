/**
 * Smart Text Formatter
 * Intelligently formats AI responses with bold, italic, and justified text
 */

/**
 * List of keywords that should be bolded
 */
const BOLD_KEYWORDS = [
  // Historical terms
  'World War II', 'WWII', 'WW2',
  'Adolf Hitler', 'Hitler',
  'September 1, 1939', '1939',
  'Poland', 'Germany', 'Britain', 'France', 'Europe',
  'Allies', 'Axis',
  'Dunkirk', 'D-Day', 'June 6, 1944',
  'Nazi', 'Nazi troops',
  'United Nations', 'UN',
  
  // Web/Tech terms
  'WordPress', 'WooCommerce', 'portfolio website', 'personal portfolio',
  'ecommerce', 'e-commerce', 'website', 'web',
  'theme', 'plugin', 'design', 'layout',
  'content', 'page', 'post', 'product',
  'integration', 'platform', 'system',
  'SEO', 'responsive', 'mobile',
  'user experience', 'UX', 'UI',
  
  // General important terms
  'turning point', 'key event', 'key features', 'key milestone',
  'invasion', 'liberation', 'expansion',
  'peace', 'power', 'strategy',
  'leadership', 'alliance', 'partnership',
  'victory', 'defeat', 'success', 'challenge',
  'important', 'significant', 'critical',
  'crucial', 'essential', 'fundamental',
  'major', 'primary', 'main', 'core',
  'step', 'phase', 'stage', 'milestone',
  'goal', 'objective', 'target', 'timeline'
]

/**
 * List of phrases that should be italicized
 */
const ITALIC_PHRASES = [
  'Picture yourself',
  'Can you guess',
  'much like',
  'often referred to',
  'Despite losing',
  'boosted spirits',
  'fierce resistance',
  'combined efforts',
  'mutual understanding',
  'shared prosperity',
  'sustainable development',
  'in essence',
  'for example',
  'such as',
  'including',
  'particularly',
  'specifically',
  'notably',
  'importantly',
  'furthermore',
  'moreover',
  'therefore',
  'consequently',
  'as a result',
  'in conclusion',
  'to summarize'
]

/**
 * Split text into paragraphs
 */
function splitIntoParagraphs(text) {
  // Split by double newlines or long sentences
  const paragraphs = text
    .split(/\n\n+/)
    .filter(p => p.trim().length > 0)
    .map(p => p.trim())
  
  // If no paragraph breaks, split long text into chunks
  if (paragraphs.length === 1) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
    const chunks = []
    let currentChunk = ''
    
    sentences.forEach(sentence => {
      currentChunk += sentence
      if (currentChunk.length > 300) {
        chunks.push(currentChunk.trim())
        currentChunk = ''
      }
    })
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim())
    }
    
    return chunks
  }
  
  return paragraphs
}

/**
 * Apply bold formatting to keywords
 */
function applyBoldFormatting(text) {
  let formatted = text
  
  BOLD_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    formatted = formatted.replace(regex, `**${keyword}**`)
  })
  
  return formatted
}

/**
 * Apply italic formatting to phrases
 */
function applyItalicFormatting(text) {
  let formatted = text
  
  ITALIC_PHRASES.forEach(phrase => {
    const regex = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    formatted = formatted.replace(regex, `*${phrase}*`)
  })
  
  return formatted
}

/**
 * Identify and create headers for major topics
 */
function identifyTopics(text) {
  const topics = []
  
  if (text.toLowerCase().includes('cause') || text.toLowerCase().includes('beginning')) {
    topics.push('Causes & Beginning')
  }
  if (text.toLowerCase().includes('turning point') || text.toLowerCase().includes('key event')) {
    topics.push('Key Turning Points')
  }
  if (text.toLowerCase().includes('impact') || text.toLowerCase().includes('effect')) {
    topics.push('Impact & Consequences')
  }
  if (text.toLowerCase().includes('alliance') || text.toLowerCase().includes('player')) {
    topics.push('Major Players & Alliances')
  }
  if (text.toLowerCase().includes('victory') || text.toLowerCase().includes('end')) {
    topics.push('Victory & Aftermath')
  }
  
  return topics
}

/**
 * Format text with proper structure
 */
export function smartFormatText(text) {
  if (!text) return ''
  
  // Split into paragraphs
  const paragraphs = splitIntoParagraphs(text)
  
  // Format each paragraph
  const formattedParagraphs = paragraphs.map(para => {
    let formatted = para
    
    // Apply bold formatting
    formatted = applyBoldFormatting(formatted)
    
    // Apply italic formatting
    formatted = applyItalicFormatting(formatted)
    
    return formatted
  })
  
  return formattedParagraphs
}

/**
 * Convert markdown-style formatting to React components
 */
export function parseFormattedText(text) {
  if (!text) return null
  
  // Split by markdown patterns
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g)
  
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text
      return {
        type: 'bold',
        content: part.slice(2, -2),
        key: idx
      }
    } else if (part.startsWith('*') && part.endsWith('*')) {
      // Italic text
      return {
        type: 'italic',
        content: part.slice(1, -1),
        key: idx
      }
    } else {
      // Regular text
      return {
        type: 'text',
        content: part,
        key: idx
      }
    }
  })
}

/**
 * Create React JSX elements from formatted text
 */
export function createFormattedElements(text) {
  const parts = parseFormattedText(text)
  
  return parts.map((part, idx) => {
    switch (part.type) {
      case 'bold':
        return { type: 'bold', content: part.content, key: idx }
      case 'italic':
        return { type: 'italic', content: part.content, key: idx }
      default:
        return { type: 'text', content: part.content, key: idx }
    }
  })
}

/**
 * Main smart formatter function
 */
export function formatResponseWithSmartFormatting(text) {
  const formattedParagraphs = smartFormatText(text)
  
  return {
    paragraphs: formattedParagraphs,
    topics: identifyTopics(text),
    formatted: formattedParagraphs.join('\n\n')
  }
}

export default {
  smartFormatText,
  parseFormattedText,
  createFormattedElements,
  formatResponseWithSmartFormatting
}
