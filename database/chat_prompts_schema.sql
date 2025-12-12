-- ============================================
-- DalSiAI Chat System - Prompts & Templates
-- ============================================

-- Suggested Prompts Table
CREATE TABLE IF NOT EXISTS suggested_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(100) NOT NULL,
  prompt TEXT NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'business', 'education', 'healthcare', 'code', 'creative', 'productivity'
  model_type VARCHAR(50), -- 'general', 'healthcare', 'education', 'code', 'weather'
  emoji VARCHAR(10),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chat Templates Table
CREATE TABLE IF NOT EXISTS chat_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL, -- 'email', 'summary', 'translation', 'tutoring', 'code', 'business'
  template_text TEXT NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Quick Actions Table
CREATE TABLE IF NOT EXISTS quick_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  action_type VARCHAR(50) NOT NULL, -- 'attach', 'voice', 'web_search', 'image', 'file'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Integrations Table
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  category VARCHAR(50), -- 'productivity', 'communication', 'storage', 'development'
  is_connected BOOLEAN DEFAULT false,
  connection_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User Saved Prompts Table
CREATE TABLE IF NOT EXISTS user_saved_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  prompt TEXT NOT NULL,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, title)
);

-- ============================================
-- INSERT SUGGESTED PROMPTS
-- ============================================

-- Business & Productivity Prompts
INSERT INTO suggested_prompts (title, prompt, category, model_type, emoji, order_index) VALUES
('Email Draft', 'Draft a professional email to [recipient] about [topic]', 'business', 'general', '✉️', 1),
('Meeting Summary', 'Summarize the key points from this meeting: [meeting notes]', 'business', 'general', '📋', 2),
('Project Plan', 'Create a project plan for [project name] with timeline and milestones', 'business', 'general', '📊', 3),
('Market Analysis', 'Analyze the market for [product/service] and identify key opportunities', 'business', 'general', '📈', 4),
('Competitor Research', 'Research and summarize competitors in the [industry] space', 'business', 'general', '🔍', 5),
('Sales Pitch', 'Create a compelling sales pitch for [product/service]', 'business', 'general', '🎯', 6),
('Content Ideas', 'Generate 10 content ideas for a [type] blog about [topic]', 'productivity', 'general', '💡', 7),
('To-Do List', 'Create a prioritized to-do list for [project/task]', 'productivity', 'general', '✅', 8),
('Brainstorm Ideas', 'Brainstorm creative ideas for [challenge/problem]', 'productivity', 'general', '🧠', 9),
('Decision Matrix', 'Create a decision matrix to evaluate [options]', 'business', 'general', '⚖️', 10);

-- Education & Learning Prompts
INSERT INTO suggested_prompts (title, prompt, category, model_type, emoji, order_index) VALUES
('Explain Concept', 'Explain [concept] in simple terms for a [age/level] learner', 'education', 'education', '📚', 11),
('Study Guide', 'Create a study guide for [subject/topic] with key points and practice questions', 'education', 'education', '📖', 12),
('Quiz Questions', 'Generate 10 quiz questions about [topic] with answers', 'education', 'education', '❓', 13),
('Essay Outline', 'Create an outline for an essay on [topic]', 'education', 'education', '✏️', 14),
('Learning Path', 'Design a learning path to master [skill] in [timeframe]', 'education', 'education', '🎓', 15),
('Homework Help', 'Help me understand [homework topic/problem]', 'education', 'education', '🤔', 16),
('Research Summary', 'Summarize research on [topic] for academic purposes', 'education', 'education', '🔬', 17),
('Vocabulary Builder', 'Create a vocabulary list for [language/subject] with definitions', 'education', 'education', '📝', 18);

-- Healthcare & Wellness Prompts
INSERT INTO suggested_prompts (title, prompt, category, model_type, emoji, order_index) VALUES
('Symptom Check', 'What could cause [symptoms]? (Not a medical diagnosis)', 'healthcare', 'healthcare', '🏥', 19),
('Wellness Tips', 'Provide wellness tips for [health concern]', 'healthcare', 'healthcare', '💪', 20),
('Medication Info', 'Explain how [medication] works and common side effects', 'healthcare', 'healthcare', '💊', 21),
('Exercise Plan', 'Create a [duration] exercise plan for [fitness goal]', 'healthcare', 'healthcare', '🏃', 22),
('Nutrition Guide', 'Create a nutrition guide for [dietary goal/condition]', 'healthcare', 'healthcare', '🥗', 23),
('Mental Health', 'Provide tips for managing [mental health concern]', 'healthcare', 'healthcare', '🧘', 24),
('Sleep Improvement', 'Suggest ways to improve sleep quality', 'healthcare', 'healthcare', '😴', 25);

