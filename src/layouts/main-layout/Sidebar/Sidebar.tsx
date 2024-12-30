import { ReactElement } from 'react';
import { Link, List, Toolbar, Box } from '@mui/material';
import { useNavItems } from 'data/nav-items';
import SimpleBar from 'simplebar-react';
import NavItem from './NavItem';
import { drawerCloseWidth, drawerOpenWidth } from '..';
import Image from 'components/base/Image';
import logoWithText from '/loogoo.png';
import logo from '/loogoo.png';
import { RootPaths } from 'routes/paths';
import 'simplebar-react/dist/simplebar.min.css';

const Sidebar = ({ open }: { open: boolean }): ReactElement => {
  const navItems = useNavItems();
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      transition: 'width 200ms ease-in-out',
    }}>
      <Toolbar
        sx={{
          height: 80,
          p: 0,
          justifyContent: 'center',
          flexShrink: 0,
          width: open ? drawerOpenWidth - 1 : drawerCloseWidth - 1,
          transition: 'width 200ms ease-in-out',
        }}
      >
        <Link
          href={RootPaths.adminRoot}
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'width 200ms ease-in-out',
          }}
        >
          <Image
            src={open ? logoWithText : logo}
            alt={open ? 'logo with text' : 'logo'}
            height={65}
            style={{
              transition: 'width 200ms ease-in-out',
            }}
          />
        </Link>
      </Toolbar>
      <Box sx={{ 
        flexGrow: 1,
        minHeight: 0,
        transition: 'width 200ms ease-in-out',
      }}>
        <SimpleBar 
          style={{ 
            height: '100%',
            padding: '0 8px',
          }}
        >
          <List
            component="nav"
            sx={{
              mt: 5,
              py: 1,
              justifyContent: 'space-between',
              transition: 'width 200ms ease-in-out',
            }}
          >
            {navItems.map((navItem) => (
              <NavItem key={navItem.id} navItem={navItem} open={open} />
            ))}
          </List>
        </SimpleBar>
      </Box>
    </Box>
  );
};

export default Sidebar;
