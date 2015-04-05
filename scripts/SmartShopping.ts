/**
 * @author Christian Brel <christian@the6thscreen.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/SourceServer.ts" />
/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />

/// <reference path="./SmartShoppingNamespaceManager.ts" />



/**
 * Represents the The 6th Screen SmartShopping' Service.
 *
 * @class SmartShopping
 * @extends SourceServer
 */
class SmartShopping extends SourceServer {



    /**
     * Constructor.
     *
     * @param {number} listeningPort - Server's listening port..
     * @param {Array<string>} arguments - Server's command line arguments.
     */
    constructor(listeningPort : number, arguments : Array<string>) {
        super(listeningPort, arguments);

        this.init();
    }

    /**
     * Method to init the SmartShopping server.
     *
     * @method init
     */
    init() {
        var self = this;

        this.addNamespace("SmartShopping", SmartShoppingNamespaceManager);
    }
}

/**
 * Server's SmartShopping listening port.
 *
 * @property _SmartShoppingListeningPort
 * @type number
 * @private
 */
var _SmartShoppingListeningPort : number = process.env.PORT_RSSFEEDREADER || 6003;

/**
 * Server's SmartShopping command line arguments.
 *
 * @property _SmartShoppingArguments
 * @type Array<string>
 * @private
 */
var _SmartShoppingArguments : Array<string> = process.argv;

var serverInstance = new SmartShopping(_SmartShoppingListeningPort, _SmartShoppingArguments);
serverInstance.run();