export interface LinkRecord {
  id: number;
  code: string;
  url: string;
  clicks: number;
  lastClicked: string | null;
  createdAt: string;
}

export interface LinkInput {
  url: string;
  code?: string;
}

