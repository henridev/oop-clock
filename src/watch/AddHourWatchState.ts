import AddMinuteWatchState from "./AddMinuteWatchState";
import WatchState from "./WatchState";

class AddHourWatchState extends WatchState {
    public increase(): void {
        this.watchModel.addTime(3600000) 
        this.watchModel.updateTime()
    }
    public next(): void {
        this.watchModel.state = new AddMinuteWatchState()
    }
    public onStateChange(): void {
        this.watchModel.pause()
        this.watchModel.notifyWatchMode()
    }
}

export default AddHourWatchState