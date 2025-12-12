-- ============================================
-- Delete old prompts and insert general/common use cases
-- ============================================

-- Delete all existing prompts
DELETE FROM chat_suggested_prompts;

-- Insert 4 general/common use case prompts
INSERT INTO chat_suggested_prompts (
  title, description, prompt_text, category, service_type, icon_name, color_class, display_order, is_active, tags, difficulty_level, estimated_response_time
) VALUES
(
  'Email Writer',
  'Write professional emails',
  'Help me write a professional email. Subject: [subject]. Recipient: [recipient]. Key points: [key points]. Tone: [formal/casual].',
  'business',
  'chat',
  '✉️',
  'text-blue-500',
  1,
  true,
  ARRAY['business', 'writing', 'email'],
  'beginner',
  30
),
(
  'Email Draft',
  'Draft a professional business email',
  'Draft a professional business email for [purpose]. Include: proper greeting, clear message, and professional closing.',
  'business',
  'chat',
  '📧',
  'text-blue-600',
  2,
  true,
  ARRAY['business', 'email', 'writing'],
  'beginner',
  30
),
(
  'Content Creator',
  'Create engaging content',
  'Create engaging content about [topic]. Make it: interesting, easy to understand, and suitable for [audience].',
  'business',
  'chat',
  '📝',
  'text-purple-500',
  3,
  true,
  ARRAY['content', 'writing', 'creative'],
  'beginner',
  45
),
(
  'Meeting Summary',
  'Summarize key points from a...',
  'Summarize the key points from this meeting: [meeting notes]. Include: decisions made, action items, and next steps.',
  'business',
  'chat',
  '📋',
  'text-green-500',
  4,
  true,
  ARRAY['business', 'summary', 'productivity'],
  'beginner',
  30
);
