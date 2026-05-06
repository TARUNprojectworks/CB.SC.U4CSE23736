import { Box, Pagination, PaginationItem } from '@mui/material';
import { logInfo } from '../services/logService';

export default function PaginationComponent({
  page = 1,
  total = 0,
  limit = 8,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleChange = (_event, newPage) => {
    logInfo('component', `Pagination: page ${newPage}`);
    onPageChange(newPage);
  };

  if (totalPages <= 1) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        width: '100%',
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            components={{
              previous: () => <span style={{ fontWeight: 600 }}>&lt; Previous</span>,
              next: () => <span style={{ fontWeight: 600 }}>Next &gt;</span>,
            }}
          />
        )}
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#f8fafc',
            fontWeight: 700,
            fontSize: '0.875rem',
            backgroundColor: 'transparent',
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              color: '#fbb724', // golden yellow for active page in the screenshot? Wait, the active page is yellow in the screenshot!
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          },
          '& .MuiPaginationItem-previousNext': {
            fontWeight: 600,
          }
        }}
      />
    </Box>
  );
}
