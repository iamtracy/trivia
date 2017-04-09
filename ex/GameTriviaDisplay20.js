
	var g_oAjaxObj = new InxpoAJAXObject();
	var g_cAssetPath = GetAssetPath();
	var g_cLASFileName = "scripts/Server.nxp";
	var g_cInstanceID = "1";
	
	var g_iGameActivityKey = 0;
	var g_cGameUserState = [];
	var g_iGameKey; 
	var g_cGameTeamState;
	var g_iGameTeamKey;
	var g_cTitle;
	var g_cDescription;
	var g_bLive;
	var g_iGameTeamMemberKey;
	var g_cAlias;
	var g_iUserKey; 
	var g_iUserType;
	var g_cUserName;
	var g_cUserEMailAddress;
	var g_HighScore = 0;
	var g_iMaxScore = 30000;
	var g_bFlash = FlashInstalled();

	function EX_SpaceDisplayInit(){
		AddEventHandler(window,"beforeunload",EX_ExitBooth);
		AddEventHandler(window,"unload",EX_ExitBooth);
		EX_InitDefaults();		
		GlobalAppendTabStyles();
/* 		if (g_oPageOptions.cShellBackgroundImageURL){
			SetShellBackground(g_oPageOptions.cShellBackgroundImageURL)
		}				 */
	}
	
	function EX_InitDefaults(){

		if (g_oPageOptions.iBackgroundImage == undefined)
		g_oPageOptions.iBackgroundImage = 0;
		
		if (g_oPageOptions.cBackgroundImageURL == undefined || g_oPageOptions.cBackgroundImageURL == "")
		g_oPageOptions.cBackgroundImageURL = "https://"+g_ContentServerAddress+"/customvts/VX/Games/assets/GamesTrivia.jpg";
	
		if (g_oPageOptions.cShellBackgroundImageURL == undefined)
			g_oPageOptions.cShellBackgroundImageURL = "";	
		
		if (g_oPageOptions.cGameBackgroundImageURL == undefined)
		g_oPageOptions.cGameBackgroundImageURL = "https://"+g_ContentServerAddress+"/customvts/VX/Games/assets/GamesBGTriviaInGame.jpg";
		
		if (g_oPageOptions.cGameWelcomeImageURL == undefined)
		g_oPageOptions.cGameWelcomeImageURL = "https://"+g_ContentServerAddress+"/customvts/VX/Games/assets/GamesBGTriviaWelcome.jpg";

		if (g_oPageOptions.cWelcomeVideoImageURL == undefined)
		g_oPageOptions.cWelcomeVideoImageURL = "";
		
		if (g_oPageOptions.cFirstColor == undefined)
			g_oPageOptions.cFirstColor = "";

		if (g_oPageOptions.cSecondColor == undefined)
			g_oPageOptions.cSecondColor = "";

		if (g_oPageOptions.cThirdColor == undefined)
			g_oPageOptions.cThirdColor = "";		
		
 		if (g_oPageOptions.aTabOptions == undefined){
			g_oPageOptions.aTabOptions = [
			];
		}
		
		if (g_oPageOptions.aGameOptions == undefined && g_oPageOptions.aGameOptions == ""){
			g_oPageOptions.aGameOptions = [
				{iOrder:1,"cQuestion":"Question 1","cAnswer1":"Answer1", "cAnswer2":"Answer2", "cAnswer3":"Answer3", "cAnswer4":"Answer4", "Correct":"Answer4"},
				{iOrder:2,"cQuestion":"Question 2","cAnswer1":"Answer1", "cAnswer2":"Answer2", "cAnswer3":"Answer3", "cAnswer4":"Answer4", "Correct":"Answer4"},
				{iOrder:3,"cQuestion":"Question 3","cAnswer1":"Answer1", "cAnswer2":"Answer2", "cAnswer3":"Answer3", "cAnswer4":"Answer4", "Correct":"Answer4"},
				{iOrder:4,"cQuestion":"Question 4","cAnswer1":"Answer1", "cAnswer2":"Answer2", "cAnswer3":"Answer3", "cAnswer4":"Answer4", "Correct":"Answer4"},
				{iOrder:5,"cQuestion":"Question 5","cAnswer1":"Answer1", "cAnswer2":"Answer2", "cAnswer3":"Answer3", "cAnswer4":"Answer4", "Correct":"Answer4"},
				{iOrder:6,"cQuestion":"Question 6","cAnswer1":"Answer1", "cAnswer2":"Answer2", "cAnswer3":"Answer3", "cAnswer4":"Answer4", "Correct":"Answer4"},
				{iOrder:7,"cQuestion":"Question 7","cAnswer1":"Answer1", "cAnswer2":"Answer2", "cAnswer3":"Answer3", "cAnswer4":"Answer4", "Correct":"Answer4"},
				{iOrder:8,"cQuestion":"Question 8","cAnswer1":"Answer1", "cAnswer2":"Answer2", "cAnswer3":"Answer3", "cAnswer4":"Answer4", "Correct":"Answer4"},
				{iOrder:9,"cQuestion":"Question 9","cAnswer1":"Answer1", "cAnswer2":"Answer2", "cAnswer3":"Answer3", "cAnswer4":"Answer4", "Correct":"Answer4"},
				{iOrder:10,"cQuestion":"Question 10","cAnswer1":"Answer1", "cAnswer2":"Answer2", "cAnswer3":"Answer3", "cAnswer4":"Answer4", "Correct":"Answer4"}
			];
		}
		
		if (g_oPageOptions.bShowSocialSuite == undefined)
		g_oPageOptions.bShowSocialSuite = false;
		
		if (g_oPageOptions.bContentInterests == undefined)
		g_oPageOptions.bContentInterests = false;
		
		if (g_oPageOptions.GameKey == undefined)
		g_oPageOptions.GameKey = 0;
		
		if (g_oPageOptions.iPreRoll == undefined)
		g_oPageOptions.iPreRoll = 0;
		
		if (g_oPageOptions.bEnableFacebook == undefined)
		g_oPageOptions.bEnableFacebook = false;

		if (g_oPageOptions.bGameReplay == undefined)
			g_oPageOptions.bGameReplay = false;
			
		if (g_oPageOptions.BGColor == undefined)
			g_oPageOptions.BGColor = "TRANSPARENT";		//recommended color for default theme #0c4680

		if (g_oPageOptions.ObjectColor == undefined)
			g_oPageOptions.ObjectColor = "#b7E801";

		if (g_oPageOptions.DisplayFontColor == undefined)
			g_oPageOptions.DisplayFontColor = "#FFFFFF";
			
		if (g_oPageOptions.AnswerFontColor == undefined)
			g_oPageOptions.AnswerFontColor = "#06223f";
		
		
		g_iGameKey = g_oPageOptions.GameKey;
		
		GetGameData(g_iGameKey);
	}
	
	function initBuild(bVal,cMessage){
		
/*  		var oBGImageDiv = EX_CreateContainerDiv("BGImageDiv",960,500,0,0,0,"#ffffff","fixed");
		document.body.appendChild(oBGImageDiv);
		ProcessImage(oBGImageDiv,g_oPageOptions.cBackgroundImageURL,960,500); */
		
	oBackground.Init(g_oPageOptions.cBackgroundImageURL,g_oPageOptions.cShellBackgroundImageURL);		

 		var oGameBGImageDiv = EX_CreateContainerDiv("GameBGImageDiv",675,420,70,10,5,"transparent");
		document.body.appendChild(oGameBGImageDiv);
		ProcessImage(oGameBGImageDiv,g_oPageOptions.cGameBackgroundImageURL,675,420);
		
		var oGameBGWelcomeImageDiv = EX_CreateContainerDiv("GameBGWelcomeImageDiv",675,420,70,10,5,"transparent");
		document.body.appendChild(oGameBGWelcomeImageDiv);
		ProcessImage(oGameBGWelcomeImageDiv,g_oPageOptions.cGameWelcomeImageURL,675,420);
		
		var oGameContainer = EX_CreateContainerDiv("GameContainer",675,420,70,10,10,"transparent");
		document.body.appendChild(oGameContainer);
		
		if(bVal){
			if(g_oPageOptions.cWelcomeVideoImageURL && g_oPageOptions.cWelcomeVideoImageURL.indexOf(".flv") > -1 || g_oPageOptions.cWelcomeVideoImageURL.indexOf(".mp4") > -1)
			{
				if (g_bFlash)
				{
					var oVideoImage = EX_CreateVideoDiv("VideoImage",g_oPageOptions.cWelcomeVideoImageURL,675,420,0,0,30,oGameContainer,"Custom_VideoOnComplete");
					oGameContainer.appendChild(oVideoImage);
				}
				else
				{
					oGameContainer.innerHTML = DrawGame();
					if(!g_bFlash) setTimeout("MobileInit()",50);
				}
			}else if(g_oPageOptions.cWelcomeVideoImageURL && g_bFlash == true){
				var oPreRollImage = EX_CreateContainerDiv("PreRollImage",675,420,0,0,30,"#FFFFFF");
				oGameContainer.appendChild(oPreRollImage);
				ProcessImage(oPreRollImage,g_oPageOptions.cWelcomeVideoImageURL,675,420);
				if(g_oPageOptions.iPreRoll == "" && g_bFlash == true) g_oPageOptions.iPreRoll = 10;
				EX_StartTimer(oPreRollImage,g_oPageOptions.iPreRoll);
			}else{
				oGameContainer.innerHTML = DrawGame();
				if(!g_bFlash) setTimeout("MobileInit()",50);
			}
		}else{
			oGameContainer.innerHTML = "<p class=\"GameErrorMessage\">"+cMessage+"</p>";
		}

			
			if(g_oPageOptions.aTabOptions != ""){	
				oTabObject.init(document.body,g_oPageOptions.aTabOptions,255,420,70,695,10,g_oPageOptions.bIsMultiLanguage,true,"tabs",null);
			}

			
			
		
		if(g_oPageOptions.bShowSocialSuite){
			var oSocial= EX_CreateSocialSuite("SocialSuite",'Server.nxp?LASCmd=AI:1;F:SF!3130',915,400,471,20,100,"auto");
			document.body.appendChild(oSocial);
		}
		
		if(g_oPageOptions.bContentInterests){
			var oContInterest= EX_CreateContentInterests("ContentInterests",'Server.nxp?LASCmd=AI:1;O:InterestedCategorySearch.htm',805,400,471,132,100,"auto");
			document.body.appendChild(oContInterest);
		}
		
		oTabObject.InitialTabDisplay();		
		
	}
	
	var LocalSWLoader = {//BD 11-06 added to allow share config options at space level
		run: function(){
			if(window.SW) SW.Init({Server: g_VTSServer, InstanceID: g_InstanceID, ImageDir: g_ImageDir, Source: 4 ,KeyVal: g_BoothKey});
		}
	}  
  SWLoader.run = LocalSWLoader.run;  
  
	/* Local Functions */
	
	function Custom_VideoOnComplete(){
		var oVideo = document.getElementById("VideoImage");
		var oGameContainer = document.getElementById("GameContainer");
		oGameContainer.removeChild(oVideo);
		
		oGameContainer.innerHTML = DrawGame();
		if(!g_bFlash) setTimeout("MobileInit()",50);
	}
	
	var iCounterTime = 0;
	var iCounterVal = 0;
	function EX_StartTimer(oObj,iVal){
		var oDiv = EX_CreateContainerDiv("PreRollCounter",300,20,0,0,40,"#FFFFFF");
		oDiv.style.textAlign = "left";
		oDiv.innerHTML = "Your game will begin in <span id=\"Counter\"></span>";
		oObj.appendChild(oDiv);
		
		iCounterTime = self.setInterval("EX_CountDown()",1000);
		iCounterVal = iVal;
	}
	

	function EX_CountDown(){
		
		iCounterVal = iCounterVal -1;
		if(iCounterVal != 0){
			document.getElementById("Counter").innerHTML = iCounterVal;
		}else{
			document.getElementById("Counter").innerHTML = iCounterVal;
			window.clearInterval(iCounterTime);
			var oPreRollImage = document.getElementById("PreRollImage");
			var oGameContainer = document.getElementById("GameContainer");
			oGameContainer.removeChild(oPreRollImage);
			
			oGameContainer.innerHTML = DrawGame();
			if(!g_bFlash) setTimeout("MobileInit()",50);
		}
	}
	
	/* Draw HTML */
	
	function DrawGame(){
		var cHTML = "";
		
		if(g_bFlash)
		{
			
			cHTML += "<object id=\"GameFlash\" name=\"GameFlash\" type=\"application/x-shockwave-flash\" data=\"https://"+g_ContentServerAddress+"/customvts/VX/Games/swf/Trivia20.swf\" width=\"675\" height=\"420\">";
			cHTML += "<param name=\"movie\" value=\"https://"+g_ContentServerAddress+"/customvts/VX/Games/swf/Trivia20.swf\" />";
			cHTML += "<param name=\"allowScriptAccess\" value=\"always\" />";
			cHTML += "<param name=\"wmode\" value=\"transparent\" />";
			cHTML += "<param name=\"scale\" value=\"noscale\" />";
			cHTML += "</object>";
			return cHTML;
		}
		else
		{
			cHTML += "<canvas id=\"canvasBG\" width=\"675\" height=\"420\" style=\"position: absolute; left: 0; top: 0; z-index: 0;\"></canvas>";
			cHTML += "<canvas id=\"canvas\" width=\"675\" height=\"420\" style=\"position: absolute; left: 0; top: 0; z-index: 1;\"></canvas>";			
			return cHTML;
		}
	} 
	
	function ReplaceAnswerText(cVal){
		cVal = StringReplace(cVal, "#65", "A");
		cVal = StringReplace(cVal, "#66", "B");
		cVal = StringReplace(cVal, "#67", "C");
		cVal = StringReplace(cVal, "#68", "D");
		cVal = StringReplace(cVal, "#69", "E");
		cVal = StringReplace(cVal, "#70", "F");
		cVal = StringReplace(cVal, "#71", "G");
		cVal = StringReplace(cVal, "#72", "H");
		cVal = StringReplace(cVal, "#73", "I");
		cVal = StringReplace(cVal, "#74", "J");
		cVal = StringReplace(cVal, "#75", "K");
		cVal = StringReplace(cVal, "#76", "L");
		cVal = StringReplace(cVal, "#77", "M");
		cVal = StringReplace(cVal, "#78", "N");
		cVal = StringReplace(cVal, "#79", "O");
		cVal = StringReplace(cVal, "#80", "P");
		cVal = StringReplace(cVal, "#81", "Q");
		cVal = StringReplace(cVal, "#82", "R");
		cVal = StringReplace(cVal, "#83", "S");
		cVal = StringReplace(cVal, "#84", "T");
		cVal = StringReplace(cVal, "#85", "U");
		cVal = StringReplace(cVal, "#86", "V");
		cVal = StringReplace(cVal, "#87", "W");
		cVal = StringReplace(cVal, "#88", "X");
		cVal = StringReplace(cVal, "#89", "Y");
		cVal = StringReplace(cVal, "#90", "Z");
		cVal = StringReplace(cVal, "#100", "a");
		cVal = StringReplace(cVal, "#101", "b");
		cVal = StringReplace(cVal, "#102", "c");
		cVal = StringReplace(cVal, "#103", "d");
		cVal = StringReplace(cVal, "#104", "e");
		cVal = StringReplace(cVal, "#105", "f");
		cVal = StringReplace(cVal, "#106", "g");
		cVal = StringReplace(cVal, "#107", "h");
		cVal = StringReplace(cVal, "#108", "i");
		cVal = StringReplace(cVal, "#109", "j");
		cVal = StringReplace(cVal, "#110", "k");
		cVal = StringReplace(cVal, "#111", "l");
		cVal = StringReplace(cVal, "#112", "m");
		cVal = StringReplace(cVal, "#113", "n");
		cVal = StringReplace(cVal, "#114", "o");
		cVal = StringReplace(cVal, "#115", "p");
		cVal = StringReplace(cVal, "#116", "q");
		cVal = StringReplace(cVal, "#117", "r");
		cVal = StringReplace(cVal, "#118", "s");
		cVal = StringReplace(cVal, "#119", "t");
		cVal = StringReplace(cVal, "#120", "u");
		cVal = StringReplace(cVal, "#121", "v");
		cVal = StringReplace(cVal, "#122", "w");
		cVal = StringReplace(cVal, "#123", "x");
		cVal = StringReplace(cVal, "#124", "y");
		cVal = StringReplace(cVal, "#125", "z");
		
		return cVal;
	}
	
	/* Game Functions */
	
	function SaveScore(iScore) {
		var cURL =   g_cLASFileName+"?LASCmd=AI:" + g_cInstanceID + ";F:SF!42210&SID=1";
		cURL += "&GameActivityKey=" + g_iGameActivityKey;
		cURL += "&Score=" + iScore;
		g_oAjaxObj.Abort();
		g_oAjaxObj.onComplete = null;
		g_oAjaxObj.SendSyncRequest("GET",RandomizeURL(cURL),"");
	}
	
	function SaveUserState(cUserState) {
		var cData = JSONEncode(cUserState);
		var cURL =g_cLASFileName+ "?LASCmd=AI:" + g_cInstanceID + ";F:SF!42210&SID=2";
		cURL += "&GameKey=" + g_iGameKey;
		cURL += "&GameUserState=" + cData;
		g_oAjaxObj.Abort();
		g_oAjaxObj.onComplete = null;
		g_oAjaxObj.SendSyncRequest("GET",RandomizeURL(cURL));
		
	}
	
	function ShowQuotes(cData){
		return StringReplace(cData,"%27","'");
	}
	
	function GetCVals(){
		var cVal, iQuestionCount;
		cVal = {aGameOptions:[ ],CurrentScore:"0",CurrentLevel:"0",Completions: "0",HighScore:g_HighScore,GameBG:g_oPageOptions.cGameBackgroundImageURL};
		if(g_cGameUserState.aGameOptions) g_cGameUserState.aGameOptions = [];
		var iVal = ReturnGamePlayType(g_oPageOptions.bGameReplay,g_cGameUserState);
		var oAnswerBlock = [];
		var oQuestionBlock = g_oPageOptions.aGameOptions;
		var aMyQuestionArray = [];
		switch(iVal){
			case "1":
				if (oQuestionBlock)
				{
					oQuestionBlock.sort(sort_by_Random());
					
					iQuestionCount = 10;
					if(oQuestionBlock.length < 10){
						iQuestionCount = oQuestionBlock.length;
					}
					for(var iRow = 0; iRow < iQuestionCount; iRow++){
						oAnswerBlock = [];
						oAnswerBlock.push({cAnswer:oQuestionBlock[iRow].cAnswer1},{cAnswer:oQuestionBlock[iRow].cAnswer2},{cAnswer:oQuestionBlock[iRow].cAnswer3},{cAnswer:oQuestionBlock[iRow].cAnswer4});
						oAnswerBlock.sort(sort_by_Random());
						cVal.aGameOptions.push({cQuestion:oQuestionBlock[iRow].cQuestion,cAnswer1:oAnswerBlock[0].cAnswer,cAnswer2:oAnswerBlock[1].cAnswer,cAnswer3:oAnswerBlock[2].cAnswer,cAnswer4:oAnswerBlock[3].cAnswer,Correct:ReplaceAnswerText(oQuestionBlock[iRow].Correct)});
						aMyQuestionArray.push(oQuestionBlock[iRow].iOrder);
					}
					g_cGameUserState.aQuestionIndex = aMyQuestionArray;
				}
			break;
			
			case "3":
				if(g_cGameUserState.aQuestionIndex == undefined) g_cGameUserState.aQuestionIndex = [0,1,2,3,4,5,6,7,8,9];
				var oMyQuestionBlock = GetMyQuestions(oQuestionBlock,g_cGameUserState.aQuestionIndex);
				for(var iRow = 0; iRow < oMyQuestionBlock.length; iRow++){
					oAnswerBlock = [];
					oAnswerBlock.push({cAnswer:oMyQuestionBlock[iRow].cAnswer1},{cAnswer:oMyQuestionBlock[iRow].cAnswer2},{cAnswer:oMyQuestionBlock[iRow].cAnswer3},{cAnswer:oMyQuestionBlock[iRow].cAnswer4});
					oAnswerBlock.sort(sort_by_Random());
					oMyQuestionBlock[iRow].cAnswer1 = oAnswerBlock[0].cAnswer;
					oMyQuestionBlock[iRow].cAnswer2 = oAnswerBlock[1].cAnswer;
					oMyQuestionBlock[iRow].cAnswer3 = oAnswerBlock[2].cAnswer;
					oMyQuestionBlock[iRow].cAnswer4 = oAnswerBlock[3].cAnswer;
					oMyQuestionBlock[iRow].Correct = ReplaceAnswerText(oMyQuestionBlock[iRow].Correct);
				}
				cVal.aGameOptions = oMyQuestionBlock;
				if(g_cGameUserState.CurrentLevel) cVal.CurrentLevel = g_cGameUserState.CurrentLevel;
				if(g_cGameUserState.Completions) cVal.Completions = g_cGameUserState.Completions;
				if(g_cGameUserState.CurrentScore) cVal.CurrentScore = g_cGameUserState.CurrentScore;
				
				cVal.GameRules 		= g_oPageOptions.cGameWelcomeDescription;
				cVal.GameTitle 		= g_oPageOptions.cGameWelcomeTitle;
				
			break;
			
			case "2":
				if(g_cGameUserState.aQuestionIndex == undefined) g_cGameUserState.aQuestionIndex = [0,1,2,3,4,5,6,7,8,9];
				var oMyQuestionBlock = GetMyQuestions(oQuestionBlock,g_cGameUserState.aQuestionIndex);
				for(var iRow = 0; iRow < oMyQuestionBlock.length; iRow++){
					oAnswerBlock = [];
					oAnswerBlock.push({cAnswer:oMyQuestionBlock[iRow].cAnswer1},{cAnswer:oMyQuestionBlock[iRow].cAnswer2},{cAnswer:oMyQuestionBlock[iRow].cAnswer3},{cAnswer:oMyQuestionBlock[iRow].cAnswer4});
					oAnswerBlock.sort(sort_by_Random());
					oMyQuestionBlock[iRow].cAnswer1 = oAnswerBlock[0].cAnswer;
					oMyQuestionBlock[iRow].cAnswer2 = oAnswerBlock[1].cAnswer;
					oMyQuestionBlock[iRow].cAnswer3 = oAnswerBlock[2].cAnswer;
					oMyQuestionBlock[iRow].cAnswer4 = oAnswerBlock[3].cAnswer;
					oMyQuestionBlock[iRow].Correct = ReplaceAnswerText(oMyQuestionBlock[iRow].Correct);
				}
				cVal.aGameOptions = oMyQuestionBlock;
				if(g_cGameUserState.CurrentLevel) cVal.CurrentLevel = g_cGameUserState.CurrentLevel;
				if(g_cGameUserState.Completions) cVal.Completions = g_cGameUserState.Completions;
				if(g_cGameUserState.CurrentScore) cVal.CurrentScore = g_cGameUserState.CurrentScore;
				cVal.GameTitle = g_oPageOptions.cGameWelcomeTitle;
				cVal.GameRules = g_oPageOptions.cGameWelcomeDescription;
				
				if(g_cGameUserState.CurrentLevel == 10){
					g_cGameUserState.CurrentLevel = 0;
					g_cGameUserState.Completions = 0;
					g_cGameUserState.CurrentScore = 0;
					oMyQuestionBlock = [];
				}
				
				if(oMyQuestionBlock == ""){
					oQuestionBlock.sort(sort_by_Random());
					cVal = {aGameOptions:[ ],CurrentScore:"0",CurrentLevel:"0",Completions: "0",GameTitle:g_oPageOptions.cGameWelcomeTitle,GameRules:g_oPageOptions.cGameWelcomeDescription, GameBG:g_oPageOptions.cGameBackgroundImageURL};
					iQuestionCount = 10;
					if(oQuestionBlock.length < 10){
						iQuestionCount = oQuestionBlock.length;
					}
					for(var iRow = 0; iRow < iQuestionCount; iRow++){
						oAnswerBlock = [];
						oAnswerBlock.push({cAnswer:oQuestionBlock[iRow].cAnswer1},{cAnswer:oQuestionBlock[iRow].cAnswer2},{cAnswer:oQuestionBlock[iRow].cAnswer3},{cAnswer:oQuestionBlock[iRow].cAnswer4});
						oAnswerBlock.sort(sort_by_Random());
						cVal.aGameOptions.push({cQuestion:oQuestionBlock[iRow].cQuestion,cAnswer1:oAnswerBlock[0].cAnswer,cAnswer2:oAnswerBlock[1].cAnswer,cAnswer3:oAnswerBlock[2].cAnswer,cAnswer4:oAnswerBlock[3].cAnswer,Correct:ReplaceAnswerText(oQuestionBlock[iRow].Correct)});
						aMyQuestionArray.push(oQuestionBlock[iRow].iOrder);
					}
					g_cGameUserState.aQuestionIndex = aMyQuestionArray;
				}
				
			break;
		}
		cVal.BGColor 			= g_oPageOptions.BGColor;
		cVal.DisplayFontColor	= g_oPageOptions.DisplayFontColor;
		cVal.AnswerFontColor	= g_oPageOptions.AnswerFontColor;
		cVal.ObjectColor		= g_oPageOptions.ObjectColor;
		
		cVal = JSONEncode(cVal);
		cVal = ShowQuotes(cVal);
		cVal = InxpoAJAXEvalJSON(cVal);
		
		return cVal;
	}
	
	function GetMyQuestions(oObj,aVals){
		var oMyObj = [];
		var iRow;
		oObj.sort(sort_by('iOrder', false, parseInt));
		for(var i = 0; i < aVals.length; i++){
			iRow = aVals[i];
			if(oObj[iRow]){
				oMyObj.push(oObj[iRow]);
			}		
		}
		if(oMyObj.length != 10){
			for(var iLup = 0; iLup < 50; iLup++){
				if(aVals.valueOf().indexOf(iLup) == -1){
					oMyObj.push(oObj[iLup]);
					break;
				}
			}
		}	
		return oMyObj;
	}
	
	function ReturnGamePlayType(bVal,cUserState){
		if(!bVal && cUserState != ""){
			return "3";
		}else if(!bVal && cUserState == ""){
			return "1";
		}else if(bVal && cUserState != ""){
			return "2";
		}else{
			return "1";
		}
	}
	
	function ReturnGameData(iQuestion,iCorrect,iScore){
		if(g_HighScore < iScore){
			g_HighScore = iScore;
			g_cGameUserState.HighScore = iScore;
			SaveScore(g_cGameUserState.HighScore);
			
			// Refresh Leaderboard if Leadeboard tab exists and is selected.
			var bRefresh = false;
			var iLeaderboardIndex;
			for (var i = 0, ii = g_oPageOptions.aTabOptions.length; i < ii; i++)
			{
				if (g_oPageOptions.aTabOptions[i].iType == 12)
				{
					bRefresh = true;
					iLeaderboardIndex = i;
				}
			}
			if (bRefresh)
			{
				var oTrackTabContainer = document.getElementById("TrackTabContainer").childNodes;
				var oTab;
				for (var i = 0, ii = oTrackTabContainer.length; i < ii; i++)
				{
					oTab = oTrackTabContainer[i];
					if (i == iLeaderboardIndex && oTab.className == "TrackTabHighlight")
						setTimeout("GetLeaderBoardData(\""+g_oPageOptions.GameKey+"\")",1000);
				}
			}
		}
		g_cGameUserState.CurrentLevel = iQuestion;
		g_cGameUserState.Completions = iCorrect;
		g_cGameUserState.CurrentScore = iScore;
		
		SaveUserState(g_cGameUserState);
	}

	function EnableFacebook()
	{
		return g_oPageOptions.bEnableFacebook;
	}
	function GetMaxScore()
	{
		return g_iMaxScore;
	}
	
	/* Get Data */
	
	function GetGameData(iGameKey){
		var bIsReady = false;
		var cURL = "scripts/Server.nxp?LASCmd=AI:1;F:LBSEXPORT!JSON&SQLID=42200&GameKey=" + iGameKey;
		g_oAjaxObj.Abort();
		g_oAjaxObj.onComplete = null;
		g_oAjaxObj.SendSyncRequest("GET", RandomizeURL(cURL),"");
		var oResultSet;
		var oRow;
		var cResponse = g_oAjaxObj.m_oXMLHTTPReqObj.responseText;
		var oResponse = InxpoAJAXEvalJSON(cResponse);
		var cMessage = "";
		switch(oResponse.Status){
			case 60000: 
				cMessage = "An error has occured in host space configuration. Please submit the host space and try again."; 
			break; 
			case 60002: 
				cMessage = "This game is not available for play!";
			break;
		}
		if(oResponse.Status == 0 && oResponse.ResultSet.length){
			for (var iResultSet = 0; iResultSet < oResponse.ResultSet.length; iResultSet++){
				oResultSet = oResponse.ResultSet[iResultSet];
				for (var iRow = 0; iRow < oResultSet.length; iRow++){
					oRow = oResultSet[iRow];
					
					if(oRow.GameActivityKey) g_iGameActivityKey = oRow.GameActivityKey;
					if(oRow.GameUserState) g_cGameUserState = InxpoAJAXEvalJSON(oRow.GameUserState); 
					if(oRow.Live) g_bLive = oRow.Live;
					if(oRow.Alias) g_cAlias = oRow.Alias;
					if(oRow.UserName) g_cUserName = oRow.UserName;
					if(oRow.EMailAddress) g_cUserEMailAddress = oRow.EMailAddress;
				}
			}
			bIsReady = true;
		}
		if(g_cGameUserState.HighScore){
			g_HighScore = g_cGameUserState.HighScore;
			SaveScore(g_cGameUserState.HighScore);
		}
		initBuild(bIsReady,cMessage);
	}
	
	//------------ Sort -------------------
	
	var sort_by_Random = function(){ 
	 
	   return function(a,b){ 
	 
		   a = Math.random(); 
		   b = Math.random();

		   if (a<b) return -1; 
		   if (a>b) return  1; 
		   return 0; 
	 
	   } 
	}
	
	var sort_by = function(field, reverse, primer){
		reverse = (reverse) ? -1 : 1;     
		return function(a,b){         
			a = a[field];        
			b = b[field];         
			if (typeof(primer) != 'undefined'){           
				a = primer(a);            
				b = primer(b);        
			}        
			if (a<b) return reverse * -1;        
			if (a>b) return reverse * 1;        
			return 0;     
		} 
	}

	