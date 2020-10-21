metadata={systemName:"AWS_Lex_ChatBot",displayName:"AWS Lex ChatBot Broker",description:"AWS Lex ChatBot Broker",configuration:{AwsRegion:{displayName:"AWS Region",type:"string",value:"eu-west-2"},BotName:{displayName:"Bot Name",type:"string",value:"MedicalBotNHS"},BotAlias:{displayName:"Bot Name",type:"string",value:"latestversion"},UserID:{displayName:"User ID",type:"string",value:"AKIARXLDA4AZB24QPA72"}}},ondescribe=async function({configuration:e}){postSchema({objects:{Message:{displayName:"Message",description:"Represents a text reply",properties:{inputText:{displayName:"Input Text",type:"string"},outputText:{displayName:"Output Text",type:"string"}},methods:{postText:{displayName:"Post Text",type:"execute",inputs:["inputText"],outputs:["outputText"]}}}}})},onexecute=async function({objectName:e,methodName:t,parameters:a,properties:s,configuration:o,schema:n}){switch(e){case"message":await async function(e,t,a,s){switch(e){case"postText":await function(e,t){return new Promise((a,s)=>{var o=new XMLHttpRequest;o.onreadystatechange=function(){try{if(4!==o.readyState)return;if(200!==o.status)throw new Error("Failed with status "+o.status);var e=JSON.parse(o.responseText);postResult({outputText:e.message}),a()}catch(e){s(e)}};var n={inputText:e.inputText.toString()};o.open("POST",`https://runtime.lex.${t.AwsRegion}.amazonaws.com/bot/${t.BotName}/alias/${t.BotAlias}/user/${t.UserID}/text`),o.setRequestHeader("Authorization",`AWS4-HMAC-SHA256 Credential=${t.UserID}/20201021/${t.AwsRegion}/lex/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=dc6f5ddf6df53218de4142803eadfe8649f6e718a2d7b01a3e509bb8452fb52e`),o.setRequestHeader("Content-Type","application/json"),o.setRequestHeader("X-Amz-Date","20201021T181745Z"),o.setRequestHeader("X-Amz-Content-Sha256","beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3"),o.send(JSON.stringify(n))})}(t,s);break;default:throw new Error("The method "+e+" is not supported.")}}(t,s,0,o);break;default:throw new Error("The object "+e+" is not supported.")}};
//# sourceMappingURL=index.js.map
