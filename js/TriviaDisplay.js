"use strict";

var g_aGame1QA = [
    { question: "What color is the sky?", answer: "Blue", answers: ["Red", "Blue", "Orange", "Purple"] },
    { question: "Who was the first president?", answer: "George Washington", answers: ["Abe Lincoln", "George Washington", "Bill Clinton", "Pedro"] },
    { question: "What year was the state of Ohio founded?", answer: "1803", answers: ["1876", "1854", "1803", "1789"] },
    { question: "What size shoe does Shaq wear?", answer: "22", answers: ["13", "16", "14", "22"] },
    { question: "What movie earned Leanordo Decaprio his first Oscar?", answer: "The Revenant", answers: ["The Revenant", "Inception", "The Departed", "Gangs of New York"] },
    { question: "What is Mark Twains real name?", answer: "Samual Langhorne Clemens", answers: ["Samual Langhorne Clemens", "Christopher Faust", "Richard Samual", "Joseph Van Deere"] },
    { question: "What year did the Wizard of Oz debut?", answer: "1939", answers: ["1935", "1936", "1942", "1939"] },
    { question: "What is the worlds largest island?", answer: "greenland", answers: ["Greenland", "Hawaii", "Iceland", "Australia"] },
    { question: "What year did Microsoft go public?", answer: "1986", answers: ["1994", "1998", "1986", "1989"] },
    { question: "What city has the tallest building in the world?", answer: "dubai", answers: ["New York", "Dubai", "Shanghai", "Seoul"] }
];

var g_oInterval;

