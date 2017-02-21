// -------------- SETUP -------------- //

var questType = {
	"escort": {
    	prefix: "Please escort",
        difficultyMod: 1,
        expMult: 1
    },
    "fetch": {
    	prefix: "Please fetch for me",
        difficultyMod: 2,
        expMult: 1.1
    },
    "kill": {
    	prefix: "Please kill",
        difficultyMod: 3,
        expMult: 1.2
    },
    "clear": {
    	prefix: "Please make safe",
        difficultyMod: 4,
        expMult: 1.5
    },
    "slay": {
    	prefix: "Please slay",
        difficultyMod: 5,
        expMult: 2
    }
};

var questObjective = {
	escort: {
    	"my child": {
        	difficultyMod: 1,
            expMult: 1
        },
        "my spouse": {
        	difficultyMod: 2,
        	expMult: 1.1
        },
        "my colleague":{
        	difficultyMod: 3,
        	expMult: 1.2
        },
        "my mentor":{
        	difficultyMod: 4,
        	expMult: 1.5
        },
        "my belongings":{
        	difficultyMod: 5,
        	expMult: 2
        }
    },
    fetch: {
    	"bear asses": {
        	difficultyMod: 1,
            expMult: 1
            //the rare donkey/bear hybrid
        },
        "trinkets": {
        	difficultyMod: 2,
            expMult: 1.1
        },
        "weapons": {
        	difficultyMod: 3,
            expMult: 1.2
        },
        "lost heirlooms": {
        	difficultyMod: 4,
            expMult: 1.5
        },
        "ancient artifacts": {
        	difficultyMod: 5,
            expMult: 2
        },
    },
    kill: {
    	"spiders": {
        	difficultyMod: 1,
            expMult: 1
        },
        "bears": {
        	difficultyMod: 2,
            expMult: 1.1
        },
        "trolls": {
        	difficultyMod: 3,
            expMult: 1.2
        },
        "ogres": {
        	difficultyMod: 4,
            expMult: 1.5
        },
        "wyverns": {
        	difficultyMod: 5,
            expMult: 2
        }
    },
    clear: {
    	"my basement": {
        	difficultyMod: 1,
            expMult: 1
        },
        "a cave": {
        	difficultyMod: 2,
            expMult: 1.1
        },
        "the town": {
        	difficultyMod: 3,
            expMult: 1.2
        },
        "the forest": {
        	difficultyMod: 4,
            expMult: 1.5
        },
        "a dungeon": {
        	difficultyMod: 5,
            expMult: 2
        }
    },
    slay: {
    	"a bandit leader": {
        	difficultyMod: 1,
            expMult: 1
        },
        "a banshee": {
        	difficultyMod: 2,
        	expMult: 1.1
        },
        "a vampire":{
        	difficultyMod: 3,
        	expMult: 1.2
        },
        "a lich":{
        	difficultyMod: 4,
        	expMult: 1.5
        },
        "a dragon":{
        	difficultyMod: 5,
        	expMult: 2
        }
    }
};

var questLocation = {
	"in the Sunny Fields" :{
    	difficultyMod: .1,
        expMult: 1
    },
	"in the Penumbral Murkwood":{
    	difficultyMod: .5,
        expMult: 1.1
    },
	"in the Ancient Ruins":{
    	difficultyMod: 1,
        expMult: 1.2
    },
	"in the Howling Tundra":{
    	difficultyMod: 2,
        expMult: 1.5
    },
	"in the Burning Wastes":{
    	difficultyMod: 5,
        expMult: 2
    }
};


var selectLocation = document.createElement("select");
selectLocation.setAttribute("id", "questLocation");
for(eachKey in questLocation){
	var newOption = document.createElement("option");
    newOption.value = eachKey;
    newOption.innerHTML = eachKey;
	selectLocation.appendChild(newOption);
}
document.body.appendChild(selectLocation);

$("select#questType").change(function() {
$("#questObjective").remove();
var selectObjectives = document.createElement("select");
selectObjectives.setAttribute("id", "questObjective");
$(selectObjectives).change(calcQuestStats);

for(eachKey in questObjective[$("select#questType option:checked").val()]) {
	var newOption = document.createElement("option");
    newOption.value = eachKey;
    newOption.innerHTML = eachKey;
	selectObjectives.appendChild(newOption);
}
document.body.appendChild(selectObjectives);
$("#questObjective").insertAfter($("#questType"));
$("#questLocation").insertAfter($("#questObjective"));
});

function calcQuestStats(){
	var qType = questType[$("select#questType option:checked").val()];
    var qObjective = questObjective[$("select#questType option:checked").val()][$("select#questObjective option:checked").val()];
    var qLocation = questLocation[$("select#questLocation option:checked").val()];
    
    var qDifficulty = (qType.difficultyMod * qObjective.difficultyMod * qLocation.difficultyMod).toFixed(2);
	var qExperience = (qType.expMult * qObjective.expMult * qLocation.expMult).toFixed(2);
    var qDiff = document.createElement("span");
    qDiff.setAttribute("id","qDiff");
    $("#qDiff").insertAfter($("questLocation"));
    var qExp = document.createElement("span");
    qExp.setAttribute("id","qExp");
    $("#qExp").insertAfter($("qDiff"));
    $("#qDiff").html(qDifficulty*10);
    $("#qExp").html(qExperience);
    return [qDifficulty*10, qExperience];
}
$("#questType, #questLocation").change(calcQuestStats);
$("select#questType").change();

var postedQuests = [];
var linesToShow = $("select#questLength option:checked").val();

var NPCs = [];

NPCs.push({
	name: "Test",
    level: 1
});

var success = ((Math.random()*(100/((1/1*5)*10)) <= NPCs[0].level));


// -------------- HANDLERS -------------- //

function drawQuests(){
	var stats = calcQuestStats();
	postedQuests.unshift([""+$("#questType option:checked").html()+" "+$("#questObjective").val()+" "+$("#questLocation").val(), stats[0], stats[1]]);
	var finishedSet = "";
	for(i in postedQuests) {
    	if(i==linesToShow) break
		finishedSet += "<tr><td>"+postedQuests[i][0]+"</td><td>"+postedQuests[i][1]+"</td><td>"+postedQuests[i][2]+"</td></tr>";
	}
    $("#questBoard").html("<table id='questBoardTable' border='0'><tr><td>Quest</td><td>Difficulty</td><td>Exp Ratio</td></tr>"+finishedSet+"</table>");
}

$("#questLength").change(function(){ linesToShow = $("#questLength option:checked").val(); drawQuests();});
$("#makeQuest").click(drawQuests);

/*
var lastUpdate = new Date().getTime();

setInterval(function(){
  var thisUpdate = new Date().getTime();
  var diff = (thisUpdate - lastUpdate);
  diff = Math.round(diff / 1000);
  updateGame(diff); // This line is IMPORTANT
  lastUpdate = thisUpdate;
}, 1000);
*/
