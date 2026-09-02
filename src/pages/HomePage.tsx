import { useAuth } from '@/hooks/AuthContext';

import { CompetitiveAnalysisPage } from './CompetitiveAnalysisPage';

export function HomePage() {
  const { signOut } = useAuth();

  return (
    <div className="relative">
      <CompetitiveAnalysisPage />
      <button
        onClick={() => void signOut()}
        className="fixed right-3 top-2 z-20 text-[10px] text-gray-300 transition-colors hover:text-gray-500"
        aria-label="Sign out"
      >
        Sign out
      </button>
    </div>
  );
}
