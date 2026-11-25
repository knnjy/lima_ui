// Shown when the user already has farms. The design for this state
// isn't made yet, so this is a simple placeholder list.
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
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
        gap: 2,
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      }}
    >
      {farms.map((farm) => (
        <li key={farm.id}>
          <Card variant="outlined" sx={{ borderRadius: 4 }}>
            <CardActionArea onClick={() => onOpen(farm.id)}>
              <CardContent>
                <Typography variant="h6" component="span" fontWeight={600} display="block">
                  {farm.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {farm.location}  ·  {formatRole(farm.role)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </li>
      ))}
    </Box>
  );
}
