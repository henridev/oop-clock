import WatchController from "./watch/WatchController";
import WatchModel from "./watch/WatchModel";
import WatchView from "./watch/WatchView";
import InitialWatchState from "./watch/InitialWatchState";
import './index.css'

class WatchApp {
  static run(): void {
    const model = new WatchModel(new InitialWatchState())
    const controller = new WatchController(model)
    new WatchView(controller)
  }
}

WatchApp.run()