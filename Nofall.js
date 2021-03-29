var scriptName = "NofallPlus";
var scriptVersion = 1.0;
var scriptAuthor = "Minger";
var NofallModule = moduleManager.getModule("NOFALL");

var NofallPlus = new NofallPlus();

var client;

function NofallPlus() {
    this.getName = function() {
        return "NofallPlus";
    };

    this.getDescription = function() {
        return "By Minger 23333.";
    };

    this.getCategory = function() {
        return "Fun";
    };
    this.onEnable = function() {
		NofallModule.setState(false)
    }
    this.onUpdate = function() {
		mc.thePlayer.setSprinting(true)
        if (mc.gameSettings.keyBindJump.isKeyDown() && (mc.thePlayer.fallDistance > 5)) {

			NofallModule.setState(true)

}else{
		NofallModule.setState(false)
		}
}
    this.onDisable = function () {
        NofallModule.setState(true)
    }
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(NofallPlus);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}