import { useState } from 'react';
import { Link, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { NavItem as NavItemProps } from 'data/nav-items';
import { useLocation } from 'react-router-dom';
import ExpandMore from '@mui/icons-material/ExpandMore';

const NavItem = ({ navItem, open }: { navItem: NavItemProps; open: boolean }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleClick = () => {
    if (navItem.subMenu) {
      setSubMenuOpen(!subMenuOpen);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <ListItem
        disablePadding
        sx={(theme) => ({
          display: 'block',
          px: 5,
          py: 1,
          borderRight: !open
            ? navItem.active
              ? `3px solid ${theme.palette.primary.main}`
              : `3px solid transparent`
            : '',
        })}
      >
        <ListItemButton
          onClick={handleClick}
          component={navItem.subMenu ? 'div' : Link}
          href={navItem.subMenu ? undefined : navItem.path}
          sx={{
            minHeight: 48,
            opacity: navItem.active ? 1 : 0.5,
            bgcolor: navItem.active ? (open ? 'primary.main' : '') : 'background.default',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              bgcolor:
                navItem.active
                  ? open
                    ? 'primary.dark'
                    : 'background.paper'
                  : 'background.paper',
            },
            '& .MuiTouchRipple-root': {
              color: navItem.active ? 'primary.main' : 'text.disabled',
            },
          }}
        >
          <ListItemIcon
            sx={{
              width: 20,
              height: 20,
              mr: open ? 'auto' : 0,
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              color:
                navItem.active
                  ? open
                    ? 'background.default'
                    : 'primary.main'
                  : 'text.primary',
            }}
          >
            <IconifyIcon icon={navItem.icon} />
          </ListItemIcon>
          {open && (
            <>
              <ListItemText 
                primary={navItem.title}
                sx={{ 
                  opacity: open ? 1 : 0,
                  color: navItem.active ? 'background.default' : '',
                  transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                }} 
              />
              {navItem.subMenu && (
                <ExpandMore
                  sx={{
                    transform: subMenuOpen ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              )}
            </>
          )}
        </ListItemButton>
      </ListItem>
      {navItem.subMenu && open && (
        <Collapse 
          in={subMenuOpen} 
          timeout={200}
          sx={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          <List 
            component="div" 
            disablePadding
            sx={{
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                left: '46px',
                top: 0,
                bottom: 0,
                width: '2px',
                bgcolor: 'divider',
              }
            }}
          >
            {navItem.subMenu.map((subItem) => (
              <ListItem
                key={subItem.id}
                disablePadding
                sx={{
                  display: 'block',
                  pl: 7,
                  py: 0.5,
                }}
              >
                <ListItemButton
                  component={Link}
                  href={subItem.path}
                  sx={{
                    minHeight: 40,
                    opacity: subItem.active ? 1 : 0.5,
                    bgcolor: pathname === subItem.path ? 'primary.main' : 'background.default',
                    borderRadius: '8px',
                    '&:hover': {
                      bgcolor: pathname === subItem.path ? 'primary.dark' : 'background.paper',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      width: 20,
                      height: 20,
                      mr: 2,
                      color: pathname === subItem.path ? 'background.default' : 'text.primary',
                    }}
                  >
                    <IconifyIcon icon={subItem.icon} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={subItem.title}
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '0.875rem',
                        color: pathname === subItem.path ? 'background.default' : 'text.primary',
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
};

export default NavItem;
