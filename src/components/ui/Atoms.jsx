import { X } from 'lucide-react';
export const S = {
  inp:{ width:'100%', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', borderRadius:10, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', fontFamily:'inherit' },
  sel:{ width:'100%', background:'#161b27', border:'1px solid rgba(255,255,255,.1)', borderRadius:10, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', fontFamily:'inherit' },
  lbl:{ display:'block', color:'#94a3b8', fontSize:11, marginBottom:5, textTransform:'uppercase', letterSpacing:'.07em', fontWeight:600 },
};
export const CARD = { background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:16, padding:'14px 16px', marginBottom:10 };
export const Inp = ({ label, ...p }) => (<div style={{ marginBottom:13 }}>{label&&<label style={S.lbl}>{label}</label>}<input style={S.inp} {...p} /></div>);
export const Sel = ({ label, children, ...p }) => (<div style={{ marginBottom:13 }}>{label&&<label style={S.lbl}>{label}</label>}<select style={S.sel} {...p}>{children}</select></div>);
export const Btn = ({ col='#10b981', sx={}, children, ...p }) => (<button style={{ background:col, border:'none', borderRadius:11, padding:'13px 20px', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', width:'100%', fontFamily:'inherit', ...sx }} {...p}>{children}</button>);
export const IBtn = ({ bg='rgba(255,255,255,.08)', children, ...p }) => (<button style={{ background:bg, border:'none', borderRadius:9, padding:'9px', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', lineHeight:0 }} {...p}>{children}</button>);
export const Tag = ({ color, bg, children }) => (<span style={{ color, fontSize:11, fontWeight:700, background:bg, padding:'3px 10px', borderRadius:20, whiteSpace:'nowrap' }}>{children}</span>);
export const Sheet = ({ title, onClose, children }) => (
  <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.78)', zIndex:300, display:'flex', alignItems:'flex-end', justifyContent:'center' }} onClick={onClose}>
    <div style={{ background:'#1a1f2e', borderRadius:'22px 22px 0 0', width:'100%', maxWidth:480, maxHeight:'92vh', overflowY:'auto', padding:'22px 22px 44px' }} onClick={e=>e.stopPropagation()}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
        <h2 style={{ color:'#fff', fontSize:17, fontWeight:800, margin:0 }}>{title}</h2>
        <IBtn onClick={onClose}><X size={16} /></IBtn>
      </div>
      {children}
    </div>
  </div>
);
export const SettingRow = ({ emoji, label, value }) => (
  <div style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid rgba(255,255,255,.05)' }}>
    <span style={{ color:'#64748b', fontSize:13 }}>{emoji} {label}</span>
    <span style={{ color:'#e2e8f0', fontSize:13, fontWeight:600 }}>{value}</span>
  </div>
);