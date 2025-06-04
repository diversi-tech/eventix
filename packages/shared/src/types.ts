// Core TypeScript Types for Meals Together

// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash?: string; // Optional for Google SSO users
  googleId?: string; // For Google SSO
  language: 'en' | 'he';
  dietaryRestrictions: DietaryRestriction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DietaryRestriction {
  id: string;
  name: string; // 'vegan', 'vegetarian', 'kosher', 'gluten-free', etc.
  description?: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description?: string;
  location: string;
  datetime: Date;
  language: 'en' | 'he';
  mealType: MealType;
  expectedCount: number; // Initial estimate
  actualCount: number; // Calculated from participants
  createdBy: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}

export type MealType = 'meat' | 'dairy' | 'vegetarian' | 'vegan' | 'kosher' | 'bbq' | 'other';

// Participant and Role Types
export interface UserEvent {
  id: string;
  userId: string;
  eventId: string;
  role: UserRole;
  joinedAt: Date;
}

export type UserRole = 'admin' | 'participant';

// Menu and Dish Types
export interface MenuAction {
  id: string;
  eventId: string;
  userId: string; // Who made the change
  actionType: MenuActionType;
  actionData: MenuActionData;
  timestamp: Date;
}

export type MenuActionType = 'add_category' | 'remove_category' | 'add_dish' | 'remove_dish' | 'update_dish' | 'move_item' | 'assign_dish' | 'unassign_dish';

export interface MenuActionData {
  itemId?: string; // For dish/category operations
  name?: string; // For add/update operations
  notes?: string; // For dish updates
  tags?: string[]; // For dish dietary tags
  assignedTo?: string; // User ID for assignments
  categoryId?: string; // For organizing dishes
  position?: number; // For reordering
  newPosition?: number; // For move operations
  isCategory?: boolean; // To distinguish categories from dishes
}

// Current menu state (computed from actions)
export interface MenuItem {
  id: string;
  name: string;
  notes?: string;
  tags: string[]; // Dietary tags like ['vegan', 'gluten-free']
  assignedTo?: string; // User ID or null if unassigned
  categoryId?: string; // Parent category
  position: number; // Order within category
  isCategory: boolean; // True for category headers
  createdAt: Date;
  updatedAt: Date;
}

// Share Link Types
export interface ShareLink {
  id: string;
  eventId: string;
  token: string; // Unique shareable token
  createdBy: string; // User ID
  expirationDate?: Date; // Optional expiration
  accessLevel: AccessLevel;
  usageCount: number; // How many times clicked
  createdAt: Date;
}

export type AccessLevel = 'view_only' | 'join_and_edit';

// Computed/Display Types (not stored directly)
export interface EventWithDetails {
  event: Event;
  participants: UserEvent[];
  menu: MenuItem[];
  shareLink?: ShareLink;
  userRole?: UserRole; // Current user's role in this event
}

// Join/Share Flow Types
export interface EventPreview {
  event: Pick<Event, 'id' | 'title' | 'datetime' | 'location' | 'mealType'>;
  participantCount: number;
  isPublic: boolean; // Whether non-participants can view details
}

export interface JoinEventRequest {
  eventId: string;
  shareToken: string;
  userId: string;
}

// Utility Types
export type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserRequest = Partial<Pick<User, 'name' | 'language' | 'dietaryRestrictions'>>;
export type CreateEventRequest = Omit<Event, 'id' | 'createdBy' | 'actualCount' | 'createdAt' | 'updatedAt'>;
export type UpdateEventRequest = Partial<Pick<Event, 'title' | 'description' | 'location' | 'datetime' | 'mealType' | 'expectedCount'>>;

// API Response Types
export interface BaseResponse {
  success: boolean;
  error?: string;
}

export interface EventResponse extends BaseResponse {
  data: Event;
}

export interface EventsResponse extends BaseResponse {
  data: Event[];
}
