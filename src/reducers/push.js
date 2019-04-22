const defaultState = {
    token: '',
    pushKey: '',
    instance: '',
    time: '',
    execdate: '',
    pushname: '',
    pushnik: '',
    pushAccKey: '',
    execplan: '',
    reqname: '',
    preqnik: '',
    repoID: '',
    pin: '',
    passkey: '',
    user2key: '',
    storagekey: '',
    packed: '',
    packedby: '',
    packedbyNIK: '',
    facman: '',
    facmanNIK: '',
    approved: '',
    approvedby: '',
    approvedbyNIK: '',
    accepted: '',
    acceptedby: '',
    acceptedbyNIK: '',
    doctitle: '',
    doctype: '',
    dockey: '',
    boxID: '',
    key: '',
    number: '',
    trxtype: '',
    state: '',
    statetime: '',
    repocount: '',
    requested: '',
    requestedby: '',
    requestedbyNIK: '',
    ops: '',
    reason: '',
    secretKey: '',
    step: '',
    sealed: '',
    sealedby: '',
    sealedbyNIK: '',
    storagekey: '',
    fmtID: '',
    lastTrx: '',
    lastState: '',
    returning: false,
};


function reducerPush(state = defaultState, action) {
    switch (action.type) {
        case 'PUSHAPPROVAL':
            return Object.assign({}, state, {
                token: action.token,
                key: action.key,
                trxtype: action.trxtype,
                number: action.number,
                time: action.time,
                execdate: action.execdate,
                name: action.name,
                nik: action.nik,
                ops: action.ops,
                reason: action.reason
            });
        case 'PUSHACCEPTABLE':
            return Object.assign({}, state, {
                token: action.token,
                key: action.key,
                number: action.number,
                trxtype: action.trxtype,
                instance: action.instance,
                repocount: action.repocount,
                requested: action.requested,
                requestedby: action.requestedby,
                requestedbyNIK: action.requestedbyNIK,
                approved: action.approved,
                approvedby: action.approvedby,
                approvedbyNIK: action.approvedbyNIK
            });
        case 'PUSHHISTORY':
            return Object.assign({}, state, {
                token: action.token,
                key: action.key,
                number: action.number,
                trxtype: action.trxtype,
                instance: action.instance,
                state: action.state,
                statetime: action.statetime
            });
        case 'PUSHMANIFESTING':
            return Object.assign({}, state, {
                token: action.token,
                key: action.key,
                number: action.number,
                trxtype: action.trxtype,
                instance: action.instance,
                repocount: action.repocount,
                requested: action.requested,
                requestedby: action.requestedby,
                requestedbyNIK: action.requestedbyNIK,
                approved: action.approved,
                approvedby: action.approvedby,
                approvedbyNIK: action.approvedbyNIK,
                accepted: action.accepted,
                acceptedby: action.acceptedby,
                acceptedbyNIK: action.acceptedbyNIK,
                returning: action.returning
            });
        case 'PUSHMANIFESTED':
            return Object.assign({}, state, {
                token: action.token,
                key: action.key,
                repoID: action.repoID,
                returning: action.returning
            });
        case 'PUSHSEAL':
            return Object.assign({}, state, {
                token: action.token,
                key: action.key,
                number: action.number,
                trxtype: action.trxtype,
                instance: action.instance,
                repocount: action.repocount,
                requested: action.requested,
                requestedby: action.requestedby,
                requestedbyNIK: action.requestedbyNIK,
                approved: action.approved,
                approvedby: action.approvedby,
                approvedbyNIK: action.approvedbyNIK,
                accepted: action.accepted,
                acceptedby: action.acceptedby,
                acceptedbyNIK: action.acceptedbyNIK
            });
        case 'PUSHACCEPTED':
            return Object.assign({}, state, {
                token: action.token,
                key: action.key,
                secretKey: action.secretKey,
                step: action.step
            });
        case 'PUSHSEALED':
            return Object.assign({}, state, {
                token: action.token,
                secretKey: action.secretKey,
                step: action.step
            });
        case 'UNVERIFIEDREPO':
            return Object.assign({}, state, {
                token: action.token,
                key: action.key
            });
        case 'PUSHSTOREINIT':
            return Object.assign({}, state, {
                token: action.token,
                key: action.key,
                secretKey: action.secretKey,
                storagekey: action.storagekey,
                step: action.step
            });
        case 'PUSHSTORE':
            return Object.assign({}, state, {
                token: action.token,
                key: action.key,
                number: action.number,
                trxtype: action.trxtype,
                instance: action.instance,
                repocount: action.repocount,
                requested: action.requested,
                requestedby: action.requestedby,
                requestedbyNIK: action.requestedbyNIK,
                sealed: action.sealed,
                sealedby: action.sealedby,
                sealedbyNIK: action.sealedbyNIK
            });
        case 'PUSHCANCEL':
            return Object.assign({}, state, {
                token: action.token,
                pushKey: action.pushKey,
                trxtype: action.trxtype,
                number: action.number,
                instance: action.instance,
                repoID: action.repoID,
                approved: action.approved,
                approvedby: action.approvedby,
                approvedbyNIK: action.approvedbyNIK
            })
        case 'PUSHABORT':
            return Object.assign({}, state, {
                token: action.token,
                pushKey: action.pushKey,
                trxtype: action.trxtype,
                number: action.number,
                instance: action.instance,
                repoID: action.repoID,
                accepted: action.accepted,
                acceptedby: action.acceptedby,
                acceptedbyNIK: action.acceptedbyNIK
            })
        case 'DOCUMENTPUSH':
            return Object.assign({}, state, {
                token: action.token,
                doctitle: action.doctitle,
                doctype: action.doctype,
                dockey: action.dockey,
                boxID: action.boxID
            })
        case 'PUSHDISPOSE':
            return Object.assign({}, state, {
                token: action.token,
                key: action.key,
                instance: action.instance,
                fmtID: action.fmtID,
                lastTrx: action.lastTrx,
                lastState: action.lastState
            })
        default:
            return state;
    }
}


export default reducerPush;  