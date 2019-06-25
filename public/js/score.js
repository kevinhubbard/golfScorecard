document.addEventListener('DOMContentLoaded', (event) => {
	event.preventDefault();

	document.getElementById('9hole').checked = false;
	document.getElementById('18hole').checked = false;
	document.getElementById('courseName').value = '';
	const courseInfo = document.getElementById('courseInfo');
	const scoreArea = document.getElementById('scoreArea');
	const courseEle = document.getElementById('course');
	const strokeEle = document.getElementById('strokeTotal');
	const scoreEle = document.getElementById('score');
	const holeStrokeEle = document.getElementById('holeStroke');
	const scorecardEle = document.getElementById('scoreCard');
	const scoreCardHead = document.getElementById('scoreCardHead');
	const scoreCardBody = document.getElementById('scoreCardBody');
	const incStrokeBtn = document.getElementById('stroke');
	const finishHoleBtn = document.getElementById('hole');
	let totalStrokes = 0;
	let holeStrokes = 0;
	let score = 0;
	let holeNum = 1;


	scoreArea.style.visibility = 'hidden';


	//COURSE OBJECT CONSTRUCTOR
	function Course(name, holes) {
		this.name = name;
		this.holes = holes;
	}


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
	};


	//FUNCTION THAT SHOWS SCORECARD
	var startGame = (e) => {
		e.preventDefault();

		courseInfo.style.display = 'none';
		scoreArea.style.visibility = 'visible';
		courseObj = new Course(document.getElementById('courseName').value, parseInt(document.querySelector('input[name="gameLength"]:checked').value));
		courseEle.innerHTML = courseObj.name;
		scoreCardHead.innerHTML = courseObj.name;
	}


	//FUNCTION THAT UPDATES SCORECARD
	var updateScorecard = (hole, par, strokes) => {
		var row = scoreCardBody.insertRow();
		row.insertCell().innerHTML = hole;
		row.insertCell().innerHTML = par;
		row.insertCell().innerHTML = strokes;
	}


	//INCREASE STROKE EVENT LISTENER
	incStrokeBtn.addEventListener('click', increaseStroke);
	//FINISH OUT HOLE EVENT LISTENER
	finishHoleBtn.addEventListener('click', calculateScore);
	//SUBMIT COURSE INFO AND START GAME EVENT LISTENER
	courseInfo.addEventListener('submit', startGame);

});