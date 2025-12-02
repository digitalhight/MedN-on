import { Patient, Doctor, Appointment, MedicalRecord, Gender } from './types';

export const INITIAL_DOCTORS: Doctor[] = [
  { id: 'd1', name: 'Dr. Sarah Connor', specialty: 'Cyber-Neurologie', avatar: 'https://picsum.photos/100/100?random=1', availability: 'Lun-Ven' },
  { id: 'd2', name: 'Dr. Neo Anderson', specialty: 'Chirurgie Bionique', avatar: 'https://picsum.photos/100/100?random=2', availability: 'Mar-Jeu' },
  { id: 'd3', name: 'Dr. Deckard Cain', specialty: 'Médecine Générale', avatar: 'https://picsum.photos/100/100?random=3', availability: 'Lun-Mer-Ven' },
];

export const INITIAL_PATIENTS: Patient[] = [
  { id: 'p1', firstName: 'Jean', lastName: 'Dupont', age: 45, gender: Gender.MALE, phone: '0601020304', email: 'jean.d@example.com', createdAt: '2023-01-15' },
  { id: 'p2', firstName: 'Marie', lastName: 'Curie', age: 32, gender: Gender.FEMALE, phone: '0699887766', email: 'marie.c@example.com', createdAt: '2023-03-20' },
  { id: 'p3', firstName: 'Alex', lastName: 'Mercer', age: 28, gender: Gender.OTHER, phone: '0611223344', email: 'alex.m@example.com', createdAt: '2023-06-10' },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 'a1', patientId: 'p1', doctorId: 'd1', date: new Date().toISOString(), type: 'Consultation', status: 'Prévu' },
  { id: 'a2', patientId: 'p2', doctorId: 'd2', date: new Date(Date.now() + 86400000).toISOString(), type: 'Chirurgie', status: 'Prévu' },
];

export const INITIAL_RECORDS: MedicalRecord[] = [
  { id: 'r1', patientId: 'p1', diagnosis: 'Migraine chronique', prescription: 'Paracétamol 1000mg', date: '2023-10-01', doctorName: 'Dr. Sarah Connor' },
];