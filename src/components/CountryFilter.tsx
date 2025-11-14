import { FiGlobe } from 'react-icons/fi';

interface CountryFilterProps {
  selectedCountry: string | null;
  onCountrySelect: (country: string | null) => void;
  userCountry: string;
}

const COUNTRIES = [
  { code: 'all', name: 'Todos los países', flag: '🌍' },
  { code: 'Mexico', name: 'México', flag: '🇲🇽' },
  { code: 'España', name: 'España', flag: '🇪🇸' },
  { code: 'Argentina', name: 'Argentina', flag: '🇦🇷' },
  { code: 'Colombia', name: 'Colombia', flag: '🇨🇴' },
  { code: 'Chile', name: 'Chile', flag: '🇨🇱' },
  { code: 'Peru', name: 'Perú', flag: '🇵🇪' },
  { code: 'Venezuela', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'Ecuador', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'Guatemala', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'Cuba', name: 'Cuba', flag: '🇨🇺' },
];

const CountryFilter = ({ selectedCountry, onCountrySelect, userCountry }: CountryFilterProps) => {
  return (
    <div className="glass-effect rounded-lg p-4 md:p-6 border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <FiGlobe className="text-accent-primary text-lg" />
        <h3 className="text-base font-medium">Filtrar por país</h3>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-400 font-light">
          Tu ubicación: <span className="text-accent-primary font-medium">{userCountry}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {COUNTRIES.map((country) => (
          <button
            key={country.code}
            onClick={() => onCountrySelect(country.code === 'all' ? null : country.code)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
              transition-colors duration-200
              ${
                (country.code === 'all' && !selectedCountry) ||
                country.code === selectedCountry
                  ? 'bg-accent-primary text-white'
                  : 'bg-dark-100/60 text-gray-300 hover:bg-dark-100 border border-gray-800 hover:border-gray-700'
              }
            `}
          >
            <span className="text-base">{country.flag}</span>
            <span className="truncate">{country.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center font-light">
        {selectedCountry 
          ? `Buscando personas de ${COUNTRIES.find(c => c.code === selectedCountry)?.name}` 
          : 'Buscando personas de cualquier país'}
      </div>
    </div>
  );
};

export default CountryFilter;
