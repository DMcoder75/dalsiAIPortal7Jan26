-- ============================================
-- DalSiAI Chat System - Insert Useful Prompts & Templates
-- Based on Existing Database Schema
-- ============================================

-- ============================================
-- INSERT SUGGESTED PROMPTS
-- ============================================

-- Business & Productivity Prompts (service_type: 'chat')
INSERT INTO public.chat_suggested_prompts (
  title, description, prompt_text, category, service_type, icon_name, color_class, display_order, is_active, tags, difficulty_level, estimated_response_time
) VALUES
('Email Draft', 'Draft a professional business email', 'Draft a professional email to [recipient] about [topic]. Include a clear subject line, greeting, main content, and professional closing.', 'business', 'chat', 'envelope', 'text-blue-500', 1, true, ARRAY['business', 'writing', 'email'], 'beginner', 30),
('Meeting Summary', 'Summarize key points from a meeting', 'Summarize the key points from this meeting: [meeting notes]. Include decisions made, action items, and next steps.', 'business', 'chat', 'clipboard-list', 'text-green-500', 2, true, ARRAY['business', 'summary', 'productivity'], 'beginner', 45),
('Project Plan', 'Create a structured project plan', 'Create a project plan for [project name] with: timeline, milestones, deliverables, team roles, and risk assessment.', 'business', 'chat', 'chart-bar', 'text-purple-500', 3, true, ARRAY['business', 'planning', 'project'], 'intermediate', 60),
('Market Analysis', 'Analyze market opportunities', 'Analyze the market for [product/service]. Include: market size, growth trends, key players, opportunities, and threats.', 'business', 'chat', 'trending-up', 'text-orange-500', 4, true, ARRAY['business', 'analysis', 'market'], 'intermediate', 90),
('Competitor Research', 'Research competitors in your industry', 'Research competitors in the [industry] space. Compare: features, pricing, strengths, weaknesses, and market positioning.', 'business', 'chat', 'search', 'text-red-500', 5, true, ARRAY['business', 'research', 'competitive'], 'intermediate', 120),
('Sales Pitch', 'Create a compelling sales pitch', 'Create a compelling sales pitch for [product/service]. Include: problem statement, solution, benefits, pricing, and call to action.', 'business', 'chat', 'megaphone', 'text-pink-500', 6, true, ARRAY['business', 'sales', 'pitch'], 'intermediate', 60),
('Content Ideas', 'Generate content ideas for your blog', 'Generate 10 unique content ideas for a [type] blog about [topic]. Include titles, brief descriptions, and target audience.', 'productivity', 'chat', 'lightbulb', 'text-yellow-500', 7, true, ARRAY['content', 'writing', 'ideas'], 'beginner', 45),
('To-Do List', 'Create a prioritized task list', 'Create a prioritized to-do list for [project/task]. Organize by: urgent/important, estimated time, and dependencies.', 'productivity', 'chat', 'check-square', 'text-teal-500', 8, true, ARRAY['productivity', 'planning', 'tasks'], 'beginner', 30),
('Brainstorm Ideas', 'Brainstorm creative solutions', 'Brainstorm 15 creative ideas to solve [challenge/problem]. Think outside the box and include unconventional approaches.', 'productivity', 'chat', 'brain', 'text-indigo-500', 9, true, ARRAY['creativity', 'brainstorm', 'problem-solving'], 'beginner', 60),
('Decision Matrix', 'Evaluate options systematically', 'Create a decision matrix to evaluate [options]. Include: criteria, weights, scoring, and final recommendation.', 'business', 'chat', 'scale', 'text-slate-500', 10, true, ARRAY['business', 'decision', 'analysis'], 'intermediate', 45);

