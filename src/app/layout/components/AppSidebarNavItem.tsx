import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import type { NavItem, NavItemId } from "../../../shared/types/navigation";
import { NavItemIcon } from "./NavItemIcon";

interface AppSidebarNavItemProps {
  item: NavItem;
  active: boolean;
  activeChildId: string | null;
  expanded: boolean;
  collapsed: boolean;
  onSelect: (id: NavItemId) => void;
  onSelectPath: (path: string) => void;
  onToggle: (id: NavItemId) => void;
}

// Renders one sidebar entry and any nested links configured for it.
export function AppSidebarNavItem({
  item,
  active,
  activeChildId,
  expanded,
  collapsed,
  onSelect,
  onSelectPath,
  onToggle,
}: AppSidebarNavItemProps) {
  const hasChildren = Boolean(item.children?.length);

  return (
    <>
      <ListItemButton
        selected={active}
        // Expand parent entries in the full sidebar; use the parent route when collapsed.
        onClick={() =>
          hasChildren && !collapsed ? onToggle(item.id) : onSelect(item.id)
        }
        aria-expanded={hasChildren && !collapsed ? expanded : undefined}
        sx={{
          borderRadius: 1.5,
          mb: 0.5,
          px: collapsed ? 1.5 : 1.25,
          py: 1,
          minHeight: 40,
          justifyContent: collapsed ? "center" : "flex-start",
          "&.Mui-selected": {
            backgroundColor: "#EDF2E6",
            color: "primary.main",
            "&:hover": { backgroundColor: "#E2EAD9" },
            "& .MuiListItemIcon-root": { color: "primary.main" },
          },
          "&:hover": {
            backgroundColor: active ? "#E2EAD9" : "rgba(25, 63, 45, 0.04)",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: collapsed ? 0 : 36,
            color: active ? "primary.main" : "secondary.main",
            justifyContent: "center",
          }}
        >
          <NavItemIcon icon={item.icon} />
        </ListItemIcon>
        {!collapsed && (
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: 13,
              fontWeight: active ? 600 : 500,
              noWrap: true,
            }}
          />
        )}
        {hasChildren && !collapsed && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={expanded && !collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children?.map((child) => {
              const childActive = child.id === activeChildId;
              return (
                <ListItemButton
                  key={child.id}
                  selected={childActive}
                  // Child links navigate to their configured route path.
                  onClick={() => onSelectPath(child.path)}
                  aria-current={childActive ? "page" : undefined}
                  sx={{
                    pl: 6,
                    py: 0.75,
                    minHeight: 36,
                    borderRadius: 1.5,
                    mb: 0.5,
                    "&.Mui-selected": {
                      backgroundColor: "#EDF2E6",
                      color: "primary.main",
                      "&:hover": { backgroundColor: "#E2EAD9" },
                    },
                  }}
                >
                  <ListItemText
                    primary={child.label}
                    primaryTypographyProps={{
                      fontSize: 12,
                      fontWeight: childActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}
