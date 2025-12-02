import { useState, useEffect } from 'react';
import { Patient, Doctor, Appointment, MedicalRecord } from '../types';
import { INITIAL_PATIENTS, INITIAL_DOCTORS, INITIAL_APPOINTMENTS, INITIAL_RECORDS } from '../constants';

// Keys
const KEYS = {
  PATIENTS: 'medneon_patients',
  DOCTORS: 'medneon_doctors',
  APPOINTMENTS: 'medneon_appointments',
  RECORDS: 'medneon_records',
};

// Generic hook for localStorage with initial data fallback
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export const useDataStore = () => {
  const [patients, setPatients] = useLocalStorage<Patient[]>(KEYS.PATIENTS, INITIAL_PATIENTS);
  const [doctors, setDoctors] = useLocalStorage<Doctor[]>(KEYS.DOCTORS, INITIAL_DOCTORS);
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>(KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  const [records, setRecords] = useLocalStorage<MedicalRecord[]>(KEYS.RECORDS, INITIAL_RECORDS);

  return {
    patients,
    setPatients,
    doctors,
    setDoctors,
    appointments,
    setAppointments,
    records,
    setRecords
  };
};