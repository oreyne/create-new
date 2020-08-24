import React from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';

class TimersDashboard extends React.Component {
	state = {
		timers: [
			{
				title: 'Practice squat',
				project: 'Gym Chores',
				id: '2030efbd-a32f-4fcc-8637-7c410896b3e3',
				elapsed: 5456099,
				runningSince: Date.now(),
			},
			{
				title: 'Bake squash',
				project: 'Kitchen Chores',
				id: '2030efbd-a32f-4fcc-8637-7c410896b3e4',
				elapsed: 1273998,
				runningSince: null,
			}
		]
	};

	handleCreateFormSubmit = (timer) => {
		this.createTimer(timer);
	};

	handleEditFormSubmit = (attrs) => {
		this.updateTimer({ attrs });
	};

	handleTrashClick = (timerId) => {
		this.deleteTimer(timerId);
	};

	createTimer = (timer) => {
		const t = this.newTimer(timer);
		this.setState({ timers: this.state.timers.concat(t), });
	};

	newTimer = (attrs = {}) => {
	    const timer = {
	      title: attrs.title || 'Timer',
	      project: attrs.project || 'Project',
	      id: 'abc' + (Math.random() * 100), // eslint-disable-line no-undef
	      elapsed: 0,
	    };

		return timer;
	}

	updateTimer = (attrs) => {
		attrs = attrs.attrs;		
		const nextPlanet = this.state.timers.map((timer) => {
			if (timer.id === attrs.id) {
				console.log('finded');
				return Object.assign({}, timer, {
					title: attrs.title,
					project: attrs.project,
				});
			} else {
				return timer;
			}
		});

		this.setState({ timers: nextPlanet, });
	};

	deleteTimer = (timerId) => {
		this.setState({
			timers: this.state.timers.filter(t => t.id !== timerId),
		});
	};

    findById = (array, id, cb) => {
	    array.forEach((el) => {
	      if (el.id === id) {
	        cb(el);
	        return;
	      }
	    });
	}

	renderElapsedString = (elapsed, runningSince) => {
	    let totalElapsed = elapsed;
	    if (runningSince) {
	      totalElapsed += Date.now() - runningSince;
	    }
	    return this.millisecondsToHuman(totalElapsed);
	}

	millisecondsToHuman = (ms) => {
	    const seconds = Math.floor((ms / 1000) % 60);
	    const minutes = Math.floor((ms / 1000 / 60) % 60);
	    const hours = Math.floor(ms / 1000 / 60 / 60);

	    const humanized = [
	      this.pad(hours.toString(), 2),
	      this.pad(minutes.toString(), 2),
	      this.pad(seconds.toString(), 2),
	    ].join(':');

	    return humanized;
	}

	pad = (numberString, size) => {
	    let padded = numberString;
	    while (padded.length < size) padded = `0${padded}`;
	    return padded;
	}

	createTimer = (timer) => {
		const t = this.newTimer(timer);
		this.setState({
			timers: this.state.timers.concat(t),
		});
	};

	render() {
		return (
			<div className='ui three column centered grid'>
				<div className='column'>
					<EditableTimerList 
						timers={this.state.timers}
						renderElapsedString={this.renderElapsedString}
						onFormSubmit={this.handleEditFormSubmit}
						onTrashClick={this.handleTrashClick}
					/>
					<ToggleableTimerForm 
						onFormSubmit={this.handleCreateFormSubmit}
						isOpen={true} />
				</div>
			</div>
		);
	}
}

export default TimersDashboard;