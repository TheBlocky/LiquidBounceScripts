var scriptName = "Effect HUD"; // The name of your script
var scriptVersion = 1.11; // The version of your script 
var scriptAuthor = "Mum I can be a great skidder"; // The author of your script (eg. your username)

var DefaultVertexFormats = Java.type('net.minecraft.client.renderer.vertex.DefaultVertexFormats');
var GlStateManager = Java.type('net.minecraft.client.renderer.GlStateManager');
var WorldRenderer = Java.type('net.minecraft.client.renderer.WorldRenderer');
var ResourceLocation = Java.type("net.minecraft.util.ResourceLocation");
var Tessellator = Java.type('net.minecraft.client.renderer.Tessellator');
var PotionEffect = Java.type('net.minecraft.potion.PotionEffect');
var IInventory = Java.type('net.minecraft.inventory.IInventory');
var I18n = Java.type('net.minecraft.client.resources.I18n');
var Potion = Java.type('net.minecraft.potion.Potion');
var Collection = Java.type('java.util.Collection');
var Color = Java.type('java.awt.Color');

script.import("lib/systemFunctions.js");
script.import("lib/glFunctions.js");

function drawRectWithSmoothCorner(paramXStart, paramYStart, paramXEnd, paramYEnd, radius, color) {	
	var xStart = paramXStart;
	var yStart = paramYStart;
	var xEnd = paramXEnd;
	var yEnd = paramYEnd;
	var x1 = xStart + radius;
	var y1 = yStart + radius;
	var x2 = xEnd - radius;
	var y2 = yEnd - radius;
	
	drawRect(x1, y1, x2, y2, color);//中心
	drawRect(x1, yStart, x2, y1, color);//上
	drawRect(x1, y2, x2, yEnd, color);//下
	drawRect(xStart, y1, x1, y2, color);//左
	drawRect(x2, y1, xEnd, y2, color);//右
	drawSector(x2, y2, radius, 0, 90, color);
	drawSector(x2, y1, radius, 90, 180, color);
	drawSector(x1, y1, radius, 180, 270, color);
	drawSector(x1, y2, radius, 270, 360, color);
}

function drawSector(paramX, paramY, radius, angleStart, angleEnd, color) {
	var alpha = (color >> 24 & 0xFF) / 255;
    var red = (color >> 16 & 0xFF) / 255;
    var green = (color >> 8 & 0xFF) / 255;
    var blue = (color & 0xFF) / 255;

    GL11.glColor4f(red, green, blue, alpha);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
    GL11.glEnable(GL11.GL_LINE_SMOOTH);
    GL11.glPushMatrix();
    GL11.glLineWidth(1);
    GL11.glBegin(GL11.GL_POLYGON);
	GL11.glVertex2d(paramX, paramY);
    for (var i = angleStart; i <= angleEnd; i++)
        GL11.glVertex2d(paramX + Math.sin(i * Math.PI / 180) * radius, paramY + Math.cos(i * Math.PI / 180) * radius);
    GL11.glEnd();
    GL11.glPopMatrix();
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_LINE_SMOOTH);
    GL11.glColor4f(1, 1, 1, 1);
}

