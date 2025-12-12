-- ============================================
-- Insert All 24 Prompts into suggested_prompts
-- ============================================

-- Delete existing prompts first
DELETE FROM chat_suggested_prompts;

-- General Learning (3 prompts)
INSERT INTO chat_suggested_prompts (
  title, description, prompt_text, category, service_type, icon_name, color_class, display_order, is_active, tags, difficulty_level, estimated_response_time
) VALUES
(
  'Explain blockchain technology',
  'In simple terms for beginners',
  'Explain blockchain technology in simple terms for beginners. Avoid technical jargon and use everyday examples.',
  'education',
  'chat',
  '⛓️',
  'text-blue-500',
  1,
  true,
  ARRAY['learning', 'technology', 'blockchain'],
  'beginner',
  45
),
(
  'Explain machine learning',
  'With real-world examples anyone can understand',
  'Explain machine learning with real-world examples that anyone can understand. Include how it works and practical applications.',
  'education',
  'chat',
  '🤖',
  'text-purple-500',
  2,
  true,
  ARRAY['learning', 'technology', 'ai'],
  'beginner',
  50
),
(
  'Explain climate change',
  'In a clear way for school students',
  'Explain climate change in a clear way for school students. Include causes, effects, and what can be done about it.',
  'education',
  'chat',
  '🌍',
  'text-green-500',
  3,
  true,
  ARRAY['learning', 'science', 'environment'],
  'beginner',
  45
),

-- Analysis and Insights (3 prompts)
(
  'Analyze market trends',
  'For renewable energy companies in the next 5 years',
  'Analyze market trends for renewable energy companies in the next 5 years. Include growth opportunities, challenges, and key players.',
  'business',
  'chat',
  '📈',
  'text-green-600',
  4,
  true,
  ARRAY['analysis', 'business', 'market'],
  'intermediate',
  60
),
(
  'Analyze consumer behavior',
  'For online shoppers in the fashion industry',
  'Analyze consumer behavior for online shoppers in the fashion industry. Include trends, preferences, and buying patterns.',
  'business',
  'chat',
  '👥',
  'text-pink-500',
  5,
  true,
  ARRAY['analysis', 'business', 'consumer'],
  'intermediate',
  60
),
(
  'Analyze industry challenges',
  'For small businesses in the software sector',
  'Analyze industry challenges for small businesses in the software sector. Include common problems and potential solutions.',
  'business',
  'chat',
  '💼',
  'text-blue-600',
  6,
  true,
  ARRAY['analysis', 'business', 'software'],
  'intermediate',
  55
),

-- Writing and Content (3 prompts)
(
  'Write a product description',
  'For a minimalist smartwatch aimed at fitness enthusiasts',
  'Write a compelling product description for a minimalist smartwatch aimed at fitness enthusiasts. Include features, benefits, and unique selling points.',
  'business',
  'chat',
  '✍️',
  'text-orange-500',
  7,
  true,
  ARRAY['writing', 'content', 'marketing'],
  'beginner',
  35
),
(
  'Write an engaging ad copy',
  'For an online coding bootcamp',
  'Write engaging ad copy for an online coding bootcamp. Make it compelling and persuasive for potential students.',
  'business',
  'chat',
  '📢',
  'text-red-500',
  8,
  true,
  ARRAY['writing', 'content', 'advertising'],
  'beginner',
  40
),
(
  'Write a social media post',
  'To promote a weekend discount on digital products',
  'Write a social media post to promote a weekend discount on digital products. Make it engaging and include a call to action.',
  'business',
  'chat',
  '📱',
  'text-cyan-500',
  9,
  true,
  ARRAY['writing', 'content', 'social-media'],
  'beginner',
  30
),

-- Brainstorming and Ideas (3 prompts)
(
  'Brainstorm startup ideas',
  'In the health-tech and remote monitoring space',
  'Brainstorm startup ideas in the health-tech and remote monitoring space. Include market opportunity and business model.',
  'business',
  'chat',
  '💡',
  'text-yellow-500',
  10,
  true,
  ARRAY['brainstorm', 'startup', 'ideas'],
  'intermediate',
  50
),
(
  'Brainstorm marketing campaigns',
  'For a new mobile app launch',
  'Brainstorm marketing campaigns for a new mobile app launch. Include strategies, channels, and target audience.',
  'business',
  'chat',
  '🎯',
  'text-purple-600',
  11,
  true,
  ARRAY['brainstorm', 'marketing', 'ideas'],
  'intermediate',
  55
),
(
  'Brainstorm content ideas',
  'For a newsletter about personal finance and investing',
  'Brainstorm content ideas for a newsletter about personal finance and investing. Include topics that would interest readers.',
  'business',
  'chat',
  '💰',
  'text-green-700',
  12,
  true,
  ARRAY['brainstorm', 'content', 'ideas'],
  'intermediate',
  45
),

-- Planning and How-to (3 prompts)
(
  'Create a step-by-step guide',
  'For starting a small online business with low budget',
  'Create a step-by-step guide for starting a small online business with a low budget. Include practical tips and resources.',
  'business',
  'chat',
  '📋',
  'text-indigo-500',
  13,
  true,
  ARRAY['planning', 'guide', 'business'],
  'beginner',
  60
),
(
  'Outline a learning plan',
  'To go from beginner to intermediate in data analysis in 3 months',
  'Outline a learning plan to go from beginner to intermediate in data analysis in 3 months. Include resources and milestones.',
  'education',
  'chat',
  '📚',
  'text-blue-700',
  14,
  true,
  ARRAY['planning', 'learning', 'education'],
  'intermediate',
  50
),
(
  'Create a roadmap',
  'For launching a personal portfolio website',
  'Create a roadmap for launching a personal portfolio website. Include steps, timeline, and key milestones.',
  'business',
  'chat',
  '🗺️',
  'text-teal-500',
  15,
  true,
  ARRAY['planning', 'guide', 'website'],
  'beginner',
  45
),

