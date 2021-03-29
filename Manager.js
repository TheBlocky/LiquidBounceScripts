///api_version=2
(script = registerScript({
    name: "Manager",
    version: "2.0",
    authors: ["natte", "CzechHek"]
})).import("Core.lib");

HudConfig = Java.type("net.ccbluex.liquidbounce.file.configs.HudConfig");
FileConfig = Java.type("net.ccbluex.liquidbounce.file.FileConfig");
OutputStreamWriter = Java.type("java.io.OutputStreamWriter");
Fonts = Java.type("net.ccbluex.liquidbounce.ui.font.Fonts");
FileOutputStream = Java.type("java.io.FileOutputStream");
JsonElement = Java.type("com.google.gson.JsonElement");
GsonBuilder = Java.type("com.google.gson.GsonBuilder");
Collectors = Java.type("java.util.stream.Collectors");
JsonObject = Java.type("com.google.gson.JsonObject");
IOUtils = Java.type("org.apache.commons.io.IOUtils");
JsonParser = Java.type("com.google.gson.JsonParser");
URLConnection = Java.type("java.net.URLConnection");
Channels = Java.type("java.nio.channels.Channels");
PrintWriter = Java.type("java.io.PrintWriter");
Runnable = Java.type("java.lang.Runnable");
Files = Java.type("java.nio.file.Files");
Integer = Java.type("java.lang.Integer");
System = Java.type("java.lang.System");
Arrays = Java.type("java.util.Arrays");
Thread = Java.type("java.lang.Thread");
Long = Java.type("java.lang.Long");
Font = Java.type("java.awt.Font");
URL = Java.type("java.net.URL");

baseUrl = "https://cloud.natte.dev/manager/"
devMode = false;

