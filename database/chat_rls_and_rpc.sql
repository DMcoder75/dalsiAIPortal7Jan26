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
CREATE POLICY "Allow public read on suggested prompts"
ON chat_suggested_prompts
FOR SELECT
USING (is_active = true);

CREATE POLICY "Allow authenticated users to read suggested prompts"
ON chat_suggested_prompts
FOR SELECT
USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- ============================================
-- Policies for chat_templates (Public Read)
-- ============================================
CREATE POLICY "Allow public read on templates"
ON chat_templates
FOR SELECT
USING (is_active = true);

CREATE POLICY "Allow authenticated users to read templates"
ON chat_templates
FOR SELECT
USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- ============================================
-- Policies for chat_quick_actions (Public Read)
-- ============================================
CREATE POLICY "Allow public read on quick actions"
ON chat_quick_actions
FOR SELECT
USING (is_active = true);

CREATE POLICY "Allow authenticated users to read quick actions"
ON chat_quick_actions
FOR SELECT
USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- ============================================
-- RPC Functions for Chat Features
-- ============================================

-- Function to get suggested prompts
CREATE OR REPLACE FUNCTION get_suggested_prompts(
  p_limit INT DEFAULT 8,
  p_category TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  prompt_text TEXT,
  category TEXT,
  service_type TEXT,
  icon_name TEXT,
  color_class TEXT,
  display_order INT,
  tags TEXT[],
  difficulty_level TEXT,
  estimated_response_time INT,
  is_active BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
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
CREATE OR REPLACE FUNCTION get_chat_templates(
  p_limit INT DEFAULT 10,
  p_category TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  category TEXT,
  service_type TEXT,
  icon_name TEXT,
  color_class TEXT,
  initial_prompt TEXT,
  follow_up_prompts TEXT[],
  difficulty_level TEXT,
  estimated_duration INT,
  tags TEXT[],
  is_active BOOLEAN,
  is_featured BOOLEAN,
  display_order INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
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
CREATE OR REPLACE FUNCTION get_quick_actions(
  p_limit INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  action_type TEXT,
  action_handler TEXT,
  icon_name TEXT,
  color_class TEXT,
  keyboard_shortcut TEXT,
  requires_subscription BOOLEAN,
  min_plan_tier TEXT,
  is_active BOOLEAN,
  display_order INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
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

-- Function to get integrations
CREATE OR REPLACE FUNCTION get_integrations(
  p_limit INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  icon_name TEXT,
  color_class TEXT,
  connection_status TEXT,
  is_active BOOLEAN,
  requires_auth BOOLEAN,
  display_order INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    i.id,
    i.name,
    i.description,
    i.icon_name,
    i.color_class,
    i.connection_status,
    i.is_active,
    i.requires_auth,
    i.display_order,
    i.created_at,
    i.updated_at
  FROM chat_integrations i
  WHERE i.is_active = true
  ORDER BY i.display_order ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get text-based prompts only (excluding image/video)
CREATE OR REPLACE FUNCTION get_text_based_prompts(
  p_limit INT DEFAULT 4
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  prompt_text TEXT,
  category TEXT,
  service_type TEXT,
  icon_name TEXT,
  color_class TEXT,
  display_order INT,
  tags TEXT[],
  difficulty_level TEXT,
  estimated_response_time INT,
  is_active BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
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

-- ============================================
-- Grant Permissions to Anon and Authenticated Users
-- ============================================

-- Grant SELECT on tables to anon and authenticated users
GRANT SELECT ON chat_suggested_prompts TO anon, authenticated;
GRANT SELECT ON chat_templates TO anon, authenticated;
GRANT SELECT ON chat_quick_actions TO anon, authenticated;
GRANT SELECT ON chat_integrations TO anon, authenticated;

-- Grant EXECUTE on RPC functions to anon and authenticated users
GRANT EXECUTE ON FUNCTION get_suggested_prompts TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_chat_templates TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_quick_actions TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_integrations TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_text_based_prompts TO anon, authenticated;
