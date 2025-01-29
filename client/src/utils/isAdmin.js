// const isAdmin = (s)=>{
//     if(s === 'Admin'){
//         return true
//     }

//     return false
// }

// export default isAdmin


const isAdmin = (role) => {
    if(role === 'Admin'){
            return true
        }
        return false
    }
const isInventoryManager = (role) => role === 'Inventory Manager';
const isFinanceManager = (role) => role === 'Finance Manager';
const isDeliveryPartner = (role) => role === 'Delivery Partner';
const isUser = (role) => role === 'USER';

export { isAdmin, isInventoryManager, isFinanceManager, isDeliveryPartner,isUser };
