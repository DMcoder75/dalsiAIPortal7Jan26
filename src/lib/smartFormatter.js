/**
 * Smart Text Formatter
 * Intelligently structures AI responses with headers, sections, paragraphs, and formatting
 */

/**
 * List of keywords that should be bolded
 */
const BOLD_KEYWORDS = [
  'WordPress', 'WooCommerce', 'portfolio website', 'personal portfolio',
  'ecommerce', 'e-commerce', 'website', 'web', 'mobile app',
  'theme', 'plugin', 'design', 'layout', 'strategy',
  'content', 'page', 'post', 'product', 'marketing',
  'integration', 'platform', 'system', 'campaign',
  'SEO', 'responsive', 'mobile', 'social media',
  'user experience', 'UX', 'UI', 'target audience',
  'key features', 'key milestone', 'key event',
  'success', 'challenge', 'important', 'significant',
  'crucial', 'essential', 'fundamental', 'critical',
  'step', 'phase', 'stage', 'milestone', 'timeline',
  'goal', 'objective', 'target', 'leadership', 'partnership'
]

/**
 * Identify section headers from content
 */
function identifySections(text) {
  const sections = []
  
  // Check for common section indicators
  const sectionPatterns = [
    { pattern: /introduction|overview|background/i, title: 'Introduction' },
    { pattern: /strategy|approach|method/i, title: 'Strategy & Approach' },
    { pattern: /step|phase|stage|process/i, title: 'Implementation Steps' },
    { pattern: /benefit|advantage|feature|key point/i, title: 'Key Benefits & Features' },
    { pattern: /challenge|obstacle|issue|problem/i, title: 'Challenges & Solutions' },
    { pattern: /timeline|schedule|deadline/i, title: 'Timeline & Milestones' },
    { pattern: /target|audience|market|customer/i, title: 'Target Audience' },
    { pattern: /channel|platform|media|social/i, title: 'Channels & Platforms' },
    { pattern: /content|creative|execution|message/i, title: 'Content & Creative Strategy' },
    { pattern: /budget|cost|investment|resource/i, title: 'Budget & Resources' },
    { pattern: /metric|measure|success|kpi/i, title: 'Success Metrics' },
    { pattern: /conclusion|summary|next step|recommendation/i, title: 'Conclusion & Next Steps' }
  ]
  
  sectionPatterns.forEach(({ pattern, title }) => {
    if (pattern.test(text)) {
      sections.push(title)
    }
  })
  
  return sections
}

/**
 * Split text into sentences
 */
function splitIntoSentences(text) {
  return text.match(/[^.!?]+[.!?]+/g) || [text]
}

/**
 * Group sentences into logical paragraphs
 */
function groupIntoParagraphs(sentences) {
  const paragraphs = []
  let currentParagraph = []
  
  sentences.forEach((sentence, idx) => {
    currentParagraph.push(sentence.trim())
    
    // Create a new paragraph every 3-4 sentences or at natural breaks
    if (currentParagraph.length >= 3 || 
        sentence.match(/[.!?]\s*$/) && 
        (idx === sentences.length - 1 || Math.random() > 0.7)) {
      if (currentParagraph.length > 0) {
        paragraphs.push(currentParagraph.join(' '))
        currentParagraph = []
      }
    }
  })
  
  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph.join(' '))
  }
  
  return paragraphs.filter(p => p.trim().length > 0)
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
 * Create structured response with headers and sections
 */
export function smartFormatText(text) {
  if (!text || text.length === 0) return []
  
  // Split into sentences
  const sentences = splitIntoSentences(text)
  
  // Group into paragraphs
  const paragraphs = groupIntoParagraphs(sentences)
  
  // Identify sections
  const sections = identifySections(text)
  
  // Build structured response
  const structured = []
  let sectionIndex = 0
  
  // Add introduction paragraph
  if (paragraphs.length > 0) {
    structured.push(applyBoldFormatting(paragraphs[0]))
  }
  
  // Distribute remaining paragraphs across sections
  const remainingParagraphs = paragraphs.slice(1)
  const paragraphsPerSection = Math.ceil(remainingParagraphs.length / Math.max(sections.length, 1))
  
  sections.forEach((section, idx) => {
    // Add section header
    structured.push(`## ${section}`)
    
    // Add paragraphs for this section
    const startIdx = idx * paragraphsPerSection
    const endIdx = Math.min(startIdx + paragraphsPerSection, remainingParagraphs.length)
    
    for (let i = startIdx; i < endIdx; i++) {
      if (remainingParagraphs[i]) {
        structured.push(applyBoldFormatting(remainingParagraphs[i]))
      }
    }
  })
  
  // Add any remaining paragraphs
  const lastSectionEnd = sections.length * paragraphsPerSection
  if (lastSectionEnd < remainingParagraphs.length) {
    if (sections.length === 0) {
      structured.push('## Key Points')
    }
    for (let i = lastSectionEnd; i < remainingParagraphs.length; i++) {
      structured.push(applyBoldFormatting(remainingParagraphs[i]))
    }
  }
  
  return structured.filter(item => item && item.trim().length > 0)
}

/**
 * Parse markdown-style formatting
 */
export function parseFormattedText(text) {
  if (!text) return null
  
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g)
  
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return {
        type: 'bold',
        content: part.slice(2, -2),
        key: idx
      }
    } else if (part.startsWith('*') && part.endsWith('*')) {
      return {
        type: 'italic',
        content: part.slice(1, -1),
        key: idx
      }
    } else {
      return {
        type: 'text',
        content: part,
        key: idx
      }
    }
  })
}

export default {
  smartFormatText,
  parseFormattedText
}
