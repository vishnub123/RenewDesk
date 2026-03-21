export const getDaysLeft = (ex) => {
  const t = new Date(); t.setHours(0,0,0,0);
  const e = new Date(ex); e.setHours(0,0,0,0);
  return Math.ceil((e - t) / 86400000);
};
export const statusOf = (d) =>
  d < 0  ? { label:'Expired',       color:'#ef4444', bg:'rgba(239,68,68,.12)'  } :
  d <= 3 ? { label:'Critical',      color:'#f97316', bg:'rgba(249,115,22,.12)' } :
  d <= 7 ? { label:'Expiring Soon', color:'#eab308', bg:'rgba(234,179,8,.12)'  } :
           { label:'Active',        color:'#10b981', bg:'rgba(16,185,129,.12)' };
export const calcExpiry = (start, type, val) => {
  const d = new Date(start);
  type === 'months' ? d.setMonth(d.getMonth()+parseInt(val)) : d.setDate(d.getDate()+parseInt(val));
  return d.toISOString().split('T')[0];
};
export const todayStr = () => new Date().toISOString().split('T')[0];
export const cleanNum = (n) => n.replace(/\D/g,'');
export const uid = () => Date.now().toString(36)+Math.random().toString(36).slice(2,5);
export const BIZ_ICONS = { gym:'🏋️', hostel:'🏠', coaching:'📚', club:'🎾', other:'🏢' };
export const getClientRows = (c, biz) => {
  const rows = [
    ['Amount', biz==='hostel' ? `Rs.${c.amount}/mo` : `Rs.${c.amount}`],
    ['Expiry', c.expiryDate],
    ['Duration', `${c.durationValue} ${c.durationType}`],
  ];
  if (biz==='gym'&&c.weight)           rows.push(['Weight',`${c.weight} kg`]);
  if (biz==='coaching'&&c.courseName)  rows.push(['Course',c.courseName]);
  if (biz==='club'&&c.sportName)       rows.push(['Sport',c.sportName]);
  if (biz==='hostel') {
    if (c.roomNo)            rows.push(['Room',c.roomNo]);
    if (c.advanceAmount)     rows.push(['Advance',`Rs.${c.advanceAmount}`]);
    if (c.maintenanceAmount) rows.push(['Maint.',`Rs.${c.maintenanceAmount}`]);
    if (c.parkingCharges)    rows.push(['Parking',`Rs.${c.parkingCharges}`]);
    if (c.waterBill)         rows.push(['Water',`Rs.${c.waterBill}`]);
  }
  if (c.customData) Object.entries(c.customData).forEach(([l,v])=>{ if(v) rows.push([l,v]); });
  if (c.notes) rows.push(['Notes',c.notes]);
  return rows;
};