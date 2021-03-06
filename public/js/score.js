document.addEventListener('DOMContentLoaded', (event) => {
	event.preventDefault();
	//disable enter key
	window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){e.preventDefault();return false;}},true);
	//CLEAR COURSE INFO ON PAGE RELOAD
	document.getElementById('9hole').checked = false;
	document.getElementById('18hole').checked = false;
	document.getElementById('courseName').value = '';
	document.getElementById('courseInfo').style.display = 'none';
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
	const newGame = document.getElementById('newGame');
	const searchGame = document.getElementById('searchGame');
	//INITIALIZE GAME VARIABLES
	let totalStrokes = 0;
	let holeStrokes = 0;
	let score = 0;
	let holeNum = 1;


	//FUNCTION THAT INCREASES STROKE COUNT ON BUTTON CLICK
	var increaseStroke = (e) => {
		e.preventDefault();
		finishHoleBtn.disabled = false;
		totalStrokes += 1;
		holeStrokes += 1;
		strokeEle.innerHTML = totalStrokes;
		holeStrokeEle.innerHTML = holeStrokes;
	};


	//FUNCTION THAT CALCULATES THE SCORE AFTER HOLE IS FINISHED
	var calculateScore = (e) => {
		e.preventDefault();
		let curHolePar = parseInt(document.getElementById('par').value);
		let p = curHolePar;	
		score += holeStrokes - p;

		if(score === 0){
			scoreEle.innerHTML = 'E';
		} else if (score > 0) {
			scoreEle.innerHTML = '+'+score;
		} else {
			scoreEle.innerHTML = score;
		}

		updateScorecard(holeNum, p, holeStrokes);
		holeNum++;
		holeStrokes = 0;
		holeStrokeEle.innerHTML = '0';
		finishHoleBtn.disabled = true;
		holeEle.innerHTML = holeNum;
		gameOverCheck(holeNum, courseObj.totalHoles);
	};


	//FUNCTION THAT SHOWS SCOREAREA / HIDES COURSE INFOFORM
	var startGame = (e) => {
		e.preventDefault();
		//DISABLE FINISH HOLE BTN TILL STROKE IS MADE
		finishHoleBtn.disabled = true;
		//IF NO COURSE NAME IS ENTERED CREATE OBJECT WITH GOLFCARD AS NAME
		if(document.getElementById('courseName').value === ''){
			courseName = 'Golfcard';
			scoreCardHead.innerHTML = courseName;
		} else {
			courseName = document.getElementById('courseName').value;
			scoreCardHead.innerHTML = courseName;
		}
		//UPDATE SCORECARD TABLE WITH COURSE NAME AND # OF HOLES
		document.getElementById('appendMe').innerHTML = courseName;
		holeEle.innerHTML = holeNum;
		document.getElementById('app').style.width = '250px';
		scoreArea.style.display = 'inline-block';
		var date = new Date().toLocaleDateString();

		courseObj = {
			courseName: courseName,
			totalHoles: parseInt(document.querySelector('input[name="gameLength"]:checked').value),
			hole: [],
			date: date
		}
		
		document.getElementById('infoForm').remove();
	}


	//FUNCTION THAT UPDATES SCORECARD (gets called in calculateScore() on finish hole click)
	var updateScorecard = (hole, par, strokes) => {
		var row = scoreCardBody.insertRow();
		row.insertCell().innerHTML = hole + '.';
		row.insertCell().innerHTML = par;
		row.insertCell().innerHTML = strokes;

		courseObj.hole[(hole - 1)] = {hole: hole, par: par, strokes: strokes}; 
		courseObj.score = score;
	}

	//GAME OVER CHECK GETS CALLED AFTER SCORECARD UPDATE
	var gameOverCheck = (currentHole, totalHoles) => {
		if(currentHole > totalHoles) {

			courseObj.totalStrokes = totalStrokes;

			displayResults();
			postResults();
		}
	}

	//load new game 
	var loadNewGame = (e) => {
		e.preventDefault();
		document.getElementById('startGame').disabled = true;
		document.getElementById('courseInfo').style.display = 'inline-block';
		document.getElementById('title').style.display = 'none';
		newGame.remove();
		searchGame.remove();

		var radios = document.querySelectorAll('.holeSelect');
		for(const radio of radios) {
			radio.addEventListener('click', ()=>{
				document.getElementById('startGame').disabled = false;
			});
		}
	}

	//GETS GALLED WHEN GAMEOVERCHECK = TRUE
	var displayResults = () => {
		//REMOVE GAME CONTROLS FROM SCORECARD
		document.getElementById('gameControls').remove();
		document.getElementById('tableHeader').remove();
		document.getElementById('scoreHeader').remove();
		scorecardEle.style.display = 'inline-block';

		//new game btn
		var ngbtn = document.createElement('BUTTON');
		ngbtn.className = 'test btn btn-success';
		ngbtn.innerHTML = '<a href="/">New Game</a>';
		ngbtn.style.margin = "10px 2px 10px 2px";
		scoreArea.append(ngbtn);

		//search game btn
		var sgbtn = document.createElement('BUTTON');
		sgbtn.className = 'test btn btn-success';
		sgbtn.innerHTML = '<a href="/search">Search</a>';
		sgbtn.style.margin = "10px 2px 10px 2px";
		scoreArea.append(sgbtn);
	}

	//GETS GALLED WHEN GAMEOVERCHECK = TRUE
	var postResults = () => {
		//UPDATES COURSE OBJ AND POSTS OBJ TO SERVER
		console.log(courseObj);
		fetch('/', {
			method: "POST",
			body: JSON.stringify(courseObj),
			headers: { 'Content-Type': 'application/json'}
		});
	}


	//INCREASE STROKE EVENT LISTENER
	incStrokeBtn.addEventListener('click', increaseStroke);
	//FINISH OUT HOLE EVENT LISTENER
	finishHoleBtn.addEventListener('click', calculateScore);
	//SUBMIT COURSE INFO AND START GAME EVENT LISTENER
	courseInfo.addEventListener('submit', startGame);
	//start new game
	newGame.addEventListener('click', loadNewGame);
	//search game
	searchGame.addEventListener('click', (e)=>{
		e.preventDefault();
		window.location.href += 'search'; 
	});

});