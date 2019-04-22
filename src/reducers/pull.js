const defaultState = {
    token: '',
    pullKey: '',
    instance: '',
    time: '',
    execdate: '',
    execplan:'',
    pullname: '',
    pullnik: '',
    repository: '',
    key: '',
    number: '',
    trxtype: '',
    repocount: '',
    requested: '',
    requestedby: '',
    requestedbyNIK: '',
    approved: '',
    approvedby: '',
    approvedbyNIK: '',
    accepted: '',
    acceptedby: '',
    acceptedbyNIK: '',
    secretKey: '',
    step: '',
    dropped: '',
    droppedby: '',
    droppedbyNIK: '',
};


function reducerPull(state = defaultState, action) {
    switch (action.type) {
        case 'PULLAPPROVAL':
            return Object.assign({}, state, {
                token: action.token,
                pullKey: action.pullKey,
                instance: action.instance,
                repository: action.repository,
                time: action.time,
                execdate: action.execdate,
                pullname: action.pullname,
                pullnik: action.pullnik
            });
        case 'PULLACCEPTABLE':
            return Object.assign({}, state, {
                token: action.token,
                pullKey: action.pullKey,
                instance: action.instance,
                repository: action.repository,
                time: action.time,
                execplan: action.execplan,
                pullname: action.pullname,
                pullnik: action.pullnik
            });
        case 'PULLDROP' :
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
        case 'PULLDROPINIT' :
            return Object.assign({}, state, {
                token: action.token,
                key: action.key,
                secretKey: action.secretKey,
                step: action.step
            });
        case 'PULLUNSEALINIT' :
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
                dropped: action.dropped,
                droppedby: action.droppedby,
                droppedbyNIK: action.droppedbyNIK
            });
        case 'PULLUNSEALED':
            return Object.assign({}, state, {
                token: action.token,
                secretKey: action.secretKey,
                step: action.step
            });
        // case 'PUSHPREPACKING':
        //     return Object.assign({}, state, {
        //         token: action.token,
        //         pushKey: action.pushKey,
        //         repoID: action.repoID
        //     });
        // case 'PUSHTRYPACKING':
        //     return Object.assign({}, state, {
        //         token: action.token,
        //         pushKey: action.pushKey,
        //         passkey: action.passkey,
        //         repoID: action.repoID
        //     });
        // case 'PUSHPACKING':
        //     return Object.assign({}, state, {
        //         token: action.token,
        //         pushKey: action.pushKey,
        //         passkey: action.passkey
        //     });
        // case 'PUSHPACKED':
        //     return Object.assign({}, state, {
        //         token: action.token,
        //         repoID: action.repoID
        //     });
        // case 'PUSHSTORE':
        //     return Object.assign({}, state, {
        //         token: action.token,
        //         pushKey: action.pushKey,
        //         instance: action.instance,
        //         repoID: action.repoID,
        //         packed: action.packed,
        //         packedby: action.packedby,
        //         packedbyNIK: action.packedbyNIK,
        //         facman: action.facman,
        //         facmanNIK: action.facmanNIK
        //     });
        // case 'PUSHCANCEL':
        //     return Object.assign({}, state, {
        //         token: action.token,
        //         pushKey: action.pushKey,
        //         instance: action.instance,
        //         repoID: action.repoID,
        //         approved: action.approved,
        //         approvedby: action.approvedby,
        //         approvedbyNIK: action.approvedbyNIK
        //     })
        // case 'PUSHABORT':
        //     return Object.assign({}, state, {
        //         token: action.token,
        //         pushKey: action.pushKey,
        //         instance: action.instance,
        //         repoID: action.repoID,
        //         accepted: action.accepted,
        //         acceptedby: action.acceptedby,
        //         acceptedbyNIK: action.acceptedbyNIK
        //     })
        // case 'DOCUMENTPUSH':
        //     return Object.assign({},state,{
        //         token: action.token,
        //         dockey: action.dockey,
        //         boxID: action.boxID
        //     })
        default:
            return state;
    }
}


export default reducerPull;  