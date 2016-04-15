/**
 * @description : Address Book
 * @author pbasto@arakno.net
 * @link www.arakno.net
 * @version 1.0
 */

//Uncomment for Production
//document.addEventListener('DOMContentLoaded', function() {

var App = {};
App.init = function() {

    App.AddressBook.init();

};


App.AddressBook = {};
(function(instance) {

    instance.render = function() {
        var contactList = {
            'entry': []
        };

        for (var i = 0; i < sessionStorage.length; i++) {
            //Object.assign(contactList, instance.get(sessionStorage.key(i)));
            contactList['entry'].push(instance.get(sessionStorage.key(i)))
        }
        //console.log(contactList);

        $.get('views/list.mst', function(template) {
            var rendered = Mustache.render(template, contactList);
            $('#addressList').html(rendered);
            _bindEvents();
        });

    };


    instance.clean = function() {
        $("#addressList").children().remove();
    };

    //CRUD methods
    instance.put = function(key, val) {
        sessionStorage.setItem(key.toString(), JSON.stringify(val));
    };

    instance.get = function(val) {
        return JSON.parse(sessionStorage.getItem(val));
    };

    instance.delete = function(key) {
        sessionStorage.removeItem(key);
    };

    instance.drop = function() {
        sessionStorage.clear();
    };

    instance.edit = function(params) {

        App.AddressBook.Edit.update(entry);

    };

    //TODO: Command pattern
    var _bindEvents = function() {

        $('#addContact').on('click', function(e) {
            var contact = new App.AddressBook.Contact("", "", "");
            App.AddressBook.Edit.init(contact);
            instance.clean();
            instance.render();
            return false;
        });

        $('.deleteContact').on('click', function() {
            var row = this.parentElement.parentElement.parentElement.dataset.id;
            instance.delete(row);
            instance.clean();
            instance.render();
            return false;
        });

        $('.editContact').on('click', function() {
            var row = this.parentElement.parentElement.parentElement.dataset.id;
            var contact = new App.AddressBook.Contact("jonas", "sabonis", "jonassabonis@arakno.net");
            instance.edit(this.parentElement.parentElement.parentElement.dataset.id);
            return false;
        });

    };

    instance.init = function() {
        _bindEvents();
        instance.render();
    };

})(App.AddressBook);

//Data Model
App.AddressBook.Contact = function(firstName, surname, email, country) {
    var contact = {
            id: new Date().getUTCMilliseconds(),
            name: {
                firstName: firstName,
                surname: surname
            },
            email: email,
            country: null
        }

    return contact;

};

//View/Edit Contact
App.AddressBook.Edit = {};
(function(instance) {

    var _getCountries = function(url) {

        return new Promise(function(resolve, reject) {

            var req = new XMLHttpRequest();
            req.open('GET', url);

            req.onload = function() {
                if (req.status == 200) {
                    resolve(req.response);
                } else {
                    reject(res.statusText);
                }
            };
            req.onerror = function() {
                reject("Network Error");
            };
            req.send();
        });

    };


    instance.render = function(entry) {

        _getCountries('/api/getcountries').then(function(res) {

            entry.country = JSON.parse(res);

            $.get('/views/edit.mst', function(template) {
                var rendered = Mustache.render(template, entry);
                $('#contactView').html(rendered);
                _bindEvents();
            });

        }).catch(function(err) {
            throw new Error("XHR error: " + err);
        });

        $("#listView").hide();
        $("#contactView").show();

    };

    instance.update = function(entry) {
        $.get('/views/edit.mst', function(data) {
            var template = "views/edit.mst";
            var html = Mustache.render(template, entry);
            $('#contactView').html(html);
        });
    };

    var _bindEvents = function() {

        $('#submitEntry').on('click', function(e) {

            var contact = $("#contact");
            var data = contact.serializeArray();
            var filteredData = [];
            for (var i = 0; i < data.length; i++) {
                filteredData[i] = data[i].value;
            }

            var contact = new App.AddressBook.Contact();
            contact.name.firstName = filteredData[0];
            contact.name.surname = filteredData[1];
            contact.email = filteredData[2];
            contact.country = filteredData[3];
            /*
                var sel = $("#country")[0];
                entry.country = sel.options[sel.selectedIndex].value;
            */
            App.AddressBook.put(contact.id, contact);
            App.AddressBook.clean();
            App.AddressBook.render();

            $("#listView").show();
            $("#contactView").hide();

            return false;
        });
    };

    instance.init = function(params) {

        instance.render(params);
        _bindEvents();

    };

})(App.AddressBook.Edit);


App.init();

//});