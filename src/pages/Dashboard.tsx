import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Calendar, Activity, TrendingUp } from 'lucide-react';
import { Card, Badge } from '../components/ui';
import { useDataStore } from '../services/storage';

const data = [
  { name: 'Lun', patients: 12 },
  { name: 'Mar', patients: 19 },
  { name: 'Mer', patients: 15 },
  { name: 'Jeu', patients: 22 },
  { name: 'Ven', patients: 28 },
  { name: 'Sam', patients: 10 },
  { name: 'Dim', patients: 5 },
];

const StatCard = ({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend: string }) => (
  <Card className="relative overflow-hidden group">
    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={80} />
    </div>
    <div className="flex flex-col gap-4 relative z-10">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-neon/10 rounded-lg text-neon">
          <Icon size={24} />
        </div>
        <Badge color="green">{trend}</Badge>
      </div>
      <div>
        <h3 className="text-text-muted text-sm font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold mt-1 text-white">{value}</p>
      </div>
    </div>
  </Card>
);

const Dashboard = () => {
  const { patients, appointments, doctors } = useDataStore();
  
  // Calculate some basic stats
  const totalPatients = patients.length;
  const totalAppointments = appointments.length;
  const activeDoctors = doctors.length;
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date.startsWith(today)).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Tableau de Bord</h2>
          <p className="text-text-muted mt-1">Aperçu global de l'activité du cabinet</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm text-text-muted">Dernière mise à jour</p>
          <p className="text-neon font-mono text-lg">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={totalPatients.toString()} icon={Users} trend="+12%" />
        <StatCard title="Rendez-vous" value={totalAppointments.toString()} icon={Calendar} trend="+5%" />
        <StatCard title="Médecins Actifs" value={activeDoctors.toString()} icon={Activity} trend="Stable" />
        <StatCard title="Consultations (J)" value={todayAppointments.toString()} icon={TrendingUp} trend="+2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <Card className="h-full min-h-[400px]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity className="text-neon" size={20} />
              Affluence Patients (7 derniers jours)
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff007f" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ff007f" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" tick={{fill: '#999'}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#666" tick={{fill: '#999'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#ff007f' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="patients" 
                    stroke="#ff007f" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPatients)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Appointments List */}
        <Card className="h-full">
          <h3 className="text-xl font-bold mb-4">Rendez-vous récents</h3>
          <div className="space-y-4">
            {appointments.slice(0, 5).map(apt => (
              <div key={apt.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                <div className="w-10 h-10 rounded-full bg-dark-bg border border-white/10 flex items-center justify-center text-neon font-bold">
                  {new Date(apt.date).getDate()}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{apt.type}</p>
                  <p className="text-xs text-text-muted">{new Date(apt.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {patients.find(p => p.id === apt.patientId)?.lastName}</p>
                </div>
                <Badge color={apt.status === 'Terminé' ? 'green' : apt.status === 'Annulé' ? 'red' : 'blue'}>
                  {apt.status}
                </Badge>
              </div>
            ))}
            {appointments.length === 0 && (
              <p className="text-text-muted text-center py-8">Aucun rendez-vous prévu.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;