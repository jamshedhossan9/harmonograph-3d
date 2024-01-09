(function(){"use strict";self.addEventListener("message",function(e,s){setTimeout(function(){self.postMessage("draw")},e.data.frequency)},!1)})();
