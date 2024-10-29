sap.ui.define(["sap/ui/model/json/JSONModel", "./Storage"], function(
    JSONModel,
    Storage
  ) {
    "use strict";
  
    return JSONModel.extend("br.com.novaconsulting.admin.model.LocalstorageJSONModel", {
      _fieldToRetain: false,
      
      /*
        constructor still takes the data object, but also an array of fields 
        to remember. 
      */
      constructor: function(data, aFieldsToRetain) {
        this._fieldToRetain = aFieldsToRetain || [];
        this._storage = Storage;
  
        if (!(this._fieldToRetain instanceof Array))
          throw new Error(
            "Fields to retain for local storage needs to be an array"
          );
       
        //good old constructor call to set the data
        JSONModel.prototype.constructor.call(this, data);
      },
      
      //redefine the getProperty method. Before the JSON model loads it's own content, I want 
      //to see what's inside the localstorage, and I'd like to parse it if it's JSON
      getProperty: function(param) {
        var prop = this._storage.getItem(this._getLocalStorageParamName(param)) ||
              JSONModel.prototype.getProperty.call(this, param)
        var value;
        
        //JSON.parse can actually crash, so the try/catch block is justified
        try {
          value = JSON.parse(prop);
        } catch (e) {
          value = prop;
        }
  
        return value;
      },
      
      //convenience method. sometimes you just want to clear all variables. 
      clearStorage: function() {
        this._storage.clear();
      },
      
      //redefine setProperty to first check if the field is in the fields to retain. 
      //in that case, send it to localstorage as well as do the parent method. 
      setProperty: function(param, value) {
        if (this._fieldToRetain.indexOf(param) >= 0) {
          var toStore = typeof value === 'object' ? JSON.stringify(value) : value;
          this._storage.setItem(this._getLocalStorageParamName(param), toStore);
        }
  
        JSONModel.prototype.setProperty.call(this, param, value);
      },
      
      //you should create unique identifiers. in productive apps this needs more consideration. i use
      //app id from the manifest and user ID. 
      _getLocalStorageParamName: function(param) {
        return `br.com.novaconsulting.admin.${param}`;
      }
    });
  });