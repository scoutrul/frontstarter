import React from 'react';
export default (function () {
    return React.createElement(
        'section',
        null,
        React.createElement(
            'div',
            { className: 'contentView' },
            React.createElement(
                'h1',
                null,
                'This site info'
            ),
            React.createElement(
                'a',
                { href: 'https://frontstarter.ru' },
                'frontstarter.ru'
            ),
            React.createElement('br', null),
            React.createElement(
                'a',
                { href: 'https://github.com/scoutrul/frontstart', target: 'blank' },
                'GitHub'
            ),
            React.createElement(
                'main',
                { className: 'infoList' },
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h3',
                        null,
                        'Environment:'
                    ),
                    React.createElement(
                        'ul',
                        null,
                        React.createElement(
                            'li',
                            null,
                            'ES6, Babel'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'ReactJS v16'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'Redux-act'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'Router v4'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'ES lint'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h3',
                        null,
                        'Viewing:'
                    ),
                    React.createElement(
                        'ul',
                        null,
                        React.createElement(
                            'li',
                            null,
                            'SinglePageApp'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'Adaptive design'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'Mobile ready'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'Responsive text size'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'CSSAnimation'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h3',
                        null,
                        'Tools:'
                    ),
                    React.createElement(
                        'ul',
                        null,
                        React.createElement(
                            'li',
                            null,
                            'WebStorm IDE'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'NPM, Yarn, Terminal'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'WebPack'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'SCSS, AutoPrefixer'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'Optimized deploying'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h3',
                        null,
                        'Hosting:'
                    ),
                    React.createElement(
                        'ul',
                        null,
                        React.createElement(
                            'li',
                            null,
                            'GIT'
                        ),
                        React.createElement(
                            'li',
                            null,
                            '.RU, SSL'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'Google Firebase'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'GitHub Pages'
                        ),
                        React.createElement(
                            'li',
                            null,
                            'Service Workers'
                        )
                    )
                )
            )
        )
    );
});

import './info.scss';