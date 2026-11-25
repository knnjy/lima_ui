import {
  AssessmentOutlined,
  AttachMoneyOutlined,
  CampaignOutlined,
  EventNoteOutlined,
  HomeOutlined,
  Inventory2Outlined,
  LocalHospitalOutlined,
  PetsOutlined,
  PsychologyOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import type { ReactElement } from "react";

const iconMap: Record<string, ReactElement> = {
  home: <HomeOutlined fontSize="small" />,
  pets: <PetsOutlined fontSize="small" />,
  health: <LocalHospitalOutlined fontSize="small" />,
  activity: <EventNoteOutlined fontSize="small" />,
  inventory: <Inventory2Outlined fontSize="small" />,
  sales: <AttachMoneyOutlined fontSize="small" />,
  ai: <PsychologyOutlined fontSize="small" />,
  reports: <AssessmentOutlined fontSize="small" />,
  announcements: <CampaignOutlined fontSize="small" />,
  settings: <SettingsOutlined fontSize="small" />,
};

export function NavItemIcon({ icon }: { icon: string }) {
  return iconMap[icon] ?? <HomeOutlined fontSize="small" />;
}
