var scriptName = "RealBobbing";
var scriptVersion = 1.0;
var scriptAuthor = "Soulplexis";


function RealBob() {
    var Speed = value.createFloat("BobAmount", 0.05, 0, 1);
    this.getName = function () {
        return "RealBobbing";
    };

    this.getDescription = function () {
        return "Modify view bobbing.";
    };

    this.getCategory = function () {
        return "Render";
    };
    this.onMotion = function () {
				if(mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed) {
		if(mc.thePlayer.onGround) {
		mc.thePlayer.cameraYaw = Speed.get();
		}
		} else {
			mc.thePlayer.cameraYaw = 0.0;
		}
    } 
    this.onDisable = function() {
    }
    
    this.onEnable = function() {
    }

    this.addValues = function(values) {
        values.add(Speed);
    }
}
var RealBob = new RealBob();
var RealBobClient;

function onEnable() {
    RealBobClient = moduleManager.registerModule(RealBob);
};

function onDisable() {
    moduleManager.unregisterModule(RealBobClient);
};