-- Code & Development Prompts
INSERT INTO suggested_prompts (title, prompt, category, model_type, emoji, order_index) VALUES
('Code Review', 'Review this code and suggest improvements: [code snippet]', 'code', 'code', '🔍', 26),
('Debug Help', 'Help me debug this error: [error message] in [language]', 'code', 'code', '🐛', 27),
('Code Snippet', 'Write a [language] function to [task]', 'code', 'code', '💻', 28),
('API Documentation', 'Explain how to use the [API name] API', 'code', 'code', '📡', 29),
('Database Query', 'Write a SQL query to [task]', 'code', 'code', '🗄️', 30),
('Algorithm Explanation', 'Explain the [algorithm name] algorithm', 'code', 'code', '⚙️', 31),
('Best Practices', 'What are best practices for [technology/language]', 'code', 'code', '✨', 32);

-- Creative & Writing Prompts
INSERT INTO suggested_prompts (title, prompt, category, model_type, emoji, order_index) VALUES
('Story Idea', 'Generate a creative story idea about [topic]', 'creative', 'general', '📖', 33),
('Character Development', 'Help me develop a character for [story/game]', 'creative', 'general', '👤', 34),
('Dialogue Writing', 'Write a dialogue between [characters] about [topic]', 'creative', 'general', '💬', 35),
('Poetry Prompt', 'Write a [type] poem about [topic]', 'creative', 'general', '✍️', 36),
('Copywriting', 'Write compelling copy for [product/service]', 'creative', 'general', '📢', 37),
('Social Media Post', 'Create a social media post about [topic]', 'creative', 'general', '📱', 38),
('Brand Voice', 'Develop a brand voice and messaging for [brand]', 'creative', 'general', '🎤', 39);

-- Weather & General Prompts
INSERT INTO suggested_prompts (title, prompt, category, model_type, emoji, order_index) VALUES
('Weather Forecast', 'What is the weather forecast for [location] for [timeframe]', 'general', 'weather', '🌤️', 40),
('Travel Planning', 'Create a [duration] travel itinerary for [destination]', 'general', 'general', '✈️', 41),
('Recipe Ideas', 'Suggest [cuisine] recipes using [ingredients]', 'general', 'general', '🍳', 42),
('DIY Project', 'Guide me through a DIY project for [item/task]', 'general', 'general', '🔨', 43),
('Gift Ideas', 'Suggest gift ideas for [person] who likes [interests]', 'general', 'general', '🎁', 44),
('Book Recommendation', 'Recommend books similar to [book/author]', 'general', 'general', '📚', 45),
('Movie Suggestion', 'Suggest movies similar to [movie/genre]', 'general', 'general', '🎬', 46);

-- ============================================
-- INSERT CHAT TEMPLATES
-- ============================================

