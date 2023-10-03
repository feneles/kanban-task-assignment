import { Boards } from '../../assets/icons/boards';
import { Dashboard } from '../../assets/icons/dashboard';
import { Profile } from '../../assets/icons/profile';
import { Search } from '../../assets/icons/search';
import './WorkspaceNavigation.scss';

const NAV_ITEMS = {
  dashboard: { icon: <Dashboard />, text: 'Dashboard' },
  boards: { icon: <Boards />, text: 'Boards' },
  profile: { icon: <Profile />, text: 'Profile' },
  search: { icon: <Search />, text: 'Search' }
} as const;

type NavItemKey = keyof typeof NAV_ITEMS;

export const WorkspaceNavigation = () => {
  // Placeholder for routing
  const activeNavItem: NavItemKey = 'boards';

  return (
    <nav className="workspace-navigation">
      {Object.keys(NAV_ITEMS).map(key => (
        <a
          key={key}
          className={
            key === activeNavItem ? 'workspace-navigation--active bold' : 'bold'
          }
          href="#"
        >
          <span>{NAV_ITEMS[key as NavItemKey].icon}</span>
          {NAV_ITEMS[key as NavItemKey].text}
        </a>
      ))}
    </nav>
  );
};
