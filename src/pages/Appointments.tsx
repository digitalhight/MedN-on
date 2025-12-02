import React, { useState } from 'react';
import { Clock, Plus, X } from 'lucide-react';
import { Card, Button, Input, Select, Badge } from '../components/ui';
import { useDataStore } from '../services/storage';
import { Appointment } from '../types';

const Appointments = () => {
  const { appointments, setAppointments, patients, doctors } = useDataStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState<{
    patientId: string;
    doctorId: string;
    date: string;
    time: string;
    type: string;
  }>({
    patientId: patients[0]?.id || '',
    doctorId: doctors[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    type: 'Consultation'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      patientId: formData.patientId,
      doctorId: formData.doctorId,
      date: new Date(`${formData.date}T${formData.time}`).toISOString(),
      type: formData.type as any,
      status: 'Prévu'
    };
    setAppointments(prev => [...prev, newAppointment]);
    setIsModalOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: any) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const sortedAppointments = [...appointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Planning</h2>
          <p className="text-text-muted">Gestion des rendez-vous</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Nouveau RDV
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {sortedAppointments.map(app => {
            const patient = patients.find(p => p.id === app.patientId);
            const doctor = doctors.find(d => d.id === app.doctorId);
            const appDate = new Date(app.date);

            return (
              <Card key={app.id} className="flex flex-col md:flex-row gap-4 items-center hover:border-neon/50 transition-all">
                <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg min-w-[80px]">
                  <span className="text-2xl font-bold text-neon">{appDate.getDate()}</span>
                  <span className="text-xs uppercase text-text-muted">{appDate.toLocaleDateString('fr-FR', { month: 'short' })}</span>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                     <h3 className="font-bold text-lg text-white">{patient?.firstName} {patient?.lastName}</h3>
                     <Badge color="blue">{app.type}</Badge>
                  </div>
                  <p className="text-text-muted flex items-center justify-center md:justify-start gap-2 text-sm">
                    <Clock size={14} />
                    {appDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    <span>•</span>
                    Avec {doctor?.name}
                  </p>
                </div>

                <div className="flex gap-2">
                  {app.status === 'Prévu' && (
                    <>
                      <Button variant="secondary" className="!text-xs" onClick={() => handleStatusChange(app.id, 'Terminé')}>Terminer</Button>
                      <Button variant="danger" className="!text-xs" onClick={() => handleStatusChange(app.id, 'Annulé')}>Annuler</Button>
                    </>
                  )}
                  {app.status !== 'Prévu' && (
                     <Badge color={app.status === 'Terminé' ? 'green' : 'red'}>{app.status}</Badge>
                  )}
                </div>
              </Card>
            );
          })}
           {sortedAppointments.length === 0 && (
              <p className="text-text-muted text-center py-8">Aucun rendez-vous planifié.</p>
            )}
        </div>

        <div className="hidden lg:block">
          <Card className="h-full bg-gradient-to-b from-dark-card to-neon/5 border-none">
            <h3 className="text-xl font-bold mb-4">Aujourd'hui</h3>
            {/* Simple calendar visualization placeholder */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => <span key={d} className="text-text-muted">{d}</span>)}
              {Array.from({length: 30}).map((_, i) => (
                 <div key={i} className={`p-2 rounded hover:bg-white/10 cursor-pointer ${i === 12 ? 'bg-neon text-white shadow-neon' : ''}`}>
                   {i + 1}
                 </div>
              ))}
            </div>
            <p className="text-sm text-text-muted italic">Sélectionnez une date pour voir les disponibilités.</p>
          </Card>
        </div>
      </div>

       {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg relative">
             <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-white"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-6">Nouveau Rendez-vous</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
               <Select 
                  label="Patient"
                  value={formData.patientId}
                  onChange={e => setFormData({...formData, patientId: e.target.value})}
                  options={patients.map(p => ({ value: p.id, label: `${p.lastName} ${p.firstName}` }))}
                />
                <Select 
                  label="Médecin"
                  value={formData.doctorId}
                  onChange={e => setFormData({...formData, doctorId: e.target.value})}
                  options={doctors.map(d => ({ value: d.id, label: d.name }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Date" 
                    type="date"
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})} 
                    required 
                  />
                  <Input 
                    label="Heure" 
                    type="time"
                    value={formData.time} 
                    onChange={e => setFormData({...formData, time: e.target.value})} 
                    required 
                  />
                </div>
                 <Select 
                  label="Type"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  options={[
                    { value: 'Consultation', label: 'Consultation' },
                    { value: 'Urgence', label: 'Urgence' },
                    { value: 'Suivi', label: 'Suivi' },
                    { value: 'Chirurgie', label: 'Chirurgie' },
                  ]}
                />
                 <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Annuler</Button>
                  <Button type="submit">Confirmer</Button>
                </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Appointments;