import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Event } from '@eventix/shared';

export class DatabaseService {
  private readonly tableName = 'events';
  private supabase: SupabaseClient | null = null;

  private getClient(): SupabaseClient {
    if (!this.supabase) {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase configuration. Please check your environment variables.');
      }

      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
    return this.supabase;
  }

  canInitialize(): boolean {
    return this.getClient() !== null;
  }

  async getAllEvents(): Promise<Event[]> {
    try {
      const { data, error } = await this.getClient()
        .from(this.tableName)
        .select('*')
        .order('datetime', { ascending: true });

      if (error) {
        console.error('Database error fetching events:', error);
        throw new Error('Failed to fetch events from database');
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllEvents:', error);
      throw error;
    }
  }

  async getEventById(id: string): Promise<Event | null> {
    try {
      const { data, error } = await this.getClient()
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Event not found
        }
        console.error('Database error fetching event:', error);
        throw new Error('Failed to fetch event from database');
      }

      return data;
    } catch (error) {
      console.error('Error in getEventById:', error);
      throw error;
    }
  }

  async createEvent(event: Omit<Event, 'id'>): Promise<Event> {
    try {
      const { data, error } = await this.getClient()
        .from(this.tableName)
        .insert([event])
        .select()
        .single();

      if (error) {
        console.error('Database error creating event:', error);
        throw new Error('Failed to create event in database');
      }

      return data;
    } catch (error) {
      console.error('Error in createEvent:', error);
      throw error;
    }
  }

  // Initialize database with sample data if empty
  async initializeSampleData(): Promise<void> {
    try {
      const events = await this.getAllEvents();
      
      if (events.length === 0) {
        console.log('Initializing database with sample data...');
        
        const sampleEvents = [
          {
            title: 'Team Dinner',
            description: 'Monthly team dinner at Italian restaurant',
            location: '123 Main St, City',
            datetime: new Date('2024-04-15T19:00:00'),
            language: 'en' as const,
            mealType: 'meat' as const,
            expectedCount: 10,
            actualCount: 0,
            createdBy: 'user1',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'Vegan Potluck',
            description: 'Bring your favorite vegan dish to share',
            location: '456 Park Ave, City',
            datetime: new Date('2024-04-20T18:00:00'),
            language: 'en' as const,
            mealType: 'vegan' as const,
            expectedCount: 15,
            actualCount: 0,
            createdBy: 'user2',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];

        for (const event of sampleEvents) {
          await this.createEvent(event);
        }
        
        console.log('Sample data initialized successfully');
      }
    } catch (error) {
      console.error('Failed to initialize sample data:', error);
      // Don't throw the error, just log it
    }
  }
}

export const databaseService = new DatabaseService();