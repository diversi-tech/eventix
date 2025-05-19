export interface Participant {
  id: string;
  name: string;
  email: string;
  dietaryRestrictions?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: Participant[];
  organizer: Participant;
  mealPlan?: {
    appetizers: string[];
    mainCourse: string[];
    desserts: string[];
    beverages: string[];
  };
} 