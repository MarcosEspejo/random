import { FiUsers } from 'react-icons/fi';
import { BsChatDots } from 'react-icons/bs';

interface HeaderProps {
  onlineUsers: number;
}

const Header = ({ onlineUsers }: HeaderProps) => {
  return (
    <header className="glass-effect border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-3 md:px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-accent-primary">
              <BsChatDots className="text-2xl md:text-3xl" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-white">
                Chat<span className="text-accent-primary">Aleatorio</span>
              </h1>
              <p className="text-xs text-gray-500 hidden md:block font-light">
                Chat global
              </p>
            </div>
          </div>

          {/* Online Users */}
          <div className="flex items-center gap-1.5 md:gap-2 bg-dark-100/60 rounded-lg px-3 md:px-4 py-1.5 md:py-2 border border-gray-800">
            <FiUsers className="text-accent-primary text-base md:text-lg" />
            <div className="text-left">
              <div className="text-[10px] md:text-xs text-gray-500">En línea</div>
              <div className="text-xs md:text-sm font-semibold text-white">
                {onlineUsers.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
