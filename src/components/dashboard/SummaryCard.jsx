// import React from "react";

// const SummaryCard = ({icon, text, number}) => {
//     return (
//         <div className="rounded flex bg-white">
//             <div className="text-3x1 flex justify-center items-center bg-teal-600 text-white px-4">
//                 {icon}
//             </div>
//             <div className="pl-4 py-1">
//                 <p className="text-lg font-semibold">{text}</p>
//                 <p className="text-xl font-bold">{number}</p>
//             </div>
//         </div>
//     )
// }

// export default SummaryCard


import React from "react";

// const SummaryCard = ({ icon, text, number }) => {
//     return (
//         <div className="flex bg-white rounded-lg shadow-md w-full p-4 min-w-[200px]">
//             <div className="text-3xl flex justify-center items-center bg-teal-600 text-white px-4 py-2 rounded-l-lg">
//                 {icon}
//             </div>
//             <div className="pl-4 py-1 flex flex-col justify-center">
//                 <p className="text-lg font-semibold text-gray-700">{text}</p>
//                 <p className="text-xl font-bold text-gray-900">{number}</p>
//             </div>
//         </div>
//     );
// };




const SummaryCard = ({ icon, text, number, color }) => {
    return (
        <div className="flex bg-white rounded-lg shadow-md w-[300px] p-2">
            <div className={`text-2xl flex justify-center items-center ${color} text-white px-3 py-1 rounded-l-lg`}>
                {icon}
            </div>
            <div className="pl-3 py-0 flex flex-col justify-center">
                <p className="text-sm font-semibold text-gray-700">{text}</p>
                <p className="text-lg font-bold text-gray-900">{number}</p>
            </div>
        </div>
    );
};

export default SummaryCard;
