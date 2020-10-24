!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function e(t,e){return t(e={exports:{}},e.exports),e.exports}var n={},r=e((function(e,r){e.exports=function(){var e=e||function(e,r){var s;if("undefined"!=typeof window&&window.crypto&&(s=window.crypto),!s&&"undefined"!=typeof window&&window.msCrypto&&(s=window.msCrypto),!s&&void 0!==t&&t.crypto&&(s=t.crypto),!s)try{s=n}catch(t){}var o=function(){if(s){if("function"==typeof s.getRandomValues)try{return s.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof s.randomBytes)try{return s.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")},i=Object.create||function(){function t(){}return function(e){var n;return t.prototype=e,n=new t,t.prototype=null,n}}(),a={},h=a.lib={},u=h.Base={extend:function(t){var e=i(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},c=h.WordArray=u.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||l).stringify(this)},concat:function(t){var e=this.words,n=t.words,r=this.sigBytes,s=t.sigBytes;if(this.clamp(),r%4)for(var o=0;o<s;o++){var i=n[o>>>2]>>>24-o%4*8&255;e[r+o>>>2]|=i<<24-(r+o)%4*8}else for(o=0;o<s;o+=4)e[r+o>>>2]=n[o>>>2];return this.sigBytes+=s,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-n%4*8,t.length=e.ceil(n/4)},clone:function(){var t=u.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],n=0;n<t;n+=4)e.push(o());return new c.init(e,t)}}),p=a.enc={},l=p.Hex={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],s=0;s<n;s++){var o=e[s>>>2]>>>24-s%4*8&255;r.push((o>>>4).toString(16)),r.push((15&o).toString(16))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r+=2)n[r>>>3]|=parseInt(t.substr(r,2),16)<<24-r%8*4;return new c.init(n,e/2)}},f=p.Latin1={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],s=0;s<n;s++){var o=e[s>>>2]>>>24-s%4*8&255;r.push(String.fromCharCode(o))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r++)n[r>>>2]|=(255&t.charCodeAt(r))<<24-r%4*8;return new c.init(n,e)}},d=p.Utf8={stringify:function(t){try{return decodeURIComponent(escape(f.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return f.parse(unescape(encodeURIComponent(t)))}},m=h.BufferedBlockAlgorithm=u.extend({reset:function(){this._data=new c.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=d.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(t){var n,r=this._data,s=r.words,o=r.sigBytes,i=this.blockSize,a=o/(4*i),h=(a=t?e.ceil(a):e.max((0|a)-this._minBufferSize,0))*i,u=e.min(4*h,o);if(h){for(var p=0;p<h;p+=i)this._doProcessBlock(s,p);n=s.splice(0,h),r.sigBytes-=u}return new c.init(n,u)},clone:function(){var t=u.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),g=(h.Hasher=m.extend({cfg:u.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){m.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,n){return new t.init(n).finalize(e)}},_createHmacHelper:function(t){return function(e,n){return new g.HMAC.init(t,n).finalize(e)}}}),a.algo={});return a}(Math);return e}()})),s=(e((function(t,e){t.exports=function(t){return function(e){var n=t,r=n.lib,s=r.WordArray,o=r.Hasher,i=n.algo,a=[],h=[];!function(){function t(t){for(var n=e.sqrt(t),r=2;r<=n;r++)if(!(t%r))return!1;return!0}function n(t){return 4294967296*(t-(0|t))|0}for(var r=2,s=0;s<64;)t(r)&&(s<8&&(a[s]=n(e.pow(r,.5))),h[s]=n(e.pow(r,1/3)),s++),r++}();var u=[],c=i.SHA256=o.extend({_doReset:function(){this._hash=new s.init(a.slice(0))},_doProcessBlock:function(t,e){for(var n=this._hash.words,r=n[0],s=n[1],o=n[2],i=n[3],a=n[4],c=n[5],p=n[6],l=n[7],f=0;f<64;f++){if(f<16)u[f]=0|t[e+f];else{var d=u[f-15],m=(d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3,g=u[f-2],y=(g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10;u[f]=m+u[f-7]+y+u[f-16]}var v=r&s^r&o^s&o,A=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),w=l+((a<<26|a>>>6)^(a<<21|a>>>11)^(a<<7|a>>>25))+(a&c^~a&p)+h[f]+u[f];l=p,p=c,c=a,a=i+w|0,i=o,o=s,s=r,r=w+(A+v)|0}n[0]=n[0]+r|0,n[1]=n[1]+s|0,n[2]=n[2]+o|0,n[3]=n[3]+i|0,n[4]=n[4]+a|0,n[5]=n[5]+c|0,n[6]=n[6]+p|0,n[7]=n[7]+l|0},_doFinalize:function(){var t=this._data,n=t.words,r=8*this._nDataBytes,s=8*t.sigBytes;return n[s>>>5]|=128<<24-s%32,n[14+(s+64>>>9<<4)]=e.floor(r/4294967296),n[15+(s+64>>>9<<4)]=r,t.sigBytes=4*n.length,this._process(),this._hash},clone:function(){var t=o.clone.call(this);return t._hash=this._hash.clone(),t}});n.SHA256=o._createHelper(c),n.HmacSHA256=o._createHmacHelper(c)}(Math),t.SHA256}(r)})),e((function(t,e){t.exports=function(t){var e,n,r;n=(e=t).lib.Base,r=e.enc.Utf8,e.algo.HMAC=n.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=r.parse(e));var n=t.blockSize,s=4*n;e.sigBytes>s&&(e=t.finalize(e)),e.clamp();for(var o=this._oKey=e.clone(),i=this._iKey=e.clone(),a=o.words,h=i.words,u=0;u<n;u++)a[u]^=1549556828,h[u]^=909522486;o.sigBytes=i.sigBytes=s,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,n=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(n))}})}(r)})),e((function(t,e){t.exports=function(t){return t.HmacSHA256}(r)})),/[^\x20-\x7E]/),o=/[\x2E\u3002\uFF0E\uFF61]/g,i={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},a=Math.floor,h=String.fromCharCode;function u(t){throw new RangeError(i[t])}function c(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function p(t,e,n){var r=0;for(t=n?a(t/700):t>>1,t+=a(t/e);t>455;r+=36)t=a(t/35);return a(r+36*t/(t+38))}function l(t){return function(t,e){var n=t.split("@"),r="";n.length>1&&(r=n[0]+"@",t=n[1]);var s=function(t,e){for(var n=t.length,r=[];n--;)r[n]=e(t[n]);return r}((t=t.replace(o,".")).split("."),e).join(".");return r+s}(t,(function(t){return s.test(t)?"xn--"+function(t){var e,n,r,s,o,i,l,f,d,m,g,y,v,A,w,S=[];for(y=(t=function(t){for(var e,n,r=[],s=0,o=t.length;s<o;)(e=t.charCodeAt(s++))>=55296&&e<=56319&&s<o?56320==(64512&(n=t.charCodeAt(s++)))?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),s--):r.push(e);return r}(t)).length,e=128,n=0,o=72,i=0;i<y;++i)(g=t[i])<128&&S.push(h(g));for(r=s=S.length,s&&S.push("-");r<y;){for(l=2147483647,i=0;i<y;++i)(g=t[i])>=e&&g<l&&(l=g);for(l-e>a((2147483647-n)/(v=r+1))&&u("overflow"),n+=(l-e)*v,e=l,i=0;i<y;++i)if((g=t[i])<e&&++n>2147483647&&u("overflow"),g==e){for(f=n,d=36;!(f<(m=d<=o?1:d>=o+26?26:d-o));d+=36)w=f-m,A=36-m,S.push(h(c(m+w%A,0))),f=a(w/A);S.push(h(c(f,0))),o=p(n,v,r==s),n=0,++r}++n,++e}return S.join("")}(t):t}))}function f(t){return null===t}function d(t){return"string"==typeof t}function m(t){return"object"==typeof t&&null!==t}function g(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var y=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};function v(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}}function A(t,e,n,r){return e=e||"&",n=n||"=",null===t&&(t=void 0),"object"==typeof t?w(S(t),(function(r){var s=encodeURIComponent(v(r))+n;return y(t[r])?w(t[r],(function(t){return s+encodeURIComponent(v(t))})).join(e):s+encodeURIComponent(v(t[r]))})).join(e):r?encodeURIComponent(v(r))+n+encodeURIComponent(v(t)):""}function w(t,e){if(t.map)return t.map(e);for(var n=[],r=0;r<t.length;r++)n.push(e(t[r],r));return n}var S=Object.keys||function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e};function x(t,e,n,r){e=e||"&",n=n||"=";var s={};if("string"!=typeof t||0===t.length)return s;var o=/\+/g;t=t.split(e);var i=1e3;r&&"number"==typeof r.maxKeys&&(i=r.maxKeys);var a=t.length;i>0&&a>i&&(a=i);for(var h=0;h<a;++h){var u,c,p,l,f=t[h].replace(o,"%20"),d=f.indexOf(n);d>=0?(u=f.substr(0,d),c=f.substr(d+1)):(u=f,c=""),p=decodeURIComponent(u),l=decodeURIComponent(c),g(s,p)?y(s[p])?s[p].push(l):s[p]=[s[p],l]:s[p]=l}return s}var C={encode:A,stringify:A,decode:x,parse:x},b={parse:k,resolve:function(t,e){return k(t,!1,!0).resolve(e)},resolveObject:function(t,e){return t?k(t,!1,!0).resolveObject(e):e},format:function(t){d(t)&&(t=E({},t));return P(t)},Url:H};function H(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}var _=/^([a-z0-9.+-]+:)/i,z=/:[0-9]*$/,q=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,T=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","\t"]),j=["'"].concat(T),O=["%","/","?",";","#"].concat(j),R=["/","?","#"],B=/^[+a-z0-9A-Z_-]{0,63}$/,I=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,N={javascript:!0,"javascript:":!0},D={javascript:!0,"javascript:":!0},U={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function k(t,e,n){if(t&&m(t)&&t instanceof H)return t;var r=new H;return r.parse(t,e,n),r}function E(t,e,n,r){if(!d(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var s=e.indexOf("?"),o=-1!==s&&s<e.indexOf("#")?"?":"#",i=e.split(o);i[0]=i[0].replace(/\\/g,"/");var a=e=i.join(o);if(a=a.trim(),!r&&1===e.split("#").length){var h=q.exec(a);if(h)return t.path=a,t.href=a,t.pathname=h[1],h[2]?(t.search=h[2],t.query=n?x(t.search.substr(1)):t.search.substr(1)):n&&(t.search="",t.query={}),t}var u,c,p,f,m=_.exec(a);if(m){var g=(m=m[0]).toLowerCase();t.protocol=g,a=a.substr(m.length)}if(r||m||a.match(/^\/\/[^@\/]+@[^@\/]+/)){var y="//"===a.substr(0,2);!y||m&&D[m]||(a=a.substr(2),t.slashes=!0)}if(!D[m]&&(y||m&&!U[m])){var v,A,w=-1;for(u=0;u<R.length;u++)-1!==(c=a.indexOf(R[u]))&&(-1===w||c<w)&&(w=c);for(-1!==(A=-1===w?a.lastIndexOf("@"):a.lastIndexOf("@",w))&&(v=a.slice(0,A),a=a.slice(A+1),t.auth=decodeURIComponent(v)),w=-1,u=0;u<O.length;u++)-1!==(c=a.indexOf(O[u]))&&(-1===w||c<w)&&(w=c);-1===w&&(w=a.length),t.host=a.slice(0,w),a=a.slice(w),$(t),t.hostname=t.hostname||"";var S="["===t.hostname[0]&&"]"===t.hostname[t.hostname.length-1];if(!S){var C=t.hostname.split(/\./);for(u=0,p=C.length;u<p;u++){var b=C[u];if(b&&!b.match(B)){for(var H="",z=0,T=b.length;z<T;z++)b.charCodeAt(z)>127?H+="x":H+=b[z];if(!H.match(B)){var k=C.slice(0,u),E=C.slice(u+1),X=b.match(I);X&&(k.push(X[1]),E.unshift(X[2])),E.length&&(a="/"+E.join(".")+a),t.hostname=k.join(".");break}}}}t.hostname.length>255?t.hostname="":t.hostname=t.hostname.toLowerCase(),S||(t.hostname=l(t.hostname)),f=t.port?":"+t.port:"";var L=t.hostname||"";t.host=L+f,t.href+=t.host,S&&(t.hostname=t.hostname.substr(1,t.hostname.length-2),"/"!==a[0]&&(a="/"+a))}if(!N[g])for(u=0,p=j.length;u<p;u++){var K=j[u];if(-1!==a.indexOf(K)){var W=encodeURIComponent(K);W===K&&(W=escape(K)),a=a.split(K).join(W)}}var M=a.indexOf("#");-1!==M&&(t.hash=a.substr(M),a=a.slice(0,M));var F=a.indexOf("?");if(-1!==F?(t.search=a.substr(F),t.query=a.substr(F+1),n&&(t.query=x(t.query)),a=a.slice(0,F)):n&&(t.search="",t.query={}),a&&(t.pathname=a),U[g]&&t.hostname&&!t.pathname&&(t.pathname="/"),t.pathname||t.search){f=t.pathname||"";var G=t.search||"";t.path=f+G}return t.href=P(t),t}function P(t){var e=t.auth||"";e&&(e=(e=encodeURIComponent(e)).replace(/%3A/i,":"),e+="@");var n=t.protocol||"",r=t.pathname||"",s=t.hash||"",o=!1,i="";t.host?o=e+t.host:t.hostname&&(o=e+(-1===t.hostname.indexOf(":")?t.hostname:"["+this.hostname+"]"),t.port&&(o+=":"+t.port)),t.query&&m(t.query)&&Object.keys(t.query).length&&(i=A(t.query));var a=t.search||i&&"?"+i||"";return n&&":"!==n.substr(-1)&&(n+=":"),t.slashes||(!n||U[n])&&!1!==o?(o="//"+(o||""),r&&"/"!==r.charAt(0)&&(r="/"+r)):o||(o=""),s&&"#"!==s.charAt(0)&&(s="#"+s),a&&"?"!==a.charAt(0)&&(a="?"+a),n+o+(r=r.replace(/[?#]/g,(function(t){return encodeURIComponent(t)})))+(a=a.replace("#","%23"))+s}function $(t){var e=t.host,n=z.exec(e);n&&(":"!==(n=n[0])&&(t.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(t.hostname=e)}H.prototype.parse=function(t,e,n){return E(this,t,e,n)},H.prototype.format=function(){return P(this)},H.prototype.resolve=function(t){return this.resolveObject(k(t,!1,!0)).format()},H.prototype.resolveObject=function(t){if(d(t)){var e=new H;e.parse(t,!1,!0),t=e}for(var n,r=new H,s=Object.keys(this),o=0;o<s.length;o++){var i=s[o];r[i]=this[i]}if(r.hash=t.hash,""===t.href)return r.href=r.format(),r;if(t.slashes&&!t.protocol){for(var a=Object.keys(t),h=0;h<a.length;h++){var u=a[h];"protocol"!==u&&(r[u]=t[u])}return U[r.protocol]&&r.hostname&&!r.pathname&&(r.path=r.pathname="/"),r.href=r.format(),r}if(t.protocol&&t.protocol!==r.protocol){if(!U[t.protocol]){for(var c=Object.keys(t),p=0;p<c.length;p++){var l=c[p];r[l]=t[l]}return r.href=r.format(),r}if(r.protocol=t.protocol,t.host||D[t.protocol])r.pathname=t.pathname;else{for(n=(t.pathname||"").split("/");n.length&&!(t.host=n.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==n[0]&&n.unshift(""),n.length<2&&n.unshift(""),r.pathname=n.join("/")}if(r.search=t.search,r.query=t.query,r.host=t.host||"",r.auth=t.auth,r.hostname=t.hostname||t.host,r.port=t.port,r.pathname||r.search){var m=r.pathname||"",g=r.search||"";r.path=m+g}return r.slashes=r.slashes||t.slashes,r.href=r.format(),r}var y,v=r.pathname&&"/"===r.pathname.charAt(0),A=t.host||t.pathname&&"/"===t.pathname.charAt(0),w=A||v||r.host&&t.pathname,S=w,x=r.pathname&&r.pathname.split("/")||[],C=r.protocol&&!U[r.protocol];if(n=t.pathname&&t.pathname.split("/")||[],C&&(r.hostname="",r.port=null,r.host&&(""===x[0]?x[0]=r.host:x.unshift(r.host)),r.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===n[0]?n[0]=t.host:n.unshift(t.host)),t.host=null),w=w&&(""===n[0]||""===x[0])),A)r.host=t.host||""===t.host?t.host:r.host,r.hostname=t.hostname||""===t.hostname?t.hostname:r.hostname,r.search=t.search,r.query=t.query,x=n;else if(n.length)x||(x=[]),x.pop(),x=x.concat(n),r.search=t.search,r.query=t.query;else if(null!=t.search)return C&&(r.hostname=r.host=x.shift(),(y=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@"))&&(r.auth=y.shift(),r.host=r.hostname=y.shift())),r.search=t.search,r.query=t.query,f(r.pathname)&&f(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.href=r.format(),r;if(!x.length)return r.pathname=null,r.search?r.path="/"+r.search:r.path=null,r.href=r.format(),r;for(var b=x.slice(-1)[0],_=(r.host||t.host||x.length>1)&&("."===b||".."===b)||""===b,z=0,q=x.length;q>=0;q--)"."===(b=x[q])?x.splice(q,1):".."===b?(x.splice(q,1),z++):z&&(x.splice(q,1),z--);if(!w&&!S)for(;z--;z)x.unshift("..");!w||""===x[0]||x[0]&&"/"===x[0].charAt(0)||x.unshift(""),_&&"/"!==x.join("/").substr(-1)&&x.push("");var T=""===x[0]||x[0]&&"/"===x[0].charAt(0);return C&&(r.hostname=r.host=T?"":x.length?x.shift():"",(y=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@"))&&(r.auth=y.shift(),r.host=r.hostname=y.shift())),(w=w||r.host&&x.length)&&!T&&x.unshift(""),x.length?r.pathname=x.join("/"):(r.pathname=null,r.path=null),f(r.pathname)&&f(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.auth=t.auth||r.auth,r.slashes=r.slashes||t.slashes,r.href=r.format(),r},H.prototype.parseHost=function(){return $(this)};function X(t){this.capacity=0|t,this.map=Object.create(null),this.list=new L}function L(){this.firstNode=null,this.lastNode=null}function K(t,e){this.key=t,this.val=e,this.prev=null,this.next=null}X.prototype.get=function(t){var e=this.map[t];if(null!=e)return this.used(e),e.val},X.prototype.set=function(t,e){var n=this.map[t];if(null!=n)n.val=e;else{if(this.capacity||this.prune(),!this.capacity)return!1;n=new K(t,e),this.map[t]=n,this.capacity--}return this.used(n),!0},X.prototype.used=function(t){this.list.moveToFront(t)},X.prototype.prune=function(){var t=this.list.pop();null!=t&&(delete this.map[t.key],this.capacity++)},L.prototype.moveToFront=function(t){this.firstNode!=t&&(this.remove(t),null==this.firstNode?(this.firstNode=t,this.lastNode=t,t.prev=null,t.next=null):(t.prev=null,t.next=this.firstNode,t.next.prev=t,this.firstNode=t))},L.prototype.pop=function(){var t=this.lastNode;return null!=t&&this.remove(t),t},L.prototype.remove=function(t){this.firstNode==t?this.firstNode=t.next:null!=t.prev&&(t.prev.next=t.next),this.lastNode==t?this.lastNode=t.prev:null!=t.next&&(t.next.prev=t.prev)};e((function(t,e){var r=e,s=new X(1e3);function o(t,e,r){return n.createHmac("sha256",t).update(e,"utf8").digest(r)}function i(t,e){return n.createHash("sha256").update(t,"utf8").digest(e)}function a(t){return t.replace(/[!'()*]/g,(function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}))}function h(t){return a(encodeURIComponent(t))}function u(t,e){"string"==typeof t&&(t=b.parse(t));var n=t.headers=t.headers||{},r=(!this.service||!this.region)&&this.matchHost(t.hostname||t.host||n.Host||n.host);this.request=t,this.credentials=e||this.defaultCredentials(),this.service=t.service||r[0]||"",this.region=t.region||r[1]||"us-east-1","email"===this.service&&(this.service="ses"),!t.method&&t.body&&(t.method="POST"),n.Host||n.host||(n.Host=t.hostname||t.host||this.createHost(),t.port&&(n.Host+=":"+t.port)),t.hostname||t.host||(t.hostname=n.Host||n.host),this.isCodeCommitGit="codecommit"===this.service&&"GIT"===t.method}u.prototype.matchHost=function(t){var e=((t||"").match(/([^\.]+)\.(?:([^\.]*)\.)?amazonaws\.com(\.cn)?$/)||[]).slice(1,3);if("es"===e[1]&&(e=e.reverse()),"s3"==e[1])e[0]="s3",e[1]="us-east-1";else for(var n=0;n<2;n++)if(/^s3-/.test(e[n])){e[1]=e[n].slice(3),e[0]="s3";break}return e},u.prototype.isSingleRegion=function(){return["s3","sdb"].indexOf(this.service)>=0&&"us-east-1"===this.region||["cloudfront","ls","route53","iam","importexport","sts"].indexOf(this.service)>=0},u.prototype.createHost=function(){var t=this.isSingleRegion()?"":"."+this.region;return("ses"===this.service?"email":this.service)+t+".amazonaws.com"},u.prototype.prepareRequest=function(){this.parsePath();var t,e=this.request,n=e.headers;e.signQuery?(this.parsedPath.query=t=this.parsedPath.query||{},this.credentials.sessionToken&&(t["X-Amz-Security-Token"]=this.credentials.sessionToken),"s3"!==this.service||t["X-Amz-Expires"]||(t["X-Amz-Expires"]=86400),t["X-Amz-Date"]?this.datetime=t["X-Amz-Date"]:t["X-Amz-Date"]=this.getDateTime(),t["X-Amz-Algorithm"]="AWS4-HMAC-SHA256",t["X-Amz-Credential"]=this.credentials.accessKeyId+"/"+this.credentialString(),t["X-Amz-SignedHeaders"]=this.signedHeaders()):(e.doNotModifyHeaders||this.isCodeCommitGit||(!e.body||n["Content-Type"]||n["content-type"]||(n["Content-Type"]="application/x-www-form-urlencoded; charset=utf-8"),!e.body||n["Content-Length"]||n["content-length"]||(n["Content-Length"]=Buffer.byteLength(e.body)),!this.credentials.sessionToken||n["X-Amz-Security-Token"]||n["x-amz-security-token"]||(n["X-Amz-Security-Token"]=this.credentials.sessionToken),"s3"!==this.service||n["X-Amz-Content-Sha256"]||n["x-amz-content-sha256"]||(n["X-Amz-Content-Sha256"]=i(this.request.body||"","hex")),n["X-Amz-Date"]||n["x-amz-date"]?this.datetime=n["X-Amz-Date"]||n["x-amz-date"]:n["X-Amz-Date"]=this.getDateTime()),delete n.Authorization,delete n.authorization)},u.prototype.sign=function(){return this.parsedPath||this.prepareRequest(),this.request.signQuery?this.parsedPath.query["X-Amz-Signature"]=this.signature():this.request.headers.Authorization=this.authHeader(),this.request.path=this.formatPath(),this.request},u.prototype.getDateTime=function(){if(!this.datetime){var t=this.request.headers,e=new Date(t.Date||t.date||new Date);this.datetime=e.toISOString().replace(/[:\-]|\.\d{3}/g,""),this.isCodeCommitGit&&(this.datetime=this.datetime.slice(0,-1))}return this.datetime},u.prototype.getDate=function(){return this.getDateTime().substr(0,8)},u.prototype.authHeader=function(){return["AWS4-HMAC-SHA256 Credential="+this.credentials.accessKeyId+"/"+this.credentialString(),"SignedHeaders="+this.signedHeaders(),"Signature="+this.signature()].join(", ")},u.prototype.signature=function(){var t,e,n,r=this.getDate(),i=[this.credentials.secretAccessKey,r,this.region,this.service].join(),a=s.get(i);return a||(t=o("AWS4"+this.credentials.secretAccessKey,r),e=o(t,this.region),n=o(e,this.service),a=o(n,"aws4_request"),s.set(i,a)),o(a,this.stringToSign(),"hex")},u.prototype.stringToSign=function(){return["AWS4-HMAC-SHA256",this.getDateTime(),this.credentialString(),i(this.canonicalString(),"hex")].join("\n")},u.prototype.canonicalString=function(){this.parsedPath||this.prepareRequest();var t,e=this.parsedPath.path,n=this.parsedPath.query,r=this.request.headers,s="",o="s3"!==this.service,a="s3"===this.service||this.request.doNotEncodePath,u="s3"===this.service,c="s3"===this.service;if(t="s3"===this.service&&this.request.signQuery?"UNSIGNED-PAYLOAD":this.isCodeCommitGit?"":r["X-Amz-Content-Sha256"]||r["x-amz-content-sha256"]||i(this.request.body||"","hex"),n){var p=Object.keys(n).reduce((function(t,e){return e?(t[h(e)]=Array.isArray(n[e])&&c?n[e][0]:n[e],t):t}),{}),l=[];Object.keys(p).sort().forEach((function(t){Array.isArray(p[t])?p[t].map(h).sort().forEach((function(e){l.push(t+"="+e)})):l.push(t+"="+h(p[t]))})),s=l.join("&")}return"/"!==e&&(o&&(e=e.replace(/\/{2,}/g,"/")),"/"!==(e=e.split("/").reduce((function(t,e){return o&&".."===e?t.pop():o&&"."===e||(a&&(e=decodeURIComponent(e.replace(/\+/g," "))),t.push(h(e))),t}),[]).join("/"))[0]&&(e="/"+e),u&&(e=e.replace(/%2F/g,"/"))),[this.request.method||"GET",e,s,this.canonicalHeaders()+"\n",this.signedHeaders(),t].join("\n")},u.prototype.canonicalHeaders=function(){var t=this.request.headers;return Object.keys(t).sort((function(t,e){return t.toLowerCase()<e.toLowerCase()?-1:1})).map((function(e){return e.toLowerCase()+":"+t[e].toString().trim().replace(/\s+/g," ")})).join("\n")},u.prototype.signedHeaders=function(){return Object.keys(this.request.headers).map((function(t){return t.toLowerCase()})).sort().join(";")},u.prototype.credentialString=function(){return[this.getDate(),this.region,this.service,"aws4_request"].join("/")},u.prototype.defaultCredentials=function(){var t=process.env;return{accessKeyId:t.AWS_ACCESS_KEY_ID||t.AWS_ACCESS_KEY,secretAccessKey:t.AWS_SECRET_ACCESS_KEY||t.AWS_SECRET_KEY,sessionToken:t.AWS_SESSION_TOKEN}},u.prototype.parsePath=function(){var t=this.request.path||"/";/[^0-9A-Za-z;,/?:@&=+$\-_.!~*'()#%]/.test(t)&&(t=encodeURI(decodeURI(t)));var e=t.indexOf("?"),n=null;e>=0&&(n=C.parse(t.slice(e+1)),t=t.slice(0,e)),this.parsedPath={path:t,query:n}},u.prototype.formatPath=function(){var t=this.parsedPath.path,e=this.parsedPath.query;return e?(null!=e[""]&&delete e[""],t+"?"+a(C.stringify(e))):t},r.RequestSigner=u,r.sign=function(t,e){return new u(t,e).sign()}}));metadata={systemName:"AWS_Lex_ChatBot",displayName:"AWS Lex ChatBot Broker",description:"AWS Lex ChatBot Broker",configuration:{AwsRegion:{displayName:"AWS Region",type:"string",value:"eu-west-2"},BotName:{displayName:"Bot Name",type:"string",value:"MedicalBotNHS"},BotAlias:{displayName:"Bot Name",type:"string",value:"latestversion"},UserID:{displayName:"User ID",type:"string",value:"AKIARXLDA4AZB24QPA72"},UserSecret:{displayName:"User Secret",type:"string",value:""}}},ondescribe=async function({}){postSchema({objects:{message:{displayName:"Message",description:"Represents a text reply",properties:{inputText:{displayName:"Input Text",type:"string"},outputText:{displayName:"Output Text",type:"string"}},methods:{postText:{displayName:"Post Text",type:"execute",inputs:["inputText"],outputs:["outputText"]}}}}})},onexecute=async function({objectName:t,methodName:e,parameters:n,properties:r,configuration:s}){switch(t){case"message":await async function(t,e,n){switch(t){case"postText":await function(t,e){return new Promise((n,r)=>{var s,o={inputText:t.inputText.toString()},i=JSON.stringify(o),a=function(t){for(var e=[":","-"],n=0;n<e.length;n++)for(;-1!=t.indexOf(e[n]);)t=t.replace(e[n],"");return t=t.split(".")[0]+"Z"}((new Date).toISOString()),h=a.split("T")[0],u=(s=(void 0)(h,"AWS4"+metadata.configuration.UserSecret),(void 0)("aws4_request",(void 0)("lex",(void 0)(metadata.configuration.AwsRegion.toString(),s)))),c=(void 0)(i,u),p=`runtime.lex.${e.AwsRegion}.amazonaws.com`,l=(void 0)(i).toString(),f=`/bot/${e.BotName}/alias/${e.BotAlias}/user/${e.UserID}/text HTTP/1.1`,d=`AWS4-HMAC-SHA256 Credential=${e.UserID.toString()}/${h}/${e.AwsRegion.toString()}/lex/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=${c}`,m=`https://runtime.lex.${e.AwsRegion}.amazonaws.com/bot/${e.BotName}/alias/${e.BotAlias}/user/${e.UserID}/text`,g="POST\n"+f+"\n\ncontent-type:application/json\nhost:"+p+"\nx-amz-content-sha256:"+l+"\nx-amz-date:"+a+"\ncontent-type;host;x-amz-content-sha256;x-amz-date\n"+l,y=(void 0)(g).toString(),v="AWS4-HMAC-SHA256\n"+a+"\n"+h+"/"+e.AwsRegion+"/lex/aws4_request\n"+y,A=(c=(void 0)(u,v),(void 0)({host:p,service:"lex",region:e.AwsRegion.toString(),method:"POST",path:f,headers:{"Content-Type":"application/json",Host:p,"X-Amz-Date":a,"X-Amz-Content-SHA256":l,"Content-Length":(i.length-2).toString()},body:i})),w=new XMLHttpRequest;w.onreadystatechange=function(){try{if(4!==w.readyState)return;if(200!==w.status)throw new Error("Failed with status "+w.status);var t=JSON.parse(w.responseText);postResult({outputText:t.message}),n()}catch(t){postResult({outputText:`ErrorMessage: ${t.message}\nAWSString: ${A}\nHeader: ${d}\nURL: ${m}\nSignature: ${u}\nBodyHash: ${l}\nAmzDate: ${a}\nAuthDate: ${h}\nCanonicalReq: ${g}\nAuthKey: ${c}\nCanonicalHash: ${y}\nStringToSign: ${v}`}),n()}},w.open("POST",m),w.setRequestHeader("Authorization",d),w.setRequestHeader("Content-Type","application/json"),w.setRequestHeader("Host",p),w.setRequestHeader("X-Amz-Date",a),w.setRequestHeader("X-Amz-Content-SHA256",l),w.setRequestHeader("Content-Length",(i.length-2).toString()),w.send(i)})}(e,n);break;default:throw new Error("The method "+t+" is not supported.")}}(e,r,s);break;default:throw new Error("The object "+t+" is not supported.")}}}();
//# sourceMappingURL=index.js.map
