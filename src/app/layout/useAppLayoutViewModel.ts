import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { NavItemId } from "../../shared/types/navigation";
import { FARM_NAV_ITEMS } from "./navigation/farmNavigation";

export function useAppLayoutViewModel() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNotifications, setHasNotifications] = useState(true);
  const [livestockExpandedOverride, setLivestockExpandedOverride] =
    useState<boolean | null>(null);
  const { farmId } = useParams<"farmId">();
  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = useMemo(
    () => ({
      id: "1",
      firstName: "Emma",
      lastName: "Miller",
      role: "Owner",
      initials: "EM",
    }),
    [],
  );
  const farmProfile = useMemo(
    () => ({ name: "Example Farm", owner: currentUser }),
    [currentUser],
  );

  const activeNavItem =
    FARM_NAV_ITEMS.find((item) => {
      const itemPath = `/farms/${farmId}/${item.path}`;
      return (
        location.pathname === itemPath ||
        location.pathname.startsWith(`${itemPath}/`)
      );
    }) ?? FARM_NAV_ITEMS[0];
  const activeNavChild = activeNavItem.children?.find(
    (child) => location.pathname === `/farms/${farmId}/${child.path}`,
  );
  const livestockExpanded =
    livestockExpandedOverride ?? activeNavItem.id === "livestock";
  const breadcrumb =
    activeNavItem.id === "dashboard"
      ? "Livestock Management / Home"
      : `Livestock Management / ${activeNavItem.label}`;

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((collapsed) => !collapsed);
  }, []);

  const selectNav = useCallback(
    (id: NavItemId) => {
      const item = FARM_NAV_ITEMS.find((navItem) => navItem.id === id);
      if (!item) {
        return;
      }
      if (!farmId) {
        throw new Error("AppLayout requires a farmId route parameter.");
      }
      setLivestockExpandedOverride(null);
      navigate(`/farms/${farmId}/${item.path}`);
    },
    [farmId, navigate],
  );

  const selectNavPath = useCallback(
    (path: string) => {
      if (!farmId) {
        throw new Error("AppLayout requires a farmId route parameter.");
      }
      setLivestockExpandedOverride(path.startsWith("livestock"));
      navigate(`/farms/${farmId}/${path}`);
    },
    [farmId, navigate],
  );

  const toggleNavItem = useCallback(
    (id: NavItemId) => {
      if (id === "livestock") {
        setLivestockExpandedOverride(
          (expanded) => !(expanded ?? activeNavItem.id === "livestock"),
        );
      }
    },
    [activeNavItem.id],
  );

  const onSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const clearNotifications = useCallback(() => {
    setHasNotifications(false);
  }, []);

  const onLogActivity = useCallback(() => {
    console.log("Log Activity clicked");
  }, []);

  const onLogout = useCallback(() => {
    console.log("Logout clicked");
  }, []);

  return {
    sidebarCollapsed,
    activeNavId: activeNavItem.id,
    activeNavChildId: activeNavChild?.id ?? null,
    expandedNavId: livestockExpanded ? "livestock" : null,
    searchQuery,
    hasNotifications,
    currentUser,
    farmProfile,
    navItems: FARM_NAV_ITEMS,
    breadcrumb,
    toggleSidebar,
    selectNav,
    selectNavPath,
    toggleNavItem,
    onSearchChange,
    clearNotifications,
    onLogActivity,
    onLogout,
  };
}

export type AppLayoutViewModel = ReturnType<typeof useAppLayoutViewModel>;
