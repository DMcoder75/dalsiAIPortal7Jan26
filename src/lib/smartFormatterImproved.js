/**
 * Improved Smart Text Formatter
 * Handles mixed Markdown content with proper priority and nesting
 */

/**
 * Parse content section that may contain lists or paragraphs
 */
function parseContentSection(text) {
  if (!text || text.trim().length === 0) return []
  
  const result = []
  const lines = text.split('\n')
  let currentParagraph = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()
    
    // Check if this is a list item
    const listMatch = trimmedLine.match(/^([\s]*)[-*+]\s+(.+)$/)
    
    if (listMatch) {
      // Save any accumulated paragraph
      if (currentParagraph.length > 0) {
        const paraText = currentParagraph.join('\n').trim()
        if (paraText) {
          result.push({
            type: 'paragraph',
            content: paraText
          })
        }
        currentParagraph = []
      }
      
      // Add list item
      result.push({
        type: 'list_item',
        content: listMatch[2].trim()
      })
    } else if (trimmedLine.length > 0) {
      // Add to current paragraph
      currentParagraph.push(trimmedLine)
    } else if (currentParagraph.length > 0) {
      // Empty line - end current paragraph
      const paraText = currentParagraph.join(' ').trim()
      if (paraText) {
        result.push({
          type: 'paragraph',
          content: paraText
        })
      }
      currentParagraph = []
    }
  }
  
  // Save final paragraph
  if (currentParagraph.length > 0) {
    const paraText = currentParagraph.join(' ').trim()
    if (paraText) {
      result.push({
        type: 'paragraph',
        content: paraText
      })
    }
  }
  
  return result
}

/**
 * Convert mixed content to unordered list format
 */
function convertToUnorderedList(items) {
  const listItems = items.filter(item => item.type === 'list_item')
  if (listItems.length === 0) return null
  
  return {
    type: 'unordered_list',
    items: listItems.map(item => item.content)
  }
}

/**
 * Extract headings and their content sections
 */
function extractHeadingsWithContent(text) {
  const lines = text.split('\n')
  const sections = []
  let currentSection = null
  
  lines.forEach((line, idx) => {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    
    if (headingMatch) {
      // Save previous section
      if (currentSection) {
        sections.push(currentSection)
      }
      
      // Start new section
      currentSection = {
        type: 'heading',
        level: headingMatch[1].length,
        content: headingMatch[2].trim(),
        bodyLines: []
      }
    } else if (currentSection && line.trim().length > 0) {
      // Add to current section's body
      currentSection.bodyLines.push(line)
    } else if (currentSection && line.trim().length === 0 && currentSection.bodyLines.length > 0) {
      // Keep empty lines in body
      currentSection.bodyLines.push(line)
    }
  })
  
  // Save final section
  if (currentSection) {
    sections.push(currentSection)
  }
  
  return sections
}

/**
 * Main improved formatter function
 */
export function smartFormatTextImproved(text) {
  if (!text || typeof text !== 'string') return []
  
  const result = []
  
  // Check if content has headings
  const hasHeadings = /^#{1,6}\s+/m.test(text)
  
  if (hasHeadings) {
    // Process content with headings
    const sections = extractHeadingsWithContent(text)
    
    sections.forEach((section, sectionIdx) => {
      // Add heading
      result.push({
        type: 'heading',
        level: section.level,
        content: section.content
      })
      
      // Process body content
      if (section.bodyLines.length > 0) {
        const bodyText = section.bodyLines.join('\n').trim()
        const contentItems = parseContentSection(bodyText)
        
        // Group consecutive list items
        let currentList = []
        contentItems.forEach(item => {
          if (item.type === 'list_item') {
            currentList.push(item.content)
          } else {
            // Save accumulated list
            if (currentList.length > 0) {
              result.push({
                type: 'unordered_list',
                items: currentList
              })
              currentList = []
            }
            // Add paragraph
            if (item.type === 'paragraph') {
              result.push(item)
            }
          }
        })
        
        // Save final list
        if (currentList.length > 0) {
          result.push({
            type: 'unordered_list',
            items: currentList
          })
        }
      }
    })
  } else {
    // Process content without headings
    const contentItems = parseContentSection(text)
    
    // Group consecutive list items
    let currentList = []
    contentItems.forEach(item => {
      if (item.type === 'list_item') {
        currentList.push(item.content)
      } else {
        // Save accumulated list
        if (currentList.length > 0) {
          result.push({
            type: 'unordered_list',
            items: currentList
          })
          currentList = []
        }
        // Add paragraph
        if (item.type === 'paragraph') {
          result.push(item)
        }
      }
    })
    
    // Save final list
    if (currentList.length > 0) {
      result.push({
        type: 'unordered_list',
        items: currentList
      })
    }
  }
  
  return result.filter(item => item && item.content && item.content.length > 0 || item.type === 'unordered_list' || item.type === 'heading')
}

export default smartFormatTextImproved
