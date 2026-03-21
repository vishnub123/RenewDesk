import { getDaysLeft, BIZ_ICONS } from './helpers';
export const buildMsg = (c, owner, type, note='') => {
  const icon = BIZ_ICONS[owner.businessType]||'🏢';
  const biz = owner.businessType;
  const days = getDaysLeft(c.expiryDate);
  const extra = [];
  if (biz==='gym'&&c.weight)           extra.push(`⚖️ *Weight:* ${c.weight} kg`);
  if (biz==='coaching'&&c.courseName)  extra.push(`📖 *Course:* ${c.courseName}`);
  if (biz==='club'&&c.sportName)       extra.push(`🏅 *Sport:* ${c.sportName}`);
  if (biz==='hostel') {
    if (c.roomNo)            extra.push(`🚪 *Room/Flat:* ${c.roomNo}`);
    if (c.advanceAmount)     extra.push(`💵 *Advance:* Rs.${c.advanceAmount}`);
    if (c.maintenanceAmount) extra.push(`🔧 *Maintenance:* Rs.${c.maintenanceAmount}`);
    if (c.parkingCharges)    extra.push(`🚗 *Parking:* Rs.${c.parkingCharges}`);
    if (c.waterBill)         extra.push(`💧 *Water Bill:* Rs.${c.waterBill}`);
  }
  if (c.customData) Object.entries(c.customData).forEach(([l,v])=>{ if(v) extra.push(`📌 *${l}:* ${v}`); });
  const noteLines = note.trim() ? ['',`📝 *Note from ${owner.businessName}:*`,note.trim()] : [];
  if (type==='welcome') {
    const footer = biz==='gym'?'Stay consistent, stay strong! 💪':biz==='hostel'?'Welcome home! 🏠':biz==='coaching'?'Learning is the best investment! 📚':biz==='club'?'Play hard, train harder! 🏅':'We are committed to your best experience! 🌟';
    return encodeURIComponent([`🎉 *Welcome to ${owner.businessName}!* ${icon}`,'',`Hello *${c.name}*, we are thrilled to have you! 🙌`,'','📋 *Your Membership Summary:*','━━━━━━━━━━━━━━━━━━━',`👤 *Name:* ${c.name}`,`📱 *Mobile:* ${c.mobile}`,...extra,`💰 *Amount:* Rs.${c.amount}`,`📅 *Start Date:* ${c.startDate}`,`⏳ *Duration:* ${c.durationValue} ${c.durationType}`,`🗓️ *Valid Until:* ${c.expiryDate}`,'━━━━━━━━━━━━━━━━━━━','',footer,...noteLines,'','For queries, contact us anytime.',`Thank you for choosing *${owner.businessName}*! 🙏`].join('\n'));
  }
  const header = days<0?`⚠️ *Subscription Expired!* ${icon}`:days<=3?`🚨 *URGENT: Expiring in ${days} Day(s)!* ${icon}`:`📢 *Membership Expiry Reminder* ${icon}`;
  const urgency = days<0?['❌ Access may be restricted. Renew today! 🔄']:days<=3?['⚡ Do not stop now — renew immediately! ✅']:['🌟 Keep the momentum — renew before it expires! 🔄'];
  return encodeURIComponent([header,'',`Hi *${c.name}*, reminder from *${owner.businessName}*!`,'','━━━━━━━━━━━━━━━━━━━',`👤 *Name:* ${c.name}`,`📱 *Mobile:* ${c.mobile}`,...extra,`🗓️ *Expiry:* ${c.expiryDate}`,days<0?`📆 *Expired:* ${Math.abs(days)} day(s) ago`:`📅 *Remaining:* ${days} day(s)`,`💰 *Renewal Amount:* Rs.${c.amount}`,'━━━━━━━━━━━━━━━━━━━','',...urgency,...noteLines,'','📞 Contact us to renew. Thank you! 🙏'].join('\n'));
};