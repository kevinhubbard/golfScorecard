document.addEventListener('DOMContentLoaded', (event) => {
	event.preventDefault();

	document.getElementById('9hole').checked = false;
	document.getElementById('18hole').checked = false;
	document.getElementById('courseName').value = '';
	
	const scoreArea = document.getElementById('scoreArea');
	const strokeBtn = document.getElementById('stroke');
	const holeBtn = document.getElementById('hole');

	const courseEle = document.getElementById('course');
	const strokeEle = document.getElementById('strokeTotal');
	const scoreEle = document.getElementById('score');
	const holeStrokeEle = document.getElementById('holeStroke');
	
	let holePar = document.getElementById('par');
	let totalStrokes = 0;
	let holeStrokes = 0;
	let score = 0;

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
			console.log('9 hole game started');
		} else if (courseLen === "18") {
			console.log('18 hole game started');
		} else {
			console.log('somethig went wrong');
		}
	}

	strokeBtn.addEventListener('click', increaseStroke);
	holeBtn.addEventListener('click', calculateScore);
	courseInfo.addEventListener('submit', startGame);


});