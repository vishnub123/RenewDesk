import { Inp, Sel, Btn, Sheet } from '../ui/Atoms';
export default function AddItemModal({ type, onClose, onAddCourse, onAddSport, onAddField, newItemTxt, setNewItemTxt, newFldLabel, setNewFldLabel, newFldType, setNewFldType }) {
  if (!type) return null;
  if (type==='addCourse') return (<Sheet title="📖 Add Course" onClose={onClose}><Inp label="Course Name" placeholder="e.g. Mathematics" value={newItemTxt} onChange={e=>setNewItemTxt(e.target.value)}/><Btn onClick={onAddCourse}>Add Course</Btn></Sheet>);
  if (type==='addSport')  return (<Sheet title="🏅 Add Sport"  onClose={onClose}><Inp label="Sport Name"  placeholder="e.g. Swimming"    value={newItemTxt} onChange={e=>setNewItemTxt(e.target.value)}/><Btn onClick={onAddSport}>Add Sport</Btn></Sheet>);
  if (type==='addField')  return (<Sheet title="📌 Add Custom Field" onClose={onClose}><Inp label="Field Label" placeholder="e.g. Blood Group" value={newFldLabel} onChange={e=>setNewFldLabel(e.target.value)}/><Sel label="Field Type" value={newFldType} onChange={e=>setNewFldType(e.target.value)}><option value="text">Text</option><option value="number">Number</option></Sel><p style={{ color:'#64748b', fontSize:12, margin:'-6px 0 14px' }}>Appears in client form for all clients.</p><Btn onClick={onAddField}>Add Field</Btn></Sheet>);
  return null;
}