import AddHourWatchState from "./AddHourWatchState";
import WatchState from "./WatchState";

class InitialWatchState extends WatchState {
    public increase(): void {
        alert("Select a mode before increasing.")
        throw new Error("Can't increase at the moment.");
    }
    public next(): void {
        this.watchModel.state = new AddHourWatchState()
    }
    public onStateChange(): void {
        this.watchModel.startTimer()
        this.watchModel.notifyWatchMode()
    }
}

export default InitialWatchState