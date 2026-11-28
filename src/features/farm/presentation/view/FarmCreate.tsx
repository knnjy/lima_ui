
// import { useState, type ChangeEvent, type FormEvent } from "react";
// import {
//   Box,
//   Card,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   IconButton,
//   Stack,
//   Grid,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// interface FarmCreateData {
//   farm_name: string;
//   province: string;
//   city_municipality: string;
//   address_line: string | null;
//   is_active: boolean;
// }

// interface FarmCreateProps {
//   provinces: string[];
//   citiesByProvince: Record<string, string[]>;
//   onSubmit: (data: FarmCreateData) => void;
//   onClose?: () => void;
// }

// export default function FarmCreate({
//   provinces,
//   citiesByProvince,
//   onSubmit,
//   onClose,
// }: FarmCreateProps) {
//   const [formData, setFormData] = useState<FarmCreateData>({
//     farm_name: "",
//     province: "",
//     city_municipality: "",
//     address_line: "",
//     is_active: true,
//   });

//   const [errors, setErrors] = useState<
//     Partial<Record<keyof FarmCreateData, string>>
//   >({});

//   const handleChange = (
//     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = event.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "province" ? { city_municipality: "" } : {}),
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//       ...(name === "province" ? { city_municipality: "" } : {}),
//     }));
//   };

//   const validateForm = () => {
//     const newErrors: typeof errors = {};

//     if (!formData.farm_name.trim()) {
//       newErrors.farm_name = "Farm name is required";
//     }

//     if (!formData.province) {
//       newErrors.province = "Please select a province";
//     }

//     if (!formData.city_municipality) {
//       newErrors.city_municipality = "Please select a city or municipality";
//     }

//     if (!formData.address_line?.trim()) {
//       newErrors.address_line = "Farm address is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!validateForm()) return;

//     onSubmit({
//       ...formData,
//       farm_name: formData.farm_name.trim(),
//       address_line: formData.address_line?.trim() || null,
//     });
//   };

//   const cities = citiesByProvince[formData.province] ?? [];

//   return (
//     <Card
//       elevation={0}
//       sx={{
//         position: "relative",
//         width: "100%",
//         maxWidth: 608,
//         mx: "auto",
//         p: { xs: 2.5, sm: 4 },
//         border: "1px solid #E2E7DA",
//         borderRadius: "20px",
//         boxShadow: "0 24px 60px rgba(14, 41, 26, 0.15)",
//         boxSizing: "border-box",
//         fontFamily: "Inter, sans-serif",
//       }}
//     >
//       {/* Close button */}
//       <IconButton
//         onClick={onClose}
//         aria-label="Close form"
//         sx={{
//           position: "absolute",
//           top: 12,
//           right: 12,
//           color: "#626F60",
//           borderRadius: "8px",
//         }}
//       >
//         <CloseIcon />
//       </IconButton>

//       {/* Header */}
//       <Stack spacing={1} sx={{ mb: 2.5, pr: 5 }}>
//         <Typography
//           sx={{
//             color: "#5C7A26",
//             fontSize: 11,
//             fontWeight: 600,
//             letterSpacing: "0.88px",
//           }}
//         >
//           FOR FARM OWNERS
//         </Typography>

//         <Typography
//           variant="h5"
//           sx={{
//             color: "#163D29",
//             fontWeight: 700,
//             fontSize: 25,
//           }}
//         >
//           Create your farm
//         </Typography>

//         <Typography
//           sx={{
//             color: "#626F60",
//             fontSize: 14,
//           }}
//         >
//           Set up your farm, then invite your workers to join.
//         </Typography>
//       </Stack>

//       {/* Farm banner */}
//       <Box
//         sx={{
//           height: 112,
//           mb: 2.5,
//           p: 1.5,
//           borderRadius: "12px",
//           background: "linear-gradient(135deg, #B7CC93, #6F9150)",
//           display: "flex",
//           alignItems: "flex-end",
//         }}
//       >
//         <Box
//           sx={{
//             bgcolor: "#FFFFFF",
//             color: "#163D29",
//             px: 1,
//             py: 0.5,
//             borderRadius: "8px",
//             fontSize: 12,
//             fontWeight: 500,
//           }}
//         >
//           FARM PANORAMA
//         </Box>
//       </Box>

//       {/* Form */}
//       <Box component="form" onSubmit={handleSubmit} noValidate>
//         <Stack spacing={2}>
//           {/* Farm name */}
//           <TextField
//             fullWidth
//             label="Farm name *"
//             name="farm_name"
//             placeholder="e.g. San Isidro Family Farm"
//             value={formData.farm_name}
//             onChange={handleChange}
//             error={!!errors.farm_name}
//             helperText={errors.farm_name}
//           />

//           {/* Province and City */}
//           <Grid container spacing={2}>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <TextField
//                 fullWidth
//                 select
//                 label="Province *"
//                 name="province"
//                 value={formData.province}
//                 onChange={handleChange}
//                 error={!!errors.province}
//                 helperText={errors.province}
//               >
//                 <MenuItem value="" disabled>
//                   Select province
//                 </MenuItem>

//                 {provinces.map((province) => (
//                   <MenuItem key={province} value={province}>
//                     {province}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid size={{ xs: 12, sm: 6 }}>
//               <TextField
//                 fullWidth
//                 select
//                 label="City / municipality *"
//                 name="city_municipality"
//                 value={formData.city_municipality}
//                 onChange={handleChange}
//                 disabled={!formData.province}
//                 error={!!errors.city_municipality}
//                 helperText={errors.city_municipality}
//               >
//                 <MenuItem value="" disabled>
//                   Select city
//                 </MenuItem>

//                 {cities.map((city) => (
//                   <MenuItem key={city} value={city}>
//                     {city}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//           </Grid>

//           {/* Address */}
//           <TextField
//             fullWidth
//             label="Barangay / street address *"
//             name="address_line"
//             placeholder="Enter your farm's address"
//             value={formData.address_line ?? ""}
//             onChange={handleChange}
//             error={!!errors.address_line}
//             helperText={errors.address_line}
//           />

//           {/* Submit */}
//           <Stack spacing={1}>
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 height: 52,
//                 borderRadius: "10px",
//                 bgcolor: "#163D29",
//                 color: "#FFFFFF",
//                 fontSize: 15,
//                 fontWeight: 600,
//                 textTransform: "none",
//                 boxShadow: "none",
//                 "&:hover": {
//                   bgcolor: "#24583B",
//                   boxShadow: "none",
//                 },
//               }}
//             >
//               Create farm
//             </Button>

//             <Typography
//               sx={{
//                 color: "#626F60",
//                 fontSize: 12,
//                 textAlign: "center",
//               }}
//             >
//               You’ll be the farm owner. You can invite workers next.
//             </Typography>
//           </Stack>
//         </Stack>
//       </Box>
//     </Card>
//   );
// }