function EffectHUD() {

	var bgMode = value.createList("BackGroundTheme", ["ResourcePack", "Custom"], "ResourcePack");
	this.getName = function() {
		return "PotionHUD";
	}
	this.getDescription = function() {
		return "Render a effect HUD.";
	}
	this.getCategory = function() {
		return "Fun"; // Combat, Exploit, Fun, Misc, Movement, Player, Render, World
	}
	this.addValues = function(event) {
	}
	var inventoryBackground = new ResourceLocation("textures/gui/container/inventory.png");
	this.onRender2D = function(event) {
		function drawTexturedModalRect(x, y, textureX, textureY, width, height) {
			var f = 0.00390625;
			var f1 = 0.00390625;
			var tessellator = Tessellator.getInstance();
			var worldrenderer = tessellator.getWorldRenderer();
			worldrenderer.begin(7, DefaultVertexFormats.POSITION_TEX);
			worldrenderer.pos(x + 0, y + height, 0.0).tex((textureX + 0) * f, (textureY + height) * f1).endVertex();
			worldrenderer.pos(x + width, y + height, 0.0).tex((textureX + width) * f, (textureY + height) * f1).endVertex();
			worldrenderer.pos(x + width, y + 0, 0.0).tex((textureX + width) * f, (textureY + 0) * f1).endVertex();
			worldrenderer.pos(x + 0, y + 0, 0.0).tex((textureX + 0) * f, (textureY + 0) * f1).endVertex();
			tessellator.draw();
		}

		var customColor = new Color(0, 0, 0, 80).getRGB();
		if (! (mc.currentScreen != null && mc.currentScreen instanceof IInventory)) {
			GlStateManager.pushMatrix();
			var i = getScaledWidth() - getScaledWidth()/8;
			var j = getScaledHeight()/2 + 200;//高度
			var collection = mc.thePlayer.getActivePotionEffects();
			var collection1 = mc.thePlayer.getActivePotionEffects().toArray();
			if (!collection.isEmpty()) {
				GlStateManager.color(1.0, 1.0, 1.0, 1.0);
				GlStateManager.disableLighting();
				var l = 25;

				
				GlStateManager.color(1.0, 1.0, 1.0, 1.0);
				for (I11i in collection1) {
				mc.getTextureManager().bindTexture(inventoryBackground);
					var potioneffect = collection1[I11i];
					var potion = Potion.potionTypes[potioneffect.getPotionID()];
					if (!potion.shouldRender(potioneffect)) continue;
							drawRectWithSmoothCorner(i, j, i + 120, j + 26.9, 0, customColor);
							drawRectWithSmoothCorner(i, j, i + 2, j + 26.9, 0, 0xFF99FFCC);
							drawRectWithSmoothCorner(i, j, i + 120, j + 2, 0, 0xFF99FFCC);
							drawRectWithSmoothCorner(i, j+24.9, i + 120, j + 26.9, 0, 0xFF99FFCC);
					if (potion.hasStatusIcon()) {
						var i1 = potion.getStatusIconIndex();
						drawTexturedModalRect(i + 6, j + 5, 0 + (i1 % 8) * 18, 198 + parseInt(i1 / 8) * 18, 18, 18);
					}
					//potion.renderInventoryEffect(i, j, potioneffect, mc);
					if (!potion.shouldRenderInvText(potioneffect)) continue;
					var s1 = I18n.format(potion.getName());
					if(potioneffect.getAmplifier() == 0)  s1 = s1 + " I";
					else if (potioneffect.getAmplifier() == 1) s1 = s1 + " II";
					else if (potioneffect.getAmplifier() == 2) s1 = s1 + " III";
					else if (potioneffect.getAmplifier() == 3) s1 = s1 + " IV";
					else if (potioneffect.getAmplifier() == 4) s1 = s1 + " V";
					else if (potioneffect.getAmplifier() == 5) s1 = s1 + " VI";
					else if (potioneffect.getAmplifier() == 6) s1 = s1 + " VII";
					else if (potioneffect.getAmplifier() == 7) s1 = s1 + " VIII";
					else if (potioneffect.getAmplifier() == 8) s1 = s1 + " IX";
					else if (potioneffect.getAmplifier() == 9) s1 = s1 + " X";
					else if (potioneffect.getAmplifier() >= 10) s1 = s1 + " X+";
					else s1 = s1 + " Unknown level";

					//Fonts.font40.drawString("s1", i + 10 + 18, j + 6, (color.get() ? potion.getLiquidColor() : 16777215));
					mc.fontRendererObj.drawStringWithShadow(s1, i + 10 + 18, j + 6, (false ? potion.getLiquidColor() : 16777215));
					var s = Potion.getDurationString(potioneffect);
					mc.fontRendererObj.drawStringWithShadow(s, i + 10 + 18, j + 16, 8355711);
					j -= l;

				}
			}
			GlStateManager.popMatrix();
		}
	}
}
var effectHUD = new EffectHUD();
var effectHUDClient;

function onLoad() {};

function onEnable() {
	effectHUDClient = moduleManager.registerModule(effectHUD);
};

function onDisable() {
	moduleManager.unregisterModule(effectHUDClient);
};