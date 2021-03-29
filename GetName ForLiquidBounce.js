var scriptName = "Getname";
var scriptVersion = 1.0;
var scriptAuthor = "Minger";

script.import('lib/timingFunctions.js');
script.import('lib/glFunctions.js');
script.import('lib/systemFunctions.js');   
var EntityCreature = Java.type("net.minecraft.entity.EntityCreature");
var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
var S02PacketChat = Java.type('net.minecraft.network.play.server.S02PacketChat')
function NMSL() {
	var NHPS = value.createList("NHPSetting", ["32/64", "4V4",], "32/64");
	var NHP = value.createBoolean("NHP", true);
	var LiquidBounce = Java.type('net.ccbluex.liquidbounce.LiquidBounce')
	function addFriend(Name){
		LiquidBounce.fileManager.friendsConfig.addFriend(Name)
	}
	function removeFriend(Name){
		LiquidBounce.fileManager.friendsConfig.removeFriend(Name)
	}
	this.getName = function () {
        return "Getname AquaVit";
    };

    this.getDescription = function () {
        return "AquaVit:/";
    };

    this.getCategory = function () {
        return "Fun";
    };
	
    this.onEnable = function () {	
    };
	this.onPacket = function(event) {
	var packet = event.getPacket();
	if(packet instanceof S02PacketChat) {
        if(NHP.get() == true) {		
		    switch(NHPS.get()) {
			    case "32/64":	            
				if (packet.getChatComponent().getUnformattedText().contains("之队) 死了!")) {
					addFriend(packet.getChatComponent().getUnformattedText().match(/\>> (.+?)\(/g)[0].replace('>> ','').replace('(',''));
					chat.print("§b[AquaVit] " + "§c§d添加无敌人:" + packet.getChatComponent().getUnformattedText().match(/\>> (.+?)\(/g)[0].replace('>> ','').replace('(',''));
				    setTimeout(function() {
					    removeFriend(packet.getChatComponent().getUnformattedText().match(/\>> (.+?)\(/g)[0].replace('>> ','').replace('(',''));
					    chat.print("§f[AquaVit] " + "§7删除无敌人:" + packet.getChatComponent().getUnformattedText().match(/\>> (.+?)\(/g)[0].replace('>> ','').replace('(',''));
				    }, 5800)
                } else {					              
				    addFriend(packet.getChatComponent().getUnformattedText().match(/\杀死了 (.+?)\(/g)[0].replace('杀死了 ','').replace('(',''));
				    chat.print("§b[AquaVit] " + "§c§d添加无敌人:" + packet.getChatComponent().getUnformattedText().match(/\杀死了 (.+?)\(/g)[0].replace('杀死了 ','').replace('(',''));
                    setTimeout(function() {
					    removeFriend(packet.getChatComponent().getUnformattedText().match(/\杀死了 (.+?)\(/g)[0].replace('杀死了 ','').replace('(',''))
					    chat.print("§f[AquaVit] " + "§7删除无敌人:" + packet.getChatComponent().getUnformattedText().match(/\杀死了 (.+?)\(/g)[0].replace('杀死了 ','').replace('(',''));
				    }, 5800)
				}				
				break;
			    case "4V4":
				if (packet.getChatComponent().getUnformattedText().contains("之队)死了!")) {
					addFriend(packet.getChatComponent().getUnformattedText().match(/\>> (.+?)\(/g)[0].replace('>> ','').replace('(',''));
					chat.print("§b[AquaVit] " + "§c§d添加无敌人:" + packet.getChatComponent().getUnformattedText().match(/\>> (.+?)\(/g)[0].replace('>> ','').replace('(',''));
				    setTimeout(function() {
					    removeFriend(packet.getChatComponent().getUnformattedText().match(/\>> (.+?)\(/g)[0].replace('>> ','').replace('(',''));
					    chat.print("§f[AquaVit] " + "§7删除无敌人:" + packet.getChatComponent().getUnformattedText().match(/\>> (.+?)\(/g)[0].replace('>> ','').replace('(',''));
				    }, 5100)
                } else {					              
				    addFriend(packet.getChatComponent().getUnformattedText().match(/\杀死了 (.+?)\(/g)[0].replace('杀死了 ','').replace('(',''));
				    chat.print("§b[AquaVit] " + "§c§d添加无敌人:" + packet.getChatComponent().getUnformattedText().match(/\杀死了 (.+?)\(/g)[0].replace('杀死了 ','').replace('(',''));
                    setTimeout(function() {
					    removeFriend(packet.getChatComponent().getUnformattedText().match(/\杀死了 (.+?)\(/g)[0].replace('杀死了 ','').replace('(',''))
					    chat.print("§f[AquaVit] " + "§7删除无敌人:" + packet.getChatComponent().getUnformattedText().match(/\杀死了 (.+?)\(/g)[0].replace('杀死了 ','').replace('(',''));
				    }, 5100)
				}												
				break;
			    }
	        }				
		}	
	}
    
    this.onUpdate = function () {

	}
	this.addValues = function(values) {
		values.add(NHPS);
		values.add(NHP);
    }
}


var NSML = new NMSL();

var NMML;

function onLoad() {

}

function onEnable() {
    NMML = moduleManager.registerModule(NSML);
}

function onDisable() {
    moduleManager.unregisterModule(NMML);
}