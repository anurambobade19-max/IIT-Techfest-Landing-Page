export interface Competition {
  id: string;
  title: string;
  category: string;
  prize: string;
  description: string;
  sort_order: number;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  college: string | null;
  event_name: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}