var g_oTrivia = {
    gameConfig: {
        iTotalPoints: 20000,
        iScore: 0,
        iPointsInterval: 1
    },
    init: function(aGames) {
        var oQuestionDiv = document.getElementById('question');
        aGames.forEach(function(item, index) {
            oQuestionDiv.innerHTML += this.buildQAHtml(item, index);
        }.bind(this));
        this.oListeners.subscribe("[data-click]", "click");
    },
    buildQAHtml: function(oQuestion, index) {
        var cAnswer = oQuestion.answer;
        var aAnswers = oQuestion.answers;
        var cTempHTML = '';
        cTempHTML +=
            '<div style="display: ' + (index !== 0 ? "none" : "block") + ';">' +
            '<div class="col question" index="' + index + '">' +
            '<h3>' + oQuestion.question + '</h3>' +
            '</div>';
        cTempHTML += '<ul class="list-group" >';
        aAnswers.forEach(function(item, iIndex) {
            cTempHTML +=
                '<li data-click class="list-group-item" style="cursor: pointer;" value="' + item.toUpperCase() + '" index="' + index + '" >' +
                '<strong class="option">' + this.getLetter(iIndex) + '</strong>' +
                '<h5>' + item + '</h5>' +
                '</li>';
        }.bind(this));
        cTempHTML += '</ul>';
        cTempHTML += '</div>';
        cTempHTML += '</div>';
        return cTempHTML;
    },
    score: function(iScore) {
        return (iScore ? this.gameConfig.iScore += iScore : 0);
    },
    getLetter: function(iIndex) {
        return String.fromCharCode(97 + iIndex).toUpperCase();
    },
    answerUI: function(oClickedNode, oQuestionListUL) {
        var oQuestionList = oQuestionListUL.childNodes;
        var li = 0;
        for (li; li < oQuestionList.length; li += 1) {
            var oCurrentNode = oQuestionList[li];
            var oOption = oCurrentNode.getElementsByClassName('option')[0];
            var cValueAttr = oCurrentNode.getAttribute('value');
            var iClickedNodeIndex = oClickedNode.getAttribute('index');
            var cAnswer = g_aGame1QA[iClickedNodeIndex].answer.toUpperCase();
            var bIsCorrect = cValueAttr == cAnswer;
            if (bIsCorrect) {
                oCurrentNode.classList += ' list-group-item-success';
            } else if (!bIsCorrect && oClickedNode == oCurrentNode) {
                oCurrentNode.classList += ' list-group-item-danger';
            }
        }
        this.oCounter.clearTime();
    },
    messageUI: function(bAnswer, bInit, bDone) {
        var oResponse = document.getElementById('response');
        if (bAnswer) {
            oResponse.innerHTML = 'Such correct, wow';
        } else if (bInit) {
            oResponse.innerHTML = 'Good Luck!';
        } else if (bDone) {
            oResponse.innerHTML = '';
        } else {
            oResponse.innerHTML = 'No cookie for you';
        }
    },
    scoreUI: function(bAnswer) {
        var oSeconds = document.getElementById('seconds');
        var oScore = document.getElementById('score');
        if (bAnswer) oScore.textContent = 'Score: ' + this.score(parseInt(oSeconds.textContent));
    },
    getClickedAnswerNode: function(oEvent) {
        var _this = g_oTrivia;
        var oClickedNode = oEvent.currentTarget;
        var oQuestionListUL = oClickedNode.parentNode;
        var oListULDiv = oQuestionListUL.parentNode;
        var cValueAttr = oClickedNode.getAttribute('value');
        var iClickedNodeIndex = oClickedNode.getAttribute('index');
        var cAnswer = g_aGame1QA[iClickedNodeIndex].answer.toUpperCase();
        var bAnswer = cValueAttr == cAnswer;
        _this.oListeners.unsubscribe(oQuestionListUL.childNodes, "click", _this.getClickedAnswerNode);
        _this.scoreUI(bAnswer);
        _this.messageUI(bAnswer);
        _this.answerUI(oClickedNode, oQuestionListUL);
        _this.next(oListULDiv, oClickedNode.getAttribute('index'));
    },
    next: function(oCollection, iClickedNodeIndex) {
        iClickedNodeIndex++;
        setTimeout(function() {
            if (oCollection.nextSibling != null) {
                document.querySelector('#qNumber').textContent = iClickedNodeIndex + 1;
                oCollection.style.display = "none";
                oCollection.nextSibling.style.display = 'block';
                this.oCounter.clearTime();
                this.oCounter.init(this.gameConfig.iTotalPoints / g_aGame1QA.length, this.gameConfig.iPointsInterval);
                this.messageUI(null, true);
            } else {
                oCollection.innerHTML = '<h3 class="text-center py-3">Trivia is done<h3>';
                this.messageUI(null, null, true);
            }
        }.bind(this), 1750);
    },
    oCounter: {
        clearTime: function() {
            clearInterval(g_oInterval);
        },
        init: function(iPossiblePoints, iQuestionTimingInterval) {
            var oCurrentDiv;
            var iPossiblePointsCount = iPossiblePoints + 1;
            var oSecElem = document.getElementById("seconds");
            g_oInterval = setInterval(function() {
                iPossiblePointsCount--;
                oSecElem.innerHTML = iPossiblePointsCount;
                if (iPossiblePointsCount <= 0) {
                    var oQuestionDivs = document.getElementById('question').childNodes;
                    var divs = 0;
                    for (divs; divs < oQuestionDivs.length; divs += 1) {
                        if (oQuestionDivs[divs].style.display == 'block') {
                            oCurrentDiv = oQuestionDivs[divs];
                        }
                    }
                    g_oTrivia.oListeners.unsubscribe(oCurrentDiv.getElementsByClassName('list-group-item'), "click", g_oTrivia.getClickedAnswerNode)
                    g_oTrivia.next(oCurrentDiv, null);
                    document.getElementById("seconds").innerHTML = "Time is up!";
                }
            }, iQuestionTimingInterval);
        }
    },
    oListeners: {
        subscribe: function(cSelector, cEvent) {
            var oClollection = document.querySelectorAll(cSelector);
            var i = 0;
            for (i; i < oClollection.length; i += 1) {
                oClollection[i].addEventListener(cEvent, g_oTrivia.getClickedAnswerNode);
            }
        },
        unsubscribe: function(oElem, cEvent, oFunc) {
            var oElement = 0;
            for (oElement; oElement < oElem.length; oElement += 1) {
                oElem[oElement].removeEventListener(cEvent, oFunc);
            }
        }
    }
};

function EX_SpaceDisplayInit() {
    var oConfig = g_oTrivia.gameConfig;
    var iPointsPerQuestion = oConfig.iTotalPoints / g_aGame1QA.length;
    g_oTrivia.init(g_aGame1QA);
    g_oTrivia.oCounter.init(iPointsPerQuestion, oConfig.iPointsInterval);
}