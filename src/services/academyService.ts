import { supabase } from '../lib/supabase';

export interface YearSubject {
  id: string;
  year_id: string;
  subject_id: string;
  subjects?: {
    name: string;
  };
  years?: {
    name: string;
  };
}

export const academyService = {
  // --- Student Dashboard Functions ---
  
  /**
   * Fetches only the subjects from student_enrollments where status = 'ACTIVE'
   */
  async fetchStudentSubjects(studentId: string) {
    const { data, error } = await supabase
      .from('student_enrollments')
      .select(`
        id,
        status,
        year_subjects (
          id,
          subjects (name),
          years (name)
        )
      `)
      .eq('student_id', studentId)
      .eq('status', 'ACTIVE');

    if (error) throw error;
    return data;
  },

  /**
   * Request enrollment for a new subject
   */
  async requestEnrollment(studentId: string, yearSubjectId: string) {
    const { data, error } = await supabase
      .from('enrollment_requests')
      .insert([
        { student_id: studentId, year_subject_id: yearSubjectId, status: 'PENDING' }
      ]);

    if (error) throw error;
    return data;
  },

  // --- Teacher Dashboard Functions ---
  
  /**
   * Fetches only the specific Year/Subject combinations assigned to the teacher
   */
  async fetchTeacherClasses(teacherId: string) {
    const { data, error } = await supabase
      .from('teacher_assignments')
      .select(`
        id,
        year_subjects (
          id,
          subjects (name),
          years (name)
        )
      `)
      .eq('teacher_id', teacherId);

    if (error) throw error;
    return data;
  },

  // --- Admin Dashboard Functions ---
  
  /**
   * Fetch pending account registration requests
   */
  async fetchAccountRequests() {
    const { data, error } = await supabase
      .from('registration_requests')
      .select(`
        *,
        years (name)
      `)
      .eq('status', 'PENDING');

    if (error) throw error;
    return data;
  },

  /**
   * Fetch pending subject enrollment requests
   */
  async fetchEnrollmentRequests() {
    const { data, error } = await supabase
      .from('enrollment_requests')
      .select(`
        *,
        year_subjects (
          subjects (name),
          years (name)
        )
      `)
      .eq('status', 'PENDING');

    if (error) throw error;
    return data;
  },

  /**
   * Approve a request (account or enrollment)
   * Selections can contain specific subjects/years if needed
   */
  async approveRequest(requestId: string, type: 'ACCOUNT' | 'ENROLLMENT', selections?: any) {
    if (type === 'ACCOUNT') {
      // 1. Update request status
      const { data: request, error: updateError } = await supabase
        .from('registration_requests')
        .update({ status: 'APPROVED' })
        .eq('id', requestId)
        .select()
        .single();
      
      if (updateError) throw updateError;

      // 2. Move to target table (Teachers, Students, or Admins)
      const tableName = request.role === 'TEACHER' ? 'teachers' : 
                        request.role === 'ADMIN' ? 'admins' : 'students';
      
      const profileData: any = {
        id: requestId, // Uses the same UUID from Auth
        name: request.full_name,
        email: request.email,
        phone: request.phone,
      };

      if (request.role === 'STUDENT') {
        profileData.year_id = request.year_id || null;
      }
      
      const { error: profileError } = await supabase
        .from(tableName)
        .insert([profileData]);

      if (profileError) {
         console.error(`Error creating ${tableName} profile:`, profileError);
         // Profile might already exist, which is fine
      }
      
      // 3. For students, handle bulk enrollment if selections provided
      if (selections?.yearSubjectIds && request.role === 'STUDENT') {
        const enrollments = selections.yearSubjectIds.map((id: string) => ({
          student_id: requestId,
          year_subject_id: id,
          status: 'ACTIVE'
        }));
        await supabase.from('student_enrollments').insert(enrollments);
      }
      
      return request;
    } else {
      // Approve enrollment request
      const { data: enrollmentReq, error: fetchError } = await supabase
        .from('enrollment_requests')
        .update({ status: 'APPROVED' })
        .eq('id', requestId)
        .select()
        .single();

      if (fetchError) throw fetchError;

      // Add to final enrollment table
      const { error: insertError } = await supabase
        .from('student_enrollments')
        .insert([{
          student_id: enrollmentReq.student_id,
          year_subject_id: enrollmentReq.year_subject_id,
          status: 'ACTIVE'
        }]);

      if (insertError) throw insertError;
      return enrollmentReq;
    }
  },

  // --- Lookup Functions ---
  
  async getLevels() {
    const { data, error } = await supabase.from('levels').select('*, years(*)');
    if (error) throw error;
    return data;
  },

  async getYearSubjects(yearId: string) {
    const { data, error } = await supabase
      .from('year_subjects')
      .select('*, subjects(name)')
      .eq('year_id', yearId);
    if (error) throw error;
    return data;
  },

  // --- Courses & Lives ---
  
  async fetchCourses(yearSubjectIds?: string[]) {
    let query = supabase
      .from('courses')
      .select(`
        *,
        teacher:teacher_id (name, avatar),
        year_subject:year_subject_id (
          subjects (name),
          years (name)
        )
      `)
      .order('created_at', { ascending: false });

    if (yearSubjectIds && yearSubjectIds.length > 0) {
      query = query.in('year_subject_id', yearSubjectIds);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async fetchLives(yearSubjectIds?: string[]) {
    let query = supabase
      .from('lives')
      .select(`
        *,
        teacher:teacher_id (name, avatar),
        year_subject:year_subject_id (
          subjects (name),
          years (name)
        )
      `)
      .order('start_time', { ascending: true });

    if (yearSubjectIds && yearSubjectIds.length > 0) {
      query = query.in('year_subject_id', yearSubjectIds);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};
