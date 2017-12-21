if( [ 'win32', 'linux', 'darwin' ].indexOf( process.platform.toLowerCase() ) == -1 ){ console.log('This platform is not supported'); console.log('If you stil want it please comment out or delete the first line of main.js'); process.exit( 1 ); }
var http          = require( 'http' );
var port     = 80;
var hostname = 'localhost';
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
server.on( 'request', function( http_request, http_response ){
})
server.listen( port, hostname );
