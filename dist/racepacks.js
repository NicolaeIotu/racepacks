'use strict';require("core-js/modules/es.symbol");require("core-js/modules/es.symbol.description");require("core-js/modules/es.symbol.iterator");require("core-js/modules/es.array.concat");require("core-js/modules/es.array.from");require("core-js/modules/es.array.iterator");require("core-js/modules/es.array.slice");require("core-js/modules/es.array.sort");require("core-js/modules/es.number.constructor");require("core-js/modules/es.number.to-fixed");require("core-js/modules/es.object.freeze");require("core-js/modules/es.object.to-string");require("core-js/modules/es.regexp.exec");require("core-js/modules/es.regexp.to-string");require("core-js/modules/es.string.iterator");require("core-js/modules/es.string.replace");require("core-js/modules/es.string.split");require("core-js/modules/web.dom-collections.iterator");function _createForOfIteratorHelper(o,allowArrayLike){var it;if(typeof Symbol==="undefined"||o[Symbol.iterator]==null){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&typeof o.length==="number"){if(it)o=it;var i=0;var F=function F(){};return{s:F,n:function n(){if(i>=o.length)return{done:true};return{done:false,value:o[i++]}},e:function e(_e2){throw _e2},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var normalCompletion=true,didErr=false,err;return{s:function s(){it=o[Symbol.iterator]()},n:function n(){var step=it.next();normalCompletion=step.done;return step},e:function e(_e3){didErr=true;err=_e3},f:function f(){try{if(!normalCompletion&&it.return!=null)it.return()}finally{if(didErr)throw err}}}}function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i]}return arr2}function _iterableToArrayLimit(arr,i){if(typeof Symbol==="undefined"||!(Symbol.iterator in Object(arr)))return;var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}var _require=require("fs"),createWriteStream=_require.createWriteStream,mkdirSync=_require.mkdirSync,unlinkSync=_require.unlinkSync;var _require2=require("os"),tmpdir=_require2.tmpdir;var _require3=require("path"),join=_require3.join,normalize=_require3.normalize;var _require4=require("stream"),Transform=_require4.Transform;var _require5=require("./utils"),buildRotationalRunOrder=_require5.buildRotationalRunOrder,getHotPlugSetup=_require5.getHotPlugSetup;var ___tmpdir=join(tmpdir(),"racepacks");var outputUncontrollable="Info: racepacks runs in browser. Extra output might appear.";var isBrowser=new Function("try {return this===window;}catch(e){return false;}")();var redirectPath;var redirectStream;var redirectStreamData=false;var slice24;var slicedTableContent="";var __objCounter=0;var hotPlugSetup;if(isBrowser){console.warn(outputUncontrollable)}else{try{mkdirSync(___tmpdir,{recursive:true});var _Date$toLocaleDateStr=new Date().toLocaleDateString("en-US").split("/"),_Date$toLocaleDateStr2=_slicedToArray(_Date$toLocaleDateStr,3),month=_Date$toLocaleDateStr2[0],date=_Date$toLocaleDateStr2[1],year=_Date$toLocaleDateStr2[2];var _Date$toLocaleTimeStr=new Date().toLocaleTimeString("en-US").split(/[: ]/),_Date$toLocaleTimeStr2=_slicedToArray(_Date$toLocaleTimeStr,4),hour=_Date$toLocaleTimeStr2[0],minute=_Date$toLocaleTimeStr2[1],second=_Date$toLocaleTimeStr2[2],apm=_Date$toLocaleTimeStr2[3];redirectPath=join(___tmpdir,"racepacks_"+"".concat(year).concat(month).concat(date,"_").concat(hour).concat(minute).concat(second).concat(apm));redirectStream=createWriteStream(redirectPath);redirectStream.once("finish",function(){redirectStreamData=true});slice24=new Transform({transform:function transform(chunk,enc,cb){var result=String.prototype.replace.call(chunk.toString(),/\n$/,"");if(result.length>24){cb(null,String.prototype.slice.call(result,0,24)+"...")}else{cb(null,result)}}});slice24.on("data",function(data){slicedTableContent=data.toString()})}catch(e){try{redirectStream=createWriteStream(normalize("/dev/null"))}catch(e1){console.warn(outputUncontrollable)}}}function Racepacks(setup){var tableOutput=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var targetThis=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(__objCounter>0){throw new Error("Multiple instances of 'racepacks' not supported at this time.")}__objCounter++;hotPlugSetup=getHotPlugSetup(setup);this.setup=setup;Object.freeze(this.setup);this.targetThis=targetThis;Object.freeze(this.targetThis);this.rotationalRunOrder=buildRotationalRunOrder(Object.keys(hotPlugSetup.packs));Object.freeze(this.rotationalRunOrder);this.raceTimes=[];this.raceDescriptionTable=[];this.raceStats={};race.call(this,tableOutput);return this}var originalConsole=console;var racepacksConsole=originalConsole;var sliceConsole=originalConsole;var racepacksResetConsoles=function racepacksResetConsoles(){console=originalConsole;racepacksConsole=originalConsole;sliceConsole=originalConsole};var racepacksSetupConsoles=function racepacksSetupConsoles(redirectStream,isBrowser){if(!isBrowser){if(redirectStream){if(console===originalConsole){console=new originalConsole.Console(redirectStream,redirectStream)}if(racepacksConsole===originalConsole){racepacksConsole=new originalConsole.Console({stdout:process.stdout,stderr:process.stderr,ignoreErrors:false,colorMode:true,groupIndentation:4})}}if(sliceConsole===originalConsole){sliceConsole=new originalConsole.Console(slice24,slice24)}return}racepacksResetConsoles()};Racepacks.prototype.raceSummary=function(raceStats){if(_typeof(raceStats)!=="object"){throw new TypeError("raceSummary: invalid member \"raceStats\"")}racepacksConsole.log("");if(isBrowser){racepacksConsole.group("%c *** racepacks Summary *** ","background-color: #6f0; font-weight: bold");racepacksConsole.log("%cIn browser the precision is rounded millisecond. Run with Node.JS for nanosecond"+" precision.","font-weight: bold; color: red")}else{racepacksConsole.group("\x1B[1;30;102m *** racepacks Summary *** \x1B[0m");racepacksConsole.log("\x1B[1;91mNanosecond precision\x1B[0m")}var raceStatsTable=[];for(var packName in raceStats){raceStatsTable.push({Pack:packName,Title:"","Efficiency (% Last)":"0 %","Efficiency (% Next)":"0 %","Total tests time":Number(raceStats[packName].ttime),Wins:raceStats[packName].wins,Runs:raceStats[packName].runs})}raceStatsTable.sort(function(a,b){return a["Total tests time"]-b["Total tests time"]});var titles=["Winner","2nd place","3rd place"];var nextTitle=0;var rstLen=raceStatsTable.length;var effNext;for(var i=0;i<rstLen;i++){if(nextTitle<titles.length){raceStatsTable[i].Title=titles[nextTitle]}if(i<rstLen-1){nextTitle++}raceStatsTable[i]["Efficiency (% Last)"]=(raceStatsTable[rstLen-1]["Total tests time"]*100/raceStatsTable[i]["Total tests"+" time"]-100).toFixed(2)+" %";effNext=i<rstLen-1?i+1:i;raceStatsTable[i]["Efficiency (% Next)"]=(raceStatsTable[effNext]["Total tests time"]*100/raceStatsTable[i]["Total tests"+" time"]-100).toFixed(2)+" %"}racepacksConsole.table(raceStatsTable);racepacksConsole.groupEnd()};Racepacks.prototype.describeRace=function(raceTimes,raceDescriptionTable){var tableOutput=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;if(!Array.isArray(raceTimes)){throw new TypeError("describeRace: invalid 'raceTimes' member")}if(raceTimes.length===0){throw new Error("describeRace: empty member 'raceTimes'")}racepacksSetupConsoles(redirectStream,isBrowser);racepacksConsole.log("");if(isBrowser){racepacksConsole.group("%c *** racepacks Results *** ","background-color: #6f0; color: black; font-weight:"+" bold");racepacksConsole.log("%cIn browser the precision is rounded millisecond. Run with Node.JS for nanosecond"+" precision.","font-weight: bold; color: red");racepacksConsole.log("(  %c * fastest %c )","background-color: #666; color: #6f0; font-weight: bold")}else{racepacksConsole.group("\x1B[1;30;102m *** racepacks Results *** \x1B[0m");racepacksConsole.log("\x1B[1;91mNanosecond precision\x1B[0m");racepacksConsole.log("( * \x1B[92;100m fastest \x1B[0m )")}if(tableOutput){racepacksConsole.table(raceDescriptionTable)}else{var testNo=0;var _iterator=_createForOfIteratorHelper(hotPlugSetup.tests),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var test=_step.value;if(isBrowser){racepacksConsole.group("Test #".concat(testNo+1,": "));racepacksConsole.log(test);for(var pack in raceTimes[testNo]){if(raceTimes[testNo][pack].winner===1){racepacksConsole.log("%c ".concat(pack,": ").concat(raceTimes[testNo][pack].end-raceTimes[testNo][pack].start," ms "),"background-color: #666; color: #6f0; font-weight: bold")}else{racepacksConsole.log(" ".concat(pack,": ").concat(raceTimes[testNo][pack].end-raceTimes[testNo][pack].start," ms "))}}}else{sliceConsole.log(test);racepacksConsole.group("Test #".concat(testNo+1,": *** ").concat(slicedTableContent," ***"));for(var _pack in raceTimes[testNo]){if(raceTimes[testNo][_pack].winner===1){racepacksConsole.log("\x1B[92;100m ".concat(_pack,": ").concat(raceTimes[testNo][_pack].end-raceTimes[testNo][_pack].start," ns \x1B[0m"))}else{racepacksConsole.log(" ".concat(_pack,": ").concat(raceTimes[testNo][_pack].end-raceTimes[testNo][_pack].start," ns "))}}}racepacksConsole.groupEnd();testNo++}}catch(err){_iterator.e(err)}finally{_iterator.f()}}racepacksConsole.groupEnd();console=originalConsole};var race=function race(){var tableOutput=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;this.raceTimes=[];this.raceDescriptionTable=[];this.raceStats={};for(var _pack2 in hotPlugSetup.packs){this.raceStats[_pack2]={ttime:0n,wins:0,runs:0}}var ptime;if(isBrowser){ptime=function ptime(){return BigInt(window.performance.now())}}else{ptime=process.hrtime.bigint}var testNo=0;var start=0;var end=0;racepacksSetupConsoles(redirectStream,isBrowser);var rrOrderLength=this.rotationalRunOrder.length;var checkRotLen=Math.sqrt(rrOrderLength);if(checkRotLen!==Math.floor(checkRotLen)){racepacksConsole.warn("This test runs with an altered/invalid rotation order and it might be inaccurate!")}function raceInner(i,testNo,test,warmUpsCounter,lastInRotOrder){pack=this.rotationalRunOrder[i];this.raceTimes[testNo][pack]=this.raceTimes[testNo][pack]||{start:0n,end:0n,runs:0};this.raceTimes[testNo][pack].winner=0;if(Array.isArray(test)){start=ptime();hotPlugSetup.packs[pack].apply(this.targetThis,test);end=ptime()}else{start=ptime();hotPlugSetup.packs[pack].call(this.targetThis,test);end=ptime()}this.raceTimes[testNo][pack].start+=start;this.raceTimes[testNo][pack].end+=end;this.raceTimes[testNo][pack].runs++;if(warmUpsCounter<=1){this.raceStats[pack].ttime+=this.raceTimes[testNo][pack].end-this.raceTimes[testNo][pack].start;this.raceStats[pack].runs++}if(warmUpsCounter<=1&&i===lastInRotOrder){var winner=[];for(var _testName_ in this.raceTimes[testNo]){this.raceTimes[testNo][_testName_].start=this.raceTimes[testNo][_testName_].start/BigInt(i+1);this.raceTimes[testNo][_testName_].end=this.raceTimes[testNo][_testName_].end/BigInt(i+1);this.raceDescriptionTable[testNo][_testName_]=parseInt((this.raceTimes[testNo][_testName_].end-this.raceTimes[testNo][_testName_].start).toString(10),10);if(winner.length===0){Array.prototype.push.call(winner,_testName_)}else{var t1=this.raceTimes[testNo][_testName_].end-this.raceTimes[testNo][_testName_].start;var t2=this.raceTimes[testNo][winner[0]].end-this.raceTimes[testNo][winner[0]].start;if(t1<t2){winner[0]=_testName_}else if(t1===t2){Array.prototype.push.call(winner,_testName_)}}}for(var w in winner){this.raceTimes[testNo][winner[w]].winner=1;this.raceDescriptionTable[testNo][winner[w]]=this.raceDescriptionTable[testNo][winner[w]]+" *";this.raceStats[winner[w]].wins+=1}}}var lastInRotOrder=rrOrderLength-1;var warmUpRuns=1;var warmUpsCounter,pack;var _iterator2=_createForOfIteratorHelper(hotPlugSetup.tests),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var test=_step2.value;warmUpsCounter=warmUpRuns;this.raceTimes[testNo]={};this.raceDescriptionTable[testNo]={};if(isBrowser){this.raceDescriptionTable[testNo]["Arguments / Test"]=test}else{sliceConsole.log(test);this.raceDescriptionTable[testNo]["Arguments / Test"]=slicedTableContent}for(var i=0;i<rrOrderLength;i++){if(i===0){do{raceInner.call(this,i,testNo,test,warmUpsCounter,lastInRotOrder);warmUpsCounter--}while(warmUpsCounter>0)}else{raceInner.call(this,i,testNo,test,warmUpsCounter,lastInRotOrder)}}testNo++}}catch(err){_iterator2.e(err)}finally{_iterator2.f()}racepacksResetConsoles();for(var a1 in this.raceTimes){for(var a2 in this.raceTimes[a1]){if(/^du[0-9]*pe$/.test(a2)){delete this.raceTimes[a1][a2]}}}for(var b1 in this.raceDescriptionTable){for(var b2 in this.raceDescriptionTable[b1]){if(/^du[0-9]*pe$/.test(b2)){delete this.raceDescriptionTable[b1][b2]}}}for(var c1 in this.raceStats){if(/^du[0-9]*pe$/.test(c1)){delete this.raceStats[c1]}}this.describeRace(this.raceTimes,this.raceDescriptionTable,tableOutput);this.raceSummary(this.raceStats);if(!isBrowser){redirectStream.end(function(){if(redirectStreamData){racepacksConsole.warn("Extra output was generated during tests. See '".concat(redirectPath,"'."))}else{unlinkSync("".concat(redirectPath))}})}};Racepacks.prototype.constructor=Racepacks;if(process.env.NODE_ENV==="test"){module.exports.racepacksSetupConsoles=racepacksSetupConsoles;module.exports.racepacksResetConsoles=racepacksResetConsoles;module.exports.race=race}module.exports.Racepacks=Racepacks;
/* racepacks is Copyright (C) 2020 Nicolae Iotu, nicolae.g.iotu@gmail.com
Licensed under SPDX Apache-2.0, http://www.apache.org/licenses/LICENSE-2.0 */