import { Bell, LogOut } from 'lucide-react';
import { IBtn } from './ui/Atoms';
import { BIZ_ICONS } from '../utils/helpers';
export default function Header({ owner, alertsCount, onAlertsClick, onLogout }) {
  const bizIcon = BIZ_ICONS[owner.businessType]||'🏢';
  return (
    <div style={{ padding:'44px 20px 14px', background:'linear-gradient(180deg,rgba(16,185,129,.08) 0%,transparent 100%)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:40, height:40, background:'linear-gradient(135deg,#10b981,#059669)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{bizIcon}</div>
          <div>
            <div style={{ color:'#fff', fontWeight:800, fontSize:15 }}>{owner.businessName}</div>
            <div style={{ color:'#64748b', fontSize:12 }}>{owner.ownerName}</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {alertsCount>0&&<button style={{ position:'relative', background:'rgba(255,255,255,.08)', border:'none', borderRadius:9, padding:'9px', color:'#fff', cursor:'pointer', lineHeight:0 }} onClick={onAlertsClick}><Bell size={17}/><span style={{ position:'absolute', top:-4, right:-4, background:'#ef4444', borderRadius:'50%', width:17, height:17, fontSize:9, fontWeight:800, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>{alertsCount}</span></button>}
          <IBtn onClick={onLogout}><LogOut size={17}/></IBtn>
        </div>
      </div>
    </div>
  );
}