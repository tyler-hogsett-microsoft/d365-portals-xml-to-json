const xml2json = require("xml2json");

function convertXmlToJson(xml)
{
    return xml2json.toJson(
        xml,
        {
            arrayNotation: true,
            coerce: true,
            object: true
        }
    );
}

module.exports = convertXmlToJson;