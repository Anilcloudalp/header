/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Header.Menu.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts" />

// import './jQuery.sidebarMenu';
import '../../../Advanced/Header/JavaScript/jQuery.sidebarMenu';
import * as header_menu from 'header_menu.tpl';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import { Configuration } from '../../../Commons/Utilities/JavaScript/Configuration';
import { ProfileModel } from '../../../Commons/Profile/JavaScript/Profile.Model';

import HeaderProfileView = require('../../../Advanced/Header/JavaScript/Header.Profile.View');
import HeaderMenuMyAccountView = require('../../../Advanced/Header/JavaScript/Header.Menu.MyAccount.View');
import GlobalViewsHostSelectorView = require('../../../Commons/GlobalViews/JavaScript/GlobalViews.HostSelector.View');
import GlobalViewsCurrencySelectorView = require('../../../Commons/GlobalViews/JavaScript/GlobalViews.CurrencySelector.View');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');

// @module Header

// @class Header.Menu.View @extends BackboneView
export = BackboneView.extend({
    template: header_menu,

    events: {
        'mouseenter [data-toggle="categories-menu"]': 'menuOpen',
        'mouseleave [data-toggle="categories-menu"]': 'menuClose',
        'click [data-toggle="categories-menu"]': 'menuClose'
    },

    menuOpen: function(e) {
        jQuery(e.currentTarget).addClass('open');
    },

    menuClose: function(e) {
        jQuery(e.currentTarget).removeClass('open');
    },

    initialize: function() {
        const self = this;

        this.application = this.options.application;
        this.application.on('Configuration.navigationData', () => this.render());

        ProfileModel.getPromise().done(function() {
            self.render();
        });
    },

    childViews: {
        'Header.Profile': function() {
            return new HeaderProfileView({
                showMyAccountMenu: false,
                application: this.application
            });
        },
        'Header.Menu.MyAccount': function() {
            return new HeaderMenuMyAccountView(this.options);
        },
        'Global.HostSelector': function() {
            return new GlobalViewsHostSelectorView();
        },
        'Global.CurrencySelector': function() {
            return new GlobalViewsCurrencySelectorView();
        }
    },

    render: function() {
        BackboneView.prototype.render.apply(this, arguments);
        this.$('[data-type="header-sidebar-menu"]').sidebarMenu();
    },


    
    // @method getContext
    // @return {Header.Sidebar.View.Context}
    getContext: function() {
        const profile = ProfileModel.getInstance();
        const is_loading =
            !Configuration.get('performance.waitForUserProfile', true) &&
            ProfileModel.getPromise().state() !== 'resolved';
        const is_loged_in = profile.get('isLoggedIn') === 'T' && profile.get('isGuest') === 'F';
        const environment = SC.ENVIRONMENT;
        const show_languages = environment.availableHosts && environment.availableHosts.length > 1;
        const show_currencies =
            environment.availableCurrencies &&
            environment.availableCurrencies.length > 1 &&
            !Configuration.get('header.notShowCurrencySelector');

            var mydata = [{"Home": "#212121"},{"Shop":"#212121"},{"digitals":"#9c9c9c"},{"Electronics Accessories":"#9c9c9c"},{"Jabra":"#fff"},{"RingCentral":"#804d3b"},{"About Us":"#eedcbe"},{"Microshot":"#0f5da3"},
        {"top-brands":"#8fdeec"},{"jabra-2.0":"#9b4a97"},{"channel Uc":"#ceadd0"},{"top_brands":"#f63440"},{"Specials":"#ffa5c1"},{"Store":"#ff5200"},{"grocery":"#ffcc8c"},{"":"#ffde00"},{"Music Resources":"#ffee7a"} ]

        // var mydata = Configuration.get('header.mydata');
  
console.log("header menu extension folder")

     
        for(var i =0;i < Configuration.navigationData.length; i++){
            var navigationd = Configuration.navigationData[i];
            var titletext = navigationd.text;
            var colorCodes = '#5555';
            for(var j=0; j < mydata.length; j++)
            {
            if(mydata[i].hasOwnProperty(titletext)){
            colorCodes = mydata[i][titletext];
            
            }
        }
            var navobj = navigationd;
            navobj.color = colorCodes;
            // console.log(JSON.stringify(navobj));
             }
console.log(Configuration.navigationData)


        // @class Header.Sidebar.View.Context
        return {
            isStandalone: this.application.isStandalone(),
            // @property {Array<NavigationData>} navigationItems
            categories: Configuration.navigationData || [],
            // @property {Boolean} showExtendedMenu
            showExtendedMenu: !is_loading && is_loged_in,
            // @property {Boolean} showLanguages
            showLanguages: show_languages,
            // @property {Boolean} showCurrencies
            showCurrencies: show_currencies
        };
    }
});
