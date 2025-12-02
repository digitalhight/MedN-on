import React, { useState } from 'react';
import { FileText, ScanLine, Eye, Share2 } from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { useDataStore } from '../services/storage';

const Records = () => {
  const { records, patients } = useDataStore();
  const [scanning, setScanning] = useState(false);

  const handleScanMock = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      alert('Document scanné (Simulation). Aucun fichier n\'a été uploadé.');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Dossiers Médicaux</h2>
          <p className="text-text-muted">Archives et diagnostics</p>
        </div>
        <Button onClick={handleScanMock} disabled={scanning} className={scanning ? 'animate-pulse' : ''}>
          <ScanLine size={18} />
          {scanning ? 'Numérisation en cours...' : 'Numériser Document'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map(record => {
          const patient = patients.find(p => p.id === record.patientId);
          return (
            <Card key={record.id} className="group hover:border-neon transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-neon/10 group-hover:text-neon transition-colors">
                  <FileText size={24} />
                </div>
                <Badge>{record.date}</Badge>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1">{patient?.lastName} {patient?.firstName}</h3>
              <p className="text-sm text-neon mb-4">{record.diagnosis}</p>
              
              <div className="space-y-2 text-sm text-text-muted mb-4">
                <p><span className="font-medium text-white/70">Médecin:</span> {record.doctorName}</p>
                <p><span className="font-medium text-white/70">Prescription:</span> {record.prescription}</p>
              </div>

              <div className="flex gap-2 border-t border-white/5 pt-4">
                <Button variant="secondary" className="flex-1 !text-xs">
                  <Eye size={14} /> Voir
                </Button>
                <Button variant="secondary" className="flex-1 !text-xs">
                  <Share2 size={14} /> Partager
                </Button>
              </div>
            </Card>
          );
        })}
         {records.length === 0 && (
            <p className="col-span-3 text-text-muted text-center py-8">Aucun dossier médical disponible.</p>
          )}
      </div>

      {scanning && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center">
            <div className="w-64 h-64 border-2 border-neon relative overflow-hidden rounded-xl shadow-neon">
                <div className="absolute top-0 left-0 w-full h-1 bg-neon shadow-[0_0_15px_#ff007f] animate-[scan_2s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <ScanLine size={48} className="text-white/20" />
                </div>
            </div>
            <p className="mt-4 text-neon font-mono tracking-widest animate-pulse">ANALYSIS IN PROGRESS...</p>
            <style>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
      )}
    </div>
  );
};

export default Records;