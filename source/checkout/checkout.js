/* eslint-disable no-plusplus */

(function () {
  const vv = window.lodge;

  /** *************************************************************************************
   *
   * window.lodge.braintree (object)
   * Handle Braintree payment token generation
   *
   * PUBLIC-ISH FUNCTIONS
   * window.lodge.stripe.generateToken(string key, target source)
   *
   ************************************************************************************** */
  vv.braintree = {
    eventAttached: false,

    generateToken(options, source) {
      if (vv.embedded) {
        // vv.events.fire(vv,'stripetokenrequested',params);
      } else {
        // load the markup template, make any needed edits, and return
        vv.getTemplate({
          templateName: "checkout",
          loadCSS: false,
          successCallback: function successCallback(t) {
            const container = document.createElement("div");
            container.innerHTML = t;
            container.className = "ccform-wrapper";

            // show the container while braintree API injects hosted fields
            vv.overlay.reveal({ innerContent: container });

            // grab the bits we care about
            const form = document.querySelector("#braintree-token-form");
            const submit = document.querySelector("#button-pay");

            // do highlights for focused name/email
            const inputs = document.querySelectorAll(
              "#braintree-token-form input"
            );
            const len = inputs.length;
            for (let i = 0; i < len; i++) {
              inputs[i].addEventListener("focus", function (e) {
                vv.styles.addClass({
                  el: e.target.parentNode,
                  className: "braintree-hosted-fields-focused",
                });
              });

              inputs[i].addEventListener("blur", function (e) {
                vv.styles.removeClass({
                  el: e.target.parentNode,
                  className: "braintree-hosted-fields-focused",
                });
              });
            }

            submit.disabled = true;

            braintree.client.create(
              {
                authorization: options.braintree,
              },
              function (err, clientInstance) {
                if (err) {
                  console.error(err);
                  return;
                }

                // Create input fields and add text styles
                const d = new Date(); // need this in the call below to customize exp date

                braintree.hostedFields.create(
                  {
                    client: clientInstance,
                    styles: {
                      input: {
                        color: "#282c37",
                        "font-size": "16px",
                        transition: "color 0.1s",
                        "line-height": "3",
                      },
                      // Style the text of an invalid input
                      "input.invalid": {
                        color: "#E53A40",
                      },
                      // placeholder styles need to be individually adjusted
                      "::-webkit-input-placeholder": {
                        color: "rgba(0,0,0,0.4)",
                      },
                      ":-moz-placeholder": {
                        color: "rgba(0,0,0,0.4)",
                      },
                      "::-moz-placeholder": {
                        color: "rgba(0,0,0,0.4)",
                      },
                      ":-ms-input-placeholder": {
                        color: "rgba(0,0,0,0.4)",
                      },
                    },
                    // Add information for individual fields
                    fields: {
                      number: {
                        selector: "#card-number",
                        placeholder: "0000 0000 0000 0000",
                      },
                      cvv: {
                        selector: "#cvv",
                        placeholder: "123",
                      },
                      expirationDate: {
                        selector: "#expiration-date",
                        placeholder: `${d.getMonth()} / ${d.getFullYear() + 1}`,
                      },
                    },
                  },
                  function (err, hostedFieldsInstance) {
                    if (err) {
                      console.error(err);
                      return;
                    }

                    hostedFieldsInstance.on("validityChange", function (event) {
                      // Check if all fields are valid, then show submit button
                      const formValid = Object.keys(event.fields).every(
                        function (key) {
                          return event.fields[key].isValid;
                        }
                      );

                      if (formValid) {
                        vv.styles.addClass({
                          el: submit,
                          className: "show-button",
                        });
                        submit.disabled = false;
                      } else {
                        vv.styles.removeClass({
                          el: submit,
                          className: "show-button",
                        });
                        submit.disabled = true;
                      }
                    });

                    hostedFieldsInstance.on("empty", function (event) {
                      document.querySelector("#card-image").className = "";
                      form.className = "";
                    });

                    hostedFieldsInstance.on("cardTypeChange", function (event) {
                      // Change card bg depending on card type
                      if (event.cards.length === 1) {
                        form.className = "";
                        vv.styles.addClass({
                          el: form,
                          className: event.cards[0].type,
                        });
                        document.querySelector("#card-image").className = "";
                        vv.styles.addClass({
                          el: document.querySelector("#card-image"),
                          className: event.cards[0].type,
                        });

                        // Change the CVV length for AmericanExpress cards
                        if (event.cards[0].code.size === 4) {
                          hostedFieldsInstance.setAttribute({
                            field: "cvv",
                            attribute: "placeholder",
                            value: "1234",
                          });
                        }
                      } else {
                        hostedFieldsInstance.setAttribute({
                          field: "cvv",
                          attribute: "placeholder",
                          value: "123",
                        });
                      }
                    });

                    submit.addEventListener(
                      "click",
                      function (event) {
                        event.preventDefault();

                        hostedFieldsInstance.tokenize(function tokenize(
                          error,
                          payload
                        ) {
                          if (error) {
                            vv.debug.out(error);
                          } else {
                            const poststring = `email=${
                              document.querySelector("#email").value
                            }&firstName=${
                              document.querySelector("#first-name").value
                            }&lastName=${
                              document.querySelector("#last-name").value
                            }&amount=${options.amount}&nonce=${payload.nonce}`;
                            vv.overlay.showLoading();
                            vv.ajax.send({
                              url: options.endpoint,
                              postString: poststring,
                              callback: function reveal(e, r) {
                                if (e) {
                                  vv.overlay.reveal({
                                    innerContent: `<h2 class="vv-checkout-error">${options.errorMsg}</h2>`,
                                  });
                                } else {
                                  vv.overlay.reveal({
                                    innerContent: `<h2 class="vv-checkout-success">${options.successMsg}</h2>`,
                                  });
                                }
                              },
                            });
                          }
                        });
                      },
                      false
                    );
                  }
                );
              }
            );
          },
        });
      }
    },
  };

  /** *************************************************************************************
     *
     * window.lodge.checkout (object)
     * start the checkout flow for multiple payments in a controlled overlay
     *
     * PUBLIC FUNCTIONS
     * window.lodge.checkout.begin(obj options, target source)
     *
     * EXAMPLE
     vv.checkout.begin({
		 		"braintree"  : "pk_test_wh4t3ver", // false OR public stripe key
		 		"paypal"     : true, // boolean for "should we have paypal as an option"
		 		"endpoint"   : for AJAX calls on submit
	 		});
     *
     ************************************************************************************** */
  vv.checkout = {
    prepped: false,

    prep() {
      if (!vv.checkout.prepped) {
        // add in styles
        vv.getScript({
          url: "https://js.braintreegateway.com/web/3.46.0/js/client.min.js",
          callback: function callback() {
            vv.getScript({
              url:
                "https://js.braintreegateway.com/web/3.46.0/js/hosted-fields.min.js",
              callback: function secondCallback() {
                vv.styles.injectCSS({
                  css: `${vv.path}/templates/checkout.css`,
                  top: true,
                });
                vv.checkout.prepped = true;
              },
            });
          },
        });
      }
    },

    begin(options, source) {
      if (vv.embedded) {
        vv.events.fire({ obj: vv, type: "begincheckout", data: options });
      } else {
        vv.checkout.prep();
        // set up the empty object we'll populate in the return
        const defaultOptions = {
          braintree: false,
          paypal: false,
          currency: false,
          firstName: false,
          lastName: false,
          email: false,
          recurring: false,
          amount: false,
          endpoint: "",
          successMsg: "Success.",
          errorMsg: "There was a problem.",
        };

        const finalOptions = Object.assign(defaultOptions, options);
        vv.checkout.initiatepayment(finalOptions, source);
      }
    },

    initiatepayment(options, source) {
      // just starts the payment flow and does the steps needed based on
      // the options passed in...
      // BT only
      if (options.braintree && !options.paypal) {
        vv.braintree.generateToken(options, source);
      }
      // Paypal only
      else if (!options.braintree && options.paypal) {
        vv.events.fire({
          obj: vv,
          type: "checkoutdata",
          data: options,
          target: source,
        });
        vv.overlay.reveal({ innerContent: '<div class="vv-loading"></div>' });
      }
      // Stripe and Paypal
      else if (options.braintree && options.paypal) {
        // Create HTML elements to use as selectors
        const container = document.createElement("div");
        container.className = "vv-checkout-choose";

        const ppspan = document.createElement("span");
        const stspan = document.createElement("span");

        ppspan.innerHTML = "Pay with PayPal";
        ppspan.className = "pay-pp";
        stspan.innerHTML = "Pay with a credit card";
        stspan.className = "pay-cc";

        // Create a special event to detect Paypal chosen
        ppspan.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          vv.events.fire({
            obj: vv,
            type: "checkoutdata",
            data: options,
            target: source,
          });
          vv.overlay.showLoading();
        });

        // Create a special event to detect Braintree chosen
        stspan.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          vv.braintree.generateToken(options.braintree, source);
        });

        container.appendChild(ppspan);
        container.appendChild(stspan);

        vv.overlay.reveal({ innerContent: container });
      }
      // No available payment types, by options or SSL limits on Stripe
      else {
        vv.checkout.showerror();
      }
    },

    showerror() {
      vv.overlay.reveal({
        innerContent:
          '<div class="vv-checkout-error">There are no valid payment types. Please add a payment connection. Check to make sure your site supports SSL (https) if you are using Braintree.</div>',
      });
    },
  };
})(); // END
