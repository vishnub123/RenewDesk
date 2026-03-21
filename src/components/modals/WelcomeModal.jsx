import { MessageCircle } from 'lucide-react';
import { Sheet } from '../ui/Atoms';
import { cleanNum } from '../../utils/helpers';
import { buildMsg } from '../../utils/messageBuilder';
export default function WelcomeModal({ client, owner, onClose }) {
  const rows=[['👤 Name',client.name],['📱 Mobile',client.mobile],['💰 Amount',`Rs.${client.amount}`],['📅 Valid Until',client.expiryDate],['⏳ Duration',`${client.durationValue} ${client.durationType}`],...(client.weight?[['⚖️ Weight',`${client.weight} kg`]]:[]),...(client.courseName?[['📖 Course',client.courseName]]:[]),...(client.sportName?[['🏅 Sport',client.sportName]]:[]),...(client.roomNo?[['🚪 Room',client.roomNo]]:[])];
  return (
    <Sheet title="🎉 Client Added!" onClose={onClose}>
      <div style={{ textAlign:'center', paddingBottom:8 }}>
        <div style={{ width:68, height:68, background:'linear-gradient(135deg,#10b981,#059669)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, margin:'0 auto 14px' }}>🎊</div>
        <h3 style={{ color:'#fff', fontWeight:800, fontSize:18, margin:'0 0 6px' }}>{client.name} added!</h3>
        <p style={{ color:'#64748b', fontSize:13, margin:'0 0 18px' }}>Send a welcome message with full membership details on WhatsApp.</p>
      </div>
      <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:14, padding:'14px 16px', marginBottom:16 }}>
        {rows.map(([l,v])=>(<div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid rgba(255,255,255,.05)' }}><span style={{ color:'#94a3b8', fontSize:13 }}>{l}</span><span style={{ color:'#fff', fontWeight:600, fontSize:13 }}>{v}</span></div>))}
      </div>
      <a href={`https://wa.me/${cleanNum(client.mobile)}?text=${buildMsg(client,owner,'welcome')}`} target="_blank" rel="noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'linear-gradient(135deg,#25D366,#128C7E)', borderRadius:12, padding:'14px', color:'#fff', textDecoration:'none', fontSize:14, fontWeight:800, marginBottom:10 }}><MessageCircle size={17}/> Send Welcome on WhatsApp 🎉</a>
      <button onClick={onClose} style={{ background:'rgba(255,255,255,.05)', border:'none', borderRadius:12, padding:'12px', color:'#94a3b8', fontSize:13, cursor:'pointer', width:'100%', fontFamily:'inherit' }}>Skip for now</button>
    </Sheet>
  );
}