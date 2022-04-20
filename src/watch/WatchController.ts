import InitialWatchState from "./InitialWatchState";
import WatchModel from "./WatchModel";
import WatchView from "./WatchView";

class WatchController {
    private _watchModel: WatchModel

    constructor(watchModel: WatchModel) {
        this._watchModel = watchModel
    }

    public handleModeChange = (e: MouseEvent) => {
        e.stopPropagation()
        this.watchModel.nextMode()
    }
    public handleIncrease = (e: MouseEvent) => {
        e.stopPropagation()
        this.watchModel.increase()
    }
    
    public handleReset = (e: MouseEvent) => {
        e.stopPropagation()
        this.watchModel.pause()
        const model = new WatchModel(new InitialWatchState())
        const controller = new WatchController(model)
        new WatchView(controller)
    }

    get watchModel(){
        return this._watchModel
    }
}


export default WatchController