export const INJ_JS = `
!function(){var e=function(e,n,t){if(n=n.replace(/^on/g,""),"addEventListener"in window)e.addEventListener(n,t,!1);else if("attachEvent"in window)e.attachEvent("on"+n,t);else{var o=e["on"+n];e["on"+n]=o?function(e){o(e),t(e)}:t}return e},n=document.querySelectorAll("a[href]");if(n)for(var t in n)n.hasOwnProperty(t)&&e(n[t],"onclick",function(e){new RegExp("^https?://"+location.host,"gi").test(this.href)||(e.preventDefault(),window.postMessage(JSON.stringify({external_url_open:this.href})))})}();
`;

const SS_JS = `
(function(){
    var attachEvent = function(elem, event, callback)
    {
        event = event.replace(/^on/g, '');
        if ( 'addEventListener' in window ) {
            elem.addEventListener(event, callback, false);            
        } else if ( 'attachEvent' in window ) {
            elem.attachEvent('on'+event, callback);            
        } else {
            var registered = elem['on' + event];
            elem['on' + event] = registered ? function(e) {
                registered(e);
                callback(e);
            } : callback;
        }
        
        return elem;
    }
    var all_links = document.querySelectorAll('a[href]');
    if ( all_links ) {
        for ( var i in all_links ) {
            if ( all_links.hasOwnProperty(i) ) {
                attachEvent(all_links[i], 'onclick', function(e){
                    if ( ! new RegExp( '^https?:\\/\\/' + location.host, 'gi' ).test( this.href ) ) {
                        // handle external URL
                        e.preventDefault();
                        window.postMessage(JSON.stringify({
                            external_url_open: this.href
                        }));
                    }
                });
            }
        }
    }
})();
`;
