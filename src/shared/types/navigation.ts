export type NavItemId =
  | 'dashboard'
  | 'livestock'
  | 'health'
  | 'activities'
  | 'feed'
  | 'sales'
  | 'ai'
  | 'reports'
  | 'announcements'
  | 'settings';

export interface NavItem {
  id: NavItemId;
  label: string;
  path: string;
  icon: string; // lucide-style name or mui icon key
  children?: NavSubItem[];
}

export interface NavSubItem {
  id: string;
  label: string;
  path: string;
}
