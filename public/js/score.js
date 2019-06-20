document.addEventListener('DOMContentLoaded', (event) => {
	event.preventDefault();

	document.getElementById('9hole').checked = false;
	document.getElementById('18hole').checked = false;
	document.getElementById('courseName').value = '';
	
	const scoreArea = document.getElementById('scoreArea');
	const courseEle = document.getElementById('course');
	const strokeEle = document.getElementById('strokeTotal');
	const scoreEle = document.getElementById('score');
	const holeStrokeEle = document.getElementById('holeStroke');
	const scorecardEle = document.getElementById('scoreCard');


	const app = document.getElementById('appHere');

	const strokeBtn = document.getElementById('stroke');
	const holeBtn = document.getElementById('hole');
	
	let holePar = document.getElementById('par');
	let totalStrokes = 0;
	let holeStrokes = 0;
	let score = 0;
	//let holes = 0;

	scoreArea.style.visibility = 'hidden';

	var increaseStroke = () => {
		totalStrokes += 1;
		holeStrokes += 1;
		strokeEle.innerHTML = totalStrokes;
		holeStrokeEle.innerHTML = holeStrokes;
	};

	var calculateScore = () => {
		var p = parseInt(holePar.value);

		score += holeStrokes - p;

		if(score === 0){
			scoreEle.innerHTML = 'E';
		}	else {
			scoreEle.innerHTML = score;
		}
		updateScorecard();
		holeStrokes = 0;
		holeStrokeEle.innerHTML = '';

		
	};

	var startGame = (e) => {
		e.preventDefault();

		const courseInfo = document.getElementById('courseInfo');
		courseInfo.style.display = 'none';
		scoreArea.style.visibility = 'visible';


		const courseName = document.getElementById('courseName').value;
		const courseLen = document.querySelector('input[name="gameLength"]:checked').value;

		console.log(`Course Name: ${courseName} \nCourse Length: ${courseLen}`);

		courseEle.innerHTML = courseName;


		if (courseLen === "9") {
			cl = parseInt(courseLen);
			console.log('9 hole game started');
			for (var i = 1; i <= cl; i++) {
				const tabR = document.createElement('TR');
				const tabD = document.createElement('TD');
				tabD.textContent = i;
				tabR.append(tabD);
				app.append(tabR);
			}
		} else if (courseLen === "18") {
			cl = parseInt(courseLen);
			console.log('18 hole game started');
			for(hole = 1; hole <= cl; hole++) {
				const tabR = document.createElement('TR');
				const tabD = document.createElement('TD');
				tabD.textContent = hole;
				tabR.append(tabD);
				app.append(tabR);
			}
		} else {
			console.log('somethig went wrong');
		}
	}

	var updateScorecard = () => {
		console.log('fack');
		

	}

	strokeBtn.addEventListener('click', increaseStroke);
	holeBtn.addEventListener('click', calculateScore);
	courseInfo.addEventListener('submit', startGame);


});