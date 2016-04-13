(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.app = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

        var render = function() {

            //var items = instance.dbget();
            var obj = {};

            for (var i = 0; i < sessionStorage.length; i++) {

                obj[i] = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));

                console.log(obj);
                //break;
            }


            $.get('views/list.mst', function(template) {
                var rendered = Mustache.render(template, obj);
                $('#addressList').html(rendered);
            });

        };

        instance.put = function(key, val) {
            sessionStorage.setItem(key.toString(), JSON.stringify(val));
        };

        instance.get = function(val) {
            return JSON.parse(sessionStorage.getItem(val));
        };

        instance.delete = function() {
            sessionStorage.clear();
        };

        instance.list = function() {

        };

        instance.edit = function(params) {

            App.AddressBook.Edit.update(entry);

        };

        //TODO: Command pattern
        var bindEvents = function() {

            $('#addContact').on('click', function(e) {
                var contact = new App.AddressBook.Contact("", "", "");
                App.AddressBook.Edit.init(contact);
                return false;
            });

            $('#deleteContact').on('click', function(e) {
                var contact = new App.AddressBook.Contact("jonas", "sabonis", "jonassabonis@arakno.net");
                instance.delete(contact);
                return false;
            });

            $('#editContact').on('click', function(e) {
                var contact = new App.AddressBook.Contact("jonas", "sabonis", "jonassabonis@arakno.net");
                instance.edit(e.currentTarget.id);
                return false;
            });

        };

        instance.init = function() {
            bindEvents();
            //if(sessionStorage.length > 0)
            render();
        };

    })(App.AddressBook);


    App.AddressBook.Edit = {};
    (function(instance) {

        instance.render = function(entry) {

            $.get('/views/edit.mst', function(template) {
                var rendered = Mustache.render(template, entry);
                $('#contactView').html(rendered);
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

        instance.clear = function() {

        };

        instance.init = function(params) {

            instance.render(params);

            $('#submitEntry').on('click', function(e) {
                debugger
                var contact = $("#contact")[0].serialize();
                App.AddressBook.put(sessionStorage.length, contact);
                return false;
            });

            //cross-browser compatibility & validation
            /*
            (function () {
                webshims.setOptions('forms', {
                    lazyCustomMessages: true,
                    iVal: {
                        handleBubble: 'hide', // defaults: true. true (bubble and focus first invalid element) | false (no focus and no bubble) | 'hide' (no bubble, but focus first invalid element)
                        fx: 'slide', //defaults 'slide' or 'fade'
                        sel: '.ws-validate', // simple selector for the form element, setting this to false, will remove this feature
                        fieldWrapper: ':not(span, label, em, strong, b, i, mark, p)'
                    }
                });
                webshims.polyfill('forms');
            })();
*/
        };
    })(App.AddressBook.Edit);


    App.AddressBook.Contact = function(firstName, surname, email) {

        var entry = {
            name: {
                firstName: firstName,
                surname: surname
            },
            email: email
        };

        return entry;

    };

    App.init();


module.exports = function () {
    return Object.create(App);
};

//});
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAZGVzY3JpcHRpb24gOiBBZGRyZXNzIEJvb2tcbiAqIEBhdXRob3IgcGJhc3RvQGFyYWtuby5uZXRcbiAqIEBsaW5rIHd3dy5hcmFrbm8ubmV0XG4gKiBAdmVyc2lvbiAxLjBcbiAqL1xuXG4vL1VuY29tbWVudCBmb3IgUHJvZHVjdGlvblxuLy9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgQXBwID0ge307XG4gICAgQXBwLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICBBcHAuQWRkcmVzc0Jvb2suaW5pdCgpO1xuXG4gICAgfTtcblxuXG4gICAgQXBwLkFkZHJlc3NCb29rID0ge307XG4gICAgKGZ1bmN0aW9uKGluc3RhbmNlKSB7XG5cbiAgICAgICAgdmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAvL3ZhciBpdGVtcyA9IGluc3RhbmNlLmRiZ2V0KCk7XG4gICAgICAgICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2Vzc2lvblN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIG9ialtpXSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShzZXNzaW9uU3RvcmFnZS5rZXkoaSkpKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iaik7XG4gICAgICAgICAgICAgICAgLy9icmVhaztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAkLmdldCgndmlld3MvbGlzdC5tc3QnLCBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciByZW5kZXJlZCA9IE11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgb2JqKTtcbiAgICAgICAgICAgICAgICAkKCcjYWRkcmVzc0xpc3QnKS5odG1sKHJlbmRlcmVkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaW5zdGFuY2UucHV0ID0gZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LnRvU3RyaW5nKCksIEpTT04uc3RyaW5naWZ5KHZhbCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGluc3RhbmNlLmdldCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh2YWwpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpbnN0YW5jZS5kZWxldGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaW5zdGFuY2UubGlzdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaW5zdGFuY2UuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuXG4gICAgICAgICAgICBBcHAuQWRkcmVzc0Jvb2suRWRpdC51cGRhdGUoZW50cnkpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy9UT0RPOiBDb21tYW5kIHBhdHRlcm5cbiAgICAgICAgdmFyIGJpbmRFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgJCgnI2FkZENvbnRhY3QnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhY3QgPSBuZXcgQXBwLkFkZHJlc3NCb29rLkNvbnRhY3QoXCJcIiwgXCJcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgQXBwLkFkZHJlc3NCb29rLkVkaXQuaW5pdChjb250YWN0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCgnI2RlbGV0ZUNvbnRhY3QnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhY3QgPSBuZXcgQXBwLkFkZHJlc3NCb29rLkNvbnRhY3QoXCJqb25hc1wiLCBcInNhYm9uaXNcIiwgXCJqb25hc3NhYm9uaXNAYXJha25vLm5ldFwiKTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5kZWxldGUoY29udGFjdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoJyNlZGl0Q29udGFjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGFjdCA9IG5ldyBBcHAuQWRkcmVzc0Jvb2suQ29udGFjdChcImpvbmFzXCIsIFwic2Fib25pc1wiLCBcImpvbmFzc2Fib25pc0BhcmFrbm8ubmV0XCIpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmVkaXQoZS5jdXJyZW50VGFyZ2V0LmlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGluc3RhbmNlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJpbmRFdmVudHMoKTtcbiAgICAgICAgICAgIC8vaWYoc2Vzc2lvblN0b3JhZ2UubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHJlbmRlcigpO1xuICAgICAgICB9O1xuXG4gICAgfSkoQXBwLkFkZHJlc3NCb29rKTtcblxuXG4gICAgQXBwLkFkZHJlc3NCb29rLkVkaXQgPSB7fTtcbiAgICAoZnVuY3Rpb24oaW5zdGFuY2UpIHtcblxuICAgICAgICBpbnN0YW5jZS5yZW5kZXIgPSBmdW5jdGlvbihlbnRyeSkge1xuXG4gICAgICAgICAgICAkLmdldCgnL3ZpZXdzL2VkaXQubXN0JywgZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVuZGVyZWQgPSBNdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIGVudHJ5KTtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdFZpZXcnKS5odG1sKHJlbmRlcmVkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKFwiI2xpc3RWaWV3XCIpLmhpZGUoKTtcbiAgICAgICAgICAgICQoXCIjY29udGFjdFZpZXdcIikuc2hvdygpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaW5zdGFuY2UudXBkYXRlID0gZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgICQuZ2V0KCcvdmlld3MvZWRpdC5tc3QnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gXCJ2aWV3cy9lZGl0Lm1zdFwiO1xuICAgICAgICAgICAgICAgIHZhciBodG1sID0gTXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCBlbnRyeSk7XG4gICAgICAgICAgICAgICAgJCgnI2NvbnRhY3RWaWV3JykuaHRtbChodG1sKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGluc3RhbmNlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBpbnN0YW5jZS5pbml0ID0gZnVuY3Rpb24ocGFyYW1zKSB7XG5cbiAgICAgICAgICAgIGluc3RhbmNlLnJlbmRlcihwYXJhbXMpO1xuXG4gICAgICAgICAgICAkKCcjc3VibWl0RW50cnknKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgICAgICB2YXIgY29udGFjdCA9ICQoXCIjY29udGFjdFwiKVswXS5zZXJpYWxpemUoKTtcbiAgICAgICAgICAgICAgICBBcHAuQWRkcmVzc0Jvb2sucHV0KHNlc3Npb25TdG9yYWdlLmxlbmd0aCwgY29udGFjdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vY3Jvc3MtYnJvd3NlciBjb21wYXRpYmlsaXR5ICYgdmFsaWRhdGlvblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgd2Vic2hpbXMuc2V0T3B0aW9ucygnZm9ybXMnLCB7XG4gICAgICAgICAgICAgICAgICAgIGxhenlDdXN0b21NZXNzYWdlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaVZhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQnViYmxlOiAnaGlkZScsIC8vIGRlZmF1bHRzOiB0cnVlLiB0cnVlIChidWJibGUgYW5kIGZvY3VzIGZpcnN0IGludmFsaWQgZWxlbWVudCkgfCBmYWxzZSAobm8gZm9jdXMgYW5kIG5vIGJ1YmJsZSkgfCAnaGlkZScgKG5vIGJ1YmJsZSwgYnV0IGZvY3VzIGZpcnN0IGludmFsaWQgZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ4OiAnc2xpZGUnLCAvL2RlZmF1bHRzICdzbGlkZScgb3IgJ2ZhZGUnXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWw6ICcud3MtdmFsaWRhdGUnLCAvLyBzaW1wbGUgc2VsZWN0b3IgZm9yIHRoZSBmb3JtIGVsZW1lbnQsIHNldHRpbmcgdGhpcyB0byBmYWxzZSwgd2lsbCByZW1vdmUgdGhpcyBmZWF0dXJlXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFdyYXBwZXI6ICc6bm90KHNwYW4sIGxhYmVsLCBlbSwgc3Ryb25nLCBiLCBpLCBtYXJrLCBwKSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHdlYnNoaW1zLnBvbHlmaWxsKCdmb3JtcycpO1xuICAgICAgICAgICAgfSkoKTtcbiovXG4gICAgICAgIH07XG4gICAgfSkoQXBwLkFkZHJlc3NCb29rLkVkaXQpO1xuXG5cbiAgICBBcHAuQWRkcmVzc0Jvb2suQ29udGFjdCA9IGZ1bmN0aW9uKGZpcnN0TmFtZSwgc3VybmFtZSwgZW1haWwpIHtcblxuICAgICAgICB2YXIgZW50cnkgPSB7XG4gICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgc3VybmFtZTogc3VybmFtZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBlbnRyeTtcblxuICAgIH07XG5cbiAgICBBcHAuaW5pdCgpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKEFwcCk7XG59O1xuXG4vL30pOyJdfQ==
