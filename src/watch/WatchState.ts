import WatchModel from "./WatchModel";

abstract class WatchState {
    protected watchModel: WatchModel;

    setWatchModel(watchModel: WatchModel) {this.watchModel = watchModel}
    abstract onStateChange(): void;
    abstract increase(): void;
    abstract next(): void;
}

export default WatchState