import { Plus, Trash2 } from 'lucide-react';
import { CARD, IBtn, Btn, SettingRow } from './ui/Atoms';
import { BIZ_ICONS } from '../utils/helpers';
export default function SettingsTab({ settings, biz, owner, onLogout, onDelCourse, onDelSport, onDelField, onOpenModal }) {
  const bizIcon=BIZ_ICONS[biz]||'🏢';
  const AB=({onClick})=>(<button onClick={onClick} style={{ background:'#10b981', border:'none', borderRadius:8, padding:'7px 12px', color:'#fff', cursor:'pointer', fontSize:12, fontWeight:700, display:'flex', alignItems:'center', gap:4, fontFamily:'inherit' }}><Plus size={13}/> Add</button>);
  return (<>
    <h3 style={{ color:'#fff', fontSize:16, fontWeight:800, margin:'8px 0 2px' }}>⚙️ Settings</h3>
    <p style={{ color:'#64748b', fontSize:13, marginBottom:20 }}>Customise fields for {owner.businessName}</p>
    {biz==='coaching'&&(<div style={{ ...CARD, marginBottom:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}><div><div style={{ color:'#fff', fontWeight:700, fontSize:15 }}>📖 Available Courses</div><div style={{ color:'#64748b', fontSize:12, marginTop:2 }}>Courses clients can enroll in</div></div><AB onClick={()=>onOpenModal('addCourse')}/></div>
      {settings.courses.length===0&&<p style={{ color:'#64748b', fontSize:13, textAlign:'center' }}>No courses yet</p>}
      {settings.courses.map((c,i)=>(<div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 12px', background:'rgba(255,255,255,.04)', borderRadius:9, marginBottom:6 }}><span style={{ color:'#e2e8f0', fontSize:14 }}>📚 {c}</span><IBtn bg="rgba(239,68,68,.15)" onClick={()=>onDelCourse(i)}><Trash2 size={13} color="#ef4444"/></IBtn></div>))}
    </div>)}
    {biz==='club'&&(<div style={{ ...CARD, marginBottom:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}><div><div style={{ color:'#fff', fontWeight:700, fontSize:15 }}>🏅 Available Sports</div><div style={{ color:'#64748b', fontSize:12, marginTop:2 }}>Sports clients can choose from</div></div><AB onClick={()=>onOpenModal('addSport')}/></div>
      {settings.sports.length===0&&<p style={{ color:'#64748b', fontSize:13, textAlign:'center' }}>No sports yet</p>}
      {settings.sports.map((s,i)=>(<div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 12px', background:'rgba(255,255,255,.04)', borderRadius:9, marginBottom:6 }}><span style={{ color:'#e2e8f0', fontSize:14 }}>🎾 {s}</span><IBtn bg="rgba(239,68,68,.15)" onClick={()=>onDelSport(i)}><Trash2 size={13} color="#ef4444"/></IBtn></div>))}
    </div>)}
    <div style={{ ...CARD, marginBottom:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}><div><div style={{ color:'#fff', fontWeight:700, fontSize:15 }}>📌 Custom Fields</div><div style={{ color:'#64748b', fontSize:12, marginTop:2 }}>Extra fields in the client form</div></div><AB onClick={()=>onOpenModal('addField')}/></div>
      {settings.customFields.length===0&&<p style={{ color:'#64748b', fontSize:13, textAlign:'center' }}>No custom fields yet</p>}
      {settings.customFields.map(f=>(<div key={f.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 12px', background:'rgba(255,255,255,.04)', borderRadius:9, marginBottom:6 }}><div><span style={{ color:'#e2e8f0', fontSize:14 }}>📌 {f.label}</span><span style={{ color:'#64748b', fontSize:11, marginLeft:8, background:'rgba(255,255,255,.06)', padding:'2px 7px', borderRadius:6 }}>{f.type}</span></div><IBtn bg="rgba(239,68,68,.15)" onClick={()=>onDelField(f.id)}><Trash2 size={13} color="#ef4444"/></IBtn></div>))}
    </div>
    <div style={{ ...CARD, marginBottom:14 }}><div style={{ color:'#fff', fontWeight:700, fontSize:15, marginBottom:10 }}>🏢 Business Info</div><SettingRow emoji="👤" label="Owner" value={owner.ownerName}/><SettingRow emoji={bizIcon} label="Business" value={owner.businessName}/><SettingRow emoji="🏷️" label="Type" value={biz.charAt(0).toUpperCase()+biz.slice(1)}/></div>
    <Btn col="#ef4444" onClick={onLogout} sx={{ padding:'12px' }}>🚪 Logout</Btn>
  </>);
}