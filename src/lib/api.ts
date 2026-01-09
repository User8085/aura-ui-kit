/**
 * API Configuration for College Event Organizer
 * 
 * Centralized API client for all backend calls.
 * Configure VITE_API_URL in environment for production.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

/**
 * Generic fetch wrapper with auth handling
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('auth_token');
  if (token) {
    (defaultHeaders as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'student';
  avatar?: string;
  department?: string;
  phone?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'workshop' | 'seminar' | 'cultural' | 'sports' | 'technical' | 'social';
  capacity: number;
  registered: number;
  organizerId: string;
  organizerName: string;
  image?: string;
  isRegistered?: boolean;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  department: string;
  registeredAt: string;
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    apiClient<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (name: string, email: string, password: string, role: 'organizer' | 'student') =>
    apiClient<{ token: string; user: User }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    }),

  getProfile: () => apiClient<User>('/auth/profile'),

  updateProfile: (data: Partial<User>) =>
    apiClient<User>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Events API
export const eventsApi = {
  getAll: (filters?: { category?: string; date?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.date) params.append('date', filters.date);
    if (filters?.search) params.append('search', filters.search);
    return apiClient<Event[]>(`/events?${params.toString()}`);
  },

  getById: (id: string) => apiClient<Event>(`/events/${id}`),

  create: (data: Omit<Event, 'id' | 'registered' | 'organizerId' | 'organizerName'>) =>
    apiClient<Event>('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Event>) =>
    apiClient<Event>(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient<{ success: boolean }>(`/events/${id}`, {
      method: 'DELETE',
    }),

  getMyEvents: () => apiClient<Event[]>('/events/my-events'),

  register: (eventId: string) =>
    apiClient<{ success: boolean }>(`/events/${eventId}/register`, {
      method: 'POST',
    }),

  unregister: (eventId: string) =>
    apiClient<{ success: boolean }>(`/events/${eventId}/unregister`, {
      method: 'POST',
    }),

  getAttendees: (eventId: string) =>
    apiClient<Attendee[]>(`/events/${eventId}/attendees`),

  getRegisteredEvents: () => apiClient<Event[]>('/events/registered'),
};

// Mock data for development
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Web Development Workshop',
    description: 'Learn modern web development with React and Node.js. This hands-on workshop covers frontend and backend technologies.',
    date: '2026-01-20',
    time: '10:00 AM',
    location: 'Tech Lab 101',
    category: 'technical',
    capacity: 50,
    registered: 32,
    organizerId: 'org1',
    organizerName: 'Computer Science Club',
    isRegistered: false,
  },
  {
    id: '2',
    title: 'Annual Cultural Fest',
    description: 'Celebrate diversity with music, dance, and art performances from students across departments.',
    date: '2026-01-25',
    time: '5:00 PM',
    location: 'Main Auditorium',
    category: 'cultural',
    capacity: 500,
    registered: 348,
    organizerId: 'org2',
    organizerName: 'Cultural Committee',
    isRegistered: true,
  },
  {
    id: '3',
    title: 'Career Guidance Seminar',
    description: 'Industry experts share insights on career paths, resume building, and interview preparation.',
    date: '2026-01-28',
    time: '2:00 PM',
    location: 'Seminar Hall B',
    category: 'seminar',
    capacity: 200,
    registered: 156,
    organizerId: 'org3',
    organizerName: 'Placement Cell',
    isRegistered: false,
  },
  {
    id: '4',
    title: 'Inter-College Basketball Tournament',
    description: 'Compete against top college teams in this exciting basketball championship.',
    date: '2026-02-05',
    time: '9:00 AM',
    location: 'Sports Complex',
    category: 'sports',
    capacity: 100,
    registered: 88,
    organizerId: 'org4',
    organizerName: 'Sports Council',
    isRegistered: false,
  },
  {
    id: '5',
    title: 'AI/ML Workshop Series',
    description: 'Deep dive into artificial intelligence and machine learning fundamentals with practical projects.',
    date: '2026-02-10',
    time: '11:00 AM',
    location: 'Innovation Hub',
    category: 'workshop',
    capacity: 40,
    registered: 40,
    organizerId: 'org1',
    organizerName: 'Computer Science Club',
    isRegistered: true,
  },
  {
    id: '6',
    title: 'Freshers Welcome Party',
    description: 'Welcome new students with games, music, and networking activities.',
    date: '2026-02-15',
    time: '6:00 PM',
    location: 'Student Center',
    category: 'social',
    capacity: 300,
    registered: 210,
    organizerId: 'org5',
    organizerName: 'Student Council',
    isRegistered: false,
  },
];

export const mockAttendees: Attendee[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@college.edu', department: 'Computer Science', registeredAt: '2026-01-10' },
  { id: '2', name: 'Bob Smith', email: 'bob@college.edu', department: 'Electrical Engineering', registeredAt: '2026-01-11' },
  { id: '3', name: 'Carol Williams', email: 'carol@college.edu', department: 'Business Administration', registeredAt: '2026-01-12' },
  { id: '4', name: 'David Brown', email: 'david@college.edu', department: 'Mechanical Engineering', registeredAt: '2026-01-12' },
  { id: '5', name: 'Eva Martinez', email: 'eva@college.edu', department: 'Computer Science', registeredAt: '2026-01-13' },
];