-- Education & Learning Prompts
INSERT INTO public.chat_suggested_prompts (
  title, description, prompt_text, category, service_type, icon_name, color_class, display_order, is_active, tags, difficulty_level, estimated_response_time
) VALUES
('Explain Concept', 'Get simple explanations of complex topics', 'Explain [concept] in simple terms for a [age/level] learner. Use analogies, examples, and avoid jargon.', 'education', 'chat', 'book-open', 'text-blue-600', 11, true, ARRAY['education', 'learning', 'explanation'], 'beginner', 45),
('Study Guide', 'Create comprehensive study materials', 'Create a study guide for [subject/topic] with: key concepts, definitions, examples, and practice questions.', 'education', 'chat', 'book', 'text-green-600', 12, true, ARRAY['education', 'study', 'guide'], 'intermediate', 90),
('Quiz Questions', 'Generate practice quiz questions', 'Generate 10 quiz questions about [topic] with multiple choice options and detailed answers.', 'education', 'chat', 'help-circle', 'text-purple-600', 13, true, ARRAY['education', 'quiz', 'practice'], 'beginner', 60),
('Essay Outline', 'Create essay structure and outline', 'Create an outline for an essay on [topic]. Include: thesis statement, main points, supporting evidence, and conclusion.', 'education', 'chat', 'file-text', 'text-orange-600', 14, true, ARRAY['education', 'writing', 'essay'], 'intermediate', 45),
('Learning Path', 'Design a structured learning journey', 'Design a learning path to master [skill] in [timeframe]. Include: milestones, resources, projects, and assessment.', 'education', 'chat', 'map', 'text-pink-600', 15, true, ARRAY['education', 'learning', 'path'], 'intermediate', 75),
('Homework Help', 'Get help understanding assignments', 'Help me understand [homework topic/problem]. Explain the concept and walk through the solution step by step.', 'education', 'chat', 'help', 'text-teal-600', 16, true, ARRAY['education', 'homework', 'help'], 'beginner', 60),
('Research Summary', 'Summarize academic research', 'Summarize research on [topic] for academic purposes. Include: key findings, methodology, limitations, and implications.', 'education', 'chat', 'microscope', 'text-red-600', 17, true, ARRAY['education', 'research', 'summary'], 'advanced', 120),
('Vocabulary Builder', 'Build vocabulary in any subject', 'Create a vocabulary list for [language/subject] with: terms, definitions, pronunciation, and usage examples.', 'education', 'chat', 'type', 'text-indigo-600', 18, true, ARRAY['education', 'vocabulary', 'language'], 'beginner', 45);

-- Healthcare & Wellness Prompts
INSERT INTO public.chat_suggested_prompts (
  title, description, prompt_text, category, service_type, icon_name, color_class, display_order, is_active, tags, difficulty_level, estimated_response_time
) VALUES
('Symptom Check', 'Understand possible causes of symptoms', 'What could cause [symptoms]? (Disclaimer: Not a medical diagnosis. Please consult a healthcare professional.) Provide general information about possible causes.', 'healthcare', 'chat', 'activity', 'text-red-500', 19, true, ARRAY['health', 'symptoms', 'information'], 'beginner', 45),
('Wellness Tips', 'Get wellness and health advice', 'Provide evidence-based wellness tips for [health concern]. Include: lifestyle changes, diet, exercise, and stress management.', 'healthcare', 'chat', 'heart', 'text-pink-500', 20, true, ARRAY['health', 'wellness', 'tips'], 'beginner', 60),
('Medication Info', 'Understand how medications work', 'Explain how [medication] works and common side effects. Include: dosage information, interactions, and when to seek help.', 'healthcare', 'chat', 'pill', 'text-orange-500', 21, true, ARRAY['health', 'medication', 'information'], 'intermediate', 75),
('Exercise Plan', 'Create personalized exercise routines', 'Create a [duration] exercise plan for [fitness goal]. Include: warm-up, main exercises, cool-down, and progression.', 'healthcare', 'chat', 'zap', 'text-yellow-500', 22, true, ARRAY['health', 'fitness', 'exercise'], 'intermediate', 60),
('Nutrition Guide', 'Get nutritional guidance', 'Create a nutrition guide for [dietary goal/condition]. Include: food recommendations, meal ideas, and nutritional information.', 'healthcare', 'chat', 'apple', 'text-green-500', 23, true, ARRAY['health', 'nutrition', 'diet'], 'intermediate', 75),
('Mental Health', 'Get mental wellness support', 'Provide tips for managing [mental health concern]. Include: coping strategies, resources, and when to seek professional help.', 'healthcare', 'chat', 'smile', 'text-purple-500', 24, true, ARRAY['health', 'mental', 'wellness'], 'beginner', 60),
('Sleep Improvement', 'Improve sleep quality', 'Suggest evidence-based ways to improve sleep quality. Include: sleep hygiene, routines, supplements, and when to seek help.', 'healthcare', 'chat', 'moon', 'text-indigo-500', 25, true, ARRAY['health', 'sleep', 'wellness'], 'beginner', 45);

