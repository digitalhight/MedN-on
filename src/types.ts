export enum Gender {
  MALE = 'Homme',
  FEMALE = 'Femme',
  OTHER = 'Autre'
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  phone: string;
  email: string;
  notes?: string;
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string; // URL
  availability: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string; // ISO String
  type: 'Consultation' | 'Urgence' | 'Suivi' | 'Chirurgie';
  status: 'Prévu' | 'Terminé' | 'Annulé';
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  diagnosis: string;
  prescription: string;
  date: string;
  doctorName: string;
}

export interface Stats {
  totalPatients: number;
  todayAppointments: number;
  activeDoctors: number;
  revenue: number;
}