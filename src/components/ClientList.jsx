import { Search, Plus, Edit2, Trash2, MessageCircle } from 'lucide-react';
import { CARD, IBtn, Tag } from './ui/Atoms';
import { getDaysLeft, statusOf, getClientRows } from '../utils/helpers';
export default function ClientList({ clients, biz, onAdd, onEdit, onDelete, onOpenNote, search, setSearch }) {
  return (<>
    <div style={{ display:'flex', gap:8, margin:'8px 0 14px' }}>
      <div style={{ flex:1, position:'relative' }}>
        <Search size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#64748b' }}/>
        <input placeholder="Search by name or mobile..." value={search} onChange={e=>setSearch(e.target.value)} style={{ width:'100%', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.09)', borderRadius:11, padding:'10px 12px 10px 34px', color:'#fff', fontSize:13, outline:'none', boxSizing:'border-box', fontFamily:'inherit' }}/>
      </div>
      <button onClick={onAdd} style={{ background:'#10b981', border:'none', borderRadius:11, padding:'10px 14px', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontWeight:700, fontSize:13, fontFamily:'inherit' }}><Plus size={15}/> Add</button>
    </div>
    {clients.length===0&&<div style={{ textAlign:'center', padding:'40px 0' }}><div style={{ fontSize:40, marginBottom:10 }}>🔍</div><p style={{ color:'#64748b', fontSize:14 }}>{search?'No clients found':'No clients yet. Add one!'}</p></div>}
    {clients.map(c=>{const days=getDaysLeft(c.expiryDate);const st=statusOf(days);const rows=getClientRows(c,biz);return(
      <div key={c.id} style={CARD}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
          <div><div style={{ color:'#fff', fontWeight:700, fontSize:15 }}>{c.name}</div><div style={{ color:'#64748b', fontSize:12, marginTop:2 }}>{c.mobile}</div></div>
          <Tag color={st.color} bg={st.bg}>{st.label}</Tag>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:10 }}>
          {rows.map(([l,v])=>(<div key={l} style={{ background:'rgba(255,255,255,.03)', borderRadius:8, padding:'7px 10px' }}><div style={{ color:'#64748b', fontSize:10, textTransform:'uppercase', letterSpacing:'.06em' }}>{l}</div><div style={{ color:'#e2e8f0', fontSize:12, fontWeight:600, marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{v}</div></div>))}
        </div>
        <div style={{ display:'flex', gap:7 }}>
          <button onClick={()=>onOpenNote(c)} style={{ flex:1, background:'#25D366', borderRadius:9, padding:'9px', color:'#fff', border:'none', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontFamily:'inherit' }}><MessageCircle size={14}/> WhatsApp</button>
          <IBtn onClick={()=>onEdit(c)}><Edit2 size={15}/></IBtn>
          <IBtn bg="rgba(239,68,68,.15)" onClick={()=>onDelete(c.id)}><Trash2 size={15} color="#ef4444"/></IBtn>
        </div>
      </div>
    );})}
  </>);
}