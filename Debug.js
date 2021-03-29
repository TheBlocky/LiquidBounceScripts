var scriptName = "Debug";
var scriptVersion = 1.0;
var scriptAuthor = "AquaVit";

script.import('lib/minecraftUtils.js');
script.import('lib/timingFunctions.js');
script.import('lib/glFunctions.js');
script.import('lib/systemFunctions.js'); 

var r, g, b, rainbowspeed;
var thicc;
var borderColor;
var borderOpacity;
var borderColorComplete = '0x' + borderOpacity + borderColor;
var rainbowBoolean;
var c;
var PlayerHeight;
var j;
var VelocityModule = moduleManager.getModule("Velocity");

var Debug = new Debug();
var client;

function Debug() {
	var X;
	var debug = value.createBoolean("Debug", true);
	var AirVelocity = value.createBoolean("AirVelocity", true);
    this.getName = function() {
        return "Debug";
    };

    this.getDescription = function() {
        return "AquaVit";
    };

    this.getCategory = function() {
        return "Fun";
    };
    this.onEnable = function() {
	    borderOpacity = 'FF';
		borderColor = 'DA70D6';
		c = 0;
		thicc = 2;
		rainbowspeed = 40 / 500;  	
    }
    this.onUpdate = function() {
		PlayerHeight = mc.thePlayer.posY.toFixed(1);
		J = PlayerHeight.split(".");
		X = J[1]
		if(AirVelocity.get()) {
			if(mc.thePlayer.onGround) {
				VelocityModule.setState(true)
			} else {
				VelocityModule.setState(false)
			}
		}
		if (mc.ingameGUI.getChatGUI().getChatOpen() == false) {
			if (true) {
				if (44 > c) {
					r = parseInt((Math.sin(c + Math.PI) + 1) * 127.5);
					g = parseInt((Math.sin(c + (Math.PI / 2)) + 1) * 127.5);
					b = parseInt(((Math.sin(c) + 1) * 127.5));
					c = c + rainbowspeed;
					borderColor = ('0' + r.toString(16)).slice(-2) + ('0' + g.toString(16)).slice(-2) + ('0' + b.toString(16)).slice(-2)
				} else {
					c = 0;
				}
			}
		}        
	}
	this.onRender2D = function() {
		if (mc.ingameGUI.getChatGUI().getChatOpen() == false) {
			var mcHeight = getScaledHeight();
			var mcWidth = getScaledWidth();
			borderColorComplete = '0x' + borderOpacity + borderColor;
			if(debug.get()) {				
			    if (mc.thePlayer.onGround && X == 5) {
				    mc.fontRendererObj.drawStringWithShadow("Debug! You're on incomplete block!", mcWidth - mcWidth / 2 - 58, mcHeight - mcHeight / 2 - 15, 0xFF3300)
				}
			}
		}
	}
    this.onDisable = function () {}
	this.addValues = function(values) {
		values.add(debug);
		values.add(AirVelocity);
	}

}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(Debug);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}