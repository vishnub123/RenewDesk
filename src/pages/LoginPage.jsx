import { Inp, Btn } from '../components/ui/Atoms';
export default function LoginPage({ lf, setLf, onLogin, onRegister }) {
  return (
    <div style={{ padding:'64px 24px 32px', minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center' }}>
      <div style={{ textAlign:'center', marginBottom:40 }}>
        <div style={{ width:72, height:72, background:'linear-gradient(135deg,#10b981,#059669)', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:34, margin:'0 auto 16px' }}>🔔</div>
        <h1 style={{ color:'#fff', fontSize:30, fontWeight:800, margin:'0 0 6px' }}>SubTrack</h1>
        <p style={{ color:'#64748b', margin:0, fontSize:14 }}>Smart subscription and payment tracker</p>
      </div>
      <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:20, padding:'24px 20px', marginBottom:16 }}>
        <Inp label="Business Name" placeholder="e.g. PowerFit Gym" value={lf.businessName} onChange={e=>setLf({...lf,businessName:e.target.value})}/>
        <Inp label="PIN" type="password" placeholder="Your PIN" value={lf.pin} onChange={e=>setLf({...lf,pin:e.target.value})}/>
        <Btn onClick={onLogin}>Login →</Btn>
        <p style={{ color:'#64748b', fontSize:12, textAlign:'center', margin:'12px 0 0' }}>Demo: <b style={{ color:'#94a3b8' }}>PowerFit Gym</b> / PIN: <b style={{ color:'#94a3b8' }}>1234</b></p>
      </div>
      <div style={{ textAlign:'center' }}><span style={{ color:'#64748b', fontSize:14 }}>New owner? </span><button style={{ background:'none', border:'none', color:'#10b981', cursor:'pointer', fontWeight:700, fontSize:14, fontFamily:'inherit' }} onClick={onRegister}>Create Account</button></div>
    </div>
  );
}