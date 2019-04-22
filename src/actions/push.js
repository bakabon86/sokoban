export const approvalPush = (token, key, trxtype, number, time, execdate, name, nik, ops, reason) => {
    return {
        type: 'PUSHAPPROVAL',
        token: token,
        key: key,
        trxtype: trxtype,
        number: number,
        time: time,
        execdate: execdate,
        name: name,
        nik: nik,
        ops: ops,
        reason: reason
    };
};

export const acceptablePush = (token, key, number, trxtype, instance, repocount, requested, requestedby, requestedbyNIK, approved, approvedby, approvedbyNIK) => {
    return {
        type: 'PUSHACCEPTABLE',
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
        approvedbyNIK: approvedbyNIK
    };
};

export const historyPush = (token, key, number, trxtype, instance, state, statetime) => {
    return {
        type: 'PUSHHISTORY',
        token: token,
        key: key,
        number: number,
        trxtype: trxtype,
        instance: instance,
        state: state,
        statetime: statetime
    };
};

export const manifestingPush = (token, key, number, trxtype, instance, repocount, requested, requestedby, requestedbyNIK, approved, approvedby, approvedbyNIK, accepted, acceptedby, acceptedbyNIK, returning) => {
    return {
        type: 'PUSHMANIFESTING',
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
        acceptedbyNIK: acceptedbyNIK,
        returning: returning
    };
};

export const manifestedPush = (token, key, repoID, returning) => {
    return {
        type: 'PUSHMANIFESTED',
        token: token,
        key: key,
        repoID: repoID,
        returning: returning
    };
}

export const sealPush = (token, key, number, trxtype, instance, repocount, requested, requestedby, requestedbyNIK, approved, approvedby, approvedbyNIK, accepted, acceptedby, acceptedbyNIK) => {
    return {
        type: 'PUSHSEAL',
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

export const acceptedPush = (token, key, secretkey, step) =>{
    return{
        type: 'PUSHACCEPTED',
        token: token,
        key: key,
        secretKey: secretkey,
        step: step
    }
};

export const sealedPush = (token, secretKey, step) => {
    return {
        type: 'PUSHSEALED',
        token: token,
        secretKey: secretKey,
        step: step
    };
};

export const unverifiedRepo = (token, key) => {
    return {
        type: 'UNVERIFIEDREPO',
        token: token,
        key: key
    };
};

export const storeInit = (token,key,secretKey,storagekey,step) => {
    return {
        type: 'PUSHSTOREINIT',
        token: token,
        key: key,
        secretKey: secretKey,
        storagekey: storagekey,
        step: step
    };
};

export const Store = (token, key, number,trxtype,instance,repocount,requested,requestedby,requestedbyNIK,sealed,sealedby,sealedbyNIK) => {
    return {
        type: 'PUSHSTORE',
        token: token,
        key: key,
        number: number,
        trxtype: trxtype,
        instance: instance,
        repocount: repocount,
        requested: requested,
        requestedby: requestedby,
        requestedbyNIK: requestedbyNIK,
        sealed: sealed,
        sealedby: sealedby,
        sealedbyNIK: sealedbyNIK
    };
};

export const Cancel = (token, pushkey,trxtype,number, instance, repoID, approved, approvedby, approvedbyNIK) => {
    return {
        type: 'PUSHCANCEL',
        token: token,
        pushKey: pushkey,
        trxtype: trxtype,
        number: number,
        instance: instance,
        repoID: repoID,
        approved: approved,
        approvedby: approvedby,
        approvedbyNIK: approvedbyNIK
    };
};

export const abortPush = (token, pushkey,trxtype,number, instance, repoID, accepted, acceptedby, acceptedbyNIK) => {
    return {
        type: 'PUSHABORT',
        token: token,
        pushKey: pushkey,
        trxtype: trxtype,
        number: number,
        instance: instance,
        repoID: repoID,
        accepted: accepted,
        acceptedby: acceptedby,
        acceptedbyNIK: acceptedbyNIK
    };
};

export const documentPush = (token, doctitle, doctype, dockey, boxID) => {
    return {
        type: 'DOCUMENTPUSH',
        token: token,
        doctitle: doctitle,
        doctype: doctype,
        dockey: dockey,
        boxID: boxID
    };
};

export const disposablePush = (token,key,instance,fmtID,lastTrx,lastState) => {
    return {
        type: 'PUSHDISPOSE',
        token: token,
        key: key,
        instance: instance,
        fmtID: fmtID,
        lastTrx: lastTrx,
        lastState: lastState
    };
};