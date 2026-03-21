import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Generate a simple session ID
function getSessionId() {
  let sid = sessionStorage.getItem('bond_sid');
  if (!sid) {
    sid = Math.random().toString(36).substr(2, 12) + Date.now().toString(36);
    sessionStorage.setItem('bond_sid', sid);
  }
  return sid;
}

export default function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Small delay to not block page rendering
    const timer = setTimeout(() => {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: location.pathname,
          referrer: document.referrer || '',
          session_id: getSessionId(),
        }),
      }).catch(() => {}); // silently fail
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}