INSERT INTO chat_templates (title, description, category, template_text, icon, color) VALUES
('Professional Email', 'Write professional business emails', 'email', 'Subject: [Subject]

Dear [Recipient],

I hope this email finds you well. [Opening statement about the purpose of the email]

[Main content - key points or information]

[Call to action or next steps]

Best regards,
[Your Name]', '✉️', 'blue'),

('Email Summary', 'Summarize long emails into key points', 'summary', 'Original Email:
[Paste email content]

Key Points:
1. [Main point 1]
2. [Main point 2]
3. [Main point 3]

Action Items:
- [Action 1]
- [Action 2]

Deadline: [Date]', '📋', 'green'),

('Translation Request', 'Translate text to another language', 'translation', 'Text to translate:
[Original text]

Target language: [Language]

Translation:
[Translation will appear here]

Notes:
- Maintain tone and context
- Preserve formatting', '🌐', 'purple'),

('Learning Session', 'Structure a learning conversation', 'tutoring', 'Topic: [Subject]
Level: [Beginner/Intermediate/Advanced]

Learning Objectives:
1. [Objective 1]
2. [Objective 2]

Key Concepts:
- [Concept 1]
- [Concept 2]

Practice Questions:
1. [Question 1]
2. [Question 2]

Summary:
[Key takeaways]', '🎓', 'orange'),

('Code Documentation', 'Document code with explanations', 'code', 'Function: [Function Name]
Language: [Language]
Purpose: [What it does]

Parameters:
- [Param 1]: [Type] - [Description]
- [Param 2]: [Type] - [Description]

Returns: [Return type] - [Description]

Example Usage:
```
[Code example]
```

Notes:
- [Important note 1]
- [Important note 2]', '💻', 'red'),

('Meeting Notes', 'Organize meeting information', 'business', 'Meeting: [Title]
Date: [Date]
Attendees: [Names]

Agenda:
1. [Topic 1]
2. [Topic 2]
3. [Topic 3]

Discussion:
[Key discussion points]

Decisions Made:
- [Decision 1]
- [Decision 2]

Action Items:
- [Owner]: [Task] - Due [Date]
- [Owner]: [Task] - Due [Date]

Next Meeting: [Date]', '📅', 'indigo'),

('Product Review', 'Structure product reviews', 'business', 'Product: [Product Name]
Rating: ⭐⭐⭐⭐⭐

Pros:
+ [Advantage 1]
+ [Advantage 2]
+ [Advantage 3]

Cons:
- [Disadvantage 1]
- [Disadvantage 2]

Overall Impression:
[Your thoughts]

Recommendation:
[Who should buy this?]

Price: [Value for money assessment]', '⭐', 'yellow');

-- ============================================
-- INSERT QUICK ACTIONS
-- ============================================

INSERT INTO quick_actions (name, description, icon, action_type) VALUES
('Attach File', 'Upload documents, images, or files', '📎', 'attach'),
('Voice Input', 'Speak your message instead of typing', '🎤', 'voice'),
('Web Search', 'Search the web for current information', '🔍', 'web_search'),
('Image Upload', 'Upload images for analysis or editing', '🖼️', 'image'),
('Code Block', 'Insert formatted code snippets', '</>', 'file');

-- ============================================
-- INSERT INTEGRATIONS
-- ============================================

INSERT INTO integrations (name, description, icon, category, is_connected, connection_url) VALUES
('Google Drive', 'Access and share files from Google Drive', '📁', 'storage', true, 'https://drive.google.com'),
('Slack', 'Send chat summaries and updates to Slack', '💬', 'communication', false, 'https://slack.com'),
('Gmail', 'Draft and send emails directly', '✉️', 'communication', false, 'https://gmail.com'),
('Notion', 'Save conversations and notes to Notion', '📝', 'productivity', false, 'https://notion.so'),
('GitHub', 'Share code snippets and collaborate', '🐙', 'development', false, 'https://github.com'),
('Zapier', 'Automate workflows with Zapier', '⚡', 'productivity', false, 'https://zapier.com'),
('Microsoft Teams', 'Share content with Microsoft Teams', '👥', 'communication', false, 'https://teams.microsoft.com'),
('Trello', 'Create Trello cards from conversations', '📊', 'productivity', false, 'https://trello.com');

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_suggested_prompts_category ON suggested_prompts(category);
CREATE INDEX IF NOT EXISTS idx_suggested_prompts_model_type ON suggested_prompts(model_type);
CREATE INDEX IF NOT EXISTS idx_suggested_prompts_active ON suggested_prompts(is_active);
CREATE INDEX IF NOT EXISTS idx_chat_templates_category ON chat_templates(category);
CREATE INDEX IF NOT EXISTS idx_chat_templates_active ON chat_templates(is_active);
CREATE INDEX IF NOT EXISTS idx_user_saved_prompts_user_id ON user_saved_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_integrations_category ON integrations(category);
CREATE INDEX IF NOT EXISTS idx_integrations_active ON integrations(is_active);

-- ============================================
-- CREATE RLS POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE suggested_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE quick_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saved_prompts ENABLE ROW LEVEL SECURITY;

-- Suggested Prompts - Anyone can read, only admin can write
CREATE POLICY "Suggested prompts are public" ON suggested_prompts
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can manage prompts" ON suggested_prompts
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role IN ('admin', 'super_admin')));

-- Chat Templates - Anyone can read, only admin can write
CREATE POLICY "Templates are public" ON chat_templates
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can manage templates" ON chat_templates
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role IN ('admin', 'super_admin')));

-- Quick Actions - Anyone can read
CREATE POLICY "Quick actions are public" ON quick_actions
  FOR SELECT USING (is_active = true);

-- Integrations - Anyone can read
CREATE POLICY "Integrations are public" ON integrations
  FOR SELECT USING (is_active = true);

-- User Saved Prompts - Users can only see their own
CREATE POLICY "Users can see their own saved prompts" ON user_saved_prompts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved prompts" ON user_saved_prompts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved prompts" ON user_saved_prompts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved prompts" ON user_saved_prompts
  FOR DELETE USING (auth.uid() = user_id);
