import React, { useState } from 'react';
import { Moon, Sun, Monitor, Save, Database, AlertTriangle } from 'lucide-react';
import { Card, Button, Input } from '../components/ui';

const Settings = () => {
  const [clinicName, setClinicName] = useState('MedNéon Clinic');
  const [theme, setTheme] = useState('neon');

  const handleSave = () => {
    alert('Paramètres sauvegardés localement.');
  };

  const handleReset = () => {
    if(window.confirm('Voulez-vous réinitialiser toutes les données (localStorage) ? Cette action est irréversible.')) {
        localStorage.clear();
        window.location.reload();
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Paramètres</h2>
        <p className="text-text-muted">Configuration de l'application</p>
      </div>

      <Card>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Monitor size={20} className="text-neon" />
          Apparence
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button 
            onClick={() => setTheme('neon')}
            className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${theme === 'neon' ? 'border-neon bg-neon/10 text-neon' : 'border-white/10 text-text-muted hover:bg-white/5'}`}
          >
            <Moon size={24} />
            <span>Néon Dark</span>
          </button>
          <button 
            onClick={() => setTheme('light')}
            className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition-all opacity-50 cursor-not-allowed border-white/10 text-text-muted`}
            title="Bientôt disponible"
          >
            <Sun size={24} />
            <span>Light</span>
          </button>
        </div>
      </Card>

      <Card>
         <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Database size={20} className="text-neon" />
          Informations Cabinet
        </h3>
        <div className="space-y-4">
          <Input label="Nom du cabinet" value={clinicName} onChange={(e) => setClinicName(e.target.value)} />
          <Input label="Adresse (fictive)" value="123 Cyber Avenue, Neo-Paris" disabled />
          <Button onClick={handleSave} className="w-full">
            <Save size={18} /> Sauvegarder
          </Button>
        </div>
      </Card>

      <Card className="border-red-500/20">
         <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-500">
          <AlertTriangle size={20} />
          Zone de Danger
        </h3>
        <p className="text-sm text-text-muted mb-4">
            Supprime toutes les données enregistrées dans le navigateur (patients, RDV, etc.) et restaure les données de démonstration.
        </p>
        <Button variant="danger" onClick={handleReset} className="w-full">
            Réinitialiser l'application
        </Button>
      </Card>
    </div>
  );
};

export default Settings;