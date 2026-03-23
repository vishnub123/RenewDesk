import { useState, useEffect } from 'react';
import { EMPTY_FORM, defaultSettings } from './data/seed';
import { getDaysLeft, calcExpiry, todayStr, uid } from './utils/helpers';
import useAuth from './context/useAuth';
import LoginPage       from './pages/LoginPage';
import RegisterPage    from './pages/RegisterPage';
import Header          from './components/Header';
import BottomNav       from './components/BottomNav';
import Dashboard       from './components/Dashboard';
import ClientList      from './components/ClientList';
import AlertsTab       from './components/AlertsTab';
import SettingsTab     from './components/SettingsTab';
import ClientFormModal from './components/modals/ClientFormModal';
import NoteModal       from './components/modals/NoteModal';
import WelcomeModal    from './components/modals/WelcomeModal';
import AddItemModal    from './components/modals/AddItemModal';

const PAGE = { background: 'linear-gradient(160deg,#0d1117 0%,#111827 100%)', minHeight: '100vh', maxWidth: 480, margin: '0 auto', fontFamily: "'DM Sans',sans-serif" };

export default function App() {
  const { owner, logout, loading, allClientsData, setAllClientsData, allSettingsData, setAllSettingsData } = useAuth();
  const [screen, setScreen] = useState('login');
  const [tab, setTab] = useState('dashboard');
  const [modal, setModal] = useState(null);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [newCli, setNewCli] = useState(null);
  const [noteClient, setNoteClient] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [cf, setCf] = useState({ ...EMPTY_FORM, startDate: todayStr() });
  const [newItemTxt, setNewItemTxt] = useState('');
  const [newFldLabel, setNewFldLabel] = useState('');
  const [newFldType, setNewFldType] = useState('text');

  // Update screen when owner changes
  useEffect(() => {
    if (owner) {
      setScreen('app');
      setTab('dashboard');
    } else {
      setScreen('login');
    }
  }, [owner]);

  const clients = allClientsData[owner?.id] || [];
  const settings = allSettingsData[owner?.id] || defaultSettings('other');
  
  const setCli = l => setAllClientsData(p => ({ ...p, [owner.id]: l }));
  const setSett = s => setAllSettingsData(p => ({ ...p, [owner.id]: s }));
  
  const alerts = clients.filter(c => getDaysLeft(c.expiryDate) <= 7);
  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.mobile.includes(search));

  const handleLogout = () => {
    logout();
    setTab('dashboard');
  };

  const openAdd = () => { setEditId(null); setCf({ ...EMPTY_FORM, startDate: todayStr() }); setModal('form'); };
  const openEdit = c => { setEditId(c.id); setCf({ ...EMPTY_FORM, ...c, customData: c.customData || {} }); setModal('form'); };
  const saveClient = () => {
    if (!cf.name || !cf.mobile || !cf.amount) { alert('Name, mobile and amount required'); return; }
    const exp = calcExpiry(cf.startDate, cf.durationType, cf.durationValue);
    const isNew = !editId;
    const data = { ...cf, expiryDate: exp, id: editId || uid() };
    setCli(isNew ? [...clients, data] : clients.map(c => c.id === editId ? data : c));
    if (isNew) { setNewCli(data); setModal('welcome'); } else setModal(null);
  };
  const delClient = id => { if (!window.confirm('Delete this client?')) return; setCli(clients.filter(c => c.id !== id)); };
  const openNote = c => { setNoteClient(c); setNoteText(''); setModal('note'); };
  const addCourse = () => { if (!newItemTxt.trim()) return; setSett({ ...settings, courses: [...settings.courses, newItemTxt.trim()] }); setNewItemTxt(''); setModal(null); };
  const delCourse = i => setSett({ ...settings, courses: settings.courses.filter((_,x) => x !== i) });
  const addSport = () => { if (!newItemTxt.trim()) return; setSett({ ...settings, sports: [...settings.sports, newItemTxt.trim()] }); setNewItemTxt(''); setModal(null); };
  const delSport = i => setSett({ ...settings, sports: settings.sports.filter((_,x) => x !== i) });
  const addField = () => { if (!newFldLabel.trim()) return; setSett({ ...settings, customFields: [...settings.customFields, { id: uid(), label: newFldLabel.trim(), type: newFldType }] }); setNewFldLabel(''); setNewFldType('text'); setModal(null); };
  const delField = id => setSett({ ...settings, customFields: settings.customFields.filter(f => f.id !== id) });
  const closeModal = () => setModal(null);
  const biz = owner?.businessType;

  if (loading) {
    return <div style={{ ...PAGE, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ color: '#10b981', fontSize: 14 }}>Loading...</div>
    </div>;
  }

  if (screen === 'login') return <div style={PAGE}><LoginPage onRegister={() => setScreen('register')} /></div>;
  if (screen === 'register') return <div style={PAGE}><RegisterPage onBack={() => setScreen('login')} /></div>;

  return (
    <div style={PAGE}>
      <Header owner={owner} alertsCount={alerts.length} onAlertsClick={() => setTab('alerts')} onLogout={handleLogout} />
      <div style={{ padding: '4px 20px 110px' }}>
        {tab === 'dashboard' && <Dashboard clients={clients} alerts={alerts} onOpenNote={openNote} onAddFirst={() => { setTab('clients'); openAdd(); }} onViewAll={() => setTab('clients')} />}
        {tab === 'clients' && <ClientList clients={filtered} biz={biz} onAdd={openAdd} onEdit={openEdit} onDelete={delClient} onOpenNote={openNote} search={search} setSearch={setSearch} />}
        {tab === 'alerts' && <AlertsTab alerts={alerts} biz={biz} onOpenNote={openNote} />}
        {tab === 'settings' && <SettingsTab settings={settings} biz={biz} owner={owner} onLogout={handleLogout} onDelCourse={delCourse} onDelSport={delSport} onDelField={delField} onOpenModal={setModal} />}
      </div>
      <BottomNav tab={tab} setTab={setTab} alertsCount={alerts.length} />
      {modal === 'form' && <ClientFormModal cf={cf} setCf={setCf} editId={editId} biz={biz} settings={settings} onSave={saveClient} onClose={closeModal} />}
      {modal === 'welcome' && newCli && <WelcomeModal client={newCli} owner={owner} onClose={closeModal} />}
      {modal === 'note' && noteClient && <NoteModal client={noteClient} owner={owner} biz={biz} noteText={noteText} setNoteText={setNoteText} onClose={closeModal} />}
      <AddItemModal type={['addCourse', 'addSport', 'addField'].includes(modal) ? modal : null} onClose={closeModal} onAddCourse={addCourse} onAddSport={addSport} onAddField={addField} newItemTxt={newItemTxt} setNewItemTxt={setNewItemTxt} newFldLabel={newFldLabel} setNewFldLabel={setNewFldLabel} newFldType={newFldType} setNewFldType={setNewFldType} />
    </div>
  );
}