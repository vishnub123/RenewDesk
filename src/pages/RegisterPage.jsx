import { Inp, Sel, Btn } from '../components/ui/Atoms';
export default function RegisterPage({ rf, setRf, onRegister, onBack }) {
  return (
    <div style={{ padding:'56px 24px 32px' }}>
      <button onClick={onBack} style={{ background:'none', border:'none', color:'#10b981', cursor:'pointer', marginBottom:24, fontSize:14, fontFamily:'inherit' }}>← Back</button>
      <h1 style={{ color:'#fff', fontSize:24, fontWeight:800, margin:'0 0 4px' }}>Create Account</h1>
      <p style={{ color:'#64748b', fontSize:14, marginBottom:28 }}>Set up your business to start tracking</p>
      <Inp label="Your Name *"     placeholder="Owner's full name"  value={rf.ownerName}    onChange={e=>setRf({...rf,ownerName:e.target.value})}/>
      <Inp label="Business Name *" placeholder="e.g. FitZone Gym"   value={rf.businessName} onChange={e=>setRf({...rf,businessName:e.target.value})}/>
      <Sel label="Business Type" value={rf.businessType} onChange={e=>setRf({...rf,businessType:e.target.value})}><option value="gym">💪 Gym / Fitness Center</option><option value="hostel">🏠 PG / Hostel</option><option value="coaching">📚 Coaching / Tuition</option><option value="club">🎾 Sports Club</option><option value="other">🏢 Other Business</option></Sel>
      <Inp label="Set PIN *" type="password" placeholder="4–6 digit PIN" value={rf.pin} onChange={e=>setRf({...rf,pin:e.target.value})}/>
      <Btn onClick={onRegister} sx={{ marginTop:8 }}>Create Account 🚀</Btn>
    </div>
  );
}