import { MessageCircle } from 'lucide-react';
import { Sheet, S } from '../ui/Atoms';
import { getDaysLeft, cleanNum } from '../../utils/helpers';
import { buildMsg } from '../../utils/messageBuilder';
export default function NoteModal({ client, owner, biz, noteText, setNoteText, onClose }) {
  const days=getDaysLeft(client.expiryDate);
  const rows=[['📱','Mobile',client.mobile],...(biz==='coaching'&&client.courseName?[['📖','Course',client.courseName]]:[]),...(biz==='club'&&client.sportName?[['🏅','Sport',client.sportName]]:[]),...(biz==='hostel'&&client.roomNo?[['🚪','Room',client.roomNo]]:[]),['💰','Amount',`Rs.${client.amount}`],['🗓️','Expires',client.expiryDate],days<0?['⚠️','Status',`Expired ${Math.abs(days)}d ago`]:['⏳','Days Left',`${days} day(s)`]];
  return (
    <Sheet title={`💬 Send to ${client.name}`} onClose={onClose}>
      <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:14, padding:'12px 14px', marginBottom:16 }}>
        {rows.map(([em,l,v])=>(<div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,.05)' }}><span style={{ color:'#64748b', fontSize:13 }}>{em} {l}</span><span style={{ color:'#e2e8f0', fontSize:13, fontWeight:600 }}>{v}</span></div>))}
      </div>
      <div style={{ marginBottom:16 }}>
        <label style={S.lbl}>✏️ Personal Note (optional)</label>
        <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="e.g. Special discount this month!" rows={4} style={{ width:'100%', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', borderRadius:10, padding:'11px 14px', color:'#fff', fontSize:13, outline:'none', resize:'none', boxSizing:'border-box', fontFamily:'inherit' }}/>
        <p style={{ color:'#64748b', fontSize:11, margin:'6px 0 0' }}>This note will be appended to the WhatsApp message.</p>
      </div>
      <a href={`https://wa.me/${cleanNum(client.mobile)}?text=${buildMsg(client,owner,'alert',noteText)}`} target="_blank" rel="noreferrer" onClick={onClose} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'linear-gradient(135deg,#25D366,#128C7E)', borderRadius:12, padding:'14px', color:'#fff', textDecoration:'none', fontSize:14, fontWeight:800, marginBottom:10 }}><MessageCircle size={17}/> Send on WhatsApp {noteText.trim()?'with Note':''}</a>
      <button onClick={onClose} style={{ background:'rgba(255,255,255,.05)', border:'none', borderRadius:12, padding:'12px', color:'#94a3b8', fontSize:13, cursor:'pointer', width:'100%', fontFamily:'inherit' }}>Cancel</button>
    </Sheet>
  );
}