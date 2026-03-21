import { MessageCircle } from 'lucide-react';
import { CARD, Tag } from './ui/Atoms';
import { getDaysLeft, statusOf } from '../utils/helpers';
export default function AlertsTab({ alerts, biz, onOpenNote }) {
  return (<>
    <h3 style={{ color:'#fff', fontSize:14, fontWeight:800, margin:'8px 0 4px' }}>🔔 Payment Alerts</h3>
    <p style={{ color:'#64748b', fontSize:13, marginBottom:16 }}>Clients expiring within 7 days or already expired</p>
    {alerts.length===0?(<div style={{ textAlign:'center', padding:'48px 0' }}><div style={{ fontSize:52, marginBottom:12 }}>✅</div><div style={{ color:'#fff', fontWeight:700, marginBottom:6 }}>All clear!</div><p style={{ color:'#64748b', fontSize:14 }}>No clients need attention right now</p></div>
    ):alerts.map(c=>{const days=getDaysLeft(c.expiryDate);const st=statusOf(days);return(
      <div key={c.id} style={{ ...CARD, borderColor:st.color+'50', background:st.bg }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}><div style={{ color:'#fff', fontWeight:700, fontSize:15 }}>{c.name}</div><Tag color={st.color} bg="transparent">{st.label}</Tag></div>
        <div style={{ color:'#94a3b8', fontSize:13, marginBottom:2 }}>📱 {c.mobile}</div>
        {biz==='coaching'&&c.courseName&&<div style={{ color:'#94a3b8', fontSize:13, marginBottom:2 }}>📖 {c.courseName}</div>}
        {biz==='club'&&c.sportName&&<div style={{ color:'#94a3b8', fontSize:13, marginBottom:2 }}>🏅 {c.sportName}</div>}
        {biz==='hostel'&&c.roomNo&&<div style={{ color:'#94a3b8', fontSize:13, marginBottom:2 }}>🚪 Room: {c.roomNo}</div>}
        <div style={{ color:'#94a3b8', fontSize:13, marginBottom:2 }}>💰 Rs.{c.amount} | 📅 {c.expiryDate}</div>
        <div style={{ color:st.color, fontSize:13, fontWeight:700, marginBottom:12 }}>{days<0?`⚠️ Expired ${Math.abs(days)} day(s) ago!`:`⏳ Expires in ${days} day(s)`}</div>
        <button onClick={()=>onOpenNote(c)} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, background:'#25D366', borderRadius:10, padding:'11px', color:'#fff', border:'none', fontSize:13, fontWeight:700, cursor:'pointer', width:'100%', fontFamily:'inherit' }}><MessageCircle size={15}/> Send WhatsApp Reminder</button>
      </div>
    );})}
  </>);
}