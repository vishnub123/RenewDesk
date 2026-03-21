import { MessageCircle } from 'lucide-react';
import { CARD, Btn, Tag } from './ui/Atoms';
import { getDaysLeft, statusOf } from '../utils/helpers';
export default function Dashboard({ clients, alerts, onOpenNote, onAddFirst, onViewAll }) {
  const aC=clients.filter(c=>getDaysLeft(c.expiryDate)>7).length;
  const eC=clients.filter(c=>{const d=getDaysLeft(c.expiryDate);return d>=0&&d<=7;}).length;
  const xC=clients.filter(c=>getDaysLeft(c.expiryDate)<0).length;
  return (<>
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:20, marginTop:6 }}>
      {[{l:'Active',v:aC,c:'#10b981'},{l:'Expiring',v:eC,c:'#eab308'},{l:'Expired',v:xC,c:'#ef4444'}].map(s=>(
        <div key={s.l} style={{ background:s.c+'15', border:`1px solid ${s.c}30`, borderRadius:14, padding:'14px 8px', textAlign:'center' }}>
          <div style={{ color:s.c, fontSize:28, fontWeight:800, lineHeight:1 }}>{s.v}</div>
          <div style={{ color:'#94a3b8', fontSize:11, marginTop:4 }}>{s.l}</div>
        </div>
      ))}
    </div>
    {alerts.length>0&&<><h3 style={{ color:'#fff', fontSize:14, fontWeight:800, margin:'0 0 10px' }}>⚠️ Needs Attention ({alerts.length})</h3>
      {alerts.map(c=>{const days=getDaysLeft(c.expiryDate);const st=statusOf(days);return(
        <div key={c.id} style={{ ...CARD, borderColor:st.color+'40', background:st.bg }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div><div style={{ color:'#fff', fontWeight:700, fontSize:15 }}>{c.name}</div><div style={{ color:'#94a3b8', fontSize:12, marginTop:2 }}>{days<0?`Expired ${Math.abs(days)}d ago`:`Expires in ${days}d`} · Rs.{c.amount}</div></div>
            <button onClick={()=>onOpenNote(c)} style={{ background:'#25D366', borderRadius:9, padding:'8px 12px', color:'#fff', border:'none', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontFamily:'inherit' }}><MessageCircle size={13}/> WA</button>
          </div>
          <Tag color={st.color} bg={st.color+'20'}>{st.label}</Tag>
        </div>
      );})}
    </>}
    {clients.length===0?(<div style={{ textAlign:'center', padding:'48px 0' }}><div style={{ fontSize:52, marginBottom:14 }}>👥</div><div style={{ color:'#fff', fontWeight:700, marginBottom:6 }}>No clients yet</div><p style={{ color:'#64748b', fontSize:14, margin:'0 0 20px' }}>Add your first client to get started</p><Btn onClick={onAddFirst} sx={{ width:'auto', padding:'12px 28px' }}>+ Add First Client</Btn></div>
    ):(<>
      <h3 style={{ color:'#fff', fontSize:14, fontWeight:800, margin:'20px 0 10px' }}>📋 Recent Clients</h3>
      {[...clients].reverse().slice(0,4).map(c=>{const st=statusOf(getDaysLeft(c.expiryDate));return(<div key={c.id} style={CARD}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}><div><div style={{ color:'#fff', fontWeight:600, fontSize:14 }}>{c.name}</div><div style={{ color:'#64748b', fontSize:12, marginTop:2 }}>Rs.{c.amount} · Expires {c.expiryDate}</div></div><Tag color={st.color} bg={st.bg}>{st.label}</Tag></div></div>);})}
      {clients.length>4&&<p style={{ color:'#10b981', textAlign:'center', cursor:'pointer', fontSize:13, fontWeight:600, marginTop:6 }} onClick={onViewAll}>View all {clients.length} clients →</p>}
    </>)}
  </>);
}