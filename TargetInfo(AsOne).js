KillAura = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager.getModule(Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura").class);
EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer");
StringUtils = Java.type("net.minecraft.util.StringUtils");
Gui = Java.type("net.minecraft.client.gui.Gui");
GL11 = Java.type("org.lwjgl.opengl.GL11");
Color = Java.type("java.awt.Color");

Fonts = Java.type("net.ccbluex.liquidbounce.ui.font.Fonts");
FontList = Fonts.getFonts();

var font
var ii


list = [
	x = value.createInteger("X", 430, 0, 1000),
	y = value.createInteger("Y", 310, 0, 1000),

	Scale = value.createFloat("Scale", 1, 0.2, 4),

	BGRed = value.createInteger("BGRed", 0, 0, 255),
	BGGreen = value.createInteger("BGGreen", 0, 0, 255),
	BGBlue = value.createInteger("BGBlue", 0, 0, 255),
	BGAlpha = value.createInteger("BGAlpha", 150, 0, 255),

	TextRed = value.createInteger("TextRed", 255, 0, 255),
	TextGreen = value.createInteger("TextGreen", 255, 0, 255),
	TextBlue = value.createInteger("TextBlue", 255, 0, 255),
	TextY = value.createFloat('TextY', 0, -5, 5),
	ShadowText = value.createBoolean('ShadowText', true),

	BorederValue = value.createBoolean('Boreder', true),
	BorderRed = value.createInteger("BorderRed", 255, 0, 255),
	BorderGreen = value.createInteger("BorderGreen", 255, 0, 255),
	BorderBlue = value.createInteger("BorderBlue", 255, 0, 255),
	BorderAlpha = value.createInteger("BorderAlpha", 255, 0, 255),
	BorderStrength = value.createFloat("BorderStrength", 2, 0, 8),

	FontValue = value.createInteger('', 0, 0, FontList.length - 1),
	Font = value.createText('Font ', Fonts.getFonts()[0].getDefaultFont().getFont().getName())

]

module = {
	name: "TargetInfo",
	description: "Renders informations about current target.",
	author: "natte && As丶One",
	values: list,
	onRender2D: function () {

		if (mc.thePlayer != null && KillAura.target instanceof EntityPlayer) {
			var playerInfo = mc.getNetHandler().getPlayerInfo(KillAura.target.getUniqueID());

			var name = StringUtils.stripControlCodes(KillAura.target.getName());
			var distance = mc.thePlayer.getDistanceToEntity(KillAura.target).toFixed(2);
			var health = (KillAura.target.getHealth() / 2).toFixed(2);
			var ping = playerInfo == null ? "0ms" : playerInfo.getResponseTime() + "ms";

			var width = 140;
			var height = 44;

			var BGColor = new Color(BGRed.get(), BGGreen.get(), BGBlue.get(), BGAlpha.get()).getRGB();
			var TextColor = new Color(TextRed.get(), TextGreen.get(), TextBlue.get()).getRGB();
			var BorederColor = new Color(BorderRed.get(), BorderGreen.get(), BorderBlue.get(), BorderAlpha.get()).getRGB();

			var inc = 96 / KillAura.target.getMaxHealth();
			var end = inc * (KillAura.target.getHealth() > KillAura.target.getMaxHealth() ? KillAura.target.getMaxHealth() : KillAura.target.getHealth());

			GL11.glPushMatrix();
			GL11.glScaled(Scale.get(), Scale.get(), Scale.get());

			drawRect(x.get(), y.get(), x.get() + width, y.get() + height, BGColor);
			drawBorder(x.get(), y.get(), width, height, BorderStrength.get(), BorederColor);

			if (ShadowText.get()) {
				font.drawStringWithShadow("Name: " + name, x.get() + 46.5, y.get() + 4 + TextY.get(), TextColor);
				font.drawStringWithShadow("Distance: " + distance, x.get() + 46.5, y.get() + 12 + TextY.get(), TextColor);
				font.drawStringWithShadow("Health: " + health, x.get() + 46.5, y.get() + 20 + TextY.get(), TextColor);
				font.drawStringWithShadow("Ping: " + ping, x.get() + 46.5, y.get() + 28 + TextY.get(), TextColor);
			} else {
				font.drawString("Name: " + name, x.get() + 46.5, y.get() + 4 + TextY.get(), TextColor);
				font.drawString("Distance: " + distance, x.get() + 46.5, y.get() + 12 + TextY.get(), TextColor);
				font.drawString("Health: " + health, x.get() + 46.5, y.get() + 20 + TextY.get(), TextColor);
				font.drawString("Ping: " + ping, x.get() + 46.5, y.get() + 28 + TextY.get(), TextColor);
			}

			drawFace(x.get() + 0.5, y.get() + 0.5, 8, 8, 8, 8, 44, 44, 64, 64);

			drawRect(x.get() + 44, y.get() + 36, x.get() + width, y.get() + 0.5 + height, new Color(35, 35, 35).getRGB());
			drawRect(x.get() + 44, y.get() + 36, x.get() + 44 + end, y.get() + 0.5 + height, getHealthColor(KillAura.target));

			GL11.glPopMatrix();
		}
	},
	onUpdate: function () {
		if (ii != FontValue.get()) {
			ii = FontValue.get();
			font = Fonts.getFonts()[ii];
			Font.set(font == mc.fontRendererObj ? 'Minecraft' : font.getDefaultFont().getFont().getName());
		}
	},
	onEnable: function () {
		ii = FontValue.get();
		font = FontList[ii];
		Font.set(font == mc.fontRendererObj ? 'Minecraft' : font.getDefaultFont().getFont().getName());
	}
}

function drawFace(x, y, u, v, uWidth, vHeight, width, height, tileWidth, tileHeight) {
	var texture = KillAura.target.getLocationSkin();

	mc.getTextureManager().bindTexture(texture);

	GL11.glEnable(GL11.GL_BLEND);
	GL11.glColor4f(1, 1, 1, 1);

	Gui.drawScaledCustomSizeModalRect(x, y, u, v, uWidth, vHeight, width, height, tileWidth, tileHeight);

	GL11.glDisable(GL11.GL_BLEND);
}

function drawRect(x1, y1, x2, y2, color) {
	Gui.drawRect(x1, y1, x2, y2, color);
}

function drawBorder(x, y, width, height, thickness, color) {
	drawRect(x - thickness, y - thickness, x + width + thickness, y, color);
	drawRect(x - thickness, y + height, x + width + thickness, y + height + thickness, color);
	drawRect(x - thickness, y, x, y + height, color);
	drawRect(x + width, y, x + width + thickness, y + height, color);
}

function getHealthColor(player) {
	var health = player.getHealth();
	var maxHealth = player.getMaxHealth();

	return Color.HSBtoRGB(Math.max(0.0, Math.min(health, maxHealth) / maxHealth) / 3.0, 1.0, 0.75) | 0xFF000000;
}

script.import("Core.lib");