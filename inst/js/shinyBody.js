
// in the example I use the static id
// we need to set the idea to el
// then use this to create the binding

// $('#human-body').on('click', '.part', (ev) => {
//  console.log({id: '#human_body', value: ev.target.id})
//   Shiny.setInputValue('human_body', ev.target.id)
// })

$(document).on("click", ".shinyBody-btn-group > .part", function(evt) {
  // stole the closest function from the group button
  // do I need that here?
  // could just be as simple as $(evt.target) ??
 var el = $(evt.target).closest('.part');
});


var shinyBodyBinding = new Shiny.InputBinding();
$.extend(shinyBodyBinding, {
  find: function find(scope) {
    return $(scope).find(".shinyBody-btn-group[id]");
  },
  //getType: (el) => "shinyBody.buttonGroup",
  getValue: function getValue(el) {
    // is .part right here? I _think_ I want to find the closest .part?
    var value = $(el).find(".part").map(function () {
      return this.value;
    }).get();

    if (value.length > 0) {
      return value;
    } else {
      return null;
    }
  },
  // not sure what is happening here for the button
  // and how to translate that to the body part
  // I don't have active buttons but I can add the active class
  setValue: function(el, value) {
    console.log(el.id);
    var $el = $(el);
    console.log(value);
    $el.children().removeClass('active');
    if (value.length) {
      if (!$.isArray(value)) {
        value = [value];
      }
      for (var i = 0; i < value.length; i++) {
        var button_sel = "button[value='" + value[i] + "']";
        $el.find(button_sel).addClass('active');
      }
    }
    $el.trigger("change");
  },
  // wtf is this
  subscribe: function(el, callback) {
    $(el).on("change.shinyBodyBinding", function(e) {
      callback();
    });
  },
  // also this
  unsubscribe: function(el) {
    $(el).off(".shinyBodyBinding");
  },
  receiveMessage: function receiveMessage(el, msg) {
    if (msg.value) {
      shinyBodyBinding.setValue(el, msg.value);
    }
  }
});

Shiny.inputBindings.register(shinyBodyBinding, 'shinyBody.buttonGroup');