-- Code & Development Prompts
INSERT INTO public.chat_suggested_prompts (
  title, description, prompt_text, category, service_type, icon_name, color_class, display_order, is_active, tags, difficulty_level, estimated_response_time
) VALUES
('Code Review', 'Get code review and improvement suggestions', 'Review this code and suggest improvements: [code snippet]. Consider: readability, performance, security, and best practices.', 'code', 'chat', 'eye', 'text-blue-600', 26, true, ARRAY['code', 'review', 'development'], 'intermediate', 90),
('Debug Help', 'Get help debugging code errors', 'Help me debug this error: [error message] in [language]. Provide: root cause, solution, and prevention tips.', 'code', 'chat', 'bug', 'text-red-600', 27, true, ARRAY['code', 'debugging', 'help'], 'intermediate', 75),
('Code Snippet', 'Generate code for specific tasks', 'Write a [language] function to [task]. Include: comments, error handling, and usage examples.', 'code', 'chat', 'code', 'text-green-600', 28, true, ARRAY['code', 'snippet', 'development'], 'intermediate', 60),
('API Documentation', 'Understand how to use APIs', 'Explain how to use the [API name] API. Include: authentication, endpoints, request/response examples, and error handling.', 'code', 'chat', 'server', 'text-purple-600', 29, true, ARRAY['code', 'api', 'documentation'], 'intermediate', 90),
('Database Query', 'Write SQL queries', 'Write a SQL query to [task]. Include: table structure, joins, filters, and optimization tips.', 'code', 'chat', 'database', 'text-orange-600', 30, true, ARRAY['code', 'sql', 'database'], 'intermediate', 60),
('Algorithm Explanation', 'Understand algorithms and data structures', 'Explain the [algorithm name] algorithm. Include: how it works, time/space complexity, use cases, and examples.', 'code', 'chat', 'cpu', 'text-pink-600', 31, true, ARRAY['code', 'algorithm', 'learning'], 'advanced', 90),
('Best Practices', 'Learn coding best practices', 'What are best practices for [technology/language]? Include: naming conventions, patterns, testing, and documentation.', 'code', 'chat', 'star', 'text-yellow-600', 32, true, ARRAY['code', 'best-practices', 'development'], 'intermediate', 75);

-- Creative & Writing Prompts
INSERT INTO public.chat_suggested_prompts (
  title, description, prompt_text, category, service_type, icon_name, color_class, display_order, is_active, tags, difficulty_level, estimated_response_time
) VALUES
('Story Idea', 'Generate creative story concepts', 'Generate a creative story idea about [topic]. Include: plot, characters, setting, and conflict.', 'creative', 'chat', 'book-open', 'text-blue-500', 33, true, ARRAY['creative', 'writing', 'story'], 'beginner', 60),
('Character Development', 'Create detailed character profiles', 'Help me develop a character for [story/game]. Include: background, personality, motivations, strengths, and weaknesses.', 'creative', 'chat', 'user', 'text-green-500', 34, true, ARRAY['creative', 'writing', 'character'], 'intermediate', 75),
('Dialogue Writing', 'Write realistic dialogue', 'Write a dialogue between [characters] about [topic]. Make it natural, authentic, and character-appropriate.', 'creative', 'chat', 'message-circle', 'text-purple-500', 35, true, ARRAY['creative', 'writing', 'dialogue'], 'intermediate', 60),
('Poetry Prompt', 'Write poetry in various styles', 'Write a [type] poem about [topic]. Include: vivid imagery, emotion, and proper structure for the style.', 'creative', 'chat', 'pen-tool', 'text-orange-500', 36, true, ARRAY['creative', 'writing', 'poetry'], 'intermediate', 75),
('Copywriting', 'Write persuasive marketing copy', 'Write compelling copy for [product/service]. Include: headline, benefits, features, social proof, and call to action.', 'creative', 'chat', 'megaphone', 'text-pink-500', 37, true, ARRAY['creative', 'marketing', 'copywriting'], 'intermediate', 60),
('Social Media Post', 'Create engaging social content', 'Create a social media post about [topic]. Make it engaging, on-brand, and optimized for [platform].', 'creative', 'chat', 'share-2', 'text-teal-500', 38, true, ARRAY['creative', 'social-media', 'marketing'], 'beginner', 30),
('Brand Voice', 'Develop consistent brand messaging', 'Develop a brand voice and messaging for [brand]. Include: tone, values, key messages, and communication guidelines.', 'creative', 'chat', 'mic', 'text-indigo-500', 39, true, ARRAY['creative', 'branding', 'marketing'], 'advanced', 90);

