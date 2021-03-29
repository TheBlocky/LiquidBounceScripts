var scriptName = "SpartanTeleport";
var scriptAuthor = "6Sence";
var scriptVersion = 1.0;

FreeCam = moduleManager.getModule("FreeCam");
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')

function SpartanTeleport() {

    this.getName = function () {
        return "SpartanTeleport";
    }
    this.getCategory = function () {
        return "Misc";
    }

    this.getDescription = function () {
        return "SpartanTeleport";
    }

    this.onUpdate = function () {
        if (mc.thePlayer.onGround && mc.gameSettings.keyBindSneak.pressed == true) {
            TPPosX = mc.thePlayer.posX;
            TPPosY = mc.thePlayer.posY;
            TPPosZ = mc.thePlayer.posZ;

            FreeCam.setState(false);
            teleport = true;
        }

        if (teleport == true && mc.thePlayer.posX != TPPosX && mc.thePlayer.posZ != TPPosZ) {
            mc.thePlayer.motionY = 0.01;
            mc.gameSettings.keyBindForward.pressed = false;
            mc.gameSettings.keyBindBack.pressed = false;
            mc.gameSettings.keyBindLeft.pressed = false;
            mc.gameSettings.keyBindRight.pressed = false;
            mc.gameSettings.keyBindJump.pressed = false;
			
			if (teleportTry < 20){
				mc.timer.timerSpeed = 2;
			}else{
				mc.timer.timerSpeed = 0.5;
			}
            teleportTry += 1;
            
            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, true));
            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(TPPosX, TPPosY, TPPosZ, true));
        }

        if (mc.thePlayer.posX == TPPosX && mc.thePlayer.posZ == TPPosZ) {
            chat.print("ยง6Successfully teleported with ยงc" + teleportTry + " ยง6tries. Script made by 6Sence.");
            commandManager.executeCommand(".t SpartanTeleport");
        }
    }

    this.onEnable = function () {
        FreeCam.setState(true);
		this.value = FreeCam.getValue("NoClip").get();
        FreeCam.getValue("NoClip").set(false);
        teleport = false;
        teleportTry = 0;
        chat.print("ยง6Land to teleport, Make sure to turn off noclip in freecam to work properly.");
		TPPosX = 2131;
        TPPosY = 13;
        TPPosZ = 4324;
    }
    this.onDisable = function () {
        FreeCam.getValue("NoClip").set(this.value);
        mc.timer.timerSpeed = 1;
        FreeCam.setState(false);
    }
}

var SpartanTeleport = new SpartanTeleport();
var derpClient;

function onEnable() {
    derpClient = moduleManager.registerModule(SpartanTeleport);
}

function onDisable() {
    moduleManager.unregisterModule(derpClient);
}