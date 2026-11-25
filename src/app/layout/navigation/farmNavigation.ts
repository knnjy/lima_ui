import type { NavItem } from "../../../shared/types/navigation";

export const FARM_NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard (Home)", path: "dashboard", icon: "home" },
  {
    id: "livestock",
    label: "Livestock Management",
    path: "livestock",
    icon: "pets",
    children: [
      { id: "animal", label: "Animal", path: "livestock" },
      { id: "animal-group", label: "Animal Group", path: "livestock/animal-groups" },
    ],
  },
  { id: "health", label: "Health Records", path: "health-records", icon: "health" },
  { id: "activities", label: "Daily Activities", path: "daily-activities", icon: "activity" },
  { id: "feed", label: "Feed & Inventory", path: "feed-inventory", icon: "inventory" },
  { id: "sales", label: "Sales & Expenses", path: "sales-expenses", icon: "sales" },
  { id: "ai", label: "AI Insights & Weather", path: "ai-insights", icon: "ai" },
  { id: "reports", label: "Reports", path: "reports", icon: "reports" },
  { id: "announcements", label: "Announcements & Notice Board", path: "announcements", icon: "announcements" },
  { id: "settings", label: "Settings / Profile", path: "settings", icon: "settings" },
];