-- General & Miscellaneous Prompts
INSERT INTO public.chat_suggested_prompts (
  title, description, prompt_text, category, service_type, icon_name, color_class, display_order, is_active, tags, difficulty_level, estimated_response_time
) VALUES
('Travel Planning', 'Create travel itineraries', 'Create a [duration] travel itinerary for [destination]. Include: attractions, restaurants, transportation, and budget.', 'general', 'chat', 'map-pin', 'text-blue-500', 40, true, ARRAY['travel', 'planning', 'itinerary'], 'beginner', 90),
('Recipe Ideas', 'Get recipe suggestions', 'Suggest [cuisine] recipes using [ingredients]. Include: ingredients, instructions, cooking time, and nutritional info.', 'general', 'chat', 'utensils', 'text-orange-500', 41, true, ARRAY['cooking', 'recipes', 'food'], 'beginner', 45),
('DIY Project', 'Get DIY project guidance', 'Guide me through a DIY project for [item/task]. Include: materials, tools, steps, and safety tips.', 'general', 'chat', 'hammer', 'text-red-500', 42, true, ARRAY['diy', 'projects', 'crafts'], 'beginner', 75),
('Gift Ideas', 'Get personalized gift suggestions', 'Suggest gift ideas for [person] who likes [interests]. Include: price range, where to buy, and personalization ideas.', 'general', 'chat', 'gift', 'text-pink-500', 43, true, ARRAY['gifts', 'shopping', 'ideas'], 'beginner', 45),
('Book Recommendation', 'Get book recommendations', 'Recommend books similar to [book/author]. Include: title, author, genre, plot summary, and why you''d like it.', 'general', 'chat', 'book', 'text-purple-500', 44, true, ARRAY['books', 'reading', 'recommendations'], 'beginner', 45),
('Movie Suggestion', 'Get movie recommendations', 'Suggest movies similar to [movie/genre]. Include: title, director, plot, rating, and where to watch.', 'general', 'chat', 'film', 'text-indigo-500', 45, true, ARRAY['movies', 'entertainment', 'recommendations'], 'beginner', 30);

-- ============================================
-- INSERT CHAT TEMPLATES
-- ============================================

INSERT INTO public.chat_templates (
  name, description, category, service_type, icon_name, color_class, initial_prompt, follow_up_prompts, difficulty_level, estimated_duration, tags, is_active, is_featured, display_order
) VALUES
('Professional Email', 'Draft professional business emails', 'business', 'chat', 'envelope', 'text-blue-500', 
'Draft a professional email with the following details:
- Recipient: [Name]
- Subject: [Topic]
- Purpose: [Main purpose]
- Tone: [Formal/Friendly/Urgent]

Please write the email with proper structure and professional language.',
ARRAY['What should I emphasize most?', 'Can you make it more concise?', 'How can I add a call to action?'],
'beginner', 15, ARRAY['business', 'email', 'writing'], true, true, 1),

('Meeting Summary', 'Organize and summarize meeting notes', 'business', 'chat', 'clipboard-list', 'text-green-500',
'Please summarize this meeting for me:
- Meeting Title: [Title]
- Attendees: [Names]
- Date: [Date]
- Key Topics: [Topics discussed]

Please organize the summary with:
1. Key decisions made
2. Action items with owners
3. Next steps and timeline',
ARRAY['What are the most critical action items?', 'Who should be notified about these decisions?', 'When should we follow up?'],
'beginner', 20, ARRAY['business', 'meetings', 'summary'], true, true, 2),

('Learning Session', 'Structure a learning conversation', 'education', 'chat', 'book-open', 'text-blue-600',
'I want to learn about [Topic]. Please:
1. Explain the main concept in simple terms
2. Provide 3-5 key points to understand
3. Give real-world examples
4. Create 3 practice questions
5. Suggest resources for deeper learning

My current level: [Beginner/Intermediate/Advanced]',
ARRAY['Can you explain this concept differently?', 'What are common misconceptions?', 'How can I apply this in practice?'],
'beginner', 30, ARRAY['education', 'learning', 'tutoring'], true, true, 3),

