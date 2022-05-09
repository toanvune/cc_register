window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  HelloWorld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
    "use strict";
    cc._RF.pop();
  }, {} ],
  ToggleHandle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b9a45njy4xPD7xRedBE+yuP", "ToggleHandle");
    "use strict";
    var selectedUser = require("selectedUser");
    var User = cc.Class({
      id: "",
      username: "",
      password: "",
      phone: "",
      ctor: function ctor() {
        this.username = "";
        this.password = "";
        this.phone = "";
      }
    });
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {},
      onSelected: function onSelected(toggle) {
        var user = new User();
        user = toggle.user;
        toggle.isChecked ? this.addSelectedUser(user) : this.removeSelectedUser(user);
      },
      addSelectedUser: function addSelectedUser(user) {
        selectedUser.push(user);
        return selectedUser;
      },
      removeSelectedUser: function removeSelectedUser(user) {
        var index = selectedUser.indexOf(user);
        selectedUser.splice(index, 1);
        return selectedUser;
      }
    });
    cc._RF.pop();
  }, {
    selectedUser: "selectedUser"
  } ],
  deleteController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e685ew6YxRO5YV9ru5z8IeT", "deleteController");
    "use strict";
    var selectedUser = require("selectedUser");
    var data = JSON.parse(cc.sys.localStorage.getItem("users"));
    cc.Class({
      extends: cc.Component,
      properties: {
        scrollView: cc.ScrollView,
        btnDelete: cc.Button,
        layout_item: cc.Layout,
        lblItem: cc.Label,
        parentItem: cc.Layout,
        prefab_item: cc.Prefab
      },
      onLoad: function onLoad() {
        this.hideOrShowListUser(false);
        this.hideOrShowBtnDelete(false);
      },
      start: function start() {
        selectedUser.length > 0 ? this.onOrOffBtn(true) : this.onOrOffBtn(false);
        this.btnDelete.node.on("mousedown", this.onClickDelete, this);
        if (null != data) {
          this.renderAllUser();
          this.onOrOffBtn(false);
        }
      },
      renderAllUser: function renderAllUser() {
        var _this = this;
        data.forEach(function(user) {
          cc.log(_this.renderUser(user));
        });
      },
      renderUser: function renderUser(user) {
        var item = cc.instantiate(this.prefab_item);
        item.parent = this.parentItem.node;
        item.children[1].getComponent("cc.Label").string = user.username;
        item.children[0].getComponent("cc.Toggle").isChecked = false;
        item.children[0].getComponent("cc.Toggle").user = user;
        return item;
      },
      hideOrShowListUser: function hideOrShowListUser(value) {
        this.scrollView.node.active = value;
      },
      hideOrShowBtnDelete: function hideOrShowBtnDelete(value) {
        this.btnDelete.node.active = value;
      },
      onOrOffBtn: function onOrOffBtn(value) {
        this.btnDelete.interactable = value;
      },
      onClickDelete: function onClickDelete() {
        this.deleteExecute();
        cc.sys.localStorage.setItem("users", JSON.stringify(data));
      },
      deleteExecute: function deleteExecute() {
        data = data.filter(function(_ref) {
          var id1 = _ref.id;
          return !selectedUser.some(function(_ref2) {
            var id2 = _ref2.id;
            return id2 === id1;
          });
        });
        return data;
      },
      update: function update(dt) {
        data = JSON.parse(cc.sys.localStorage.getItem("users"));
        if (null != data) {
          this.hideOrShowListUser(true);
          this.hideOrShowBtnDelete(true);
        } else {
          this.hideOrShowListUser(false);
          this.hideOrShowBtnDelete(false);
        }
        selectedUser.length > 0 ? this.onOrOffBtn(true) : this.onOrOffBtn(false);
      }
    });
    cc._RF.pop();
  }, {
    selectedUser: "selectedUser"
  } ],
  registerController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "714c2ROQjVGSIHECsAuVARs", "registerController");
    "use strict";
    var User = cc.Class({
      id: "",
      username: "",
      password: "",
      phone: "",
      ctor: function ctor() {
        this.username = "";
        this.password = "";
        this.phone = "";
      }
    });
    var local = JSON.parse(cc.sys.localStorage.getItem("users"));
    cc.Class({
      extends: cc.Component,
      properties: {
        edbUsername: cc.EditBox,
        edbPassword: cc.EditBox,
        edbPhoneNumber: cc.EditBox,
        btnRegister: cc.Button,
        users: []
      },
      onLoad: function onLoad() {
        null != local && (this.users = local);
        cc.log(local);
      },
      start: function start() {
        this.btnRegister.node.on("click", this.clickRegister, this);
      },
      textDone: function textDone() {
        this.edbUsername.string = this.edbUsername.string.trim();
        this.edbPassword.string = this.edbPassword.string.trim();
        this.edbPhoneNumber.string = this.edbPhoneNumber.string.trim();
      },
      clickRegister: function clickRegister() {
        var u = new User();
        u.id = this.users.length + 1;
        u.username = this.edbUsername.string;
        u.password = this.edbPassword.string;
        u.phone = this.edbPhoneNumber.string;
        if ("" != this.edbUsername.string && "" != this.edbPassword.string && "" != this.edbPhoneNumber.string) {
          this.addUserToLocalStorage(u);
          this.edbUsername.string = "";
          this.edbPassword.string = "";
          this.edbPhoneNumber.string = "";
        }
        this.textDone();
      },
      addUserToLocalStorage: function addUserToLocalStorage(u) {
        this.users.push(u);
        cc.sys.localStorage.setItem("users", JSON.stringify(this.users));
      }
    });
    cc._RF.pop();
  }, {} ],
  selectedUser: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c87d3gCk05EiZwV5Tv3WHaP", "selectedUser");
    "use strict";
    var selectedUser = [];
    module.exports = selectedUser;
    cc._RF.pop();
  }, {} ]
}, {}, [ "HelloWorld", "ToggleHandle", "deleteController", "registerController", "selectedUser" ]);