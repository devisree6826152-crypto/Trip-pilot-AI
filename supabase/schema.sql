-- Approvly PostgreSQL Schema for Supabase Migration

CREATE TYPE user_role AS ENUM ('admin', 'team', 'client');
CREATE TYPE project_status AS ENUM ('Planning', 'In Progress', 'In Review', 'Awaiting Client Approval', 'Approved', 'Completed');
CREATE TYPE milestone_status AS ENUM ('Upcoming', 'Active', 'Done');
CREATE TYPE deliverable_type AS ENUM ('prototype', 'image', 'pdf', 'link');
CREATE TYPE deliverable_status AS ENUM ('Draft', 'In Review', 'Changes Requested', 'Approved');
CREATE TYPE feedback_category AS ENUM ('Performance', 'UI/UX', 'Content', 'Functionality', 'Branding/Design', 'Accessibility', 'Bug', 'Other');
CREATE TYPE feedback_priority AS ENUM ('Critical', 'High', 'Medium', 'Low');
CREATE TYPE feedback_status AS ENUM ('Open', 'In Progress', 'Addressed', 'Resolved', 'Won''t Do');

CREATE TABLE organizations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT NOT NULL
);

CREATE TABLE clients (
    id TEXT PRIMARY KEY,
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role user_role NOT NULL DEFAULT 'client',
    avatar TEXT NOT NULL,
    org_id TEXT NOT NULL REFERENCES organizations(id),
    client_id TEXT REFERENCES clients(id)
);

CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    client_id TEXT NOT NULL REFERENCES clients(id),
    description TEXT,
    status project_status NOT NULL DEFAULT 'Planning',
    due_date DATE NOT NULL,
    member_ids TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE milestones (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    due_date DATE NOT NULL,
    status milestone_status NOT NULL DEFAULT 'Upcoming',
    "order" INT NOT NULL DEFAULT 1
);

CREATE TABLE deliverables (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id TEXT NOT NULL REFERENCES milestones(id),
    title TEXT NOT NULL,
    type deliverable_type NOT NULL DEFAULT 'prototype',
    status deliverable_status NOT NULL DEFAULT 'Draft',
    current_version_id TEXT,
    approved_version_id TEXT,
    required_approvals INT NOT NULL DEFAULT 1
);

CREATE TABLE deliverable_versions (
    id TEXT PRIMARY KEY,
    deliverable_id TEXT NOT NULL REFERENCES deliverables(id) ON DELETE CASCADE,
    number INT NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    preview_kind TEXT NOT NULL,
    release_notes TEXT,
    uploaded_by TEXT NOT NULL REFERENCES users(id),
    uploadedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    checksum TEXT NOT NULL
);

CREATE TABLE feedback_items (
    id TEXT PRIMARY KEY,
    deliverable_id TEXT NOT NULL REFERENCES deliverables(id) ON DELETE CASCADE,
    version_id TEXT NOT NULL REFERENCES deliverable_versions(id),
    author_id TEXT NOT NULL REFERENCES users(id),
    body TEXT NOT NULL,
    category feedback_category NOT NULL DEFAULT 'Other',
    priority feedback_priority NOT NULL DEFAULT 'Medium',
    status feedback_status NOT NULL DEFAULT 'Open',
    assignee_id TEXT REFERENCES users(id),
    due_date DATE,
    is_blocking BOOLEAN DEFAULT FALSE,
    anchor JSONB,
    ai_analysis_id TEXT,
    duplicate_of_id TEXT REFERENCES feedback_items(id),
    carried_from_feedback_id TEXT REFERENCES feedback_items(id),
    carried_from_version_id TEXT REFERENCES deliverable_versions(id),
    carried_from_version TEXT,
    is_carried_forward BOOLEAN DEFAULT FALSE,
    original_created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    wont_do_reason TEXT,
    ai_action_item TEXT,
    ai_confidence FLOAT
);

CREATE TABLE replies (
    id TEXT PRIMARY KEY,
    feedback_id TEXT NOT NULL REFERENCES feedback_items(id) ON DELETE CASCADE,
    author_id TEXT NOT NULL REFERENCES users(id),
    body TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE approvals (
    id TEXT PRIMARY KEY,
    deliverable_id TEXT NOT NULL REFERENCES deliverables(id) ON DELETE CASCADE,
    version_id TEXT NOT NULL REFERENCES deliverable_versions(id),
    approver_id TEXT NOT NULL REFERENCES users(id),
    decision TEXT NOT NULL DEFAULT 'approved',
    comment TEXT,
    checksum TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    link TEXT NOT NULL,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE activity_events (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    deliverable_id TEXT REFERENCES deliverables(id),
    actor_id TEXT NOT NULL REFERENCES users(id),
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
