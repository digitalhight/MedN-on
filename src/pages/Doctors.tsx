import React from 'react';
import { ShieldCheck, Clock } from 'lucide-react';
import { Card, Badge } from '../components/ui';
import { useDataStore } from '../services/storage';

const Doctors = () => {
  const { doctors } = useDataStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Corps Médical</h2>
        <p className="text-text-muted">Spécialistes et praticiens</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map(doc => (
          <Card key={doc.id} className="text-center hover:scale-[1.02] transition-transform duration-300">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-neon p-1 shadow-neon">
              <img src={doc.avatar} alt={doc.name} className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
            
            <h3 className="text-xl font-bold text-white">{doc.name}</h3>
            <p className="text-neon font-medium mb-4">{doc.specialty}</p>
            
            <div className="flex justify-center gap-2 mb-4">
              <Badge color="blue">
                <ShieldCheck size={12} className="inline mr-1" />
                Certifié
              </Badge>
            </div>

            <div className="bg-white/5 rounded-lg p-3 text-sm text-text-muted flex items-center justify-center gap-2">
              <Clock size={14} />
              {doc.availability}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Doctors;