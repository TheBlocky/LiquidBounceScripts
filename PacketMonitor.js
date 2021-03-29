var scriptName = "PacketMonitor";
var scriptVersion = 1.0;
var scriptAuthor = "AquaVit";
script.import('lib/minecraftUtils.js');
script.import('lib/timingFunctions.js');
script.import('lib/glFunctions.js');
script.import('lib/systemFunctions.js');   
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');

var PacketMonitor = new PacketMonitor();
var client;

function PacketMonitor() {
	var Count = 0;
	var ticks = 0;
	var a = false;
    this.getName = function() {
        return "PacketMonitor";
    };

    this.getDescription = function() {
        return "AquaVit.";
    };

    this.getCategory = function() {
        return "Fun";
    };
    this.getTag = function() {
        return "" + Count.toString();
	};
	this.onEnable = function() {
		ticks = 0;
		a = false;
		Count = 0;
	}
	this.onPacket = function(event) {
	var packet = event.getPacket();
	if(packet instanceof C03PacketPlayer) {		
        Count = Count + 1
		a = true;
	    }
	};
    this.onUpdate = function() {
		if (a == true) {
			ticks++;
		}
		if (Count > 21) {
			chat.print('§b[AquaVit]§d发包数量不正常!当前发包频率' + Count + "/s")
		}
		if (ticks == 20) {
			a = false
			ticks = 0;
			Count = 0;
		}		
	}
    this.onDisable = function () {}
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(PacketMonitor);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}