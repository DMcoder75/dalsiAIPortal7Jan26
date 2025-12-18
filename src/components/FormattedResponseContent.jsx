/**
 * FormattedResponseContent
 * Renders AI responses with professional formatting using React components
 * Applies justified text alignment, bold, italic, and Tailwind CSS styling
 */

import React from 'react'
import { smartFormatText, parseFormattedText } from '../lib/smartFormatter'

/**
 * Parse response text and render as formatted React components
 */
export const FormattedResponseContent = ({ text }) => {
  if (!text || typeof text !== 'string') return <p className="text-sm text-slate-300">{text}</p>

  // Apply smart formatting
  const formattedParagraphs = smartFormatText(text)

  /**
   * Render formatted text with bold and italic
   */
  const renderFormattedText = (paragraph) => {
    if (!paragraph) return null

    // Split by markdown patterns
    const parts = paragraph.split(/(\*\*.*?\*\*|\*.*?\*)/g)

    return parts.map((part, idx) => {
      if (!part) return null

      if (part.startsWith('**') && part.endsWith('**')) {
        // Bold text
        return (
          <strong key={idx} className="font-bold text-slate-100">
            {part.slice(2, -2)}
          </strong>
        )
      } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        // Italic text
        return (
          <em key={idx} className="italic text-slate-200">
            {part.slice(1, -1)}
          </em>
        )
      } else {
        // Regular text
        return <span key={idx}>{part}</span>
      }
    })
  }

  return (
    <div className="space-y-4 text-slate-200">
      {formattedParagraphs.map((para, idx) => {
        // Check if paragraph is a header (starts with # or ##)
        if (para.startsWith('###')) {
          const headerText = para.replace(/^###\s*/, '').trim()
          return (
            <h3 key={idx} className="text-lg font-semibold text-purple-300 mb-3 mt-4">
              {headerText}
            </h3>
          )
        }

        if (para.startsWith('##')) {
          const headerText = para.replace(/^##\s*/, '').trim()
          return (
            <h2 key={idx} className="text-xl font-semibold text-purple-300 mb-3 mt-4">
              {headerText}
            </h2>
          )
        }

        if (para.startsWith('#')) {
          const headerText = para.replace(/^#\s*/, '').trim()
          return (
            <h1 key={idx} className="text-2xl font-bold text-white mb-4 mt-6">
              {headerText}
            </h1>
          )
        }

        // Check if paragraph is a list
        if (para.match(/^[-•]\s+/m)) {
          const items = para.split('\n').filter(line => line.match(/^[-•]\s+/))
          return (
            <ul key={idx} className="space-y-2 ml-4">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} className="text-sm text-slate-300 flex gap-2">
                  <span className="text-purple-400">•</span>
                  <span>{item.replace(/^[-•]\s+/, '').trim()}</span>
                </li>
              ))}
            </ul>
          )
        }

        // Check if paragraph is a numbered list
        if (para.match(/^\d+\.\s+/m)) {
          const items = para.split('\n').filter(line => line.match(/^\d+\.\s+/))
          return (
            <ol key={idx} className="space-y-2 ml-4 list-decimal">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} className="text-sm text-slate-300">
                  {item.replace(/^\d+\.\s+/, '').trim()}
                </li>
              ))}
            </ol>
          )
        }

        // Check if paragraph is a code block
        if (para.startsWith('```')) {
          const code = para.replace(/```[\w]*\n?/g, '').trim()
          return (
            <pre key={idx} className="bg-slate-800/50 border border-slate-700 rounded p-4 overflow-x-auto">
              <code className="text-sm text-slate-300 font-mono">{code}</code>
            </pre>
          )
        }

        // Check if paragraph is a highlight box
        if (para.startsWith('> ')) {
          const content = para.replace(/^>\s*/gm, '').trim()
          return (
            <div key={idx} className="bg-purple-500/10 border-l-4 border-purple-500 rounded p-4 my-4">
              <p className="text-sm text-slate-300">{content}</p>
            </div>
          )
        }

        // Regular paragraph with justified text alignment and formatting
        return (
          <p
            key={idx}
            className="text-sm text-slate-300 leading-relaxed"
            style={{
              textAlign: 'justify',
              textAlignLast: 'left',
              wordSpacing: '0.05em',
              letterSpacing: '0.3px',
              lineHeight: '1.8',
              hyphens: 'auto'
            }}
          >
            {renderFormattedText(para)}
          </p>
        )
      })}
    </div>
  )
}

export default FormattedResponseContent
