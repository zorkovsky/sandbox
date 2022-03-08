
window.purechatApi = { l: [], t: [], on: function () 
    { this.l.push(arguments); } }; 
    
    (function () { var done = false; var script = document.createElement('script'); script.async = true; script.type = 'text/javascript'; script.src = 'https://app.purechat.com/VisitorWidget/WidgetScript'; document.getElementsByTagName('HEAD').item(0).appendChild(script); script.onreadystatechange = script.onload = function (e) { if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) { var w = new PCWidget({ c: 'aa28e73a-5408-42f2-9a7c-6c4f78b630e7', f: true }); done = true; } }; })();