import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, X, User } from 'lucide-react';
import { Card, Button, Input, Select, Badge } from '../components/ui';
import { useDataStore } from '../services/storage';
import { Patient, Gender } from '../types';

const Patients = () => {
  const { patients, setPatients } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Patient>>({
    firstName: '', lastName: '', age: 0, gender: Gender.MALE, phone: '', email: ''
  });

  const handleOpenModal = (patient?: Patient) => {
    if (patient) {
      setEditingPatient(patient);
      setFormData(patient);
    } else {
      setEditingPatient(null);
      setFormData({ firstName: '', lastName: '', age: 18, gender: Gender.MALE, phone: '', email: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      // Update
      setPatients(prev => prev.map(p => p.id === editingPatient.id ? { ...p, ...formData } as Patient : p));
    } else {
      // Create
      const newPatient: Patient = {
        ...formData as Patient,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      setPatients(prev => [...prev, newPatient]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Confirmer la suppression ?')) {
      setPatients(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredPatients = patients.filter(p => 
    p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion des Patients</h2>
          <p className="text-text-muted">Base de données patients sécurisée</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={18} />
          Nouveau Patient
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
          <Search className="text-text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher un patient..." 
            className="bg-transparent border-none focus:outline-none text-white w-full placeholder-text-muted"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-text-muted text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Nom</th>
                <th className="p-4 font-medium">Âge/Sexe</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Inscription</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPatients.map(patient => (
                <tr key={patient.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="font-bold text-white">{patient.lastName} {patient.firstName}</p>
                        <p className="text-xs text-text-muted">{patient.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white">{patient.age} ans</span>
                    <span className="text-text-muted mx-2">•</span>
                    <span className="text-text-muted">{patient.gender}</span>
                  </td>
                  <td className="p-4 text-neon font-mono">{patient.phone}</td>
                  <td className="p-4 text-text-muted">{new Date(patient.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" className="!px-2 !py-1" onClick={() => handleOpenModal(patient)}>Éditer</Button>
                      <Button variant="danger" className="!px-2 !py-1" onClick={() => handleDelete(patient.id)}>X</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-muted">Aucun patient trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-white"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-6">{editingPatient ? 'Modifier Patient' : 'Nouveau Patient'}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Prénom" 
                  value={formData.firstName} 
                  onChange={e => setFormData({...formData, firstName: e.target.value})} 
                  required 
                />
                <Input 
                  label="Nom" 
                  value={formData.lastName} 
                  onChange={e => setFormData({...formData, lastName: e.target.value})} 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Âge" 
                  type="number"
                  value={formData.age} 
                  onChange={e => setFormData({...formData, age: parseInt(e.target.value)})} 
                  required 
                />
                <Select 
                  label="Sexe"
                  value={formData.gender}
                  onChange={e => setFormData({...formData, gender: e.target.value as Gender})}
                  options={[
                    { value: Gender.MALE, label: 'Homme' },
                    { value: Gender.FEMALE, label: 'Femme' },
                    { value: Gender.OTHER, label: 'Autre' },
                  ]}
                />
              </div>
              <Input 
                label="Téléphone" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                required 
              />
              <Input 
                label="Email" 
                type="email"
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                required 
              />
              
              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Annuler</Button>
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Patients;