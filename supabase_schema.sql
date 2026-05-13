-- Ecole Nadjah Database Schema
-- Run this in the Supabase SQL Editor

-- 1. Levels (Primary, CEM, Lycee, etc.)
CREATE TABLE levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Years (1AP - 3AS)
CREATE TABLE years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    level_id UUID REFERENCES levels(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    UNIQUE(level_id, name),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Subjects
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Year-Subject Linking (Which subjects are available for each year)
CREATE TABLE year_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year_id UUID REFERENCES years(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    UNIQUE(year_id, subject_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Registration Requests (Account Access)
CREATE TABLE registration_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT CHECK (role IN ('STUDENT', 'TEACHER')),
    target_year_id UUID REFERENCES years(id),
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Enrollment Requests (Existing students adding new subjects)
CREATE TABLE enrollment_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    year_subject_id UUID REFERENCES year_subjects(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Student Enrollments (Many-to-Many)
CREATE TABLE student_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    year_subject_id UUID REFERENCES year_subjects(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, year_subject_id)
);

-- 8. Teacher Assignments
CREATE TABLE teacher_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    year_subject_id UUID REFERENCES year_subjects(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(teacher_id, year_subject_id)
);

-- 9. Courses (Recorded/Replay content)
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year_subject_id UUID REFERENCES year_subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    video_url TEXT,
    duration TEXT,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Live Sessions
CREATE TABLE lives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year_subject_id UUID REFERENCES year_subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    stream_url TEXT,
    is_live BOOLEAN DEFAULT false,
    viewer_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES --

-- Students can only see their own enrollments
ALTER TABLE student_enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY student_view_own_enrollments ON student_enrollments
    FOR SELECT USING (auth.uid() = student_id);

-- Teachers can only see their own assignments
ALTER TABLE teacher_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY teacher_view_own_assignments ON teacher_assignments
    FOR SELECT USING (auth.uid() = teacher_id);

-- General lookup tables (Read-only for all authenticated users)
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_read_levels ON levels FOR SELECT TO authenticated USING (true);

ALTER TABLE years ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_read_years ON years FOR SELECT TO authenticated USING (true);

ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_read_subjects ON subjects FOR SELECT TO authenticated USING (true);

ALTER TABLE year_subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_read_year_subjects ON year_subjects FOR SELECT TO authenticated USING (true);