command = {
    commands: ["Manager", "mngr", "m"],
    subcommands: {config:{list:{online:"",local:""},download:"name",upload:"name",save:"name",load:"name",delete:"name",folder:""},theme:{list:{online:"",local:""},download:"name",upload:"name",save:"name",load:"name",delete:"name",folder:""},script:{list:{online:"",local:""},download:"name",upload:"name",load:"name",delete:"name",folder:""},music:{list:{online:"",local:""},download:"name",upload:"name",delete:"name",folder:""}},
    onExecute: function (args) {
        if (!new File("LiquidBounce-1.8/themes/").exists()) new File("LiquidBounce-1.8/themes/").mkdir();
        if (!new File("LiquidBounce-1.8/settings/").exists()) new File("LiquidBounce-1.8/settings/").mkdir();
        musicPlayerInstalled = !!findScript("MusicPlayer", "natte");

        try {
            if (musicPlayerInstalled && args[1] == "music") {
                switch (args[2]) {
                    case "list": {
                        switch (args[3]) {
                            case "online": {
                                response = HttpUtils.get(baseUrl + "list?type=music");

                                json = toJsonObject(response);
                                array = json.get("message").getAsJsonArray();
                                
                                chat.print("§8▏ §7Online songs§8: (§7" + array.size() + "§8)");
                                for (i = 0; i < array.size(); i++) {
                                    name = array.get(i).getAsString();
                                    index = i + 1;
                                    chat.print("§8▏ §8[§7" + index + "§8]§7 " + name);
                                }
                                break;
                            }

                            case "local": {
                                LiquidBounce.commandManager.executeCommands(".mp list");
                                break;
                            }
                        }
                        break;
                    }

                    case "download": {
                        if (downloadFile(baseUrl + "songs/" + args[3] + ".mp3", file = new File("LiquidBounce-1.8/music/" + args[3] + ".mp3"))) {
                            chat.print("§8▏ §aDownloaded '§2§l" + args[3] + ".mp3§a'");
                        }
                        break;
                    }

                    case "upload": {
                        file = new File("LiquidBounce-1.8/music/" + args[3] + ".mp3");

                        if (!file.exists()) {
                            printError("Couldn't find '§4§l" + args[3] + ".mp3§c'");
                            return;
                        }

                        response = uploadFile(baseUrl + "upload?type=song", file);
                                            
                        json = toJsonObject(response);
                        code = json.get("code").getAsInt();
                        message = json.get("message").getAsString();
                        
                        if (code == 0) {
                            printError(message);
                        } else {
                            chat.print("§8▏ §aUploaded '§2§l" + file.getName() + "§a'");
                        }
                        break;
                    }

                    case "delete": {
                        file = new File("LiquidBounce-1.8/music/" + args[3] + ".mp3");

                        if (!file.exists()) {
                            printError("Couldn't find '§4§l" + args[3] + ".mp3§c'");
                            return;
                        }

                        chat.print("§8▏ §cDeleted '§4§l" + file.getName() + "§c'");
                        break;
                    }

                    case "folder": {
                        LiquidBounce.commandManager.executeCommands(".mp folder");
                        break;
                    }
                }
            } else if (!musicPlayerInstalled && args[1] == "music") {
                printError("MusicPlayer Script is not installed!");
            } else {
                switch (args[1]) {
                    case "script": {
                        switch (args[2]) {
                            case "list": {
                                switch (args[3]) {
                                    case "online": {
                                        response = get(baseUrl + "list?type=scripts");
        
                                        json = toJsonObject(response);
                                        array = json.get("message").getAsJsonArray();
                                        
                                        chat.print("§8▏ §7Online scripts§8: (§7" + array.size() + "§8)");
                                        for (i = 0; i < array.size(); i++) {
                                            name = array.get(i).getAsString();
                                            index = i + 1;
                                            chat.print("§8▏ §8[§7" + index + "§8]§7 " + name);
                                        }
                                        break;
                                    }
        
                                    case "local": {
                                        folder = new File("LiquidBounce-1.8/scripts");
        
                                        if (!folder.exists()) return;
        
                                        array = [];
                                    
                                        for (i = 0; i < folder.listFiles().length; i++) {
                                            if (folder.listFiles()[i].getName().endsWith(".js")) {
                                                array.push(folder.listFiles()[i].getName().replace(".js", ""))
                                            }
                                        }
                                    
                                        chat.print("§8▏ §7Local scripts: §8(§7" + array.length + "§8)");
                                        for (i in array) chat.print("§8▏ §8[§7" + (parseInt(i) + 1) + "§8]§7 " + array[i]);
                                    }
                                }
        
                                break;
                            }
        
                            case "download": {
                                downloadLibs();
        
                                if (downloadFile(baseUrl + "scripts/" + args[3] + ".js", file = new File("LiquidBounce-1.8/scripts/" + args[3] + ".js"))) {
                                    chat.print("§8▏ §aDownloaded '§2§l" + args[3] + ".js§a'");
        
                                    LiquidBounce.scriptManager.loadScript(file);
        
                                    chat.print("§8▏ §aLoaded '§2§l" + file.getName() + "§a'");
                                }
                                break;
                            }
        
                            case "upload": {
                                file = new File("LiquidBounce-1.8/scripts/" + args[3] + ".js");
        
                                if (!file.exists()) {
                                    printError("Couldn't find '§4§l" + args[3] + ".js§c'");
                                    return;
                                }
        
                                response = uploadFile(baseUrl + "upload?type=script", file);
                            
                                json = toJsonObject(response);
                                code = json.get("code").getAsInt();
                                message = json.get("message").getAsString();
                                
                                if (code == 0) {
                                    printError(message);
                                } else {
                                    chat.print("§8▏ §aUploaded '§2§l" + file.getName() + "§a'");
                                }
                                break;
                            }
        
                            case "delete": {
                                file = new File("LiquidBounce-1.8/scripts/" + args[3] + ".js");
        
                                if (!file.exists()) {
                                    printError("Couldn't find '§4§l" + args[3] + ".js§c'");
                                    return;
                                }
                                LiquidBounce.scriptManager.deleteScript(new Script(file));
        
                                chat.print("§8▏ §cDeleted '§4§l" + file.getName() + "§c'");
                                break;
                            }

                            case "folder": {
                                folder = new File("LiquidBounce-1.8/scripts/");
                                Java.type("java.awt.Desktop").getDesktop().open(folder);
                                chat.print("§8▏ §aFolder opened");
                                break;
                            }
                        }
                        break;
                    }
        
                    case "config": {
                        switch (args[2]) {
                            case "list": {
                                switch (args[3]) {
                                    case "online": {
                                        response = HttpUtils.get(baseUrl + "list?type=configs");
        
                                        json = toJsonObject(response);
                                        array = json.get("message").getAsJsonArray();
                                        
                                        chat.print("§8▏ §7Online configs: §8(§7" + array.size() + "§8)");
                                        for (i = 0; i < array.size(); i++) {
                                            name = array.get(i).getAsString();
                                            index = i + 1;
                                            chat.print("§8▏ §8[§7" + index + "§8]§7 " + name);
                                        }
                                        break;
                                    }
        
                                    case "local": {
                                        folder = new File("LiquidBounce-1.8/settings");
        
                                        if (!folder.exists()) return;
        
                                        array = [];
                                    
                                        for (i = 0; i < folder.listFiles().length; i++) {
                                            if (folder.listFiles()[i].getName().endsWith("")) {
                                                array.push(folder.listFiles()[i].getName())
                                            }
                                        }
                                    
                                        chat.print("§8▏ §7Local configs: §8(§7" + array.length + "§8)");
                                        for (i in array) chat.print("§8▏ §8[§7" + (parseInt(i) + 1) + "§8]§7 " + array[i]);
                                    }
                                }
                                break;
                            }
        
                            case "download": {
                                if (downloadFile(baseUrl + "configs/" + args[3], new File("LiquidBounce-1.8/settings/" + args[3]))) {
                                    chat.print("§8▏ §aDownloaded '§2§l" + args[3] + "§a'");
                                }
                                break;
                            }
        
                            case "upload": {
                                file = new File("LiquidBounce-1.8/settings/" + args[3]);
        
                                if (!file.exists()) {
                                    printError("Couldn't find '§4§l" + args[3] + "§c'");
                                    return;
                                }
        
                                response = uploadFile(baseUrl + "upload?type=config", file);
                            
                                json = toJsonObject(response);
                                code = json.get("code").getAsInt();
                                message = json.get("message").getAsString();
                                
                                if (code == 0) {
                                    printError(message);
                                } else {
                                    chat.print("§8▏ §aUploaded '§2§l" + file.getName() + "§a'");
                                }
                                break;
                            }
        
                            case "save": {
                                LiquidBounce.commandManager.executeCommands(".localconfig save " + args[3]);
                                break;
                            }
        
                            case "load": {
                                LiquidBounce.commandManager.executeCommands(".localconfig load " + args[3]);
                                break;
                            }
        
                            case "delete": {
                                file = new File("LiquidBounce-1.8/settings/" + args[3]);
                
                                if (!file.exists()) {
                                    printError("Couldn't find '§4§l" + args[3] + "§c'");
                                    return;
                                }
        
                                file.delete();
                                chat.print("§8▏ §cDeleted '§4§l" + file.getName() + "§c'");
                                break;
                            }

                            case "folder": {
                                folder = new File("LiquidBounce-1.8/settings/");
                                openFolder(folder);
                                chat.print("§8▏ §aFolder opened");
                                break;
                            }
                        }
        
                        break;
                    }
        
                    case "theme": {
                        switch (args[2]) {
                            case "list": {
                                switch (args[3]) {
                                    case "online": {
                                        response = HttpUtils.get(baseUrl + "list?type=themes");
        
                                        json = toJsonObject(response);
                                        array = json.get("message").getAsJsonArray();
                                        
                                        chat.print("§8▏ §7Online themes: §8(§7" + array.size() + "§8)");
                                        for (i = 0; i < array.size(); i++) {
                                            name = array.get(i).getAsString();
                                            index = i + 1;
                                            chat.print("§8▏ §8[§7" + index + "§8]§7 " + name);
                                        }
                                        break;
                                    }
        
                                    case "local": {
                                        folder = new File("LiquidBounce-1.8/themes");
        
                                        if (!folder.exists()) return;
        
                                        array = [];
                                    
                                        for (i = 0; i < folder.listFiles().length; i++) {
                                            if (folder.listFiles()[i].getName().endsWith(".json")) {
                                                array.push(folder.listFiles()[i].getName().replace(".json", ""))
                                            }
                                        }
                                    
                                        chat.print("§8▏ §7Local themes: §8(§7" + array.length + "§8)");
                                        for (i in array) chat.print("§8▏ §8[§7" + (parseInt(i) + 1) + "§8]§7 " + array[i]);
                                    }
                                }
                                break;
                            }
        
                            case "download": {
                                if (downloadFile(baseUrl + "themes/" + args[3] + ".json", new File("LiquidBounce-1.8/themes/" + args[3] + ".json"), true)) {
                                    chat.print("§8▏ §aDownloaded '§2§l" + args[3] + ".json§a'");
                                }
                                break;
                            }
        
                            case "upload": {
                                file = new File("LiquidBounce-1.8/themes/" + args[3] + ".json");
        
                                if (!file.exists()) {
                                    printError("Couldn't find '§4§l" + args[3] + ".json§c'");
                                    return;
                                }

                                sfolder = new File("LiquidBounce-1.8/themes/");

                                Java.type("net.minecraft.util.ScreenShotHelper").saveScreenshot(sfolder, args[3] + ".png", mc.displayWidth, mc.displayHeight, mc.getFramebuffer());
                                previewFile = new File("LiquidBounce-1.8/themes/screenshots/" + args[3] + ".png");

                                uploadFile(baseUrl + "upload?type=preview", previewFile);
                                
                                if (new File("LiquidBounce-1.8/themes/screenshots/").exists()) new File("LiquidBounce-1.8/themes/screenshots/").delete()
        
                                response = uploadFile(baseUrl + "upload?type=theme", file);
                    
                                themeFonts = checkFonts(file, true);
                                for (i in themeFonts) uploadFile(baseUrl + "upload?type=font&name=" + themeFonts[i][0], themeFonts[i][1]);
                    
                                json = toJsonObject(response);
                                code = json.get("code").getAsInt();
                                message = json.get("message").getAsString();
                                
                                if (code == 0) {
                                    printError(message);
                                } else {
                                    chat.print("§8▏ §aUploaded '§2§l" + file.getName() + "§a'");
                                }
                                break;
                            }
        
                            case "save": {
                                file = new File("LiquidBounce-1.8/themes/" + args[3] + ".json");
                                hudFile = new File("LiquidBounce-1.8/hud.json");
                
                                FileUtils.copyFile(hudFile, file);
                                chat.print("§8▏ §aSaved '§2§l" + file.getName() + "§a'");
                                break;
                            }
        
                            case "load": {
                                file = new File("LiquidBounce-1.8/themes/" + args[3] + ".json");
                
                                if (!file.exists()) {
                                    printError("Couldn't find '§4§l" + args[3] + ".json§c'");
                                    return;
                                }
                                
                                Fonts.loadFonts();
                                config = new HudConfig(file);
                                LiquidBounce.fileManager.loadConfig(config);
                                chat.print("§8▏ §aLoaded '§2§l" + file.getName() + "§a'");
                                LiquidBounce.fileManager.hudConfig = config;
                                LiquidBounce.fileManager.saveConfig(LiquidBounce.fileManager.hudConfig);
                                break;
                            }
        
                            case "delete": {
                                file = new File("LiquidBounce-1.8/themes/" + args[3] + ".json");
                
                                if (!file.exists()) {
                                    printError("Couldn't find '§4§l" + file.getName() + "§c'");
                                    return;
                                }
                
                                file.delete();
                                chat.print("§8▏ §cDeleted '§4§l" + file.getName() + "§c'");
                                break;
                            }

                            case "folder": {
                                folder = new File("LiquidBounce-1.8/themes/");
                                Java.type("java.awt.Desktop").getDesktop().open(folder);
                                chat.print("§8▏ §aFolder opened");
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        } catch (e) {
            printError("Error occured while executing command.");
            if (devMode) {
                printError(e);
            }
        }
    }
}

function findScript(name, author) Java.from(scriptManager.getScripts()).find(function (s) s.scriptName == name && s.scriptAuthor == author);

function uploadFile(url, file) {
    try {
        boundary = Long.toHexString(System.currentTimeMillis());
        CRLF = "\r\n";

        con = new URL(url).openConnection();
        con.setDoOutput(true);
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
        con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

        output = con.getOutputStream();
        writer = new PrintWriter(new OutputStreamWriter(output, "UTF-8"), true);

        writer.append("--" + boundary).append(CRLF);
        writer.append("Content-Disposition: form-data; name=\"file\"; filename=\"" + file.getName() + "\"").append(CRLF);
        writer.append("Content-Type: " + URLConnection.guessContentTypeFromName(file.getName())).append(CRLF);
        writer.append("Content-Transfer-Encoding: binary").append(CRLF);
        writer.append(CRLF).flush();

        Files.copy(file.toPath(), output);

        output.flush();
        writer.append(CRLF).flush();

        writer.append("--" + boundary + "--").append(CRLF).flush();

        input = con.getInputStream();
        encoding = con.getContentEncoding();
        encoding = encoding == null ? "UTF-8" : encoding;
        body = IOUtils.toString(input, encoding);
        input.close(); output.close(); writer.close();
    } catch (e) {
        if (devMode) {
            printError(e);
        }
    }
    return body;
}

function downloadFile(url, file, theme) {
    try {
        HttpUtils.download(url, file);
        theme && checkFonts(file);
        return true;
    } catch(e) {
        printError("Couldn't find '§4§l" + file.getName() + "§c'");
        if (devMode) {
            printError(e);
        }
        return false;
    }
}

function toJsonObject(content) {
    parser = new JsonParser();
    element = parser.parse(content);

    return element.getAsJsonObject();
}

function printError(error) print("§8▏ §c§lError:§c", error);

function checkFonts(themeFile, upload) {
    themeContent = JSON.parse(FileUtils.readFileToString(themeFile)); customFonts = []; fontNames = []; installedFonts = null;
    installedFonts = JSON.parse(FileUtils.readFileToString(new File("LiquidBounce-1.8/fonts/fonts.json")));
    for (i in themeContent) {
        if ((font = themeContent[i].Font) && font.fontName != "Minecraft Font" && (font.fontName != "Roboto Medium" && (font.fontSize != 35 || font.fontSize != 40)) && (font.fontName != "Roboto Bold" && font.fontSize != 180)) {
            if (installedFonts.length) {
                checkedName = checkedSize = null;
                for (i in installedFonts) {
                    if (upload) {
                        if (Font.createFont(0, fontFile = new File("LiquidBounce-1.8/fonts/" + installedFonts[i].fontFile)).getName() == font.fontName) customFonts.push([font.fontName.replaceAll(" ", "_"), fontFile]);
                    } else {
                        checkedName = checkedName || (Font.createFont(0, new File("LiquidBounce-1.8/fonts/" + installedFonts[i].fontFile)).getName() == font.fontName ? installedFonts[i].fontFile : checkedName);
                        checkedSize = checkedSize || installedFonts[i].fontSize == font.fontSize;
                    }
                }
                if (!upload) {
                    if (checkedName) {
                        if (!checkedSize) installedFonts.push({fontFile:checkedName, fontSize:font.fontSize});
                    } else customFonts.push([font.fontName.replaceAll(" ","_"), font.fontSize]), (!~fontNames.indexOf(font.fontName) && fontNames.push(font.fontName));
                }
            } else if (!upload) customFonts.push([font.fontName.replaceAll(" ","_"), font.fontSize]), (!~fontNames.indexOf(font.fontName) && fontNames.push(font.fontName));
        }
    }
    if (!upload) {
        for (i in customFonts) {
            if (downloadFile(baseUrl + "fonts/" + customFonts[i][0], new File("LiquidBounce-1.8/fonts/" + customFonts[i][0]))) {
                installedFonts.push({fontFile:customFonts[i][0], fontSize:customFonts[i][1]});
                (i >= customFonts.length - 1) && chat.print("§8▏ §aDownloaded §2§l" + fontNames.length + " §a" + (fontNames.length > 1 ? "fonts" : "font"));
            }
        }
        FileUtils.writeStringToFile(new File("LiquidBounce-1.8/fonts/fonts.json"), JSON.stringify(installedFonts));
    }
    return customFonts;
}

function downloadLibs() {
    libFolder = new File("LiquidBounce-1.8/scripts/lib");

    if (!libFolder.exists()) {
        libFolder.mkdir();
    }


    response = get(baseUrl + "list?type=libs");
    
    json = toJsonObject(response);
    array = json.get("message").getAsJsonArray();
    
    for (i = 0; i < array.size(); i++) {
        name = array.get(i).getAsString();

        libFile = new File("LiquidBounce-1.8/scripts/lib/" + name);

        if (!libFile.exists()) {
            if (downloadFile(baseUrl + "libs/" + name, libFile)) {
                if (devMode) {
                    chat.print("§8▏ §aDownloaded '§2§l" + name + "§a'");
                }
            } else {
                if (devMode) {
                    printError("Couldn't download '§4§l" + name + "§c'");
                }
            }
        }
    }
}