-- Healthcare Learning (3 prompts)
(
  'Explain type 2 diabetes',
  'In simple terms for beginners',
  'Explain type 2 diabetes in simple terms for beginners. Include what it is, causes, symptoms, and management tips.',
  'healthcare',
  'chat',
  '🏥',
  'text-red-600',
  16,
  true,
  ARRAY['healthcare', 'learning', 'medical'],
  'beginner',
  45
),
(
  'Explain how vaccines work',
  'In a way a teenager can understand',
  'Explain how vaccines work in a way a teenager can understand. Include the science and why they are important.',
  'healthcare',
  'chat',
  '💉',
  'text-blue-800',
  17,
  true,
  ARRAY['healthcare', 'learning', 'medical'],
  'beginner',
  40
),
(
  'Explain mental health and stress',
  'With everyday examples and tips',
  'Explain mental health and stress with everyday examples and practical tips for managing stress.',
  'healthcare',
  'chat',
  '🧠',
  'text-purple-700',
  18,
  true,
  ARRAY['healthcare', 'learning', 'wellness'],
  'beginner',
  45
),

-- Healthcare Advice and Planning (3 prompts)
(
  'Create a simple daily wellness routine',
  'For someone who works at a desk all day',
  'Create a simple daily wellness routine for someone who works at a desk all day. Include exercises and healthy habits.',
  'healthcare',
  'chat',
  '🏃',
  'text-orange-600',
  19,
  true,
  ARRAY['healthcare', 'planning', 'wellness'],
  'beginner',
  40
),
(
  'Suggest healthy meal ideas',
  'For a busy professional who wants to eat better',
  'Suggest healthy meal ideas for a busy professional who wants to eat better. Include quick and nutritious options.',
  'healthcare',
  'chat',
  '🥗',
  'text-green-800',
  20,
  true,
  ARRAY['healthcare', 'planning', 'nutrition'],
  'beginner',
  35
),
(
  'Outline basic questions',
  'To ask a doctor before starting a new treatment',
  'Outline basic questions to ask a doctor before starting a new treatment. Include important topics to discuss.',
  'healthcare',
  'chat',
  '❓',
  'text-yellow-600',
  21,
  true,
  ARRAY['healthcare', 'planning', 'medical'],
  'beginner',
  30
),

-- Education Learning (3 prompts)
(
  'Explain photosynthesis',
  'In simple terms for school students',
  'Explain photosynthesis in simple terms for school students. Include the process and why it is important.',
  'education',
  'chat',
  '🌱',
  'text-green-500',
  22,
  true,
  ARRAY['education', 'learning', 'science'],
  'beginner',
  40
),
(
  'Explain the basics of algebra',
  'With step-by-step examples',
  'Explain the basics of algebra with step-by-step examples. Make it easy to understand for beginners.',
  'education',
  'chat',
  '📐',
  'text-indigo-600',
  23,
  true,
  ARRAY['education', 'learning', 'math'],
  'beginner',
  45
),
(
  'Explain World War II',
  'As a short, easy-to-understand summary',
  'Explain World War II as a short, easy-to-understand summary. Include key events and impacts.',
  'education',
  'chat',
  '📖',
  'text-gray-600',
  24,
  true,
  ARRAY['education', 'learning', 'history'],
  'beginner',
  50
),

-- Education Study Help and Planning (3 prompts)
(
  'Create a 4-week study plan',
  'To prepare for a math exam',
  'Create a 4-week study plan to prepare for a math exam. Include topics, practice problems, and review schedule.',
  'education',
  'chat',
  '📅',
  'text-blue-600',
  25,
  true,
  ARRAY['education', 'planning', 'study'],
  'intermediate',
  45
),
(
  'Break down a complex chapter',
  'Into key points and simple examples',
  'Break down a complex chapter into key points and simple examples. Make it easier to understand and remember.',
  'education',
  'chat',
  '🔍',
  'text-purple-500',
  26,
  true,
  ARRAY['education', 'learning', 'study'],
  'beginner',
  50
),
(
  'Suggest effective study techniques',
  'For a student who struggles to focus',
  'Suggest effective study techniques for a student who struggles to focus. Include practical methods and tools.',
  'education',
  'chat',
  '⚡',
  'text-yellow-500',
  27,
  true,
  ARRAY['education', 'planning', 'study'],
  'beginner',
  40
),

-- Education Content and Ideas (3 prompts)
(
  'Write a lesson outline',
  'For teaching fractions to 10-year-olds',
  'Write a lesson outline for teaching fractions to 10-year-olds. Include activities and examples.',
  'education',
  'chat',
  '✏️',
  'text-orange-500',
  28,
  true,
  ARRAY['education', 'content', 'teaching'],
  'beginner',
  45
),
(
  'Brainstorm classroom activities',
  'To make learning science more fun',
  'Brainstorm classroom activities to make learning science more fun. Include hands-on and interactive ideas.',
  'education',
  'chat',
  '🔬',
  'text-cyan-600',
  29,
  true,
  ARRAY['education', 'brainstorm', 'ideas'],
  'beginner',
  50
),
(
  'Create quiz questions',
  'For a short test on basic English grammar',
  'Create quiz questions for a short test on basic English grammar. Include answers and difficulty levels.',
  'education',
  'chat',
  '❓',
  'text-pink-600',
  30,
  true,
  ARRAY['education', 'content', 'assessment'],
  'beginner',
  40
);
