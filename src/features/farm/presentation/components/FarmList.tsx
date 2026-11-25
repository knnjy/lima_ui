
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

import { tokens } from "../../../../shared/theme/tokens";
import type { FarmItem } from "../../model/entities/FarmItem";
import { formatRole } from "../../model/yourFarms.format";

interface Props {
  farms: FarmItem[];
  onOpen: (farmId: string) => void;
}

export function FarmList({ farms, onOpen }: Props) {
  return (
    <Box
      component="ul"
      sx={{
        m: 0,
        p: 0,
        listStyle: "none",
        display: "grid",
        gap: `${tokens.spacing.md}px`,
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(3, minmax(0, 1fr))",
        },
      }}
    >
      {farms.map((farm) => (
        <Box component="li" key={farm.id} sx={{ minWidth: 0 }}>
          <Card
            variant="outlined"
            sx={{
              minHeight: `${tokens.sizes.farmCardMinHeight}px`,
              borderRadius: `${tokens.radius.lg}px`,
              display: "flex",
            }}
          >
            <CardActionArea
              onClick={() => onOpen(farm.id)}
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ width: "100%" }}>
                <Typography
                  variant="h6"
                  component="span"
                  fontWeight={tokens.fontWeight.semibold}
                  display="block"
                  noWrap
                >
                  {farm.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ overflowWrap: "anywhere" }}
                >
                  {farm.location}
                </Typography>

                <Chip
                  label={formatRole(farm.role)}
                  size="small"
                  color="success"
                  sx={{
                    mt: `${tokens.spacing.sm}px`,
                    fontWeight: tokens.fontWeight.semibold,
                    borderRadius: `${tokens.radius.md}px`,
                  }}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </Box>
  );
}
