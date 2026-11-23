import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut } from '../../authentication/model/auth_model';
import { supabaseFarmsGateway } from '../model/supabaseFarmsGateway';
import { YourFarmsPage } from './YourFarmPage';

export function YourFarmsRoute() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    void getCurrentUser().then(({ data, error }) => {
      if (error || !data.user) {
        navigate('/login', { replace: true });
        return;
      }

      const metadata = data.user.user_metadata as
        | { full_name?: string; name?: string }
        | undefined;
      setUserName(
        metadata?.full_name ??
          metadata?.name ??
          data.user.email ??
          'Farmer',
      );
      setCheckingSession(false);
    });
  }, [navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  if (checkingSession) {
    return null;
  }

  return (
    <YourFarmsPage
      deps={{
        gateway: supabaseFarmsGateway,
        navigate,
      }}
      userName={userName}
      onLogout={() => void handleLogout()}
    />
  );
}
