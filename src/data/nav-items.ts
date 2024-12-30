import { useLocation } from 'react-router-dom';

export interface NavItem {
  id: number;
  path: string;
  title: string;
  icon: string;
  active: boolean;
  subMenu?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  {
    id: 1,
    path: '/admin',
    title: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    active: false,
  },
  {
    id: 2,
    path: 'gallery/list',
    title: 'Portfolio',
    icon: 'lucide:briefcase',
    active: false,
  },
  {
    id: 3,
    path: 'services/products',
    title: 'Services',
    icon: 'lucide:wrench',
    active: false,
  },
  {
    id: 4,
    path: 'about',
    title: 'A Propos',
    icon: 'lucide:info',
    active: false,
    subMenu: [
      {
        id: 41,
        path: 'about/testimonials',
        title: 'Testimonials',
        icon: 'lucide:quote',
        active: false,
      },
      {
        id: 42,
        path: 'about/partners',
        title: 'Partners',
        icon: 'lucide:users',
        active: false,
      }
    ]
  },
  {
    id: 5,
    path: 'slider',
    title: 'Slider',
    icon: 'lucide:image',
    active: false,
  },
  {
    id: 6,
    path: 'devis',
    title: 'Devis',
    icon: 'lucide:file-text',
    active: false,
  },
  {
    id: 7,
    path: 'messages',
    title: 'Contactez Nous',
    icon: 'lucide:mail',
    active: false,
  },
  {
    id: 8,
    path: 'blogs',
    title: 'Blog',
    icon: 'lucide:pencil',
    active: false,
  },
  {
    id: 9,
    path: '#!',
    title: 'Settings',
    icon: 'lucide:settings',
    active: false,
  },
];

export const useNavItems = () => {
  const location = useLocation();

  const updateActiveStates = (items: NavItem[], currentPath: string): NavItem[] => {
    return items.map(item => {
      // Special case for dashboard to prevent it from being active on all admin routes
      if (item.path === '/admin') {
        return {
          ...item,
          active: currentPath === '/admin'
        };
      }

      // For other items, check if the current path matches the item's path
      const isActive = item.path !== '#!' && (
        currentPath === item.path || 
        currentPath.startsWith(`/admin/${item.path}`)
      );
      
      if (item.subMenu) {
        const updatedSubMenu = updateActiveStates(item.subMenu, currentPath);
        // Parent is active if any child is active
        const isChildActive = updatedSubMenu.some(child => child.active);
        
        return {
          ...item,
          active: isActive || isChildActive,
          subMenu: updatedSubMenu
        };
      }
      
      return {
        ...item,
        active: isActive
      };
    });
  };

  const navItems = updateActiveStates(defaultNavItems, location.pathname);
  
  return navItems;
};

export default defaultNavItems;