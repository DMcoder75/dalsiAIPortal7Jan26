-- ============================================
-- Update Suggested Prompts with Specific Examples
-- ============================================

-- Delete existing prompts (optional, comment out if you want to keep them)
-- DELETE FROM chat_suggested_prompts;

-- Insert the specific prompts you want
INSERT INTO chat_suggested_prompts (
  title, description, prompt_text, category, service_type, icon_name, color_class, display_order, is_active, tags, difficulty_level, estimated_response_time
) VALUES
(
  'Explain quantum computing',
  'In simple terms for beginners',
  'Explain quantum computing in simple terms for beginners. Use analogies and avoid technical jargon. Include: what it is, how it works, real-world applications, and why it matters.',
  'education',
  'chat',
  '💡',
  'text-yellow-500',
  1,
  true,
  ARRAY['education', 'science', 'explanation'],
  'beginner',
  45
),
(
  'Analyze market trends',
  'For tech industry in 2024',
  'Analyze current market trends in the tech industry for 2024. Include: emerging technologies, market growth areas, key players, investment opportunities, and future predictions.',
  'business',
  'chat',
  '📈',
  'text-green-500',
  2,
  true,
  ARRAY['business', 'analysis', 'market', 'tech'],
  'intermediate',
  60
),
(
  'Write a product description',
  'For an eco-friendly water bottle',
  'Write a compelling product description for an eco-friendly water bottle. Include: key features, benefits, target audience, environmental impact, and call to action.',
  'business',
  'chat',
  '✏️',
  'text-blue-500',
  3,
  true,
  ARRAY['business', 'writing', 'product', 'marketing'],
  'beginner',
  30
),
(
  'Brainstorm startup ideas',
  'In the AI and automation space',
  'Brainstorm 10 innovative startup ideas in the AI and automation space. For each idea, include: concept, target market, unique value proposition, and potential revenue model.',
  'business',
  'chat',
  '🧠',
  'text-purple-500',
  4,
  true,
  ARRAY['business', 'startup', 'ai', 'brainstorm'],
  'intermediate',
  75
);
