const FS = require("fs");
const PATH = require("path");

const EscapeXML = function(S){
    if(typeof S !== "string"){ S = String(S); }
    return S.replace(/[<>&"']/g, (C) => ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "\"": "&quot;",
        "'": "&apos;"
    }[C])).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "");
};

const WrapInSVG = function(Text, Options = {}){
    Text = Text.trim();
    if(Text.startsWith("<svg")){
        if(!Text.startsWith("<?xml")){
            return `<?xml version="1.0" encoding="UTF-8"?>\n${Text}`;
        }
        return Text;
    }

    const FixColor = (C) => C && !C.startsWith("#") ? "#" + C : C;

    const Background = FixColor(Options.Background);
    const Color = FixColor(Options.Color);
    const FontSize = parseInt(Options.FontSize);
    const LineHeight = parseInt(Options.LineHeight) || Math.floor(FontSize * 1.5);
    const Padding = parseInt(Options.Padding);

    const Lines = Text.split("\n");
    const DisplayLines = Lines.slice(0, parseInt(Options.MaxLines));

    const MaxChars = Math.max(...DisplayLines.map(L => L.length), 1);
    const ContentWidth = Math.floor(MaxChars * FontSize * 0.6) + (Padding * 2);
    const Width= parseInt(Options.Width) || ContentWidth;

    const ContentHeight = (DisplayLines.length - 1) * LineHeight + FontSize;
    const Height = parseInt(Options.Height) || (ContentHeight + Padding * 2);

    const FirstLineY = Padding + FontSize - Math.floor(FontSize * 0.15);

    let TextElements = DisplayLines.map((Line, Index) =>
        `<text x="${Padding}" y="${FirstLineY + Index * LineHeight}" fill="${Color}" font-family="monospace" font-size="${FontSize}" xml:space="preserve">${EscapeXML(Line)}</text>`
    ).join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}">
      <rect width="100%" height="100%" rx="6" fill="${Background}" />
      ${TextElements}
    </svg>`.trim();
};

const __CacheSVG = {};
const GetIconSVG = function(IconID, UniquePrefix){
    let SVG;
    if(__CacheSVG[IconID]){
        SVG = __CacheSVG[IconID];
    }else{
        const IconPath = PATH.join(IconsPath, IconID + ".svg");
        SVG = FS.readFileSync(IconPath, "utf8");
        __CacheSVG[IconID] = SVG;
    }

    SVG = SVG.replace(/<\?xml.*?\?>/gi, "");
    SVG = SVG.replace(/<!DOCTYPE.*?>/gi, "");
    SVG = SVG.replace(/<!--.*?-->/gs, "");

    SVG = SVG.replace(/(id=")([^"]*)(")/g, `$1${UniquePrefix}_$2$3`);
    SVG = SVG.replace(/(url\(#)([^)]*)(\))/g, `$1${UniquePrefix}_$2$3`);
    SVG = SVG.replace(/xlink:href="#([^"]*)"/g, `xlink:href="#${UniquePrefix}_$1"`);

    return SVG.trim();
}

// ----------------------------------------------------------------------

const IconsPath = PATH.join(process.cwd(), "resources", "icons");
const IconsInfoPath = PATH.join(IconsPath, "icons.json");

if(!FS.existsSync(IconsInfoPath)){ throw new Error("icons.json не найден!"); }

const IconsInfo = JSON.parse(FS.readFileSync(IconsInfoPath, "utf8"));

module.exports = {
    EscapeXML,
    WrapInSVG,
    GetIconSVG,
    IconsInfo
};