// const obj = {
//     issues: [
//         {
//             "code": "invalid_type",
//             "expected": "string",
//             "received": "undefined",
//             "path": [
//                 "firstname"
//             ],
//             "message": "Required"
//         },
//         {
//             "code": "invalid_type",
//             "expected": "string",
//             "received": "undefined",
//             "path": [
//                 "lastname"
//             ],
//             "message": "Required"
//         },
//         {
//             "code": "too_small",
//             "minimum": 6,
//             "type": "string",
//             "inclusive": true,
//             "exact": false,
//             "message": "Minimum six characters required",
//             "path": [
//                 "password"
//             ]
//         }
//     ]
// }

// console.log(obj.issues.map(errmsg => `${errmsg.path[0]}:${errmsg.message}`));

const path= require('path');

console.log(path.join(__dirname,'.','logs','logs.txt'));