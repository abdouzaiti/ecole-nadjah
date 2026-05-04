import { Course, LiveSession, RegistrationRequest, User } from './types';

export const MOCK_TEACHERS: User[] = [
  { id: 't1', name: 'Dr. Sarah Amine', email: 'sarah.a@nadjah.edu', role: 'TEACHER', subject: 'Mathématiques', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { id: 't2', name: 'Prof. Yacine Ben', email: 'yacine.b@nadjah.edu', role: 'TEACHER', subject: 'Physique', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Introduction à la Mécanique Quantique',
    teacherId: 't2',
    teacherName: 'Prof. Yacine Ben',
    level: 'Secondaire',
    subject: 'Physique',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=450&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    description: 'Découvrez les bases fondamentales de la mécanique quantique à travers ce cours introductif.',
    duration: '1h 20m',
    date: '2024-05-01'
  },
  {
    id: 'c2',
    title: 'Analyse et Fonctions Complexes',
    teacherId: 't1',
    teacherName: 'Dr. Sarah Amine',
    level: 'Secondaire',
    subject: 'Mathématiques',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    description: 'Une étude approfondie des fonctions complexes et de leurs applications.',
    duration: '55m',
    date: '2024-05-03'
  },
  {
    id: 'c3',
    title: 'La Révolution Industrielle',
    teacherId: 't3',
    teacherName: 'Mme. Nadia F.',
    level: 'Moyen',
    subject: 'Histoire',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=450&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    description: 'Comprendre les changements majeurs du 19ème siècle.',
    duration: '45m',
    date: '2024-05-02'
  }
];

export const MOCK_LIVES: LiveSession[] = [
  {
    id: 'l1',
    title: 'Révisions Bac: Algèbre Linéaire',
    teacherId: 't1',
    teacherName: 'Dr. Sarah Amine',
    level: 'Secondaire',
    subject: 'Mathématiques',
    startTime: '2026-05-04T10:00:00Z',
    status: 'LIVE'
  },
  {
    id: 'l2',
    title: 'Thermodynamique Chapitre 3',
    teacherId: 't2',
    teacherName: 'Prof. Yacine Ben',
    level: 'Secondaire',
    subject: 'Physique',
    startTime: '2026-05-04T14:30:00Z',
    status: 'UPCOMING'
  }
];

export const MOCK_REGISTRATIONS: RegistrationRequest[] = [
  { id: 'r1', studentName: 'Sofiane Meloussi', parentName: 'Ahmed Meloussi', level: 'Secondaire', contact: '0555 12 34 56', date: '2024-05-02', status: 'PENDING' },
  { id: 'r2', studentName: 'Amira Kaci', parentName: 'Lyna Kaci', level: 'Moyen', contact: '0661 98 76 54', date: '2024-05-03', status: 'PENDING' },
  { id: 'r3', studentName: 'Imane B.', parentName: 'Karim B.', level: 'Primaire', contact: '0770 12 88 99', date: '2024-05-01', status: 'APPROVED' },
];
