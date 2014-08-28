
// Virtual Desktop
// Desktop Layout ref: http://css-tricks.com/arranging-elements-top-bottom-instead-left-right-float/

Ext.define("sux.Desktop",{
  "extend": "Ext.panel.Panel",
  // "controller": "admin-role",
  // "viewModel": {
  //     "type": "admin-role"
  // },
  // requires: [
  //     'SSD_Web.view.admin.RoleModel',
  //     'SSD_Web.view.admin.RoleController'
  // ],

  region: 'center',
  // style: {},
  layout: {
    type: 'border'
  },
  items: [
     {
          region: 'center',
          xtype: 'dataview',
          padding: 0,
          style: {
            backgroundColor: 'silver',
            position: 'relative',
            background: 'url(assets/default.jpg)',
            backgroundSize: '100% 100%',
            color: '#EEEEEE'
          },
          // get prebuild then set it to here
          store: Ext.create('Ext.data.Store', {
                 id:'imagesStore',
                 model: Ext.define('Image', {
                   extend: 'Ext.data.Model',
                   fields: [
                       { name:'src', type:'string' },
                       { name:'caption', type:'string' }
                   ]
                 }),
                 data: [
                   { src:'/assets/chrome.png', caption:'Chrome', handler: function(){
                       Ext.create({
                        xtype: 'window',
                        title: 'Brower',
                        width: 400,
                        height: 300,
                        constrain: true,
                        html: '<h1>Hello World</h1>'
                       }).show();
                     }
                   },
                   { src:'http://www.sencha.com/img/20110215-feat-drawing.png', caption:'Drawing & Charts' },
                   { src:'http://www.sencha.com/img/20110215-feat-data.png', caption:'Advanced Data' },
                   { src:'http://www.sencha.com/img/20110215-feat-html5.png', caption:'Overhauled Theme' },
                   { src:'http://www.sencha.com/img/20110215-feat-perf.png', caption:'Performance Tuned' },
                   { src:'http://www.sencha.com/img/20110215-feat-drawing.png', caption:'Drawing & Charts' },
                   { src:'http://www.sencha.com/img/20110215-feat-data.png', caption:'Advanced Data' },
                   { src:'http://www.sencha.com/img/20110215-feat-html5.png', caption:'Overhauled Theme' },
                   { src:'http://www.sencha.com/img/20110215-feat-perf.png', caption:'Performance Tuned' },
                   { src:'http://www.sencha.com/img/20110215-feat-drawing.png', caption:'Drawing & Charts' },
                   { src:'http://www.sencha.com/img/20110215-feat-data.png', caption:'Advanced Data' },
                   { src:'http://www.sencha.com/img/20110215-feat-html5.png', caption:'Overhauled Theme' },
                 ]
          }),
          tpl: null,
          itemSelector: 'div.thumb-wrap',
          emptyText: 'No images available',
          initComponent: function(){
            var me = this;

            me.tpl = new Ext.XTemplate(
                '<tpl for=".">',
                  '<div style="cursor: pointer;margin: 25px; width: 75px; height: 75px; left: {[this.left(xindex)]}px; top: {[this.top(xindex)]}px; position: absolute;" class="thumb-wrap">',
                      '<img src="{src}" style="width: 100%; height: 100%;" />',
                      '<div style="text-align: center;">{caption}{#}{[xindex]}</div>',
                    '</div>',
                '</tpl>', {
                left: function(index){
                  index--;
                  var val = parseInt(index / 4) * 125;
                  return val;
                },
                top: function(index){
                  index--;
                  var val = (index  % 4) * 125;
                  return val;
                }
              });

            // call super
            Ext.view.View.prototype.initComponent.call(this);
          },
          setAlignIcon: function(){
            // debugger;
            var me = this;
            var bottom_offset = 30;
            var padding_value = 130;
            var wrap_value = parseInt(
              (me.el.getHeight() - bottom_offset) / padding_value);

            me.tpl = new Ext.XTemplate(
              '<tpl for=".">',
                '<div style="cursor: pointer;margin: 25px; width: 75px; height: 75px; left: {[this.left(xindex)]}px; top: {[this.top(xindex)]}px; position: absolute;" class="thumb-wrap">',
                    '<img src="{src}" style="width: 100%; height: 100%; border-radius: 5px;" />',
                    '<div style="text-align: center; font-size: 1.2em; margin-top:5px;">{caption}</div>',
                  '</div>',
              '</tpl>', {
              left: function(index){
                index--;
                var val = parseInt(index / wrap_value) * padding_value;
                console.log(val);
                return val;
              },
              top: function(index){
                index--;
                var val = (index  % wrap_value) * padding_value;
                return val;
              }
            });
          },
          listeners: {
            // init layout
            boxready: function(){
              this.setAlignIcon();
            },
            // user resize window
            resize: function(){
              this.setAlignIcon();
              this.refresh();
            },
            // Item Click
            itemclick: function(self, record, item, index, e, eOpts){
              if(record.get('handler')) record.get('handler')();
            }
          }
     }
  ],
  bbar: {
    xtype: 'toolbar',
    height: 30,
    style: {
      padding: '2px'
    },
    items: [
      {
          height: '100%',
          xtype: 'button',
          // iconCls: 'home',
          // iconMask: true,
          text: '<b style="padding: 0px 20px 0px 20px;">Start</b>',
          padding: 0,
          menu: [
            '<div style="background-color: #157fcc; color: white; text-align: center; height: 25px; line-height: 25px; cursor: auto;">Menu</div>',
            {
              text: 'ProgramA',
              menu: [
                {
                  text: 'MSISDN',
                  handler: function(){
                    alert('Open!');
                  }
                }
              ]
            },
            {
              text: 'ProgramB',
            },
            {
              text: 'ProgramC',
            },
            {
              text: 'Logout'
            },
          ]
      },
      '-',
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
          align: 'stretch'
        },
        style: {
          paddingLeft: '5px'
        },
        items: (function(){
          var list = [];
          for(var i=0; i<7; i++){
            list.push({
              xtype: 'button',
              minWidth: 100,
              text: 100 + i,
              height: 25,
              style: {
                marginRight: '2px'
              }
            });
          }
          return list;
        })()
      },
      '->',
      {
        width: 130,
        xtype: 'button',
        text: '2014-08-08 00:00:00'
      }
    ]
  }
});
