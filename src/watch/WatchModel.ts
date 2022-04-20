import IWatchInfo from "./IWatchInfo"
import WatchState from "./WatchState"
import WatchView from "./WatchView"

class WatchModel {
    private watch?: WatchView
    private lastTime: number
    private timer: NodeJS.Timer
    private _startTime = new Date().valueOf()
    private _state: WatchState
    private _watchInfo: IWatchInfo
    private _watchChanges: Record<keyof IWatchInfo, boolean>

    constructor(state: WatchState) {
        this.state = state
        this.init()
        this.startTimer()
    }
    
    startTimer(){
        this.timer = setInterval(() => {
            this._startTime += 100
            this.updateTime()
        }, 100)
    }

    registerWatch(watch: WatchView) {
        this.watch = watch
    }

    notifyWatchTime(): void {
        if(!!this.watch) this.watch.updateTimeView(this)
    }
    notifyWatchMode(): void {
        if(!!this.watch) this.watch.updateMode(this)
    }

    nextMode() {
        this.state.next()
        this.state.onStateChange()
    }

    increase() {
        this.state.increase()
    }

    pause() {
        clearInterval(this.timer)
    }

    updateTime() {
        this.updateHours()
        this.updateMinutes()
        this.updateSeconds()
        this.notifyWatchTime()
        this.setWatchChange(false)
        this.lastTime = this._startTime
    }

    addTime(ms: number) {
        this._startTime += ms
    }

    private updateHours() {
        const lastH = this.last.getHours().toString()
        const nowH = this.time.getHours().toString()
        this._watchInfo.hours = nowH
        this._watchChanges.hours = lastH !== nowH
    }
    private updateMinutes() {
        const lastM = this.last.getMinutes().toString()
        const nowM = this.time.getMinutes().toString()
        this._watchInfo.minutes = nowM
        this._watchChanges.minutes = lastM !== nowM
    }
    private updateSeconds() {
        const lastS = this.last.getSeconds().toString()
        const nowS = this.time.getSeconds().toString()
        this._watchInfo.seconds = nowS
        this._watchChanges.seconds = lastS !== nowS
    }

    private init(){
        const last = new Date(0)
        last.setUTCHours(-1)
        this.lastTime = last.valueOf()
        this._startTime = new Date().valueOf()
        this._watchInfo = {
            hours: '00',
            minutes: '00',
            seconds: '00'
        }
        this.setWatchChange()
    }


    private setWatchChange(val = true) {
        this._watchChanges = {
            hours: val,
            minutes: val,
            seconds: val
        }
    }

    set state(state: WatchState) {
        this._state = state
        this._state.setWatchModel(this)
    }

    get state() {
        return this._state
    }

    get watchInfo(){
        return this._watchInfo
    }

    get watchChanges(){
        return this._watchInfo
    }

    get last(){
        return new Date(this.lastTime)
    }

    get time(){
        return new Date(this._startTime)
    }
}


export default WatchModel