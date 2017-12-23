if( [ 'win32', 'linux', 'darwin' ].indexOf( process.platform.toLowerCase() ) == -1 ){ console.log( 'This platform is not supported' ); console.log( 'If you stil want it please comment out or delete the first line of main.js' ); process.exit( 1 ); }

var http          = require( 'http' );
var fs            = require( 'fs' );
var url           = require( 'url' );

var port     = 80;
var hostname = 'localhost';

//Config file

var config = JSON.parse(fs.readFileSync( 'config.json', 'utf-8' ));
if( config.http === undefined ){
    config.http = {};
}
port = config.http.port === undefined ? port : config.http.port;
hostname = config.http.hostname === undefined ? hostname : config.http.hostname;

//Arguments
for( var i = 2; i < process.argv.length; i++ ){
    if( process.argv[ i ].match( /^-*.$/ ) ){
        var arg = process.argv[ i ].replace( /^-/, '' ).split( ':' )
        switch ( arg[ 0 ] ){
            case 'http-port' :
                port = Number( arg[1] )
                break;
            case 'http-host-name':
                hostname = arg[1];
                break;
        }
    }
}

//================================

var server = http.createServer();

var path_action = [];
server.on( 'request', function( http_request, http_response ){
    var parsed_url = url.parse( decodeURI( http_request.url ), true );
    var post = [];
    if( path_action[ parsed_url.pathname ] === 'function' ){
        var path = parsed_url.pathname.replace(/\/index.(html?|php)$/,'/')
        path_action[ parsed_url.pathname ]( parsed_url , parsed_url);
    }
})

server.listen( port, hostname );
