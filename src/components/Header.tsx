import React, { useState } from 'react';
import { Settings as SettingsIcon, Search, Menu } from 'lucide-react';
import Settings from './Settings';

interface HeaderProps {
  startDay: 'Sunday' | 'Monday';
  onStartDayChange: (day: 'Sunday' | 'Monday') => void;
}

const Header: React.FC<HeaderProps> = ({ startDay, onStartDayChange }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      name: 'Home',
      items: ['Dashboard', 'Activity', 'Settings']
    },
    {
      name: 'TaskBoard',
      items: ['Calendar View', 'Planning', 'Analytics']
    },
    {
      name: 'HabitTracker',
      items: ['Daily Habits', 'Weekly Goals', 'Progress']
    },
    {
      name: 'Finance',
      items: ['Overview', 'Investments', 'Budget']
    },
    {
      name: 'Links',
      items: ['Bookmarks', 'Resources', 'Tools']
    },
    {
      name: 'LaunchPad',
      items: ['Quick Access', 'Recent', 'Favorites']
    }
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-primary-start to-primary-end text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="flex items-center space-x-2">
                <span className="text-xl font-bold">Echobase</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button className="hover:text-gray-200 py-2">
                    {item.name}
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem}
                          href={`#${subItem.toLowerCase()}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 px-4 py-1 pl-10 pr-4 rounded-full text-sm bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-white/70"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              </div>

              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <SettingsIcon className="h-5 w-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  <button className="block w-full text-left px-3 py-2 text-base font-medium hover:bg-white/10">
                    {item.name}
                  </button>
                  <div className="pl-4 space-y-1">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem}
                        href={`#${subItem.toLowerCase()}`}
                        className="block px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <Settings
        show={showSettings}
        onHide={() => setShowSettings(false)}
        startDay={startDay}
        onStartDayChange={onStartDayChange}
      />
    </>
  );
};

export default Header;