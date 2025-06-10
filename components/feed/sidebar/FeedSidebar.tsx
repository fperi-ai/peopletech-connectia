import React from 'react';
import { useSidebarState } from './useSidebarState';
import { LeaderboardCard } from './LeaderboardCard';
import { AnnouncementCard } from './AnnouncementCard';
import { ActiveTeamsCard } from './ActiveTeamsCard';
import Icon from '../../shared/Icon';

/**
 * Main sidebar component for the Feed page with collapsible functionality
 */
export const FeedSidebar: React.FC = () => {
  const { isOpen, toggle } = useSidebarState();

  return (
    <aside
      className={`fixed right-0 top-0 h-full w-72 xl:w-80 transform transition-transform duration-200 ease-out z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:block hidden pt-16`}
      aria-hidden={!isOpen}
      role="complementary"
    >
      {/* Collapse button */}
      <button
        onClick={toggle}
        aria-label={isOpen ? 'Colapsar sidebar' : 'Expandir sidebar'}
        className="absolute -left-6 top-28 w-6 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-l-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
        tabIndex={0}
      >
        {isOpen ? <Icon name="chevron-right" className="w-4 h-4" /> : <Icon name="chevron-left" className="w-4 h-4" />}
      </button>

      {/* Sidebar content */}
      <div className="h-full overflow-y-auto bg-white/90 dark:bg-gray-800/80 backdrop-blur px-4 py-6 shadow-lg border-l border-gray-200 dark:border-gray-700">
        <LeaderboardCard />
        <AnnouncementCard />
        <ActiveTeamsCard />
      </div>
    </aside>
  );
};
