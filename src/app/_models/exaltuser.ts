import { Photo } from './photo';

export interface Exaltuser {
  userId: number;
  username: string;
  gender: string;
  age: number;
  knownAs: string;
  created: string;
  lastActive: string;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
}
