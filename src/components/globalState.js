import { atom } from 'recoil'


export const clickedCBState = atom({
    key: 'clickedCB',
    default:''
})

export const showActions = atom({
    key: 'showActions',
    default:''
})

export const lights = atom({
    key: 'lights',
    default:''
})

export const launchpads = atom({
    key: 'launchpads',
    default:''
})

export const stations = atom({
    key: 'stations',
    default:''
})

export const closedAudioG = atom({
    key: 'closedAudio',
    default: true
})

export const pinLocation = atom({
    key: 'pinLocation',
    default: [25.9875, -97.186389]
})

