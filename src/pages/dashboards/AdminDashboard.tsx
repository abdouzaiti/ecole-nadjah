import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Settings as SettingsIcon,
  Video,
  Library,
  Layers,
  ClipboardList
} from 'lucide-react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

// Admin Sub-components
import Overview from './admin/Overview';
import Registrations from './admin/Registrations';
import Students from './admin/Students';
import Teachers from './admin/Teachers';
import Subjects from './admin/Subjects';
import Levels from './admin/Levels';
import LiveMonitor from './admin/LiveMonitor';
import ReplayLibrary from './admin/ReplayLibrary';
import Analytics from './admin/Analytics';
import Settings from './admin/Settings';

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isAr = i18n.language === 'ar';

  const sidebarItems = [
    { name: t('dashboard.admin.sidebar.overview'), icon: LayoutDashboard, path: '/dashboard/admin' },
    { name: t('dashboard.admin.sidebar.registrations'), icon: ClipboardList, path: '/dashboard/admin/registrations' },
    { name: t('auth.roles.student') + 's', icon: GraduationCap, path: '/dashboard/admin/students' },
    { name: t('auth.roles.teacher') + 's', icon: Users, path: '/dashboard/admin/teachers' },
    { name: isAr ? 'المواد' : 'Subjects', icon: BookOpen, path: '/dashboard/admin/subjects' },
    { name: isAr ? 'الأطوار' : 'Levels', icon: Layers, path: '/dashboard/admin/levels' },
    { name: isAr ? 'البث المباشر' : 'Live Monitor', icon: Video, path: '/dashboard/admin/live' },
    { name: isAr ? 'المكتبة' : 'Replay Library', icon: Library, path: '/dashboard/admin/replays' },
    { name: t('dashboard.admin.sidebar.analytics'), icon: TrendingUp, path: '/dashboard/admin/analytics' },
    { name: isAr ? 'الإعدادات' : 'Settings', icon: SettingsIcon, path: '/dashboard/admin/settings' },
  ];

  return (
    <DashboardLayout items={sidebarItems}>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Routes>
              <Route index element={<Overview />} />
              <Route path="registrations" element={<Registrations />} />
              <Route path="students" element={<Students />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="levels" element={<Levels />} />
              <Route path="live" element={<LiveMonitor />} />
              <Route path="replays" element={<ReplayLibrary />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard/admin" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
