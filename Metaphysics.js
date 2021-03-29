var scriptName = "ArmorBraker";
var scriptAuthor = "C03憨憨";
var scriptVersion = 0.00000001;
var C09PacketHeldItemChange = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange');

function ExampleModule() {
    this.getName = function() {
        return "Metaphysics";
    }
    this.getDescription = function() {
        return "AquaVit";
    }
    this.getCategory = function() {
        return "Fun"; 
    }

    this.onUpdate = function (  ) {
		 return -min + (int)(Math.random() * (max - -min + 1));
        this.mc.thePlayer.sendQueue.addToSendQueue(new C09PacketHeldItemChange(this.mc.thePlayer.inventory.currentItem));
    }
}
var exampleModule = new ExampleModule();
var exampleModuleClient;

function onLoad() {}

function onEnable() {
    exampleModuleClient = moduleManager.registerModule(exampleModule);
}

function onDisable() {
    moduleManager.unregisterModule(exampleModuleClient);
}   