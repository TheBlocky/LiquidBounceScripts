var scriptName = "BatterGameStart";
var scriptVersion = 1.0;
var scriptAuthor = "AquaVit";
script.import('lib/minecraftUtils.js');
script.import('lib/timingFunctions.js');
script.import('lib/glFunctions.js');
script.import('lib/systemFunctions.js');   
var S02PacketChat = Java.type('net.minecraft.network.play.server.S02PacketChat')
var KillauraModule = moduleManager.getModule("Killaura");
var FuckerModule = moduleManager.getModule("Fucker");
var ScaffoldModule = moduleManager.getModule("Scaffold");


var BatterGameStart = new BatterGameStart();

var client;

function BatterGameStart() {
    this.getName = function() {
        return "BatterGameStart Bedwar";
    };

    this.getDescription = function() {
        return "AquaVit.";
    };

    this.getCategory = function() {
        return "Fun";
    };
    this.onEnable = function() {}
	this.onPacket = function(event) {
	var packet = event.getPacket();
	if(packet instanceof S02PacketChat) {		
        if (packet.getChatComponent().getUnformattedText().contains("游戏开始 ...")) {
			if (KillauraModule.state == true) {
				KillauraModule.setState(false)
			}
            if (FuckerModule.state == true) {
				FuckerModule.setState(false)
				setTimeout(function() {
                    FuckerModule.setState(true)
		        }, 12000)
			} else {
				setTimeout(function() {
                    FuckerModule.setState(true)
		        }, 12000)
			}
            if (ScaffoldModule.state == true) {
				ScaffoldModule.setState(false)
			    }
			}
	    }
	};
    this.onUpdate = function() {}
    this.onDisable = function () {}
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(BatterGameStart);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}