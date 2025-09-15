"use client";
import React, { useEffect } from 'react';

const FacebookChat: React.FC = () => {
    useEffect(() => {
        // Load Facebook SDK
        const loadFacebookSDK = () => {
            const script = document.createElement('script');
            script.innerHTML = `
                window.fbAsyncInit = function() {
                    FB.init({
                        xfbml: true,
                        version: 'v18.0'
                    });
                };
                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            `;
            document.body.appendChild(script);
        };

        loadFacebookSDK();
    }, []);

    return (
        <>
            <div id="fb-root"></div>
            <div
                className="fb-customerchat"
                data-attribution="biz_inbox"
                data-page_id={process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}
            ></div>
        </>
    );
};

export default FacebookChat;

interface FacebookSDK {
    init(options: {
        xfbml: boolean;
        version: string;
    }): void;
}

declare global {
    interface Window {
        FB: FacebookSDK;
        fbAsyncInit: () => void;
    }
}
