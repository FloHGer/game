var currScene, option;
var bagStatus = false, bagItem = 0;
var bagContent = ["stone"];
var dungeonOptions = ["a pile of ruins.", "a dirty sheet.", "the door.", "Azruk."];
var dungeon2Options = ["a skeleton.", "the tunnel.", "a spoon.", "a key."];
document.cookie = "";

// keyboard input
document.onkeydown = checkKey;
function checkKey(k) {
  
    k = k || window.event;
    switch(k.keyCode){
    case 38:
    // up arrow - interact
        if(bagStatus == false){
            window["scene"][currScene](10);
        }else if(bagStatus == true){
            //interaction with item goes here
        }
        break;
    case 37 :
    // left arrow
        if(bagStatus == false){
            document.getElementById("info").innerHTML = "";
            window["scene"][currScene](-1);
        }else if(bagStatus == true){
            bag(-1);
        }
        break;
    case 39:
    // right arrow
        if(bagStatus == false){
            document.getElementById("info").innerHTML = "";
            window["scene"][currScene](1);
        }else if(bagStatus == true){
            bag(1);
        }
        break;
    case 40:
    // down arrow - bag open/close
        if(bagStatus == false || bagStatus == undefined){
            bagStatus = true;
            document.getElementById("bagLabel").innerHTML = "Bag: ";
            document.getElementById("bag").innerHTML = bagContent[0];
        }else if(bagStatus == true){
            bagStatus = false;
            document.getElementById("bagLabel").innerHTML = "";
            document.getElementById("bag").innerHTML = "";
        }
        break;
    default:
    }
}


// bag
function bag(c){
   
    bagItem += c;

    // cycle
    if(bagItem > (bagContent.length - 1)){
        bagItem -= bagContent.length;
    }else if(bagItem < 0){
        bagItem = bagContent.length - 1;
    }

    // print option
    return document.getElementById("bag").innerHTML = bagContent[bagItem];
}


// scenes
var scene = {
    
    dungeon : function(d){
        
        switch(d){
            case 0:
            // init
                option = 0;
                currScene = "dungeon";
                document.getElementById("location").innerHTML = "Dungeon";
                break;
            case 10:
            // interact
                switch(option){
                    case 0:
                        document.getElementById("info").innerHTML = "Here you fell through the ceiling.";
                        return;
                    case 1:
                        if(dungeonOptions[1] == "a dirty sheet."){
                            dungeonOptions[1] = "a tunnel.";
                            document.getElementById("view").innerHTML = dungeonOptions[1];
                            document.getElementById("info").innerHTML = "You removed the sheet and found a tunnel.";
                            return;
                        }else if(dungeonOptions[1] == "a tunnel."){
                        // move to dungeon2
                            option = 0;
                            currScene = "dungeon2";
                            document.getElementById("location").innerHTML = "Dungeon 2";
                            document.getElementById("info").innerHTML = "You went through the tunnel to another Dungeon.";
                            document.getElementById("view").innerHTML = dungeon2Options[option];
                            return;
                        }
                        break;
                    case 2:
                        if(dungeonOptions[2] == "the door."){
                            if(bagContent.includes("key")){
                                dungeonOptions[2] = "the opened Door.";
                                bagContent.slice(bagContent.indexOf("key"), 1);
                                // remove key from bag
                                document.getElementById("view").innerHTML = dungeonOptions[2];
                                document.getElementById("info").innerHTML = "You opened the Door";
                                
                                return;
                            }else{
                                document.getElementById("info").innerHTML = "The door is locked.";
                                return;
                            }
                        }else if(dungeonOptions[2] == "the opened Door."){
                            document.getElementById("view").innerHTML = "freedom!";
                            document.getElementById("info").innerHTML = "Congratulations, you passed the test ;)";
                            return;
                        }
                        break;
                    case 3:
                        document.getElementById("info").innerHTML = "Hi, I'm Azruk, the dungeon master!";
                        return;
                }
                break;
            default:
            // change option
                option += d;
                document.cookie = "";
                break;
        }
        
        // cycle
        if(option > (dungeonOptions.length - 1)){
            option -= dungeonOptions.length;
        }else if(option < 0){
            option = dungeonOptions.length - 1;
        }

        // print option
        return document.getElementById("view").innerHTML = dungeonOptions[option];
    },

    dungeon2 : function(d){
        
        switch(d){
            case 0:
            // init
                option = 0;
                currScene = "dungeon2";
                document.getElementById("location").innerHTML = "Dungeon 2";
                break;
            case 10:
            // interact
                switch(option){
                    case 0:
                        document.getElementById("info").innerHTML = "It looks the way you feel right now.";
                        return;
                    case 1:
                    // move back to dungeon1
                        option = 0;
                        currScene = "dungeon";
                        document.getElementById("location").innerHTML = "Dungeon";
                        document.getElementById("info").innerHTML = "You went back through the tunnel.";
                        document.getElementById("view").innerHTML = dungeonOptions[option];
                        return;
                    case 2:
                        document.getElementById("info").innerHTML = "You don't want to dig yourself out of the dungeon.";
                        return;
                    case 3:
                    // key
                        if(dungeon2Options.includes("a key.")){
                            dungeon2Options[3] = "an empty place."
                            bagContent.push("key");
                            document.getElementById("view").innerHTML = dungeon2Options[3];
                            document.getElementById("info").innerHTML = "You put the key into your bag.";
                            return;
                        }else{
                            document.getElementById("info").innerHTML = "It's nothing here anymore.";
                            return;
                        }   
                }
                break;
            default:
            // change option
                option += d;
                break;
        }
        
        // cycle
        if(option > (dungeon2Options.length - 1)){
            option -= dungeon2Options.length;
        }else if(option < 0){
            option = dungeon2Options.length - 1;
        }

        // print option
        return document.getElementById("view").innerHTML = dungeon2Options[option];
    },
};