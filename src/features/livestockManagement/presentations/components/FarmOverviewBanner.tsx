import { Box, Typography } from "@mui/material";
import farmImage from "../../../../shared/assets/animal_farm_hero.png";

interface Props {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
}

export function FarmOverviewBanner({
  imageSrc = farmImage,
  imageAlt = "Cattle, sheep and chickens grazing in a pasture beside a red barn",
  title = "Welcome to your farm",
  description = "Your livestock and their records, all in one place.",
}: Props) {
  return (
    <Box
      component="section"
      aria-label="Farm overview"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        minHeight: { xs: 180, sm: 220, md: 250 },
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        color: "common.white",
        bgcolor: "primary.dark",
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={imageAlt}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 55%",
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(15, 42, 28, 0.78), rgba(15, 42, 28, 0.08))",
        }}
      />
      <Box sx={{ position: "relative" }}>
        <Typography
          variant="h4"
          component="p"
          fontWeight={700}
          sx={{ fontSize: { xs: "1.65rem", sm: "2.125rem" } }}
        >
          {title}
        </Typography>
        <Typography sx={{ mt: 0.5, color: "rgba(255,255,255,0.9)" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