('Code Documentation', 'Document code with explanations', 'code', 'chat', 'code', 'text-green-600',
'Please document this code:
```
[Paste your code here]
```

Include:
1. Function/Class purpose
2. Parameters and their types
3. Return value
4. Usage examples
5. Important notes or edge cases
6. Related functions',
ARRAY['Can you optimize this code?', 'What are potential issues?', 'How would you test this?'],
'intermediate', 25, ARRAY['code', 'documentation', 'development'], true, false, 4),

('Product Review', 'Structure product reviews', 'business', 'chat', 'star', 'text-yellow-500',
'I want to review [Product Name]. Please help me structure a review with:
1. Product Overview
2. Pros (at least 3)
3. Cons (at least 2)
4. Pricing Assessment
5. Who should buy this
6. Overall Rating and Recommendation

Price: $[Price]
Usage Duration: [Time used]',
ARRAY['What features impressed you most?', 'What would you improve?', 'Is it worth the price?'],
'beginner', 20, ARRAY['business', 'review', 'product'], true, false, 5),

('Content Calendar', 'Plan content strategy', 'business', 'chat', 'calendar', 'text-purple-500',
'Help me create a content calendar for [Platform]:
- Platform: [Social Media/Blog/Email]
- Topic: [Main topic]
- Duration: [1 month/3 months/6 months]
- Posting Frequency: [Daily/3x/week/Weekly]
- Target Audience: [Description]

Please provide:
1. Content themes by week
2. Specific post ideas with titles
3. Best posting times
4. Engagement strategies',
ARRAY['Can you suggest hashtags?', 'How do I measure success?', 'What content performs best?'],
'intermediate', 45, ARRAY['content', 'marketing', 'planning'], true, false, 6),

('Brainstorm Session', 'Generate creative ideas', 'creative', 'chat', 'lightbulb', 'text-yellow-600',
'Let''s brainstorm ideas for [Challenge/Project]:
- Challenge: [Description]
- Constraints: [Any limitations]
- Target: [Who is this for?]
- Timeline: [Deadline]

Please generate:
1. 10 creative ideas
2. Pros and cons for each
3. Implementation difficulty (Easy/Medium/Hard)
4. Resource requirements
5. Top 3 recommendations',
ARRAY['Can we combine any of these ideas?', 'What are the risks?', 'How do we validate these ideas?'],
'beginner', 30, ARRAY['creative', 'brainstorm', 'innovation'], true, false, 7);

-- ============================================
-- INSERT QUICK ACTIONS
-- ============================================

INSERT INTO public.chat_quick_actions (
  name, description, action_type, action_handler, icon_name, color_class, keyboard_shortcut, requires_subscription, min_plan_tier, is_active, display_order
) VALUES
('Attach File', 'Upload documents, images, or files to your chat', 'attach', 'handleFileUpload', 'paperclip', 'text-blue-500', 'Ctrl+Shift+A', false, 'free', true, 1),
('Voice Input', 'Speak your message instead of typing', 'voice', 'handleVoiceInput', 'mic', 'text-red-500', 'Ctrl+Shift+V', false, 'free', true, 2),
('Web Search', 'Search the web for current information', 'web_search', 'handleWebSearch', 'search', 'text-purple-500', 'Ctrl+Shift+W', false, 'pro', true, 3),
('Image Upload', 'Upload images for analysis or editing', 'image', 'handleImageUpload', 'image', 'text-green-500', 'Ctrl+Shift+I', false, 'free', true, 4),
('Code Block', 'Insert formatted code snippets', 'code', 'handleCodeBlock', 'code', 'text-orange-500', 'Ctrl+Shift+C', false, 'free', true, 5);

-- ============================================
-- SUMMARY STATISTICS
-- ============================================

-- Display summary
SELECT 
  (SELECT COUNT(*) FROM public.chat_suggested_prompts) as total_prompts,
  (SELECT COUNT(*) FROM public.chat_templates) as total_templates,
  (SELECT COUNT(*) FROM public.chat_quick_actions) as total_quick_actions;
