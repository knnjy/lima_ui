import { useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import headerImg from '../../../../assets/animals-header.jpg';
import { tokens } from '../../../../theme/tokens';
import { pigs, speciesRegister } from './mockAnimals';
// Colors from Figma. Swap for `tokens` wherever one matches.
const c = {
  dark: tokens.colors.primary.main,   // was '#163D29'
  muted: tokens.colors.text.secondary, // was '#626F60'
  border: '#E2E7DA',
  headBg: '#ECF2E4',
  page: '#F7F8F2',
};
const PAGE_SIZE = 6;

const cardSx = {
  bgcolor: '#fff',
  border: `1px solid ${c.border}`,
  borderRadius: '16px',
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};
const headRowSx = {
  display: 'flex',
  gap: '12px',
  p: '12px',
  bgcolor: c.headBg,
  border: `1px solid ${c.border}`,
  borderRadius: '4px',
};
const headCellSx = { fontSize: 14, fontWeight: 600, color: c.muted, textTransform: 'uppercase' };
const rowSx = { display: 'flex', gap: '12px', p: '12px' };
const cellSx = { fontSize: 14, color: c.dark };
const filterSx = {
  bgcolor: '#fff',
  '& .MuiOutlinedInput-root': { height: 46, borderRadius: '8px', fontSize: 14 },
  '& fieldset': { borderColor: c.border },
};

// column widths from Figma, used as flex ratios so the table stays responsive
const pigCols = [240, 190, 100, 250, 176];
const speciesCols = [220, 170, 130, 448];

function TableRow({ cols, cells, head = false }: { cols: number[]; cells: (string | number)[]; head?: boolean }) {
  return (
    <Box sx={head ? headRowSx : rowSx}>
      {cells.map((cell, i) => (
        <Typography key={i} sx={{ ...(head ? headCellSx : cellSx), flex: `${cols[i]} 1 0`, minWidth: 0 }}>
          {cell}
        </Typography>
      ))}
    </Box>
  );
}

export default function AnimalRegistryPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Active');
  const [page, setPage] = useState(0);

  const filtered = pigs.filter(
    (p) =>
      (status === 'All' || p.status === status) &&
      `${p.name} ${p.id}`.toLowerCase().includes(search.toLowerCase())
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const start = filtered.length === 0 ? 0 : page * PAGE_SIZE + 1;
  const end = Math.min((page + 1) * PAGE_SIZE, filtered.length);

  return (
    <Box sx={{ bgcolor: c.page, minHeight: '100%' }}>
      {/* Banner */}
      <Box
        sx={{
          minHeight: 260,
          p: '28px 32px',
          display: 'flex',
          alignItems: 'flex-end',
          backgroundImage: `linear-gradient(90deg, rgba(14,41,26,0.91) 0%, rgba(14,41,26,0.66) 50%, rgba(14,41,26,0.13) 100%), url(${headerImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: 3, width: '100%', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 32, fontWeight: 700, color: '#fff', lineHeight: 1.45 }}>
              Animal registry
            </Typography>
            <Typography sx={{ fontSize: 14, color: '#fff', mt: 1.5 }}>
              One place for livestock identity, group membership, and lifecycle history.
            </Typography>
          </Box>
          <Button
            sx={{
              height: 46,
              px: 1.5,
              bgcolor: c.dark,
              color: '#fff',
              border: '1px solid #E2E7DA',
              borderRadius: '8px',
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'none',
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: c.dark },
            }}
          >
            + Register livestock
          </Button>
        </Box>
      </Box>

      {/* Workspace */}
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Tab */}
        <Box>
          <Button
            sx={{
              height: 46,
              px: 1.5,
              bgcolor: c.dark,
              color: '#fff',
              border: '1px solid #E2E7DA',
              borderRadius: '8px',
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { bgcolor: c.dark },
            }}
          >
            Individual animals
          </Button>
        </Box>

        {/* Metrics */}
        <Box sx={{ ...cardSx, p: '16px 24px', gap: '6px' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: c.dark, lineHeight: '28px' }}>
            150 animals on the farm
          </Typography>
          <Typography sx={{ fontSize: 14, color: c.muted }}>20 pigs · 50 cattle · 80 chickens</Typography>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <TextField
            placeholder="Search name or identifier number"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            sx={{ ...filterSx, flex: 1 }}
          />
          <TextField select value="Pigs" sx={{ ...filterSx, minWidth: 130 }}>
            <MenuItem value="Pigs">Species: Pigs</MenuItem>
          </TextField>
          <TextField
            select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(0); }}
            sx={{ ...filterSx, minWidth: 150 }}
          >
            <MenuItem value="Active">Status: Active</MenuItem>
            <MenuItem value="Inactive">Status: Inactive</MenuItem>
            <MenuItem value="All">Status: All</MenuItem>
          </TextField>
        </Box>

        {/* Individual pigs */}
        <Box sx={cardSx}>
          <Typography sx={{ fontSize: 20, fontWeight: 600, color: c.dark }}>Individual pigs</Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <Box sx={{ minWidth: 760, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <TableRow head cols={pigCols} cells={['Animal / Identifier', 'Breed', 'Sex', 'Group', 'Registry status']} />
              {visible.map((p) => (
                <TableRow
                  key={p.id}
                  cols={pigCols}
                  cells={[`${p.name} · #${p.id}`, p.breed, p.sex, p.group, p.status]}
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 14, color: c.muted }}>
              Showing {start}–{end} of {filtered.length} individual pig records · Page {page + 1} of {pageCount}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" disabled={page === 0} onClick={() => setPage(page - 1)} sx={{ color: c.dark, textTransform: 'none' }}>
                Previous
              </Button>
              <Button size="small" disabled={page >= pageCount - 1} onClick={() => setPage(page + 1)} sx={{ color: c.dark, textTransform: 'none' }}>
                Next
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Species register */}
        <Box sx={cardSx}>
          <Typography sx={{ fontSize: 20, fontWeight: 600, color: c.dark }}>Species register</Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <Box sx={{ minWidth: 640, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <TableRow head cols={speciesCols} cells={['Species', 'Current head', 'Groups', 'Recording method']} />
              {speciesRegister.map((s) => (
                <TableRow key={s.species} cols={speciesCols} cells={[s.species, s.head, s.groups, s.method]} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}