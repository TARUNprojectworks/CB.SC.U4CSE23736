/**
 * FilterBar Component
 * 
 * Notification type filter using Material UI Chips.
 * Supports single-select filtering by Event, Result, Placement.
 */

import { Box, Chip, Typography, alpha } from '@mui/material';
import {
  FilterList as FilterIcon,
  Event as EventIcon,
  EmojiEvents as ResultIcon,
  WorkspacePremium as PlacementIcon,
  AllInclusive as AllIcon,
} from '@mui/icons-material';
import { NOTIFICATION_TYPE_LIST, TYPE_COLORS } from '../constants';
import { logInfo } from '../services/logService';

const FILTER_ICONS = {
  Event: EventIcon,
  Result: ResultIcon,
  Placement: PlacementIcon,
};

export default function FilterBar({ activeFilter, onFilterChange }) {
  const handleFilterClick = (type) => {
    const newFilter = activeFilter === type ? '' : type;
    logInfo('component', `Filter changed: ${newFilter || 'all'}`);
    onFilterChange(newFilter);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        flexWrap: 'wrap',
        py: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1 }}>
        <FilterIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          Filter:
        </Typography>
      </Box>

      {/* All filter */}
      <Chip
        icon={<AllIcon sx={{ fontSize: 16 }} />}
        label="All"
        onClick={() => onFilterChange('')}
        variant={!activeFilter ? 'filled' : 'outlined'}
        sx={{
          fontWeight: 600,
          backgroundColor: !activeFilter
            ? alpha('#6366f1', 0.2)
            : 'transparent',
          color: !activeFilter ? '#818cf8' : 'text.secondary',
          borderColor: !activeFilter ? '#6366f1' : alpha('#94a3b8', 0.2),
          '&:hover': {
            backgroundColor: alpha('#6366f1', 0.15),
          },
        }}
      />

      {/* Type filters */}
      {NOTIFICATION_TYPE_LIST.map((type) => {
        const isActive = activeFilter === type;
        const colors = TYPE_COLORS[type];
        const IconComp = FILTER_ICONS[type];

        return (
          <Chip
            key={type}
            icon={<IconComp sx={{ fontSize: 16 }} />}
            label={type}
            onClick={() => handleFilterClick(type)}
            variant={isActive ? 'filled' : 'outlined'}
            sx={{
              fontWeight: 600,
              backgroundColor: isActive
                ? alpha(colors.text, 0.2)
                : 'transparent',
              color: isActive ? colors.text : 'text.secondary',
              borderColor: isActive ? colors.text : alpha('#94a3b8', 0.2),
              '& .MuiChip-icon': {
                color: isActive ? colors.text : 'text.secondary',
              },
              '&:hover': {
                backgroundColor: alpha(colors.text, 0.12),
              },
            }}
          />
        );
      })}
    </Box>
  );
}
