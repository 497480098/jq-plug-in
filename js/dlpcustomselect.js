;(function ($, window, document, undefined) {
    //Author：HANGWEI
    //Create the defaults once
    var pluginName = 'dlpcustomSelect',
        defaults = {
            addButtonEnabled : true,
            addButtonText: 'Add',
            delButtonText:'Delete'
        };
    //... other code ...
    // The actual plugin constructor
    function DlpCustomSelect(element, options) {
        this.element = $(element);
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    //bind events for button
    function bindEvents(dlpCustomSelect) {
        dlpCustomSelect.elements.addButton.on('click', function() {
          addOption(dlpCustomSelect);
        });
        dlpCustomSelect.elements.deleteButton.on('click', function() {
          deleteOption(dlpCustomSelect);
        });
          //backup method.
          /*
          $(document).on('click', '.box1 .btn-pull-buttom', function() {
              addOption(dlpCustomSelect);
          });
          */
    }
    DlpCustomSelect.prototype = {
     init: function () {
       // Add the custom HTML template
       this.container = $('' +
       '<div class="dlpcustomselect-container">' +
         '<table class="box1">' +
         ' <tr>' +
         '   <td><input class="waitAddValue" type="text" size="48" /></td>' +
         '   <td><input class="btn-pull-buttom" type="button" /></td>' +
         ' </tr>' +
         ' <tr>' +
         '   <td><select style="width: 265px;height: 100px" multiple="multiple"></select></td>' +
         '   <td><input class="btn-delete-buttom" type="button" /></td>' +
         ' </tr>' +
         '</table>'+
       '</div>')
         .insertBefore(this.element);
 
       // Cache the inner elements
       this.elements = {
         originalSelect: this.element,
         box1: $('.box1', this.container),
         filterInput1: $('.box1 .waitAddValue', this.container),
         select1: $('.box1 select', this.container),
         addButton: $('.box1 .btn-pull-buttom', this.container),
         deleteButton: $('.box1 .btn-delete-buttom', this.container)
       };
 
       // Set select IDs
       this.originalSelectName = this.element.attr('name') || '';
       var select1Id = 'dlpcustomselect-list_' + this.originalSelectName;
       this.elements.select1.attr('id', select1Id);
 
       // Apply all settings
       this.setAddButtonEnabled(this.settings.addButtonEnabled);
       this.setAddButtonText(this.settings.addButtonText);
       this.setDelButtonText(this.settings.delButtonText);
 
       //updateSelectionStates(this);
       // Hide the original select
       this.element.hide();
 
       bindEvents(this);
       // refreshSelects(this);
 
       return this.element;
     },
     setAddButtonEnabled: function(value, refresh) {
       this.settings.addButtonEnabled = value;
       if (value) {
         this.container.find('.btn-pull-buttom').removeAttr("disabled");
       } else {
         this.container.find('.btn-pull-buttom').attr("disabled","disabled");
       }
       if (refresh) {
         //refreshSelects(this);
       }
       return this.element;
     },
     setAddButtonText: function(value, refresh) {
       this.settings.addButtonText = value;
       if (value) {
         this.elements.addButton.show().val(value);
         //if upper code type doesn't work,use this code.
         //this.container.find('.btn-pull-buttom').show().val(value);
       } else {
         this.elements.addButton.hide().val(value);
         //if upper code type doesn't work,use this code.
         //this.container.find('.btn-pull-buttom').hide().val(value);
       }
       if (refresh) {
         //refreshSelects(this);
       }
       return this.element;
     },
     setDelButtonText: function(value, refresh) {
       this.settings.delButtonText = value;
       if (value) {
         this.elements.deleteButton.show().val(value);
       } else {
         this.elements.deleteButton.hide().val(value);
       }
       if (refresh) {
         //refreshSelects(this);
       }
       return this.element;
     },
     getCustomData: function(){
       var terms = new Array();
       this.container.find('.box1 select option').each(function(index, item) {
         terms.push(item['value']);
       });
       return terms;
     },
     getContainer: function() {
       return this.container;
     },
     destroy: function() {
       this.container.remove();
       this.element.show();
       $.data(this, 'plugin_' + pluginName, null);
       return this.element;
     }
};
    // A really lightweight plugin wrapper around the constructor,
      // preventing against multiple instantiations
    $.fn[ pluginName ] = function (options) {
        var args = arguments;
    
        // Is the first parameter an object (options), or was omitted, instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
              // If this is not a select
              if (!$(this).is('select')) {
                $(this).find('select').each(function(index, item) {
                  // For each nested select, instantiate the dlp custom select
                  $(item).dlpcustomSelect(options);//注意此处的插件名称
                });
              } else if (!$.data(this, 'plugin_' + pluginName)) {
                // Only allow the plugin to be instantiated once so we check that the element has no plugin instantiation yet
      
                // if it has no instance, create a new one, pass options to our plugin constructor,
                // and store the plugin instance in the elements jQuery data object.
                $.data(this, 'plugin_' + pluginName, new DlpCustomSelect(this, options));//注意此处插件的构造函数
              }
            });
            // If the first parameter is a string and it doesn't start with an underscore or "contains" the `init`-function,
            // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
    
            // Cache the method call to make it possible to return a value
            var returns;
        
            this.each(function () {
              var instance = $.data(this, 'plugin_' + pluginName);
              // Tests that there's already a plugin-instance and checks that the requested public method exists
              if (instance instanceof DlpCustomSelect && typeof instance[options] === 'function') {//注意此处插件构造函数名
                // Call the method of our plugin instance, and pass it the supplied arguments.
                returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
              }
            });
        
            // If the earlier cached method gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }

    };

})(jQuery, window, document);




