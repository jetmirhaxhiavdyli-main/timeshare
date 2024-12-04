export interface Calendar {
  id: string;
  name: string;
  created_at: string;
  owner_id: string;
}

export interface Friend {
  id: string;
  calendar_id: string;
  name: string;
  country: string;
  profile_picture_url: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  created_at: string;
}
