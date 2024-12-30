import { useState, ReactElement, PropsWithChildren } from 'react';
import { Box, Drawer, Toolbar } from '@mui/material';
import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';
import Footer from './Footer/Footer';

export const drawerOpenWidth = 240;
export const drawerCloseWidth = 110;

const MainLayout = ({ children }: PropsWithChildren): ReactElement => {
  const [open, setOpen] = useState<boolean>(true);
  const handleDrawerToggle = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <Topbar open={open} handleDrawerToggle={handleDrawerToggle} />
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerOpenWidth,
            border: 'none',
            transition: 'width 200ms ease-in-out',
          },
        }}
      >
        <Sidebar open={open} />
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        component="aside"
        open={open}
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: open ? drawerOpenWidth : drawerCloseWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: open ? drawerOpenWidth : drawerCloseWidth,
            border: 'none',
            transition: 'width 200ms ease-in-out',
            overflowX: 'hidden',
          },
        }}
      >
        <Sidebar open={open} />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${open ? drawerOpenWidth : drawerCloseWidth}px)` },
          height: '100vh',
          overflow: 'auto',
          transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1), margin 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          pt: 5,
          pr: { xs: 3, sm: 5.175 },
          pb: 6.25,
          pl: { xs: 3, sm: 5.25 },
        }}
      >
        <Toolbar sx={{ height: 96 }} />
        {children}
        <Footer open={open} />
      </Box>
    </Box>
  );
};

export default MainLayout;
