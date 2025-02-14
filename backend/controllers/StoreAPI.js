var mongoose = require("mongoose");

var Store = require("../models/Store");
var events = require("../models/Events");
var adm = require("../models/Adm");
var local = require("../models/Local");
const path = require('path');

var StoreAPI = {};


StoreAPI.getImageLocal = function (req, res, next) {
  const eventId = req.params.eventId;

  events.findOne({ _id: eventId }, function (err, event) {
    if (err) {
      return next(err);
    }

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const imagePath = path.join(__dirname, "../public/images/" + event.file);
    res.sendFile(imagePath, (err) => {
      if (err) {
        return next(err);
      }
    });
  });
};


 

// NÃo presente nos slides
StoreAPI.list = function (req, res) {

events.find({}).then(eventos => {
  Store.find({}).then(store => {
    local.find({}).then(local => {
      adm.find().exec((err, adm) => {
      if (err) {
        console.log("Error: ", err);
      } else {
        res.json({store, eventos, local, adm});
      }
    });
  }).catch(err => {
    console.log(err);
    })
}).catch(err => {
console.log(err);
})
}).catch(err => {
  console.log(err);
})
};


StoreAPI.listTickets = function (req, res) {

  events.find({}).then(eventos => {
      Store.find({}).exec((err, store) => {
          
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log(store);
        res.json({  eventos, store });
      }
    });
  }).catch(err => {
    console.log(err);
  })
  };

StoreAPI.show = function (req, res) {
  res.json(req.event);
}

StoreAPI.getByIdEvent = function (req, res, next, id) {
  events.findOne({ _id: id }, function (err, event) {
    if (err) {
      next(err);
    } else {
      req.event = event;
      next();
    }
  });
};

StoreAPI.create = async function(req, res, next) {
  try {

    var ticket = new Store(req.body);
    console.log(ticket.adm)
    console.log(ticket.ptotal)
    const user = await adm.findOne({ name: ticket.adm });
    if(user){

    const a = user.points + ticket.ptotal;
await user.updateOne({ points: a });

    }

    res.json(ticket); 

    await ticket.save();

  } catch (error) {
    console.log(error);
  }
};

const stripe = require("stripe")("sk_test_51NGMDrJATj9uc3szf8XcTEHbrEvMNkuYMXB768lyIMNXPRTt0q2oYThSZWCggKgdbmz05S6IQu4e7pfsXuhxbM5t00nu2AcpoH");

StoreAPI.checkout = async function(req, res, next) {
    try {
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
        },
            shipping_options: [
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 0,
                    currency: 'usd',
                },
                display_name: 'Free shipping',
                // Delivers between 5-7 business days
                delivery_estimate: {
                    minimum: {
                    unit: 'business_day',
                    value: 5,
                    },
                    maximum: {
                    unit: 'business_day',
                    value: 7,
                    },
                }
                }
            },
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 1500,
                    currency: 'usd',
                },
                display_name: 'Next day air',
                // Delivers in exactly 1 business day
                delivery_estimate: {
                    minimum: {
                    unit: 'business_day',
                    value: 1,
                    },
                    maximum: {
                    unit: 'business_day',
                    value: 1,
                    },
                }
                }
            },
            ],
           line_items:  req.body.items.map((item) => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [item.product]
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          })),
           mode: "payment",
           success_url: "http://localhost:3000/success.html",
           cancel_url: "http://localhost:3000/cancel.html",
        });

        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
    
};

module.exports = StoreAPI;