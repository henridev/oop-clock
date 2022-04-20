import InitialWatchState from "./InitialWatchState";
import WatchState from "./WatchState";

class AddMinuteWatchState extends WatchState {
    public increase(): void {
        this.watchModel.addTime(60000) 
        this.watchModel.updateTime()
    }
    public next(): void {
        this.watchModel.state = new InitialWatchState()
    }
    public onStateChange(): void {
        this.watchModel.pause()
        this.watchModel.notifyWatchMode()
    }
}

export default AddMinuteWatchState