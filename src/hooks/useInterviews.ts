
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

interface Interview {
  id: string;
  title: string;
  description: string | null;
  scheduled_at: string | null;
  duration_minutes: number | null;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  candidate_id: string | null;
  recruiter_id: string | null;
  job_position_id: string | null;
  overall_score: number | null;
  feedback: string | null;
  meeting_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  candidate?: {
    first_name: string | null;
    last_name: string | null;
    email: string;
  };
  recruiter?: {
    first_name: string | null;
    last_name: string | null;
    email: string;
  };
  job_position?: {
    title: string;
    company: {
      name: string;
    };
  };
}

export const useInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchInterviews();
    }
  }, [user]);

  const fetchInterviews = async () => {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .select(`
          *,
          candidate:profiles!candidate_id(first_name, last_name, email),
          recruiter:profiles!recruiter_id(first_name, last_name, email),
          job_position:job_positions(
            title,
            company:companies(name)
          )
        `)
        .order('scheduled_at', { ascending: true });

      if (error) {
        console.error('Error fetching interviews:', error);
        toast({
          title: "Error",
          description: "Failed to load interviews",
          variant: "destructive"
        });
        return;
      }

      setInterviews(data || []);
    } catch (error) {
      console.error('Error in fetchInterviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const createInterview = async (interviewData: TablesInsert<'interviews'>) => {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .insert(interviewData)
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create interview",
          variant: "destructive"
        });
        return { error };
      }

      await fetchInterviews(); // Refresh the list
      toast({
        title: "Success",
        description: "Interview created successfully",
        variant: "default"
      });

      return { data, error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const updateInterview = async (id: string, updates: TablesUpdate<'interviews'>) => {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update interview",
          variant: "destructive"
        });
        return { error };
      }

      await fetchInterviews(); // Refresh the list
      toast({
        title: "Success",
        description: "Interview updated successfully",
        variant: "default"
      });

      return { data, error: null };
    } catch (error: any) {
      return { error };
    }
  };

  return {
    interviews,
    loading,
    fetchInterviews,
    createInterview,
    updateInterview
  };
};
