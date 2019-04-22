export const approvalPull = (token, pullKey, instance, repository,time,execdate,pullname,pullnik) => {
    return {
        type: 'PULLAPPROVAL',
        token: token,
        pullKey: pullKey,
        instance: instance,
        repository: repository,
        time: time,
        execdate: execdate,
        pullname: pullname,
        pullnik: pullnik
    };
  };
 
  export const acceptablePull = (token, pullKey, instance, repository, time, execplan, pullname, pullnik) => {
    return {
        type: 'PULLACCEPTABLE',
        token: token,
        pullKey: pullKey,
        instance: instance,
        repository: repository,
        time: time,
        execplan: execplan,
        pullname: pullname,
        pullnik: pullnik
    };
  };

  export const dropPull = (token, key, number, trxtype, instance, repocount, requested, requestedby, requestedbyNIK, approved, approvedby, approvedbyNIK, accepted, acceptedby, acceptedbyNIK) => {
    return {
        type: 'PULLDROP',
        token: token,
        key: key,
        number: number,
        trxtype: trxtype,
        instance: instance,
        repocount: repocount,
        requested: requested,
        requestedby: requestedby,
        requestedbyNIK: requestedbyNIK,
        approved: approved,
        approvedby: approvedby,
        approvedbyNIK: approvedbyNIK,
        accepted: accepted,
        acceptedby: acceptedby,
        acceptedbyNIK: acceptedbyNIK
    };
};

export const dropInit = (token, key, secretKey, step) => {
    return{
        type: 'PULLDROPINIT',
        token: token,
        key: key,
        secretKey: secretKey,
        step: step
    }
};

export const unsealInit = (token, key,number,trxtype,instance,repocount,requested,requestedby,requestedbyNIK,dropped,droppedby,droppedbyNIK) =>{
    return{
        type: 'PULLUNSEALINIT',
        token: token,
        key: key,
        number: number,
        trxtype: trxtype,
        instance: instance,
        repocount: repocount,
        requested: requested,
        requestedby: requestedby,
        requestedbyNIK: requestedbyNIK,
        dropped: dropped,
        droppedby: droppedby,
        droppedbyNIK: droppedbyNIK
    }
};

export const unsealedPull = (token, secretKey, step) => {
    return {
        type: 'PULLUNSEALED',
        token: token,
        secretKey: secretKey,
        step: step
    };
};
//   export const prePacking = (token, pushkey,repoID) => {
//     return {
//         type: 'PUSHPREPACKING',
//         token: token,
//         pushKey: pushkey,
//         repoID: repoID
//     };
//   };

//   export const tryPacking = (token, pushkey, passkey,repoID) => {
//     return {
//         type: 'PUSHTRYPACKING',
//         token: token,
//         pushKey: pushkey,
//         passkey: passkey,
//         repoID: repoID
//     };
//   };

//   export const Packing = (token, pushkey, passkey) => {
//     return {
//         type: 'PUSHPACKING',
//         token: token,
//         pushKey: pushkey,
//         passkey: passkey
//     };
//   };

//   export const Packed = (token, repoID) => {
//     return {
//         type: 'PUSHPACKED',
//         token: token,
//         repoID: repoID
//     };
//   };

//   export const Store = (token, pushkey, instance, repoID, packed, packedby, packedbyNIK, facman, facmanNIK) => {
//     return {
//         type: 'PUSHSTORE',
//         token: token,
//         pushKey: pushkey,
//         instance: instance,
//         repoID: repoID,
//         packed: packed,
//         packedby: packedby,
//         packedbyNIK: packedbyNIK,
//         facman: facman,
//         facmanNIK: facmanNIK
//     };
//   };

//   export const Cancel = (token, pushkey, instance, repoID, approved, approvedby, approvedbyNIK) =>{
//       return{
//           type: 'PUSHCANCEL',
//           token: token, 
//           pushKey: pushkey,
//           instance: instance,
//           repoID: repoID,
//           approved: approved,
//           approvedby: approvedby,
//           approvedbyNIK: approvedbyNIK
//       };
//   };

//   export const abortPush = (token, pushkey, instance, repoID, accepted, acceptedby, acceptedbyNIK) =>{
//     return{
//         type: 'PUSHABORT',
//         token: token, 
//         pushKey: pushkey,
//         instance: instance,
//         repoID: repoID,
//         accepted: accepted,
//         acceptedby: acceptedby,
//         acceptedbyNIK: acceptedbyNIK
//     };
// };

// export const documentPush = (token, dockey, boxID) =>{
//     return{
//         type: 'DOCUMENTPUSH',
//         token: token,
//         dockey: dockey,
//         boxID: boxID
//     };
// };