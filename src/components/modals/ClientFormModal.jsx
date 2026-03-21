import { Inp, Sel, Btn, Sheet } from '../ui/Atoms';
import { calcExpiry } from '../../utils/helpers';
function TypeFields({ biz, cf, setCf, settings }) {
  if (biz==='gym') return <Inp label="Weight (kg)" type="number" placeholder="Current weight" value={cf.weight} onChange={e=>setCf({...cf,weight:e.target.value})}/>;
  if (biz==='coaching') return (<Sel label="Course *" value={cf.courseName} onChange={e=>setCf({...cf,courseName:e.target.value})}><option value="">— Select a course —</option>{settings.courses.map(c=><option key={c} value={c}>{c}</option>)}</Sel>);
  if (biz==='club') return (<Sel label="Sport *" value={cf.sportName} onChange={e=>setCf({...cf,sportName:e.target.value})}><option value="">— Select a sport —</option>{settings.sports.map(s=><option key={s} value={s}>{s}</option>)}</Sel>);
  if (biz==='hostel') return (<><Inp label="Room / Flat No." placeholder="e.g. 201" value={cf.roomNo} onChange={e=>setCf({...cf,roomNo:e.target.value})}/><Inp label="Advance Amount (Rs.)" type="number" value={cf.advanceAmount} onChange={e=>setCf({...cf,advanceAmount:e.target.value})}/><Inp label="Maintenance (Rs./mo)" type="number" value={cf.maintenanceAmount} onChange={e=>setCf({...cf,maintenanceAmount:e.target.value})}/><Inp label="Parking Charges (Rs.)" type="number" value={cf.parkingCharges} onChange={e=>setCf({...cf,parkingCharges:e.target.value})}/><Inp label="Water Bill (Rs.)" type="number" value={cf.waterBill} onChange={e=>setCf({...cf,waterBill:e.target.value})}/></>);
  return null;
}
export default function ClientFormModal({ cf, setCf, editId, biz, settings, onSave, onClose }) {
  const preview = cf.startDate&&cf.durationValue ? calcExpiry(cf.startDate,cf.durationType,cf.durationValue) : null;
  return (
    <Sheet title={editId?'Edit Client':'Add New Client'} onClose={onClose}>
      <Inp label="Full Name *" placeholder="Client's full name" value={cf.name} onChange={e=>setCf({...cf,name:e.target.value})}/>
      <Inp label="Mobile (WhatsApp) *" placeholder="e.g. 919876543210" value={cf.mobile} onChange={e=>setCf({...cf,mobile:e.target.value})}/>
      <TypeFields biz={biz} cf={cf} setCf={setCf} settings={settings}/>
      <Inp label={biz==='hostel'?'Monthly Rent (Rs.) *':'Amount Paid (Rs.) *'} type="number" value={cf.amount} onChange={e=>setCf({...cf,amount:e.target.value})}/>
      <Inp label="Start Date *" type="date" value={cf.startDate} onChange={e=>setCf({...cf,startDate:e.target.value})}/>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        <Inp label="Duration *" type="number" min="1" value={cf.durationValue} onChange={e=>setCf({...cf,durationValue:e.target.value})}/>
        <Sel label="Period" value={cf.durationType} onChange={e=>setCf({...cf,durationType:e.target.value})}><option value="days">Days</option><option value="months">Months</option></Sel>
      </div>
      {settings.customFields.map(f=>(<Inp key={f.id} label={f.label} type={f.type} placeholder={`Enter ${f.label.toLowerCase()}`} value={(cf.customData||{})[f.label]||''} onChange={e=>setCf({...cf,customData:{...(cf.customData||{}),[f.label]:e.target.value}})}/>))}
      <Inp label="Notes (optional)" placeholder="Any extra notes..." value={cf.notes} onChange={e=>setCf({...cf,notes:e.target.value})}/>
      {preview&&<div style={{ background:'rgba(16,185,129,.1)', border:'1px solid rgba(16,185,129,.25)', borderRadius:10, padding:'10px 14px', marginBottom:14, color:'#10b981', fontSize:13 }}>📅 Expires on: <strong>{preview}</strong></div>}
      <Btn onClick={onSave}>{editId?'✅ Update Client':'➕ Add Client'}</Btn>
    </Sheet>
  );
}