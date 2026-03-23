export const defaultSettings = (biz) => ({
  courses: biz==='coaching' ? ['Mathematics','Physics','Chemistry','Biology','English','Computer Science'] : [],
  sports:  biz==='club'     ? ['Cricket','Badminton','Tennis','Football','Basketball','Swimming'] : [],
  customFields: [],
});
export const INIT_OWNERS = [
  { id:'1', ownerName:'Demo Owner', businessName:'PowerFit Gym', businessType:'gym', pin:'1234', authMethod: 'pin' },
  { id:'2', ownerName:'Demo User', businessName:'Tech Solutions', businessType:'other', email:'demo@example.com', password:'Demo@123', authMethod: 'email' }
];
export const INIT_CLIENTS = { 
  '1': [
    { id:'c1', name:'Rahul Sharma', mobile:'919876543210', weight:'72', amount:'1500', startDate:'2026-02-17', durationValue:'2', durationType:'months', expiryDate:'2026-04-17', notes:'', customData:{} },
    { id:'c2', name:'Priya Patel',  mobile:'919876543211', weight:'58', amount:'1500', startDate:'2026-03-10', durationValue:'1', durationType:'months', expiryDate:'2026-03-19', notes:'Morning batch', customData:{} },
    { id:'c3', name:'Arjun Singh',  mobile:'919876543212', weight:'85', amount:'2000', startDate:'2026-02-01', durationValue:'1', durationType:'months', expiryDate:'2026-03-01', notes:'', customData:{} },
  ],
  '2': []
};
export const INIT_SETTINGS = { '1': defaultSettings('gym'), '2': defaultSettings('other') };
export const EMPTY_FORM = { name:'', mobile:'', weight:'', courseName:'', sportName:'', roomNo:'', advanceAmount:'', maintenanceAmount:'', parkingCharges:'', waterBill:'', amount:'', startDate:'', durationType:'months', durationValue:'1', notes:'', customData:{} };