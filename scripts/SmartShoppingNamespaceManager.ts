/**
 * @author Christian Brel <christian@the6thscreen.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/libsdef/node-uuid.d.ts" />

/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />

/// <reference path="../t6s-core/core-backend/scripts/server/SourceNamespaceManager.ts" />
/// <reference path="../t6s-core/core/scripts/infotype/DiscountsList.ts" />
/// <reference path="../t6s-core/core/scripts/infotype/Discount.ts" />

var uuid = require('node-uuid');

class SmartShoppingNamespaceManager extends SourceNamespaceManager {

    private _DISCOUNTS_URL : string = "http://erebe-vm15.i3s.unice.fr/smartshopping/api/discounts";

    /**
     * Constructor.
     *
     * @constructor
     * @param {any} socket - The socket.
     */
    constructor(socket : any) {
        super(socket);
        this.addListenerToSocket('RetrieveDiscounts', this.retrieveDiscounts);
    }

    /**
     * Retrieve discounts and return them in "InfoType" format.
     *
     * @method retrieveDiscounts
     * @param {Object} params - Params to retrieve discounts : limit of discounts to return.
     * @param {SmartShoppingNamespaceManager} self - the SmartShoppingNamespaceManager's instance.
     */
    retrieveDiscounts(params : any, self : SmartShoppingNamespaceManager = null) {
        if(self == null) {
            self = this;
        }

        Logger.debug("RetrieveDiscounts Action with params :");
        Logger.debug(params);



        ///////////////

        var nbSend = 0;

        self.fetch(function(discounts) {

            /*var discountsList:DiscountsList = new DiscountsList();
            //var feedContentOk = false;
            //if(!feedContentOk) {
            discountsList.setId(uuid.v1());
            discountsList.setPriority(0);

            for(var iDiscount in discounts) {
                var item : any = discounts[iDiscount];
                var discount:Discount = new Discount(item.guid, 0, pubDate, pubDate.addDays(7), 10000);
                feedNode.setTitle(item.title);
                feedNode.setDescription(item.description);
                feedNode.setSummary(item.summary);
                feedNode.setAuthor(item.author);
                feedNode.setUrl(item.link);
                if (item.image != null && typeof(item.image) != "undefined" && item.image.url != null && typeof(item.image.url) != "undefined") {
                    feedNode.setMediaUrl(item.image.url);
                }

                discountsList.addDiscount(feedNode);
            }

            nbSend++;
            Logger.debug("Send DiscountsList to Client : " + nbSend);
            Logger.debug(discountsList);

            self.sendNewInfoToClient(discountsList);
            */

        }, function(err) {
            if (err) {
                //console.log(err, err.stack);
                Logger.error(err);
            }
        });
    }

    fetch(discountsProcessFunction, errorCB) {
        var self = this;

        http.get(this._DISCOUNTS_URL, function(res) {
            var body = '';

            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                var smartShoppingResponse = JSON.parse(body);

                Logger.debug("Got response: ");
                Logger.debug(smartShoppingResponse);

                discountsProcessFunction(smartShoppingResponse);
            });
        }).on('error', errorCB);
    }
}