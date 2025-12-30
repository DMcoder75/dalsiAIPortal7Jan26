/**
 * Smart Continuation Detector
 * Analyzes text to determine if it's a continuation of previous context
 */

const continuationPatterns = {
  // Direct continuation keywords
  direct: ['continue', 'next', 'more', 'go on', 'keep going', 'proceed', 'further', 'then what', 'what comes next'],
  
  // Reference to previous answer
  reference: ['that', 'this', 'it', 'the above', 'the previous', 'what you said', 'your answer', 'you mentioned', 'as you said'],
  
  // Request for elaboration
  elaboration: ['tell me more', 'elaborate', 'expand on', 'explain more', 'more details', 'more information', 'clarify', 'further explain', 'go deeper'],
  
  // Request for next steps
  nextSteps: ['what comes next', 'then what', 'after that', 'following that', 'subsequently', 'next step', 'then', 'next phase'],
  
  // Reference to specific parts
  specific: ['first', 'second', 'third', 'part of', 'regarding', 'about the', 'the first', 'the second', 'in that', 'in this'],
  
  // Questions about relationships
  relationship: ['how does', 'how is', 'why is', 'what is the', 'what about', 'how about', 'compared to', 'versus', 'difference between']
}

/**
 * Detect if a question is likely a continuation
 * @param {string} question - The followup question text
 * @param {string} previousAnswer - The previous AI response (optional)
 * @returns {Object} { isContinuation: boolean, confidence: number, reason: string }
 */
export const detectContinuation = (question, previousAnswer = '') => {
  const lowerQuestion = question.toLowerCase().trim()
  
  let score = 0
  let maxScore = 0
  let reasons = []
  
  // Check each pattern category
  for (const [category, patterns] of Object.entries(continuationPatterns)) {
    maxScore += 1
    
    for (const pattern of patterns) {
      if (lowerQuestion.includes(pattern)) {
        score += 1
        reasons.push(`${category}: "${pattern}"`)
        break
      }
    }
  }
  
  // Calculate confidence (0-100)
  const confidence = Math.round((score / maxScore) * 100)
  
  // Check for direct continuation keywords (highest priority)
  const hasDirectKeyword = continuationPatterns.direct.some(kw => lowerQuestion.includes(kw))
  
  // Threshold: 
  // 1. If direct keyword found (continue, next, more, etc.) → ALWAYS continuation
  // 2. Otherwise, if 2+ patterns match → continuation
  const isContinuation = hasDirectKeyword || score >= 2
  
  return {
    isContinuation,
    confidence,
    score,
    maxScore,
    reason: reasons.length > 0 ? reasons.join(', ') : 'No continuation patterns detected'
  }
}

/**
 * Check if question references previous answer
 * @param {string} question - The question text
 * @param {string} previousAnswer - The previous answer text
 * @returns {boolean}
 */
export const referencesContext = (question, previousAnswer) => {
  if (!previousAnswer) return false
  
  const lowerQuestion = question.toLowerCase()
  const lowerAnswer = previousAnswer.toLowerCase()
  
  // Extract key nouns from previous answer
  const keyWords = lowerAnswer
    .split(/\s+/)
    .filter(word => word.length > 4) // Only significant words
    .slice(0, 10) // First 10 significant words
  
  // Check if question contains any of these key words
  const matches = keyWords.filter(word => lowerQuestion.includes(word))
  
  return matches.length > 0
}

export default {
  detectContinuation,
  referencesContext
}
