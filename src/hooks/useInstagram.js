import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export const useInstagram = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('instagram_sync')
        .select('*')
        .eq('included_in_portfolio', true)
        .order('posted_at', { ascending: false })
        .limit(12);

      if (fetchError) throw fetchError;
      setPosts(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching Instagram posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  const refetchPosts = async () => {
    await fetchInstagramPosts();
  };

  return { posts, loading, error, refetchPosts };
};

export const useSyncInstagramFeed = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);

  const syncFeed = async () => {
    try {
      setSyncing(true);
      setSyncError(null);

      const instagramUsername = import.meta.env.VITE_INSTAGRAM_USERNAME;

      // Call Instagram sync edge function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-instagram`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ instagramUsername }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to sync Instagram feed');
      }

      return await response.json();
    } catch (err) {
      setSyncError(err.message);
      throw err;
    } finally {
      setSyncing(false);
    }
  };

  return { syncFeed, syncing, syncError };
};
