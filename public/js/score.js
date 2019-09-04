document.addEventListener('DOMContentLoaded', (event) => {
	event.preventDefault();

	//CLEAR COURSE INFO ON PAGE RELOAD
	document.getElementById('9hole').checked = false;
	document.getElementById('18hole').checked = false;
	document.getElementById('courseName').value = '';
	//SAVE GAME ELEMENTS
	const courseInfo = document.getElementById('courseInfo');
	const scoreArea = document.getElementById('scoreArea');
	const holeEle = document.getElementById('holeEle');
	const strokeEle = document.getElementById('strokeTotal');
	const scoreEle = document.getElementById('score');
	const holeStrokeEle = document.getElementById('holeStroke');
	const scorecardEle = document.getElementById('scoreCard');
	const scoreCardHead = document.getElementById('scoreCardHead');
	const scoreCardBody = document.getElementById('scoreCardBody');
	const incStrokeBtn = document.getElementById('stroke');
	const finishHoleBtn = document.getElementById('hole');
	//INITIALIZE GAME VARIABLES
	let totalStrokes = 0;
	let holeStrokes = 0;
	let score = 0;
	let holeNum = 1;
	//HIDE SCORECARD TILL INFO IS ENTERED
	scoreArea.style.visibility = 'hidden';


	//FUNCTION THAT INCREASES STROKE COUNT ON BUTTON CLICK
	var increaseStroke = () => {
		finishHoleBtn.disabled = false;
		totalStrokes += 1;
		holeStrokes += 1;
		strokeEle.innerHTML = totalStrokes;
		holeStrokeEle.innerHTML = holeStrokes;
	};


	//FUNCTION THAT CALCULATES THE SCORE AFTER HOLE IS FINISHED
	var calculateScore = () => {
		let curHolePar = parseInt(document.getElementById('par').value);
		let p = curHolePar;	
		score += holeStrokes - p;

		if(score === 0){
			scoreEle.innerHTML = 'E';
		} else {
			scoreEle.innerHTML = score;
		}

		updateScorecard(holeNum, p, holeStrokes);
		holeNum++;
		holeStrokes = 0;
		holeStrokeEle.innerHTML = '';
		finishHoleBtn.disabled = true;
		holeEle.innerHTML = holeNum;
		gameOverCheck(holeNum, courseObj.totalHoles);
	};


	//FUNCTION THAT SHOWS SCORECARD / HIDES COURSE INFO
	var startGame = (e) => {
		e.preventDefault();
		finishHoleBtn.disabled = true;
		courseInfo.style.display = 'none';
		scoreArea.style.visibility = 'visible';
		holeEle.innerHTML = holeNum;

		courseObj = {
			courseName: document.getElementById('courseName').value,
			totalHoles: parseInt(document.querySelector('input[name="gameLength"]:checked').value),
			hole: []
		}
		
		if(courseObj.courseName === ''){
			courseObj.courseName = 'Golfcard';
			scoreCardHead.innerHTML = courseObj.courseName;
		} else {
			scoreCardHead.innerHTML = courseObj.courseName;
		}
		
	}


	//FUNCTION THAT UPDATES SCORECARD (gets called in calculateScore() on finish hole click)
	var updateScorecard = (hole, par, strokes) => {
		var row = scoreCardBody.insertRow();
		row.insertCell().innerHTML = hole + '.';
		row.insertCell().innerHTML = par;
		row.insertCell().innerHTML = strokes;

		courseObj.hole[(hole - 1)] = {par: par, strokes: strokes}; 
		courseObj.score = score;
	}

	//GAME OVER CHECK GETS CALLED AFTER SCORECARD UPDATE
	var gameOverCheck = (currentHole, totalHoles) => {
		if(currentHole > totalHoles) {
			console.log('Game Over.');
			//REMOVE GAME CONTROLS FROM SCORECARD
			document.getElementById('gameControls').remove();
			document.getElementById('scoreComponent1').remove();
			document.getElementById('scoreComponent2').remove();

			courseObj.totalStrokes = totalStrokes;
			console.log(courseObj);
			fetch('/', {
				method: "POST",
				body: JSON.stringify(courseObj),
				headers: { 'Content-Type': 'application/json'}
			});
		}
	}


	//INCREASE STROKE EVENT LISTENER
	incStrokeBtn.addEventListener('click', increaseStroke);
	//FINISH OUT HOLE EVENT LISTENER
	finishHoleBtn.addEventListener('click', calculateScore);
	//SUBMIT COURSE INFO AND START GAME EVENT LISTENER
	courseInfo.addEventListener('submit', startGame);

});