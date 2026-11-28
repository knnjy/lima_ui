
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import type { FormEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import type { FarmItem } from "../../model/entities/FarmItem";
import type { FarmCreate } from "../../model/entities/FarmCreate";
import type { FarmFormDeps } from "../viewmodel/FarmFormViewModel";
import { useFarmFormViewModel } from "../viewmodel/FarmFormViewModel";

interface FarmCreateViewProps {
  open: boolean;
  onClose: () => void;
  deps: FarmFormDeps;
  farmId?: string;
  initialFarm?: FarmItem | FarmCreate;
}

export default function FarmCreateView({
  open,
  onClose,
  deps,
  farmId,
  initialFarm,
}: FarmCreateViewProps) {
  const vm = useFarmFormViewModel({ ...deps, farmId, initialFarm });

  const closeForm = () => {
    if (!vm.isSubmitting) {
      vm.reset();
      onClose();
    }
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void vm.submit();
  };

  return (
    <Dialog
      open={open}
      onClose={closeForm}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: { xs: 1, sm: 2 },
          maxWidth: 608,
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={3}>
          {/* Header */}
          <Box position="relative">
            <IconButton
              onClick={closeForm}
              disabled={vm.isSubmitting}
              sx={{
                position: "absolute",
                right: -8,
                top: -8,
                color: "#64756a",
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography
              sx={{
                color: "#38834e",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.5,
                mb: 1,
              }}
            >
              FOR FARM OWNERS
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: 25, sm: 30 },
                fontWeight: 700,
                color: "#183c27",
                mb: 1,
              }}
            >
              {vm.isCreateMode ? "Create your farm" : "Update your farm"}
            </Typography>

            <Typography sx={{ color: "#718078", fontSize: 14 }}>
              Set up your farm, then invite your workers to join.
            </Typography>
          </Box>

          {/* Farm Banner */}
          <Box
            sx={{
              minHeight: 125,
              borderRadius: 3,
              background:
                "linear-gradient(120deg, #174d2d 0%, #39834d 55%, #8dbb72 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 2,
              }}
            >
              FARM PANORAMA
            </Typography>
          </Box>

          {/* Form Fields */}
          <Box component="form" onSubmit={submitForm} noValidate>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Farm name"
                placeholder="Enter your farm name"
                required
                value={vm.values.farm_name}
                onChange={(event) => vm.setField("farm_name", event.target.value)}
                error={Boolean(vm.fieldErrors.farm_name)}
                helperText={vm.fieldErrors.farm_name}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Province"
                    required
                    value={vm.values.province}
                    onChange={(event) => vm.setField("province", event.target.value)}
                    error={Boolean(vm.fieldErrors.province)}
                    helperText={vm.fieldErrors.province}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City / municipality"
                    required
                    value={vm.values.city_municipality}
                    onChange={(event) =>
                      vm.setField("city_municipality", event.target.value)
                    }
                    error={Boolean(vm.fieldErrors.city_municipality)}
                    helperText={vm.fieldErrors.city_municipality}
                  />
                </Grid>
              </Grid>

                <TextField
                  fullWidth
                  label="Barangay / street address"
                  placeholder="Enter your barangay or street address"
                  value={vm.values.address_line}
                  onChange={(event) => vm.setField("address_line", event.target.value)}
                />
              {vm.error && <Alert severity="error">{vm.error}</Alert>}
              {vm.isLoading && <CircularProgress size={24} />}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={vm.isLoading || vm.isSubmitting}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: 15,
                  fontWeight: 700,
                  bgcolor: "#287943",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#1f6335",
                    boxShadow: "none",
                  },
                }}
              >
                {vm.isSubmitting
                  ? "Saving…"
                  : vm.isCreateMode
                    ? "Create farm"
                    : "Save changes"}
              </Button>
            </Stack>
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              color: "#7b8980",
              fontSize: 12,
            }}
          >
            You’ll be the farm owner. You can invite workers next.
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
