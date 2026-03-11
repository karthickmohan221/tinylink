export interface LinkRecord {
  id: number;
  code: string;
  url: string;
  clicks: number;
  lastClicked: string | null;
  createdAt: string;
  userId: string | null;
}

export interface LinkInput {
  url: string;
  code?: string;
}

export interface User {
  id: string;
  email: string;
  password: string | null;
  createdAt: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
}

