CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content_html TEXT NOT NULL,
  content_text TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Meda Endüstri',
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TEXT,
  seo_title TEXT,
  meta_description TEXT,
  keywords_json TEXT NOT NULL DEFAULT '[]',
  canonical_url TEXT,
  robots_index INTEGER NOT NULL DEFAULT 1 CHECK (robots_index IN (0, 1)),
  robots_follow INTEGER NOT NULL DEFAULT 1 CHECK (robots_follow IN (0, 1)),
  og_title TEXT,
  og_description TEXT,
  og_image_url TEXT,
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image_url TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_articles_public
  ON articles(status, deleted_at, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_featured
  ON articles(featured, status, deleted_at);

CREATE TABLE IF NOT EXISTS article_slug_history (
  old_slug TEXT PRIMARY KEY,
  article_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS article_revisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id INTEGER NOT NULL,
  snapshot_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_article_revisions_article
  ON article_revisions(article_id, created_at DESC);

CREATE TABLE IF NOT EXISTS auth_login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip_hash TEXT NOT NULL,
  attempted_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_auth_attempts_ip_time
  ON auth_login_attempts(ip_hash, attempted_at);

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  ip_hash TEXT,
  details_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_admin_audit_created
  ON admin_audit_log(created_at DESC);
