-- wip_items 테이블 생성
CREATE TABLE wip_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_item_id INTEGER NOT NULL,           -- 작업 중인 리뷰 아이템 ID
  admin_id VARCHAR(255) NOT NULL,            -- 관리자 ID (쿠키의 userId)
  status VARCHAR(20) NOT NULL DEFAULT 'viewing',  -- 'viewing' | 'reviewed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,    -- 검수 완료 시점 (크론잡 삭제용)
  
  UNIQUE(review_item_id)  -- 하나의 아이템당 하나의 세션만
);

-- 인덱스 추가
CREATE INDEX idx_wip_items_item_id ON wip_items(review_item_id);
CREATE INDEX idx_wip_items_admin_id ON wip_items(admin_id);
CREATE INDEX idx_wip_items_status ON wip_items(status);
CREATE INDEX idx_wip_items_completed_at ON wip_items(completed_at);

-- Row Level Security (RLS) 활성화
ALTER TABLE wip_items ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능 (realtime 업데이트를 위해)
CREATE POLICY "Enable read access for all users" ON wip_items
FOR SELECT USING (true);

-- 모든 사용자가 삽입/업데이트/삭제 가능 (관리자 도구이므로)
CREATE POLICY "Enable all access for authenticated users" ON wip_items
FOR ALL USING (true);

-- Realtime 활성화
ALTER PUBLICATION supabase_realtime ADD TABLE wip_items;