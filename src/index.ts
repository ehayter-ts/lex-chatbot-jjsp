import '@k2oss/k2-broker-core';
import CryptoJS from "crypto-js/core";
import 'crypto-js/hmac-sha256';

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

function getDateStamp()
{
    var date = new Date();

    return date.toISOString();
}

function getURLDate()
{
    var date = new Date();

    return date.getFullYear().toString() + ('0' + (date.getMonth()+1)).slice(-2) + ('0' + (date.getDate())).slice(-2);
}

function getSignatureKey() {
    var kDate = CryptoJS.HmacSHA256(getDateStamp(), "AWS4" + metadata.configuration["UserID"]);
    var kRegion = CryptoJS.HmacSHA256(metadata.configuration["AwsRegion"], kDate);
    var kService = CryptoJS.HmacSHA256("lex", kRegion);
    var kSigning = CryptoJS.HmacSHA256("aws4_request", kService);
    
    return kSigning;
}

ondescribe = async function({}): Promise<void> {
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

onexecute = async function({objectName, methodName, parameters, properties, configuration}): Promise<void> {
    switch (objectName)
    {
        case "message": await onexecuteMessage(methodName, properties, configuration); break;
        default: throw new Error("The object " + objectName + " is not supported.");
    }
}

async function onexecuteMessage(methodName: string, properties: SingleRecord, configuration: SingleRecord): Promise<void> {
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

                postResult({
                        "outputText": "Test",
                    });
                resolve();
            } catch (e) {
                reject(e);
            }
        };
        
        var body = {
            inputText: properties["inputText"].toString()
        };

        var bodyText = JSON.stringify(body);
        var signature = getSignatureKey();

        xhr.open("POST", `https://runtime.lex.${configuration["AwsRegion"]}.amazonaws.com/bot/${configuration["BotName"]}/alias/${configuration["BotAlias"]}/user/${configuration["UserID"]}/text`);
        xhr.setRequestHeader('Authorization', `AWS4-HMAC-SHA256 Credential=${configuration["UserID"].toString()}/${getURLDate()}/${configuration["AwsRegion"].toString()}/lex/aws4_request, SignedHeaders=host;x-amz-date;x-amz-content-sha256, Signature=${signature}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Amz-Date', getDateStamp());
        xhr.setRequestHeader('X-Amz-Content-Sha256', CryptoJS.HmacSHA256(signature, properties["inputText"].toString()));
        xhr.setRequestHeader('Content-Length', bodyText.length.toString());

        xhr.send(bodyText);
    });
}