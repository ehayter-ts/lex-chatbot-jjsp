import '@k2oss/k2-broker-core';

metadata = {
    systemName: "AWS_Lex_ChatBot",
    displayName: "AWS Lex ChatBot Broker",
    description: "AWS Lex ChatBot Broker",
    configuration: {
        "AwsRegion": {
            displayName: "AWS Region",
            type: "string",
            value: "eu-west-2"
        },
        "BotName": {
            displayName: "Bot Name",
            type: "string",
            value: "MedicalBotNHS"
        },
        "BotAlias": {
            displayName: "Bot Name",
            type: "string",
            value: "latestversion"
        },
        "UserID": {
            displayName: "User ID",
            type: "string",
            value: "AKIARXLDA4AZB24QPA72"
        }
    }
};

//var crypto = require("crypto-js");

function getDateStamp()
{
    var date = new Date();

    return date.getFullYear().toString() + ('0' + (date.getMonth()+1)).slice(-2).toString() + ('0' + date.getDate()).slice(-2);
}

function getSignatureKey() {
    //var kDate = crypto.HmacSHA256(getDateStamp(), "AWS4" + metadata.configuration["UserID"]);
    //var kRegion = crypto.HmacSHA256(metadata.configuration["AwsRegion"], kDate);
    //var kService = crypto.HmacSHA256("lex", kRegion);
    //var kSigning = crypto.HmacSHA256("aws4_request", kService);

    return "dc6f5ddf6df53218de4142803eadfe8649f6e718a2d7b01a3e509bb8452fb52e";//kSigning;
}

ondescribe = async function({configuration}): Promise<void> {
    postSchema({
        objects: {
            "message": {
                displayName: "Message",
                description: "Represents a text reply",
                properties: {
                    "inputText": {
                        displayName: "Input Text",
                        type: "string"
                    },
                    "outputText": {
                        displayName: "Output Text",
                        type: "string"
                    }
                },
                methods: {
                    "postText": {
                        displayName: "Post Text",
                        type: "execute",
                        inputs: [ "inputText" ],
                        outputs: [ "outputText" ]
                    }
                }
            }
        }
    });
}

onexecute = async function({objectName, methodName, parameters, properties, configuration, schema}): Promise<void> {
    switch (objectName)
    {
        case "message": await onexecuteMessage(methodName, properties, parameters, configuration); break;
        default: throw new Error("The object " + objectName + " is not supported.");
    }
}

async function onexecuteMessage(methodName: string, properties: SingleRecord, parameters: SingleRecord, configuration: SingleRecord): Promise<void> {
    switch (methodName)
    {
        case "postText": await onexecutePostText(properties, configuration); break;
        default: throw new Error("The method " + methodName + " is not supported.");
    }
}

function onexecutePostText(properties: SingleRecord, configuration: SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) =>
    {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status);

                var obj = JSON.parse(xhr.responseText);
                postResult({
                        "outputText": obj.message,
                    });
                resolve();
            } catch (e) {
                reject(e);
            }
        };
        
        var body = {
            inputText: properties["inputText"].toString()
        };

        xhr.open("POST", `https://runtime.lex.${configuration["AwsRegion"]}.amazonaws.com/bot/${configuration["BotName"]}/alias/${configuration["BotAlias"]}/user/${configuration["UserID"]}/text`);
        xhr.setRequestHeader('Authorization', `AWS4-HMAC-SHA256 Credential=${configuration["UserID"]}/20201021/${configuration["AwsRegion"]}/lex/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=${getSignatureKey()}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Amz-Date', '20201021T181745Z');
        xhr.setRequestHeader('X-Amz-Content-Sha256', 'beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3');
        xhr.send(JSON.stringify(body));
    });
}