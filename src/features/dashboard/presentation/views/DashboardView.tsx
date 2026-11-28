import { Stack } from "@mui/material";
import farmImage from "../assets/dashboard_farm_hero.png";
import { EmptyDashboardOverviewState } from "../components/EmptyDashboardOverviewState";
import { FarmOverviewBanner } from "../../../livestockManagement/presentations/components/FarmOverviewBanner";

export function DashboardView() {
  return (
    <Stack spacing={3}>
      <FarmOverviewBanner
        imageSrc={farmImage}
        imageAlt="A tractor working a green field near a barn and hay bales"
        title="Overview"
        description="Daily overview across animals, work, breeding, and income."
      />
      <EmptyDashboardOverviewState />
    </Stack>
  );
}
