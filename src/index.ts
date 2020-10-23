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
        },
        "UserSecret": {
            displayName: "User Secret",
            type: "string",
            value: ""
        }
    }
};

function getAmzDate(dateStr) {
    var chars = [":", "-"];
    for (var i = 0; i < chars.length; i++) {
        while (dateStr.indexOf(chars[i]) != -1) {
            dateStr = dateStr.replace(chars[i], "");
        }
    }
    dateStr = dateStr.split(".")[0] + "Z";
    return dateStr;
}

function getSignatureKey(dateStamp: string) {
    var kDate = CryptoJS.HmacSHA256(dateStamp, "AWS4" + metadata.configuration["UserSecret"]);
    var kRegion = CryptoJS.HmacSHA256(metadata.configuration["AwsRegion"], kDate);
    var kService = CryptoJS.HmacSHA256("lex", kRegion);
    var kSigning = CryptoJS.HmacSHA256("aws4_request", kService);

    return kSigning;
}

ondescribe = async function ({ }): Promise<void> {
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
                        inputs: ["inputText"],
                        outputs: ["outputText"]
                    }
                }
            }
        }
    });
}

onexecute = async function ({ objectName, methodName, parameters, properties, configuration }): Promise<void> {
    switch (objectName) {
        case "message": await onexecuteMessage(methodName, properties, configuration); break;
        default: throw new Error("The object " + objectName + " is not supported.");
    }
}

async function onexecuteMessage(methodName: string, properties: SingleRecord, configuration: SingleRecord): Promise<void> {
    switch (methodName) {
        case "postText": await onexecutePostText(properties, configuration); break;
        default: throw new Error("The method " + methodName + " is not supported.");
    }
}

function onexecutePostText(properties: SingleRecord, configuration: SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
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
            'inputText': properties["inputText"].toString()
        };

        var bodyText = JSON.stringify(body);
        var amzDate = getAmzDate(new Date().toISOString());
        var authDate = amzDate.split("T")[0];
        var signature = getSignatureKey(authDate);
        var authKey = CryptoJS.HmacSHA256(bodyText, signature);
        var host = `runtime.lex.${configuration["AwsRegion"]}.amazonaws.com`;
        var bodyHash = CryptoJS.SHA256(bodyText).toString();
        var url = `https://runtime.lex.${configuration["AwsRegion"]}.amazonaws.com/bot/${configuration["BotName"]}/alias/${configuration["BotAlias"]}/user/${configuration["UserID"]}/text`;

        var canonicalReq = 'POST\n' + url + '\nhost:' + host + '\n' +
            'x-amz-content-sha256:' + bodyHash + '\n' +
            'x-amz-date:' + amzDate + '\n' +
            '\n' +
            'host;x-amz-content-sha256;x-amz-date' + '\n' +
            CryptoJS.SHA256(bodyText).toString();

        // hash the canonical request
        var canonicalReqHash = CryptoJS.SHA256(canonicalReq).toString();

        // form our String-to-Sign
        var stringToSign = 'AWS4-HMAC-SHA256\n' +
            amzDate + '\n' +
            authDate + '/' + configuration["AwsRegion"] + '/lex/aws4_request\n' +
            canonicalReqHash;

        // Sign our String-to-Sign with our Signing Key
        var authKey = CryptoJS.HmacSHA256(stringToSign, signature);

        xhr.open("POST", url);
        xhr.setRequestHeader('Authorization', `AWS4-HMAC-SHA256 Credential=${configuration["UserID"].toString()}/${authDate}/${configuration["AwsRegion"].toString()}/lex/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=${authKey}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Amz-Date', amzDate);
        xhr.setRequestHeader('X-Amz-Content-Sha256', CryptoJS.SHA256(bodyText).toString());
        xhr.setRequestHeader('Content-Length', bodyText.length.toString());

        xhr.send(bodyText);
    });
}