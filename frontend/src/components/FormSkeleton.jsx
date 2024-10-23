import { Skeleton } from "@mui/material";
function FormSkeleton() {
  return (
    <>
      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
    </>
  );
}

export default FormSkeleton;
