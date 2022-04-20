import AddHourWatchState from "./AddHourWatchState";
import AddMinuteWatchState from "./AddMinuteWatchState";
import WatchController from "./WatchController";
import WatchModel from "./WatchModel";

class WatchView {
    private watchController: WatchController

    private hoursContainer: HTMLDivElement
    private minutesContainer: HTMLDivElement
    private secondsContainer: HTMLDivElement

    private modeButton: HTMLButtonElement
    private increaseBtn: HTMLButtonElement
    private nightBtn: HTMLButtonElement
    private resetBtn: HTMLButtonElement

    constructor(watchController: WatchController) {
        this.hoursContainer = document.querySelector('.hours')!
        this.minutesContainer = document.querySelector('.minutes')!
        this.secondsContainer = document.querySelector('.seconds')!
        this.modeButton = document.querySelector('.mode')!
        this.increaseBtn = document.querySelector('.increase')!
        this.nightBtn = document.querySelector('.night')!
        this.resetBtn = document.querySelector('.reset')!
        watchController.watchModel.registerWatch(this)
        this.watchController = watchController
        this.modeButton.onclick = this.watchController.handleModeChange
        this.increaseBtn.onclick = this.watchController.handleIncrease
        this.resetBtn.onclick = this.watchController.handleReset
        this.nightBtn.onclick = this.handleNightMode
		this.removeSelection()
    }

    updateMode(model: WatchModel) {
		this.removeSelection()
		if(model.state instanceof AddHourWatchState) {
			this.hoursContainer.classList.add("selected")
		} else if(model.state instanceof AddMinuteWatchState) {
			this.minutesContainer.classList.add("selected")
		}
    }

    updateTimeView(model: WatchModel) {
        const {hours, minutes, seconds} = model.watchInfo
        const {
            hours: hoursChanged, 
            minutes: minutesChanged, 
            seconds: secondsChanged
        } = model.watchChanges

        if(hoursChanged){
            this.updateSection(this.hoursContainer, hours)
        }
        if(minutesChanged){
            this.updateSection(this.minutesContainer, minutes)
        }
        if(secondsChanged){
            this.updateSection(this.secondsContainer, seconds)
        }
    }

    private updateSection(container: HTMLDivElement, newTime: string) {
        var time = newTime.split('')
        
        if (time.length === 1) {
            time.unshift('0')
        }
        
        const firstNum = container!.firstElementChild!
        if (firstNum!.lastElementChild!.textContent !== time[0]) {
            this.updateNumber(firstNum, time[0])
        }
        
        var lastNum = container!.lastElementChild!
        if (lastNum!.lastElementChild!.textContent !== time[1]) {
            this.updateNumber(lastNum, time[1])
        }
    }

    private updateNumber(element: Element, number: string) {
        //element.lastElementChild.textContent = number
        var second = element!.lastElementChild!.cloneNode(true)
        second.textContent = number
        
        element.appendChild(second)
        element.classList.add('move')
      
        setTimeout(() => element.classList.remove('move'), 990)
        setTimeout(() => element.removeChild(element!.firstElementChild!), 990)
    }

    private handleNightMode = (e: MouseEvent) => {
        e.stopPropagation()
        document.body.classList.toggle('dark-background')
        document.querySelector('.Screen').classList.toggle('light-background')
        document.querySelector('.Clock').classList.toggle('dark-text')
        document.querySelector('.night').classList.toggle('dark-background')
    }

    private removeSelection(){
        this.hoursContainer.classList.remove("selected")
		this.minutesContainer.classList.remove("selected")
    }
}


export default WatchView