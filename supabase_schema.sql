-- Ecole Nadjah Database Schema
-- Run this in the Supabase SQL Editor

-- 0. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Levels (Primary, CEM, Lycee, etc.)
CREATE TABLE IF NOT EXISTS levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Years (1AP - 3AS)
CREATE TABLE IF NOT EXISTS years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    level_id UUID REFERENCES levels(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    UNIQUE(level_id, name),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Subjects
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Year-Subject Linking (Which subjects are available for each year)
CREATE TABLE IF NOT EXISTS year_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year_id UUID REFERENCES years(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    UNIQUE(year_id, subject_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Registration Requests (Account Access)
CREATE TABLE IF NOT EXISTS registration_requests (
    id UUID PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    parent_phone TEXT,
    role TEXT CHECK (role IN ('STUDENT', 'TEACHER', 'ADMIN')),
    level_id UUID REFERENCES levels(id),
    year_id UUID REFERENCES years(id),
    subject_name TEXT,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure Correct Columns exist if table was already there
ALTER TABLE registration_requests ADD COLUMN IF NOT EXISTS parent_phone TEXT;
ALTER TABLE registration_requests ADD COLUMN IF NOT EXISTS subject_name TEXT;

-- 6. Enrollment Requests
CREATE TABLE IF NOT EXISTS enrollment_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    year_subject_id UUID REFERENCES year_subjects(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Student Enrollments
CREATE TABLE IF NOT EXISTS student_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    year_subject_id UUID REFERENCES year_subjects(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, year_subject_id)
);

-- 11. Profiles (Centralized user data)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    phone TEXT,
    role TEXT CHECK (role IN ('STUDENT', 'TEACHER', 'ADMIN', 'GUEST')) DEFAULT 'GUEST',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LEGACY/ROLE-SPECIFIC TABLES
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    subject TEXT,
    phone TEXT,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    level_id UUID REFERENCES levels(id),
    year_id UUID REFERENCES years(id),
    phone TEXT,
    parent_phone TEXT,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Enable
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE years ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE registration_requests ENABLE ROW LEVEL SECURITY;

-- DROP AND RECREATE POLICIES (Explicitly)
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Anyone can create a registration request" ON registration_requests;
DROP POLICY IF EXISTS "Admins can view registration requests" ON registration_requests;
DROP POLICY IF EXISTS "Admins can update registration requests" ON registration_requests;
DROP POLICY IF EXISTS "Anyone can select levels" ON levels;
DROP POLICY IF EXISTS "Anyone can select years" ON years;

CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can create a registration request" ON registration_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view registration requests" ON registration_requests FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN'));
CREATE POLICY "Admins can update registration requests" ON registration_requests FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN'));
CREATE POLICY "Anyone can select levels" ON levels FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can select years" ON years FOR SELECT TO public USING (true);

-- SEEDING DATA (Hardcoded UUIDs for stability)
INSERT INTO levels (id, name) VALUES 
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'ابتدائي (Primaire)'),
('b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e', 'متوسط (Moyen)'),
('c3d4e5f6-a7b8-4c7d-0e1f-2a3b4c5d6e7f', 'ثانوي (Secondaire)'),
('d4e5f6a7-b8c9-4d8e-1f2a-3b4c5d6e7f8a', 'تكوين (Formation)')
ON CONFLICT (name) DO NOTHING;

-- Years for Primary
INSERT INTO years (level_id, name) VALUES 
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '1'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '2'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '3'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '4'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '5')
ON CONFLICT DO NOTHING;

-- Years for Moyen
INSERT INTO years (level_id, name) VALUES 
('b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e', '1'),
('b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e', '2'),
('b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e', '3'),
('b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e', '4')
ON CONFLICT DO NOTHING;

-- Years for Secondaire
INSERT INTO years (level_id, name) VALUES 
('c3d4e5f6-a7b8-4c7d-0e1f-2a3b4c5d6e7f', '1'),
('c3d4e5f6-a7b8-4c7d-0e1f-2a3b4c5d6e7f', '2'),
('c3d4e5f6-a7b8-4c7d-0e1f-2a3b4c5d6e7f', '3')
ON CONFLICT DO NOTHING;

-- TRIGGER FOR PROFILES
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'GUEST');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
