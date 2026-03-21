const TABS=[{id:'dashboard',e:'🏠',l:'Home'},{id:'clients',e:'👥',l:'Clients'},{id:'alerts',e:'🔔',l:'Alerts'},{id:'settings',e:'⚙️',l:'Settings'}];
export default function BottomNav({ tab, setTab, alertsCount }) {
  return (
    <div style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:480, background:'rgba(10,14,20,.97)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(255,255,255,.07)', display:'flex', padding:'6px 0 18px', zIndex:50 }}>
      {TABS.map(t=>{
        const label=t.id==='alerts'&&alertsCount>0?`Alerts(${alertsCount})`:t.l;
        return(<button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'8px 0', fontFamily:'inherit' }}><span style={{ fontSize:22 }}>{t.e}</span><span style={{ fontSize:10, fontWeight:tab===t.id?800:500, color:tab===t.id?'#10b981':'#64748b' }}>{label}</span></button>);
      })}
    </div>
  );
}