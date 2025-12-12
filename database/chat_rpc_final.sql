-- ============================================
-- RLS (Row Level Security) Policies for Chat Tables
-- ============================================

-- Enable RLS on chat tables
ALTER TABLE chat_suggested_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_quick_actions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Policies for chat_suggested_prompts (Public Read)
-- ============================================
DROP POLICY IF EXISTS "Allow public read on suggested prompts" ON chat_suggested_prompts;
CREATE POLICY "Allow public read on suggested prompts"
ON chat_suggested_prompts
FOR SELECT
USING (is_active = true);

-- ============================================
-- Policies for chat_templates (Public Read)
-- ============================================
DROP POLICY IF EXISTS "Allow public read on templates" ON chat_templates;
CREATE POLICY "Allow public read on templates"
ON chat_templates
FOR SELECT
USING (is_active = true);

-- ============================================
-- Policies for chat_quick_actions (Public Read)
-- ============================================
DROP POLICY IF EXISTS "Allow public read on quick actions" ON chat_quick_actions;
CREATE POLICY "Allow public read on quick actions"
ON chat_quick_actions
FOR SELECT
USING (is_active = true);

-- ============================================
-- RPC Functions for Chat Features
-- ============================================

-- Function to get text-based prompts only (excluding image/video)
-- This is the main function used by the Experience page
DROP FUNCTION IF EXISTS get_text_based_prompts(INT);
CREATE OR REPLACE FUNCTION get_text_based_prompts(
  p_limit INT DEFAULT 4
)
RETURNS TABLE (
  id UUID,
  title VARCHAR,
  description TEXT,
  prompt_text TEXT,
  category VARCHAR,
  service_type VARCHAR,
  icon_name VARCHAR,
  color_class VARCHAR,
  display_order INT,
  tags TEXT[],
  difficulty_level VARCHAR,
  estimated_response_time INT,
  is_active BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sp.id,
    sp.title,
    sp.description,
    sp.prompt_text,
    sp.category,
    sp.service_type,
    sp.icon_name,
    sp.color_class,
    sp.display_order,
    sp.tags,
    sp.difficulty_level,
    sp.estimated_response_time,
    sp.is_active,
    sp.created_at,
    sp.updated_at
  FROM chat_suggested_prompts sp
  WHERE sp.is_active = true
    AND sp.category NOT IN ('image', 'video')
    AND sp.prompt_text NOT ILIKE '%image%'
    AND sp.prompt_text NOT ILIKE '%video%'
  ORDER BY sp.display_order ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get suggested prompts with optional category filter
DROP FUNCTION IF EXISTS get_suggested_prompts(INT, VARCHAR);
CREATE OR REPLACE FUNCTION get_suggested_prompts(
  p_limit INT DEFAULT 8,
  p_category VARCHAR DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  title VARCHAR,
  description TEXT,
  prompt_text TEXT,
  category VARCHAR,
  service_type VARCHAR,
  icon_name VARCHAR,
  color_class VARCHAR,
  display_order INT,
  tags TEXT[],
  difficulty_level VARCHAR,
  estimated_response_time INT,
  is_active BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sp.id,
    sp.title,
    sp.description,
    sp.prompt_text,
    sp.category,
    sp.service_type,
    sp.icon_name,
    sp.color_class,
    sp.display_order,
    sp.tags,
    sp.difficulty_level,
    sp.estimated_response_time,
    sp.is_active,
    sp.created_at,
    sp.updated_at
  FROM chat_suggested_prompts sp
  WHERE sp.is_active = true
    AND (p_category IS NULL OR sp.category = p_category)
  ORDER BY sp.display_order ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get chat templates
DROP FUNCTION IF EXISTS get_chat_templates(INT, VARCHAR);
CREATE OR REPLACE FUNCTION get_chat_templates(
  p_limit INT DEFAULT 10,
  p_category VARCHAR DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  description TEXT,
  category VARCHAR,
  service_type VARCHAR,
  icon_name VARCHAR,
  color_class VARCHAR,
  thumbnail_url TEXT,
  initial_prompt TEXT,
  follow_up_prompts TEXT[],
  difficulty_level VARCHAR,
  estimated_duration INT,
  tags TEXT[],
  is_active BOOLEAN,
  is_featured BOOLEAN,
  display_order INT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ct.id,
    ct.name,
    ct.description,
    ct.category,
    ct.service_type,
    ct.icon_name,
    ct.color_class,
    ct.thumbnail_url,
    ct.initial_prompt,
    ct.follow_up_prompts,
    ct.difficulty_level,
    ct.estimated_duration,
    ct.tags,
    ct.is_active,
    ct.is_featured,
    ct.display_order,
    ct.created_at,
    ct.updated_at
  FROM chat_templates ct
  WHERE ct.is_active = true
    AND (p_category IS NULL OR ct.category = p_category)
  ORDER BY ct.display_order ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get quick actions
DROP FUNCTION IF EXISTS get_quick_actions(INT);
CREATE OR REPLACE FUNCTION get_quick_actions(
  p_limit INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  description TEXT,
  action_type VARCHAR,
  action_handler VARCHAR,
  icon_name VARCHAR,
  color_class VARCHAR,
  keyboard_shortcut VARCHAR,
  requires_subscription BOOLEAN,
  min_plan_tier VARCHAR,
  is_active BOOLEAN,
  display_order INT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    qa.id,
    qa.name,
    qa.description,
    qa.action_type,
    qa.action_handler,
    qa.icon_name,
    qa.color_class,
    qa.keyboard_shortcut,
    qa.requires_subscription,
    qa.min_plan_tier,
    qa.is_active,
    qa.display_order,
    qa.created_at,
    qa.updated_at
  FROM chat_quick_actions qa
  WHERE qa.is_active = true
  ORDER BY qa.display_order ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================
-- Grant Permissions to Anon and Authenticated Users
-- ============================================

-- Grant SELECT on tables to anon and authenticated users
GRANT SELECT ON chat_suggested_prompts TO anon, authenticated;
GRANT SELECT ON chat_templates TO anon, authenticated;
GRANT SELECT ON chat_quick_actions TO anon, authenticated;

-- Grant EXECUTE on RPC functions to anon and authenticated users
GRANT EXECUTE ON FUNCTION get_text_based_prompts(INT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_suggested_prompts(INT, VARCHAR) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_chat_templates(INT, VARCHAR) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_quick_actions(INT) TO anon, authenticated;
