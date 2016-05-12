define("alert", ["jquery", "underscore"], function(e, n) {
    var t = e("#alert-main"),
        a = e("#alert-content"),
        o = function(e, n) {
            a.html(e), t.removeClass("alert-danger alert-success alert-primary alert-info").addClass(n), t.fadeIn(200, function() {
                setTimeout(function() {
                    t.fadeOut(200)
                }, 2500)
            })
        };
    return {
        alert: o,
        ok: function(e) {
            o(e, "alert-success")
        },
        info: function(e) {
            o(e, "alert-info")
        },
        error: function(e) {
            o(e, "alert-danger")
        },
        asyncMessages: function(e, t, a) {
            var o = this;
            return t = t || {}, e ? (t.initial && o.ok(t.initial), e.then(function() {
                t.ok && o.ok(t.ok)
            }, function(e) {
                var i = t.error || e && (e.message || e.data && e.data.message);
                return n.isObject(e) && e.messagebox && e.closed || !i || o.error(i), a.reject(e)
            })) : void 0
        }
    }
}), define("viewPropertiesService", ["underscore", "angular", "moment"], function(e, n, t) {
    var a, o, i;
    return i = n.module("manager.viewProperties", []), o = ["design", "manage", "preview", "export"], a = [{
        name: "background",
        title: "Background",
        type: "Boolean",
        showIn: ["design"]
    }, {
        name: "floor",
        title: "Floor",
        type: "Boolean",
        "default": !0,
        showIn: ["design", "manage", "export"]
    }, {
        name: "zones",
        title: "Zones",
        type: "Boolean",
        "default": !0
    }, {
        name: "text",
        title: "Labels",
        type: "Boolean",
        defaultIn: {
            manage: !0,
            preview: !0,
            "export": !1
        }
    }, {
        name: "furniture",
        title: "Furniture",
        type: "Boolean",
        "default": !0
    }, {
        name: "members",
        title: "Occupation",
        type: "Boolean",
        showIn: ["manage", "export"],
        defaultIn: {
            manage: !0,
            preview: !0,
            "export": !1
        },
        category: "additional"
    }, {
        name: "availability",
        title: "Availability",
        type: "Boolean",
        showIn: ["manage", "export"],
        defaultIn: {
            manage: !0,
            preview: !0
        },
        category: "additional"
    }, {
        name: "legend",
        title: "Legend",
        type: "Boolean",
        "default": !0,
        defaultIn: {
            design: !1
        },
        category: "additional",
        showIn: ["preview", "export"]
    }, {
        name: "s",
        type: "String",
        showIn: []
    }], e.each(a, function(n) {
        n.showIn = n.showIn || o, e.each(n.showIn, function(e) {
            n["show_in_" + e] = !0, n.category = n.category || "floorplan"
        })
    }), i.constant("viewPropDefs", a).factory("viewPropertiesService", ["$location", "viewPropDefs", function(n, t) {
        function a(n, t) {
            return n.defaultIn && !e.isUndefined(n.defaultIn[t]) ? n.defaultIn[t] : e.isUndefined(n["default"]) ? "Boolean" === n.type ? !1 : "String" === n.type ? e.isUndefined(n.values) ? "" : e.first(n.values) : void 0 : n["default"]
        }

        function o(n, o) {
            var i, s, r, l;
            return l = e.partial(a, e, o), s = e.pluck(t, "name"), r = e.indexBy(t, "name"), i = e.object(s, e.map(t, l)), e.chain(n).pick(s).pick(function(e) {
                return e
            }).each(function(e, n) {
                var t;
                t = r[n], "String" === t.type ? i[n] = e || i[n] : "Boolean" === t.type && (i[n] = e && "false" !== e)
            }), i
        }

        function i(e) {
            return !!e
        }

        function s(e, t, o) {
            var s, r, l;
            l = "Boolean" === t.type, s = e[t.name], r = a(t, o), l && (r = i(r), s = i(s)), s === r ? n.search(t.name, null) : n.search(t.name, s)
        }

        function r(n, t) {
            var a = e.partial(s, e, n);
            return function() {
                var e = t();
                e && a(e, e.mode)
            }
        }

        function l(e, n, t) {
            var o, s, r;
            return r = "Boolean" === n.type, o = e[n.name], s = a(n, t), r && (s = i(s), o = i(o)), o === s ? null : r && o ? n.name : n.name + "=" + o
        }

        function c(n, t, a) {
            return e.chain(t).map(e.partial(l, n, e, a)).compact().value()
        }
        return {
            getModel: o,
            getDefault: a,
            definitions: t,
            getUpdateLocation: r,
            toJParams: c
        }
    }])
}), define("data/module", ["angular"], function(e) {
    return e.module("rnd.data", ["rnd.config"])
}), define("utils", ["underscore", "moment", "string"], function(e, n, t) {
    function a(e, n, t) {
        return Math.min(Math.max(e, n), t)
    }

    function o(e) {
        return e > 0 ? 1 : 0 === e ? 0 : -1
    }

    function i(e, n, t) {
        return e >= n && t >= e || e >= t && n >= e
    }

    function s(e, n, t) {
        return e > n && t > e || e > t && n > e
    }

    function r(n, t, a) {
        a = a || function(e) {
            return e._id
        };
        var o = n.indexOf(e.find(n, function(e) {
            return a(e) == t
        }));
        o >= 0 && n.splice(o, 1)
    }

    function l(e, n) {
        var t = e.indexOf(n);
        return t >= 0 ? (e.splice(t, 1), !0) : !1
    }

    function c(e) {
        return "rgb(" + Math.min(e >> 24 & 255, 180) + "," + Math.min(e >> 16 & 255, 180) + "," + Math.min(e >> 8 & 255, 180) + ")"
    }

    function d(e) {
        var n = e.replace(/([",']*)/g, "").split(" ");
        return n && n.length >= 2 ? n[0].slice(0, 1) + n[1].slice(0, 1) : e.slice(0, 2)
    }

    function m(e) {
        var n = JSON.stringify(e, function(e, n) {
            return "$$hashKey" !== e && "uid" !== e && "$elem" !== e ? n : void 0
        });
        return n
    }

    function u(n, t, a, o) {
        return e.chain(n).pick(t).defaults(o).values().join(a).value()
    }

    function p(n, t, a, o) {
        var i = [],
            s = {};
        return e.each(t, function(e) {
            s[e] = ""
        }), i = e.map(n, function(e) {
            return u(e, t, o, s)
        }), i.unshift(a.join(o)), i.join("\n")
    }

    function f(e, n) {
        n = n || ",";
        var t, a, o = new RegExp("(\\" + n + '|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\' + n + "\\r\\n]*))", "gi"),
            i = [
                []
            ];
        for (t = o.exec(e); t;) {
            var s = t[1];
            s.length && s != n && i.push([]), a = t[2] ? t[2].replace(new RegExp('""', "g"), '"') : t[3], i[i.length - 1].push(a), t = o.exec(e)
        }
        return i
    }

    function g(e) {
        for (var n = f(e), t = [], a = 1; a < n.length; a++) {
            t[a - 1] = {};
            for (var o = 0; o < n[0].length && o < n[a].length; o++) {
                var i = n[0][o];
                t[a - 1][i] = n[a][o]
            }
        }
        return t
    }

    function h(n) {
        return function(t) {
            return e.isArray(t) || (t = [t]), n.apply(null, t)
        }
    }

    function v() {
        return n().startOf("day").toDate()
    }

    function b(e) {
        var t = n(e);
        return t.add(t.toDate().getTimezoneOffset(), "minutes").toDate()
    }

    function y(e) {
        return n(e).startOf("day").subtract(e.getTimezoneOffset(), "minutes").toISOString()
    }

    function k(n) {
        return e.each(e.rest(e.flatten(arguments), 1), function(e) {
            var t = n[e];
            t && (n[e] = b(t))
        }), n
    }

    function w(n) {
        return e.each(e.rest(e.flatten(arguments), 1), function(e) {
            var t = n[e];
            t && (n[e] = y(t))
        }), n
    }

    function M(e, n) {
        var t;
        return t = Math.pow(10, n), Math.round(e * t) / t
    }

    function S(n, t) {
        var a = [];
        return t || (t = function(e, n) {
            return n > e
        }), e.each(n, function(n) {
            var o = e.findLastIndex(a, e.partial(t, e, n)) + 1;
            a.splice(o, 0, n)
        }), a
    }

    function x(n) {
        return e.isArray(n) ? n : [n]
    }

    function D(n, t, a) {
        var o = n[t];
        return e.isUndefined(a) && (a = []), (e.isUndefined(o) || e.isNull(o)) && (n[t] = o = a), o
    }

    function P(e, n, t) {
        return e.length > 1 ? t : n
    }

    function C(e) {
        return n(e).format("ll")
    }

    function z() {
        return e.chain(arguments || []).compact().join("/").value()
    }

    function $(e, n, a, o) {
        return a && o ? "" === e && t(n).endsWith(o) || "" !== e && t(n).contains(z(o, e)) : t(n).endsWith(e)
    }

    function I(e) {
        return !!e.info.lead
    }

    function _(e) {
        return !!e.info.members
    }

    function T(e) {
        return !I(e) && !_(e)
    }

    function A(e) {
        var n, t, a, o = "";
        return n = e.toString().split("."), t = parseInt(n[0], 10), t > 0 && (o = t.toString() + (t > 1 ? " hours" : " hour")), n.length > 0 && (a = parseFloat("0." + n[1], 10), a > 0 && (o += t > 0 ? " and " : "", o += Math.round(60 * a).toString() + " minutes")), o
    }

    function E(t) {
        var a, o, i, s = "";
        if (a = e.object(e.pluck(R.RECURRENCE_INTERVALS, "value"), R.RECURRENCE_INTERVALS), o = a[t.freq.value], i = n.localeData("en")._weekdays, s += t.interval > 1 ? "Every " + t.interval + " " + o.unit + "s" : o.name, "weekly" === o.value) {
            var r = "";
            e.each(t.weekDays, function(e, n) {
                e && (r += r ? ", " + i[n] : i[n])
            }), s += " on " + r
        }
        return "after" === t.end ? s += ", " + t.count + " times" : "on" === t.end && (s += ", until " + n(t.until).format("MMM D, YYYY")), s
    }
    var R = {
            API_ORG: "/i/organizations",
            DESK_NA_TYPE: "desk_na",
            DESK_TYPES: ["desk", "hotdesk", "desk_tr"],
            RECURRENCE_INTERVALS: [{
                name: "Don't repeat",
                value: null,
                unit: null
            }, {
                name: "Daily",
                value: "daily",
                unit: "day"
            }, {
                name: "Weekly",
                value: "weekly",
                unit: "week"
            }]
        },
        B = function(e) {
            var n = Array.prototype.slice.call(arguments, 1);
            return e.replace(/{(\d+)}/g, function(e, t) {
                return "undefined" != typeof n[t] ? n[t] : e
            })
        },
        O = function(n, t) {
            return isNaN(t) && (t = 2), t > n.length ? [] : e.map(n, function(a, o) {
                var i = [a];
                return e.map(e.range(1, t), function(e) {
                    i.push(n[(o + e) % n.length])
                }), i
            })
        };
    return {
        Constants: R,
        clamp: a,
        remove: l,
        removeById: r,
        format: B,
        mergeConsequent: O,
        intToARGB: c,
        acronym: d,
        stringify: m,
        CSV2JSON: g,
        ArrayToCSV: p,
        between: i,
        strictlyBetween: s,
        sign: o,
        spread: h,
        toDate: b,
        toISODate: y,
        today: v,
        parseDateProps: k,
        toISODateProps: w,
        round: M,
        sort: S,
        ensureProperty: D,
        ensureArray: x,
        firstPossibleDate: new Date("1990-01-01"),
        lastPossibleDate: new Date("2090-01-01"),
        plural: P,
        formatDate: C,
        joinPath: z,
        isActivePath: $,
        isLead: I,
        isTeam: _,
        isMember: T,
        humanizeDuration: A,
        humanizeRecurrenceRule: E
    }
}), define("data/dataProvider", ["underscore", "./module", "utils"], function(e, n, t) {
    n.provider("data", ["apiRoot", function(n) {
        function a() {
            return i
        }

        function o() {
            return s
        }
        var i, s, r = [];
        this.register = function(n) {
            return n.collectionFriendlyName || (n.collectionFriendlyName = n.collectionName), r.push(e.omit(n, "model")), n.model && (n.model.load = n.load, n.model.save = n.save, n.model.collectionName = n.collectionName, n.model.collectionFriendlyName = n.collectionFriendlyName, n.collectionFriendlyName = n.collectionFriendlyName + "Model", r.push(n)), this
        }, this.$get = ["$q", "$http", "$injector", "collectionModelFactory", function(l, c, d, m) {
            function u(e, n, t) {
                var a = l.defer(),
                    o = n || "_";
                if (e._promises = e._promises || {}, e._data = e._data || {}, e._data[o]) a.resolve(e._data[o]);
                else {
                    if (e._promises[o]) return e._promises[o];
                    e._promises[o] = a.promise, t().then(function(n) {
                        e._data[o] = n, delete e._promises[o], a.resolve(n)
                    }, a.reject)
                }
                return a.promise
            }

            function p(a, o) {
                function s(e) {
                    d && d(e), t.parseDateProps(e, l)
                }
                var r = o.collectionName,
                    l = o.UTCDateProps || [],
                    d = o.load;
                return c.get(t.joinPath(n, a, r)).then(function(n) {
                    return n.headers("Officernd-Permissions") && (i.perm = parseInt(n.headers("Officernd-Permissions"))), e.each(n.data, s), n.data
                })
            }

            function f(e, a) {
                return c.get(t.joinPath(n, "roomsAtOffice", i.slug, s.slug)).then(function(e) {
                    return s.id = e.data._id, s.root = "rooms/" + s.id, e.data
                })
            }

            function g(e, n, t) {
                return t.get(n.model.collectionFriendlyName).then(function(t) {
                    return m.getModel(t, e, n.model, n.UTCDateProps)
                })
            }

            function h(e, n, t) {
                return function(a) {
                    var o = this;
                    return a ? u(a, e, function() {
                        return t(a.root, n, o)
                    }) : l.reject("Could not load the data...")
                }
            }

            function v(e) {
                var n = y[e];
                return "org-perm" === e ? this.getOrgPerm() : n ? n.getter.apply(this, [n.cacheSelector()]) : l.reject("Undefined collection.")
            }

            function b(n, t) {
                return 0 === t.length ? l.reject("No collections provided") : 1 === t.length ? v.apply(n, t) : l.all(e.map(t, v, n))
            }
            var y = {};
            return e.each(r, function(e) {
                function n() {
                    return "organization" === e.target ? a : o
                }
                var t;
                t = e.createCollection ? e.createCollection : e.model ? g : p, y[e.collectionFriendlyName] = {
                    cacheSelector: n(),
                    getter: h(e.collectionFriendlyName, e, t)
                }
            }), y.room = {
                cacheSelector: o,
                getter: h("room", {}, f)
            }, {
                $injector: d,
                get: function() {
                    return b(this, arguments)
                },
                getOrgPerm: function() {
                    return i ? i._data && i._data.org ? l.resolve(i.perm) : this.get("org").then(function() {
                        return i.perm
                    }) : l.reject("Could not load the data...")
                },
                setOrgSlug: function(e) {
                    i && i.slug === e || (i = {
                        slug: e,
                        root: "organizations/" + e
                    }, s = void 0)
                },
                setRoomSlug: function(e, n) {
                    var t = e + "/" + n;
                    s && s.slug === t || (s = {
                        slug: t,
                        root: "rooms/"
                    })
                },
                setOrgData: function(e, n, t) {
                    i = {
                        slug: e.slug,
                        root: "organizations/" + e.slug,
                        perm: n,
                        _data: {
                            org: e,
                            gallery: t
                        }
                    }
                },
                setRoomData: function(e) {
                    i || (i = {}), s = {
                        id: e._id,
                        root: "rooms/" + e._id,
                        _data: {
                            room: e
                        }
                    }
                },
                resetCache: function() {
                    var e;
                    i && (e = i.slug, i = {
                        slug: e,
                        root: "organizations/" + e
                    }, s = void 0)
                },
                resetRoomsCache: function() {
                    s = void 0
                }
            }
        }]
    }])
}), define("data/collectionModelFactory", ["underscore", "utils", "./module"], function(e, n, t) {
    function a(e, n) {
        this._broker = e, this._listener = n
    }

    function o() {
        this._listeners = [], this._handlers = []
    }
    a.prototype.destroy = function() {
        this._broker && (this._broker.remove(this._listener), delete this._broker, delete this._listener)
    }, o.prototype.add = function(e) {
        return this._listeners.push(e), new a(this, e)
    }, o.prototype.remove = function(n) {
        var t;
        return t = e.indexOf(this._listeners, n), t >= 0 ? (this._listeners.splice(t, 1), !0) : !1
    }, o.prototype.notify = function(n, t) {
        var a;
        a = e.chain(this._listeners).pluck(n).compact().value(), e.each(a, function(e) {
            e.apply(null, t)
        })
    }, t.factory("collectionModelFactory", ["$http", "$q", "apiRoot", function(t, a, i) {
        function s(s, r, l, c) {
            function d(n, a, o) {
                var s = e.compact([i, r, S, o]).join("/");
                return t({
                    method: n,
                    url: s,
                    data: a,
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                })
            }

            function m(e, n) {
                return d("PUT", e, n)
            }

            function u(e, n) {
                return d("POST", e, n)
            }

            function p(e, n) {
                return d("DELETE", e, n)
            }

            function f(n) {
                return 1 === n.length ? p(null, n[0][M]) : p(e.pluck(n, M))
            }

            function g(t) {
                var a;
                return c ? (a = e.clone(t), n.toISODateProps(a, c), a) : t
            }

            function h(e) {
                return P && (e = P(e)), g(e)
            }

            function v(e) {
                D && D(e), n.parseDateProps(e, c)
            }

            function b(n) {
                return u(e.map(n, h))
            }
            var y, k, w, M, S = l.collectionName,
                x = l.extend || {},
                D = l.load,
                P = l.save;
            return M = l.idProperty || "_id", w = new o, y = e.indexBy(s, M), k = {
                _groups: {},
                _groupedBy: [],
                _sendPostRequest: u,
                _sendPutRequest: m,
                _sendDeleteRequest: p,
                _$q: a,
                findById: function(e) {
                    return y[e]
                },
                resetData: function(n) {
                    e.each(s, function(e) {
                        k.onRemove(e)
                    }), s.splice(0, s.length), e.each(n, function(e) {
                        k.onAdd(e)
                    })
                },
                add: function(n) {
                    var t = e.isArray(n) ? n : [n];
                    return b(t).then(function(n) {
                        var a = n.data;
                        return e.each(t, function(n, t) {
                            e.extend(n, a[t]), k.onAdd(n)
                        }), 1 === t.length ? t[0] : t
                    })
                },
                remove: function(n) {
                    var t = e.isArray(n) ? n : [n];
                    return f(t, M).then(function() {
                        e.each(t, function(e) {
                            k.onRemove(e)
                        })
                    })
                },
                update: function(n, t) {
                    return t = e.clone(t), e.each(e.keys(t), function(e) {
                        t[e] === n[e] && delete t[e]
                    }), m(h(t), n[M]).then(function(t) {
                        var a, o, i = t.data;
                        return v(i), o = e.keys(i), a = {}, e.each(o, function(e) {
                            a[e] = n[e]
                        }), e.extend(n, i), k.onUpdate(a, n), n
                    })
                },
                groupedView: function(t, a) {
                    var o;
                    return this._groups[t] || (o = this._groups[t] = e.groupBy(this.items, t), e.each(a || [], function(e) {
                        n.ensureProperty(o, e)
                    }), this._groupedBy.push(t)), this._groups[t]
                },
                onUpdate: function(t, a) {
                    e.each(this._groups, function(o, i) {
                        var s, r, l;
                        e.has(t, i) && (s = t[i], r = a[i], s !== r && (n.remove(o[s], a), l = n.ensureProperty(o, r), l.push(a)))
                    }), w.notify("update", [t, a])
                },
                onRemove: function(t) {
                    n.remove(s, t), delete y[t[M]], e.each(this._groups, function(e, a) {
                        n.remove(e[t[a]], t)
                    }), w.notify("remove", [t])
                },
                onAdd: function(t) {
                    v(t), s.push(t), y[t[M]] = t, e.each(this._groups, function(e, a) {
                        var o, i;
                        o = t[a], i = n.ensureProperty(e, o), i.push(t)
                    }), w.notify("add", [t])
                },
                registerCollectionChange: function(e) {
                    return w.add(e)
                }
            }, k.items = s, e.extend(k, x), k
        }
        return {
            getModel: s
        }
    }])
}), define("data/definitions/membersDataDefinitions", ["underscore", "utils", "../module"], function(e, n, t) {
    var a, o;
    a = {
        membersForTeam: function(e) {
            var t, a;
            return t = this.groupedView("team"), a = n.ensureProperty(t, e)
        }
    }, o = {
        offices: function(n) {
            var t = e.chain(n.info.memberships).pluck("office").compact().uniq().value();
            return t
        },
        desks: function(n) {
            var t = e.chain(n.info.memberships).filter(function(e) {
                return "terminated" !== e.info.status && e.resource
            }).pluck("resource").value();
            return t
        }
    }, t.config(["dataProvider", function(e) {
        e.register({
            target: "organization",
            collectionName: "teams",
            UTCDateProps: ["startDate"],
            model: {
                extend: o
            }
        }).register({
            target: "organization",
            collectionName: "members",
            UTCDateProps: ["startDate"],
            model: {
                extend: a
            }
        }).register({
            target: "organization",
            collectionName: "leads",
            UTCDateProps: ["startDate"],
            model: {}
        }).register({
            target: "organization",
            collectionName: "permissions",
            model: {
                extend: {
                    roles: [{
                        name: "Owner"
                    }, {
                        name: "Collaborator"
                    }, {
                        name: "Viewer"
                    }]
                }
            }
        })
    }]).factory("memberImportService", ["$http", "$stateParams", "data", "apiRoot", function(t, a, o, i) {
        function s(s) {
            var r;
            return r = e.map(s, function(n) {
                return e.omit(n, "$$hashKey")
            }), t.post(n.joinPath(i, "organizations", a.organization, "import-members"), r).then(function(e) {
                return e.data
            }).then(function(e) {
                return o.get("membersModel", "teamsModel").spread(function(n, t) {
                    t.resetData(e.teams), n.resetData(e.members)
                })
            })
        }
        return {
            importMembers: s
        }
    }])
}), define("mrmService", ["require", "exports", "module", "moment", "lodash"], function(e, n, t) {
    function a(e) {
        return v.contains(b, e)
    }

    function o(e) {
        return v.contains(y, e)
    }

    function i(e, n) {
        return function(t) {
            var a = e(t);
            return a && n(a.type)
        }
    }

    function s(e) {
        var n = this._currentMoment;
        return v.filter(e, function(e) {
            return e.startDate && n.isSameOrAfter(e.startDate)
        })
    }

    function r(e) {
        var n = this._currentMoment;
        return v.filter(e, function(e) {
            return !e.endDate || n.isSameOrBefore(e.endDate)
        })
    }

    function l(e) {
        return v.filter(this.activeMemberships(e), i(this._getPlan, a))
    }

    function c(e) {
        return v.filter(this.activeMemberships(e), i(this._getPlan, o))
    }

    function d(e) {
        var n = this._currentMoment;
        return e.startDate && n.isBefore(e.startDate) ? "pending" : e.endDate ? n.isSameOrBefore(e.endDate) ? "notice" : "terminated" : "active"
    }

    function m(e) {
        return !e.endDate
    }

    function u(e, n) {
        var t = v.filter(e, i(n._getPlan, a)),
            o = n.activeMemberships(t),
            s = n.startedMemberships(o);
        return s.length > 0 ? v.some(o, m) ? "active" : "notice" : o.length > 0 ? "pending" : t.length > 0 ? "terminated" : "draft"
    }

    function p(e, n) {
        var t, a;
        return t = u(n, this), "draft" === t ? (a = this._getLead(e), a ? "lead" : e.team ? "contact" : "draft") : t
    }

    function f(e, n) {
        var t, a;
        return t = u(e, this), "draft" === t ? (a = v.some(n, v.bind(this._getLead, this)), a ? "lead" : "draft") : t
    }

    function g(e) {
        this._currentMoment = h(e.currentDate), this._currentDate = this._currentMoment.toDate(), this._getPlan = e.getPlan, this._getLead = e.getLead
    }
    var h = e("moment"),
        v = e("lodash"),
        b = ["desk", "hotdesk", "team_room"],
        y = ["service"];
    v.extend(g.prototype, {
        membershipStatus: d,
        memberStatus: p,
        teamStatus: f,
        startedMemberships: s,
        activeMemberships: r,
        activePlans: l,
        activeServices: c
    }), t.exports = g
}), define("data/definitions/membershipsDataDefinitions", ["underscore", "utils", "../module", "moment", "mrmService"], function(e, n, t, a, o) {
    function i(t, a, i, s, r) {
        function l(t) {
            return e.first(n.ensureProperty(s.groupedView("contact"), t))
        }

        function c(n) {
            var t = b.activeMemberships(n.info.memberships);
            return e.first(b.startedMemberships(t)) || e.first(t) || e.first(n.info.memberships)
        }

        function d(e) {
            e.info.membership = c(e), e.info.status = b.memberStatus(e, e.info.memberships)
        }

        function m(n) {
            n.info.activePlans = b.activePlans(n.info.memberships), n.info.activeServices = b.activeServices(n.info.memberships), n.info.status = b.teamStatus(n.info.memberships, n.info.members), n.info.office = e.first(a.offices(n))
        }

        function u(e) {
            var n = a.findById(e.team);
            n ? e.info.teamName = n.name : delete e.info.teamName
        }

        function p(e) {
            e.info = {
                memberships: i.forMember(e._id),
                lead: l(e._id)
            }, d(e), u(e)
        }

        function f(e) {
            e.info = {
                memberships: i.forTeam(e._id),
                members: n.ensureProperty(t.groupedView("team"), e._id)
            }, m(e)
        }

        function g(e) {
            e.info = {
                status: b.membershipStatus(e),
                plan: r.findById(e.plan)
            }
        }

        function h(e) {
            e.info = {
                contact: t.findById(e.contact)
            }
        }

        function v(e) {
            var n, o;
            n = a.findById(e.team), n && m(n), o = t.findById(e.member), o && d(o)
        }
        var b = new o({
            currentDate: n.today(),
            getPlan: function(e) {
                return e.info.plan
            },
            getLead: function(e) {
                return e.info.lead
            }
        });
        return e.each(i.items, g), e.each(t.items, p), e.each(a.items, f), e.each(s.items, h), i.registerCollectionChange({
            add: function(e) {
                e.info = {
                    status: b.membershipStatus(e),
                    plan: r.findById(e.plan)
                }, v(e)
            },
            remove: function(e) {
                v(e)
            },
            update: function(e, n) {
                n.info.status = b.membershipStatus(n), e.plan && (n.info.plan = r.findById(n.plan)), v(e), v(n)
            }
        }), t.registerCollectionChange({
            add: p,
            update: function(n, t) {
                e.has(n, "team") && u(t)
            }
        }), a.registerCollectionChange({
            add: f,
            update: function(n, t) {
                e.has(n, "name") && e.each(t.info.members, function(e) {
                    e.info.teamName = t.name
                })
            }
        }), s.registerCollectionChange({
            add: function(e) {
                var n = t.findById(e.contact);
                n && (n.info.lead = e, d(n)), h(e)
            },
            remove: function(e) {
                var n = t.findById(e.contact);
                n && (delete n.info.lead, d(n))
            }
        }), {
            membersModel: t,
            teamsModel: a,
            membershipsModel: i,
            leadsModel: s,
            plansModel: r
        }
    }
    var s;
    s = {
        forMember: function(e) {
            return n.ensureProperty(this.groupedView("member"), e)
        },
        forTeam: function(e) {
            return n.ensureProperty(this.groupedView("team"), e)
        }
    }, t.config(["dataProvider", function(e) {
        e.register({
            target: "organization",
            collectionName: "memberships",
            UTCDateProps: ["startDate", "endDate"],
            model: {
                extend: s
            }
        }).register({
            target: "organization",
            collectionFriendlyName: "mrmModel",
            createCollection: function(e, n, t) {
                return t.get("membersModel", "teamsModel", "membershipsModel", "leadsModel", "plansModel").spread(i)
            }
        })
    }])
}), define("data/definitions/resourcesDataDefinition", ["underscore", "utils", "../module"], function(e, n, t) {
    t.config(["dataProvider", function(t) {
        function a(t, a, o) {
            function i(e) {
                var n = o.getStatus(e, void 0, t);
                n && (e.info.status = n.name, e.info.membership = n.membership)
            }

            function s(e) {
                e.info = {
                    memberships: n.ensureProperty(c, e._id)
                }
            }

            function r(e) {
                s(e), i(e)
            }

            function l(e) {
                var n = t.findById(e.resource);
                n && r(n)
            }
            var c = a.groupedView("resource");
            return e.each(t.items, s), e.each(t.items, i), t.registerCollectionChange({
                add: r
            }), a.registerCollectionChange({
                add: function(e) {
                    var n = t.findById(e.resource);
                    n && i(n)
                },
                remove: l,
                update: function(e, n) {
                    var a = t.findById(e.resource);
                    a && i(a);
                    var o = t.findById(n.resource);
                    o && i(o)
                }
            }), {
                resourcesModel: t
            }
        }
        var o;
        o = {
            extend: {
                _typeSubsets: {},
                find: function(n, t) {
                    var a, o;
                    return o = this.groupedView("room"), a = o[n], a && e.find(a, function(e) {
                        return e.target === t
                    })
                },
                resourcesWithType: function(e) {
                    var t;
                    return t = this.groupedView("type"), n.ensureProperty(t, e)
                },
                forRoom: function(e) {
                    var n = this.groupedView("room");
                    return n[e]
                }
            }
        }, t.register({
            collectionName: "resources",
            target: "organization",
            model: o
        }).register({
            target: "organization",
            collectionFriendlyName: "occupancyModel",
            createCollection: function(t, o, i) {
                return i.get("resourcesModel", "membershipsModel").then(n.spread(e.partial(a, e, e, i.$injector.get("availabilityService"))))
            }
        })
    }])
}), define("data/definitions/mainDataDefinitions", ["underscore", "utils", "../module"], function(e, n, t) {
    function a(n, t) {
        function a(t) {
            e.each(t, function(e) {
                o.roomsById[e._id] = {
                    room: e,
                    office: n.findById(e.office)
                }
            })
        }
        var o = this;
        o.roomsById = {}, t.registerCollectionChange({
            add: function(e) {
                a([e])
            },
            remove: function(e) {
                delete o.roomsById[e._id]
            },
            update: function(t, a) {
                e.has(t, "office") && t.office !== a.office && (o.roomsById[a._id].office = n.findById(a.office))
            }
        }), a(t.items)
    }

    function o(t, a, o) {
        var i = a._$q,
            s = e.bind(a._sendPostRequest, a),
            r = e.bind(a._sendDeleteRequest, a);
        return {
            paymentsModel: a,
            sendInvoice: function(t, a) {
                return s(null, n.joinPath(t._id, "invoice", "send") + "?document=" + a).then(function(n) {
                    e.extend(t, n.data)
                })
            },
            removeInvoice: function(t, a) {
                return r(null, n.joinPath(t._id, "invoice", a)).then(function() {
                    var n = e.findIndex(t.linkedDocuments, {
                        _id: a
                    });
                    t.linkedDocuments.splice(n, 1)
                })
            },
            downloadInvoices: function(n) {
                return s(e.pluck(n, "_id"), "export").then(function(e) {
                    return e.data
                })
            },
            exportInvoices: function(a, r, l) {
                var c, d, m, u;
                return u = t.settings.billing, d = n.ensureArray(a), "basic" === u.invoicing ? c = r ? "invoice?template=" + r : "invoice" : "xero" === u.invoicing && (m = o.findByType("Xero"), c = m && m.enabled && (l || !m.settings.manualSync) && "invoice/sync-with-xero"), c ? (e.each(d, function(e) {
                    e.exporting = !0
                }), s(e.pluck(d, "_id"), c).then(function(n) {
                    e.each(n.data, function(n, t) {
                        e.extend(d[t], n), d[t].integration && d[t].integration.error && delete d[t].integration.error
                    })
                }, function(n) {
                    return e.each(d, function(e) {
                        e.integration || (e.integration = {}), n.data && n.data.details && (e.integration.error = n.data && n.data.details)
                    }), i.reject()
                })["finally"](function() {
                    e.each(d, function(e) {
                        delete e.exporting
                    })
                })) : i.resolve()
            }
        }
    }

    function i(n) {
        var t = e.sum(n.charges, "amount");
        return t >= n.amount
    }

    function s(t, a) {
        return e.each(a, function(a) {
            t.charges.push(e.extend(e.clone(a), {
                date: n.toDate(a.date)
            }))
        }), i(t) && (t.status = "paid"), a
    }
    var r = {
        team_room: {
            icon: "fa fa-building-o",
            title: "Private office",
            color: "#b3ae7a"
        },
        desk: {
            icon: "fa fa-desktop",
            title: "Workstation",
            color: "#9898b7"
        },
        hotdesk: {
            icon: "fa fa-laptop",
            title: "Hot desk",
            color: "#f58870"
        },
        meeting_room: {
            icon: "fa fa-suitcase",
            title: "Meeting room",
            color: "#6fc3e2"
        },
        service: {
            icon: "fa fa-print",
            title: "Service",
            color: "#3ebeaf"
        }
    };
    t.config(["dataProvider", function(e) {
        e.register({
            target: "organization",
            collectionName: "",
            collectionFriendlyName: "org"
        }).register({
            target: "organization",
            collectionName: "gallery"
        }).register({
            target: "organization",
            collectionName: "offices",
            model: {}
        }).register({
            target: "organization",
            collectionName: "rooms",
            model: {
                extend: {
                    clone: function(e, t) {
                        var a = this;
                        return a._sendPostRequest(t, n.joinPath(e._id, "clone")).then(function(e) {
                            a.onAdd(e.data)
                        })
                    }
                }
            }
        }).register({
            target: "organization",
            collectionName: "locationsModel",
            createCollection: function(e, t, o) {
                return o.get("officesModel", "roomsModel").then(n.spread(function(e, n) {
                    return new a(e, n)
                }))
            }
        }).register({
            target: "organization",
            collectionName: "rooms-by-id",
            createCollection: function(e, n, t) {
                return t.get("locationsModel").then(function(e) {
                    return e.roomsById
                })
            }
        })
    }]).config(["dataProvider", function(e) {
        e.register({
            target: "organization",
            collectionName: "zones"
        }).register({
            target: "organization",
            collectionName: "furniture"
        })
    }]).config(["dataProvider", function(t) {
        function a(t) {
            e.each(t.lines, function(e) {
                n.parseDateProps(e, ["startDate", "endDate"])
            })
        }
        t.register({
            target: "organization",
            collectionName: "plans",
            model: {
                extend: {
                    types: r
                }
            }
        }).register({
            target: "organization",
            collectionName: "payments",
            UTCDateProps: ["date", "periodStart", "periodEnd"],
            load: a,
            model: {
                load: a,
                save: function(t) {
                    e.each(t.lines, function(e) {
                        n.toISODateProps(e, ["startDate", "endDate"])
                    })
                },
                extend: {
                    nextNumber: function(n) {
                        var t;
                        return t = this.items.length ? e.chain(this.items).pluck("number").map(function(e) {
                            return parseInt(e) || 0
                        }).max().value() : 0, n && (t = Math.max(t, n)), t + 1
                    },
                    forMember: function(e) {
                        return n.ensureProperty(this.groupedView("member"), e)
                    },
                    forTeam: function(e) {
                        return n.ensureProperty(this.groupedView("team"), e)
                    },
                    executeCharge: function(t, a, o) {
                        return this._sendPostRequest({
                            amount: a,
                            preference: o
                        }, n.joinPath(t._id, "execute-charges")).then(e.property("data")).then(e.partial(s, t))
                    },
                    addCharge: function(t, a) {
                        return this._sendPostRequest(e.extend(e.clone(a), {
                            date: n.toISODate(a.date)
                        }), n.joinPath(t._id, "charges")).then(e.property("data")).then(e.partial(s, t))
                    },
                    removeCharge: function(e, t) {
                        return this._sendDeleteRequest(null, n.joinPath(e._id, "charges", t._id)).then(function(a) {
                            n.remove(e.charges, t), i(e) || (e.status = "draft")
                        })
                    }
                }
            }
        })
    }]).config(["dataProvider", function(e) {
        e.register({
            target: "organization",
            collectionFriendlyName: "invoicesModel",
            createCollection: function(e, n, t) {
                return t.get("org", "paymentsModel", "integrationsModel").spread(o)
            }
        })
    }])
}), define("data/definitions/calendarDataDefinitions", ["underscore", "utils", "../module", "moment", "kendo"], function(e, n, t, a, o) {
    t.config(["dataProvider", function(t) {
        function i(e, n) {
            return o.timezone.convert(a(n).add(n.getTimezoneOffset(), "minutes").toDate(), "Etc/UTC", e)
        }

        function s(e, n) {
            return o.timezone.convert(a(n).add(-n.getTimezoneOffset(), "minutes").toDate(), e, "Etc/UTC")
        }

        function r(e, n) {
            n.start.dateTime = i(e, new Date(n.start.dateTime)), n.end.dateTime = i(e, new Date(n.end.dateTime))
        }

        function l(e, n) {
            return n.start.dateTime = s(e, n.start.dateTime), n.end.dateTime = s(e, n.end.dateTime), n
        }
        var c = {
            collectionName: "calendar/events",
            extend: {
                forTeam: function(e) {
                    return n.ensureProperty(this.groupedView("team"), e)
                },
                forMember: function(e) {
                    return n.ensureProperty(this.groupedView("member"), e)
                },
                convertFromOrgTimezone: function(e) {
                    return s(this.timezone, e)
                }
            }
        };
        t.register({
            target: "organization",
            collectionFriendlyName: "calendarEventsModel",
            createCollection: function(n, t, a) {
                var o = a.$injector,
                    i = o.get("collectionModelFactory");
                return a.get("calendarEvents", "org").spread(function(t, a) {
                    var o;
                    return c.load = e.partial(r, a.settings.calendar.timezone), c.save = e.partial(l, a.settings.calendar.timezone), e.each(t, c.load), o = i.getModel(t, n, c, []), o.timezone = a.settings.calendar.timezone, o
                })
            }
        }), t.register({
            target: "organization",
            collectionName: "calendar/events",
            collectionFriendlyName: "calendarEvents"
        })
    }])
}), define("data/definitions/settingsDataDefinitions", ["underscore", "utils", "../module"], function(e, n, t) {
    t.config(["dataProvider", function(t) {
        t.register({
            target: "organization",
            collectionName: "integrations",
            model: {
                extend: {
                    connectOrg: function(t) {
                        return this._sendPutRequest(null, n.joinPath(t.type, "connect")).then(function(n) {
                            return e.extend(t, n.data), t
                        })
                    },
                    findByType: function(n) {
                        return e.first(this.groupedView("type")[n])
                    }
                }
            }
        })
    }]).config(["dataProvider", function(e) {
        e.register({
            target: "organization",
            collectionName: "access-keys",
            collectionFriendlyName: "accessKeys",
            model: {
                idProperty: "token"
            }
        }), e.register({
            target: "organization",
            collectionName: "templates/default",
            collectionFriendlyName: "defaultTemplates"
        }), e.register({
            target: "organization",
            collectionName: "templates",
            collectionFriendlyName: "templates",
            model: {}
        })
    }])
}), define("data/main", ["./dataProvider", "./collectionModelFactory", "./definitions/membersDataDefinitions", "./definitions/membershipsDataDefinitions", "./definitions/resourcesDataDefinition", "./definitions/mainDataDefinitions", "./definitions/calendarDataDefinitions", "./definitions/settingsDataDefinitions"], function() {}), define("app", ["underscore", "angular", "alert", "jquery", "router", "hotkeys", "breadcrumb", "ngInfiniteScroll", "isoCurrency", "viewPropertiesService", "./data/main"], function(e, n, t, a) {
    var o;
    return n.module("rnd.config", []).constant("apiRoot", "/i"), o = n.module("app", ["rnd.config", "manager.viewProperties", "ui.router", "cfp.hotkeys", "ncy-angular-breadcrumb", "infinite-scroll", "kendo.directives", "rnd.data", "isoCurrency"]).factory("popupLoginInterceptor", ["$q", "authenticationService", "messageService", "$injector", function(e, n, o, i) {
        function s(e) {
            return function() {
                var n = i.get("$http");
                return n(e)
            }
        }
        return {
            responseError: function(r) {
                var l, c = r.status;
                return 401 === c ? "xero" === r.data.tag ? i.get("data").get("integrationsModel").then(function(e) {
                    var n, t = e.findByType("Xero");
                    return n = t && t.settings && t.settings.org, l = n ? "You need to authorize OfficeR&D to access " + n.name + " to continue. Do you want to proceed?" : "You need to authorize OfficeR&D to access your Xero account to continue. Do you want to proceed?", o.prompt({
                        title: "Login to Xero?",
                        message: l,
                        okButtonLabel: "Authorize"
                    })
                }).then(function() {
                    return n.authXero()
                }).then(s(r.config)) : (t.error("Your session has expired"), void a("#signin-modal").modal("show")) : e.reject(r)
            }
        }
    }]).config(["$compileProvider", function(e) {
        e.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|blob):/)
    }]).config(["$stateProvider", "$locationProvider", "$httpProvider", "viewPropDefs", function(n, t, a, o) {
        var i = e.pluck(o, "name").join("&");
        n.state("root", {
            url: "/",
            controller: ["$scope", "$state", function(e, n) {
                n.go("account.spaces")
            }]
        }).state("account", {
            url: "/account",
            "abstract": !0,
            templateUrl: "/app/account/template.html",
            data: {
                ncyBreadcrumbLabel: "Account"
            }
        }).state("account.spaces", {
            url: "",
            templateUrl: "/app/account/spaces.html",
            controller: "SpacesController"
        }).state("account.profile", {
            url: "/profile",
            templateUrl: "/app/account/profile.html",
            controller: "ProfileController",
            data: {
                ncyBreadcrumbLabel: "Profile",
                ncyBreadcrumbParent: "account.spaces"
            }
        }).state("account.settings", {
            url: "/settings",
            templateUrl: "/app/account/settings.html",
            controller: "AccountSettingsController",
            data: {
                ncyBreadcrumbLabel: "Settings",
                ncyBreadcrumbParent: "account.spaces"
            }
        }).state("organization", {
            url: "/:organization",
            "abstract": !0,
            templateUrl: "/app/organization/templateBase.html",
            controller: "OrganizationBaseController",
            data: {
                ncyBreadcrumbLabel: "{{org.name}}"
            }
        }).state("organization.manage", {
            url: "",
            "abstract": !0,
            templateUrl: "/app/organization/template.html"
        }).state("organization.manage.dashboard", {
            url: "?office",
            reloadOnSearch: !0,
            templateUrl: "/app/organization/dashboard.html",
            controller: "OrganizationDashboardController"
        }).state("organization.manage.settings", {
            url: "/settings",
            templateUrl: "/app/organization/settings/template.html",
            "abstract": !0,
            controller: "SettingsBaseController",
            data: {
                ncyBreadcrumbParent: "organization.manage.dashboard"
            }
        }).state("organization.manage.settings.general", {
            url: "",
            templateUrl: "/app/organization/settings/general.html",
            controller: "SettingsController",
            data: {
                ncyBreadcrumbLabel: "Settings",
                ncyBreadcrumbParent: "organization.manage.settings"
            }
        }).state("organization.manage.settings.admin", {
            url: "/admin",
            templateUrl: "/app/organization/settings/admin.html",
            controller: "SettingsAdminController",
            data: {
                ncyBreadcrumbLabel: "Admin",
                ncyBreadcrumbParent: "organization.manage.settings.general"
            }
        }).state("organization.manage.settings.integrations", {
            url: "/integrations",
            templateUrl: "/app/organization/settings/integrations.html",
            controller: "SettingsIntegrationsController",
            data: {
                ncyBreadcrumbLabel: "Integrations",
                ncyBreadcrumbParent: "organization.manage.settings.general"
            }
        }).state("organization.manage.settings.community", {
            url: "/community",
            templateUrl: "/app/organization/settings/community.html",
            controller: "SettingsMembersController",
            data: {
                ncyBreadcrumbLabel: "Members",
                ncyBreadcrumbParent: "organization.manage.settings.general"
            }
        }).state("organization.manage.settings.billing", {
            url: "/billing",
            templateUrl: "/app/organization/settings/billing.html",
            controller: "SettingsBillingController",
            data: {
                ncyBreadcrumbLabel: "Billing & Invoicing",
                ncyBreadcrumbParent: "organization.manage.settings.general"
            }
        }).state("organization.manage.settings.portal", {
            url: "/portal",
            templateUrl: "/app/organization/settings/portal.html",
            controller: "SettingsPortalController",
            data: {
                ncyBreadcrumbLabel: "Community Portal",
                ncyBreadcrumbParent: "organization.manage.settings.general"
            }
        }).state("organization.manage.settings.templates", {
            url: "/templates",
            templateUrl: "/app/organization/settings/customTemplates.html",
            controller: "SettingsTemplatesController",
            data: {
                ncyBreadcrumbLabel: "Templates",
                ncyBreadcrumbParent: "organization.manage.settings.general"
            }
        }).state("organization.manage.settings.editTemplate", {
            url: "/templates/:templateType",
            templateUrl: "/app/organization/settings/editCustomTemplate.html",
            controller: "EditTemplateController",
            data: {
                ncyBreadcrumbLabel: "Templates",
                ncyBreadcrumbParent: "organization.manage.settings.templates"
            }
        }).state("organization.manage.settings.space", {
            url: "/space",
            templateUrl: "/app/organization/settings/space.html",
            controller: "SettingsSpaceController",
            data: {
                ncyBreadcrumbLabel: "Space",
                ncyBreadcrumbParent: "organization.manage.settings.general"
            }
        }).state("organization.manage.settings.calendar", {
            url: "/meeting-rooms",
            templateUrl: "/app/organization/settings/calendar.html",
            controller: "SettingsCalendarController",
            data: {
                ncyBreadcrumbLabel: "Calendar",
                ncyBreadcrumbParent: "organization.manage.settings.general"
            }
        }).state("organization.manage.calendar", {
            url: "/calendar",
            templateUrl: "/app/organization/calendar/template.html",
            controller: "CalendarController",
            data: {
                ncyBreadcrumbLabel: "Calendar",
                ncyBreadcrumbParent: "organization.manage.dashboard"
            }
        }).state("organization.manage.space", {
            url: "/space",
            "abstract": !0,
            templateUrl: "/app/organization/space/template.html",
            controller: "SpaceController",
            data: {
                ncyBreadcrumbParent: "organization.manage.dashboard"
            }
        }).state("organization.manage.space.locations", {
            url: "",
            templateUrl: "/app/organization/space/floorplans.html",
            controller: "FloorplansController",
            data: {
                ncyBreadcrumbLabel: "Space",
                ncyBreadcrumbParent: "organization.manage.space"
            }
        }).state("organization.manage.space.meetingrooms", {
            url: "/meeting-rooms",
            templateUrl: "/app/organization/space/meetingRooms.html",
            controller: "MeetingRoomsController",
            data: {
                ncyBreadcrumbLabel: "Meeting Rooms",
                ncyBreadcrumbParent: "organization.manage.space.locations"
            }
        }).state("organization.manage.space.privateoffices", {
            url: "/private-offices",
            templateUrl: "/app/organization/space/privateOffices.html",
            controller: "PrivateOfficesController",
            data: {
                ncyBreadcrumbLabel: "Private Offices",
                ncyBreadcrumbParent: "organization.manage.space.locations"
            }
        }).state("organization.manage.space.occupancy", {
            url: "/occupancy",
            templateUrl: "/app/organization/space/occupancy.html",
            controller: "DeskOccupancyController",
            data: {
                ncyBreadcrumbLabel: "Occupancy",
                ncyBreadcrumbParent: "organization.manage.space.locations"
            }
        }).state("organization.manage.space.desks", {
            url: "/desks",
            templateUrl: "/app/organization/space/desks.html",
            controller: "DesksController",
            data: {
                ncyBreadcrumbParent: "organization.manage.space.locations"
            }
        }).state("organization.manage.space.analytics", {
            url: "/analytics",
            templateUrl: "/app/organization/space/analytics.html",
            controller: "SpaceAnalyticsController",
            data: {
                ncyBreadcrumbLabel: "Analytics",
                ncyBreadcrumbParent: "organization.manage.space.locations"
            }
        }).state("organization.manage.space.furniture", {
            url: "/furniture",
            templateUrl: "/app/organization/space/furniture.html",
            controller: "AssetsController",
            data: {
                ncyBreadcrumbLabel: "Furniture",
                ncyBreadcrumbParent: "organization.manage.space.locations"
            }
        }).state("organization.manage.billing", {
            url: "/billing",
            "abstract": !0,
            templateUrl: "/app/organization/billing/template.html",
            controller: "BillingController",
            data: {
                ncyBreadcrumbParent: "organization.manage.dashboard"
            }
        }).state("organization.manage.billing.dashboard", {
            url: "",
            templateUrl: "/app/organization/billing/dashboard.html",
            controller: "BillingDashboardController",
            data: {
                ncyBreadcrumbLabel: "Billing"
            }
        }).state("organization.manage.billing.invoices", {
            url: "/invoices",
            templateUrl: "/app/organization/billing/invoices.html",
            controller: "InvoicesController",
            data: {
                ncyBreadcrumbLabel: "Invoices",
                ncyBreadcrumbParent: "organization.manage.billing.dashboard"
            }
        }).state("organization.manage.billing.addInvoices", {
            url: "/invoices/add",
            templateUrl: "/app/organization/billing/addInvoices.html",
            controller: "AddInvoicesController",
            data: {
                ncyBreadcrumbLabel: "Add Invoices",
                ncyBreadcrumbParent: "organization.manage.billing.invoices"
            }
        }).state("organization.manage.billing.invoice", {
            url: "/invoices/:id",
            templateUrl: "/app/organization/billing/invoice.html",
            controller: "InvoiceController",
            data: {
                ncyBreadcrumbLabel: "{{invoice.number}}",
                ncyBreadcrumbParent: "organization.manage.billing.invoices"
            }
        }).state("organization.manage.billing.revenue", {
            url: "/revenue",
            templateUrl: "/app/organization/billing/revenue.html",
            controller: "RevenueController",
            data: {
                ncyBreadcrumbLabel: "Revenue",
                ncyBreadcrumbParent: "organization.manage.billing.dashboard"
            }
        }).state("organization.manage.billing.plans", {
            url: "/plans",
            templateUrl: "/app/organization/billing/plans.html",
            controller: "PlansController",
            data: {
                ncyBreadcrumbLabel: "Plans",
                ncyBreadcrumbParent: "organization.manage.billing.dashboard"
            }
        }).state("organization.manage.community", {
            url: "/community",
            "abstract": !0,
            templateUrl: "/app/organization/members/template.html",
            controller: "CommunityController",
            data: {
                ncyBreadcrumbParent: "organization.manage.dashboard"
            }
        }).state("organization.manage.community.root", {
            url: "",
            controller: ["$state", function(e) {
                e.go("organization.manage.community.teams")
            }],
            data: {
                ncyBreadcrumbLabel: "Community",
                ncyBreadcrumbParent: "organization.manage.community"
            }
        }).state("organization.manage.community.members", {
            url: "/members?office&status",
            reloadOnSearch: !1,
            templateUrl: "/app/organization/members/members.html",
            controller: "MembersController",
            data: {
                ncyBreadcrumbLabel: "Members",
                ncyBreadcrumbParent: "organization.manage.community.root"
            }
        }).state("organization.manage.community.contacts", {
            url: "/contacts?office&status",
            reloadOnSearch: !1,
            templateUrl: "/app/organization/members/contacts.html",
            controller: "ContactsController",
            data: {
                ncyBreadcrumbLabel: "Contacts",
                ncyBreadcrumbParent: "organization.manage.community.root"
            }
        }).state("organization.manage.community.teams", {
            url: "/teams?office&status",
            reloadOnSearch: !1,
            templateUrl: "/app/organization/members/teams.html",
            controller: "TeamsController",
            data: {
                ncyBreadcrumbLabel: "{{ ::teamProperty.plural }}",
                ncyBreadcrumbParent: "organization.manage.community.root"
            }
        }).state("organization.manage.community.leads", {
            url: "/leads?office",
            reloadOnSearch: !1,
            templateUrl: "/app/organization/members/leads.html",
            controller: "LeadsController",
            data: {
                ncyBreadcrumbLabel: "Leads",
                ncyBreadcrumbParent: "organization.manage.community.root"
            }
        }).state("organization.manage.community.checkins", {
            url: "/checkins",
            templateUrl: "/app/organization/members/checkins.html",
            controller: "CheckinsController",
            data: {
                ncyBreadcrumbLabel: "Checkins",
                ncyBreadcrumbParent: "organization.manage.community.root"
            }
        }).state("organization.manage.community.former", {
            url: "/former",
            templateUrl: "/app/organization/members/former.html",
            controller: "FormerController",
            data: {
                ncyBreadcrumbLabel: "Former",
                ncyBreadcrumbParent: "organization.manage.community.root"
            }
        }).state("organization.manage.community.memberships", {
            url: "/memberships?office&plan",
            templateUrl: "/app/organization/members/memberships.html",
            controller: "MembershipsController",
            reloadOnSearch: !1,
            data: {
                ncyBreadcrumbLabel: "Memberships",
                ncyBreadcrumbParent: "organization.manage.community.root"
            }
        }).state("organization.manage.member", {
            url: "/community/members/:id",
            templateUrl: "/app/organization/members/member.html",
            controller: "MemberController",
            data: {
                ncyBreadcrumbLabel: "{{member.name}}",
                ncyBreadcrumbParent: "organization.manage.community.members"
            }
        }).state("organization.manage.team", {
            url: "/community/teams/:team",
            templateUrl: "/app/organization/members/team.html",
            controller: "TeamController",
            data: {
                ncyBreadcrumbLabel: "{{ ::team.name }}",
                ncyBreadcrumbParent: "organization.manage.community.teams"
            }
        }).state("organization.office", {
            url: "/:office",
            "abstract": !0,
            template: "<div ui-view></div>",
            controller: "DesignerManageOfficeController",
            data: {
                ncyBreadcrumbParent: "organization.manage.space.locations"
            }
        }).state("organization.office.design", {
            url: "/:roomSlug/design?" + i,
            templateUrl: "/app/designer/template.html",
            controller: "DesignerController",
            reloadOnSearch: !1,
            data: {
                ncyBreadcrumbLabel: "{{room.name}}, {{office.name}}",
                ncyBreadcrumbParent: "organization.manage.space.locations"
            }
        }).state("organization.office.floorplan", {
            url: "/:roomSlug?" + i,
            templateUrl: "/app/designer/manageTemplate.html",
            controller: "DesignerManageController",
            reloadOnSearch: !1,
            data: {
                ncyBreadcrumbLabel: "{{room.name}}, {{office.name}}",
                ncyBreadcrumbParent: "organization.office"
            }
        }).state("organization.office.export", {
            url: "/:roomSlug/export?" + i,
            templateUrl: "/app/designer/export.html",
            reloadOnSearch: !1,
            controller: "DesignerManageController"
        }), t.html5Mode(!0), a.interceptors.push("popupLoginInterceptor")
    }]), o.run(["$rootScope", function(e) {
        e.officerndRoot = "app.officernd.com"
    }]), o
}), define("site/signin", ["jquery", "alert", "bootstrap"], function(e, n) {
    e(function() {
        e(".signin-form").submit(function(t) {
            t.preventDefault();
            var a = e(this);
            e.ajax({
                url: "/auth/signin",
                contentType: "application/json",
                method: "POST",
                data: JSON.stringify({
                    username: a.find(".signin-username").val(),
                    password: a.find(".signin-password").val()
                }),
                success: function(e) {
                    window.location.href = e.redirect || "/"
                },
                error: function(e) {
                    n.error("Email or password did not match", "alert-danger")
                }
            })
        }), e(".signup-form").submit(function(t) {
            var a = e(this),
                o = a.find(".signup-button"),
                i = a.find(".password").val(),
                s = a.find(".email").val(),
                r = a.find(".company").val(),
                l = a.find(".subscribe").is(":checked"),
                c = e("#signup-modal");
            t.preventDefault(), o.button("loading"), e.ajax({
                url: "/auth/signup",
                contentType: "application/json",
                method: "POST",
                data: JSON.stringify({
                    displayName: e(".full-name").val(),
                    email: s,
                    worksFor: r,
                    password: i,
                    subscribe: l
                }),
                success: function() {
                    c.modal("hide"), n.ok("Successful signup."), o.button("reset"), window.location.reload()
                },
                error: function(e) {
                    n.error(e.responseText), o.button("reset")
                }
            })
        })
    })
}), define("templates", ["angular", "app"], function(e, n) {
    n.run(["$templateCache", function(e) {
        "use strict";
        e.put("/common/billingDetailsList.html", '<div class="rnd-container">\n    <p class="no-items-section ng-scope" ng-if="team.billing.length===0">\n        There are no billing details.\n    </p>\n    <table class="table" ng-if="team.billing.length!==0">\n        <thead>\n            <th>Type</th>\n            <th>Number</th>\n            <th>Country</th>\n            <th>Status</th>\n        </thead>\n        <tbody>\n            <tr ng-repeat="billingDetail in team.billing">\n                <td>{{ billingDetail.card ? \'Credit Card\' : \'Bank Account\' }}</td>\n                <td>\n                    **** {{ ::billingDetail.card.last4 || billingDetail.bankAccount.last4 }}\n                </td>\n                <td>\n                    {{ ::billingDetail.card.country || billingDetail.bankAccount.country}}\n                </td>\n                <td ng-if="billingDetail.card">\n                    Exp. Date: {{ ::billingDetail.card.exp_month}} / {{ ::billingDetail.card.exp_year}}\n                </td>\n                <td ng-if="billingDetail.bankAccount">\n                    <span ng-if="billingDetail.bankAccount.status !== \'new\'">{{ billingDetail.bankAccount.status | capitalize }} </span>\n                    <button ng-if="billingDetail.bankAccount.status !== \'verified\'" class="btn btn-sm btn-primary" ng-click="verifyAccount(billingDetail)">\n                        Verify\n                    </button>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>'), e.put("/common/bookingsList.html", '<div ng-hide="noBookings">\n    <h4 class="rnd-title inline" title="Bookings">Bookings</h4>\n    <div class="rnd-container">\n        <search-month model="month"></search-month>\n        <table class="table bookings-table">\n            <thead>\n                <th>Meeting Room</th>\n                <th>Time</th>\n                <th>Length</th>\n            </thead>\n            <tbody>\n                <tr ng-repeat="b in bookings">\n                    <td>\n                        <resource-link resource="resource(b.resourceId)"></resource-link>\n                    </td>\n                    <td>\n                        {{ b.start.dateTime | date:\'mediumDate\' }} {{ b.start.dateTime | date: \'shortTime\' }} - {{ b.end.dateTime | date: \'shortTime\' }}\n                        <span ng-if="b.recurrence.rrule" class="fa fa-refresh offset-left" title="This is a recurring event."></span>\n                    </td>\n                    <td>{{ formatDuration(b) }}</td>\n                </tr>\n            </tbody>\n            <tfoot>\n                <td colspan="2"></td>\n                <td><strong>{{ totalHours }}</strong></td>\n            </tfoot>\n        </table>\n    </div>\n</div>'), e.put("/common/contactProfile.html", '<div class="image-table">\n    <user-picture class="profile-sm image-cell" item="contact"></user-picture>\n    <div class="info-cell">\n        <member-link ng-if="showLink" member="contact"></member-link>\n       	<span ng-if="!showLink">{{ contact.name }}</span>\n        <p class="member-email">{{ contact.email || \'no email\'}}</p>\n    </div>\n</div>'), e.put("/common/customersDropDown.html", '<div class="row">\n    <div ng-class="{ \'col-sm-6\': shouldShowSubSelect(), \'col-sm-12\': !shouldShowSubSelect() }">\n        <select class="form-control" kendo-drop-down-list k-ng-model="selectedItem" k-data-source="itemsSource" k-data-value-field="\'_id\'" k-data-text-field="\'name\'" k-value-primitive="false" k-value-template="teamsDropDownItemTemplate" k-filter="\'contains\'" k-template="teamsDropDownItemTemplate" k-rebind="selectedCustomer" k-option-label="emptySelectionObject">\n        </select>\n    </div>\n\n    <div class="col-sm-6">\n        <select class="form-control" ng-show="shouldShowSubSelect()" kendo-drop-down-list k-ng-model="selectedSubItem" k-data-source="subItemsSource" k-data-value-field="\'_id\'" k-data-text-field="\'name\'" k-value-primitive="false" k-filter="\'contains\'" k-template="\'<span><b>#: name #</b></span>\'" k-option-label="{ name: \'Not assigned...\' }">\n        </select>\n    </div>\n</div>'), e.put("/common/delete-modal.html", '<div id="confirm-delete-modal" class="modal fade" rnd-modal modal-focus="#confirm-delete" modal-hidden="hidden()">\n    <div class="modal-dialog modal-sm">\n        <form>\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Delete <span class="delete-item">{{ target }}</span>?</h3>\n                </div>\n                <div class="modal-body">\n                    <div ng-if="!preventDeleteEntities || preventDeleteEntities.length === 0">\n                        <p ng-if="attachedEntities.length > 0">Any attached\n                            <span class="attached-entity">{{ attachedEntities | entities }}</span> will be updated.</p>\n                        <p ng-if="deletedEntities.length > 0">This record along with any attached\n                            <span class="attached-entity">{{ deletedEntities | entities }}</span> will be removed.</p>\n                        <p>Are you sure you want to delete this record?</p>\n                    </div>\n                    <p><i ng-if="preventDeleteEntities.length > 0">This record cannot be deleted as it has\n                        <span class="attached-entity">{{ preventDeleteEntities | entities }}</span> attached to it. You should delete them first.</i>\n                    </p>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                    <button id="confirm-delete" type="submit" class="btn btn-danger pull-right delete-confirm" data-dismiss="modal" ng-click="confirm()" ng-disabled="preventDeleteEntities.length > 0">\n                        Delete\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>'), e.put("/common/emptyBlock.html", '<div class="empty-section">\n    <h3 ng-if="header">\n        <a class="arrow-link" ng-click="command()">{{header}}</a>\n    </h3>\n\n    <p class="text-muted">{{help}}</p>\n</div>'), e.put("/common/expandPlan.html", '<span ng-if="formatedPlan" ng-class="{\'terminated-plan\': terminated}"><color ng-if="!noColor" color="planColor"></color>{{ formatedPlan }}</span>\n<em ng-if="!formatedPlan">-</em>\n<div class="dropdown room-menu" ng-if="menu && membership">\n    <button class="btn-icon dropdown-toggle" type="button" id="editMenu" data-toggle="dropdown">\n        <i class="fa fa-cog"></i>\n    </button>\n    <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMenu">\n        <li role="presentation">\n            <a role="menuitem" tabindex="-1" ng-click="editMembership(membership)">\n                <span class="fa fa-pencil"></span> Edit\n            </a>\n        </li>\n        <li role="presentation" ng-if="!membership.endDate">\n            <a role="menuitem" tabindex="-1" ng-click="endMembership(membership)">\n                <i class="fa fa-user-times"></i> Terminate\n            </a>\n        </li>\n        <li class="divider"></li>\n        <li role="presentation">\n            <a role="menuitem" tabindex="-1" ng-click="deleteMembership(membership)">\n                <span class="fa fa-trash-o"></span> Delete\n            </a>\n        </li>\n    </ul>\n</div>'), e.put("/common/genericLink.html", '<span><member-link member="member"></member-link><span ng-if="team && member && !hideTeam">, </span><team-link ng-if="!hideTeam" team="team"></team-link></span>'), e.put("/common/imageUpload.html", '<div class="image-upload">\n    <div class="user-avatar profile-lg inline image-picker">\n        <img ng-if="imageUrl" ng-src="{{ imageUrl }}">\n        <div ng-if="!imageUrl" class="image-replace">\n            <i class="fa" ng-class="defaultIcon"></i>\n        </div>\n        <button type="button" class="btn btn-primary" ng-disabled="uploading" ng-click="chooseImage()">\n            <span ng-if="uploading"><i class="fa fa-spinner fa-spin"></i> Uploading...</span>\n            <span ng-if="!uploading && imageUrl">Change</span>\n            <span ng-if="!uploading && !imageUrl">Upload</span>\n        </button>\n    </div>\n    <input type="file" id="upload-image" class="hidden-upload" file-picked="uploadImg($file)" accept="image/*">\n</div>'), e.put("/common/loading.html", '<div class="loading-indicator center-content-horizontally">\n    <i class="fa fa-spinner fa-spin"></i>\n\n    <p>Loading {{help}} ...</p>\n</div>'), e.put("/common/locationLink.html", '<span>\n    <a ng-if="location && location.resource && !team" ui-sref="organization.office.floorplan({ office: location.office.slug, roomSlug: location.room.slug, s: \'resource-id:\' + resource })">\n        <span> {{ ::location.resource.name || \'Desk\'}}<span ng-if="showLocation">, {{ ::location.office.name }}</span></span>\n    </a>\n\n    <a ng-if="location && location.resource && team" ui-sref="organization.office.floorplan({ office: location.office.slug, roomSlug: location.room.slug, s: \'team:\' + team.name })">\n        <span> {{ ::location.room.name }}<span ng-if="showLocation">, {{ ::location.office.name }}</span></span>\n    </a>\n\n    <span ng-if="location && !location.resource">{{ location.office.name }}</span>\n    <span class="empty-location" ng-if="!location">{{ ::empty }}</span>\n</span>'), e.put("/common/memberLink.html", '<a class="dark-link" ui-sref="organization.manage.member({ id: member._id })">{{ member.name }}</a>'), e.put("/common/profile.html", '<div>\n    <div class="rnd-container member-card">\n        <div class="clearfix"></div>\n        <user-picture class="image-offset profile-lg" item="user"></user-picture>\n\n        <h3 class="member-header">{{ ::user.displayName }}</h3>\n        <hr>\n        <p class="member-info">\n            <label>Email</label>\n            <span class="member-info-value">{{ ::email }}</span>\n        </p>\n        <hr>\n        <p class="member-info">\n            <label>Joined</label>\n            <span class="member-info-value">{{ ::user.createdAt | date:\'mediumDate\' }}</span>\n        </p>\n    </div>\n</div>'), e.put("/common/prompt-modal.html", '<div id="prompt-modal" class="modal fade" rnd-modal modal-focus="#confirm-button" modal-hidden="hidden()">\n    <div class="modal-dialog modal-sm">\n        <form>\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">{{ options.title }}</h3>\n                </div>\n                <div class="modal-body">\n                    {{ options.message }}\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">{{ options.cancelButtonLabel }}</button>\n                    <button id="confirm-button" type="submit" class="btn btn-primary pull-right" data-dismiss="modal" ng-click="confirm()">{{ options.okButtonLabel }}</button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>'), e.put("/common/propertiesForm.html", '<div class="properties-form">\n    <div class="form-group" ng-repeat="property in properties">\n        <label class="col-sm-3 control-label" for="{{:: property.name }}-input">\n            <span ng-if="!isBool(property)">{{:: title(property) }}</span>\n        </label>\n\n        <div class="col-sm-9">\n            <input type="text" id="{{:: property.name }}-input" class="form-control" ng-model="values[property.name]" placeholder="{{:: title(property) }}" ng-if="isText(property)">\n            <div class="checkbox" ng-if="isBool(property)">\n                <label>\n                    <input id="{{:: property.name }}-input" type="checkbox" ng-model="values[property.name]"> {{:: title(property) }}\n                </label>\n            </div>\n            <select class="form-control" ng-if="isEnum(property)" kendo-drop-down-list k-ng-model="values[property.name]" k-data-value-field="property.valueField" k-data-source="property.values" k-data-text-field="property.textField" k-option-label="property.option" k-value-primitive="true">\n            </select>\n            <small data-toggle="collapse" ng-if="property.description" ng-bind-html="trustAsHtml(property.description)"></small>\n        </div>\n    </div>\n</div>'), e.put("/common/resourceLink.html", '<a class="dark-link" ng-if="resource.target" ui-sref="organization.office.floorplan({ office: officeSlug(resource), roomSlug: roomSlug(resource), s: \'resource-id:\' + resource._id})">\n    <i class="fa fa-map-marker"></i>\n    <strong ng-if="resource.name">{{ resource.name }}</strong>\n    <i ng-if="!resource.name">Desk</i></a>\n\n<span ng-if="!resource.target"><strong ng-if="resource.name">{{\n    resource.name }}</strong><i ng-if="!resource.name">Desk</i></span>\n\n<div class="dropdown room-menu" ng-if="menu">\n    <button class="btn-icon dropdown-toggle" type="button" id="editMenu" data-toggle="dropdown">\n        <i class="fa fa-cog"></i>\n    </button>\n    <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMenu">\n        <li role="presentation">\n            <a role="menuitem" tabindex="-1" ng-click="editResource(resource)">\n                <span class="fa fa-pencil"></span> Edit\n            </a>\n        </li>\n        <li class="divider"></li>\n        <li role="presentation">\n            <a role="menuitem" tabindex="-1" ng-click="deleteResource(resource)">\n                <span class="fa fa-trash-o"></span> Delete\n            </a>\n        </li>\n    </ul>\n</div>'), e.put("/common/searchBox.html", '<section class="search-section">\n    <label for="search-input"><i class="fa fa-search"></i></label>\n    <input id="search-input" type="search" class="form-control inline-search" ng-model="model" placeholder="Search">\n    <a ng-if="model" ng-click="clear()" class="fa fa-times-circle"></a>\n</section>'), e.put("/common/searchMonth.html", '<section class="date-section search-section">\n    <input id="invoice-start-date" class="form-control" kendo-date-picker k-ng-model="model" k-depth="\'year\'" k-start="\'year\'" k-format="\'MMM yyyy\'" k-rebind="model" k-parse-formats="[\'MMM yyyy\', \'yyyy-MM-ddTHH:mm:ss\']">\n    <a ng-show="model" ng-click="model = undefined" class="fa fa-times-circle"></a>\n</section>'), e.put("/common/shapeMoreInfo.html", '<div class="shape-more-info">\n    <p ng-bind-html="shape.info.line1"></p>\n\n    <p class="line2" ng-bind-html="shape.info.line2"></p>\n\n    <span class="workstation-name" ng-bind="shape.info.id"></span>\n</div>'), e.put("/common/social-profiles.html", '<div class="social-profiles">\n    <a ng-repeat="profile in profiles | filter: essentialFilter" class="profile-icon" ng-href="{{ profile.url }}" target="_blank" ng-if="socialIcon(profile.type)" title="{{ profile.type | capitalize }}"><i ng-class="socialIcon(profile.type)"></i></a>\n</div>'), e.put("/common/sortableHeader.html", '<span class="sortable-header" ng-click="toggleSortBy()">\n    <ng-transclude></ng-transclude>\n    <i ng-if="isSortedBy()" class="fa" ng-class="{ \'fa-sort-asc\': !sort.sortDirection, \'fa-sort-desc\': sort.sortDirection }"></i>\n</span>'), e.put("/common/teamLink.html", '<a ui-sref="organization.manage.team({ team: team._id })" class="dark-link">{{ team.name }}</a>'), e.put("/common/userPicture.html", '<div class="user-avatar">\n    <img ng-if="image" ng-src="{{image}}" on-error="removeImage()">\n\n    <div ng-if="!image" class="image-replace">\n        <i class="fa" ng-class="icon"></i>\n    </div>\n</div>'), e.put("/common/wall-team.html", '<div class="wall-item">\n    <div class="wall-company-header">\n        <user-picture class="profile-sm inline" item="team" icon="\'fa-building-o\'"></user-picture>\n\n        <h4 ng-if="team" class="wall-company-name"><a ui-sref="organization.manage.team({ team: team._id })">{{\n            team.name }}</a></h4>\n\n        <h4 class="wall-company-name" ng-if="!team">No {{ ::teamProperty.name }}</h4>\n    </div>\n\n    <div class="wall-member" ng-repeat="mem in members | memberFilter: search">\n        <a class="dark-link" ui-sref="organization.manage.member({ id: mem._id })">\n            <user-picture class="inline profile-sm" item="mem"></user-picture>\n            <div>\n                {{ mem.name | firstName }}\n            </div>\n        </a>\n    </div>\n</div>'), e.put("/app/account/profile.html", '<h4 class="rnd-title">Profile</h4>\n\n<div class="rnd-container">\n    <form role="form" class="form-horizontal">\n        <div class="form-group">\n            <label class="col-sm-3 control-label">Picture</label>\n\n            <div class="col-sm-6">\n                <user-picture class="thumbnail profile-lg inline" item="originalUser"></user-picture>\n\n                <button class="btn btn-primary inline" ng-click="chooseImage()">\n                    Upload\n                </button>\n\n                <input type="file" id="upload-profile-image" class="hidden-upload" file-picked="uploadImg(user, $file)" accept="image/*">\n                <button ng-hide="!originalUser.image" class="btn btn-danger inline" ng-click="removeImage()">Remove image\n                </button>\n            </div>\n        </div>\n\n        <div class="form-group">\n            <label for="display-name" class="col-sm-3 control-label">Name</label>\n\n            <div class="col-sm-6">\n                <input id="display-name" name="name" type="string" class="form-control" placeholder="Username" required autofocus ng-model="user.displayName">\n            </div>\n        </div>\n\n        <div class="form-group">\n            <label for="user-email" class="col-sm-3 control-label">Email</label>\n\n            <div class="col-sm-6">\n                <input type="email" name="email" class="form-control" id="user-email" placeholder="Email" ng-repeat="mail in user.emails" ng-model="mail">\n            </div>\n            <div class="col-sm-3">\n                <a ng-if="!user.confirmed" ng-click="sendConfirmation(user)">Resend\n                    confirmation mail.</a>\n            </div>\n        </div>\n\n        <div class="form-group">\n            <label for="user-company" class="col-sm-3 control-label">Company</label>\n\n            <div class="col-sm-6">\n                <input type="text" class="form-control" id="user-company" placeholder="Company" ng-model="user.worksFor">\n            </div>\n        </div>\n        <div class="form-group">\n            <div class="col-sm-offset-3 col-sm-6">\n                <button type="submit" class="btn btn-primary" ng-click="update()">Update</button>\n            </div>\n        </div>\n    </form>\n</div>\n\n<div class="panel panel-warning">\n    <div class="panel-heading">Change Password</div>\n    <div class="panel-body">\n        <form role="form" class="form-horizontal">\n            <div class="form-group">\n                <label for="new-password" class="col-sm-3 control-label">New Password</label>\n\n                <div class="col-sm-6">\n                    <input type="password" class="form-control" id="new-password" placeholder="New Password" ng-model="newPassword">\n                </div>\n            </div>\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <button class="btn btn-warning" ng-click="updateLogin()">Update</button>\n                </div>\n            </div>\n            <div class="clearfix"></div>\n        </form>\n    </div>\n</div>'), e.put("/app/account/settings.html", '<h4 class="rnd-title">Settings</h4>\n\n<div class="rnd-container">\n    <form role="form" class="form-horizontal">\n        <div class="form-group">\n            <label for="unit-type" class="col-sm-3 control-label">Units</label>\n\n            <div class="col-sm-6">\n                <select class="form-control" id="unit-type" ng-model="user.screenOptions.unitType">\n                    <option value="metrics">EU/metrics</option>\n                    <option value="imperial">US/imperial</option>\n                    <option value="uk">UK</option>\n                </select>\n            </div>\n        </div>\n\n        <div class="form-group">\n            <label for="personal-id" class="col-sm-3 control-label">Personal Id</label>\n\n            <div class="col-sm-6">\n                <input id="personal-id" class="form-control" type="text" ng-model="user.personalId">\n            </div>\n        </div>\n\n        <div class="form-group">\n            <div class="col-sm-offset-3 col-sm-6">\n                <button class="btn btn-primary" ng-click="update()">Update</button>\n            </div>\n        </div>\n    </form>\n</div>'), e.put("/app/account/spaces.html", '<div id="add-org-modal" class="modal fade">\n    <div class="modal-dialog modal-sm">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Add Space</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="inputOrg" class="col-sm-3 control-label">Name</label>\n\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" ng-model="orgName" required autofocus>\n                        </div>\n                    </div>\n\n                    <p class="text-muted">{{ ::officerndRoot }}/<b ng-bind="slug(orgName)"></b>\n                    </p>\n                    <span class="help-block" id="error-text"></span>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                    <button type="submit" class="btn btn-primary pull-right" ng-click="addOrg(orgName)" data-dismiss="modal">\n                        Add\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n\n\n<div class="dashboard-panel-head">\n    <h4 class="rnd-title">Spaces</h4>\n    <search-box ng-hide="organizations.length === 0" model="searchText.name"></search-box>\n    <button ng-hide="organizations.length === 0" type="button" class="btn pull-right btn-primary" data-toggle="modal" data-target="#add-org-modal" ng-if="user.id">\n        Add space\n    </button>\n    <div class="clearfix"></div>\n</div>\n\n<div class="row">\n    <div ng-repeat="org in organizations | filter:searchText | orderBy:\'createdAt\':true" ng-cloak class="col-md-6">\n        <div class="rnd-small-container">\n            <user-picture class="profile-lg inline pull-left" item="org" icon="\'fa-building-o\'"></user-picture>\n            <div class="fa fa-lg default-organisation-icon pull-right" ng-class="user.defaultOrganisation === org.id ? \'fa-star\' : \'fa-star-o\'" ng-click="toggleOrganisationAsDefault(org)" title="{{user.defaultOrganisation === org.id ? \'This is your default space.\': \'Set space as default.\'}}">\n            </div>\n\n            <div class="item-more-info">\n                <h2 class="rnd-container-header"><a ui-sref="organization.manage.dashboard({organization: org.slug})">{{org.name}}</a>\n                </h2>\n\n                <p>\n                    {{ org.createdAt | date:\'mediumDate\' }}\n                </p>\n            </div>\n            <div class="clearfix"></div>\n        </div>\n    </div>\n</div>\n<div class="rnd-container" ng-if="organizations.length == 0">\n    <div ng-if="user.id">\n        <h3>Add space</h3>\n\n        <p class="text-muted">Organize your coworking space. Have all your locations, members, billings,\n            bookings, space floorplans and utilization information in one place. </p>\n\n        <form class="form-horizontal" role="form">\n            <div class="form-group">\n                <label for="inputOrg" class="col-sm-3 control-label">Name</label>\n\n                <div class="col-sm-9">\n                    <input type="text" class="form-control" id="inputOrg" ng-model="orgName" required autofocus>\n                </div>\n            </div>\n            <button type="submit" class="btn btn-primary pull-right" ng-click="addOrg(orgName)">Add\n            </button>\n            <div class="clearfix"></div>\n        </form>\n    </div>\n    <div ng-if="!user.id">\n        You don\'t have access to any space\n    </div>\n</div>'),
            e.put("/app/account/template.html", '<div class="container-fluid tab-content main container-offset">\n    <div class="row">\n        <div class="col-sm-3">\n            <h4 class="rnd-title" title="Account">Account</h4>\n\n            <div class="basic-list-group">\n                <a ng-class="{active:isActive(\'account\')}" ui-sref="account.spaces">Spaces</a>\n                <a ng-class="{active:isActive(\'profile\')}" ui-sref="account.profile">Profile</a>\n                <hr>\n                <a ng-class="{active:isActive(\'settings\')}" ui-sref="account.settings">Settings</a>\n            </div>\n        </div>\n        <div class="col-md-9">\n            <div ui-view></div>\n        </div>\n    </div>\n</div>'), e.put("/app/addPlans.html", '<div>\n    <div class="form-group">\n        <label for="membership-start-date" class="col-sm-3 control-label">Start Date</label>\n        <div class="col-sm-9">\n            <div class="row">\n                <div class="col-sm-12">\n                    <input id="membership-start-date" class="form-control" kendo-date-picker k-ng-model="date.start" k-rebind="startDate" k-format="dateFormat">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="form-group">\n        <label for="member-membership-office" class="col-sm-3 control-label">Location</label>\n        <div class="col-sm-9">\n            <select id="member-membership-office" class="form-control" ng-model="office" ng-options="office._id as office.name for office in offices">\n                <option value="">Not Selected</option>\n            </select>\n        </div>\n    </div>\n    <div class="form-group" ng-repeat="membership in memberships">\n        <label class="col-sm-3 control-label">Plan</label>\n        <div class="col-sm-4">\n            <select class="form-control" ng-model="membership.plan" ng-options="plan._id as plan.label for plan in plans">\n                <option value="">Not Selected</option>\n            </select>\n        </div>\n        <div class="col-sm-4" ng-if="plansById[membership.plan].type === \'desk\'">\n            <select class="form-control" ng-model="membership.resource" ng-options="desk.id as desk.name for desk in desks | orderBy: getNormalized(\'name\')">\n                <option value="">Choose desk</option>\n            </select>\n            \n        </div>\n        <div class="col-sm-4" ng-if="plansById[membership.plan].type === \'team_room\'">\n            <select class="form-control" ng-model="membership.resource" ng-options="teamRoom.id as teamRoom.name for teamRoom in teamRooms | orderBy: getNormalized(\'name\')">\n                <option value="">Choose office</option>\n            </select>\n        </div>\n        <div class="col-sm-1 pull-right">\n            <button type="button" class="btn-icon" ng-click="removeMembership(membership)"><i class="fa fa-trash-o"></i></button>\n        </div>\n    </div>\n    <div class="form-group column-right">\n        <a class="col-sm-offset-2 col-sm-10" ng-click="addMembership()">Add plan</a>\n    </div>\n</div>'), e.put("/app/billingDetailsDialogs.html", '<div id="card-details-modal" rnd-modal modal-focus="#card-number" modal-hidden="cleanUpData()">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title inline">Card Details</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="cardholder-name" class="col-sm-3 control-label">Cardholder</label>\n                        <div class="col-sm-9">\n                            <input id="cardholder-name" class="form-control" ng-model="card.name" aria-label="cardholder name" placeholder="Cardholder name" required>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="card-number" class="col-sm-3 control-label">Credit card</label>\n                        <div class="col-sm-9">\n                            <input id="card-number" class="form-control" kendo-masked-text-box k-mask="\'0000 0000 0000 0000\'" k-prompt-char="\' \'" ng-model="card.number" aria-label="card number" placeholder="Card number" required>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="card-number" class="col-sm-3 control-label"></label>\n                        <div class="col-sm-5">\n                            <input kendo-masked-text-box class="form-control" k-mask="\'00/00\'" ng-model="card.expDate" aria-label="expiration date" placeholder="mm/yy" required>\n                        </div>\n                        <div class="col-sm-4">\n                            <input kendo-masked-text-box class="form-control" k-mask="\'0000\'" k-prompt-char="\' \'" ng-model="card.cvc" aria-label="expiration date" placeholder="CVC" required>\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">\n                        Close\n                    </button>\n                    <button type="submit" class="btn btn-primary" ng-disabled="saving" ng-click="saveDetails()">\n                        <span ng-if="!saving">Add</span>\n                        <span ng-if="saving"><i class="fa fa-spinner fa-spin"></i> Adding</span>\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n<div id="bank-account-details-modal" rnd-modal modal-focus="#card-number" modal-hidden="cleanUpData()">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title inline">Bank Account Details</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="account-owner-name" class="col-sm-3 control-label">Account owner</label>\n                        <div class="col-sm-5">\n                            <input id="account-owner-name" class="form-control" ng-model="bankAccount.name" aria-label="account owner name" placeholder="Account owner" required>\n                        </div>\n                        <div class="col-sm-4">\n                            <select id="account-type" class="form-control" kendo-drop-down-list k-ng-model="bankAccount.type" k-data-text-field="\'name\'" k-data-value-field="\'value\'" k-value-primitive="true" k-data-source="options.accountTypes">\n                            </select>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="account-country" class="col-sm-3 control-label">Country/Currency</label>\n                        <div class="col-sm-5">\n                            <select id="account-country" class="form-control" kendo-drop-down-list k-ng-model="bankAccount.country" k-data-text-field="\'name\'" k-data-value-field="\'value\'" k-value-primitive="true" k-data-source="options.countries">\n                            </select>\n                        </div>\n                        <div class="col-sm-4">\n                            <select id="account-currency" class="form-control" kendo-drop-down-list k-ng-model="bankAccount.currency" k-value-primitive="true" k-data-source="options.currencies">\n                            </select>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="account-info" class="col-sm-3 control-label">Account</label>\n                        <div class="col-sm-5">\n                            <input kendo-masked-text-box class="form-control" k-mask="\'000000000000\'" ng-model="bankAccount.accountNumber" k-prompt-char="\' \'" aria-label="account number" placeholder="Account number" required>\n                        </div>\n                        <div class="col-sm-4">\n                            <input kendo-masked-text-box class="form-control" k-mask="options.masksByCountry[bankAccount.country]" k-rebind="options.masksByCountry[bankAccount.country]" ng-model="bankAccount.routingNumber" k-prompt-char="\' \'" aria-label="routing number" placeholder="Routing number" required>\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">\n                        Close\n                    </button>\n                    <button type="submit" class="btn btn-primary" ng-disabled="saving" ng-click="saveDetails()">\n                        <span ng-if="!saving">Add</span>\n                        <span ng-if="saving"><i class="fa fa-spinner fa-spin"></i> Adding</span>\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n<div id="verify-bank-account-modal" rnd-modal modal-focus="#first-amount" modal-hidden="cleanUpData()">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title inline">Verify Bank Account</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="first-amount" class="col-sm-3 control-label">First transaction</label>\n                        <div class="col-sm-9">\n                            <input id="first-amount" type="number" class="form-control" ng-model="firstAmount" aria-label="first transaction amount" required>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="second-amount" class="col-sm-3 control-label">Second transaction</label>\n                        <div class="col-sm-9">\n                            <input id="second-amount" type="number" class="form-control" ng-model="secondAmount" aria-label="second transaction amount" required>\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">\n                        Close\n                    </button>\n                    <button type="submit" class="btn btn-primary" ng-disabled="saving" ng-click="verifyAccount()">\n                        <span ng-if="!saving">Verify</span>\n                        <span ng-if="saving"><i class="fa fa-spinner fa-spin"></i> Verifying</span>\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>'), e.put("/app/designer/designSurface.html", '<drawing-canvas id="room-with-shapes">\n    <div class="design-page">\n        <room room-data="room" room-model="roomModel" show-zones="(view.zones || tool===tools.zone) && tool !== tools.measure" zones-model="zonesModel">\n            <room-walls ng-if="view.floor && tool !== tools.measure" model="roomModel" transparent="room.background.show"></room-walls>\n            <div ng-if="(view.floor && !export) && tool !== tools.measure && view.mode===\'design\'">\n                <edge ng-repeat="edge in roomModel.edges" edge="edge"></edge>\n            </div>\n\n            <polygon-position polygon="roomPolygon" type="center-bounding-box" ng-if="view.properties && tool !== tools.measure">\n                <unit-label class="room-size-label" value="area" scale="large" target="floor" show-units="true" power="2"></unit-label>\n            </polygon-position>\n\n            <div id="floor" ng-if="view.floor && tool !== tools.measure">\n                <shapes shapes="floorShapes"></shapes>\n            </div>\n            <div id="furniture" ng-if="view.furniture && tool !== tools.measure" ng-class="{ \'show-availability\': view.availability && availabilityDataLoaded }">\n                <shapes shapes="furnitureShapes"></shapes>\n            </div>\n            <div id="ceiling" ng-if="view.floor && tool !== tools.measure"> \n                <shapes shapes="ceilingShapes"></shapes>\n            </div>\n\n            \n            \n\n            \n            \n\n            <measures lines="measures"></measures>\n\n            <zoom-panel ng-if="view.members">\n                <shape-more-info ng-repeat="shape in deskShapes" shape="shape"></shape-more-info>\n            </zoom-panel>\n            <div id="zone-labels" ng-if="(view.text || tool === tools.zone) && tool !== tools.measure">\n                <nodes-box ng-repeat="zone in zonesModel.zoneModels" nodes="zone.nodes">\n                    <div class="center">\n                        <span class="zone-label">{{zone.info.resource.name || zone.zone.label}}</span>\n                    </div>\n                </nodes-box>\n            </div>\n        </room>\n    </div>\n</drawing-canvas>'), e.put("/app/designer/edge.html", '<div class="edge" ng-mousedown="edgeMouseDown($event)">\n    <div class="fill"></div>\n</div>'), e.put("/app/designer/edgeAdorner.html", '<div class="wall-adorner">\n    <div id="border"></div>\n    <button type="button" title="Delete the edge." class="delete-button btn-icon btn-icon-danger" ng-click="deleteEdge()">\n        <span class="fa fa-times"></span>\n    </button>\n</div>'), e.put("/app/designer/export.html", '<div id="design-surface" class="preview" ng-class="{ \'side-legend-visible\': view.legend }">\n    <div id="design-page" ng-init="export=true">\n        <div id="surface-background" ng-include="\'/app/designer/floorplanSurface.html\'"></div>\n    </div>\n</div>\n\n<div ng-include="templatesPath"></div>\n\n<side-legend settings="{furniture: view.furniture, availability: view.availability, zones: view.zones }" shapes="room.shapes" zone-labels="labels" stations="stations" ng-if="view.legend">\n</side-legend>'), e.put("/app/designer/floorplanSurface.html", '<drawing-canvas id="room-with-shapes">\n    <div class="design-page">\n        <room room-data="room" room-model="roomModel" show-zones="(view.zones || tool===tools.zone) && tool !== tools.measure" zones-model="zonesModel">\n            <room-walls ng-if="view.floor && tool !== tools.measure" model="roomModel" transparent="room.background.show"></room-walls>\n\n            <div id="floor" ng-if="view.floor && tool !== tools.measure">\n                <shapes shapes="floorShapes"></shapes>\n            </div>\n            <div id="furniture" ng-if="view.furniture && tool !== tools.measure" ng-class="{ \'show-availability\': view.availability && availabilityDataLoaded }">\n                <shapes shapes="furnitureShapes"></shapes>\n            </div>\n            <div id="ceiling" ng-if="view.floor && tool !== tools.measure"> \n                <shapes shapes="ceilingShapes"></shapes>\n            </div>\n\n            <shape-location ng-repeat="shape in highlighted" shape="shape" class="highlight-adorner">\n            </shape-location>\n            <zoom-panel ng-if="view.members">\n                <shape-more-info ng-repeat="shape in deskShapes" shape="shape"></shape-more-info>\n            </zoom-panel>\n            <div id="zone-labels" ng-if="(view.text || tool === tools.zone) && tool !== tools.measure">\n                <nodes-box ng-repeat="zone in zonesModel.zoneModels" nodes="zone.nodes">\n                    <div class="center">\n                        <span class="zone-label">{{zone.zone.label}}</span>\n                    </div>\n                </nodes-box>\n            </div>\n        </room>\n    </div>\n</drawing-canvas>'), e.put("/app/designer/manageTemplate.html", '<div id="designer-container">\n    <div class="buttons-bar manage">\n        <header class="floor-tabs left-tabs" ng-if="roomsInOffice">\n            <label>Floors</label>\n            <a class="floor-tab" ng-repeat="floor in roomsInOffice | orderBy: \'floor\'" title="{{ floor.name }}" ui-sref="organization.office.floorplan({ roomSlug: floor.slug })" ng-class="{ active: roomSlug === floor.slug }">\n                {{ floor.floor }}\n            </a>\n        </header>\n\n        <header class="center-header">\n            <div class="btn-group" ng-if="owner">\n                <a type="button" title="Open designer" ng-click="openDesigner()">\n                    <span>\n                        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewbox="5 5 20 25">\n                            <path d="M5.6,6.6v18h7v-2h0c0-2.2,1.8-4,4-4v6h7v-18H5.6z M21.6,22.6h-4v-5h-1v0c-2.8,0-5,2.2-5,5h0h-4v-14h14V22.6z"></path>\n                        </svg>\n                    </span>\n                    <span class="hidden-xs">Design</span>\n                </a>\n            </div>\n            <div class="btn-group" ng-if="owner">\n                <a type="button" title="Export" ng-click="openExport()">\n                    <i class="fa fa-download"></i>\n                    <span class="hidden-xs">Export</span>\n                </a>\n            </div>\n            <div class="btn-group" id="layers-properties">\n                <a type="button" class="dropdown-toggle" data-toggle="dropdown">\n                    <i class="fa fa-bars"></i> <span class="hidden-xs">Layers</span>\n                    <span class="caret"></span>\n                </a>\n                <ul class="dropdown-menu" role="menu">\n                    <li role="presentation" ng-repeat="propDef in groupedViewProps.floorplan | filter: shouldShowProperty(view.mode)">\n                        <a ng-click="view[propDef.name] = !view[propDef.name]">\n                            <i ng-if="view[propDef.name]" class="fa fa-check"></i> {{\n                            ::propDef.title}}\n                        </a>\n                    </li>\n                    <li class="divider"></li>\n                    <li role="presentation" ng-repeat="propDef in groupedViewProps.additional | filter: shouldShowProperty(view.mode)">\n                        <a ng-click="view[propDef.name] = !view[propDef.name]">\n                            <i ng-if="view[propDef.name]" class="fa fa-check"></i> {{\n                            ::propDef.title}}\n                        </a>\n                    </li>\n                </ul>\n            </div>\n            <div class="btn-group">\n                <a type="button" class="hidden-xs" ng-click="zoomOut()"><i class="fa fa-minus-circle"></i></a>\n                <input type="range" ng-model="zoomLevel" ng-change="setZoom(zoomLevel)" class="zoom-slider" step="1" min="5" max="150">\n                <a type="button" class="hidden-xs" ng-click="zoomIn()"><span class="fa fa-plus-circle"></span></a>\n                <div class="dropdown zoom-level">\n                    <a type="button" class="dropdown-toggle" data-toggle="dropdown">\n                        {{zoomLevel | number: 0}}%<span class="caret"></span>\n                    </a>\n                    <ul class="dropdown-menu" role="menu">\n                        <li><a ng-click="setZoom(50)">50%</a></li>\n                        <li><a ng-click="setZoom(100)">100%</a></li>\n                        <li><a ng-click="setZoom(150)">150%</a></li>\n                    </ul>\n                </div>\n            </div>\n            <div class="btn-group">\n                <a type="button" ng-click="fit()" title="Zoom your plan to fit the screen.">\n                    <i class="fa fa-expand"></i> Fit\n                </a>\n            </div>\n        </header>\n    </div>\n\n    <div class="surface-container disable-select manage">\n        <div id="design-surface" ng-mousewheel="surfaceMouseWheel($event)" ng-mousedown="surfaceDown($event)">\n            <img alt="OfficeR&D logo" class="logo-background" src="//d35ll89fr5oblf.cloudfront.net/static/logos/LogoHeader.png" width="140px" height="30px">\n\n            <div id="surface-background" ng-include="\'/app/designer/designSurface.html\'" ng-mousedown="surfaceBackgroundDown($event)" ng-mousemove="surfaceBackgroundMove($event)">\n            </div>\n\n            <div class="design-page">\n                <div id="adorners" ng-if="owner">\n                    <shape-location ng-repeat="shape in selectedDesks" shape="shape">\n                        <div class="selected-item"></div>\n                    </shape-location>\n                    <zone-location ng-if="selectedZone" zone="selectedZone">\n                        <div class="selected-item"></div>\n                    \n                </zone-location></div>\n\n                <div ng-if="!owner" class="overlay"></div>\n            </div>\n        </div>\n    </div>\n\n    <aside class="property-editor manage hidden-xs">\n        <div class="manage-property-tabs">\n            <div ng-if="owner" class="property-editor-tab" title="Resources" ng-class="{active: pane==\'resources\'}" ng-click="togglePane(\'resources\')">\n                <i class="fa fa-check-square-o icon-top"></i>\n\n                <div>Desks</div>\n            </div>\n            <div class="property-editor-tab" title="Members" ng-class="{active: pane==\'teams\'}" ng-click="togglePane(\'teams\')" ng-if="teamNames.length > 0">\n                <i class="fa fa-users icon-top"></i>\n\n                <div>Members</div>\n            </div>\n            <div ng-if="owner" class="property-editor-tab" title="Shape settings" ng-class="{active: pane==\'shape-settings\'}" ng-click="togglePane(\'shape-settings\')">\n                <i class="fa fa-hand-pointer-o icon-top"></i>\n\n                <div>Selection</div>\n            </div>\n        </div>\n        <div class="properties-section">\n            <div class="availability settings-pane" ng-show="owner && pane === \'resources\'">\n                <div class="settings-section">\n                    <h4>Availability</h4>\n                    <input kendo-date-picker k-ng-model="shapeService.availabilityAt" k-format="dateFormat" k-parse-formats="[\'dd/MM/yyyy\', \'yyyy-MM-ddTHH:mm:ss\']">\n                    <resources-summary shapes="room.shapes"></resources-summary>\n                </div>\n                <hr>\n                <div class="settings-section">\n                    <h4>Targets</h4>\n\n                    <ul class="list-unstyled legend-colors">\n                        <li ng-repeat="group in groupedPlans | orderBy: \'plan.price\'">\n                            <span class="preview-label"><expand-plan plan-id="group.plan"></expand-plan></span>\n                            <span class="preview-label preview-count" ng-bind="group.count"></span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <div class="settings-pane" ng-if="pane === \'teams\'">\n                <div class="settings-section table-list">\n                    <h4>{{::teamProperty.plural}}</h4>\n                    <a href="#" ng-repeat="team in teamNames | orderBy" class="list-group-item" ng-class="{\'active\': isFilterSelected(\'team\', team)}" ng-click="selectFilter(\'team\', team)">\n                        {{ ::team }}</a>\n                </div>\n            </div>\n            <div class="settings-pane" ng-show="owner && pane === \'shape-settings\'">\n                <zone-manager-settings ng-if="selectedZone" zones-model="zonesModel" room="room"></zone-manager-settings>\n\n                <shape-manager-settings ng-if="selectedItems.length > 0 && !selectedZone && !isInRelocationMode"></shape-manager-settings>\n\n                <div class="no-selection text-muted" ng-if="selectedItems.length === 0 && !selectedZone && !selectedWall">No items selected\n                </div>\n\n                <div class="settings-section center-content-horizontally center-content-vertically" style="height: 90px" ng-if="isInRelocationMode">\n                    <span>Select a desk to relocate the member to</span>\n\n                    <div class="settings-buttons-with-text">\n                        <a class="btn btn-default btn-sm" title="Cancel relocation" ng-click="cancelRelocation()">\n                            <i class="fa fa-exchange"></i>\n                            <span>Cancel relocation</span>\n                        </a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </aside>\n</div>\n\n<div ng-include="templatesPath"></div>\n\n<export-dialog></export-dialog>'), e.put("/app/designer/rectangleSelection.html", '<div class="rectangle-selection-adorner" ng-show="visible">\n</div>'), e.put("/app/designer/resourcesSummary.html", '<div>\n    <h4>Workstations <span class="preview-label preview-count" ng-bind="workstations"></span></h4>\n    <ul class="list-unstyled legend-colors selectable">\n        <li ng-click="selectStatus(item.status)" ng-class="{ \'selected\': item.status === selectedStatus }" ng-repeat="item in workstationStatuses">\n            <color color="item.color"></color>\n            <span class="preview-label">{{ ::item.text }}</span>\n            <span class="preview-label preview-count">{{ item.count }}</span>\n        </li>\n    </ul>\n    <div class="clearfix"></div>\n    <h4>Hot desks</h4>\n    <ul class="list-unstyled legend-colors selectable" ng-if="hotdeskColor">\n        <li ng-click="selectStatus(\'hotdesk\')" ng-class="{ \'selected\': selectedStatus === \'hotdesk\' }">\n            <color color="hotdeskColor"></color>\n            <span class="preview-label">Total</span>\n            <span class="preview-label preview-count" ng-bind="hotdesks"></span>\n        </li>\n    </ul>\n    <div class="clearfix"></div>\n</div>'), e.put("/app/designer/ruler.html", '<div class="ruler">\n    <div class="horizontal container" ng-if="!vertical">\n        <div class="line border"></div>\n        <div class="bound border left-align"></div>\n        <div class="bound border right-align"></div>\n        <unit-label class="label" value="length" show-units="true"></unit-label>\n    </div>\n    <div class="vertical container" ng-if="vertical">\n        <div class="line border"></div>\n        <div class="bound border top-align"></div>\n        <div class="bound border bottom-align"></div>\n        <unit-label class="label" value="length" show-units="true"></unit-label>\n    </div>\n</div>'), e.put("/app/designer/scale.html", '<div class="scale-container">\n    <div class="scale-bound" style="left:0px"></div>\n    <div class="scale-line"></div>\n    <unit-label class="scale-label" value="length" scale="large" target="floor" show-units="true"></unit-label>\n\n    <div class="scale-bound" style="right:0px"></div>\n</div>'), e.put("/app/designer/selection.html", '<div class="selection-adorner" ng-show="selectionVisible">\n    <span ng-hide="selected.isBound" id="rotator">\n        <i class="fa fa-repeat" ng-mousedown="startRotate($event)"></i>\n    </span>\n\n    <div id="border" ng-mousedown="onSelectionMouseDown($event)" ng-mouseup="onSelectionMouseUp($event)"></div>\n</div>'), e.put("/app/designer/settings/multipleShapesSettings.html", '<div class="shape-settings settings-pane">\n    <div class="selection-header">\n        <div ng-repeat="(name, shapes) in selectedItemsGrouped">\n            {{shapes.length}} {{name}}\n        </div>\n    </div>\n    <div id="shape-settings-pane">\n        <div class="btn-group settings-buttons">\n            <a title="Duplicate item" ng-click="duplicateSelected()">\n                <span class="fa fa-files-o"></span>\n            </a>\n            <a title="Delete item" ng-click="deleteSelected()">\n                <i class="fa fa-trash-o"></i>\n            </a>\n            <a title="Mirror horizontal" ng-click="flip(-1, 0)">\n                <i class="fa fa-arrows-h"></i>\n            </a>\n            <a title="Mirror vertical" ng-click="flip(0, -1)">\n                <i class="fa fa-arrows-v"></i>\n            </a>\n        </div>\n\n        <div class="settings-section table-section">\n            \n            <div>\n                <label for="shape-rotation">Rotation</label>\n                <span class="table-cell">\n                    <div class="input-group">\n                        <input id="shape-rotation" class="form-control" type="number" ng-focus="rotateInputGotFocus()" ng-blur="rotateInputLostFocus()" ng-change="rotateInputChange()" ng-model="selectedItems[0].rotate" min="-360" max="360" step="5">\n\n                        <div class="input-group-addon">°</div>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n</div>'), e.put("/app/designer/settings/shapeDesignerSettings.html", '<div class="shape-settings settings-pane">\n    <div class="selection-header">{{selected.name}}</div>\n\n    <div id="shape-settings-pane" ng-if="selected">\n        <div class="btn-group settings-buttons">\n            <a title="Duplicate item" ng-click="duplicateSelected()">\n                <span class="fa fa-files-o"></span>\n            </a>\n            <a title="Delete item" ng-click="deleteSelected()">\n                <i class="fa fa-trash-o"></i>\n            </a>\n            <a title="Mirror horizontal" ng-click="flip(-1, 0)">\n                <i class="fa fa-arrows-h"></i>\n            </a>\n            <a title="Mirror vertical" ng-click="flip(0, -1)">\n                <i class="fa fa-arrows-v"></i>\n            </a>\n        </div>\n\n        <div class="settings-section table-section">\n            <div ng-show="isText(selected)">\n                <label for="shape-description">Text</label>\n                <span class="table-cell">\n                    <input id="shape-description" class="form-control" type="text" ng-blur="saveLastValue()" ng-model="selected.label">\n                </span>\n            </div>\n            \n            <div ng-show="selectedItems.length === 1">\n                <label for="shape-width">Width</label>\n                 <span class="table-cell">\n                    <unit-input input-id="shape-width" value="selected.width" show-units="true" blur="saveLastValue()"></unit-input>\n                 </span>\n            </div>\n            <div>\n                <label for="shape-height">Length</label>\n                <span class="table-cell">\n                    <unit-input input-id="shape-height" value="selected.height" show-units="true" blur="saveLastValue()"></unit-input>\n                </span>\n            </div>\n            <div ng-show="!selected.isBound">\n                <label for="shape-rotation">Rotation</label>\n                <span class="table-cell">\n                    <div class="input-group">\n                        <input id="shape-rotation" class="form-control" type="number" ng-blur="saveLastValue()" ng-model="selected.rotate" min="-360" max="360" step="5">\n\n                        <div class="input-group-addon">°</div>\n                    </div>\n                </span>\n            </div>\n            <div ng-show="isText(selected)">\n                <label for="shape-font-size">Font size</label>\n                <span class="table-cell">\n                    <div class="input-group">\n                        <input id="shape-font-size" class="form-control" type="number" ng-blur="saveLastValue()" ng-model="selected.fontSize" min="1" max="360" step="1">\n\n                        <div class="input-group-addon">px</div>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n</div>'),
            e.put("/app/designer/settings/shapeManagerSettings.html", '<div>\n    <div class="settings-pane" ng-if="selected">\n        <div class="settings-section">\n            <h4>{{ getDeskType(selected) === \'desk_na\' ? \'Unavailable desk\' : deskTypes[getDeskType(selected)].title\n                }}</h4>\n            <div class="settings-buttons-with-text">\n                <a class="btn btn-default btn-sm" title="Edit Desk" ng-click="editDesk(selected)">\n                    <i class="fa fa-pencil"></i>\n                    <span>Edit</span>\n                </a>\n                <a class="btn btn-default btn-sm" ng-if="selected.info.resource.type === \'desk\' && selected.info.activity.length > 0" title="History" ng-click="history(selected)">\n                    <i class="fa fa-history"></i>\n                    <span>History</span>\n                </a>\n            </div>\n            <div class="settings-card">\n                <div class="settings-row">\n                    <label>Name</label>\n                    <span>{{ selected.info.resource.name || \'None\' }}</span>\n                </div>\n                <div class="settings-row" ng-if="(selected.info.resource.targetPlan || selected.info.plan) && selected.info.resource.type !== deskNotAvailableType">\n                    <label>Price</label>\n                    <span ng-bind-html="selected.info.plan"></span>\n                </div>\n                <div class="settings-row" ng-if="selected.info.resource.type === \'desk\'">\n                    <label>Status</label>\n                    <span>{{ selected.info.status | statusText }}</span>\n                </div>\n            </div>\n        </div>\n        <div class="settings-section" ng-if="selected.info.resource.type === \'desk_tr\'">\n            <hr>\n            <div class="no-selection">\n                This is a private office desk that belongs to <b>{{ getPrivateOfficeName(selected.info.resource) }}</b>. You can assign a membership to the private office.\n            </div>\n        </div>\n        <div class="settings-section" ng-if="selected.info.resource.type === \'desk\'">\n            <hr>\n            <h4>Membership</h4>\n            <div class="settings-buttons-with-text">\n                <a class="btn btn-default btn-sm" title="Edit membership" ng-if="canEditMembership()" ng-click="editMembership()">\n                    <i class="fa fa-pencil-square-o"></i>\n                    <span>Edit</span>\n                </a>\n                <a class="btn btn-default btn-sm" title="Assign member" ng-if="canMoveIn()" ng-click="moveIn()">\n                    <i class="fa fa-user-plus"></i>\n                    <span>Assign</span>\n                </a>\n                <a class="btn btn-default btn-sm" title="Relocate member" ng-if="canMoveOut()" ng-click="relocate()">\n                    <i class="fa fa-exchange"></i>\n                    <span>Relocate</span>\n                </a>\n                <a class="btn btn-default btn-sm" title="Terminate" ng-if="canMoveOut()" ng-click="moveOut()">\n                    <i class="fa fa-user-times"></i>\n                    <span>Terminate</span>\n                </a>\n            </div>\n            <div class="member-card center-content-horizontally" ng-if="selected.info.member || selected.info.team">\n                <div ng-if="selected.info.member">\n                    <user-picture class="profile-lg image-offset" item="selected.info"></user-picture>\n                    <h3 class="member-header"><a ui-sref="organization.manage.member({ id: selected.info.member })">{{\n                        selected.info.memberName }}</a></h3>\n                    <p class="member-company"><a class="dark-link" ui-sref="organization.manage.team({ team: selected.info.teamId })">{{\n                        selected.info.team }}</a></p>\n                </div>\n                <div ng-if="selected.info.team && !selected.info.memberName">\n                    <user-picture class="profile-lg" item="selected.info"></user-picture>\n                    <h3 class="member-header"><a ui-sref="organization.manage.team({ team: selected.info.teamId })">{{\n                        selected.info.team }}</a></h3>\n                </div>\n                <p class="center-content-horizontally">\n                    <span>{{ selected.info.membership.startDate | date: \'MMM d, y\' }} - {{ (selected.info.membership.endDate ? selected.info.membership.endDate : \'Now\') | date: \'MMM d, y\' }}</span>\n                </p>\n            </div>\n        </div>\n        <div class="settings-section" ng-if="selected.info.futureActivity.length > 0 && selected.info.resource.type === \'desk\'">\n            <div class="settings-moves">\n                <label>Upcoming changes</label>\n                <div ng-repeat="activityItem in selected.info.futureActivity">\n                    <strong>\n                        <generic-link target="activityItem"></generic-link>\n                    </strong> {{ activityItem.text || activityItem.type }} on\n                    <em>{{ activityItem.date | date:\'mediumDate\' }}</em>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="settings-pane" ng-if="selectedDesks.length > 1">\n        <div class="settings-section">\n            <h4>\n                {{selectedDesks.length}} x Desks\n            </h4>\n            <div class="settings-buttons-with-text">\n                <a class="btn btn-default btn-sm" title="Edit Desk" ng-click="editDesk(selected)">\n                    <i class="fa fa-pencil"></i>\n                    <span>Edit</span>\n                </a>\n                <a class="btn btn-default btn-sm" title="Assign member" ng-if="canMoveIn()" ng-click="moveIn()">\n                    <i class="fa fa-user-plus"></i>\n                    <span>Assign</span>\n                </a>\n                <a class="btn btn-default btn-sm" title="Terminate" ng-if="canMoveOut()" ng-click="moveOut()">\n                    <i class="fa fa-user-times"></i>\n                    <span>Terminate</span>\n                </a>\n            </div>\n            <div class="member-card single-card" ng-if="team">\n                <user-picture class="profile-lg" item="team"></user-picture>\n                <h4 class="member-header"><a ui-sref="organization.manage.team({ team: team._id })">{{\n                    team.name }}</a></h4>\n            </div>\n        </div>\n    </div>\n</div>'), e.put("/app/designer/settings/wallSettings.html", '<div class="wall-settings settings-pane">\n    <div class="selection-subheader"><span>Wall</span></div>\n    <div class="btn-group settings-buttons">\n        <a title="Delete wall" ng-click="deleteWall()">\n            <i class="fa fa-trash-o"></i>\n        </a>\n    </div>\n    <div class="settings-section table-section">\n        <div>\n            <label for="wall-length">Length </label>\n             <span class="table-cell">\n                <unit-input label-id="wall-length" value="length" scale="large" target="floor" show-units="true" change="lengthChange(value)" focus="lengthGotFocus()" blur="lengthBlur()"></unit-input>\n             </span>\n        </div>\n        <div>\n            <label for="round-wall">Round </label>\n            <span class="table-cell"><input id="round-wall" type="checkbox" ng-model="wall.wall.round" ng-click="toggleRound()"></span>\n        </div>\n        <div>\n            <label for="glass-wall">Glass </label>\n            <span class="table-cell"><input id="glass-wall" type="checkbox" ng-model="wall.wall.glass" ng-click="toggleGlass()"> </span>\n        </div>\n    </div>\n</div>'), e.put("/app/designer/settings/zoneManagerSettings.html", '<div>\n    <div class="settings-pane">\n        <div class="settings-section">\n            <h4>{{ roomTypes[resource.type].title }}</h4>\n            <div class="settings-buttons-with-text">\n                <a class="btn btn-default btn-sm" title="Edit Resource" ng-click="editZone()">\n                    <i class="fa fa-pencil"></i>\n                    <span>Edit</span>\n                </a>\n                <a class="btn btn-default btn-sm" ng-if="selected.info.resource.type === \'team_room\' && selected.info.activity.length > 0" title="History" ng-click="history(selected)">\n                    <i class="fa fa-history"></i>\n                    <span>History</span>\n                </a>\n            </div>\n            <div class="settings-card">\n                <div class="settings-row">\n                    <label>Name</label>\n                    <span>{{ resource.name || \'None\' }}</span>\n                </div>\n                <div class="settings-row" ng-if="selected.info.plan">\n                    <label>Price</label>\n                    <span ng-bind-html="selected.info.plan"></span>\n                </div>\n                <div class="settings-row">\n                    <label>Status</label>\n                    <span>{{ selected.info.status.name | statusText }}</span>\n                </div>\n            </div>\n        </div>\n\n        <div class="settings-section" ng-if="resource.type === \'team_room\'">\n            <hr>\n            <h4>Membership</h4>\n            <div class="settings-buttons-with-text">\n                <a class="btn btn-default btn-sm" title="Edit membership" ng-if="canEditMembership()" ng-click="editMembership()">\n                    <i class="fa fa-pencil-square-o"></i>\n                    <span>Edit</span>\n                </a>\n                <a class="btn btn-default btn-sm" title="Assign member" ng-if="canMoveIn(resource)" ng-click="moveIn(resource)">\n                    <i class="fa fa-user-plus"></i>\n                    <span>Assign</span>\n                </a>\n                <a class="btn btn-default btn-sm" title="Terminate" ng-if="canMoveOut(resource)" ng-click="moveOut(resource)">\n                    <i class="fa fa-user-times"></i>\n                    <span>Terminate</span>\n                </a>\n            </div>\n            <div class="member-card center-content-horizontally" ng-if="selected.info.team">\n                <div>\n                    <user-picture class="profile-lg" item="selected.info.team"></user-picture>\n                    <h4 class="member-header"><a ui-sref="organization.manage.team({ team: selected.info.team._id })">{{\n                        selected.info.team.name }}</a></h4>\n                </div>\n                <p class="center-content-horizontally">\n                    <span>{{ selected.info.membership.startDate | date: \'MMM d, y\' }} - {{ (selected.info.membership.endDate ? selected.info.membership.endDate : \'Now\') | date: \'MMM d, y\' }}</span>\n                </p>\n            </div>\n            <div class="settings-section" ng-if="selected.info.futureActivity.length > 0 && selected.info.resource.type === \'team_room\'">\n                <div class="settings-moves">\n                    <label>Upcoming changes</label>\n\n                    <div ng-repeat="activityItem in selected.info.futureActivity">\n                        <strong>\n                            <generic-link target="activityItem"></generic-link>\n                        </strong>\n                        {{ activityItem.text || activityItem.type }} on\n                        <em>{{ activityItem.date | date:\'mediumDate\' }}</em>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>'), e.put("/app/designer/settings/zoneSettings.html", '<div>\n    <div class="shape-settings settings-pane">\n        <div class="selection-header">{{ zone.type }} - {{ zone.label }}</div>\n        <div class="btn-group settings-buttons">\n            <a title="Delete Zone" ng-click="deleteZone()">\n                <i class="fa fa-trash-o"></i>\n            </a>\n        </div>\n        \n    <div class="settings-section table-section">\n        <div>\n            <label for="zone-label">Text</label>\n            <span class="table-cell">\n                <input id="zone-label" class="form-control" type="text" ng-blur="saveLastValue()" ng-model="zone.label">\n            </span>\n        </div>\n        <div ng-if="labels">\n            <label for="zone-type">Type </label>\n            <span class="table-cell">\n                <select id="zone-type" class="select-editor form-control" ng-blur="saveLastValue()" ng-options="label.name as label.name for label in labels" ng-model="zone.type">\n                    <option value>None</option>\n                </select>\n            </span>\n        </div>\n    </div>\n    </div>\n</div>'), e.put("/app/designer/sideLegend.html", '<div class="side-legend properties-section">\n    <div class="availability settings-pane" ng-if="settings.availability">\n        <h4 class="bold-header">Resources</h4>\n\n        <div class="settings-section">\n            <span class="text-muted"><em>{{ availabilityAt | date:\'mediumDate\' }}</em></span>\n\n            <resources-summary shapes="shapes"></resources-summary>\n        </div>\n    </div>\n    <div class="availability settings-pane" ng-if="settings.zones && zoneLabels.length > 0">\n        <h4 class="bold-header">Zones</h4>\n\n        <div class="settings-section">\n            <ul class="list-unstyled legend-colors">\n                <li ng-repeat="item in zoneLabels">\n                    <color color="item.color"></color>\n                    <span class="preview-label">{{ ::item.name }}</span>\n                </li>\n            </ul>\n            <div class="clearfix"></div>\n        </div>\n    </div>\n    <div class="furniture settings-pane" ng-if="settings.furniture && furniture.length > 0">\n        <h4 class="bold-header">Furniture</h4>\n\n        <div class="settings-section">\n            <ul class="list-unstyled shape-preview-list">\n                <li ng-repeat="item in furniture">\n                <span class="preview-box">\n                    <shape-preview width="30" height="20" data="item"></shape-preview>\n                </span>\n                    <span class="preview-label">{{ ::item.name }}</span>\n\n                    <div class="clearfix"></div>\n                </li>\n            </ul>\n            <div class="clearfix"></div>\n        </div>\n    </div>\n</div>'), e.put("/app/designer/template.html", '<div id="gallery-settings-modal" class="modal fade" role="dialog" tabindex="-1">\n    <div class="modal-dialog modal-md">\n        <form role="form" class="form-horizontal">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Edit Gallery</h3>\n                </div>\n                <div class="modal-body">\n                    <ul class="list-group">\n                        <li ng-if="galleryRedefinitions.length === 0" class="list-group-item">\n                            <a class="inline-edit-button" ng-click="prepareAddRedefinition()">\n                                <span class="fa fa-pencil"></span>\n                            </a>\n                            {{defaultRedefinition.title}} -\n                            <unit-label value="defaultRedefinition.width"></unit-label>\n                            <span>x</span>\n                            <unit-label value="defaultRedefinition.height" show-units="true"></unit-label>\n                        </li>\n                        <li ng-repeat="redefinition in galleryRedefinitions" class="list-group-item">\n                            <a class="inline-edit-button" ng-click="prepareEditRedefinition($index)">\n                                <span class="fa fa-pencil"></span>\n                            </a>\n                            {{redefinition.title}} -\n                            <unit-label value="redefinition.width"></unit-label>\n                            <span>x</span>\n                            <unit-label value="redefinition.height" show-units="true"></unit-label>\n\n                            <a class="pull-right" ng-click="deleteRedefinition($index)">\n                                <span class="fa fa-times"></span>\n                            </a>\n                        </li>\n                    </ul>\n\n                    <div ng-if="!editedRedefinition" class="form-inline row">\n                        <button type="button" class="btn btn-primary pull-right" ng-click="prepareAddRedefinition()">Add Desk Kind\n                        </button>\n                    </div>\n\n                    <div ng-if="editedRedefinition" class="form-inline row" ng-keydown="redefinitionsFormKeyDown($event)">\n                        <form role="form" class="form-horizontal">\n                            <input type="text" class="col-xs-5 form-control" id="redefinition-title" placeholder="Small Desk" ng-model="editedRedefinition.title" autofocus>\n\n                            <div class="form-group col-xs-3">\n                                <unit-input label-id="shape-width" value="editedRedefinition.width" scale="medium" show-units="true"></unit-input>\n                            </div>\n                            <div class="form-group col-xs-3">\n                                <unit-input label-id="shape-height" value="editedRedefinition.height" scale="medium" show-units="true"></unit-input>\n                            </div>\n\n                            <a class="inline-edit-button pull-right" ng-click="cancelEditRedefinition()">\n                                <i class="fa fa-times"></i>\n                            </a>\n\n                            <a class="inline-edit-button pull-right" ng-click="submitEditedRedefinition()">\n                                <i class="fa fa-check"></i>\n                            </a>\n\n                            <button type="submit" class="hidden" ng-click="submitEditedRedefinition()"></button>\n                        </form>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                    <button type="button" class="btn btn-primary" ng-click="commitRedefinitions()" data-dismiss="modal">\n                        Done\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n\n<div id="help-modal" class="modal" role="dialog" tabindex="-1">\n    <div class="modal-dialog modal-lg">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                <h3 class="modal-title">Help</h3>\n            </div>\n            <div class="modal-body">\n                <div class="row">\n                    <div class="col-xs-6">\n                        <contextual-help contents-selector="#general-designer-design-surface"></contextual-help>\n                        <contextual-help contents-selector="#general-designer-toolbox"></contextual-help>\n                        <contextual-help contents-selector="#general-designer-tools"></contextual-help>\n                    </div>\n                    <div class="col-xs-6">\n                        <contextual-help contents-selector="#layers-designer-properties"></contextual-help>\n                        <contextual-help contents-selector="#general-designer-properties"></contextual-help>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div id="designer-container" shortcuts>\n    <div class="container-fluid buttons-bar">\n        <header class="center-header">\n            <div class="dropdown btn-group" title="{{ uploadingBackground ? \'Importing...\' : \'Import\' }} existing plan" style="display: inline-block">\n                <a type="button" class="dropdown-toggle" data-toggle="dropdown" ng-disabled="uploadingBackground" title="Import floorplan settings">\n                    <i class="fa fa-upload"></i>\n                    <span class="caret"></span>\n                </a>\n                <ul class="dropdown-menu" role="menu">\n                    <li role="presentation"><a ng-click="chooseImage()"> Upload</a></li>\n                    <li role="presentation"><a ng-if="room.background.uri" ng-click="room.background = { show: false, uri: null, measured: false }; autoSaveRoom()">\n                        Remove</a></li>\n                    <li role="presentation"><a ng-disabled="!room.background.uri" ng-click="measureImage()">\n                        <i ng-if="room.background.measured" class="fa fa-check"></i> Rescale background</a></li>\n                    <li role="presentation"><a ng-disabled="!room.background.uri" ng-click="moveImage()">Move\n                        background</a></li>\n                </ul>\n            </div>\n            <div class="btn-group">\n                <a type="button" title="Export" ng-click="openExport()">\n                    <i class="fa fa-download"></i>\n                </a>\n            </div>\n            <div class="btn-group" id="layers-properties">\n                <a type="button" class="dropdown-toggle" data-toggle="dropdown">\n                    <span class="fa fa-bars"></span> <span class="hidden-xs">Layers</span>\n                    <span class="caret"></span>\n                </a>\n                <ul class="dropdown-menu" role="menu">\n                    <li role="presentation" ng-repeat="propDef in groupedViewProps.floorplan | filter: shouldShowProperty(view.mode)">\n                        <a ng-click="view[propDef.name] = !view[propDef.name]">\n                            <i ng-if="view[propDef.name]" class="fa fa-check"></i> {{\n                            ::propDef.title}}\n                        </a>\n                    </li>\n                    <li class="divider"></li>\n                    <li role="presentation" ng-repeat="propDef in groupedViewProps.additional | filter: shouldShowProperty(view.mode)">\n                        <a ng-click="view[propDef.name] = !view[propDef.name]">\n                            <i ng-if="view[propDef.name]" class="fa fa-check"></i> {{\n                            ::propDef.title}}\n                        </a>\n                    </li>\n                </ul>\n            </div>\n            <div class="btn-group hidden-xs">\n                <a type="button" ng-disabled="!canUndo" ng-click="undo()" title="Undo"><i class="fa fa-reply fa-lg" title="Redo"></i></a>\n                <a type="button" ng-disabled="!canRedo" ng-click="redo()"><i class="fa fa-lg fa-share"></i></a>\n            </div>\n\n            <div id="tools-list" class="btn-group">\n                <a type="button" ng-repeat="t in toolsList | filter: { hide: \'!true\' }" ng-class="{ active: tool === t }" title="{{ ::t.title }}" class="hidden-xs" ng-click="setTool(t)">\n                    <span class="{{ ::t.icon }}"></span>\n                </a>\n            </div>\n            <div class="btn-group">\n                <a type="button" class="hidden-xs" ng-click="zoomOut()"><span class="fa fa-minus-circle"></span></a>\n                <input type="range" ng-model="zoomLevel" ng-change="setZoom(zoomLevel)" class="zoom-slider" step="1" min="5" max="150">\n                <a type="button" class="hidden-xs" ng-click="zoomIn()"><i class="fa fa-plus-circle"></i></a>\n                <a type="button" ng-click="fit()" title="Zoom your plan to fit the screen.">\n                    <i class="fa fa-expand"></i>\n                </a>\n                <a type="button" ng-click="rotate()" class="hidden-xs" title="Rotate your plan on 90 degrees.">\n                    <i class="fa fa-undo"></i>\n                </a>\n\n                <div class="dropdown" style="display: inline-block">\n                    <a type="button" class="dropdown-toggle" data-toggle="dropdown">\n                        {{zoomLevel | number: 0}}%<span class="caret"></span>\n                    </a>\n                    <ul class="dropdown-menu" role="menu">\n                        <li><a ng-click="setZoom(50)">50%</a></li>\n                        <li><a ng-click="setZoom(100)">100%</a></li>\n                        <li><a ng-click="setZoom(150)">150%</a></li>\n                    </ul>\n                </div>\n            </div>\n            <div class="btn-group hidden-xs">\n                <a type="button" data-toggle="modal" data-target="#help-modal"> <i class="fa fa-question-circle"></i></a>\n            </div>\n            <div class="btn-group">\n                <a type="button" title="Finish Design" ng-click="openManager()">\n                     <span>\n                        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewbox="5 5 20 25">\n                            <path d="M5.6,6.6v18h7v-2h0c0-2.2,1.8-4,4-4v6h7v-18H5.6z M21.6,22.6h-4v-5h-1v0c-2.8,0-5,2.2-5,5h0h-4v-14h14V22.6z"></path>\n                        </svg>\n                    </span>\n                    <span class="hidden-xs">Finish Design</span>\n                </a>\n\n            </div>\n        </header>\n    </div>\n\n    <div class="surface-container disable-select design">\n        <aside ng-if="tool!==tools.measure">\n            <div id="shapes-toolbox" class="toolbox hidden-xs">\n                <div class="search-container">\n                    <input type="search" class="form-control" ng-model="filterShapes" id="search-shapes" placeholder="Search furniture">\n                <span ng-repeat="ctg in majorCategories" class="shapes-panel-tab" ng-class="{active: category==ctg}" ng-click="$parent.category=ctg">{{ ::ctg }}</span>\n                    <a type="button" class="d-button" title="Gallery settings" ng-disabled="!org" data-toggle="modal" data-target="#gallery-settings-modal" ng-click="initRedefinitions()">\n                        <span class="fa fa-cog"></span>\n                    </a>\n                </div>\n                <div class="shapes-panel" ng-cloak>\n                    <div ng-repeat="category in categories | filter: { name: category }">\n                        <div ng-repeat="gallery in category.categories">\n                            <h4 class="gallery-heading for-shapes" ng-click="collapsed=!collapsed;">\n                                <i ng-hide="collapsed" class="fa fa-chevron-up"></i>\n                                <i ng-if="collapsed" class="fa fa-chevron-down"></i>\n                                {{ ::gallery.name }}\n                            </h4>\n\n                            <ul class="shapes-panel-category shapes-group" ng-hide="collapsed">\n                                <li ng-repeat="shape in gallery.shapes | filter:filterShapes" office-draggable drag-started="startDrag" drag-move="dragMove" drag-end="endDrag" drag-data="shape" data-template="{{ ::shape.template }}" title="{{ ::(shape.title||shape.name) }}">\n                                    <span class="shapes-toolbox {{ ::shape.name | nospace}}"></span>\n                                    <span class="shape-name">{{ ::(shape.title||shape.name) }}</span>\n                            <span class="shape-size"><unit-label value="shape.width"></unit-label><span>x</span><unit-label value="shape.height" show-units="true"></unit-label></span>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </aside>\n\n        <div id="design-surface" ng-class="{\'no-pane\': tool === tools.measure || !pane, \'no-toolbox\': tool === tools.measure}" ng-mousewheel="surfaceMouseWheel($event)" ng-mousedown="surfaceDown($event)">\n            <img alt="OfficeR&D logo" class="logo-background" src="//d35ll89fr5oblf.cloudfront.net/static/logos/LogoHeader.png" width="140px" height="30px">\n\n            <input id="backgroundUpload" type="file" file-picked="backgroundFilePicked($file)" accept="image/*" class="hidden-upload">\n\n            <div class="design-page">\n                <img class="transparent" ng-if="view.background || tool === tools.measure" width="{{ backgroundSize.width }}" height="{{ backgroundSize.height }}" ng-src="{{ room.background.uri }}" style="position: absolute; transform: translate({{ adjustBackgroundMoving.offsetPx.x }}px, {{ adjustBackgroundMoving.offsetPx.y }}px); left: {{ backgroundLocation.x }}px; top: {{ backgroundLocation.y }}px">\n                \n            </div>\n\n            <div id="surface-background" ng-include="\'/app/designer/designSurface.html\'" ng-mousedown="surfaceBackgroundDown($event)" ng-mousemove="surfaceBackgroundMove($event)">\n            </div>\n\n            <div class="design-page">\n                <div id="measure">\n                    <div id="measure-labels">\n                        <wall-label ng-repeat="line in measures" wall="line"></wall-label>\n                    </div>\n                </div>\n                <div id="adorners" ng-if="tool !== tools.measure">\n                    <shape-location shape="designerGlobal.selectionLocation">\n                        <selection></selection>\n                    </shape-location>\n                    <edgeadorner room="roomModel"></edgeadorner>\n                    <wall-adorner room="roomModel"></wall-adorner>\n                    <wall-handle ng-if="selectedWall && selectedWall.wall.round" wall="selectedWall"></wall-handle>\n                    <div id="zone-handles" ng-if="selectedZone">\n                        <zone-handle ng-repeat="node in selectedZone.nodes" node="node" room-model="roomModel" zone-model="selectedZone"></zone-handle>\n                    </div>\n                    <rectangle-selection shapes="room.shapes" translate="getPointOnPage"></rectangle-selection>\n                </div>\n            </div>\n\n            <div class="bottom-notification" ng-if="tool === tools.adjustBackground && adjustBackgroundMove">\n                <button type="button" class="btn btn-default" ng-click="setTool(tools.select)">\n                    <i class="fa fa-times"></i> Reset\n                </button>\n                <button type="submit" class="btn btn-primary" ng-click="saveBackgroundOffset()">\n                    <i class="fa fa-check"></i> Save\n                </button>\n            </div>\n\n            <div class="bottom-notification" ng-show="tool === tools.measure">\n                <form id="measure-length" class="form-inline" ng-submit="measureLengthSubmit()">\n                    <div ng-show="initialMeasureLength" class="form-group">\n                        <label class="col-xs-3 control-label" for="measure-length-input">Length: </label>\n                        <unit-input class="col-xs-6" label-id="measure-length-input" value="measureLength" scale="large" target="floor" show-units="true"></unit-input>\n                        <button type="submit" class="col-xs-2 btn btn-success pull-right">\n                            <i class="fa fa-check"></i>\n                        </button>\n                    </div>\n                    <div ng-if="!initialMeasureLength" class="form-group">\n                        <span ng-if="!measureFirstPoint">\n                            Choose a starting point for the measure\n                        </span>\n                        <span ng-if="measureFirstPoint">\n                            Choose an end point for the measure\n                        </span>\n                    </div>\n                </form>\n            </div>\n        </div>\n\n        <aside ng-if="tool !== tools.measure" id="designer-property-editor" class="property-editor hidden-xs" ng-class="{\'no-pane\': !pane}">\n            <div class="property-editor-tabs">\n                <div class="property-editor-tab" title="Office inventory" ng-class="{active: pane==\'furniture\'}" ng-click="togglePane(\'furniture\')">\n                    <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg">\n                        <g>\n                            <rect x="9.6" y="7" width="10" height="16"></rect>\n                            <circle cx="23.7" cy="11.4" r="2"></circle>\n                            <circle cx="23.7" cy="19" r="2"></circle>\n                            <circle cx="5.6" cy="11.2" r="2"></circle>\n                            <circle cx="5.6" cy="11.2" r="2"></circle>\n                            <circle cx="5.6" cy="18.8" r="2"></circle>\n                        </g>\n                    </svg>\n                </div>\n                <div class="property-editor-tab" title="Zones" ng-class="{active: pane==\'zones\'}" ng-click="togglePane(\'zones\')">\n                    <span class="fa fa-square-o"></span>\n                </div>\n                <div class="property-editor-tab" title="Shape settings" ng-class="{active: pane==\'shape-settings\'}" ng-click="togglePane(\'shape-settings\')">\n                    <span class="fa fa-hand-pointer-o"></span>\n                </div>\n            </div>\n            <div class="properties-section">\n                <div class="settings-pane" ng-if="pane === \'furniture\'">\n                    <h4 class="bold-header">Office Furniture</h4>\n\n                    <div class="settings-section table-list furniture-list">\n                        <div ng-repeat="item in furniture | orderBy: \'name\'" class="furniture-group">\n                            <div class="workstation-item furniture-item">\n                                {{ ::item.name }}\n                                <span class="furniture-count" ng-bind="item.count"></span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="settings-pane" ng-if="pane === \'zones\'">\n                    <h4 class="bold-header">Zones</h4>\n\n                    <ul class="settings-section legend-colors list-unstyled">\n                        <li ng-repeat="zone in zonesModel.zoneModels | orderBy:\'zone.label\'" class="preview-item" ng-click="selectZone(zone)" ng-class="{\'active\': selectedZone == zone}">\n                            <color color="zoneColor(zone.zone)"></color>\n                            <span class="preview-label" ng-bind="zone.zone.label"></span>\n                            <unit-label class="preview-label preview-count" value="zone.area" scale="largeRound" target="floor" show-units="true" power="2"></unit-label>\n                            <div class="clearfix"></div>\n                        </li>\n                    </ul>\n                </div>\n                <div class="settings-pane" ng-show="pane === \'shape-settings\'">\n                    <h4 class="bold-header">Selection</h4>\n\n                    <shape-designer-settings ng-if="selectedItems.length === 1"></shape-designer-settings>\n                    <multiple-shapes-settings ng-if="selectedItems.length > 1"></multiple-shapes-settings>\n                    <wall-settings ng-show="selectedWall"></wall-settings>\n                    <zone-settings ng-if="selectedZone" zones-model="zonesModel" room="room"></zone-settings>\n                    <span class="no-selection text-muted" ng-if="selectedItems.length === 0 && !selectedZone && !selectedWall">No items selected</span>\n                </div>\n            </div>\n        </aside>\n\n        <div id="drag-adorner" style="position: absolute">\n            <shapes shapes="draggedShapes"></shapes>\n        </div>\n    </div>\n</div>\n\n<div ng-include="templatesPath"></div>\n\n<div id="tour-step-texts" class="hidden">\n    <div id="general-designer-welcome">\n        <div class="tour-info">\n            <h3>OfficeR&D Designer</h3>\n\n            <p>This tour will guide you through the basics of our floorplanning and design tool.</p>\n        </div>\n    </div>\n    <div id="layers-designer-properties" class="tour-info">\n        <div class="tour-info">\n            <h3>Layers</h3>\n\n            <p>Every floorplan consists of different layers that represent important information about your office:</p>\n            <ul>\n                <li><span class="high-word">Floor</span> - the base of the plan including walls, doors, windows, etc.\n                </li>\n                <li><span class="high-word">Zones</span> - the important parts of your office like kitchen, meeting\n                    spaces and team zones.\n                </li>\n                <li><span class="high-word">Furniture</span> - all your desks, chairs, tables, etc.</li>\n                <li><span class="high-word">Members</span> - the link between your physical space and the members of the\n                    office.\n                </li>\n                <li><span class="high-word">Availability</span> - visual representation of your hot desks, free desks,\n                    availabel\n                    rooms.\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div id="general-designer-tools" class="tour-info">\n        <div class="tour-info">\n            <h3>Tools</h3>\n\n            <p>Use the different tools to edit the layers of the floorplan:</p>\n            <ul>\n                <li><span class="high-word">Selection tool</span> - use it to select and manipulate objects on\n                    the plan. Pan with shift+drag, zoom with mouse wheel.\n                </li>\n                <li><span class="high-word">Pan tool</span> - use it to pan and zoom the floorplan.</li>\n                <li><span class="high-word">Wall tool</span> - use it to create new walls. <b>Ctrl+click</b> creates new\n                    point\n                    or connect the current point with new one.\n                </li>\n                <li><span class="high-word">Zone tool</span> - use it to select, edit and create new zones. <b>Enter</b>\n                    confirms the zone. <b>Esc</b> cancel it.\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div id="general-designer-toolbox">\n        <div class="tour-info">\n            <h3>Gallery</h3>\n\n            <p>You can easily drag&drop furniture, building elements and basic shapes to your floorplan from the\n                gallery.</p>\n        </div>\n    </div>\n    <div id="general-designer-properties">\n        <div class="tour-info">\n            <h3>Properties</h3>\n\n            <p>Use the properties and information tabs to manage and see an overview of your floorplan.</p>\n            <ul>\n                <li><span class="high-word">Furniture</span> - provides you with overview of all the furniture and\n                    workstations availabel in your office.\n                </li>\n                <li><span class="high-word">Floorplan properties</span> - manage different aspects of your floorplan.\n                </li>\n                <li><span class="high-word">Zones</span> - lists all the availabel zones on your floorplan with their\n                    area and sizes.\n                </li>\n                <li><span class="high-word">Selection</span> - shows the currently selected item on the floorplan.\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div id="general-designer-design-surface">\n        <div class="tour-info">\n            <h3>Surface</h3>\n\n            <p>OfficeR&D Surface is your main design area. Use it to select and modify the details of your plan.</p>\n        </div>\n    </div>\n</div>\n\n<export-dialog></export-dialog>'),
            e.put("/app/designer/unitInput.html", '<div class="input-group">\n    <input class="form-control" id="{{inputId}}" type="number" ng-model="formattedValue" min="0" step="any" ng-focus="focus()" ng-blur="blur()">\n\n    <div class="input-group-addon" ng-if="showUnits">{{currentScale.label}}<sup ng-if="power && power>1">2</sup></div>\n</div>'), e.put("/app/designer/unitLabel.html", '<span class="unit-label">{{formattedValue}}<span ng-if="showUnits"> {{currentScale.label}}<sup ng-if="power && power>1">2</sup></span></span>'), e.put("/app/designer/wallAdorner.html", '<div class="wall-adorner">\n    <div id="border"></div>\n</div>'), e.put("/app/designer/wallLabel.html", '<div class="wall-label"><unit-label value="length" scale="large" target="floor" show-units="true"></unit-label></div>'), e.put("/app/editPlan.html", '<div>\n    <div class="form-group" ng-if="settings.billing.enabled">\n        <label for="member-membership-plan" class="col-sm-3 control-label">Plan</label>\n\n        <div class="col-sm-9">\n            <select id="member-membership-plan" class="form-control" ng-model="membership.plan" ng-options="plan._id as plan.label for plan in plans" ng-change="updateDesks()">\n                    <option value="">Not Selected</option>\n            </select>\n        </div>\n    </div>\n\n    <div class="form-group" ng-if="offices.length > 1">\n        <label for="member-membership-office" class="col-sm-3 control-label">Location</label>\n\n        <div class="col-sm-9">\n            <select id="member-membership-office" class="form-control" ng-model="membership.office" ng-options="office._id as office.name for office in offices" ng-change="updateDesks()">\n                    <option value="">Not Selected</option>\n            </select>\n        </div>\n    </div>\n\n    <div class="form-group" ng-if="isDeskSelectable() && desks">\n        <label class="col-xs-3 control-label" for="destination-desk">Desk</label>\n\n        <div class="col-xs-9">\n            <select id="destination-desk" class="form-control" ng-model="membership.resource" ng-options="desk.id as desk.name for desk in desks | orderBy: getNormalized(\'name\')">\n                    <option value="">Not Selected</option>\n            </select>\n\n            <span class="text-danger" ng-if="!isMembershipValid">This desk is available from {{ firstPossibleDate | date: \'MMM d, y\' }}.</span>\n        </div>\n    </div>\n\n    <div class="form-group">\n        <label for="membership-start-date" class="col-sm-3 control-label">Start Date</label>\n\n        <div class="col-sm-9">\n            <div class="row">\n                <div class="col-sm-5">\n                    <input id="membership-start-date" class="form-control" kendo-date-picker k-ng-model="membership.startDate" k-rebind="membership" k-on-change="updateDesks()" k-format="dateFormat" k-min="firstPossibleDate" k-max="membership.endDate || lastPossibleDate">\n                </div>\n                <div class="col-sm-3">\n                    <div class="checkbox">\n                        <label>\n                            <input type="checkbox" ng-checked="membership.endDate" ng-disabled="!isMembershipActive" ng-click="toggleEnableEndDate()">\n                            End Date\n                        </label>\n                    </div>\n                </div>\n                <div class="col-sm-4">\n                    <input class="form-control" kendo-date-picker k-ng-model="membership.endDate" k-format="dateFormat" k-min="membership.startDate" k-max="lastPossibleDate" k-rebind="membership && membership.startDate" ng-disabled="!membership.endDate">\n                </div>\n            </div>\n        </div>\n    </div>\n</div>'), e.put("/app/eventDialogs.html", '<div id="edit-event-modal" rnd-modal allow-popups modal-focus="#event-title" modal-hidden="hidden()" role="dialog" tabindex="-1">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal" ng-click="cancelEvent()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">{{ allowEdit ? (isNew ? \'New\' : \'Edit\') : \'View\' }} Booking</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group" ng-show="allowEdit">\n                        <label class="col-sm-3 control-label">Summary</label>\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" placeholder="Summary" ng-model="calendarEvent.summary">\n                        </div>\n                    </div>\n                    <div class="form-group" ng-show="!allowEdit && calendarEvent.summary">\n                        <label class="col-sm-3 control-label">Summary</label>\n                        <div class="col-sm-9 readonly-value-container">\n                            <span class="readonly-value">{{ calendarEvent.summary }}</span>\n                        </div>\n                    </div>\n                    <div class="form-group" ng-show="allowEdit">\n                        <label class="col-sm-3 control-label">Member</label>\n                        <div class="col-sm-9">\n                            <customers-drop-down selected-customer="selectedCustomer" include-individuals="true" show-sub-items="true"></customers-drop-down>\n                        </div>\n                    </div>\n                    <div class="form-group" ng-show="!allowEdit && originalEvent.targetName">\n                        <label class="col-sm-3 control-label">Member</label>\n                        <div class="col-sm-9 readonly-value-container">\n                            <span class="readonly-value">{{ originalEvent.targetName }}</span>\n                        </div>\n                    </div>\n                    <div class="form-group" ng-if="isGoogleEvent">\n                        <label class="col-sm-3 control-label">Source</label>\n                        <div class="col-sm-9 readonly-value-container">\n                            <span class="readonly-value">Google</span>\n                        </div>\n                    </div>\n                    <div class="form-group" ng-if="allowEdit" ng-class="{\'has-error\': !roomAvailable && allowEdit}">\n                        <label class="col-sm-3 control-label">Meeting room</label>\n                        <div class="col-sm-9">\n                            <select class="form-control" kendo-drop-down-list k-rebind="allowEdit" k-enable="allowEdit" k-ng-model="calendarEvent.resourceId" k-data-value-field="\'value\'" k-data-source="meetingRooms" k-data-text-field="\'text\'" k-value-primitive="true" k-data-value-field="\'value\'" k-value-template="meetingRoomsDropDownItemTemplate" k-template="meetingRoomsDropDownItemTemplate">\n                            </select>\n                            <small class="text-danger" ng-show="!roomAvailable && allowEdit">\n                                This room is not available for the selected time frame.\n                            </small>\n                        </div>\n                    </div>\n                    <div class="form-group" ng-if="!allowEdit">\n                        <label class="col-sm-3 control-label">Meeting room</label>\n                        <div class="col-sm-9 readonly-value-container readonly-value">\n                            <div class="color-box" style="background-color: {{ idToMeetingRoom[calendarEvent.resourceId].color }}"></div> {{ idToMeetingRoom[calendarEvent.resourceId].text }}\n                        </div>\n                    </div>\n                    <div class="form-group" ng-if="allowEdit">\n                        <label class="col-sm-3 control-label">From</label>\n                        <div class="col-sm-5">\n                            <input class="form-control" kendo-date-time-picker k-ng-model="calendarEvent.start" k-format="dateTimeFormat(\'kendo\')">\n                        </div>\n                        <div class="col-sm-1 control-label">to</div>\n                        <div class="col-sm-3">\n                            <input class="form-control" kendo-time-picker k-ng-model="calendarEvent.end" k-rebind="calendarEvent.start" k-dates="getDates(calendarEvent.start)">\n                        </div>\n                        <div class="col-sm-9 col-sm-offset-3">\n                            <small>{{ eventDurationHumanized }}</small>\n                        </div>\n                    </div>\n                    <div class="form-group" ng-if="!allowEdit">\n                        <label class="col-sm-3 control-label">Start</label>\n                        <div class="col-sm-9 readonly-value-container">\n                            <span class="readonly-value">{{ calendarEvent.start | date : dateTimeFormat(\'angular\')}}</span>\n                        </div>\n                    </div>\n                    <div class="form-group" ng-if="allowEdit && canCreateRecurrence">\n                        <label class="col-sm-3 control-label">Repeat</label>\n                        <div class="col-sm-9">\n                            <select class="form-control" kendo-drop-down-list k-data-source="recurrenceIntervals" k-ng-model="calendarEvent.rRule.freq" k-data-text-field="\'name\'" k-data-value-field="\'value\'">\n                            </select>\n                        </div>\n                    </div>\n                    <div class="form-group" ng-if="!allowEdit">\n                        <label class="col-sm-3 control-label">Duration</label>\n                        <div class="col-sm-9 readonly-value readonly-value-container">\n                            <span>{{ eventDurationHumanized }}</span>\n                        </div>\n                    </div>\n                    \n                    <div ng-if="allowEdit">\n                        <div class="form-group" ng-if="calendarEvent.rRule.freq.value">\n                            <label class="col-sm-3 control-label">Repeat every:</label>\n                            <div class="col-sm-7">\n                                <input type="number" class="form-control" ng-model="calendarEvent.rRule.interval" step="1" min="1" max="365">\n                            </div>\n                            <div class="col-sm-2 readonly-value-container">\n                                <span class="">{{ calendarEvent.rRule.freq.unit }}(s)</span>\n                            </div>\n                        </div>\n                        <div class="form-group" ng-if="calendarEvent.rRule.freq.value===\'weekly\'">\n                            <label class="col-sm-3 control-label">Repeat on:</label>\n                            <div class="col-sm-9">\n                                <div class="checkbox col-sm-2 col-no-left" ng-repeat="entry in weekDayEntries">\n                                    <label>\n                                        <input type="checkbox" ng-checked="calendarEvent.rRule.weekDays[$index]" ng-click="calendarEvent.rRule.weekDays[$index] = !calendarEvent.rRule.weekDays[$index]"> {{ entry }}\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="form-group" ng-if="calendarEvent.rRule.freq.value">\n                            <label class="col-sm-3 control-label">End:</label>\n                            <div class="col-sm-9 readonly-value-container">\n                                <div class="role-radios form-group">\n                                    <div class="col-sm-3">\n                                        <input type="radio" id="role-never" ng-model="calendarEvent.rRule.end">\n                                        <label for="role-never">\n                                            Never\n                                        </label>\n                                    </div>\n                                </div>\n                                <div class="role-radios form-group">\n                                    <div class="col-sm-3 readonly-value-container">\n                                        <input type="radio" id="role-after" ng-model="calendarEvent.rRule.end" value="after">\n                                        <label for="role-after">\n                                            After\n                                        </label>\n                                    </div>\n                                    <div class="col-sm-9">\n                                        <input class="form-control" type="number" ng-disabled="calendarEvent.rRule.end!==\'after\'" ng-model="calendarEvent.rRule.count" step="1" min="1" max="999">\n                                    </div>\n                                </div>\n                                <div class="role-radios form-group">\n                                    <div class="col-sm-3 readonly-value-container">\n                                        <input type="radio" id="role-on" ng-model="calendarEvent.rRule.end" value="on">\n                                        <label for="role-on">\n                                            On\n                                        </label>\n                                    </div>\n                                    <div class="col-sm-9">\n                                        <input class="form-control" kendo-date-picker ng-disabled="calendarEvent.rRule.end!==\'on\'" k-ng-model="calendarEvent.rRule.until" k-min="calendarEvent.start" k-format="dateFormat">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group" ng-if="!allowEdit && isRecurringEvent">\n                        <label class="col-sm-3 control-label">Repeat</label>\n                        <div class="col-sm-9 readonly-value readonly-value-container">\n                            {{ rRuleHumanized }}\n                        </div>\n                    </div>\n                    <div class="form-group" ng-if="plan && !freeMeetingRooms && allowEdit">\n                        <label class="col-sm-3 control-label">Price</label>\n                        <div class="col-sm-9 readonly-value">\n                            <div class="event-price-total">\n                                {{ total | isoCurrency: currency }}\n                            </div>\n                            <small class="event-price-calculations">\n                                {{ calendarEvent.duration }} x {{ price | isoCurrency: currency }}/hour\n                            </small>\n                        </div>\n                    </div>\n                    \n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">\n                        Close\n                    </button>\n                    <button ng-if="allowEdit" ng-disabled="!roomAvailable || (!selectedCustomer.team && !selectedCustomer.member)" type="submit" class="btn btn-primary" ng-click="commitEvent()" data-dismiss="modal">\n' + "                        {{ isNew ? 'Add' : 'Update' }}\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>"), e.put("/app/exportDialog.html", '<div id="export-modal" class="modal fade" role="dialog" tabindex="-1">\n    <div class="modal-dialog modal-sm">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                <h3 class="modal-title">Export Floorplan</h3>\n            </div>\n            <div class="modal-body">\n                <form class="form-horizontal">\n                    <div class="form-group" ng-repeat="propDef in viewPropDefs" ng-if="propDef.show_in_export">\n                        <div class="col-sm-offset-3 col-sm-9">\n                            <div class="checkbox" ng-if="propDef.type === \'Boolean\'">\n                                <label>\n                                    <input ng-if="propDef.type === \'Boolean\'" type="checkbox" ng-model="exportOptions[propDef.name]" ng-change="updatePreviewUrl()"> {{ ::propDef.title }}\n                                </label>\n                            </div>\n                        </div>\n\n                        <label ng-if="propDef.type!=\'Boolean\'" class="col-sm-3 control-label" for="{{ ::propDef.name }}-input">{{ ::propDef.title\n                            }}</label>\n\n                        <div class="col-sm-9">\n                            <select id="{{ ::propDef.name }}-input" ng-if="propDef.type === \'String\' && propDef.values" class="form-control" ng-model="exportOptions[propDef.name]" ng-change="updatePreviewUrl()">\n                                <option ng-repeat="value in propDef.values" value="{{ ::value }}">{{ ::value |\n                                    capitalize }}\n                                </option>\n                            </select>\n\n                            <input id="{{ ::propDef.name }}-input" type="text" ng-model="exportOptions[propDef.name]" ng-if="propDef.type === \'String\' && !propDef.values" class="form-control" ng-change="updatePreviewUrl()">\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="export-width" class="col-sm-3 control-label">Width</label>\n\n                        <div class="col-sm-9">\n                            <input type="number" class="form-control" id="export-width" ng-model="exportOptions.width" ng-change="updateExportSize(\'width\')">\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="export-width" class="col-sm-3 control-label">Width</label>\n\n                        <div class="col-sm-9">\n                            <input type="number" class="form-control col-sm-4" id="export-height" ng-model="exportOptions.height" ng-change="updateExportSize(\'height\')">\n                        </div>\n                    </div>\n                </form>\n\n                <div class="clearfix"></div>\n            </div>\n            <div class="modal-footer">\n                <div class="pull-right">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close\n                    </button>\n                    <a ng-href="{{downloadUrl}}" target="_blank" class="btn btn-primary">\n                        Download Image\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>'), e.put("/app/helpDialogs.html", '<div id="help-modal" rnd-modal>\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Getting started with OfficeR&D</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="help-item">\n                        <i class="fa fa-map-marker"></i>\n\n                        <h3>Setup your space</h3>\n\n                        <p><a ui-sref="organization.manage.space.locations" data-dismiss="modal">Add location(s)</a> and\n                            then add floorplan\n                            to it.\n                            Usually we upload your floorplans or create them from scratch for you. Contact us for more\n                            details.</p>\n                    </div>\n                    <div class="help-item">\n                        <i class="fa fa-archive"></i>\n\n                        <h3>Setup membership plans</h3>\n\n                        <p><a ui-sref="organization.manage.billing.plans" data-dismiss="modal">Add your membership plans</a> as well as any\n                            additional services you sell.</p>\n                    </div>\n                    <div class="help-item">\n                        <i class="fa fa-user-plus"></i>\n\n                        <h3>Manage contacts</h3>\n\n                        <p>Add all your <a ui-sref="organization.manage.community.members" data-dismiss="modal"> members</a>, <a ui-sref="organization.manage.community.teams" data-dismiss="modal"> companies</a> and <a ui-sref="organization.manage.community.leads" data-dismiss="modal"> leads</a>. Manage the full life-cycle of\n                            your community.</p>\n                    </div>\n                    <div class="help-item">\n                        <i class="fa fa-credit-card"></i>\n\n                        <h3>Setup billing & invoicing</h3>\n\n                        <p><a ui-sref="organization.manage.billing.invoices" data-dismiss="modal">Create invoices</a> directly from\n                            OfficeR&D\n                            using your own templates or choose from our <a ui-sref="organization.manage.settings.billing" data-dismiss="modal">Accounting software\n                                integrations.</a></p>\n                    </div>\n                    <div class="help-item">\n                        <i class="fa fa-check-square-o"></i>\n\n                        <h3>Assign desks and set plans</h3>\n\n                        <p>Once your space is setup, you can start assigning members to desks with specific plans.</p>\n                    </div>\n                    <div class="help-item">\n                        <i class="fa fa-heart-o"></i>\n\n                        <h3>Have fun using OfficeR&D</h3>\n\n                        <p>Managing your coworking space should be fun and easy. Accomplish operations excellence using\n                            OfficeR&D and have more time building your awesome community.</p>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">\n                        Close\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>'), e.put("/app/leadDialogs.html", '<div id="lead-modal" rnd-modal modal-focus="#lead-name" modal-hidden="cleanUpData()">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title inline">{{ originalContact && originalLead ? \'Edit\' : \'Add\' }} Lead</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="contact-name" class="col-sm-3 control-label">Name</label>\n\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" ng-model="contact.name" id="contact-name" placeholder="Office Innovation Labs">\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <label for="contact-email" class="col-sm-3 control-label">Email</label>\n\n                        <div class="col-sm-9">\n                            <input type="email" class="form-control" ng-model="contact.email" id="contact-email" placeholder="example@email.com">\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <label for="lead-start-date" class="col-sm-3 control-label">Start Month</label>\n\n                        <div class="col-sm-9">\n                            <input id="lead-start-date" class="form-control" kendo-date-picker k-depth="\'year\'" k-start="\'year\'" k-ng-model="lead.startDate" k-rebind="lead" k-format="\'MMMM yyyy\'" k-parse-formats="[\'MMMM yyyy\', \'yyyy-MM-ddTHH:mm:ss\']">\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="deal-size" class="col-sm-3 control-label">Deal Size</label>\n\n                        <div class="col-sm-9">\n                            <input type="number" class="form-control" ng-model="lead.dealSize" step="1" id="deal-size" placeholder="{{ 1000 | isoCurrency: org.settings.billing.currency }}">\n                        </div>\n                    </div>\n\n                    <div class="form-group" ng-if="offices.length>0">\n                        <label for="lead-office" class="col-sm-3 control-label">Location</label>\n\n                        <div class="col-sm-9">\n                            <select id="lead-office" class="form-control" kendo-drop-down-list k-ng-model="lead.office" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'name\'" k-option-label="{ name: \'Not selected\', _id: null }" k-rebind="offices && lead" k-data-source="offices">\n                            </select>\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <label for="deal-size" class="col-sm-3 control-label">Status</label>\n\n                        <div class="col-sm-9">\n                            <div class="btn-group btn-group-justified">\n                                <div class="btn-group">\n                                    <button type="button" class="btn btn-default" ng-class="{ active: lead.status===\'open\' }" ng-click="lead.status=\'open\'">\n                                        Open\n                                    </button>\n                                </div>\n                                <div class="btn-group">\n                                    <button type="button" class="btn btn-default" ng-class="{ active: lead.status===\'lost\' }" ng-click="lead.status=\'lost\'">\n                                        Lost\n                                    </button>\n                                </div>\n                                <div class="btn-group">\n                                    <button type="button" class="btn btn-default" ng-class="{ active: lead.status===\'won\' }" ng-click="lead.status=\'won\'">\n                                        Won\n                                    </button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    \n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">\n                        Close\n                    </button>\n                    <button type="button" class="btn btn-primary" ng-disabled="!contact.name" ng-click="commitLead()" data-dismiss="modal">\n' + "                        {{ originalContact && originalLead ? 'Update' : 'Add' }}\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>"), e.put("/app/memberDialogs.html", '<div>\n    <div id="member-modal" rnd-modal modal-focus="#member-name" modal-hidden="cleanUpMember()">\n        <div class="modal-dialog">\n            <form class="form-horizontal" role="form">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal">\n                            <span aria-hidden="true">&times;</span>\n                            <span class="sr-only">Close</span>\n                        </button>\n                        <h3 class="modal-title inline">{{ originalMember ? \'Edit\' : \'Add\' }} {{ isAssignPlanFormShown ? \'Member\' : \'Contact\' }}</h3>\n                    </div>\n                    <div class="modal-body">\n                        <div class="form-group">\n                            <label for="member-name" class="col-sm-3 control-label">Name</label>\n\n                            <div class="col-sm-9">\n                                <input type="text" class="form-control" ng-model="member.name" id="member-name" placeholder="John Doe" ng-required="true">\n                            </div>\n                        </div>\n\n                        <div class="form-group">\n                            <label for="member-team" class="col-sm-3 control-label">{{ ::teamProperty.name }}</label>\n\n                            <div class="col-sm-9" ng-if="!originalMember">\n                                <select id="member-team" class="form-control" kendo-drop-down-list k-ng-model="member.team" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'name\'" k-filter="\'contains\'" k-data-source="teams" k-rebind="member" k-virtual="{ itemHeight: 26, valueMapper: teamsValueMapper }" k-option-label="{ name: \'Not selected\', _id: null }">\n                                </select>\n                            </div>\n\n                            <div class="col-sm-9 readonly-value-container" ng-if="originalMember">\n                                <span class="readonly-value">{{ teamName || \'Not Assigned\' }}</span>\n                            </div>\n                        </div>\n\n                        <div class="form-group">\n                            <label for="member-email" class="col-sm-3 control-label">Email</label>\n\n                            <div class="col-sm-9">\n                                <input type="email" class="form-control" ng-model="member.email" id="member-email" placeholder="example@email.com">\n                            </div>\n                        </div>\n\n                        <div class="form-group" ng-repeat="property in customProperties | filter: \'member\'">\n                            <label class="col-sm-3 control-label">{{property.title}}</label>\n\n                            <div class="col-sm-9">\n                                <input type="text" class="form-control" ng-model="member.properties[property.title]" placeholder="{{property.title}}" auto-complete-list="property.hintValues">\n                            </div>\n                        </div>\n\n                        <div class="form-group column-right" ng-if="isAddMember || (isEditMember && !originalMembership)">\n                            <a class="col-sm-offset-3 col-sm-9" ng-click="toggleMode()">{{ isAssignPlanFormShown ? \'Remove\' : \'Add\' }} plan</a>\n                        </div>\n\n                        <edit-plan ng-if="isAssignPlanFormShown" membership="membership" original-membership="originalMembership" filter="plansFilter" is-membership-valid="isMembershipValid"></edit-plan>\n                    </div>\n\n                    <div class="modal-footer">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                        <button type="submit" class="btn btn-primary" ng-disabled="!isMemberValid()" data-dismiss="modal" ng-click="commitMember()">\n                            <span ng-if="originalMember">Update</span>\n                            <span ng-if="!originalMember">Add</span>\n                        </button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div id="relocate-modal" role="dialog" tabindex="-1" rnd-modal allow-popups modal-focus="#change-date" modal-hidden="cleanUpMembership()">\n        <form role="form" class="form-horizontal">\n            <div class="modal-dialog modal-sm">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                        <h3 class="modal-title">Relocate {{ membership.member ? \'Member\' : teamProperty.name }}</h3>\n                    </div>\n                    <div class="modal-body">\n                        <div class="form-group">\n                            <label for="member-name" class="col-xs-4 control-label text-label">\n                                {{ membership.member ? \'Member\' : teamProperty.name }}\n                            </label>\n\n                            <div class="col-xs-8">\n                                <generic-link id="member-name" class="readonly-value" target="membership"></generic-link>\n                            </div>\n                        </div>\n\n                        <div class="form-group">\n                            <label class="col-xs-4 control-label text-label">\n                                New location\n                            </label>\n\n                            <div class="col-xs-8">\n                                <span class="readonly-value">{{ membership.newLocation }}</span>\n                            </div>\n                        </div>\n\n                        <div class="form-group" ng-if="settings.billing.enabled">\n                            <label for="member-membership-plan" class="col-sm-4 control-label">Plan</label>\n\n                            <div class="col-sm-8">\n                                <select id="member-membership-plan" class="form-control" ng-model="membership.plan" ng-options="plan._id as plan.label for plan in plans">\n                                        <option value="">Not Selected</option>\n                                </select>\n                            </div>\n                        </div>\n\n                        <div class="form-group">\n                            <label class="col-xs-4 control-label" for="relocate-date">Date</label>\n\n                            <div class="col-xs-8">\n                                <input id="relocate-date" class="form-control" kendo-date-picker k-ng-model="membership.startDate" k-format="dateFormat" k-min="membership.relocateMinDate" k-rebind="membership">\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="modal-footer">\n                        <div class="pull-right">\n                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                            <button type="submit" ng-click="confirmRelocate()" class="btn btn-primary" data-dismiss="modal" ng-disabled="!membership.resource || !membership.plan">\n                                Done\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n\n    <div id="add-memberships-modal" rnd-modal modal-hidden="cleanUpMemberships()">\n        <div class="modal-dialog">\n            <form class="form-horizontal" role="form">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                        <h3 class="modal-title">Add Plans</h3>\n                    </div>\n\n                    <div class="modal-body">\n                        <add-plans memberships="memberships" office="office" date="date"></add-plans>\n                    </div>\n\n                    <div class="modal-footer">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                        <button type="submit" class="btn btn-primary" ng-disabled="memberships.length === 0" ng-click="confirmAddMemberships()" data-dismiss="modal">Confirm\n                        </button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div id="membership-modal" rnd-modal modal-focus="member-membership-plan" modal-hidden="cleanUpMembership()">\n        <div class="modal-dialog">\n            <form class="form-horizontal" role="form">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                        <h3 ng-if="!originalMembership" class="modal-title">Add Plan</h3>\n\n                        <h3 ng-if="originalMembership && terminate" class="modal-title">Terminate Membership</h3>\n\n                        <h3 ng-if="originalMembership && !terminate" class="modal-title">Edit Membership</h3>\n                    </div>\n                    <div class="modal-body">\n                        <div class="form-group" ng-if="team">\n                            <label for="membership-team" class="col-sm-3 control-label text-label">{{\n                                ::teamProperty.name }}</label>\n\n                            <div class="col-xs-9">\n                                <span id="membership-team" class="readonly-value">{{ team.name }}</span>\n                            </div>\n                        </div>\n\n                        <div class="form-group" ng-if="member">\n                            <label class="col-sm-3 control-label text-label">Member</label>\n\n                            <div class="col-xs-9">\n                                <span class="readonly-value">{{ member.name }}</span>\n                            </div>\n                        </div>\n\n                        <edit-plan membership="membership" original-membership="originalMembership" is-membership-valid="isMembershipValid" filter="plansFilter"></edit-plan>\n                    </div>\n\n                    <div class="modal-footer">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                        <button type="submit" class="btn btn-primary" ng-if="!originalMembership" ng-disabled="!membership.startDate || !areMembershipPropertiesSet()" ng-click="confirmAddMembership()">Add\n                        </button>\n                        <button type="button" class="btn btn-primary" ng-if="originalMembership && !terminate" ng-disabled="!membership.startDate || (!originalMembership.member && !areMembershipPropertiesSet()) || !isMembershipValid" ng-click="confirmUpdateMembership()">Update\n                        </button>\n                        <button type="button" class="btn btn-primary" ng-if="originalMembership && terminate" ng-disabled="!membership.endDate" ng-click="confirmUpdateMembership()">Terminate\n                        </button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div id="end-multiple-memberships-modal" rnd-modal modal-focus="end-date" modal-hidden="cleanUpEndMemberships()">\n        <div class="modal-dialog">\n            <form class="form-horizontal" role="form">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                        <h3 class="modal-title">Terminate {{ team ? team.name : \'memberships\' }}</h3>\n                    </div>\n                    <div class="modal-body">\n                        <div class="form-group" ng-if="team">\n                            <label for="team-name" class="col-sm-3 control-label text-label">{{ ::teamProperty.name\n                                }}</label>\n\n                            <div class="col-xs-9">\n                                <span id="team-name" class="readonly-value">{{ team.name }}</span>\n                            </div>\n                        </div>\n\n                        <div class="form-group">\n                            <label for="memberships-count" class="col-sm-3 control-label text-label">Memberships</label>\n\n                            <div class="col-xs-9">\n                                <span id="memberships-count" class="readonly-value">{{ originalMemberships.length }}</span>\n                            </div>\n                        </div>\n\n                        <div class="form-group">\n                            <label for="membership-end-date" class="col-sm-3 control-label">Date</label>\n\n                            <div class="col-sm-9">\n                                <input id="membership-end-date" class="form-control" kendo-date-picker placeholder="End date" k-ng-model="membershipsEndDate" k-min="firstPossibleDate" k-format="dateFormat" k-rebind="firstPossibleDate">\n                            </div>\n                        </div>\n                    </div>\n                    <div class="modal-footer">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                        <button type="submit" class="btn btn-primary" data-dismiss="modal" ng-disabled="!membershipsEndDate || originalMemberships.length === 0" ng-click="confirmEndMemberships()">Terminate\n                        </button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>'),
            e.put("/app/moveDialogs.html", '<div>\n    <div id="move-in-modal" role="dialog" tabindex="-1" rnd-modal allow-popups modal-focus="#change-date" modal-hidden="cleanUpAssignDesk()">\n        <form role="form" class="form-horizontal">\n            <div class="modal-dialog modal-md">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                        <h3 class="modal-title">Assign {{ isAssigningToTeamRoom ? \'Room\' : \'Desk\' }}</h3>\n                    </div>\n\n                    <div class="modal-body">\n                        <div class="form-group">\n                            <label for="move-in-team" class="col-xs-3 control-label">Assign to</label>\n\n                            <div class="col-xs-9">\n                                <customers-drop-down include-individuals="!multiple && !isAssigningToTeamRoom" selected-customer="selectedCustomer" show-sub-items="canAssignToMember()" filter-member-fn="filterMemberFn">\n                            </div>\n                        </div>\n\n                        <div class="form-group" ng-if="existingMemberships.areThereAny && existingMemberships.formShown">\n                            <label for="existing-memberships" class="col-sm-3 control-label">Existing plan</label>\n\n                            <div class="col-sm-9">\n                                <select id="existing-memberships" class="form-control" kendo-drop-down-list k-ng-model="existingMemberships.selected" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'label\'" k-option-label="{ label: \'Not assigned...\' }" k-data-source="existingMemberships.items" k-rebind="existingMemberships">\n                                </select>\n\n                                <span class="text-danger" ng-if="!isExistingMembershipAssignable">This desk is available from {{ firstPossibleAssignDeskDate }}.</span>\n                            </div>\n                        </div>\n\n                        <div class="form-group column-right" ng-show="showNewExistingButtonsForm()">\n                            <a class="col-xs-offset-3 col-xs-9" ng-show="!existingMemberships.formShown" ng-click="showAssignExistingMembershipForm()">Assign existing plan</a>\n\n                            <a class="col-xs-offset-3 col-xs-9" ng-show="existingMemberships.formShown" ng-click="hideAssignExistingMembershipForm()">Create new plan</a>\n                        </div>\n\n                        <div class="form-group" ng-show="!existingMemberships.formShown && hasAssignedTo()">\n                            <label class="col-xs-3 control-label" for="move-in-date">Date</label>\n\n                            <div class="col-xs-9">\n                                <input id="move-in-date" class="form-control" kendo-date-picker k-ng-model="membership.startDate" k-rebind="membership && firstPossibleDate" k-min="firstPossibleDate" k-format="dateFormat">\n                            </div>\n                        </div>\n\n                        <div class="form-group" ng-if="settings.billing.enabled && !existingMemberships.formShown && hasAssignedTo()">\n                            <label for="membership-plan" class="col-sm-3 control-label">Plan</label>\n\n                            <div class="col-sm-9">\n                                <select id="membership-plan" class="form-control" kendo-drop-down-list k-ng-model="membership.plan" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'label\'" k-data-source="plans" k-rebind="membership" k-option-label="{ label: \'Not selected\', _id: null }">\n                                </select>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="modal-footer">\n                        <div class="pull-right">\n                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                            <button type="submit" ng-click="confirmMoveIn()" ng-disabled="!canMoveIn()" class="btn btn-primary" data-dismiss="modal">\n                                Done\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n\n    <div id="assign-member-modal" role="dialog" tabindex="-1" rnd-modal allow-popups modal-focus="#change-date" modal-hidden="cleanUp()">\n        <form role="form" class="form-horizontal">\n            <div class="modal-dialog modal-md">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                        <h3 class="modal-title">Assign Member</h3>\n                    </div>\n\n                    <div class="modal-body">\n                        <div class="form-group">\n                            <label class="col-xs-3 control-label">Company</label>\n\n                            <div class="col-xs-9 readonly-value-container">\n                                <span class="readonly-value">{{ teamName }}</span>\n                            </div>\n                        </div>\n\n                        <div class="form-group">\n                            <label for="move-in-member" class="col-xs-3 control-label">Member</label>\n\n                            <div class="col-xs-9">\n                                <select id="move-in-member" class="form-control" kendo-drop-down-list k-ng-model="membership.member" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'label\'" k-filter="\'contains\'" k-template="\'<span><b>#: name #</b></span>\'" k-data-source="members" k-rebind="membership" k-option-label="{ label: \'Not assigned...\' }">\n                                </select>\n\n                                <span class="text-danger" ng-if="!isMemberAssignable">This member is available from {{ firstPossibleAssignMemberDate }}.</span>\n                            </div>\n                        </div>\n\n                        <div class="form-group">\n                            <label class="col-xs-3 control-label">Plan details</label>\n\n                            <div class="col-xs-9 readonly-value-container">\n                                <span class="readonly-value">{{ planDetails }}</span>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="modal-footer">\n                        <div class="pull-right">\n                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                            <button type="submit" ng-click="confirmAssignMember()" ng-disabled="!canAssignMember()" class="btn btn-primary" data-dismiss="modal">\n                                Done\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n\n    <div id="history-modal" role="dialog" rnd-modal>\n        <div class="modal-dialog modal-md">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">{{ activity[0].planType === \'desk\' ? \'Workstation\' : \'Private office\'}} history</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="activity">\n                        <div class="activity-item" ng-repeat="item in activity | reverse">\n                            <span class="activity-icon" ng-class="item.type">\n                                <i class="fa" ng-class="item.icon"></i>\n                            </span>\n                            <em>{{ item.moment }}</em>, <generic-link target="item"></generic-link>\n                            <strong>{{ item.text || item.type }}</strong>.\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <div class="pull-right">\n                        <button type="submit" data-dismiss="modal" class="btn btn-primary">\n                            Done\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>'), e.put("/app/officeDialogs.html", '<div id="office-modal" rnd-modal modal-focus="#office-name" modal-hidden="cleanUpData()">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">{{original ? \'Edit\' : \'Add\'}} Location</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="office-name" class="col-sm-3 control-label">Name</label>\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" ng-model="office.name" id="office-name" placeholder="Name">\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="office-description" class="col-sm-3 control-label">Description</label>\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" ng-model="office.description" id="office-description" placeholder="Description">\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="col-sm-offset-3 col-sm-6">\n                            <div class="checkbox">\n                                <label>\n                                    <input type="checkbox" ng-model="office.isOpen">Is Open\n                                </label>\n                            </div>\n                            <small class="text-muted">\n                        Defines if the location is in operation.</small>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label class="col-sm-3 control-label">Image</label>\n                        <div class="col-sm-9">\n                            <image-upload image-url="office.image" target="{{ office.name }}" default-icon="fa-building-o"></image-upload>\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">\n                        Close\n                    </button>\n                    <button ng-if="!original" type="submit" class="btn btn-primary" ng-disabled="!office.name" ng-click="commitAddOffice()">\n                        Add\n                    </button>\n                    <button ng-if="original" type="submit" class="btn btn-primary" ng-disabled="!office.name" ng-click="commitEditOffice()">\n                        Update\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>'), e.put("/app/organization/billing/addInvoices.html", '<div>\n    <h4 class="rnd-title inline" title="New Invoices">New Invoices</h4>\n\n    <button class="btn btn-primary" ng-click="confirmInvoices()" title="Confirm invoices" ng-disabled="!invoices || invoices.length === 0 || savingInvoices">\n        <span ng-if="!savingInvoices">Confirm</span>\n        <span ng-if="savingInvoices">Saving <i class="fa fa-spinner fa-spin"></i></span>\n    </button>\n\n    <div class="rnd-container form-horizontal">\n        <div class="form-group">\n            <label for="payment-date" class="col-sm-2 control-label">Issue Date</label>\n\n            <div class="col-sm-4">\n                <input id="payment-date" class="form-control" kendo-date-picker k-ng-model="invoiceSettings.issueDate" k-rebind="invoiceSettings" k-format="dateFormat" k-parse-formats="[\'dd/MM/yyyy\', \'yyyy-MM-ddTHH:mm:ss\']">\n            </div>\n\n            <label for="payment-method" class="col-sm-2 control-label" ng-show="invoicingType === \'basic\'">Method</label>\n\n            <div class="col-sm-4" ng-show="invoicingType === \'basic\'">\n                <select id="payment-method" class="form-control" kendo-drop-down-list ng-model="invoiceSettings.method">\n                    <option value="cash">Cash</option>\n                    <option value="bank">Bank Transfer</option>\n                    <option value="pos">POS</option>\n                </select>\n            </div>\n        </div>\n\n        <div class="form-group">\n            <label for="invoice-date" class="col-sm-2 control-label">Period Start</label>\n\n            <div class="col-sm-4">\n                <input id="invoice-date" class="form-control" kendo-date-picker k-ng-model="invoiceSettings.periodStart" k-depth="\'year\'" k-start="\'year\'" k-rebind="  " k-format="\'MMMM yyyy\'" k-parse-formats="[\'MMMM yyyy\', \'yyyy-MM-ddTHH:mm:ss\']">\n            </div>\n\n            <label for="payment-for" class="col-sm-2 control-label">Invoices For</label>\n\n            <div class="col-sm-4">\n                <select id="payment-for" class="form-control" kendo-drop-down-list ng-model="invoiceSettings.periodLength">\n                    <option value="1">1 month</option>\n                    <option value="2">2 months</option>\n                    <option value="3">3 months</option>\n                    <option value="4">4 months</option>\n                    <option value="5">5 months</option>\n                    <option value="6">6 months</option>\n                    <option value="12">12 months</option>\n                </select>\n            </div>\n        </div>\n\n        <div class="form-group" ng-if="showPeriodFilter">\n            <label for="invoice-start-date" class="col-sm-2 control-label">Start Date</label>\n\n            <div class="col-sm-4">\n                <input id="invoice-start-date" class="form-control" kendo-date-picker k-ng-model="invoiceSettings.startDate" k-depth="\'month\'" k-start="\'month\'" k-min="monthStart(invoiceSettings.periodStart)" k-max="monthEnd(invoiceSettings.periodStart)" k-rebind="invoiceSettings.periodStart" k-format="\'dd MMM\'" k-parse-formats="[\'dd MMM\', \'yyyy-MM-ddTHH:mm:ss\']">\n            </div>\n\n            <label for="invoice-end-date" class="col-sm-2 control-label">End Date</label>\n\n            <div class="col-sm-4">\n                <input id="invoice-end-date" class="form-control" kendo-date-picker k-ng-model="invoiceSettings.endDate" k-depth="\'month\'" k-start="\'month\'" k-min="invoiceSettings.startDate" k-max="monthEnd(invoiceSettings.periodStart)" k-rebind="invoiceSettings.startDate" k-format="\'dd MMM\'" k-parse-formats="[\'dd MMM\', \'yyyy-MM-ddTHH:mm:ss\']">\n            </div>\n        </div>\n    </div>\n</div>\n\n    <div class="rnd-container" ng-if="invoices && invoices.length > 0">\n        <table class="table payments-table" ng-if="invoices.length > 0" rnd-sortable="newInvoicesSort">\n            <thead>\n            <th><sortable-header property="number">Invoice #</sortable-header></th>\n            <th>To</th>\n            <th><sortable-header property="periodStart">Period</sortable-header></th>\n            <th>Discount</th>\n            <th>Amount</th>\n            </thead>\n            <tbody>\n            <tr ng-repeat="inv in invoices | rndSort: newInvoicesSort">\n                <td hover-action action="editInvoice(inv)" icon="pencil">\n                    <user-picture icon="\'fa-file-text-o\'" class="profile-xs inline"></user-picture>\n                    {{ inv.payment.number || \'n/a *\' }}\n                </td>\n                <td>\n                    <generic-link target="inv.payment"></generic-link>\n                </td>\n                <td>{{ inv.payment.periodStart | date:\'mediumDate\' }} - {{ inv.payment.periodEnd | date:\'mediumDate\' }}</td>\n                <td>{{ inv.discount | number }}%</td>\n                <td>{{ inv.amount | isoCurrency: currency }}</td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n\n    <empty-block ng-if="invoices && invoices.length === 0" command="goToInvoices()" header="Go To Invoices" help="You don\'t have any billing data so no invoices are to be raised.">\n    </empty-block>\n\n    <loading ng-if="!invoices" help="new invoices"></loading>\n\n    <p>\n        <i ng-if="invoicingType !== \'basic\'">* Invoice number will be created once confirmed.</i>\n    </p>\n\n    <button class="btn btn-primary" ng-click="confirmInvoices()" title="Confirm invoices" ng-disabled="!invoices || invoices.length === 0 || savingInvoices">\n        <span ng-if="!savingInvoices">Confirm</span>\n        <span ng-if="savingInvoices">Saving <i class="fa fa-spinner fa-spin"></i></span>\n    </button>\n'), e.put("/app/organization/billing/dashboard.html", '<div>\n    <h4 class="rnd-title" title="Invoices">Invoices</h4>\n    <div class="btn-group">\n        <button class="btn btn-primary" ng-click="addInvoice()">Add invoice</button>\n        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n            <span class="caret"></span>\n            <span class="sr-only">Toggle Dropdown</span>\n        </button>\n        <ul class="dropdown-menu">\n            <li><a ng-click="addInvoice()">Add invoice</a></li>\n            <li><a ui-sref="organization.manage.billing.addInvoices">Add many invoices</a></li>\n        </ul>\n    </div>\n    <div class="rnd-container">\n        <div class="row">\n            <div class="col-sm-4">\n                <div class="dashboard-card lower-case">\n                    <div class="dashboard-row">\n                        <strong>{{ draftCount }}</strong>\n                        <label>Draft invoices</label>\n                        <span>{{ draftTotal | isoCurrency: currency }}</span>\n                    </div>\n                    <div class="dashboard-row">\n                        <strong>{{ awaitingCount }}</strong>\n                        <label>Awaiting payment</label>\n                        <span>{{ awaitingTotal | isoCurrency: currency }}</span>\n                    </div>\n                    <div class="dashboard-row">\n                        <strong>{{ overdueCount }}</strong>\n                        <label> Overdue</label>\n                        <span>{{ overdueTotal | isoCurrency: currency }}</span>\n                    </div>\n                </div>\n            </div>\n            <div class="col-sm-7 col-sm-offset-1">\n                <kendo-chart k-options="invoicesOptions" k-rebind="months" k-data-source="months"></kendo-chart>\n            </div>\n        </div>\n    </div>\n</div>\n<div>\n    <h4 class="rnd-title" title="Revenue">Revenue</h4>\n    <div class="rnd-container">\n        <div class="row">\n            <div class="col-sm-5">\n                <div class="dashboard-card lower-case">\n                    <div class="dashboard-row">\n                        <strong>{{ plansCount }}</strong>\n                        <label> Plans</label>\n                        <span>{{ plansTotal | isoCurrency: currency }}</span>\n                    </div>\n                    <hr>\n                    <div class="dashboard-row" ng-repeat="group in plans | orderBy: \'plan.price\'">\n                        <strong>{{ group.count }}</strong>\n                        <label>\n                            <expand-plan plan-id="group.plan._id"></expand-plan>\n                        </label>\n                        <span>{{ group.total | isoCurrency: currency}}</span>\n                    </div>\n                </div>\n            </div>\n            <div class="col-sm-6 col-sm-offset-1">\n                <kendo-chart k-options="plansPieOptions" k-rebind="groupedPlans" k-data-source="groupedPlans"></kendo-chart>\n            </div>\n        </div>\n    </div>\n</div>'), e.put("/app/organization/billing/invoice.html", '<div class="row">\n    <div class="col-md-4">\n        <h4 class="rnd-title" title="Members details">Invoice</h4>\n\n        <div class="dropdown pull-right actions-menu">\n            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="editMenu" data-toggle="dropdown">\n                <i class="fa fa-cog"></i> Actions\n                <span class="caret"></span>\n            </button>\n            <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMenu">\n                <li role="presentation">\n                    <a role="menuitem" tabindex="-1" ng-click="deleteInvoice()">\n                        <i class="fa fa-trash-o"></i> Delete\n                    </a>\n                </li>\n            </ul>\n        </div>\n\n        <div class="rnd-container member-card">\n            <div class="profile-md inline pull-left"><i class="fa fa-file-text-o"></i></div>\n            <h3># {{ invoice.number }}</h3>\n\n            <div class="clearfix"></div>\n            <hr>\n            <p class="member-info">\n                <label><i class="fa fa-user"></i> To</label>\n                <span class="member-info-value"><generic-link target="invoice"></generic-link></span>\n            </p>\n            <div class="member-info">\n                <label><i class="fa fa-clock-o"></i> Status</label>\n                <span class="member-info-value payment-status" ng-class="invoice.status">{{ invoice.status | capitalize }}</span>\n            </div>\n            <p class="member-info">\n                <label><i class="fa fa-calendar-o"></i> Issue Date</label>\n                <span class="member-info-value">{{ invoice.date | date:\'mediumDate\' }}</span>\n            </p>\n\n            <p class="member-info">\n                <label><i class="fa fa-calendar"></i> Period</label>\n                <span class="member-info-value">{{ invoice.periodStart | date:\'mediumDate\' }} - {{ invoice.periodEnd | date:\'mediumDate\' }}</span>\n            </p>\n\n            <p class="member-info">\n                <label><i class="fa fa-percent"></i> Discount</label>\n                <span class="member-info-value">{{ invoice.discount | number: 0 }}%</span>\n            </p>\n\n            <p class="member-info">\n                <label><i class="fa fa-calculator"></i> VAT</label>\n                <span class="member-info-value">{{ invoice.taxType | capitalize }}</span>\n            </p>\n\n            <p class="member-info">\n                <label><i class="fa fa-money"></i> Total</label>\n                <strong class="member-info-value">{{ ::(invoice.amount | isoCurrency: currency) }}</strong>\n            </p>\n\n            <hr ng-if="invoicingType === \'basic\' || invoicingType === \'xero\'">\n\n            <div class="member-info" ng-if="invoicingType === \'basic\'">\n                <div class="btn-group" ng-disabled="invoice.exporting">\n                    <a class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">\n                        Export\n                        <span class="caret"></span>\n                    </a>\n                    <ul class="dropdown-menu">\n                        <li ng-repeat="template in org.settings.invoicing.enabledTemplates">\n                            <a ng-click="generateInvoice(template)">{{ ::template | formatTemplate }}</a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n\n            <div ng-if="invoicingType === \'basic\' || invoicingType === \'xero\'">\n                <div class="member-info" ng-repeat="document in invoice.linkedDocuments">\n                    <a ng-href="{{ ::document.url }}" target="_blank" role="menuitem" class="dark-link" title="{{ ::(document.type === \'file\' ? \'Download pdf\' : \'Open in Xero\') }}">\n                        <i class="fa fa-file-pdf-o"></i>\n                        <span ng-if="document.type === \'file\'">{{ ::document.name | formatTemplate }}</span>\n                        <span ng-if="document.type === \'xero\'">Open in Xero</span>\n                    </a>\n\n                    <div class="dropdown room-menu" ng-if="document.type === \'file\'">\n                        <button class="btn-icon dropdown-toggle" type="button" id="editMenu" ng-disabled="document.sendingInvoice" data-toggle="dropdown">\n                            <i ng-if="!document.sendingInvoice" class="fa fa-cog"></i>\n                            <i ng-if="document.sendingInvoice" class="fa fa-spinner fa-spin" title="Sending Invoice"></i>\n                        </button>\n                        <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMenu">\n                            <li role="presentation">\n                                <a ng-href="{{ ::document.url }}" target="_blank" role="menuitem" tabindex="-1">\n                                    <i class="fa fa-file-pdf-o"></i> Download pdf\n                                </a>\n                            </li>\n                            <li role="presentation">\n                                <a ng-click="sendInvoice(document)" role="menuitem" tabindex="-1" title="{{ ::(\'Send invoice to \' + target.email) }}">\n                                    <i class="fa fa-envelope-o"></i> Send\n                                </a>\n                            </li>\n                            <li class="divider"></li>\n                            <li role="presentation">\n                                <a ng-click="deleteDocument(document)" role="menuitem" tabindex="-1" title="Delete document">\n                                    <i class="fa fa-trash-o"></i> Delete\n                                </a>\n                            </li>\n                        </ul>\n                    </div>\n\n                    <div><small><i>Exported on {{ ::document.created | date:\'mediumDate\' }}</i></small></div>\n                </div>\n\n                <div class="member-info" ng-if="!invoice.exporting && invoice.linkedDocuments.length === 0">\n                    \n                    <span ng-if="invoice.integration.lastSync && !invoice.integration.error">Last sync {{ invoice.integration.lastSync | momentAgo }}</span>\n                    <span ng-if="invoice.integration.error && !invoice.exporting">\n                        <i class="fa fa-exclamation-triangle" title="{{ invoice.integration.error }}"></i>\n                        Error syncing invoice\n                    </span>\n                    <span ng-if="!invoice.integration.lastSync && !invoice.integration.error">Not synced</span>\n                    <a class="dark-link" ng-if="(invoice.integration.error || !invoice.integration.lastSync) && !invoice.exporting" ng-click="generateInvoice()"><i class="fa fa-repeat" title="Try again"></i></a>\n                </div>\n\n                <div class="member-info" ng-if="invoice.exporting">\n                    <span><i class="fa fa-spinner fa-spin" title="Exporting invoice"></i> Exporting...</span>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class="col-md-8">\n        <h4 class="rnd-title" title="Plans">Lines</h4>\n\n        <div class="rnd-container">\n            <table class="table no-border">\n                <thead>\n                <th><label>Description</label></th>\n                <th><label>Quantity</label></th>\n                <th class="column-right"><label>Discount</label></th>\n                <th class="column-right"><label>Price</label></th>\n                </thead>\n                <tbody>\n                <tr ng-repeat="item in lines">\n                    <td>{{item.description}}</td>\n                    <td>{{item.quantity | number:2}}</td>\n                    <td class="column-right">{{item.discount | number}}%</td>\n                    <td class="column-right">{{item.price | isoCurrency: currency}}</td>\n                </tr>\n                <tr>\n                    <td colspan="3"></td>\n                    <td class="column-right"><strong>{{ invoice.amount | isoCurrency: currency }}</strong></td>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n\n    <div class="col-md-8">\n        <h4 class="rnd-title" title="Payments">Payments</h4>\n\n        <button type="button" class="btn btn-primary btn-sm" ng-if="!isPaid" ng-click="addCharge(invoice)">Add payment</button>\n        <button type="button" class="btn btn-primary btn-sm" ng-if="target.billing.length > 0 && !isPaid" ng-click="executeCharge(invoice)">Charge</button>\n\n        <div class="rnd-container" ng-if="invoice.charges.length > 0">\n            <table class="table no-border">\n                <thead>\n                <th><label>Method</label></th>\n                <th><label>Reference</label></th>\n                <th><label>Date</label></th>\n                <th class="column-right"><label>Amount</label></th>\n                </thead>\n                <tbody>\n                <tr ng-repeat="charge in invoice.charges">\n                    <td hover-action action="removeCharge(invoice, charge)" icon="trash-o">{{ charge.account }}</td>\n                    <td>{{ charge.reference }}</td>\n                    <td>{{ charge.date | date: \'mediumDate\' }}</td>\n                    <td class="column-right">{{ charge.amount | isoCurrency: currency }}</td>\n                </tr>\n                <tr>\n                    <td colspan="3"></td>\n                    <td class="column-right"><strong>{{ paidAmount(invoice) | isoCurrency: currency }}</strong></td>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class="rnd-container" ng-if="invoice.charges.length === 0">\n            <div class="no-items-section">No payments recorded for this invoice.</div>\n        </div>\n    </div>\n</div>'), e.put("/app/organization/billing/invoices.html", '<div>\n    <div id="download-invoices-modal" role="dialog" class="modal fade" rnd-modal modal-focus="#loading" modal-hidden="cleanupExportUrl()">\n        <div class="modal-dialog modal-sm">\n            <form class="form-horizontal">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                        <h3 class="modal-title">Export Selected Invoices</h3>\n                    </div>\n\n                    <div class="modal-body">\n                        <div class="form-group">\n                            <div class="col-sm-12">\n                                <div>\n                                    <a ng-if="url" ng-href="{{ url }}">Download</a>\n                                    <span ng-if="!url"><i class="fa fa-spinner fa-spin"></i> Generating...</span>\n                                </div>\n                                <small>You can find more information about exporting data in OfficeR&D <a href="https://officernd.com/help/exporting-data/" target="_blank">here</a>.</small>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="modal-footer">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div class="btn-group">\n        <button class="btn btn-primary" ng-click="addInvoice()">Add invoice</button>\n        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n            <span class="caret"></span>\n            <span class="sr-only">Toggle Dropdown</span>\n        </button>\n        <ul class="dropdown-menu">\n            <li><a ng-click="addInvoice()">Add invoice</a></li>\n            <li><a ui-sref="organization.manage.billing.addInvoices">Add many invoices</a></li>\n        </ul>\n    </div>\n    <div class="pull-right">\n        <a class="btn btn-danger" title="Delete Selected Invoices" ng-if="selectedInvoices.length > 0" ng-click="deleteInvoices(selectedInvoices)">Delete</a>\n        <a class="btn btn-primary" title="Download Selected Invoices" ng-if="selectedInvoices.length > 0" target="_blank" ng-click="downloadInvoices(selectedInvoices)">Download</a>\n        <a class="btn btn-primary" title="Sync with Xero" ng-if="xeroIntegration.enabled" ng-disabled="syncing" ng-click="syncPayments()">\n            <span ng-if="!syncing">Sync</span>\n            <span ng-if="syncing"><i class="fa fa-spinner fa-spin"></i> Syncing</span>\n        </a>\n    </div>\n    <div class="rnd-container">\n        <payments-list selected-items="selectedInvoices"></payments-list>\n    </div>\n</div>'),
            e.put("/app/organization/billing/paymentsList.html", '<div>\n    <div class="getting-started-section" ng-if="payments.length === 0 && !team && !member">\n        <h4>Getting started with Invoices</h4>\n        <p>\n            You can easily create and send invoices using OfficeR&D. There are two ways to do so:\n        </p>\n        <ul>\n            <li>setup your own template or use OfficeR&D built-in</li>\n            <li>or connect it to your accounting software</li>\n        </ul>\n        <p>\n            Once you <a ui-sref="organization.manage.settings.billing">setup the billing and invoices module</a> you can start <a ng-click="addInvoice()">adding invoices</a>.\n        </p>\n    </div>\n    <div class="no-items-section" ng-if="payments.length === 0 && (team || member)">\n        Nothing here. Start adding invoices or <a ui-sref="organization.manage.billing.invoices">read more\n        about OfficeR&D billing module here</a>.\n    </div>\n    <section ng-if="payments.length > 0">\n        <search-box model="search.number"></search-box>\n        <search-month model="search.issueMonth"></search-month>\n        <div class="rnd-filter-tabs-panel">\n            <label>Status</label>\n            <a ng-click="search.status = undefined" ng-class="{ active: !search.status }"><span class="filter-label">All</span></a>\n            <a ng-click="search.status = \'draft\'" class="payment-status draft" ng-class="{ active: search.status === \'draft\' }"><span class="filter-label">Draft</span></a>\n            <a ng-click="search.status = \'sent\'" class="payment-status sent" ng-class="{ active: search.status === \'sent\' }"><span class="filter-label">Sent</span></a>\n            <a ng-click="search.status = \'paid\'" class="payment-status paid" ng-class="{ active: search.status === \'paid\' }"><span class="filter-label">Paid</span></a>\n        </div>\n    </section>\n    <table class="table payments-table" ng-if="payments.length > 0" rnd-sortable="paymentsSort" sortable-default="number">\n        <thead>\n            <th>\n                <input type="checkbox" ng-model="$parent.isSelected">\n                <sortable-header property="number">Invoice #</sortable-header>\n            </th>\n            <th ng-if="!team && !member">\n                <sortable-header property="to" value-selector="getTargetName">To</sortable-header>\n            </th>\n            <th>\n                <sortable-header property="status">Status</sortable-header>\n            </th>\n            <th>\n                <sortable-header property="date">Issue Date</sortable-header>\n            </th>\n            <th>\n                <sortable-header property="periodStart">Period</sortable-header>\n            </th>\n            <th>\n                <sortable-header property="amount">Amount</sortable-header>\n            </th>\n        </thead>\n        <tbody>\n            <tr ng-repeat="p in payments | invoiceFilter: search | rndSort: paymentsSort">\n                <td>\n                    <input class="align-top" type="checkbox" ng-model="selected[p._id]">\n                    <div class="image-table middle">\n                        <user-picture icon="\'fa-file-text-o\'" class="profile-sm image-cell"></user-picture>\n                        <div class="info-cell">\n                            <a class="dark-link" ui-sref="organization.manage.billing.invoice({id: p._id})"> {{ p.number || \'No number\'}}</a>\n                            <p class="member-email" ng-if="!basicInvoicing">\n                                <span ng-if="p.integration.lastSync && !p.integration.error">Last sync {{ p.integration.lastSync | momentAgo }}</span>\n                                <span ng-if="p.integration.error && !p.exporting">\n                                    <i class="fa fa-exclamation-triangle" title="{{ p.integration.error }}"></i>\n                                    Error syncing invoice\n                                </span>\n                                <span ng-if="!p.integration.lastSync && !p.integration.error">Not synced</span>\n                                <i class="fa fa-spinner fa-spin" ng-if="p.exporting" title="Exporting"></i>\n                                <a class="dark-link" ng-if="(p.integration.error || !p.integration.lastSync) && !p.exporting" ng-click="exportInvoice(p)"><i class="fa fa-repeat" title="Try again"></i></a>\n                            </p>\n                        </div>\n                    </div>\n                </td>\n                <td ng-if="!team && !member">\n                    <generic-link target="p"></generic-link>\n                </td>\n                <td class="payment-status" ng-class="p.status">\n                    {{ p.status | capitalize }}\n                </td>\n                <td>{{ p.date | date:\'mediumDate\' }}</td>\n' + "                <td>{{ p.periodStart | date:'mediumDate' }} - {{ p.periodEnd | date:'mediumDate' }}</td>\n                <td>{{ p.amount | isoCurrency: currency }}</td>\n            </tr>\n        </tbody>\n    </table>\n</div>"), e.put("/app/organization/billing/plans.html", '<div id="plan-modal" rnd-modal modal-focus="#plan-name" modal-hidden="cleanUpData()">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">{{originalPlan ? \'Edit\' : \'Add\'}} Membership Plan</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label class="col-sm-2 control-label">Type</label>\n                        <div class="col-sm-10">\n                            <div class="btn-group btn-group-justified">\n                                <div class="btn-group" ng-repeat="(key, type) in plansModel.types">\n                                    <button type="button" class="btn btn-default btn-sm" ng-class="{ active: plan.type === key }" ng-click="plan.type=key" title="{{ ::type.title }}">\n                                        <i class="{{ ::type.icon }}"></i>\n                                        <div>{{type.title}}</div>\n                                    </button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="plan-name" class="col-sm-2 control-label">Name</label>\n                        <div class="col-sm-10">\n                            <input type="text" class="form-control" ng-model="plan.name" id="plan-name" placeholder="Full-time">\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="plan-price" class="col-sm-2 control-label">Price</label>\n                        <div class="col-sm-5">\n                            <div class="input-group">\n                                <input type="number" class="form-control" ng-model="plan.price" step="1" id="plan-price" required placeholder="Example: {{ 100 | isoCurrency: settings.billing.currency }}">\n                                <span class="input-group-addon">{{ ::currency }}</span>\n                            </div>\n                        </div>\n                        <div class="col-sm-5">\n                            <select id="plan-interval-length" class="form-control" kendo-drop-down-list k-value-primitive="true" k-ng-model="plan.intervalLength" k-data-source="intervalLengths">\n                            </select>\n                        </div>\n                    </div>\n                    <div class="form-group" ng-show="plan.intervalLength === \'hour\'">\n                        <label for="plan-offprice" class="col-sm-2 control-label">Off hours price</label>\n                        <div class="col-sm-5">\n                            <div class="input-group">\n                                <input type="number" class="form-control" ng-model="plan.offPrice" step="1" id="plan-offprice" placeholder="Example: {{ 100 | isoCurrency: settings.billing.currency }}">\n                                <span class="input-group-addon">{{ ::currency }}</span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="plan-desc" class="col-sm-2 control-label">Description</label>\n                        <div class="col-sm-10">\n                            <input type="text" class="form-control" ng-model="plan.description" id="plan-desc" placeholder="Perfect for people just starting out">\n                        </div>\n                    </div>\n                    <div class="form-group" ng-if="plan.type !== \'meeting_room\'">\n                        <div class="col-sm-offset-2 col-sm-10" ng-if="plan.type !== \'service\'">\n                            <div class="checkbox">\n                                <label>\n                                    <input type="checkbox" ng-model="plan.freeMeetingRooms"> Free meeting rooms\n                                </label>\n                            </div>\n                        </div>\n                        <div class="col-sm-offset-2 col-sm-10" ng-if="org.settings.community.enabled">\n                            <div class="checkbox">\n                                <label>\n                                    <input type="checkbox" ng-model="plan.approval"> Request approval\n                                </label>\n                            </div>\n                        </div>\n                        <div class="col-sm-offset-2 col-sm-10" ng-if="org.settings.community.enabled">\n                            <div class="checkbox">\n                                <label>\n                                    <input type="checkbox" ng-model="plan.public"> Public\n                                </label>\n                            </div>\n                            <small>Public plans are visible for members in the members portal.</small>\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">\n                        Close\n                    </button>\n                    <button type="submit" class="btn btn-primary" ng-click="commitPlan()" ng-disabled="plan.price===undefined">\n                        <span ng-if="originalPlan">Update</span>\n                        <span ng-if="!originalPlan">Add</span>\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n<button class="btn btn-primary" ng-click="addPlan()">Add plan</button>\n<div class="rnd-container" ng-if="plansModel && plansModel.items.length > 0">\n    <table class="table">\n        <thead>\n            <th>Plan</th>\n            <th>Active</th>\n            <th>Type</th>\n            <th>Description</th>\n            <th>Options</th>\n        </thead>\n        <tbody>\n            <tr class="grid-row" ng-repeat="plan in plansModel.items | orderBy: \'price\'">\n                <td>\n                    <a ng-click="editPlan(plan)" class="dark-link">\n                        <expand-plan plan-id="plan._id"></expand-plan>\n                    </a>\n                    <div class="dropdown room-menu">\n                        <button class="btn-icon dropdown-toggle" type="button" id="editMenu" data-toggle="dropdown">\n                            <i class="fa fa-cog"></i>\n                        </button>\n                        <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMenu">\n                            <li role="presentation">\n                                <a role="menuitem" tabindex="-1" ng-click="editPlan(plan)"> <span class="fa fa-pencil"></span> Edit</a>\n                            </li>\n                            <li class="divider"></li>\n                            <li role="presentation"><a role="menuitem" tabindex="-1" ng-click="deletePlan(plan)"><span class="fa fa-trash-o"></span> Delete</a></li>\n                        </ul>\n                    </div>\n                </td>\n                <td>{{ activePlans(plan) }}</td>\n                <td><i class="{{ plansModel.types[plan.type].icon }}"></i> {{ plansModel.types[plan.type].title }}</td>\n                <td>{{ plan.description || \'-\' }}</td>\n                <td>\n                    <i class="fa fa-sign-in" ng-if="plan.public" title="Public"></i>\n                    <i class="fa fa-suitcase" ng-if="plan.freeMeetingRooms" title="Free meeting rooms"></i>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n<loading ng-if="!plansModel" help="plans"></loading>\n<empty-block ng-if="plansModel && plansModel.items.length === 0" command="addPlan()" header="Add membership plan" help="It looks you don\'t have any membership plans yet.">\n</empty-block>'), e.put("/app/organization/billing/revenue.html", '<div>\n    <h4 class="rnd-title" title="Revenue">Revenue</h4>\n    <locations-filter></locations-filter>\n\n    <div class="rnd-container">\n        <table class="table filterable" ng-init="limit = 40" infinite-scroll="limit = limit + 6" infinite-scroll-distance="1">\n            <thead>\n            <th><search-box model="teamsFilter.team.name"></search-box></th>\n            <th ng-repeat="month in months">{{ month | date:\'MMMM\' }}</th>\n            </thead>\n            <tbody>\n            <tr>\n                <td><strong>Total</strong></td>\n                <td ng-repeat="month in months"><strong>{{ sumAllInMonth($index) | isoCurrency:\n                    settings.billing.currency }}</strong></td>\n            </tr>\n            <tr ng-repeat="x in byTeam | filter:teamsFilter | orderBy: \'team.name\' | limitTo: limit">\n                <td>\n                    <a ng-if="x.team" class="dark-link" ui-sref="organization.manage.team({ team: x.team._id })">\n                        {{ x.team.name }}\n                    </a>\n\n                    <span ng-if="!x.team" class="dark-link"><b>Individuals</b></span>\n                </td>\n                <td ng-repeat="amount in x.months track by $index">{{ amount | isoCurrency: settings.billing.currency\n                    }}\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n</div>'), e.put("/app/organization/billing/template.html", '<div class="row">\n    <div class="col-sm-3">\n        <h4 class="rnd-title" title="Billing">Billing</h4>\n        <div class="basic-list-group">\n            <a ng-class="{active:isActive(\'billing\')}" ui-sref="organization.manage.billing.dashboard">Dashboard</a>\n            <a ng-class="{active:isActive(\'plans\')}" ui-sref="organization.manage.billing.plans">Plans\n                <span class="item-count">{{ plansCount }}</span>\n            </a>\n            <a ng-class="{active:isActive(\'invoices\')}" ui-sref="organization.manage.billing.invoices">Invoices\n                <span class="item-count">{{ invoicesCount }}</span>\n            </a>\n            <a ng-class="{active:isActive(\'revenue\')}" ui-sref="organization.manage.billing.revenue">Revenue</a>\n            <hr>\n            <a ui-sref="organization.manage.settings.billing">Settings</a>\n        </div>\n    </div>\n    <div class="col-sm-9">\n        <div ui-view></div>\n    </div>\n</div>'), e.put("/app/organization/calendar/template.html", '<div class="calendar-container">\n    <div class="calendar-left">\n        <h4 class="calendar-header inline">Calendar</h4>\n        <div class="pull-right">\n            <button ng-if="googleIntegrationEnabled" ng-disabled="syncing" type="button" class="btn btn-default btn-sm" ng-click="syncWithGoogle()">{{ syncing ? \'Syncing\' : \'Sync\'}}</button>\n            <button type="button" class="btn btn-primary btn-sm" ng-click="createBooking()">Book</button>\n        </div>\n        <div class="clearfix"></div>\n        <div class="calendar-rooms rnd-container">\n            <div ng-repeat="i in groupedRooms">\n                <h4><a class="office-location" ng-click="filterOffice(i.office._id)">{{ i.office.name }}</a></h4>\n                <div class="calendar-rooms-inner">\n                    <div class="calendar-room-item" ng-repeat="room in i.rooms | orderBy: \'text\'">\n                        <color color="room.color"></color> {{ room.text }}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="calendar-main">\n        <div id="scheduler" kendo-scheduler="container.scheduler" k-options="schedulerOptions"></div>\n    </div>\n</div>\n<event-dialogs></event-dialogs>'), e.put("/app/organization/dashboard.html", '<div class="dashboard-filter">\n    <locations-filter></locations-filter>\n</div>\n<div class="row">\n    <div class="col-sm-3">\n        <h4 class="rnd-title" title="Occupancy"><i class="fa fa-line-chart"></i> Occupancy</h4>\n        <div class="rnd-container">\n            <div class="dashboard-card">\n                <div class="dashboard-row">\n                    <label>Desks</label>\n                    <span>{{ desksCount }}</span>\n                </div>\n                 <div class="dashboard-row">\n                    <label>Total Area</label>\n                    <unit-label target="floor" value="totalArea" scale="largeRound" show-units="true" power="2"></unit-label>\n                </div>\n                <hr>\n                <div class="dashboard-row">\n                    <label>Hot desks</label>\n                    <span>{{ hotdesksCount }}</span>\n                </div>\n                <div class="dashboard-row-group">\n                    <div class="dashboard-row">\n                        <label>Target</label>\n                        <span>{{ targetHotdesksMembershipsCount | number: 0 }}</span>\n                    </div>\n                    <div class="dashboard-row">\n                        <label>Actual</label>\n                        <span>{{ hotdesksMembershipsCount }}</span>\n                    </div>\n                </div>\n                <div class="dashboard-row">\n                    <label>Occupancy</label>\n                    <span>\n                        {{ (hotdesksMembershipsCount / hotdesksCount) * 100 | number : 1 }}%\n                    </span>\n                </div>\n                <hr>\n                <div class="dashboard-row">\n                    <label>Workstations</label>\n                    <span>{{ workstationsCount }}</span>\n                </div>\n                <div class="dashboard-row-group">\n                    <div class="dashboard-row" ng-repeat="status in statuses | orderBy:\'text\'">\n                        <label>{{ ::status.text }}</label>\n                        <span style="color: {{ ::status.color }}">{{ ::status.count }}</span>\n                    </div>\n                </div>\n                <div class="dashboard-row">\n                    <label>Occupancy</label>\n                    <span>\n                        {{ occupancy * 100 | number : 1 }}%\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="col-sm-3">\n        <h4 class="rnd-title" title="Community"><a ui-sref="organization.manage.community.root"><span class="fa fa-users"></span> Community</a></h4>\n        <div class="rnd-container">\n            <div class="dashboard-card">\n                <div class="dashboard-row">\n                    <label>Leads</label>\n                    <span><a ui-sref="organization.manage.community.leads({office: office})">{{totalLeads\n                            }}</a></span>\n                </div>\n                <hr>\n                <div class="dashboard-row">\n                    <label>{{ ::teamProperty.plural }}</label>\n                    <span><a ui-sref="organization.manage.community.teams({office: office})">{{ totalTeams }}</a></span>\n                </div>\n                <div class="dashboard-row-group">\n                    <div class="dashboard-row">\n                        <label>Active</label>\n                        <span><a class="member-status active" ui-sref="organization.manage.community.teams({office: office})">{{ activeTeams }}</a></span>\n                    </div>\n                </div>\n                <hr>\n                <div class="dashboard-row">\n                    <label>Members</label>\n                    <span><a ui-sref="organization.manage.community.members({office: office})">{{ totalMembers }}</a></span>\n                </div>\n                <div class="dashboard-row-group">\n                    <div class="dashboard-row">\n                        <label>Active</label>\n                        <span><a class="member-status active" ui-sref="organization.manage.community.members({office: office})">{{activeMembers}}</a></span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="col-sm-3">\n        <h4 class="rnd-title" title="Plans"><a ui-sref="organization.manage.billing.plans"><span class="fa fa-archive"></span> Plans</a></h4>\n        <div class="rnd-container">\n            <div class="dashboard-card lower-case">\n                <div class="dashboard-row">\n                    <strong><a ui-sref="organization.manage.community.memberships({office: office})">{{ plansCount }}</a></strong>\n                    <label>Membership Plans</label>\n                    <span>{{ actualSum | isoCurrency: currency }}</span>\n                </div>\n                <hr>\n                <div class="dashboard-row" ng-repeat="group in groupedPlans | orderBy: \'plan.price\'">\n                    <strong><a ui-sref="organization.manage.community.memberships({office: office, plan: group.plan._id})">{{ group.count }}</a></strong>\n                    <label>{{ group.plan | formatPlan:currency }}</label>\n                    <span>{{ group.total | isoCurrency: currency }}</span>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="col-sm-3">\n        <h4 class="rnd-title" title="Revenue"><a ui-sref="organization.manage.billing.dashboard"><span class="fa fa-credit-card"></span> Revenue</a></h4>\n        <div class="rnd-container">\n            <div class="dashboard-card" ng-if="settings.billing.enabled">\n                <div class="dashboard-row">\n                    <label>Target Revenue</label>\n                    <span>{{ targetSum | isoCurrency: currency }}</span>\n                </div>\n                <div class="dashboard-row">\n                    <label>Actual Revenue</label>\n                    <span>{{ actualSum | isoCurrency: currency }}</span>\n                </div>\n                <div class="dashboard-row">\n                    <label>Leads</label>\n                    <span>{{ leadsSum | isoCurrency: currency }}</span>\n                </div>\n                <div class="dashboard-row">\n                    <label>Projected Revenue</label>\n                    <span>{{ projectedRevenue | isoCurrency: currency }}</span>\n                </div>\n                <hr>\n                <div class="dashboard-row">\n                    <label>Difference</label>\n                    <span>{{ (actualSum - targetSum) | isoCurrency: currency }} </span>\n                </div>\n                <hr>\n                <div class="dashboard-row">\n                    <label>Cash Occupancy</label>\n                    <span>{{ (actualSum / targetSum) *100 | number: 2 }}%</span>\n                </div>\n                <div class="dashboard-row-group">\n                    <div class="dashboard-row">\n                        <label>Projected</label>\n                        <span>{{ projectedRevenuePercent | number: 2 }}%</span>\n                    </div>\n                </div>\n                <div class="dashboard-row">\n                    <label>Revenue / {{areaLabel}}<sup>2</sup></label>\n                    <span>{{ (actualSum / (totalArea | areaToValue) | isoCurrency: currency)  }}</span>\n                </div>\n            </div>\n            <div ng-hide="settings.billing.enabled">\n                Payments module is disabled. <a ui-sref="organization.manage.settings.community">Enable</a> it to manage your payments.\n            </div>\n        </div>\n    </div>\n</div>\n<div class="row">\n    <div class="col-md-6">\n        <h4 class="rnd-title" title="Utilisation"><i class="fa fa-desktop"></i>\n            <a ui-sref="organization.manage.desks.desks">Workstations</a> Occupancy</h4>\n        <div class="rnd-container">\n            <div class="offset-top">\n                <kendo-chart k-options="occupancyHistoryOptions" k-data-source="occupancyHistory"></kendo-chart>\n            </div>\n        </div>\n    </div>\n    <div class="col-md-6" ng-if="settings.billing.enabled">\n        <h4 class="rnd-title" title="Revenue Projections"><i class="fa fa-bar-chart"></i> <a ui-sref="organization.manage.billing.revenue">Revenue Projections</a></h4>\n        <div class="rnd-container">\n            <div class="offset-top">\n                <kendo-chart k-options="revenueOptions" k-rebind="revenueOptions"></kendo-chart>\n            </div>\n        </div>\n    </div>\n    <div class="col-md-6">\n        <h4 class="rnd-title" title="Hotdesks Occupancy"><i class="fa fa-desktop"></i>\n            <a ui-sref="organization.manage.hotdesks.all">Hotdesks</a> Occupancy</h4>\n        <div class="rnd-container">\n            <div class="offset-top">\n                <kendo-chart k-options="hotdeskOccupancyHistoryOptions" k-rebind="hotdeskOccupancyHistoryOptions"></kendo-chart>\n            </div>\n        </div>\n    </div>\n    <div class="col-md-6" ng-if="settings.billing.enabled">\n        <h4 class="rnd-title" title="Cash Occupancy"><i class="fa fa-money"></i>\n            Cash Occupancy</h4>\n        <div class="rnd-container">\n            <div class="offset-top">\n                <kendo-chart k-options="cashupancyOptions" k-rebind="cashupancyOptions"></kendo-chart>\n            </div>\n        </div>\n    </div>\n</div>'), e.put("/app/organization/members/activityItem.html", '<div>\n    <span class="activity-icon" ng-class="item.type">\n        <i class="fa" ng-class="item.icon"></i>\n    </span>\n    <em>{{ item.moment }}</em>,\n    <strong>\n        <generic-link target="item"></generic-link>\n    </strong> {{ item.text }}\n    <location-link resource="item.resource" office="item.office"></location-link><span class="last-dot">.</span>\n    with plan <expand-plan plan-id="item.plan" no-color="true"></expand-plan>\n</div>'), e.put("/app/organization/members/activityItemsGroup.html", '<div class="activity-compact-list">\n    <span class="activity-icon" ng-class="item.type">\n            <i class="fa" ng-class="item.icon"></i>\n    </span>\n    <em>{{ item.moment }}</em>,\n    {{ item.items.length }}\n    {{ item.text }}\n    <span class="last-dot">.</span>\n</div>'), e.put("/app/organization/members/activityList.html", '<div class="activity">\n    <div class="activity-item" ng-repeat="item in activity">\n        <activity-item ng-if="!item.items" item="item"></activity-item>\n        <activity-items-group ng-if="item.items" item="item"></activity-items-group>\n    </div>\n\n    <p class="no-items-section" ng-if="activity.length===0">\n        There are no activity items.\n    </p>\n</div>'), e.put("/app/organization/members/checkins.html", '<div id="checkin-modal" role="dialog" rnd-modal modal-hidden="cleanUpCheckin()">\n    <form role="form" class="form-horizontal">\n        <div class="modal-dialog modal-sm">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">{{ isCheckin ? \'Check in\' : \'Check out\' }} Member</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label class="col-xs-3 control-label" for="change-member">Member</label>\n\n                        <div class="col-xs-9">\n                            <select id="change-member" class="form-control" kendo-drop-down-list k-ng-model="member._id" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'name\'" k-filter="\'contains\'" k-rebind="member" k-on-change="onMemberChange()" k-data-source="members">\n                            </select>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label class="col-xs-3 control-label" for="start-date">Start</label>\n\n                        <div class="col-xs-9">\n                            <input id="start-date" class="form-control" kendo-date-time-picker k-ng-model="lastCheckin.start" k-format="\'g\'" k-parse-formats="[\'g\', \'yyyy-MM-ddTHH:mm:ss\']">\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label class="col-xs-3 control-label" for="end-date">End</label>\n\n                        <div class="col-xs-9">\n                            <input id="end-date" class="form-control" kendo-date-time-picker k-ng-model="lastCheckin.end" k-format="\'g\'" k-parse-formats="[\'g\', \'yyyy-MM-ddTHH:mm:ss\']">\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <div class="pull-right">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                        <button type="submit" ng-click="confirmCheckin()" class="btn btn-primary">\n                            Done\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n\n<div>\n    <button class="btn btn-primary" ng-click="toggleCheckin()">Check in</button>\n    <search-box model="search.name"></search-box>\n</div>\n\n<div class="rnd-container">\n    <table class="table grouped-table" ng-init="limit = 40" infinite-scroll="limit = limit + 6" infinite-scroll-distance="1">\n        <thead>\n        <th>Member</th>\n        <th>Last seen</th>\n        <th>For</th>\n        <th>Start</th>\n        <th>End</th>\n        </thead>\n        <tbody ng-repeat="status in statuses">\n        <tr>\n            <td colspan="5">\n                <h4>{{status}}</h4>\n            </td>\n        </tr>\n        <tr ng-repeat="mem in members | memberFilter: search | onlineFilter: status | orderBy: \'name\' | limitTo: limit">\n            <td>\n                <a class="grouped-first" ng-click="toggleCheckin(mem)">\n                    <span class="activity-indicator" ng-class="status"></span></a>\n                <a class="dark-link offset5" ui-sref="organization.manage.member({ id: mem._id })">\n                    <span>{{ mem.name }}</span>, <em>{{ mem.info.teamName }}</em>\n                </a>\n            </td>\n            <td>\n                <em ng-init="ls=lastSeen(mem.lastCheckin)" ng-class="{positive: ls===\'Now\'}">{{ ls }}</em>\n            </td>\n            <td>\n                <span>{{ period(mem.lastCheckin) }}</span>\n            </td>\n            <td>\n                <span>{{ mem.lastCheckin.start | date: \'shortTime\' }}</span>\n            </td>\n            <td>\n                <span>{{ mem.lastCheckin.end | date: \'shortTime\' }}</span>\n            </td>\n        </tr>\n        </tbody>\n    </table>\n</div>\n\n<loading ng-if="!membersModel" help="members"></loading>'),
            e.put("/app/organization/members/contacts.html", '<div>\n    <search-box model="search.name"></search-box>\n    <button class="btn btn-primary" ng-click="addContact()">Add contact</button>\n    <button class="btn btn-primary" ng-disabled="!enableExportButton" ng-click="exportContacts()">Export</button>\n</div>\n<div class="rnd-container contacts" ng-if="allContacts && allContacts.length > 0">\n    <div class="rnd-filter-tabs-panel">\n        <label>Contacts</label>\n        <a ng-click="setSearch({ })" ng-class="{ active: isCategorySelected({ }) }">\n            <span class="filter-label">All</span>\n            <strong>{{ allContactsCount }}</strong>\n        </a>\n        <a ng-click="setSearch({ teams: true })" ng-class="{ active: isCategorySelected({ teams: true }) }">\n            <span class="filter-label">Companies</span>\n            <strong>{{ teamsCount }}</strong>\n        </a>\n        <a ng-click="setSearch({ members: true })" ng-class="{ active: isCategorySelected({ members: true }) }">\n            <span class="filter-label">Members</span>\n            <strong>{{ membersCount }}</strong>\n        </a>\n        <a ng-click="setSearch({ leads: true })" ng-class="{ active: isCategorySelected({ leads: true }) }">\n            <span class="filter-label">Leads</span>\n            <strong>{{ leadsCount }}</strong>\n        </a>\n    </div>\n    <table class="table" rnd-sortable="contactsSort">\n        <thead>\n            <th>\n                <input type="checkbox" ng-model="$parent.isSelected">\n                <sortable-header property="name">{{allSelected}} Name</sortable-header>\n            </th>\n            <th>Email</th>\n            <th ng-if="showPhoneNumber">Telephone</th>\n            <th>Social</th>\n        </thead>\n        <tbody ng-init="membersLimit = 20" infinite-scroll="membersLimit = membersLimit + 6" infinite-scroll-distance="1">\n            <tr ng-repeat="contact in allContacts | contactFilter: search | rndSort: contactsSort | limitTo: membersLimit">\n                <td>\n                    <input class="align-top" type="checkbox" ng-model="selected[contact._id]" ng-change="showExportButton()">\n                    <div class="image-table" ng-if="!contact.isTeam">\n                        <user-picture class="profile-sm image-cell" item="contact"></user-picture>\n                        <div class="info-cell">\n                            <member-link class="member-name" member="contact"></member-link>\n                            <p class="member-email"><a ui-sref="organization.manage.team({ team: contact.team })" class="dark-link">{{ contact.info.teamName }}</a></p>\n                        </div>\n                    </div>\n                    <div class="image-table" ng-if="contact.isTeam">\n                        <user-picture class="profile-sm image-cell" item="contact" icon="\'fa-building-o\'"></user-picture>\n                        <div class="info-cell">\n                            <team-link class="member-name" team="contact"></team-link>\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    {{contact.email}}\n                </td>\n                <td ng-if="showPhoneNumber">\n                    {{contact.properties.Phone || \'-\'}}\n                </td>\n                <td>\n                    <social-profiles profiles="contact.socialProfiles"></social-profiles>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n<empty-block ng-if="allContacts && allContacts.length === 0" command="addMember()" header="Add contacts" help="It looks you don\'t have any contacts. Import or add them manually.">\n</empty-block>\n<loading ng-if="!allContacts" help="contacts"></loading>'), e.put("/app/organization/members/contactsDialogs.html", '<div id="contacts-modal" rnd-modal modal-focus="#contact-list" modal-hidden="cleanUpContacts()">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Export contacts</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="contacts-list" class="col-sm-3 control-label">Emails</label>\n\n                        <div class="col-sm-9">\n                            <textarea class="textarea-fixed" id="contacts-list" placeholder="Name">{{emailList}}</textarea>\n                            <button class="btn btn-primary pull-right" ng-click="copyToClipboard()"> Copy to clipboard\n                                <i class="fa fa-files-o"></i>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                    <button type="button" class="btn btn-primary">\n                        <a ng-href="{{downloadHref}}" download="contacts.csv">\n                            Export to CSV\n                        </a>\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>'), e.put("/app/organization/members/exportMembersDialogs.html", '<div id="export-members-modal" rnd-modal modal-focus="#contact-list" modal-hidden="cleanUp()">\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                <h3 class="modal-title">Export {{ contactType }}</h3>\n            </div>\n            <div class="modal-body">\n                <p>Exporting <strong>{{membersCount}}</strong> {{ contactType }}.</p>\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                <button type="button" class="btn btn-primary">\n                    <a ng-href="{{downloadHref}}" download="contacts.csv">\n                        Download CSV\n                    </a>\n                </button>\n            </div>\n        </div>\n    </div>\n</div>'), e.put("/app/organization/members/former.html", '<div>\n    <search-box model="search.name"></search-box>\n</div>\n<div class="rnd-container contacts" ng-if="former && former.length > 0">\n    <div class="rnd-filter-tabs-panel">\n        <label>Former</label>\n        <a ng-click="setSearch({ teams: true })" ng-class="{ active: search.teams }">\n            <span class="filter-label">Companies</span>\n        </a>\n        <a ng-click="setSearch({ members: true })" ng-class="{ active: search.members }">\n            <span class="filter-label">Members</span>\n        </a>\n    </div>\n    <table class="table" rnd-sortable="contactsSort">\n        <thead>\n            <th>\n                <sortable-header property="name">{{allSelected}} Name</sortable-header>\n            </th>\n            <th>Email</th>\n            <th ng-if="showPhoneNumber">Telephone</th>\n            <th>Social</th>\n        </thead>\n        <tbody ng-init="limit = 20" infinite-scroll="limit = limit + 6" infinite-scroll-distance="1">\n            <tr ng-repeat="contact in former | contactFilter: search | rndSort: contactsSort | limitTo: limit">\n                <td>\n                    <div class="image-table" ng-if="!contact.info.members">\n                        <user-picture class="profile-sm image-cell" item="contact"></user-picture>\n                        <div class="info-cell">\n                            <member-link class="member-name" member="contact"></member-link>\n                            <p class="member-email"><a ui-sref="organization.manage.team({ team: contact.team })" class="dark-link">{{ contact.info.teamName }}</a></p>\n                        </div>\n                    </div>\n                    <div class="image-table" ng-if="contact.info.members">\n                        <user-picture class="profile-sm image-cell" item="contact" icon="\'fa-building-o\'"></user-picture>\n                        <div class="info-cell">\n                            <team-link class="member-name" team="contact"></team-link>\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    {{contact.email}}\n                </td>\n                <td ng-if="showPhoneNumber">\n                    {{contact.properties.Phone || \'-\'}}\n                </td>\n                <td>\n                    <social-profiles profiles="contact.socialProfiles"></social-profiles>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n<empty-block ng-if="former && former.length === 0" command="addMember()" header="Add contacts" help="It looks you don\'t have any former members. Import or add them manually.">\n</empty-block>\n<loading ng-if="!former" help="contacts"></loading>'), e.put("/app/organization/members/history.html", '<h4 class="rnd-title" title="History">History</h4>\n<div class="rnd-container" ng-if="activity.length > 0">\n\n</div>\n\n<empty-block help="Currently there are no activity records."></empty-block>\n\n'), e.put("/app/organization/members/leads.html", '<div>\n    <search-box model="search.name"></search-box>\n    <button class="btn btn-primary" ng-click="addLead()">Add lead</button>\n    <locations-filter></locations-filter>\n</div>\n<div class="rnd-container" ng-if="leads && leads.length > 0">\n    <table class="table" ng-init="limit = 40" infinite-scroll="limit = limit + 6" infinite-scroll-distance="1" rnd-sortable="leadsSort" sortable-default="name">\n        <thead>\n            <th>\n                <sortable-header property="info.contact.name">Name</sortable-header>\n            </th>\n            <th>\n                <sortable-header property="status">Status</sortable-header>\n            </th>\n            <th>\n                <sortable-header property="dealSize">Deal Size</sortable-header>\n            </th>\n            <th>Location</th>\n        </thead>\n        <tbody>\n            <tr ng-repeat="lead in leads | filter:search | rndSort: leadsSort | limitTo: limit">\n                <td>\n                    <contact-profile contact="lead.info.contact"></contact-profile>\n                    <div class="dropdown room-menu">\n                        <button class="btn-icon dropdown-toggle" type="button" id="editMenu" data-toggle="dropdown">\n                            <i class="fa fa-cog"></i>\n                        </button>\n                        <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMenu">\n                            <li role="presentation">\n                                <a role="menuitem" tabindex="-1" ng-click="editLead(lead)">\n                                    <span class="fa fa-pencil"></span> Edit\n                                </a>\n                            </li>\n                            <li class="divider"></li>\n                            <li role="presentation">\n                                <a role="menuitem" tabindex="-1" ng-click="deleteLead(lead)">\n                                    <span class="fa fa-trash-o"></span> Delete\n                                </a>\n                            </li>\n                        </ul>\n                    </div>\n                </td>\n                <td><span class="lead-status" ng-class="lead.status">{{ lead.status | capitalize }}</span></td>\n                <td>{{ lead.dealSize | isoCurrency: org.settings.billing.currency}}</td>\n                <td>\n                    <location-link office="lead.office"></location-link>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n<empty-block ng-if="leads && leads.length === 0" command="addLead()" header="Add lead" help="It looks you don\'t have any leads.">\n</empty-block>\n<loading ng-if="!leads" help="leads"></loading>'), e.put("/app/organization/members/member.html", '<div class="row">\n    <div class="col-md-3">\n        <div>\n            <h4 class="rnd-title" title="Members details">Member</h4>\n            <div class="dropdown pull-right">\n                <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="editMenu" data-toggle="dropdown">\n                    <i class="fa fa-cog"></i> Actions\n                    <span class="caret"></span>\n                </button>\n                <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMenu">\n                    <li role="presentation">\n                        <a role="menuitem" tabindex="-1" ng-click="editMember(member)">\n                            <span class="fa fa-pencil"></span> Edit\n                        </a>\n                    </li>\n                    <li role="presentation" ng-if="userStatus === \'enabled\'">\n                        <a role="menuitem" tabindex="-1" title="Suspend Member Access" ng-click="disableUser()">\n                            <span class="fa fa-user-times"></span> Disable User\n                        </a>\n                    </li>\n                    <li role="presentation" ng-if="userStatus !== \'enabled\'">\n                        <a role="menuitem" tabindex="-1" title="Activate User" ng-click="enableUser()">\n                            <span class="fa fa-user-plus"></span> Enable User\n                        </a>\n                    </li>\n                    <li class="divider"></li>\n                    <li role="presentation">\n                        <a role="menuitem" tabindex="-1" ng-click="deleteMember(member)">\n                            <i class="fa fa-trash-o"></i> Delete\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div class="rnd-container member-card">\n            <div class="image-table">\n                <user-picture class="profile-lg image-cell" item="member"></user-picture>\n                <div class="info-cell">\n                    <h3 class="member-header">{{ member.name }}</h3>\n                    <p class="member-email">{{ member.email }}</p>\n                    <p class="member-company"><a ui-sref="organization.manage.team({ team: member.team })" class="dark-link">{{ member.info.teamName\n                    }}</a></p>\n                </div>\n            </div>\n            <social-profiles profiles="member.socialProfiles"></social-profiles>\n            <p class="member-description" ng-if="member.description" ng-bind-html="trustAsHtml(member.description)"></p>\n            <hr>\n            <p class="member-info">\n                <label><i class="fa fa-map-marker"></i> Location</label>\n                <location-link class="member-info-value member-locations" resource="member.info.membership.resource" office="member.info.membership.office" empty="Not assigned"></location-link>\n            </p>\n            <hr>\n            <p class="member-info">\n                <label><i class="fa fa-clock-o"></i> Status</label>\n                <span class="member-info-value member-status" ng-class="member.info.status">{{ member.info.status | capitalize }}</span>\n            </p>\n            <p class="member-info">\n                <label><i class="fa fa-calendar-o"></i> Joined</label>\n                <span class="member-info-value">{{ member.info.membership | formatDateInterval: \'mediumDate\' }}</span>\n            </p>\n            <p class="member-info" ng-repeat="prop in org.customProperties | filter: \'member\'" ng-if="member.properties[prop.title]">\n                <label><i class="fa fa-th-list"></i> {{ prop.title }}</label>\n                <span class="member-info-value">{{ member.properties[prop.title] }}</span>\n            </p>\n            <p class="member-info" ng-if="userStatus">\n                <label><i class="fa fa-user"></i> User</label>\n                <span class="member-info-value user-status" ng-class="userStatus">{{ userStatus | capitalize }}</span>\n                <button ng-if="userStatus !== \'enabled\'" class="btn btn-default btn-sm" title="{{ member.email ? \'Enable\' : \'Email is required to activate user\' }}" ng-click="enableUser()" ng-disabled="!member.email">\n                    Enable\n                </button>\n            </p>\n            <p class="member-info" ng-if="!member.team && stripeIntegration.enabled">\n                <label><i class="fa fa-credit-card"></i> Billing details</label>\n                <span class="member-info-value" ng-if="member.billing.length > 0">**** **** **** {{ member.billing[0].card.last4 }} ({{ member.billing[0].card.brand }})</span>\n                <span class="member-info-value" ng-if="member.billing.length === 0">Not provided</span>\n                <button ng-if="member.billing.length === 0" class="btn btn-default btn-sm" title="Add billing details" ng-click="addBillingDetails()">\n                    Add\n                </button>\n            </p>\n        </div>\n    </div>\n    <div class="col-md-9">\n        <div>\n            <h4 class="rnd-title" title="Plans">Plans</h4>\n            <button class="btn btn-primary btn-sm" ng-if="selectedMemberships.length > 0" ng-click="deleteMemberships(selectedMemberships)">Delete\n            </button>\n            <memberships-list memberships="member.info.memberships" show-status="true" selected-items="selectedMemberships"></memberships-list>\n        </div>\n        <bookings-list member="member._id"></bookings-list>\n        <div ng-if="settings.billing.invoicing !== \'none\'">\n            <h4 class="rnd-title inline" title="Payments">Invoices</h4>\n            <button type="button" class="btn btn-primary btn-sm" ng-if="perm>1 && !member.team" ng-click="addInvoice({ member: member._id })">Add invoice\n            </button>\n            <div class="rnd-container">\n                <payments-list ng-if="member && !member.team" member="member"></payments-list>\n                <span class="text-muted" ng-if="member.team"><i>Invoicing is handled by\n                    <strong>\n                        <team-link team="{ _id: member.team, name: member.info.teamName }"></team-link>\n                    </strong><span class="last-dot">.</span></i>\n                </span>\n            </div>\n        </div>\n        <div>\n            <h4 class="rnd-title" title="Activity">Activity</h4>\n            <div class="rnd-container">\n                <activity-list memberships="member.info.memberships"></activity-list>\n            </div>\n        </div>\n    </div>\n</div>'), e.put("/app/organization/members/members.html", '<div>\n    <search-box model="search.name"></search-box>\n    <button class="btn btn-primary" ng-click="addMember()">Add member</button>\n    <button class="btn btn-primary" ng-click="exportMembers()">Export</button>\n    <locations-filter></locations-filter>\n</div>\n<div class="rnd-container" ng-if="membersModel && membersModel.items.length > 0">\n    \n    <table class="table" rnd-sortable="membersSort" sortable-default="name" default-sort="name" ng-init="membersLimit = 20" infinite-scroll="membersLimit = membersLimit + 6" infinite-scroll-distance="1">\n        <thead>\n            <th>\n                <sortable-header property="name">Name</sortable-header>\n            </th>\n            <th>\n                <sortable-header property="info.teamName">{{ ::teamProperty.name }}</sortable-header>\n            </th>\n            <th>\n                <sortable-header property="info.status">Status</sortable-header>\n            </th>\n            <th ng-if="settings.billing.enabled">Plan</th>\n            <th>\n                <sortable-header property="info.membership.startDate">Period</sortable-header>\n            </th>\n            <th>Location</th>\n        </thead>\n        <tbody>\n            <tr ng-repeat="mem in members | memberFilter: search | rndSort: membersSort | limitTo: membersLimit">\n                <td hover-action action="editMember(mem)" icon="pencil">\n                    <contact-profile contact="mem"></contact-profile>\n                </td>\n                <td>\n                    <a ui-sref="organization.manage.team({ team: mem.team })" class="dark-link">{{ mem.info.teamName }}</a>\n                </td>\n                <td><span class="member-info-value member-status" ng-class="mem.info.status">{{ mem.info.status | capitalize }}</span>\n                </td>\n                <td ng-if="settings.billing.enabled">\n                    <expand-plan membership="mem.info.membership" price="true"></expand-plan>\n                </td>\n                <td><span class="membership-period">{{ mem.info.membership | formatDateInterval: \'mediumDate\' }}</span></td>\n                <td>\n                    <location-link resource="mem.info.membership.resource" office="mem.info.membership.office"></location-link>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n<empty-block ng-if="membersModel && membersModel.items.length === 0" command="addMember()" header="Add member" help="It looks you don\'t have any members. Import or add them manually.">\n</empty-block>\n<loading ng-if="!membersModel" help="members"></loading>'), e.put("/app/organization/members/memberships.html", '<div class="rnd-container-header-panel">\n    <button class="btn btn-primary" ng-if="memberships.length > 0" ng-disabled="selectedMemberships.length === 0" ng-click="deleteMemberships(selectedMemberships)">Delete</button>\n    <locations-filter></locations-filter>\n    <a class="pull-right btn-icon btn-actions" ui-sref="organization.manage.billing.plans">Manage plans</a>\n\n    <div class="clearfix"></div>\n</div>\n\n<memberships-list show-target="true" show-target-team="true" show-plans-filter="true" show-status="true" sort-by="target" memberships="memberships" selected-items="selectedMemberships"></memberships-list>\n\n<empty-block ng-if="memberships && memberships.length === 0" help="It looks you don\'t have any active membership plans.">\n</empty-block>\n\n<loading ng-if="!memberships" help="membership plans"></loading>'), e.put("/app/organization/members/membershipsList.html", '<div class="rnd-container">\n    <div ng-if="memberships.length>0">\n        <select id="target-plan" class="form-control" ng-if="showPlansFilter" kendo-drop-down-list k-ng-model="search.plan" k-rebind="plans && search" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'label\'" k-option-label="{ label: \'All Plans\', _id: null }" k-on-change="applyPlanFilter()" k-data-source="plans">\n        </select>\n        <status-filter type="membership" items="memberships"></status-filter>\n\n        <table class="table" ng-init="limit = 40" infinite-scroll="limit = limit + 6" infinite-scroll-distance="1" rnd-sortable="membershipsSort" default-sort="sortBy">\n            <thead>\n            <th ng-show="settings.billing.enabled">\n                <input type="checkbox" ng-model="$parent.isSelected">\n                <sortable-header property="plan" value-selector="getPlanPrice">Plan</sortable-header>\n            </th>\n            <th ng-if="showTarget"><sortable-header property="target" value-selector="getTargetName">Member</sortable-header></th>\n            <th ng-if="showStatus"><sortable-header property="status" value-selector="getStatus">Status</sortable-header></th>\n            <th><sortable-header property="startDate" value-selector="startDate">Period</sortable-header></th>\n            <th><sortable-header property="location" value-selector="getLocationName">Location</sortable-header></th>\n            </thead>\n            <tbody>\n            <tr ng-repeat="membership in memberships | membershipFilter: search | rndSort: membershipsSort | limitTo: limit">\n                <td ng-show="settings.billing.enabled">\n                    <input type="checkbox" ng-model="selected[membership._id]">\n                    <expand-plan membership="membership" menu="perm>1"></expand-plan>\n                </td>\n                <td ng-if="showTarget">\n                    <generic-link target="membership" hide-team="!showTargetTeam"></generic-link>\n                    <button class="btn btn-default btn-sm" ng-if="!showTargetTeam && !membership.member && isDeskPlan(membership.plan)" ng-click="assignMemberToPlan(membership)">Assign</button>\n                </td>\n                <td ng-if="showStatus">\n                    <span class="member-info-value member-status" ng-class="membership.info.status">{{ membership.info.status | capitalize }}</span>\n                </td>\n                <td>\n                    <span class="member-info-value membership-period">{{ membership | formatDateInterval: \'mediumDate\' }}</span>\n                </td>\n                <td>\n                    <location-link resource="membership.resource" office="membership.office" empty="-"></location-link>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n    <p class="no-items-section" ng-if="memberships.length===0">\n        There are no plans.\n    </p>\n</div>'), e.put("/app/organization/members/statusFilter.html", '<div class="rnd-filter-tabs-panel">\n    <label ng-if="label">{{label}} </label>\n    <a ng-click="search.status = undefined" ng-class="{ active: !search.status }"><span class="filter-label">Active</span>\n        <strong>{{active}}</strong></a>\n\n    <a ng-if="terminated" ng-click="search.status = \'terminated\'" ng-class="{ active: search.status === \'terminated\'}"><span class="filter-label">Terminated</span>\n        <strong>{{terminated}}</strong></a>\n</div>'), e.put("/app/organization/members/team.html", '<div class="row">\n    <div class="col-md-3">\n        <div>\n            <h4 class="rnd-title" title="{{ ::teamProperty.name }}">{{ ::teamProperty.name }}</h4>\n            <div class="dropdown pull-right" ng-if="perm>1">\n                <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="editTeamMenu" data-toggle="dropdown">\n                    <i class="fa fa-cog"></i> Actions\n                    <span class="caret"></span>\n                </button>\n                <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editTeamMenu">\n                    <li role="presentation">\n                        <a role="menuitem" tabindex="-1" ng-click="editTeam(team)"> <span class="fa fa-pencil"></span> Edit</a>\n                    </li>\n                    <li class="divider"></li>\n                    <li role="presentation">\n                        <a role="menuitem" tabindex="-1" ng-click="addMember({ team: team._id })"><span class="fa fa-user-plus"></span> Add member</a>\n                    </li>\n                    <li role="presentation" ng-if="settings.billing.enabled">\n                        <a role="menuitem" tabindex="-1" ng-click="addMembershipForTeam(team)"><span class="fa fa-money"></span> Add plan</a>\n                    </li>\n                    <li role="presentation" ng-if="settings.contracts.enabled && team.info.status === \'active\'">\n                        <a role="menuitem" tabindex="-1" ng-click="generateContract(team)">\n                            <span class="fa fa-file-pdf-o"></span> Generate contract\n                        </a>\n                    </li>\n                    <li class="divider"></li>\n                    <li role="presentation" ng-class="{disabled: team.info.status !== \'active\'}">\n                        <a role="menuitem" tabindex="-1" ng-click="endTeamMemberships(team)">\n                            <i class="fa fa-user-times"></i> Terminate\n                        </a>\n                    </li>\n                    <li role="presentation">\n                        <a role="menuitem" tabindex="-1" ng-click="deleteTeam(team)">\n                            <i class="fa fa-trash-o"></i> Delete\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div class="rnd-container member-card">\n            <div class="image-table">\n                <user-picture class="profile-lg image-cell" item="team" icon="\'fa-building-o\'"></user-picture>\n                <div class="info-cell">\n                    <h3 class="member-header">{{ team.name }}</h3>\n                    <p class="member-email">{{ team.email || \'no email\' }}</p>\n                    <p ng-if="team.twitterHandle" class="member-description">\n                        <a ng-href="https://twitter.com/{{team.twitterHandle}}" target="_blank"><span class="member-info-value"><i class="fa fa-twitter"></i> {{team.twitterHandle}}</span></a>\n                    </p>\n                </div>\n            </div>\n            <p class="member-description" ng-if="team.twitterInfo.description">{{ team.twitterInfo.description }}</p>\n            <hr>\n            <p class="member-info">\n                <label><i class="fa fa-map-marker"></i> Location</label>\n                <span class="member-info-value member-locations">\n                    <location-link resource="location" office="office" empty="Not assigned" team="team"></location-link>\n                </span>\n            </p>\n            <hr>\n            <p class="member-info">\n                <label><i class="fa fa-clock-o"></i> Status</label>\n                <span class="member-info-value member-status" ng-class="team.info.status">{{ team.info.status | capitalize }}</span>\n            </p>\n            <p class="member-info" ng-if="team.startDate">\n                <label><i class="fa fa-calendar-o"></i> Joined</label>\n                <span class="member-info-value">{{ team.startDate | date:\'mediumDate\' }}</span>\n            </p>\n            <p class="member-info">\n                <label><i class="fa fa-users"></i> Members</label>\n                <span class="member-info-value">{{ team.info.members.length }}</span>\n            </p>\n            <p class="member-info" ng-if="settings.billing.enabled">\n                <label><i class="fa fa-desktop"></i> Active Plans</label>\n                <span class="member-info-value">{{ team.info.activePlans.length }}</span>\n            </p>\n            <p class="member-info" ng-if="settings.billing.enabled">\n                <label><i class="fa fa-print"></i> Active Services</label>\n                <span class="member-info-value">{{ team.info.activeServices.length }}</span>\n            </p>\n            <p class="member-info">\n                <label><i class="fa fa-laptop"></i> Desks</label>\n                <span class="member-info-value">{{ ::desksCount }}</span>\n            </p>\n            <p class="member-info" title="Monthly Recurring Revenue" ng-if="settings.billing.enabled">\n                <label><i class="fa fa-money"></i> MRR</label>\n                <strong class="member-info-value">{{ mrr | isoCurrency: currency }}</strong>\n            </p>\n            <p class="member-info" ng-if="team.properties.xero_url">\n                <a ng-href="{{ team.properties.xero_url }}" target="_blank" class="dark-link"><i class="fa fa-file-pdf-o"></i>Open in Xero</a>\n            </p>\n            <p class="member-info" ng-if="settings.contracts.enabled && team.info.status === \'active\'">\n                <label><i class="fa fa-file-pdf-o"></i> Contract</label>\n                <span class="member-info-value member-status">\n                    <a tabindex="-1" href="{{org.slug}}/{{team._id}}/contract" target="_blank" title="Preview">Preview</a>,\n                    <a tabindex="-1" ng-href="{{ team.contractUrl }}" target="_blank" title="Download" ng-if="team.contractUrl">\n                        Download\n                    </a>\n                    <a tabindex="-1" ng-click="generateContract(team)" target="_blank" title="Generate" ng-if="!team.contractUrl">\n                        Generate\n                    </a>\n                </span>\n            </p>\n            <p class="member-info" ng-repeat="prop in org.customProperties | filter: \'team\'" ng-if="team.properties[prop.title]">\n                <label><i class="fa fa-th-list"></i> {{ prop.title }}</label>\n                <span class="member-info-value">{{ team.properties[prop.title] }}</span>\n            </p>\n        </div>\n    </div>\n    <div class="col-md-9">\n        <div>\n            <h4 class="rnd-title inline" title="Members">Members</h4>\n            <button type="button" class="btn btn-primary btn-sm" ng-if="perm>1" ng-click="addMember({ team: team._id })">Add member\n            </button>\n            <div class="rnd-container">\n                <table class="table" ng-if="team.info.members.length>0" rnd-sortable="membersSort" sortable-default="name">\n                    <thead>\n                        <th>\n                            <sortable-header property="name">Name</sortable-header>\n                        </th>\n                        <th>\n                            <sortable-header property="info.status">Status</sortable-header>\n                        </th>\n                        <th ng-if="hasAnyMembersWithPosition(team.info.members)">Position</th>\n                        <th ng-if="hasAnyDeskMembers(team.info.members)">Location</th>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat="mem in team.info.members | rndSort: membersSort">\n                            <td class="team-poc-column">\n                                <span ng-if="mem._id ===  team.personOfContact" class="team-poc-icon fa-stack" title="Main contact">\n                                <i class="background fa fa-star fa-stack-1x"></i>\n                                <i class="fa fa-star-o fa-stack-1x"></i>\n                            </span>\n                                <contact-profile contact="mem"></contact-profile>\n                                <div class="dropdown room-menu" ng-if="perm>1">\n                                    <button class="btn-icon dropdown-toggle" type="button" id="editMemberMenu" data-toggle="dropdown">\n                                        <i class="fa fa-cog"></i>\n                                    </button>\n                                    <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMemberMenu">\n                                        <li role="presentation">\n                                            <a role="menuitem" tabindex="-1" ng-click="editMember(mem)"> <span class="fa fa-pencil"></span> Edit</a>\n                                        </li>\n                                        <li role="presentation">\n                                            <a role="menuitem" tabindex="-1" ng-click="setMemberAsPOC(team, mem)" title="Set as main contact" ng-if="team.personOfContact !== mem._id"><span class="fa fa-star-o"></span> Main contact</a>\n                                        </li>\n                                        <li class="divider"></li>\n                                        <li role="presentation">\n                                            <a role="menuitem" tabindex="-1" ng-click="deleteMember(mem)">\n                                                <i class="fa fa-trash-o"></i> Delete\n                                            </a>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </td>\n                            <td>\n                                <span class="member-info-value member-status" ng-class="mem.info.status">{{ mem.info.status | capitalize }}</span>\n                            </td>\n                            <td ng-if="hasAnyMembersWithPosition(team.info.members)">\n                                <span class="member-info-value">{{ getPositionPropertyValue(mem) }}</span>\n                                <span class="member-info-value" ng-if="!getPositionPropertyValue(mem)">-</span>\n                            </td>\n                            <td ng-if="hasAnyDeskMembers(team.info.members)">\n                                <location-link ng-if="mem.info.status !== \'terminated\'" resource="mem.info.membership.resource" office="mem.info.membership.office" empty="-"></location-link>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n                <p class="no-items-section" ng-if="team.info.members.length===0">\n                    There are no members.\n                </p>\n            </div>\n        </div>\n        <div ng-if="lead">\n            <h4 class="rnd-title inline" title="Requested Plans & Services">Requested Plans & Services</h4>\n            <button class="btn btn-primary btn-sm" ng-click="approvePlans(lead, team)">Approve</button>\n            <div class="rnd-container">\n                <table class="table">\n                    <thead>\n                        <th>Plan</th>\n                        <th>Start Date</th>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat="plan in lead.requestedPlans track by $index">\n                            <td>\n                                <expand-plan plan-id="plan" menu="false"></expand-plan>\n                            </td>\n                            <td>\n                                <span class="member-info-value membership-period">{{ lead.startDate | date:\'mediumDate\'  }}</span>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <div ng-if="!lead">\n            <h4 class="rnd-title inline" title="Plans & Services">Plans & Services</h4>\n            <button type="button" class="btn btn-primary btn-sm" ng-if="perm>1" ng-click="addMembershipForTeam(team)">\n                Add plan\n            </button>\n            <button class="btn btn-primary btn-sm" ng-if="selectedMemberships.length > 0" ng-click="deleteMemberships(selectedMemberships)">Delete\n            </button>\n            <memberships-list memberships="allMemberships" show-target="true" show-target-team="false" selected-items="selectedMemberships"></memberships-list>\n        </div>\n\n        <bookings-list team="team._id"></bookings-list>\n\n        <div ng-if="settings.billing.invoicing !== \'none\' && team.info.status !== \'lead\'">\n            <h4 class="rnd-title inline" title="Payments">Invoices</h4>\n            <button type="button" class="btn btn-primary btn-sm" ng-if="perm>1" ng-click="addInvoice({team: team._id})">\n                Add invoice\n            </button>\n            <button class="btn btn-primary btn-sm" title="Delete Selected Invoices" ng-if="perm>1 && selectedInvoices.length > 0" ng-click="deleteInvoices(selectedInvoices)">Delete</button>\n            <div class="rnd-container">\n                <payments-list team="team" selected-items="selectedInvoices"></payments-list>\n            </div>\n        </div>\n\n        <div ng-if="stripeIntegration.enabled">\n            <h4 class="rnd-title inline" title="Billing Details">Billing Details</h4>\n            <button class="btn btn-primary btn-sm" ng-click="addCardDetails()">Add Credit Card</button>\n            <button class="btn btn-primary btn-sm" ng-click="addBankDetails()">Add Bank Account</button>\n            <billing-details-list team="team"></billing-details-list>\n        </div>\n        <div>\n            <h4 class="rnd-title" title="Activity">Activity</h4>\n            <div class="rnd-container">\n                <activity-list memberships="allMemberships"></activity-list>\n            </div>\n        </div>\n    </div>\n</div>'),
            e.put("/app/organization/members/teams.html", '<div>\n    \n    <search-box model="search.name"></search-box>\n    <button class="btn btn-primary" ng-click="addTeam()">Add {{ ::teamProperty.name | lowercase }}</button>\n    <button class="btn btn-primary" ng-click="exportTeams()">Export</button>\n    <locations-filter></locations-filter>\n</div>\n<div class="rnd-container" ng-if="teams && teams.length > 0">\n    <table class="table" ng-init="limit = 40" infinite-scroll="limit = limit + 6" infinite-scroll-distance="1" rnd-sortable="teamsSort" sortable-default="name">\n        <thead>\n            <th>\n                <sortable-header property="name">Name</sortable-header>\n            </th>\n            <th>\n                <sortable-header property="info.status">Status</sortable-header>\n            </th>\n            <th>\n                <sortable-header property="info.members.length">Members</sortable-header>\n            </th>\n            <th>\n                <sortable-header property="info.activePlans.length">Plans</sortable-header>\n            </th>\n            <th title="Monthly Recurring Revenue">\n                <sortable-header value-selector="getMrr">MRR</sortable-header>\n            </th>\n        </thead>\n        <tbody>\n            <tr ng-repeat="team in teams | teamFilter:search | rndSort: teamsSort | limitTo: limit">\n                <td hover-action action="editTeam(team)" icon="pencil">\n                    <div class="image-table">\n                        <user-picture class="profile-sm image-cell" item="team" icon="\'fa-building-o\'"></user-picture>\n                        <div class="info-cell">\n                            <team-link team="team"></team-link>\n                            <p class="member-email">{{ team.email || \'no email\'}}</p>\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    <span class="member-status" ng-class="team.info.status">{{ team.info.status | capitalize }}</span>\n                    <p class="member-payment-status" ng-if="paymentsEnabled">\n                        <i ng-if="team.billing.length === 0" class="fa fa-exclamation-triangle" title="Missing payment provider"></i>\n                        <span>{{ paymentStatus(team) | capitalize }}</span>\n                    </p>\n                </td>\n                <td>{{ team.info.members.length }}</td>\n                <td>\n                    {{ team.info.activePlans.length }}\n                </td>\n                <td>\n                    {{ getMrr(team) | isoCurrency: currency }}\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n<empty-block ng-if="teams && teams.length === 0" command="addTeam()" header="Add {{ ::teamProperty.name | lowercase }}" help="It looks you don\'t have active members.">\n</empty-block>\n<loading ng-if="!teams" help="{{ ::teamProperty.plural | lowercase }}"></loading>'), e.put("/app/organization/members/template.html", '<div class="row">\n    <div class="col-sm-3">\n        <h4 class="rnd-title" title="Members">Community</h4>\n        <div class="basic-list-group">\n            <a ng-class="{active:isActive(\'teams\')}" ui-sref="organization.manage.community.teams">{{ ::teamProperty.plural }}\n                <span class="item-count">{{ teamsCount }}</span>\n            </a>\n            <a ng-class="{active:isActive(\'members\')}" ui-sref="organization.manage.community.members">Members\n                <span class="item-count">{{ membersCount }}</span>\n            </a>\n            <a ng-class="{active:isActive(\'leads\')}" ui-sref="organization.manage.community.leads">Leads\n                <span class="item-count">{{ leadsCount }}</span>\n            </a>\n            <a ng-class="{active:isActive(\'contacts\')}" ui-sref="organization.manage.community.contacts">Contacts\n                <span class="item-count">{{ allContactsCount }}</span>\n            </a>\n            <a ng-class="{active:isActive(\'memberships\')}" ui-sref="organization.manage.community.memberships">Memberships\n                <span class="item-count">{{ membershipsCount }}</span>\n            </a>\n            <a ng-class="{active:isActive(\'former\')}" ui-sref="organization.manage.community.former">Former Members</a>\n            <a ng-class="{active:isActive(\'checkins\')}" ng-if="settings.occupancy.enabled" ui-sref="organization.manage.community.checkins">Checkins</a>\n\n            <hr>\n            <a ui-sref="organization.manage.settings.community">Settings</a>\n        </div>\n    </div>\n    <div class="col-sm-9">\n        <div ui-view></div>\n    </div>\n</div>'), e.put("/app/organization/members/wall.html", '<div>\n    <search-box model="search.name"></search-box>\n</div>\n<div class="member-col" ng-repeat="team in teams | teamFilter: search | orderBy: \'name\'">\n    <wall-team team="team" members="team.info.members" search="search"></wall-team>\n</div>\n\n<div class="member-col" ng-if="individualMembers.length > 0">\n    <wall-team members="individualMembers" search="search"></wall-team>\n</div>'), e.put("/app/organization/settings/admin.html", '<div id="user-modal" rnd-modal modal-focus="#user-email" modal-hidden="cleanupPermission()">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">{{originalPermission ? \'Edit Permission\' : \'Invite Teammate\'}}</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="user-member" class="col-sm-3 control-label">Contact</label>\n\n                        <div class="col-sm-9" ng-if="!member">\n                            <select class="form-control" kendo-drop-down-list k-ng-model="permission.contact" k-data-source="members" k-data-text-field="\'name\'" k-data-value-field="\'_id\'" k-rebind="permission.contact" k-value-primitive="true" k-option-label="{ name: \'Add new...\' }">\n                            </select>\n                        </div>\n\n                        <div class="col-sm-9" ng-if="member">\n                            <contact-profile contact="member" no-link></contact-profile>\n                        </div>\n                    </div>\n\n                    <div class="form-group" ng-if="!member && !permission.contact">\n                        <label for="user-name" class="col-sm-3 control-label">Name</label>\n\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" ng-model="permission.name" id="user-name" placeholder="John Doe">\n                        </div>\n                    </div>\n\n                    <div class="form-group" ng-if="!member && !permission.contact">\n                        <label for="user-email" class="col-sm-3 control-label">Email</label>\n\n                        <div class="col-sm-9">\n                            <input type="email" class="form-control" ng-model="permission.email" id="user-email" placeholder="Invite user by email">\n                        </div>\n                    </div>\n\n\n                    <div class="form-group">\n                        <label class="col-sm-3 control-label">Role</label>\n\n                        <div class="col-sm-9">\n                            <div class="role-radios" ng-repeat="role in permissionsModel.roles">\n                                <input ng-model="permission.role" id="role-{{ ::role.name }}" type="radio" name="role" value="{{ ::role.name }}">\n                                <label for="role-{{ ::role.name }}" title="{{ ::role.description }}">\n                                    {{ ::role.name }}\n                                </label>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                    <button type="submit" class="btn btn-primary" ng-click="commitPermission()" ng-if="!originalPermission" ng-disabled="!permission.contact && !permission.email">Add\n                    </button>\n                    <button type="submit" class="btn btn-primary" ng-click="commitPermission()" ng-if="originalPermission">Update\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n\n<div id="add-access-key-modal" rnd-modal class="modal fade" modal-focus="#access-key-name">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Add Access Key</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="access-key-name" class="col-sm-3 control-label">Name</label>\n\n                        <div class="col-sm-9">\n                            <input id="access-key-name" class="form-control" ng-model="newAccessKey.name" placeholder="Example: Members portal" required autofocus>\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                    <button type="submit" class="btn btn-primary" ng-click="addAccessKey()" data-dismiss="modal">\n                        Add\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n\n<h4 class="rnd-title">Teammates</h4>\n\n<div class="pull-right">\n    <button class="btn btn-primary" ng-click="addPermission()">Add Teammate</button>\n</div>\n\n<div class="rnd-container">\n    <table class="table">\n        <thead>\n        <th>Name</th>\n        <th>Role</th>\n        </thead>\n        <tbody>\n        <tr ng-repeat="permission in permissionsModel.items | filter: adminMember ">\n            <td hover-action action="editMember(findMember(permission))" icon="pencil">\n                <contact-profile contact="findMember(permission)"></contact-profile>\n            </td>\n            <td>\n                {{permission.role}}\n\n                <div class="dropdown room-menu">\n                    <button class="btn-icon dropdown-toggle" type="button" id="editMenu" data-toggle="dropdown">\n                        <i class="fa fa-cog"></i>\n                    </button>\n                    <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMenu">\n                        <li role="presentation"><a role="menuitem" tabindex="-1" ng-click="editPermission(permission)"> <span class="fa fa-pencil"></span> Edit</a></li>\n                        <li role="presentation" ng-hide="isMe(permission.user)"><a role="menuitem" tabindex="-1" ng-click="deletePermission(permission)"><span class="fa fa-times"></span> Delete</a></li>\n                    </ul>\n                </div>\n            </td>\n        </tr>\n        </tbody>\n    </table>\n</div>\n\n<div class="panel panel-info" ng-if="perm === 4">\n    <div class="panel-heading">Manage Access Keys\n        <button class="btn-icon pull-right" ng-click="toggleExpandAccessKeys()">\n            <i class="fa fa-chevron-{{ accessKeysVisible ? \'up\': \'down\' }}"></i>\n        </button>\n    </div>\n    <div class="panel-body">\n        <p>Everybody will be able to access the organization with these keys like they are user, which is\n            part\n            of the organization with the respective role. Keep them safe.</p>\n\n        <div ng-if="accessKeysVisible">\n            <ul class="list-unstyled" ng-if="accessKeys && accessKeys.length > 0">\n                <li ng-repeat="key in accessKeys"><b>{{ ::key.name }}</b> <em>({{ ::key.role }})</em>\n                    created on\n                    {{ ::key.createdAt | date:\'yyyy-MMM-dd\'}}\n\n                    <em ng-if="key.serviceUser">; expires {{ ::expireIn(key) }}</em>\n\n                    <button class="btn-icon" ng-click="toggleExpandedAccessKey(key)">\n                        <i class="fa fa-chevron-{{ expandedAccessKey === key ? \'up\': \'down\' }}"></i>\n                    </button>\n                    <button class="btn-icon pull-right" ng-click="deleteAccessKey(key)">\n                        <span class="fa fa-times"></span>\n                    </button>\n                    <div class="access-token" ng-if="expandedAccessKey === key">\n                        <div>\n                            <label><em>Token: </em></label>\n\n                            <p>{{ ::key.token }}</p>\n                        </div>\n\n                        <div ng-if="key.serviceUser">\n                            <label><em>Bearer: </em></label>\n\n                            <p>Add header: </p>\n\n                            <p><em>Authorization: Bearer {{ ::key.token }}</em></p>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n            <p ng-if="accessKeys && accessKeys.length === 0" class="text-muted">There are no access keys assigned for this organization. Click "Add" to\n                add one.</p>\n            <button ng-if="accessKeys" type="button" class="btn btn-info" data-toggle="modal" data-target="#add-access-key-modal" ng-click="initNewAccessKey()">Add\n            </button>\n        </div>\n    </div>\n</div>\n\n<div class="panel panel-info" ng-if="perm === 4">\n    <div class="panel-heading">Clone organization</div>\n    <div class="panel-body">\n        <p>Make full copy of your organization.</p>\n        <button class="btn btn-info" ng-click="cloneOrg()">Clone</button>\n    </div>\n</div>\n\n<div class="panel panel-warning" ng-if="perm === 4">\n    <div class="panel-heading">Leave organization</div>\n    <div class="panel-body">\n        <p>Once you leave the organization you will need to contact someone from the owners to invite you\n            back.</p>\n        <button class="btn btn-warning" ng-click="leaveOrg()">Leave</button>\n    </div>\n</div>\n\n<div class="panel panel-danger" ng-if="perm === 4">\n    <div class="panel-heading">Delete organization</div>\n    <div class="panel-body">\n        <p>Once you delete an organization, there is no going back. It will be deleted forever\n            including all offices, floorplans and members in it. Please be\n            certain.</p>\n        <button class="btn btn-danger" ng-click="deleteOrg()" ng-disabled="perm <= 2">Delete</button>\n    </div>\n</div>'), e.put("/app/organization/settings/billing.html", '<div>\n    <h4 class="rnd-title" title="Billing & Invoicing">Billing & Invoicing</h4>\n\n    <div class="rnd-container">\n        <form role="form" class="form-horizontal">\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <div class="checkbox">\n                        <label>\n                            <input type="checkbox" ng-model="settings.billing.enabled"> Billing module\n                        </label>\n                    </div>\n\n                    <small class="text-muted">\n                        If the billing module is disabled all billing and membership fields and tabs will be removed\n                        from the organization.\n                    </small>\n                </div>\n            </div>\n\n            <div class="form-group" ng-if="settings.billing.enabled">\n                <label for="currency-code" class="col-sm-3 control-label">Currency</label>\n\n                <div class="col-sm-6">\n                    <select id="currency-code" class="form-control" kendo-drop-down-list k-data-text-field="\'label\'" k-data-value-field="\'code\'" k-value-primitive="true" k-filter="\'contains\'" k-ng-model="settings.billing.currency" k-rebind="settings.billing" k-data-source="currencies">\n                    </select>\n                    <small class="text-muted">\n                        Example: <i>{{ 100.50 | isoCurrency: settings.billing.currency }}</i>\n                    </small>\n                </div>\n            </div>\n\n            <div class="form-group" ng-if="settings.billing.enabled">\n                <label for="billing-date" class="col-sm-3 control-label">Billing date</label>\n\n                <div class="col-sm-6">\n                    <select id="billing-date" class="form-control" kendo-drop-down-list k-data-text-field="\'name\'" k-data-value-field="\'value\'" k-value-primitive="true" k-ng-model="settings.billing.date" k-rebind="settings.billing" k-option-label="{ name: \'Not selected\', value: null }" k-data-source="possibleDates">\n                    </select>\n                    <small ng-if="settings.billing.date" class="text-muted">\n                        All members will be billed on <i>{{ formatOrdinal(settings.billing.date) }}</i> of each month.\n                    </small>\n                    <small ng-if="!settings.billing.date" class="text-muted">\n                        No billing date set: members will be billed depending on their starting date.\n                    </small>\n                </div>\n            </div>\n\n            <div class="form-group" ng-if="settings.billing.enabled">\n                <label for="invoicing-period" class="col-sm-3 control-label">Invoicing period</label>\n\n                <div class="col-sm-6">\n                    <select id="invoicing-period" class="form-control" kendo-drop-down-list ng-model="settings.billing.invoicingPeriod">\n                        <option value="1">1 month</option>\n                        <option value="2">2 months</option>\n                        <option value="3">3 months</option>\n                        <option value="4">4 months</option>\n                        <option value="6">6 months</option>\n                        <option value="12">12 months</option>\n                    </select>\n                    <small class="text-muted">\n                        Invoices will be generated by default on <i>{{ settings.billing.invoicingPeriod }}</i> month bases.\n                    </small>\n                </div>\n            </div>\n\n            <div class="form-group" ng-if="settings.billing.enabled">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <div class="checkbox">\n                        <label>\n                            <input id="generate-payments" type="checkbox" ng-model="settings.payments.enabled"> Automated payments\n                        </label>\n                    </div>\n                    <small class="text-muted" ng-if="settings.payments.enabled">\n                        Automatically generate payments <input class="inline-input" type="number" min="0" step="1" ng-model="settings.payments.daysBefore"> days before the billing date.\n                    </small>\n                    <div class="checkbox" ng-if="settings.payments.enabled">\n                        <label>\n                            <input id="send-invoice" type="checkbox" ng-model="settings.payments.sendInvoice"> Send the invoice\n                        </label>\n                    </div>\n                    <div class="checkbox" ng-if="settings.payments.enabled">\n                        <label>\n                            <input id="charge-account" type="checkbox" ng-model="settings.payments.chargeAccount"> Automatically charge customers\' accounts\n                        </label>\n                    </div>\n                </div>\n            </div>\n\n            <div class="form-group" ng-if="settings.billing.enabled">\n                <label for="invoicing-vat" class="col-sm-3 control-label">VAT</label>\n\n                <div class="col-sm-6">\n                    <select id="invoicing-vat" class="form-control" kendo-drop-down-list ng-model="settings.billing.invoicingVat">\n                        <option value="included">Included</option>\n                        <option value="excluded">Excluded</option>\n                        <option value="noTax">No Tax</option>\n                    </select>\n                    <small class="text-muted">\n                        All prices are with VAT - <i>{{ settings.billing.invoicingVat }}</i>.\n                    </small>\n                </div>\n            </div>\n\n            <div class="form-group" ng-if="settings.billing.enabled">\n                <label class="col-sm-3 control-label">Invoicing</label>\n\n                <div class="col-sm-6">\n                    <div class="btn-group btn-group-justified">\n                        <div class="btn-group">\n                            <button type="button" class="btn btn-default" ng-class="{ active: settings.billing.invoicing===\'none\' }" ng-click="settings.billing.invoicing=\'none\'">\n                                None\n                            </button>\n                        </div>\n                        <div class="btn-group">\n                            <button type="button" class="btn btn-default" ng-class="{ active: settings.billing.invoicing===\'basic\' }" ng-click="settings.billing.invoicing=\'basic\'">\n                                Basic\n                            </button>\n                        </div>\n                        <div class="btn-group">\n                            <button type="button" class="btn btn-default" ng-disabled="!isXeroEnabled" ng-class="{ active: settings.billing.invoicing===\'xero\' }" ng-click="settings.billing.invoicing=\'xero\'" title="You should Enable Xero integration.">\n                                Xero\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div ng-if="settings.billing.enabled && settings.billing.invoicing === \'basic\'">\n                <hr>\n                <div class="form-group">\n                    <label for="invoice-template" class="col-sm-3 control-label">Invoice template</label>\n\n                    <div class="col-sm-6">\n                        <select id="invoice-template" class="form-control" kendo-drop-down-list k-value-primitive="true" k-value-template="formatTemplate" k-template="formatTemplate" k-ng-model="settings.invoicing.defaultTemplate" k-data-source="settings.invoicing.enabledTemplates">\n                        </select>\n                    </div>\n                </div>\n\n                <div class="form-group">\n                    <label for="org-legalName" class="col-sm-3 control-label">Legal name</label>\n\n                    <div class="col-sm-6">\n                        <input type="text" class="form-control" ng-model="settings.invoicing.legalName" placeholder="Legal name" id="org-legalName">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="org-registrationNumber" class="col-sm-3 control-label">Registration number</label>\n\n                    <div class="col-sm-6">\n                        <input type="text" class="form-control" ng-model="settings.invoicing.registrationNumber" placeholder="Registration number" id="org-registrationNumber">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="org-vatPercent" class="col-sm-3 control-label">Vat percent</label>\n\n                    <div class="col-sm-6">\n                        <div class="input-group">\n                            <input type="number" class="form-control" ng-model="settings.invoicing.vatPercent" step="1" id="org-vatPercent" placeholder="Example: 20%">\n                            <span class="input-group-addon">%</span>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="org-vatId" class="col-sm-3 control-label">Vat Id</label>\n\n                    <div class="col-sm-6">\n                        <input type="text" class="form-control" ng-model="settings.invoicing.vatId" placeholder="Vat Id" id="org-vatId">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="org-city" class="col-sm-3 control-label">City</label>\n\n                    <div class="col-sm-6">\n                        <input type="text" class="form-control" ng-model="settings.invoicing.city" placeholder="City" id="org-city">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="org-address" class="col-sm-3 control-label">Address</label>\n\n                    <div class="col-sm-6">\n                        <input type="text" class="form-control" ng-model="settings.invoicing.address" placeholder="Address" id="org-address">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="org-contact" class="col-sm-3 control-label">Accountable Person</label>\n\n                    <div class="col-sm-6">\n                        <input type="text" class="form-control" ng-model="settings.invoicing.contact" placeholder="Contact" id="org-contact">\n                    </div>\n                </div>\n\n                <div class="form-group">\n                    <label for="org-account-bank" class="col-sm-3 control-label">Bank Name</label>\n\n                    <div class="col-sm-6">\n                        <input type="text" class="form-control" ng-model="settings.invoicing.accountBank" placeholder="Bank Name" id="org-account-bank">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="org-account-iban" class="col-sm-3 control-label">IBAN</label>\n\n                    <div class="col-sm-6">\n                        <input type="text" class="form-control" ng-model="settings.invoicing.accountIban" placeholder="IBAN" id="org-account-iban">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="org-account-bic" class="col-sm-3 control-label">BIC</label>\n\n                    <div class="col-sm-6">\n                        <input type="text" class="form-control" ng-model="settings.invoicing.accountBic" placeholder="BIC" id="org-account-bic">\n                    </div>\n                </div>\n            </div>\n\n            <div class="form-group" ng-if="settings.billing.enabled && settings.billing.invoicing !== \'none\'">\n                <label for="line-item-template" class="col-sm-3 control-label">Item template</label>\n\n                <div class="col-sm-6">\n                    <input type="text" class="form-control" ng-model="settings.billing.lineTemplate" placeholder="Line item template" id="line-item-template">\n                    <small>You can use the following properties in your template: <i><b>planName, planPrice, planDescription, planInterval, formattedPrice, startDate, endDate</b></i>.</small>\n                </div>\n            </div>\n\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <button type="button" class="btn btn-primary" ng-click="saveOrgSettings()">Update\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>'), e.put("/app/organization/settings/calendar.html", '<div>\n    <div>\n        <h4 class="rnd-title" title="Meeting Rooms">Meeting Rooms</h4>\n    </div>\n    <div class="rnd-container">\n        <form role="form" class="form-horizontal">\n            <div class="form-group">\n                <label class="col-sm-3 control-label">Date Format</label>\n                <div class="col-sm-6">\n                    <select class="form-control" kendo-drop-down-list k-ng-model="dateFormat" k-data-source="dateFormats" k-data-text-field="\'text\'" k-data-value-field="\'value\'" k-value-primitive="true">\n                    </select>\n                </div>\n            </div>\n            <div class="form-group">\n                <label class="col-sm-3 control-label">Workdays</label>\n                <div class="col-sm-6">\n                    <div class="checkbox-inline" ng-repeat="day in weekDays">\n                        <label>\n                            <input type="checkbox" ng-checked="workDay($index)" ng-click="toggleWorkDay($index)">{{ ::day }}\n                        </label>\n                    </div>\n                </div>\n            </div>\n            <div class="form-group">\n                <label class="col-sm-3 control-label">Business hours</label>\n                <div class="col-sm-3">\n                    <input kendo-time-picker k-ng-model="organizationWorkHours.open">\n                </div>\n                <div class="col-sm-3">\n                    <input kendo-time-picker k-ng-model="organizationWorkHours.close">\n                </div>\n            </div>\n            <div class="form-group">\n                <label class="col-sm-3 control-label">Timezone</label>\n                <div class="col-sm-6">\n                    <select class="form-control" kendo-drop-down-list k-ng-model="timezone" k-data-source="timezones" k-data-text-field="\'zone\'" k-data-value-field="\'zone\'" k-filter="\'contains\'" k-value-primitive="true">\n                    </select>\n                </div>\n            </div>\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <button type="button" class="btn btn-primary" ng-click="updateOrgWorkingHours()">Update</button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n'), e.put("/app/organization/settings/community.html", '<div id="property-modal" rnd-modal modal-focus="#property-title" modal-hidden="cleanUpData()">\n    <div class="modal-dialog">\n        <form name="addPropertyForm" class="form-horizontal" role="form" novalidate>\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 ng-if="!originalProperty" class="modal-title">Add Property</h3>\n\n                    <h3 ng-if="originalProperty" class="modal-title">Edit Property</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="property-title" class="col-sm-3 control-label">Title</label>\n\n                        <div class="col-sm-9">\n                            <input name="title" type="text" class="form-control" ng-model="property.title" id="property-title" placeholder="Full-time" required org-custom-property-title-validator>\n\n                            <div class="error" ng-show="addPropertyForm.title.$error.orgCustomPropertyTitleValidator">\n                                <span>Property with such name already exists.</span>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <div class="col-sm-offset-3 checkbox col-sm-4">\n                            <targets-checkbox text="Apply to members" ng-model="property.targets.length" property="property" target="member" toggle-selection="toggleSelection(collection, item)"></targets-checkbox>\n                        </div>\n                        <div class="checkbox col-sm-5">\n                            <targets-checkbox text="Apply to teams" ng-model="property.targets.length" property="property" target="team" toggle-selection="toggleSelection(collection, item)"></targets-checkbox>\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">\n                        Close\n                    </button>\n                    <button type="submit" class="btn btn-primary" ng-disabled="addPropertyForm.$invalid" ng-click="commitProperty()">\n                        <span ng-if="originalProperty">Update</span>\n                        <span ng-if="!originalProperty">Add</span>\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n\n<div id="imported-members-modal" class="modal fade">\n    <div class="modal-dialog modal-xl">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                <h3 class="modal-title">Imported Members</h3>\n            </div>\n            <div class="modal-body">\n                <table class="table">\n                    <thead>\n                    <th>Name</th>\n                    <th>Email</th>\n                    <th>{{ ::teamProperty.name }}</th>\n                    <th ng-repeat="prop in org.customProperties">{{ ::prop.title }}</th>\n                    </thead>\n                    <tbody>\n                    <tr ng-repeat="member in importedMembers">\n                        <td>{{ ::member.Name }}</td>\n                        <td>{{ ::member.Email }}</td>\n                        <td>{{ ::member[teamProperty.name] }}</td>\n                        <td ng-repeat="prop in org.customProperties">{{ ::member[prop.title] }}</td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="cancelImport()" ng-disabled="importingMembers">\n                    Close\n                </button>\n                <button type="button" class="btn btn-primary" ng-click="commitImport()" data-dismiss="modal" rnd-loading="importingMembers" data-loading-text="Importing...">\n                    Import\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div>\n    <h4 class="rnd-title" title="Members Management">Members Management</h4>\n\n    <button class="btn btn-primary" onclick="document.getElementById(\'import-members\').click(); return false">\n        Import members\n    </button>\n    <input type="file" style="display: inline-block" id="import-members" name="upload" class="hidden-upload" onchange="angular.element(this).scope().importMembers(this)" accept=".csv">\n\n    <div class="rnd-container">\n        <form role="form" class="form-horizontal">\n            <div class="form-group">\n                <label for="team-property" class="col-sm-3 control-label">Team Property</label>\n\n                <div class="col-sm-6">\n                    <select id="team-property" class="form-control" kendo-drop-down-list k-data-text-field="\'name\'" k-data-value-field="\'name\'" k-ng-model="settings.teamProperty" k-rebind="settings" k-data-source="propertyTypes">\n                    </select>\n                </div>\n            </div>\n\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <div class="checkbox">\n                        <label>\n                            <input type="checkbox" ng-model="settings.contracts.enabled">Contracts management\n                        </label>\n                    </div>\n\n                    <small class="text-muted">\n                        The contracts module allow you to generate contracts for your members based on your template.\n                    </small>\n                </div>\n            </div>\n\n            <div class="form-group" ng-if="settings.contracts.enabled">\n                <label for="contract-template" class="col-sm-3 control-label">Contract template</label>\n\n                <div class="col-sm-6">\n                    <select id="contract-template" class="form-control" kendo-drop-down-list k-value-primitive="true" k-ng-model="settings.contracts.defaultTemplate" k-data-source="settings.contracts.enabledTemplates">\n                    </select>\n                </div>\n            </div>\n\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <div class="checkbox">\n                        <label>\n                            <input type="checkbox" ng-model="settings.occupancy.enabled">Member Checkins\n                        </label>\n                    </div>\n\n                    <small class="text-muted">\n                        The checkins module allow you to track real-time members\' occupancy by checkin/chekout them.\n                    </small>\n                </div>\n            </div>\n\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <button type="button" class="btn btn-primary" ng-click="saveOrgSettings()">Update\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n\n<div>\n    <h4 class="rnd-title" title="Member properties">Member Properties</h4>\n    <button type="button" class="btn btn-primary" ng-click="addProperty()">Add property</button>\n\n    <div class="rnd-container">\n        <ol class="numbered-list">\n            <li ng-repeat="property in org.customProperties | filter: \'member\'">\n                {{property.title}}\n                <div class="dropdown room-menu">\n                    <button class="btn-icon dropdown-toggle" type="button" id="editMenu" data-toggle="dropdown">\n                        <i class="fa fa-cog"></i>\n                    </button>\n                    <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMenu">\n                        <li role="presentation">\n                            <a role="menuitem" tabindex="-1" ng-click="editProperty(property)"> <span class="fa fa-pencil"></span> Edit</a>\n                        </li>\n                        <li role="presentation"><a role="menuitem" tabindex="-1" ng-click="deleteProperty(property)"><span class="fa fa-times"></span> Delete</a></li>\n                    </ul>\n                </div>\n            </li>\n        </ol>\n    </div>\n\n    <h4 class="rnd-title" title="Team properties">Team Properties</h4>\n\n    <div class="rnd-container">\n        <ol class="numbered-list">\n            <li ng-repeat="property in org.customProperties | filter: \'team\'">\n                {{property.title}}\n                <div class="dropdown room-menu">\n                    <button class="btn-icon dropdown-toggle" type="button" id="editMenu" data-toggle="dropdown">\n                        <i class="fa fa-cog"></i>\n                    </button>\n                    <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMenu">\n                        <li role="presentation">\n                            <a role="menuitem" tabindex="-1" ng-click="editProperty(property)"> <span class="fa fa-pencil"></span> Edit</a>\n                        </li>\n                        <li role="presentation"><a role="menuitem" tabindex="-1" ng-click="deleteProperty(property)"><span class="fa fa-times"></span> Delete</a></li>\n                    </ul>\n                </div>\n            </li>\n        </ol>\n    </div>\n</div>'),
            e.put("/app/organization/settings/customTemplates.html", '<h4 class="rnd-title">Templates</h4>\n\n<div class="rnd-container">\n    <table class="table">\n        <thead>\n        <th>Name</th>\n        <th>Description</th>\n        </thead>\n        <tbody>\n        <tr ng-repeat="template in templates | orderBy: \'type\'">\n            <td>\n                <a class="dark-link" ui-sref="organization.manage.settings.editTemplate({ templateType: template.type })">\n                    <div class="inline profile-xs user-avatar">\n                        <i class="fa" ng-class="templatesInfo[template.type].icon"></i>\n                    </div><span class="offset5">{{ ::templatesInfo[template.type].name }}</span>\n                </a>\n            </td>\n            <td>{{ ::templatesInfo[template.type].description }}</td>\n        </tr>\n        </tbody>\n    </table>\n</div>'), e.put("/app/organization/settings/editCustomTemplate.html", '<h4 class="rnd-title">Template</h4>\n\n<div class="rnd-container">\n    <form class="form-horizontal" role="form">\n        <div class="form-group">\n            <label class="col-sm-2 control-label text-label">Name</label>\n\n            <div class="col-sm-10">\n                <span class="readonly-value">{{ ::templatesInfo[originalTemplate.type].name }}</span>\n            </div>\n        </div>\n\n        <div class="form-group">\n            <label for="template-subject" class="col-sm-2 control-label">Subject</label>\n\n            <div class="col-sm-10">\n                <input type="text" class="form-control" ng-model="template.subject" id="template-subject" placeholder="Subject">\n            </div>\n        </div>\n\n        <div class="form-group">\n            <label for="template-content" class="col-sm-2 control-label">Content</label>\n\n            <div class="col-sm-10">\n' + "                <textarea kendo-editor k-tools=\"['bold', 'italic', 'underline', 'strikethrough', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'insertUnorderedList', 'insertOrderedList', 'indent', 'outdent', 'createLink', 'unlink', 'subscript', 'superscript', 'viewHtml', 'cleanFormatting']\" class=\"form-control\" k-ng-model=\"template.content\" rows=\"10\" id=\"template-content\" placeholder=\"Content\">\n                </textarea>\n\n                <p>\n                    You can use the following properties in your template: <i><b>{{ ::templatesInfo[originalTemplate.type].params.join(', ') }}</b></i>\n                </p>\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <div class=\"col-sm-offset-2 col-sm-9\">\n                <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"saveTemplate()\">Save</button>\n                <button type=\"button\" class=\"btn btn-default\" ui-sref=\"organization.manage.settings.templates\">Cancel</button>\n            </div>\n        </div>\n    </form>\n</div>"), e.put("/app/organization/settings/general.html", '<h4 class="rnd-title">Settings</h4>\n\n<div class="rnd-container">\n    <form role="form" class="form-horizontal">\n        <div class="form-group">\n            <label for="org-name" class="col-sm-3 control-label">Picture</label>\n\n            <div class="col-sm-6">\n                <image-upload image-url="orgModel.image" target="{{ orgModel.slug }}" default-icon="fa-building-o"></image-upload>\n            </div>\n        </div>\n        <div class="clearfix"></div>\n        <div class="form-group">\n            <label for="org-name" class="col-sm-3 control-label">Name</label>\n\n            <div class="col-sm-6">\n                <input type="text" class="form-control" ng-model="orgModel.name" id="org-name" placeholder="Name">\n                <small class="text-muted">\n                    Once you change the name of the organization, its url will be changed according to the new\n                    name.\n                    <br><span>{{ ::officerndRoot }}/</span><b>{{orgModel.slug}}</b>\n                </small>\n            </div>\n        </div>\n        <div class="form-group">\n            <label for="org-twitter" class="col-sm-3 control-label">Twitter</label>\n\n            <div class="col-sm-6">\n                <input type="text" class="form-control" ng-model="orgModel.twitterHandle" id="org-twitter" placeholder="Twitter">\n            </div>\n        </div>\n        <div class="form-group">\n            <label for="org-email1" class="col-sm-3 control-label">Email</label>\n\n            <div class="col-sm-6">\n                <input type="email" class="form-control" ng-model="orgModel.email" id="org-email1" placeholder="Email">\n            </div>\n        </div>\n        <div class="form-group">\n            <label for="org-url" class="col-sm-3 control-label">Url</label>\n\n            <div class="col-sm-6">\n                <input type="text" class="form-control" ng-model="orgModel.url" id="org-url" placeholder="Url">\n            </div>\n        </div>\n        <div class="form-group">\n            <label for="org-terms-url" class="col-sm-3 control-label">Terms url</label>\n\n            <div class="col-sm-6">\n                <input type="text" class="form-control" ng-model="orgModel.settings.general.termsUrl" id="org-terms-url" placeholder="Terms url">\n            </div>\n        </div>\n        <div class="form-group">\n            <label for="org-address" class="col-sm-3 control-label">Address</label>\n\n            <div class="col-sm-6">\n                <input type="text" class="form-control" ng-model="orgModel.settings.general.address" id="org-address" placeholder="Address">\n            </div>\n        </div>\n        <div class="form-group">\n            <label for="org-legal-name" class="col-sm-3 control-label">Legal Name</label>\n\n            <div class="col-sm-6">\n                <input type="text" class="form-control" ng-model="orgModel.settings.general.legalName" id="org-legal-name" placeholder="Legal name">\n            </div>\n        </div>\n        <div class="form-group">\n            <label for="org-logo" class="col-sm-3 control-label">Logo Url</label>\n\n            <div class="col-sm-6">\n                <input type="text" class="form-control" ng-model="orgModel.settings.general.logoUrl" id="org-logo" placeholder="Logo Url">\n            </div>\n        </div>\n        <div class="form-group">\n            <div class="col-sm-offset-3 col-sm-6">\n                <button type="button" ng-disabled="perm<=1" class="btn btn-primary" ng-click="updateOrg(orgModel)">\n                    Update\n                </button>\n            </div>\n        </div>\n    </form>\n</div>'), e.put("/app/organization/settings/integrations.html", '<div id="capsule-modal" role="dialog" tabindex="-1" rnd-modal allow-popups modal-focus="#change-date" modal-hidden="cleanUp()">\n    <form role="form" class="form-horizontal">\n        <div class="modal-dialog">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Configure {{ definition.title }} integration</h3>\n                </div>\n                <div class="modal-body">\n                    <properties-form properties="definition.properties" values="integration.settings"></properties-form>\n                    <div class="form-group" ng-repeat="office in offices">\n                        <label class="col-sm-3 control-label">{{ office.name }}</label>\n                        <div class="col-sm-5">\n                            <input type="text" class="form-control" ng-model="tagsForOffice[office._id]" placeholder="Capsule tag for members at {{ office.name }}">\n                        </div>\n                        <div class="col-sm-4">\n                            <input type="text" class="form-control" ng-model="leadTagsForOffice[office._id]" placeholder="Capsule tag for leads at {{ office.name }}">\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <div class="pull-right">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                        <button type="submit" ng-click="save(definition)" class="btn btn-primary" data-dismiss="modal">\n                            Done\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n<div id="zapier-modal" rnd-modal modal-hidden="cleanUp()">\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                <h3 class="modal-title">Connect OfficeR&D with Zapier</h3>\n            </div>\n            <div class="modal-body">\n                <div class="help-item">\n                    <i class="fa fa-plus"></i>\n                    <h3>Create new Zap</h3>\n                    <p>\n                        Login to your Zapier accound and create new Zap. Setup a trigger for your new integration.\n                    </p>\n                </div>\n                <div class="help-item">\n                    <i class="fa fa-play-circle-o"></i>\n                    <h3>Setup OfficeR&D</h3>\n                    <p>\n                        Add OfficeR&D application to your Zapier account by following <a href="https://zapier.com/developer/invite/33683/eb8ec421537dc66e589f21c0ae798b7e/" target="_blank">this link</a>. This is needed because we are still in beta.\n                    </p>\n                </div>\n                <div class="help-item">\n                    <i class="fa fa-cogs"></i>\n                    <h3>Add OfficeR&D action</h3>\n                    <p>\n                        When choosing the action for your new Zap, search for \'OfficeR&D\'.\n                    </p>\n                </div>\n                <div class="help-item">\n                    <i class="fa fa-key"></i>\n                    <h3>Login with OfficeR&D credentials</h3>\n                    <p>While setting up your Zap you will be asked for your OfficeR&D credentials. Just type in the ones you use to log in at OfficeR&D.</p>\n                </div>\n                <div class="help-item">\n                    <i class="fa fa-heart-o"></i>\n                    <h3>Have fun</h3>\n                    <p>Enjoy your newly created integration. Connect OfficeR&D to hundreds of applications with Zapier.</p>\n                </div>\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-default" data-dismiss="modal">\n                    Close\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n<div id="stripe-modal" rnd-modal modal-hidden="cleanUp()">\n    <div class="modal-dialog">\n        <form role="form" class="form-horizontal">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Connect OfficeR&D with Stripe</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="help-item">\n                        <h3>Get your Stripe keys</h3>\n                        <ol>\n                            <li>If you don\'t have Stripe account go to <a href="https://stripe.com/" target="_blank">https://stripe.com/</a> and create one</li>\n                            <li>Open API Keys under your Account Settings in the Stripe dashboard (or click <a href="https://dashboard.stripe.com/account/apikeys" target="_blank">here</a>)</li>\n                            <li>You will see two pairs of keys - test and live ones</li>\n                            <li>Go to our <a href="https://officernd.com/help/setup-payment-gateway/" target="_blank">payments gateway</a> help section for more details</li>\n                        </ol>\n                    </div>\n                    <properties-form class="properties-form-border" properties="definition.properties" values="integration.settings"></properties-form>\n                </div>\n                <div class="modal-footer">\n                    <div class="pull-right">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                        <button type="submit" ng-click="save(definition)" class="btn btn-primary" data-dismiss="modal">\n                            Done\n                        </button>\n                    </div>\n                </div>\n            </div>\n    </form></div>\n    \n</div>\n<div id="google-calendar-modal" rnd-modal modal-hidden="cleanUp()">\n    <div class="modal-dialog">\n        <form role="form" class="form-horizontal">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Connect to Google Calendar</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="help-item" ng-if="!integration.settings.calendars">\n                        <h3>Connect to your google account</h3>\n                        <ol>\n                            <li>Give OfficeR&D permissions to your <a href="https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&client_id=256129137753-3vaqaqsnqniua0g66uprs67gu9vq1lgu.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob" target="_blank"> Google calendar</a></li>\n                            <li>Copy the code received from Google.</li>\n                            <li>Paste in the box below and click \'Done\'</li>\n                        </ol>\n                    </div>\n                    <div class="help-item" ng-if="integration.settings.calendars">\n                        <h3>Match calendars to room</h3>\n                        <p>\n                            Map the calendar to the corresponding room. Mark which calendars you want to sync with Office R&D\n                        </p>\n                    </div>\n                    <properties-form ng-if="!integration.settings.calendars" class="properties-form-border" properties="definition.properties" values="integration.settings"></properties-form>\n                    <mappings-form keys="calendarKeys" values="roomMapping" text-field="summary" value-field="id" options="integration.settings.calendars"></mappings-form>\n                </div>\n                <div class="modal-footer">\n                    <div class="pull-right">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                        <button type="submit" ng-click="save(definition)" class="btn btn-primary" data-dismiss="modal">\n                            Done\n                        </button>\n                    </div>\n                </div>\n            </div>\n    </form></div>\n    \n</div>\n<div id="xero-modal" role="dialog" tabindex="-1" rnd-modal allow-popups modal-focus="#xero-account" modal-hidden="cleanUp()">\n    <form role="form" class="form-horizontal">\n        <div class="modal-dialog">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Configure {{ definition.title }} integration</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group" ng-if="!integration">\n                        <div class="col-md-12">\n                            <i class="fa fa-spinner fa-spin"></i> Loading accounts...\n                        </div>\n                    </div>\n\n                    \n                    <mappings-form keys="revenueAccountsNames" values="integration.settings.revenue" text-field="name" value-field="code" options="revenueAccounts"></mappings-form>\n                    <mappings-form keys="paymentsAccountsNames" values="integration.settings.payments" text-field="name" value-field="id" options="paymentsAccounts"></mappings-form>\n\n                    <properties-form properties="definition.properties" values="integration.settings"></properties-form>\n                </div>\n                <div class="modal-footer">\n                    <div class="pull-right">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                        <button type="submit" ng-click="save(definition)" class="btn btn-primary" data-dismiss="modal">\n                            Done\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n<h4 class="rnd-title" title="Integrations">Integrations</h4>\n<div class="row">\n    <div ng-repeat="definition in availableIntegrations" ng-cloak class="col-md-6">\n        <div class="rnd-small-container">\n            <user-picture class="inline pull-left profile-lg" item="definition"></user-picture>\n            <div class="item-more-info">\n                <h2 class="rnd-container-header">{{ definition.title }}</h2>\n                <div ng-if="isEnabled(definition)">\n                    <a ng-click="configure(definition)" ng-if="definition.configure" title="Configure {{ definition.title }} integration">Configure</a>\n                    <a ng-click="toggleActivate(definition)" ng-if="!definition.alwaysEnabled" title="Deactivate {{ definition.title }} integration">Deactivate</a>\n                </div>\n                <div ng-if="!isEnabled(definition)">\n                    <a ng-click="toggleActivate(definition)" title="Activate" title="Activate {{ definition.title }} integration">Activate</a>\n                </div>\n                <div ng-if="isEnabled(definition) && definition.summary">\n                    <span>{{ definition.summary(findIntegration(definition)) }}</span>\n                </div>\n                <div class="bottom-right" ng-if="isEnabled(definition)">\n                    <a ng-click="connect(definition)" ng-if="definition.connect && !definition.connecting && !definition.connected(findIntegration(definition))" title="Connect {{ definition.title }}">Connect</a>\n                    <span ng-if="definition.connecting"><i class="fa fa-spinner fa-spin"></i> Connecting</span>\n                    <a ng-click="sync(definition)" ng-if="definition.canSync && !definition.syncing && (!definition.connect || definition.connected(findIntegration(definition)))" title="Sync {{ definition.title }}">Sync</a>\n                    <span ng-if="definition.syncing"><i class="fa fa-spinner fa-spin"></i> Syncing</span>\n                </div>\n            </div>\n            <div class="clearfix"></div>\n        </div>\n    </div>\n</div>'), e.put("/app/organization/settings/portal.html", '<div>\n    <h4 class="rnd-title" title="Community Portal">Community Portal</h4>\n    <div class="rnd-container">\n        <form role="form" class="form-horizontal">\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <div class="checkbox">\n                        <label>\n                            <input type="checkbox" ng-model="community.enabled"> Community Portal\n                        </label>\n                    </div>\n                    <small class="text-muted">\n                        Enable to allow your members to login to OfficeR&D - book meeting rooms, receive notifications and\n                        etc.\n                    </small>\n                </div>\n            </div>\n            <div class="form-group" ng-if="community.enabled">\n                <label class="col-sm-3 control-label">Url</label>\n                <div class="col-sm-6">\n                    <input readonly type="text" class="form-control" ng-model="fullUrl">\n                </div>\n                <a class="col-sm-3 control-link" ng-href="{{url}}" target="_blank">Open</a>\n            </div>\n            <div class="form-group" ng-if="community.enabled">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <div class="checkbox">\n                        <label>\n                            <input type="checkbox" ng-model="community.signup"> Member Signup\n                        </label>\n                    </div>\n                    <small class="text-muted">\n                        Enable new members sign up from the community portal.\n                    </small>\n                </div>\n            </div>\n            <div class="form-group" ng-show="community.enabled">\n                <label class="col-sm-3 control-label">Theme</label>\n                <div class="col-sm-6">\n                    <div kendo-color-palette k-palette="palette" ng-model="pickedColor">\n                    </div>\n                    <small class="text-muted">\n                        Choose primary color for the community portal theme.\n                    </small>\n                </div>\n            </div>\n            <div class="form-group" ng-show="community.enabled">\n                <label class="col-sm-3 control-label">Background image</label>\n                <div class="col-sm-6">\n                    <image-upload image-url="community.backgroundImage" target="{{ community.backgroundImage }}" default-icon="fa-building-o"></image-upload>\n                    <small class="text-muted">\n                        Choose background image for the community portal\'s login and signup pages.\n                    </small>\n                </div>\n            </div>\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <button type="button" class="btn btn-primary" ng-click="updateOrgPortal()">Update</button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>'), e.put("/app/organization/settings/space.html", '<div id="label-modal" class="modal fade">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h4 ng-if="editing" class="modal-title">Add Zone Type</h4>\n                    <h4 ng-if="!editing" class="modal-title">Edit Zone Type</h4>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="label-name" class="col-sm-3 control-label">Name</label>\n\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" id="label-name" placeholder="Meeting space" ng-model="label.name" autofocus>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="label-color" class="col-sm-3 control-label">Color</label>\n\n                        <div class="col-sm-9">\n                            <input kendo-color-picker class="form-control color-input" id="label-color" placeholder="#00FF00" ng-model="label.color">\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                    <button type="button" class="btn btn-primary" ng-click="commitLabel()" data-dismiss="modal">\n                        Update\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n\n<div>\n    <h4 class="rnd-title" title="Space Management">Space Management</h4>\n\n    <div class="rnd-container">\n        <form role="form" class="form-horizontal">\n            <div class="form-group">\n                <label for="org-coef" class="col-sm-3 control-label">Hot Desk\n                    Coefficient</label>\n\n                <div class="col-sm-6">\n                    <input type="number" class="form-control" id="org-coef" min="1" max="5" step="0.1" ng-model="orgModel.settings.space.hotdeskCoef">\n\n                    <small class="text-muted">\n                        This number is used to calculate the hot desking target revenue. For example if you have 10 hot\n                        desks, your target plans will be {{ orgModel.settings.space.hotdeskCoef * 10 | number:0 }}.\n                    </small>\n                </div>\n            </div>\n\n            <div class="form-group">\n                <label for="org-deskTemplate" class="col-sm-3 control-label">Desk Template</label>\n\n                <div class="col-sm-6">\n                    <input type="text" class="form-control" ng-model="orgModel.deskTemplate" id="org-deskTemplate">\n                </div>\n            </div>\n\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <div class="checkbox">\n                        <label>\n                            <input type="checkbox" id="org-desk-id" ng-model="orgModel.settings.space.deskId">Desk Name\n                        </label>\n                    </div>\n\n                    <small class="text-muted">\n                        Show/hide desk names (ids) on the floorplan.\n                    </small>\n                </div>\n            </div>\n\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-6">\n                    <button type="button" class="btn btn-primary" ng-click="updateOrg(orgModel)">Update</button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n\n<h4 class="rnd-title" title="Zone Types">Zone Types</h4>\n<button class="btn btn-primary" ng-click="addLabel()">Add zone type</button>\n\n<div class="rnd-container">\n    <table class="table">\n        <thead>\n        <th>Name</th>\n        </thead>\n        <tbody>\n        <tr class="grid-row" ng-repeat="label in org.labels">\n            <td>\n                <div class="color-box" style="background-color: {{ label.color }}"></div>\n                {{ label.name }}\n                <div class="dropdown room-menu">\n                    <button class="btn-icon dropdown-toggle" type="button" id="editMenu" data-toggle="dropdown">\n                        <i class="fa fa-cog"></i>\n                    </button>\n                    <ul class="dropdown-menu" data-placement="bottom" role="menu" aria-labelledby="editMenu">\n                        <li role="presentation"><a role="menuitem" tabindex="-1" ng-click="editLabel(label)"> <span class="fa fa-pencil"></span> Edit</a></li>\n                        <li role="presentation"><a role="menuitem" tabindex="-1" ng-click="deleteLabel($index)"><span class="fa fa-times"></span> Delete</a></li>\n                    </ul>\n                </div>\n            </td>\n        </tr>\n        </tbody>\n    </table>\n</div>'), e.put("/app/organization/settings/template.html", '<div class="row">\n    <div class="col-sm-3">\n        <h4 class="rnd-title" title="Settings">Settings</h4>\n        <div class="basic-list-group">\n            <a ng-class="{active:isActive(\'settings\')}" ui-sref="organization.manage.settings.general">General</a>\n            <a ng-class="{active:isActive(\'admin\')}" ui-sref="organization.manage.settings.admin">Admin</a>\n            <a ng-class="{active:isActive(\'integrations\')}" ui-sref="organization.manage.settings.integrations">Integrations</a>\n            <a ng-class="{active:isActive(\'templates\')}" ui-sref="organization.manage.settings.templates">Templates</a>\n            <hr>\n            <a ng-class="{active:isActive(\'community\')}" ui-sref="organization.manage.settings.community">Community</a>\n            <a ng-class="{active:isActive(\'billing\')}" ui-sref="organization.manage.settings.billing">Billing</a>\n            <a ng-class="{active:isActive(\'space\')}" ui-sref="organization.manage.settings.space">Space</a>\n            <a ng-class="{active:isActive(\'meeting-rooms\')}" ui-sref="organization.manage.settings.calendar">Calendar</a>\n            <hr>\n            <a ng-class="{active:isActive(\'portal\')}" ui-sref="organization.manage.settings.portal">Community Portal</a>\n        </div>\n    </div>\n    <div class="col-sm-9">\n        <div ui-view></div>\n    </div>\n</div>'), e.put("/app/organization/space/analytics.html", '<h4 class="rnd-title">Space</h4>\n\n<div ng-if="organizationZoneSummary">\n    <div class="rnd-container">\n        <div class="row offset-top">\n            <div class="col-md-5">\n                <table class="table">\n                    <thead>\n                    <th>Zone Type</th>\n                    <th>Area</th>\n                    </thead>\n                    <tbody>\n                    <tr ng-repeat="zoneType in organizationZoneSummary | orderBy: \'-area\'">\n                        <td>\n                            <color color="zoneType.color"></color>\n                            {{ ::zoneType.name || \'Other\' }}\n                        </td>\n                        <td>\n                            <unit-label class="zone-area-label" value="zoneType.area" scale="largeRound" target="floor" show-units="true" power="2"></unit-label>\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n            <div class="col-md-7">\n                <kendo-chart options="zonesChartOptions" k-data-source="organizationZoneSummary"></kendo-chart>\n            </div>\n        </div>\n    </div>\n\n    <div class="row">\n        <div class="col-sm-6" ng-repeat="officeData in zoneSummaryByOffice">\n            <div class="rnd-container">\n                <h2 class="rnd-container-header" title="{{ ::officeData.name }}">{{ ::officeData.name }}</h2>\n                <table class="table">\n                    <thead>\n                    <th>Zone Type</th>\n                    <th>Area</th>\n                    </thead>\n                    <tbody>\n                    <tr ng-repeat="zoneType in officeData.zoneTypes | orderBy: \'-area\'">\n                        <td>\n                            <color color="zoneType.color"></color>\n                            {{ ::zoneType.name || \'Other\' }}\n                        </td>\n                        <td>\n                            <unit-label class="zone-area-label" value="zoneType.area" scale="largeRound" target="floor" show-units="true" power="2"></unit-label>\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n\n<loading ng-if="!organizationZoneSummary" help="space analytics"></loading>'), e.put("/app/organization/space/desks.html", '<div>\n    <div>\n        <h4 class="rnd-title" title="Furniture">Desks</h4>\n        <locations-filter></locations-filter>\n    </div>\n    <div class="rnd-container" ng-if="resources">\n        <search-box model="search.name"></search-box>\n\n        <div class="rnd-filter-tabs-panel">\n            <a ng-click="search.types=deskTypes;search.status=undefined;" ng-class="{ active: isSubtabActive(search, deskTypes) }">\n                All ({{ countResources({office: search.office, room: search.room, types: deskTypes}) }})</a>\n            <a ng-click="search.types=[\'hotdesk\']" ng-class="{ active: isSubtabActive(search, [\'hotdesk\']) }">\n                Hot desks ({{ countResources({office: search.office, room: search.room, types: [\'hotdesk\']}) }})</a>\n            <a ng-click="search.types=[\'desk\']" ng-class="{ active: isSubtabActive(search, [\'desk\']) }">\n                Workstations ({{ countResources({office: search.office, room: search.room, types: [\'desk\']}) }})</a>\n            <a ng-repeat="status in statuses" ng-click="search.status=status.status" ng-class="{ active: search.status === status.status}">\n                {{status.name}} ({{ countResources({office: search.office, room: search.room, types: [\'desk\'], status:\n                status.status})}})</a>\n        </div>\n\n        <table class="table" ng-init="limit = 40" infinite-scroll="limit = limit + 6" infinite-scroll-distance="1">\n            <thead>\n            <th>Name</th>\n            <th>Type</th>\n            <th>Status</th>\n            <th>Target Plan</th>\n            </thead>\n            <tbody>\n            <tr class="grid-row" ng-repeat="resource in resources | deskFilter:roomsById:search | orderBy: getNormalized(\'name\') | limitTo: limit">\n                <td>\n                    <resource-link resource="resource" menu="perm>1"></resource-link>\n                </td>\n                <td>\n                    <i ng-class="deskTypeToDisplayName[resource.type].icon"></i>\n                    {{ deskTypeToDisplayName[resource.type].title }}\n                </td>\n                <td>\n                    <color color="statusColor(resource)"></color>\n                    {{ ::statusText(resource) }}\n                </td>\n                <td>\n                    <expand-plan plan-id="resource.targetPlan"></expand-plan>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n\n    <loading ng-if="!resources" help="desks"></loading>\n\n    <empty-block ng-if="rooms && offices.length === 0" command="openLocations()" header="Go to Locations" help="It looks you don\'t have any floorplans yet. Go to Locations tab and create some first.">\n    </empty-block>\n</div>'),
            e.put("/app/organization/space/floorplans.html", '<div id="add-room-modal" class="modal fade" rnd-modal modal-focus="#room-name" modal-hidden="cleanUpRoom()">\n    <div class="modal-dialog" ng-if="room">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">{{originalRoom ? \'Edit\' : \'Add\'}} Floorplan</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="room-name" class="col-sm-3 control-label">Name</label>\n\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" ng-model="room.name" id="room-name" placeholder="Floorplan name" required autofocus>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="room-office" class="col-sm-3 control-label">Location</label>\n\n                        <div class="col-sm-9">\n                            <select id="room-office" class="form-control" kendo-drop-down-list k-ng-model="room.office" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'name\'" k-rebind="room" k-data-source="offices">\n                            </select>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="room-floor" class="col-sm-3 control-label">Floor</label>\n\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" ng-model="room.floor" id="room-floor" placeholder="Plan floor">\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="room-size" class="col-sm-3 control-label">Area</label>\n\n                        <div class="col-sm-9">\n                            <unit-input label-id="room-size" value="room.area" scale="large" target="floor" show-units="true" power="2"></unit-input>\n                        </div>\n                    </div>\n                    <div class="form-group" ng-if="!originalRoom">\n                        <label class="col-sm-3 control-label">Floorplan</label>\n\n                        <div class="col-sm-9">\n                            <button type="button" class="btn btn-primary" ng-disabled="uploading" ng-click="chooseImage()">\n                                {{ uploading ? \'Uploading...\' : room.background ? \'Change\' : \'Upload\' }}\n                            </button>\n                            <input id="modal-background-upload" type="file" file-picked="backgroundFilePicked($file)" accept="image/*" class="hidden-upload">\n                        </div>\n                    </div>\n                </div>\n                <div class="clearfix"></div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n\n                    <button ng-if="originalRoom" type="submit" class="btn btn-primary pull-right" ng-disabled="!canSaveRoom()" ng-click="saveRoom()" data-dismiss="modal">Save\n                    </button>\n                    <button ng-if="!originalRoom" type="submit" class="btn btn-primary pull-right" ng-disabled="!canSaveRoom() || uploading" ng-click="addRoomAndOpenDesigner()" data-dismiss="modal">Create &amp; Design\n                    </button>\n                    <button ng-if="!originalRoom" type="button" class="btn btn-primary pull-right" ng-disabled="!canSaveRoom() || uploading" ng-click="addRoom()" data-dismiss="modal">Create\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n\n<div id="rename-room-modal" class="modal fade">\n    <div class="modal-dialog modal-sm">\n        <form role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Rename Floorplan</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="room-name-edit">Name</label>\n\n                        <input type="text" class="form-control" ng-model="room.name" id="room-name-edit" required autofocus>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                    <button type="submit" class="btn btn-primary pull-right" ng-click="saveRoom()" data-dismiss="modal">\n                        Save\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n\n<div>\n    <h4 class="rnd-title" title="Locations">Locations</h4>\n\n    <div class="pull-right" ng-if="perm>1">\n        <button type="button" class="btn btn-primary" ng-click="addOffice()" ng-if="perm === 4">Add location</button>\n        <button type="button" class="btn btn-primary" ng-click="newRoom()" ng-if="perm === 4" ng-disabled="!offices || offices.length === 0">Add floor\n        </button>\n    </div>\n</div>\n\n<empty-block ng-if="offices && offices.length === 0" command="addOffice()" header="Add location" help="It looks you don\'t have any Locations. Start by adding yours.">\n</empty-block>\n\n<div class="row">\n    <div ng-class="{\'col-sm-6\': offices.length>1, \'col-sm-12\': offices.length==1}" ng-repeat="office in offices | filter:officeFilter | orderBy:\'name\'">\n        <div class="rnd-container">\n            <div class="dropdown room-menu pull-right" ng-if="perm>1">\n                <button class="btn-icon dropdown-toggle btn-actions" type="button" id="editOfficeMenu" data-toggle="dropdown">\n                    <i class="fa fa-cog"></i> Actions\n                    <span class="caret"></span>\n                </button>\n                <ul class="dropdown-menu" role="menu" aria-labelledby="editOfficeMenu">\n                    <li role="presentation" title="Office settings">\n                        <a role="menuitem" ng-click="editOffice(office)"> <span class="fa fa-pencil"></span> Edit</a></li>\n                    <li role="presentation"><a role="menuitem" tabindex="-1" ng-click="newRoom(office)"><i class="fa fa-plus"></i> Add floor</a></li>\n                    <li class="divider"></li>\n                    <li><a role="menuitem" ng-click="deleteOffice(office)"> <span class="fa fa-trash-o"></span> Delete</a></li>\n                    \n                </ul>\n            </div>\n            <h3 class="rnd-container-header">{{ office.name }}</h3>\n            <i class="office-status" ng-class="{open: office.isOpen}">{{ office.isOpen ? \'Operational\' : \'Draft\' }}</i>\n            <table class="table">\n                <thead>\n                <th>Floorplan</th>\n                <th>Name</th>\n                <th>Floor</th>\n                </thead>\n                <tbody>\n                <tr ng-repeat="room in roomsByOffice[office._id] | filter:versionFilter | orderBy: \'floor\'">\n                    <td>\n                        <a title="Open in designer." ui-sref="organization.office.floorplan({ office: office.slug, roomSlug: room.slug })">\n                            <img class="room-preview" height="50px" ng-src="{{ previewUri(room) }}" alt="Room preview" title="Room preview">\n                        </a>\n                    </td>\n                    <td>\n                        <div>\n                            <a title="Open in designer." class="dark-link" ui-sref="organization.office.floorplan({ office: office.slug, roomSlug: room.slug })">{{\n                                room.name }}</a>\n\n                            <div class="room-menu dropdown" ng-if="perm>1">\n                                <button class="btn-icon dropdown-toggle" type="button" id="roomEditMenu" data-toggle="dropdown" title="Room operations - edit, duplicate or delete.">\n                                    <i class="fa fa-cog"></i>\n                                </button>\n                                <ul class="dropdown-menu" role="menu" aria-labelledby="roomEditMenu">\n                                    <li role="presentation"><a role="menuitem" tabindex="-1" ng-click="editRoom(room)"> <span class="fa fa-pencil" title="Open the edit dialog to modify the selected room."></span> Edit</a>\n                                    </li>\n                                    <li role="presentation"><a role="menuitem" tabindex="-1" ui-sref="organization.office.design({ office: office.slug, roomSlug: room.slug })">\n                                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewbox="5 5 20 20">\n                                            <path d="M5.6,6.6v18h7v-2h0c0-2.2,1.8-4,4-4v6h7v-18H5.6z M21.6,22.6h-4v-5h-1v0c-2.8,0-5,2.2-5,5h0h-4v-14h14V22.6z"></path>\n                                        </svg>\n                                        Design</a>\n                                    </li>\n                                    <li role="presentation"><a role="menuitem" tabindex="-1" ng-click="cloneRoom(room)"> <span class="fa fa-files-o" title="Duplicate the room with it\'s properties and furniture."></span>\n                                        Duplicate</a>\n                                    </li>\n                                    <li class="divider"></li>\n                                    <li role="presentation"><a role="menuitem" tabindex="-1" ng-click="deleteRoom(room)"><span class="fa fa-trash-o" title="Deletes the selected room."></span>\n                                        Delete</a></li>\n                                </ul>\n                            </div>\n                        </div>\n                        <div class="floorplan-versions" ng-if="perm>1 && room.versions.length>0">\n                            <ul class="list-unstyled">\n                                <li ng-repeat="rv in getVersions(room)" class="floorplan-version-name">\n                                    <a title="Open in designer." ui-sref="organization.office.floorplan({ office: office.slug, roomSlug: rv.slug })">\n                                        <span class="fa fa-files-o"></span> {{ rv.name }}\n                                    </a>\n\n                                    <div class="room-menu dropdown">\n                                        <button class="btn-icon dropdown-toggle" type="button" id="editMenu" data-toggle="dropdown" title="Rename or delete room version.">\n                                            <i class="fa fa-cog"></i>\n                                        </button>\n                                        <ul class="dropdown-menu" role="menu" aria-labelledby="editMenu">\n                                            <li role="presentation">\n                                                <a role="menuitem" tabindex="-1" ng-click="renameRoom(rv)">\n                                                <span class="fa fa-pencil" title="Open the edit dialog to modify the selected room.">\n                                                </span>\n                                                    Edit\n                                                </a>\n                                            </li>\n                                            <li class="divider"></li>\n                                            <li role="presentation">\n                                                <a role="menuitem" tabindex="-1" ng-click="deleteRoom(rv)">\n                                                <span class="fa fa-trash-o" title="Deletes the selected room.">\n                                                </span>\n                                                    Delete\n                                                </a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </li>\n                            </ul>\n                        </div>\n                    </td>\n                    <td>\n                        <span title="Floor"> {{room.floor}}</span>\n                    </td>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n<loading ng-if="!offices" help="locations"></loading>'), e.put("/app/organization/space/furniture.html", '<h4 class="rnd-title" title="Furniture">Furniture</h4>\n\n<div ng-if="data && data._organization.length>0">\n    <div class="rnd-container">\n        <table class="table">\n            <thead>\n            <th>Type</th>\n            <th>Count</th>\n            </thead>\n            <tbody>\n            <tr ng-repeat="item in data._organization | orderBy:\'-count\'">\n                <td>\n                    {{ ::item.title }}\n                </td>\n                <td>\n                    {{ ::item.count }}\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n\n    <div class="row">\n        <div class="col-sm-6" ng-repeat="(office, furniture) in data.furniture" ng-if="office !== \'_organization\'">\n            <div class="rnd-container">\n                <h3 class="rnd-container-header" title="{{ ::office }}">{{ ::office }}</h3>\n                <table class="table">\n                    <thead>\n                    <th>Type</th>\n                    <th>Count</th>\n                    </thead>\n                    <tbody>\n                    <tr ng-repeat="item in furniture | orderBy:\'-count\'">\n                        <td>\n                            {{ ::item.title }}\n                        </td>\n                        <td>\n                            {{ ::item.count }}\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n\n<empty-block ng-if="data._organization.length === 0" help="Currently there are no furniture. You should first create floorplans."></empty-block>\n\n<loading ng-if="!data" help="assets"></loading>'), e.put("/app/organization/space/locationsFilter.html", '<div class="rnd-filter-tabs-panel" ng-if="offices.length>1">\n        <label>Locations </label>\n        <a ng-click="filterOffice()" ng-class="{ active: !office}" class="office-location">All</a>\n        <a ng-repeat="l in offices | orderBy: \'name\'" ng-click="filterOffice(l._id)" class="office-location" ng-class="{ active: office === l._id, draft: !l.isOpen }">{{ l.name }}</a>\n</div>'), e.put("/app/organization/space/meetingRooms.html", '<div>\n    <div>\n        <h4 class="rnd-title" title="Meeting Rooms">Meeting Rooms</h4>\n        <locations-filter></locations-filter>\n    </div>\n    <div class="rnd-container" ng-if="resources">\n        <search-box model="search.name"></search-box>\n        <table class="table">\n            <thead>\n                <th>Name</th>\n                <th>Plan</th>\n            </thead>\n            <tbody>\n                <tr class="grid-row" ng-repeat="resource in resources | deskFilter:roomsById:search | orderBy: getNormalized(\'name\')">\n                    <td>\n                        <div class="image-table">\n                            <user-picture class="profile-md image-cell" item="resource" icon="\'fa-comments-o\'"></user-picture>\n                            <div class="info-cell middle">\n                                <a class="dark-link" ng-click="editResource(resource)">\n                                    <color color="resource.color"></color>{{resource.name}}</a>\n                                <p class="member-email">\n                                    {{ resource.description }}\n                                </p>\n                            </div>\n                        </div>\n                    </td>\n                    <td>\n                        <expand-plan no-color="true" plan-id="resource.targetPlan"></expand-plan>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>'), e.put("/app/organization/space/occupancy.html", '<div>\n    <h4 class="rnd-title">Occupancy</h4>\n\n    <div class="rnd-container">\n        <div class="offset-top" ng-if="occupancyHistory">\n            <kendo-chart k-options="occupancyHistoryOptions" k-data-source="occupancyHistory"></kendo-chart>\n        </div>\n    </div>\n</div>\n\n<div>\n    <h4 class="rnd-title">Real-time Occupancy</h4>\n\n    <div ng-if="statuses" class="rnd-container">\n        <div class="row offset-top">\n            <div class="col-sm-5">\n                <table class="table">\n                    <thead>\n                    <th>Workstation Status</th>\n                    <th>Count</th>\n                    </thead>\n                    <tbody>\n                    <tr ng-repeat="status in statuses | orderBy:\'-count\'">\n                        <td>\n                            <color color="status.color"></color>\n                            {{ ::status.text }}\n                        </td>\n                        <td>\n                            {{ ::status.count }}\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n            <div class="col-md-7">\n                <kendo-chart k-options="workstationChartOptions" k-data-source="statuses"></kendo-chart>\n            </div>\n        </div>\n    </div>\n</div>'), e.put("/app/organization/space/privateOffices.html", '<div>\n    <div>\n        <h4 class="rnd-title" title="Private Offices">Private Offices</h4>\n        <locations-filter></locations-filter>\n    </div>\n    <div class="rnd-container" ng-if="resources">\n        <search-box model="search.name"></search-box>\n        <table class="table">\n            <thead>\n                <th>Name</th>\n                <th>Target Plan</th>\n                <th>Desks</th>\n            </thead>\n            <tbody>\n                <tr class="grid-row" ng-repeat="resource in resources | deskFilter:roomsById:search | orderBy: getNormalized(\'name\') ">\n                    <td>\n                        <resource-link resource="resource" menu="perm>1"></resource-link>\n                    </td>\n                    <td>\n                        <expand-plan plan-id="resource.targetPlan"></expand-plan>\n                    </td>\n                    <td>\n                        {{ getDesksCount(resource) }}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>'), e.put("/app/organization/space/template.html", '<div class="row">\n    <div class="col-sm-3">\n        <h4 class="rnd-title" title="Space Management">Space</h4>\n\n        <div class="basic-list-group">\n            <a ng-class="{active:isActive(\'space\')}" ui-sref="organization.manage.space.locations">Locations\n                <span class="item-count">{{ officesCount }}</span>\n            </a>\n            <a ng-class="{active:isActive(\'meeting-rooms\')}" ui-sref="organization.manage.space.meetingrooms">Meeting Rooms\n                <span class="item-count">{{ meetingRoomsCount }}</span>\n            </a>\n            <a ng-class="{active:isActive(\'private-offices\')}" ui-sref="organization.manage.space.privateoffices">Private Offices\n                <span class="item-count">{{ privateOfficesCount }}</span>\n            </a>\n            <a ng-class="{active:isActive(\'desks\')}" ui-sref="organization.manage.space.desks">Desks\n                <span class="item-count">{{ desksCount }}</span>\n            </a>\n            <a ng-class="{active:isActive(\'furniture\')}" ui-sref="organization.manage.space.furniture">Furniture</a>\n            <hr>\n            <a ng-class="{active:isActive(\'occupancy\')}" ui-sref="organization.manage.space.occupancy">Occupancy</a>\n            <a ng-class="{active:isActive(\'analytics\')}" ui-sref="organization.manage.space.analytics">Analytics</a>\n            <hr>\n            <a ui-sref="organization.manage.settings.space">Settings</a>\n        </div>\n    </div>\n    <div class="col-sm-9">\n        <div ui-view></div>\n    </div>\n</div>'), e.put("/app/organization/template.html", '<div class="container-fluid rnd-tabs-panel">\n    <img ng-if="org.image" ng-src="{{org.image}}" class="org-header-image" alt="{{org.name}}">\n    <ul class="nav nav-tabs rnd-tabs" role="tablist" ng-cloak>\n        <li ng-class="{active:isActive(\'\', true)}">\n            <a role="tab" ui-sref="organization.manage.dashboard"><i class="fa fa-tachometer"></i>\n                <span class="hidden-xs">Dashboard</span>\n            </a>\n        </li>\n        <li ng-class="{active:isActive(\'community\', true)}">\n            <a role="tab" ui-sref="organization.manage.community.root"><i class="fa fa-users"></i>\n                <span class="hidden-xs">Community</span></a>\n        </li>\n        <li ng-class="{active:isActive(\'billing\', true)}" ng-if="settings.billing.enabled">\n            <a role="tab" ui-sref="organization.manage.billing.dashboard"><i class="fa fa-credit-card"></i>\n                <span class="hidden-xs">Billing</span></a>\n        </li>\n        <li ng-class="{active:isActive(\'space\', true)}">\n            <a role="tab" ui-sref="organization.manage.space.locations"><i class="fa fa-map-marker"></i>\n                <span class="hidden-xs">Space</span>\n            </a>\n        </li>\n        <li ng-class="{active:isActive(\'calendar\', true)}">\n            <a role="tab" ui-sref="organization.manage.calendar"><i class="fa fa-calendar-o"></i>\n                <span class="hidden-xs">Calendar</span></a>\n        </li>\n        <li ng-class="{active:isActive(\'settings\', true)}" ng-if="perm>2">\n            <a role="tab" ui-sref="organization.manage.settings.general"><i class="fa fa-cog"></i> <span class="hidden-xs">Settings</span></a>\n        </li>\n    </ul>\n</div>\n<div class="container-fluid tab-content main container-offset">\n    <section class="tab-pane active">\n        <div ui-view></div>\n    </section>\n</div>'), e.put("/app/organization/templateBase.html", "<div ui-view></div>\n\n<member-dialogs></member-dialogs>\n<contacts-dialogs></contacts-dialogs>\n<export-members-dialogs></export-members-dialogs>\n<team-dialogs></team-dialogs>\n<lead-dialogs></lead-dialogs>\n<office-dialogs></office-dialogs>\n<resource-dialogs></resource-dialogs>\n<payment-dialogs></payment-dialogs>\n<move-dialogs></move-dialogs>\n<billing-details-dialogs></billing-details-dialogs>"), e.put("/app/paymentDialogs.html", '<div id="payment-modal" role="dialog" class="modal fade" rnd-modal modal-focus="#payment-number" modal-hidden="cleanUpData()">\n    <div class="modal-dialog modal-lg">\n        <form class="form-horizontal">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Add Invoice</h3>\n                </div>\n\n                <div class="modal-body">\n                    <div class="form-group" ng-hide="payment.member || originalInvoice">\n                        <label for="payment-to" class="col-sm-2 control-label">To</label>\n\n                        <div class="col-sm-10">\n                            <select id="payment-to" class="form-control" kendo-drop-down-list k-ng-model="invoice.target.team" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'name\'" k-filter="\'contains\'" k-on-change="onTargetChange()" k-data-source="teams" k-rebind="payment" k-option-label="{ name: \'Not selected\', _id: null }">\n                            </select>\n                        </div>\n                    </div>\n\n                    <div class="form-group" ng-show="invoicingType === \'basic\' && (invoice.target.team || invoice.target.member)">\n                        <label for="payment-number" class="col-sm-2 control-label">Invoice #</label>\n\n                        <div class="col-sm-10">\n                            <input id="payment-number" class="form-control" ng-model="payment.number">\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <label for="payment-date" class="col-sm-2 control-label">Issue Date</label>\n\n                        <div class="col-sm-4">\n                            <input id="payment-date" class="form-control" kendo-date-picker k-ng-model="invoice.issueDate" k-on-change="issueDateChanged()" k-rebind="payment" k-format="dateFormat" k-parse-formats="[\'dd/MM/yyyy\', \'yyyy-MM-ddTHH:mm:ss\']">\n                        </div>\n\n                        <label for="invoice-date" class="col-sm-2 control-label">Period Start</label>\n\n                        <div class="col-sm-4">\n                            <input id="invoice-date" class="form-control" kendo-date-picker k-ng-model="invoice.periodStart" k-on-change="regenerateLines()" k-depth="\'year\'" k-start="\'year\'" k-rebind="invoice" k-format="\'MMMM yyyy\'" k-parse-formats="[\'MMMM yyyy\', \'yyyy-MM-ddTHH:mm:ss\']">\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <label for="payment-for" class="col-sm-2 control-label">Pay For</label>\n\n                        <div class="col-sm-4">\n                            <select id="payment-for" class="form-control" kendo-drop-down-list ng-model="invoice.periodLength" ng-change="regenerateLines()">\n                                <option value="1">1 month</option>\n                                <option value="2">2 months</option>\n                                <option value="3">3 months</option>\n                                <option value="4">4 months</option>\n                                <option value="5">5 months</option>\n                                <option value="6">6 months</option>\n                                <option value="12">12 months</option>\n                            </select>\n                        </div>\n\n                        <label for="payment-discount" class="col-sm-2 control-label">Discount</label>\n\n                        <div class="col-sm-4">\n                            <div class="input-group">\n                                <input id="payment-discount" type="number" class="form-control" ng-model="invoice.discount" ng-change="mainDiscountChanged()" step="5" min="0" max="100">\n                                <span class="input-group-addon">%</span>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="form-group" ng-show="invoicingType === \'basic\' && (invoice.target.team || invoice.target.member)">\n                        <label for="payment-method" class="col-sm-2 control-label">Payment Method</label>\n\n                        <div class="col-sm-10">\n                            <select id="payment-method" class="form-control" kendo-drop-down-list ng-model="payment.method">\n                                <option value="cash">Cash</option>\n                                <option value="bank">Bank Transfer</option>\n                                <option value="pos">POS</option>\n                            </select>\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <div class="col-sm-12">\n                            <table class="table no-borders row">\n                                <thead>\n                                <th class="col-sm-4"><label>Description</label></th>\n                                <th class="col-sm-2 column-right"><label>Unit Price {{ currencySymbol(currency) }}</label></th>\n                                <th class="col-sm-2 column-right"><label>Quantity</label></th>\n                                <th class="col-sm-2 column-right"><label>Discount %</label></th>\n                                <th class="col-sm-2 column-right"><label>Price</label></th>\n                                </thead>\n                                <tbody>\n                                <tr ng-repeat="item in lines">\n                                    <td>{{ item.description }}</td>\n                                    <td class="column-right">{{ item.unitPrice }}</td>\n                                    <td class="column-right">\n                                        <input class="pull-right" type="number" step="0.01" min="0" ng-change="quantityChanged(item)" ng-model="item.quantity" aria-label="quantity" style="width: 60px">\n                                    </td>\n                                    <td class="column-right">\n                                        <input class="pull-right" type="number" step="5" min="0" max="100" ng-change="discountChanged(item)" ng-model="item.discount" aria-label="discount" style="width: 60px">\n                                    </td>\n                                    <td class="column-right">{{ item.price | isoCurrency: currency }}</td>\n                                </tr>\n                                <tr ng-repeat="item in additionalLines">\n                                    <td>\n                                        <input type="text" placeholder="Example: Additional services" ng-model="item.description" aria-label="description">\n                                        <button type="button" class="btn-icon" ng-click="removeItem(item)"><i class="fa fa-trash-o"></i></button>\n                                    </td>\n                                    <td class="column-right">\n                                        <input class="pull-right" type="number" min="0" ng-change="unitPriceChanged(item)" ng-model="item.unitPrice" aria-label="unit price" style="width: 90px">\n                                    </td>\n                                    <td class="column-right">\n                                        <input class="pull-right" type="number" step="0.01" min="0" ng-change="quantityChanged(item)" ng-model="item.quantity" aria-label="quantity" style="width: 60px">\n                                    </td>\n                                    <td class="column-right">\n                                        <input class="pull-right" type="number" step="5" min="0" max="100" ng-change="discountChanged(item)" ng-model="item.discount" aria-label="discount" style="width: 60px">\n                                    </td>\n                                    <td class="column-right">{{ item.price | isoCurrency: currency }}</td>\n                                </tr>\n                                <tr>\n                                    <td colspan="4"><button class="btn btn-default btn-sm" ng-click="addLine()">Add</button></td>\n                                    <td class="column-right"><strong>{{ total | isoCurrency: currency }}</strong></td>\n                                </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                    <button type="submit" class="btn btn-primary" ng-click="commitPayment()" ng-if="!originalInvoice" ng-disabled="!payment.date || (lines.length === 0 && additionalLines.length === 0)" data-dismiss="modal">Add\n                    </button>\n                    <button type="submit" class="btn btn-primary" ng-click="savePayment()" ng-if="originalInvoice" ng-disabled="!payment.date || (lines.length === 0 && additionalLines.length === 0)" data-dismiss="modal">Save\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n\n<div id="add-charge-modal" role="dialog" class="modal fade" rnd-modal modal-focus="#charge-amount" modal-hidden="cleanupCharge()">\n    <div class="modal-dialog modal-sm">\n        <form class="form-horizontal">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">Add Payment for Invoice #{{ invoice.number }}</h3>\n                </div>\n\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="charge-account" class="col-sm-3 control-label">Method</label>\n\n                        <div class="col-sm-9">\n                            <select id="charge-account" class="form-control" kendo-drop-down-list k-ng-model="charge.account" k-value-primitive="true" k-data-source="accounts">\n                            </select>\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <label for="charge-amount" class="col-sm-3 control-label">Amount</label>\n\n                        <div class="col-sm-9">\n                            <div class="input-group">\n                                <input type="number" class="form-control" ng-model="charge.amount" step="1" id="charge-amount" required placeholder="Example: {{ 100 | isoCurrency: currency }}">\n                                <span class="input-group-addon">{{ ::currency }}</span>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <label for="charge-reference" class="col-sm-3 control-label">Reference</label>\n\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" ng-model="charge.reference" id="charge-reference">\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <label for="charge-date" class="col-sm-3 control-label">Date</label>\n\n                        <div class="col-sm-9">\n                            <input id="charge-date" class="form-control" kendo-date-picker k-ng-model="charge.date" k-format="dateFormat">\n                        </div>\n                    </div>\n                </div>\n\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n                    <button type="submit" class="btn btn-primary" ng-click="saveCharge()" ng-disabled="!charge.amount" data-dismiss="modal">Add</button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>'),
            e.put("/app/resourceDialogs.html", '<div>\n    <div id="desk-modal" rnd-modal modal-focus="#desk-id" modal-hidden="cleanUpResource()">\n        <div class="modal-dialog modal-md">\n            <form class="form-horizontal" role="form">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                        <h3 class="modal-title">Edit Desk</h3>\n                    </div>\n                    <div class="modal-body">\n                        <div class="form-group" ng-if="!multiple">\n                            <label for="desk-id" class="col-sm-3 control-label">Name</label>\n                            <div class="col-sm-9">\n                                <input type="text" class="form-control" ng-model="resource.name" id="desk-id" placeholder="1-1">\n                            </div>\n                        </div>\n                        <div class="form-group">\n                            <label class="col-sm-3 control-label">Type</label>\n                            <div class="col-sm-9">\n                                <div class="btn-group btn-group-justified">\n                                    <div class="btn-group" ng-repeat="(key, type) in deskTypes">\n                                        <button type="button" class="btn btn-default" ng-class="{ active: resource.type === key }" ng-click="changeSelectedType(key)" title="{{ ::type.title }}">\n                                            <i class="{{ ::type.icon }}"></i>\n                                            <div>{{type.title}}</div>\n                                        </button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="form-group" ng-if="plans.length > 0">\n                            <label for="target-plan" class="col-sm-3 control-label">Target plan</label>\n                            <div class="col-sm-9">\n                                <select id="target-plan" class="form-control" kendo-drop-down-list k-ng-model="resource.targetPlan" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'label\'" k-option-label="{ label: \'Not selected\', _id: null }" k-rebind="resource" k-data-source="plans">\n                                </select>\n                            </div>\n                        </div>\n                        <div class="form-group" ng-if="privateOffices.length > 0">\n                            <label for="private-office" class="col-sm-3 control-label">Private office</label>\n                            <div class="col-sm-9">\n                                <select id="private-office" class="form-control" kendo-drop-down-list k-ng-model="resource.parent" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'name\'" k-option-label="{ name: \'Not selected\', _id: null }" k-rebind="resource" k-data-source="privateOffices">\n                                </select>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="modal-footer">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">\n                            Close\n                        </button>\n                        <button type="submit" class="btn btn-primary" ng-click="confirmResource()" data-dismiss="modal" ng-disabled="!canUpdateDesk()">\n                            Update\n                        </button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div id="meeting-room-modal" rnd-modal modal-focus="#target-plan" modal-hidden="cleanUpResource()">\n        <div class="modal-dialog modal-md">\n            <form class="form-horizontal" role="form">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                        <h3 class="modal-title">Edit Meeting Room</h3>\n                    </div>\n                    <div class="modal-body">\n                        <div class="form-group" ng-if="!multiple">\n                            <label for="desk-id" class="col-sm-3 control-label">Name</label>\n                            <div class="col-sm-9">\n                                <input type="text" class="form-control" ng-model="resource.name">\n                            </div>\n                        </div>\n                        <div class="form-group">\n                            <label for="target-plan" class="col-sm-3 control-label">Target plan</label>\n                            <div class="col-sm-9">\n                                <select id="target-plan" class="form-control" kendo-drop-down-list k-ng-model="resource.targetPlan" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'label\'" k-option-label="{ label: \'Not selected\', _id: null }" k-rebind="resource" k-data-source="plans">\n                                </select>\n                            </div>\n                        </div>\n                        <div class="form-group">\n                            <label for="room-description" class="col-sm-3 control-label">Description</label>\n                            <div class="col-sm-9">\n                                <input type="text" class="form-control" ng-model="resource.description" id="room-description" placeholder="Description">\n                            </div>\n                        </div>\n                        <div class="col-sm-offset-3 col-sm-9">\n                            <div class="checkbox">\n                                <label>\n                                    <input type="checkbox" ng-model="resource.public">Public\n                                </label>\n                            </div>\n                            <small>This room will be public for all members</small>\n                        </div>\n                        <div class="form-group">\n                            <label class="col-sm-3 control-label">Image</label>\n                            <div class="col-sm-9">\n                                <image-upload image-url="resource.image" target="{{ resource.name }}" default-icon="fa-comments-o"></image-upload>\n                            </div>\n                        </div>\n                        <div class="form-group">\n                            <label for="label-color" class="col-sm-3 control-label">Color</label>\n                            <div class="col-sm-3">\n                                <input kendo-color-picker class="form-control color-input" id="label-color" placeholder="#00FF00" ng-model="resource.color">\n                        </div>\n                    </div>\n                    </div>\n                    <div class="modal-footer">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">\n                            Close\n                        </button>\n                        <button type="submit" class="btn btn-primary" ng-click="confirmResource()" data-dismiss="modal" ng-disabled="!resource.type">\n                            Update\n                        </button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div id="team-room-modal" rnd-modal modal-focus="#target-plan" modal-hidden="cleanUpResource()">\n        <div class="modal-dialog modal-sm">\n            <form class="form-horizontal" role="form">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                        <h3 class="modal-title">Edit Private Office</h3>\n                    </div>\n                    <div class="modal-body">\n                        <div class="form-group" ng-if="!multiple">\n                            <label for="desk-id" class="col-sm-3 control-label">Name</label>\n                            <div class="col-xs-9 readonly-value-container">\n                                <span class="readonly-value">{{ originalResource.name }}</span>\n                            </div>\n                        </div>\n                        <div class="form-group">\n                            <label for="target-plan" class="col-sm-3 control-label">Target plan</label>\n                            <div class="col-sm-9">\n                                <select id="target-plan" class="form-control" kendo-drop-down-list k-ng-model="resource.targetPlan" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'label\'" k-option-label="{ label: \'Not selected\', _id: null }" k-rebind="resource" k-data-source="plans">\n                                </select>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="modal-footer">\n                        <button type="button" class="btn btn-default" data-dismiss="modal">\n                            Close\n                        </button>\n                        <button type="submit" class="btn btn-primary" ng-click="confirmResource()" data-dismiss="modal" ng-disabled="!resource.type">\n                            Update\n                        </button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>'), e.put("/app/teamDialogs.html", '<div id="team-modal" rnd-modal modal-focus="#team-name" modal-hidden="cleanUpData()">\n    <div class="modal-dialog">\n        <form class="form-horizontal" role="form">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                    <h3 class="modal-title">{{ original ? \'Edit\' : \'Add\' }} {{ ::teamProperty.name }}</h3>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label for="team-name" class="col-sm-3 control-label">Name</label>\n\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" ng-model="team.name" id="team-name" placeholder="Office Innovation Labs">\n                        </div>\n                    </div>\n\n                    <div class="form-group" ng-if="teamMembers && teamMembers.length > 0">\n                        <label for="team-person-of-contact" class="col-sm-3 control-label">Main Contact</label>\n\n                        <div class="col-sm-9">\n                            <select id="team-person-of-contact" class="form-control" kendo-drop-down-list k-ng-model="team.personOfContact" k-value-primitive="true" k-data-value-field="\'_id\'" k-data-text-field="\'name\'" k-filter="\'contains\'" k-data-source="teamMembers" k-rebind="team" k-option-label="{ name: \'Not selected\', _id: null }">\n                            </select>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="team-email" class="col-sm-3 control-label">Email</label>\n\n                        <div class="col-sm-9">\n                            <input type="email" class="form-control" ng-model="team.email" id="team-email" placeholder="example@email.com">\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="team-twitter" class="col-sm-3 control-label">Twitter</label>\n\n                        <div class="col-sm-9">\n                            <input id="team-twitter" class="form-control" placeholder="Twitter handle" ng-model="team.twitterHandle">\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label class="col-sm-3 control-label">Start Date</label>\n\n                        <div class="col-sm-9">\n                            <input id="team-startDate" class="form-control" kendo-date-picker placeholder="Start Date" k-ng-model="team.startDate" k-rebind="team" k-format="dateFormat" k-min="firstPossibleDate" k-max="lastPossibleDate">\n                        </div>\n                    </div>\n\n                    <div class="form-group" ng-repeat="property in org.customProperties | filter: \'team\'">\n                        <label class="col-sm-3 control-label">{{property.title}}</label>\n\n                        <div class="col-sm-9">\n                            <input type="text" class="form-control" ng-model="team.properties[property.title]" placeholder="{{property.title}}" auto-complete-list="property.hintValues">\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-default" data-dismiss="modal">\n                        Close\n                    </button>\n                    <button type="submit" class="btn btn-primary" ng-disabled="!team.name" data-dismiss="modal" ng-click="commitTeam()">\n' + "                        {{ original ? 'Update' : 'Add' }}\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>")
    }])
}), define("commonServices", ["underscore", "app"], function(e, n) {
    n.factory("analyticsService", ["$window", function(n) {
        var t;
        return t = n._gs || e.noop, {
            trackEvent: function(e) {
                t("event", e)
            },
            setUserProperties: function(e) {
                t("properties", {
                    custom: e
                })
            }
        }
    }]), n.filter("rndSort", ["$filter", function(e) {
        var n = e("orderBy");
        return function(e, t) {
            return t = t || {}, n(e, t.sortBy, t.sortDirection)
        }
    }]), n.factory("sortingService", [function() {
        function e(e) {
            return e && e.replace(/\d+/g, function(e) {
                return Array(t - e.length + 1).join("0") + e
            })
        }

        function n(n) {
            return function(t) {
                if (t) {
                    var a = n ? t[n] : t;
                    return e(a)
                }
            }
        }
        var t = 3;
        return {
            getNormalized: n
        }
    }]), n.factory("chargesService", [function() {
        function n(n, t) {
            var a = t && t.immidiate;
            return a ? e.filter(n.billing, function(e) {
                return e.card
            }) : e.filter(n.billing, function(e) {
                return e.card || e.bankAccount && "verified" === e.bankAccount.status
            })
        }

        function t(e) {
            return e.card ? 10 : 2
        }

        function a(a, o) {
            var i = n(a, o);
            return e.min(i, t)
        }
        return {
            availableBillingDetails: n,
            preferredBillingDetail: a
        }
    }]), n.factory("stripeService", ["$q", function(e) {
        function n(n, t, a, o, i) {
            var s;
            return s = e.defer(), Stripe.card.createToken({
                name: n,
                number: t,
                cvc: i,
                exp_month: a,
                exp_year: o
            }, function(e, n) {
                n.error ? s.reject(n.error) : s.resolve(n.id)
            }), s.promise
        }

        function t(n) {
            var t;
            return t = e.defer(), Stripe.bankAccount.createToken({
                country: n.country,
                currency: n.currency,
                routing_number: n.routingNumber,
                account_number: n.accountNumber,
                account_holder_name: n.name,
                account_holder_type: n.type
            }, function(e, n) {
                n.error ? t.reject(n.error) : t.resolve(n.id)
            }), t.promise
        }

        function a(e) {
            var t, a;
            return t = e.expDate.split("/"), a = e.number.replace(/\s/gi, ""), n(e.name, a, t[0], t[1], e.cvc)
        }
        var o = {
            countries: [{
                name: "United States",
                value: "US"
            }, {
                name: "Canada",
                value: "CA"
            }],
            currencies: ["USD", "CAD", "EUR"],
            accountTypes: [{
                name: "Individual",
                value: "individual"
            }, {
                name: "Company",
                value: "company"
            }],
            masksByCountry: {
                US: "000000000",
                CA: "00000-000"
            }
        };
        return {
            options: o,
            getCardToken: a,
            getBankAccountToken: t,
            init: function(e) {
                Stripe.setPublishableKey(e)
            }
        }
    }]), n.factory("dateFormatService", [function() {
        function e(e, a) {
            return e.dateFormat + t + n[a]
        }
        var n, t = " hh:mm ";
        return n = {
            angular: "a",
            kendo: "tt"
        }, {
            getDateTimeFormat: e
        }
    }])
}), define("profile", ["app", "underscore"], function(e, n) {
    e.directive("profile", function() {
        return {
            restrict: "E",
            scope: !0,
            templateUrl: "/common/profile.html",
            link: function(e) {
                e.email = n.first(e.user.emails)
            }
        }
    })
}), define("accountControllers", ["jquery", "underscore", "string", "moment", "app", "utils", "alert", "profile"], function(e, n, t, a, o, i, s) {
    o.controller("BaseController", ["$rootScope", "$scope", "$location", "$stateParams", "$window", "$http", "apiRoot", function(t, a, o, r, l, c, d) {
        a.API = d + "/", a.API_ORG = d + "/organizations/", a.user = l.user, a.user && (a.user.changePass && (a.newPass = "", e("#change-pass-modal").modal("show")), a.changePass = function() {
            c.put(a.API + "profiles/" + a.user.id + "/password", {
                newPassword: a.newPass
            }).then(function() {
                e("#change-pass-modal").modal("hide"), s.ok("Successfully changed the password.")
            }).then(null, function() {
                s.error("Unable to change password.")
            })
        }), t.broadcastRoot = function(e, n) {
            t.$broadcast(e, n)
        }, t.toggleHelpDialog = function() {
            e("#help-modal").modal("show")
        }, t.safeApply = function() {
            var e, n, t = !1;
            if (1 == arguments.length) {
                var a = arguments[0];
                "function" == typeof a ? n = a : e = a
            } else e = arguments[0], n = arguments[1], 3 == arguments.length && (t = !!arguments[2]);
            e = e || this, n = n || function() {}, t || !e.$$phase ? e.$apply ? e.$apply(n) : e.apply(n) : n()
        }, t.isActive = function(e, n) {
            return i.isActivePath(e, o.path(), n, r.organization)
        }, t.initOrg = function(e) {
            e ? (t.settings = n.extend({
                billing: {
                    enabled: !0,
                    currency: "GBP"
                }
            }, e.settings), t.teamProperty = e.settings.teamProperty, t.title = e.name + " | OfficeR&D", t.label = {
                image: e.image,
                url: "/" + e.slug,
                name: e.name
            }) : (delete t.label, delete t.title)
        }
    }]), o.controller("SpacesController", ["$rootScope", "$scope", "$http", "$state", "apiRoot", function(e, a, o, r, l) {
        a.slug = function(e) {
            return t(e || "").slugify().s
        }, e.initOrg(), e.title = "Dashboard | OfficeR&D", a.toggleOrganisationAsDefault = function(e) {
            var t = e.id;
            a.user.defaultOrganisation === t && (t = null), o.put(i.joinPath(l, "profiles", a.user.id), {
                defaultOrganisation: t
            }).then(function(e) {
                n.extend(a.user, e.data), s.ok("Successfully changed the default space")
            }).then(null, function() {
                s.error("Unable to change default space")
            })
        }, o.get(a.API_ORG).success(function(e) {
            a.organizations = e
        }).error(function(e) {}), a.addOrg = function(e) {
            o.post(a.API_ORG, {
                name: e,
                sample: !1
            }).success(function(e) {
                0 === a.organizations.length && (a.user.defaultOrganisation = e._id), r.go("organization.manage.dashboard", {
                    organization: e.slug
                })
            }).error(function() {
                s.error("Unable to add an organization.")
            })
        }
    }]), o.controller("ProfileController", ["$rootScope", "$scope", "$window", "$http", "s3Upload", "apiRoot", function(t, a, o, r, l, c) {
        function d(e) {
            r.put(i.joinPath(c, "profiles", a.user.id), {
                image: e
            }).success(function(e) {
                n.extend(o.user, e), s.ok("Profile picture saved successfully.")
            }).error(function() {
                s.error("Unable to change profile picture.")
            })
        }
        a.user = n.clone(o.user), a.originalUser = o.user, t.title = a.user.displayName + " | OfficeR&D", a.update = function() {
            var e = a.user;
            r.put(i.joinPath(c, "profiles", a.user.id), n.omit(e, "_id")).success(function(e) {
                n.extend(o.user, e), s.ok("Profile saved successfully.")
            }).error(function() {
                s.error("Unable to save profile.")
            })
        }, a.chooseImage = function() {
            e("#upload-profile-image").click()
        }, a.uploadImg = function(e, n) {
            n && l.profilePicture(n, e).then(d, function(e) {
                s.error("Unable to change the image.")
            })
        }, a.removeImage = function() {
            d(null)
        }, a.sendConfirmation = function(e) {
            r.post("/confirm/send/", e).success(function() {
                s.ok("Confirmation email sent successfully.")
            }).error(function() {
                s.error("Unable to send confirmation email.")
            })
        }, a.updateLogin = function() {
            a.newPassword && r.put(i.joinPath(c, "profiles", a.user._id, "password"), {
                newPassword: a.newPassword
            }).success(function() {
                s.ok("Password changed successfully.")
            }).error(function() {
                s.error("Unable to change password.")
            })
        }
    }]), o.controller("AccountSettingsController", ["$scope", "$window", "$metrics", "$http", function(e, t, a, o) {
        e.user = n.pick(t.user, "_id", "personalId"), e.user.screenOptions = n.clone(t.user.screenOptions), e.update = function() {
            var n = e.user;
            o.put(e.API + "profiles/" + e.user._id, n).success(function() {
                a.setUnitType(e.user.screenOptions.unitType), s.ok("Profile saved successfully.")
            }).error(function() {
                s.error("Unable to save profile.")
            })
        }
    }]), o.directive("helpDialogs", function() {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "/app/helpDialogs.html"
        }
    })
}), define("organizationControllers", ["jquery", "underscore", "app", "alert", "utils", "moment", "string"], function(e, n, t, a, o, i, s) {
    var r = o.today(),
        l = 1.4;
    t.controller("OrganizationBaseController", ["$rootScope", "$state", "$stateParams", "$scope", "$q", "labelsService", "data", function(e, n, t, i, s, r, l) {
        l.setOrgSlug(t.organization), i.addMember = function(e) {
            i.$broadcast("add-member", e)
        }, i.addContact = function(e) {
            i.$broadcast("add-contact", e)
        }, i.editMember = function(e) {
            i.$broadcast("edit-member", e)
        }, i.endTeamMemberships = function(n) {
            e.$broadcast("end-team-memberships", n)
        }, i.addMembershipForTeam = function(e) {
            i.$broadcast("add-membership-team", e)
        }, i.addMemberships = function(e) {
            i.$broadcast("add-memberships", e)
        }, i.approvePlans = function(e, n) {
            var t = {
                lead: e,
                team: n
            };
            i.$broadcast("approve-plans", t)
        }, i.deleteMember = function(e) {
            i.$broadcast("delete-members", [e])
        }, i.deleteMemberships = function(e) {
            i.$broadcast("delete-memberships", e)
        }, i.addTeam = function(e) {
            i.$broadcast("add-team", e)
        }, i.editTeam = function(e) {
            i.$broadcast("edit-team", e)
        }, i.deleteTeam = function(e) {
            i.$broadcast("delete-teams", [e])
        }, i.addLead = function(e) {
            i.$broadcast("add-lead", e)
        }, i.editLead = function(e) {
            i.$broadcast("edit-lead", e)
        }, i.deleteLead = function(e) {
            i.$broadcast("delete-lead", e)
        }, i.addOffice = function() {
            i.$broadcast("add-office")
        }, i.editOffice = function(e) {
            i.$broadcast("edit-office", e)
        }, i.deleteOffice = function(e) {
            i.$broadcast("delete-office", e)
        }, i.addResource = function(e) {
            i.$broadcast("add-org-resource", e)
        }, i.openLocations = function() {
            n.go("organization.manage.space.locations")
        }, i.addInvoice = function(n) {
            e.$broadcast("add-invoice", n)
        }, l.get("org", "org-perm").then(o.spread(function(n, t) {
            i.org = n, r.initialize(n.labels), e.initOrg(n), i.perm = t
        }), function() {
            a.error("Unable to load the organization")
        })
    }]), t.controller("OrganizationDashboardController", ["$scope", "data", "$state", "billingService", "workstationService", "hotdeskService", "$q", "$location", "mrmFilterService", "chartsService", "resourceService", "$metrics", function(e, t, a, s, c, d, m, u, p, f, g, h) {
        function v(e) {
            var t = i(e);
            return t.isBefore(r) ? 0 : n.chain(S.leads).filter(function(n) {
                return !(e && n.startDate && i(n.startDate).startOf("month").isAfter(t) || "open" !== n.status)
            }).reduce(function(e, n) {
                return e + n.dealSize
            }, 0).value()
        }

        function b() {
            var e = n.flatten(arguments);
            return function(t) {
                return n.chain(t).pick(e).sum().value()
            }
        }

        function y(e, t, a) {
            return n.extend({}, t, {
                dataSource: e,
                valueAxis: n.extend({}, t.valueAxis, {
                    max: a * l
                })
            })
        }

        function k(t) {
            e.billingEnabled && (e.leadsSum = v(), s.projectionsAtLocation(M, t).then(function(t) {
                var a = n.map(M, function(n, a) {
                    return {
                        month: n.toDate(),
                        leads: v(n),
                        sum: t[a],
                        target: e.targetSum
                    }
                });
                e.revenueOptions = y(a, f.revenue, n.chain(a).map(b("sum", "leads")).max().value());
                var o = n.map(a, function(e) {
                    return {
                        month: e.month,
                        leads: v(e.month) / e.target,
                        cashupancy: e.sum / e.target
                    }
                });
                e.cashupancyOptions = y(o, f.cashupancy, n.chain(o).map(b("cashupancy", "leads")).max().value()), e.actualSum = t[x], e.projectedRevenue = t[x + 1] + v(i(r).add(1, "month")), e.projectedRevenuePercent = e.projectedRevenue / e.targetSum * 100
            }))
        }

        function w(t, a) {
            var o = n.map(a, function(e, n) {
                return {
                    date: M[n].toDate(),
                    occupiedCount: e.length,
                    occupancyRate: e.length / t
                }
            });
            e.hotdeskOccupancyHistoryOptions = y(o, f.hotdeskOccupancy, n.chain(o).pluck("occupancyRate").max().value())
        }
        var M, S = this,
            x = 1;
        M = s.generateMonths(-1, 4), e.areaLabel = h.getScale("largeRound", "floor").label, e.totalArea = 0, e.occupancyHistoryOptions = f.workstationOccupancy, t.get("org", "mrmModel", "plansModel", "rooms-by-id", "resourcesModel", "officesModel", "leadsModel").then(o.spread(function(t, a, i, s, r, l, f) {
            function h() {
                var p, h, b, y, x, D, P;
                e.office = u.search().office, p = a.teamsModel.items, h = a.membersModel.items, b = l.findById(e.office), y = b && b._id, x = i.findById, S.leads = n.filter(f.items, function(e) {
                    var n = l.findById(e.office);
                    return b ? e.office === y : !n || n.isOpen
                }), e.totalTeams = v(p, {
                    office: y
                }, ["team"]), e.activeTeams = v(p, {
                    office: y,
                    status: "active"
                }, ["team"]), e.totalMembers = v(h, {
                    office: y
                }, ["member"]), e.activeMembers = v(h, {
                    office: y,
                    status: "active"
                }, ["member"]), e.totalLeads = n.filter(S.leads, function(e) {
                    return (!y || e.office === y) && "open" === e.status
                }).length, e.desksCount = g.count(r.items, s, {
                    office: y,
                    types: o.Constants.DESK_TYPES
                }), e.totalArea = n.chain(s).filter(function(e) {
                    return (!y || e.office._id === y) && e.office.isOpen
                }).reduce(function(e, n) {
                    return e + (n.room.area || 0)
                }, 0).value(), e.workstationsCount = g.count(r.items, s, {
                    office: y,
                    types: ["desk", "desk_tr"]
                }), e.hotdesksCount = g.count(r.items, s, {
                    office: y,
                    types: ["hotdesk"]
                }), e.targetHotdesksMembershipsCount = e.hotdesksCount * t.settings.space.hotdeskCoef, m.all(n.map(M, function(e) {
                    return d.memberships(b, e)
                })).then(function(n) {
                    w(e.hotdesksCount, n)
                }), c.statuses(b).then(function(n) {
                    e.statuses = n
                }), c.occupancy(b).then(function(n) {
                    e.occupancy = n
                }), c.occupancyHistory(b).then(function(n) {
                    e.occupancyHistory = n
                }), D = n.chain(a.membershipsModel.items).filter(function(e) {
                    return "terminated" !== e.info.status && (!b || e.office === b._id)
                }).value(), P = n.groupBy(D, "plan"), e.groupedPlans = n.chain(i.items).map(function(e) {
                    var n = P[e._id] || [];
                    return {
                        plan: e,
                        count: n.length,
                        total: n.length * e.price
                    }
                }).filter(function(e) {
                    return e.count > 0
                }).value(), e.hotdesksMembershipsCount = n.chain(e.groupedPlans).filter(function(e) {
                    return "hotdesk" === e.plan.type
                }).sum(function(e) {
                    return e.count
                }).value(), e.plansCount = n.filter(D, function(e) {
                    return e.plan
                }).length, e.targetSum = n.chain(r.items).reject(function(e) {
                    return e.type === o.Constants.DESK_NA_TYPE
                }).filter(function(e) {
                    var n = s[e.room],
                        t = n.office;
                    return e.targetPlan && (b ? b._id === t._id : t && t.isOpen)
                }).reduce(function(e, n) {
                    var a = x(n.targetPlan);
                    return a ? e + ("hotdesk" === a.type ? t.settings.space.hotdeskCoef : 1) * a.price : e
                }, 0).value(), k(y)
            }
            var v = p.count;
            e.billingEnabled = t.settings.billing.enabled, e.billingEnabled && (e.currency = t.settings.billing.currency), h()
        }))
    }])
}), define("membersControllers", ["jquery", "underscore", "app", "alert", "utils", "moment"], function(e, n, t, a, o, i) {
    function s(e, t) {
        return n.chain(t.info.activePlans).concat(t.info.activeServices).reduce(function(n, t) {
            var a = e(t.plan);
            return n + a.price
        }, 0).value()
    }

    function r(e, t) {
        var a, o, i = e.forTeam(t._id);
        return i.length > 0 && (a = n.every(i, function(e) {
            return "paid" === e.status
        }), o = a ? "paid" : "not paid"), o
    }
    t.controller("CommunityController", ["$scope", "data", "mrmFilterService", function(e, t, a) {
        function o(t) {
            var o = n.partial(a.filterContacts, t.membersModel.items),
                i = n.partial(a.filterContacts, t.teamsModel.items);
            e.leadsCount = o({
                leads: !0
            }).length, e.membersCount = o({
                members: !0
            }).length, e.teamsCount = i({
                teams: !0
            }).length, e.allContactsCount = e.leadsCount + e.membersCount + e.teamsCount
        }
        var i;
        i = [], t.get("mrmModel", "leadsModel").spread(function(t, a) {
            function s(e) {
                var n = e.registerCollectionChange({
                    add: function() {
                        o(t)
                    },
                    remove: function() {
                        o(t)
                    }
                });
                i.push(n)
            }
            o(t), e.membershipsCount = n.filter(t.membershipsModel.items, function(e) {
                return "terminated" !== e.info.status && e.plan
            }).length, s(t.leadsModel), s(t.membersModel), s(t.teamsModel)
        }), e.$on("$destroy", function() {
            n.each(i, function(e) {
                e.destroy()
            })
        })
    }]), t.controller("MembersController", ["$rootScope", "$scope", "data", "availabilityService", "formatService", "$location", function(e, t, a, i, s, r) {
        function l() {
            var e = r.search();
            t.search = n.pick(e, "office", "status", "plan")
        }
        t.exportMembers = function() {
            e.$broadcast("export-members", {
                members: t.members
            })
        }, a.get("org", "mrmModel").then(o.spread(function(e, n) {
            t.teamProperty = e.settings.teamProperty, t.membersModel = n.membersModel, t.members = t.membersModel.items, l(), t.$on("$locationChangeStart", function() {
                l()
            })
        }))
    }]), t.controller("ContactsController", ["$rootScope", "$scope", "data", "$location", "mrmFilterService", function(e, t, a, o, i) {
        function s() {
            var e = o.search();
            t.search = n.extend(n.pick(e, "leads", "members", "teams"))
        }

        function r() {
            l && (n.each(l(t.search), function(e) {
                t.selected[e._id] = t.isSelected
            }), t.enableExportButton = t.isSelected)
        }
        var l, c, d;
        t.setSearch = function(e) {
            o.search(e)
        }, t.isSelected = !0, t.selected = {}, t.enableExportButton = !1, t.isCategorySelected = function(e) {
            return t.search.leads === e.leads && t.search.members === e.members && t.search.teams === e.teams
        }, t.exportContacts = function() {
            e.$broadcast("export-contacts", l(t.search), t.selected)
        }, t.showExportButton = function() {
            t.enableExportButton = n.reduce(n.values(t.selected), function(e, n) {
                return e || n
            }, !1)
        }, a.get("org", "mrmModel").spread(function(e, a) {
            var o;
            c = a.membersModel, t.teamsModel = a.teamsModel, t.showPhoneNumber = n.some(e.customProperties, function(e) {
                return "Phone" === e.title && n.contains(e.targets, "member")
            }), o = n.map(t.teamsModel.items, function(e) {
                return n.extend(n.pick(e, "_id", "name", "email", "twitterInfo", "info"), {
                    isTeam: !0
                })
            }), t.allContacts = n.union(c.items, o), l = n.partial(i.filterContacts, t.allContacts), d = c.registerCollectionChange({
                add: function(e) {
                    t.allContacts.push(e)
                }
            }), s(), r()
        }), t.$watch("isSelected", r), t.$on("$locationChangeStart", s), t.$on("$destroy", function() {
            d.destroy()
        })
    }]), t.controller("MemberController", ["$scope", "$rootScope", "$stateParams", "$sce", "data", function(e, t, a, i, s) {
        function r(n) {
            c.perm = n, e.userStatus = c.perm && "None" !== c.perm.role ? "enabled" : "disabled"
        }
        var l = a.id,
            c = this;
        e.trustAsHtml = function(e) {
            return i.trustAsHtml(e)
        }, e.enableUser = function() {
            var n = {
                ok: "User access enabled successfully",
                error: "Failed to enable user access"
            };
            c.perm ? c.permissionsModel.update(c.perm, {
                role: "Member"
            }).then(function() {
                r(c.perm)
            }) : c.permissionsModel.add({
                role: "Member",
                email: e.member.email,
                contact: e.member._id,
                name: e.member.name
            }).then(function(e) {
                r(e)
            }).messages(n)
        }, e.disableUser = function() {
            c.permissionsModel.update(c.perm, {
                role: "None"
            }).then(function() {
                r(c.perm)
            }).messages({
                ok: "User access disabled successfully",
                error: "Failed to disable user access"
            })
        }, l && (e.addBillingDetails = function() {
            t.$broadcast("add-billing-details", {
                member: e.member
            })
        }, s.get("integrationsModel").then(function(n) {
            e.stripeIntegration = n.findByType("Stripe")
        }), s.get("org", "mrmModel", "permissionsModel").then(o.spread(function(t, a, o) {
            e.member = a.membersModel.findById(l), e.currency = t.settings.billing.currency, t.settings.community.enabled && r(n.find(o.items, {
                contact: l
            })), c.permissionsModel = o
        })))
    }]), t.controller("TeamController", ["$rootScope", "$scope", "$stateParams", "$http", "data", "messageService", function(e, t, i, r, l, c) {
        function d(e) {
            return n.map(e, function(e) {
                return e.info.membership
            })
        }

        function m() {
            t.lead = n.chain(t.team.info.members).filter(function(e) {
                var n = e.info.lead;
                return n && "open" === n.status && n.requestedPlans
            }).map(function(e) {
                return e.info.lead
            }).first().value()
        }
        var u = i.team;
        t.hasAnyMembersWithPosition = function(e) {
            return n.some(e, function(e) {
                return t.getPositionPropertyValue(e)
            })
        }, t.getPositionPropertyValue = function(e) {
            return e.properties && e.properties.Position
        }, t.hasAnyDeskMembers = function(e) {
            return t.hasAnyLocationsMemberships(d(e))
        }, t.hasAnyLocationsMemberships = function(e) {
            return n.some(e, function(e) {
                return e && (e.resource || e.office)
            })
        }, t.generateContract = function(e) {
            var n = o.Constants.API_ORG + "/" + t.orgSlug + "/teams/" + e._id + "/contract";
            r.post(n).then(function(n) {
                var t = n.data;
                e.contractUrl = t, a.ok("Contract succesfully created.")
            }, function() {
                a.error("Unable to create contract.")
            })
        }, t.selectedInvoices = [], t.deleteInvoices = function(e) {
            c.promptDelete({
                target: e,
                entityName: "invoice",
                entityPlural: "invoices"
            }).then(function() {
                return l.get("paymentsModel")
            }).then(function(n) {
                return n.remove(e)
            }).then(function() {
                t.selectedInvoices = []
            }).messages({
                ok: "Successfully deleted the invoices.",
                error: "Unable to delete the invoices."
            })
        }, t.addCardDetails = function() {
            e.$broadcast("add-card-details", {
                team: t.team
            })
        }, t.addBankDetails = function() {
            e.$broadcast("add-bank-account-details", {
                team: t.team
            })
        }, t.$on("lead-approved", function(e, n) {
            m()
        }), l.get("integrationsModel").then(function(e) {
            t.stripeIntegration = e.findByType("Stripe")
        }), l.get("mrmModel", "org", "plansModel", "resourcesModel").then(o.spread(function(e, o, i, r) {
            function l() {
                t.allMemberships = t.team.info.memberships,
                    t.mrr = s(n.bind(i.findById, i), t.team), d = n.find(t.allMemberships, function(e) {
                        return e.office
                    }), t.office = d && d.office
            }

            function c(e, n) {
                f.update(e, {
                    personOfContact: n ? n._id : null
                }).then(function() {
                    a.ok("Member successfully selected as main contact")
                }, function() {
                    a.error("Error updating team main contact")
                })
            }
            var d, p, f;
            t.orgSlug = o.slug, t.membersModel = e.membersModel, f = e.teamsModel, t.team = f.findById(u), t.currency = o.settings.billing.currency, m(), p = f.desks(t.team), t.desksCount = p.length, t.location = n.first(p), t.setMemberAsPOC = c, t.activeMembersCount = function() {
                var e = t.team.info,
                    a = 0;
                return e && (a = n.filter(e.members, function(e, n) {
                    return "termianted" !== n.info.status
                }).length), a
            }, t.$watchCollection("team.info.memberships", l), t.$watchCollection("team.info.members", l)
        }))
    }]), t.controller("MembershipsController", ["$scope", "data", function(e, t) {
        function a() {
            e.memberships = n.filter(o.memberships, function(e) {
                return e.plan || e.resource
            })
        }
        var o = this;
        t.get("mrmModel").then(function(e) {
            var n = e.membershipsModel;
            o.memberships = n.items, o.membershipsChangeListener = n.registerCollectionChange({
                add: a,
                remove: a,
                update: a
            }), a()
        }), e.$on("$destroy", function() {
            o.membershipsChangeListener && o.membershipsChangeListener.destroy()
        })
    }]), t.controller("TeamsController", ["$scope", "$rootScope", "data", "$location", function(e, t, a, i) {
        function l() {
            var n = i.search();
            e.search = {
                office: n.office
            }
        }
        e.exportTeams = function() {
            t.$broadcast("export-members", {
                teams: e.teamsModel.items
            })
        }, a.get("org", "mrmModel", "plansModel", "paymentsModel").then(o.spread(function(t, a, o, i) {
            e.currency = t.settings.billing.currency, e.paymentsEnabled = t.settings.payments && t.settings.payments.enabled, e.teamsModel = a.teamsModel, e.getMrr = n.partial(s, n.bind(o.findById, o)), e.paymentStatus = n.partial(r, i), e.teams = a.teamsModel.items, l()
        })), e.$on("$locationChangeStart", l)
    }]), t.controller("FormerController", ["$scope", "data", "$location", function(e, t, a) {
        function o() {
            var t = a.search();
            e.search = {
                office: t.office,
                status: "terminated"
            }, n.extend(e.search, n.pick(t, "members", "teams"))
        }
        e.setSearch = function(e) {
            a.search(e)
        }, t.get("org", "mrmModel").spread(function(t, a) {
            e.former = n.union(a.membersModel.items, a.teamsModel.items), o()
        }), e.setSearch({
            teams: !0
        }), e.$on("$locationChangeStart", o)
    }])
}), define("bookingBilling", ["require", "exports", "module", "moment", "lodash", "moment-timezone"], function(e, n, t) {
    function a(e) {
        return e.dateTime || e.date || e
    }

    function o(e, n, t, o) {
        var r, l, c, d;
        return s.isUndefined(n.offPrice) ? n.price : (o || (o = i.tz.guess()), l = i(a(e.start)).tz(o), r = i(a(e.end)).tz(o), c = l.clone().startOf("day").add(t.openTime, "hours").toDate(), d = l.clone().startOf("day").add(t.closeTime, "hours").toDate(), s.contains(t.days, l.weekday()) && s.contains(t.days, r.weekday()) && (l.isSame(c) || l.isBetween(c, d)) && (r.isSame(d) || r.isBetween(c, d)) ? n.price : n.offPrice)
    }
    var i = e("moment"),
        s = e("lodash");
    e("moment-timezone"), t.exports = {
        calculateDynamicPrice: o
    }
}), define("billingControllers", ["jquery", "underscore", "app", "alert", "utils", "moment", "bookingBilling"], function(e, n, t, a, o, i, s) {
    t.controller("BillingController", ["$scope", "data", function(e, n) {
        n.get("plansModel", "paymentsModel").spread(function(n, t) {
            e.plansCount = n.items.length, e.invoicesCount = t.items.length
        })
    }]), t.controller("BillingDashboardController", ["$scope", "data", "billingService", "chartsService", function(e, t, a, o) {
        var i;
        i = a.generateMonths(-1, 3), e.invoicesOptions = o.invoices, e.plansPieOptions = o.plansPie, t.get("org", "plansModel", "paymentsModel", "mrmModel").spread(function(t, a, o, s) {
            var r = a.types;
            e.currency = t.settings.billing.currency;
            var l = n.filter(o.items, function(e) {
                    return "paid" !== e.status
                }),
                c = n.filter(o.items, function(e) {
                    return "paid" === e.status
                }),
                d = n.filter(l, function(e) {
                    return "draft" === e.status
                }),
                m = n.filter(l, function(e) {
                    return "sent" === e.status
                });
            e.draftCount = d.length, e.draftTotal = n.sum(d, function(e) {
                return e.amount
            }), e.awaitingCount = m.length, e.awaitingTotal = n.sum(m, function(e) {
                return e.amount
            }), e.overdueTotal = 0, e.overdueCount = 0, e.months = n.map(i, function(e, t) {
                var a = n.chain(c).filter(function(n) {
                        return e.isSame(n.date, "month")
                    }).sum(function(e) {
                        return e.amount
                    }).value(),
                    o = n.chain(m).filter(function(n) {
                        return e.isSame(n.date, "month")
                    }).sum(function(e) {
                        return e.amount
                    }).value();
                return {
                    month: e.toDate(),
                    paid: a,
                    sent: o
                }
            }), e.invoicesOptions.valueAxis.max = 1.2 * n.chain(e.months).map(function(e) {
                return e.paid + e.sent
            }).max().value();
            var u = n.chain(s.membershipsModel.items).filter(function(e) {
                    return "terminated" !== e.info.status
                }).value(),
                p = n.groupBy(u, "plan");
            e.plans = n.chain(a.items).map(function(e) {
                var n = p[e._id] || [];
                return {
                    plan: e,
                    count: n.length,
                    total: n.length * e.price
                }
            }).filter(function(e) {
                return e.count > 0
            }).value(), e.groupedPlans = n.chain(e.plans).groupBy(function(e) {
                return e.plan.type
            }).map(function(e, t) {
                return {
                    color: r[t].color,
                    total: n.sum(e, function(e) {
                        return e.total
                    })
                }
            }).value(), e.plansCount = n.filter(u, function(e) {
                return e.plan
            }).length, e.plansTotal = n.sum(e.plans, function(e) {
                return e.total
            })
        })
    }]), t.controller("PlansController", ["$scope", "data", "messageService", "formatService", "$q", function(t, o, i, s, r) {
        var l = this;
        o.get("org", "mrmModel", "plansModel", "paymentsModel").spread(function(e, a, o, i) {
            l.memberships = n.chain(a.membershipsModel.items).filter(function(e) {
                return e.plan && "terminated" !== e.info.status
            }).groupBy("plan").value(), t.plansModel = o, t.intervalLengths = ["hour", "day", "month"], l.paymentsModel = i, l.membershipsModel = a.membershipsModel, t.currency = e.settings.billing.currency
        }), t.addPlan = function() {
            t.plan = {
                intervalLength: "month",
                "public": !0
            }, e("#plan-modal").modal("show")
        }, t.editPlan = function(a) {
            t.plan = n.pick(a, "name", "price", "type", "description", "intervalLength", "offPrice", "public", "freeMeetingRooms"), t.originalPlan = a, e("#plan-modal").modal("show")
        }, t.activePlans = function(e) {
            var n = l.memberships[e._id] || [];
            return n.length
        }, t.commitPlan = function() {
            t.originalPlan ? t.plansModel.update(t.originalPlan, t.plan).then(function() {
                a.ok("Plan updated")
            }, function() {
                a.error("Error adding the plan")
            }) : t.plansModel.add(t.plan).then(function() {
                a.ok("Plan added")
            }, function() {
                a.error("Error adding the plan")
            }), e("#plan-modal").modal("hide")
        }, t.cleanUpData = function() {
            t.originalPlan = void 0, t.plan = void 0
        }, t.deletePlan = function(e) {
            var a, o;
            o = {
                target: s.formatPlan(e, t.currency),
                deletedEntities: ["members and companies plans", "history"]
            }, a = n.some(l.paymentsModel.items, function(t) {
                return n.some(t.lines, function(n) {
                    var t = l.membershipsModel.findById(n.membership);
                    return t && t.plan === e._id
                })
            }), a && (o.preventDeleteEntities = ["invoices"]), i.promptDelete(o).then(function() {
                var a;
                return a = n.where(l.membershipsModel.items, {
                    plan: e._id
                }), r.all([l.membershipsModel.remove(a), t.plansModel.remove(e)])
            }).messages({
                ok: "Plan deleted",
                error: "Error deleting the plan"
            })
        }
    }]), t.controller("InvoicesController", ["$scope", "$state", "$stateParams", "data", "messageService", "$http", "apiRoot", function(n, t, a, i, s, r, l) {
        n.cleanupExportUrl = function() {
            delete n.url
        }, i.get("invoicesModel").then(function(t) {
            n.downloadInvoices = function(a) {
                e("#download-invoices-modal").modal("show"), t.downloadInvoices(a).then(function(e) {
                    n.url = e && e.url
                }).messages({
                    ok: "Selected invoices exported successfully",
                    error: "Faild to export invoices"
                })
            }
        }), i.get("integrationsModel").then(function(e) {
            n.xeroIntegration = e.findByType("Xero")
        }), n.syncPayments = function() {
            n.syncing = !0, r.post(o.joinPath(l, "integrations", "Xero", "sync", n.org.slug)).messages({
                ok: "Successfully synced invoices",
                error: "Faild to sync invoices"
            }).then(function() {
                i.resetCache(), t.transitionTo(t.current, a, {
                    reload: !0,
                    inherit: !1,
                    notify: !0
                }), delete n.syncing
            }, function() {
                delete n.syncing
            })
        }, n.selectedInvoices = [], n.deleteInvoices = function(e) {
            s.promptDelete({
                target: e,
                entityName: "invoice",
                entityPlural: "invoices"
            }).then(function() {
                return i.get("paymentsModel")
            }).then(function(n) {
                return n.remove(e)
            }).then(function() {
                n.selectedInvoices = []
            }).messages({
                ok: "Successfully deleted the invoices.",
                error: "Unable to delete the invoices."
            })
        }
    }]), t.controller("AddInvoicesController", ["$scope", "$rootScope", "$state", "data", "billingService", "$q", function(e, t, a, r, l, c) {
        function d(e, n, t) {
            var a = i(e);
            return a.isSameOrAfter(n) && a.isSameOrBefore(t)
        }

        function m(e, t) {
            var a, o, i;
            return a = l.createPayment(t, k.date, e, p, v, b, y), a && d(a.periodStart, e.startDate, e.endDate) ? (t.team ? i = {
                team: t.team._id
            } : t.member && (i = {
                member: t.member._id
            }), o = n.reduce(a.lines, function(e, n) {
                return e + n.unitPrice * n.quantity * (100 - n.discount) / 100
            }, 0), n.extend({
                payment: a,
                amount: o,
                target: i
            }, e)) : void 0
        }

        function u() {
            var t, a, o;
            if ("basic" === e.invoiceSettings.invoicingType && (o = p.nextNumber()), h && g) {
                t = n.chain(h.items).map(function(n) {
                    return m(e.invoiceSettings, {
                        team: n
                    })
                }).compact().value(), a = n.chain(g.items).filter(function(e) {
                    return !e.team
                }).map(function(n) {
                    return m(e.invoiceSettings, {
                        member: n
                    })
                }).compact().value();
                var i = t.concat(a);
                return n.isUndefined(o) || n.each(i, function(e) {
                    e.payment.number = o, o = p.nextNumber(o)
                }), i
            }
        }
        var p, f, g, h, v, b, y, k;
        r.get("org", "mrmModel", "plansModel", "invoicesModel", "calendarEventsModel").spread(function(n, t, a, r, l) {
            var c = n.settings.businessHours;
            k = n.settings.billing, g = t.membersModel, h = t.teamsModel, v = t.membershipsModel, y = a, p = r.paymentsModel, f = r, b = l, e.currency = k.currency, e.showPeriodFilter = !k.date, e.dateFormat = n.settings.calendar.dateFormat, e.invoiceSettings = {
                issueDate: o.today(),
                periodStart: i(o.today()).add(1, "month").toDate(),
                invoicingType: k.invoicing,
                invoicingVat: k.invoicingVat,
                currency: k.currency,
                lineTemplate: k.lineTemplate,
                discount: 0,
                periodLength: k.invoicingPeriod,
                calculateDynamicPrice: function(e, n) {
                    return s.calculateDynamicPrice(e, n, c)
                }
            }, e.invoices = u()
        }), e.goToInvoices = function() {
            a.go("organization.manage.billing.invoices")
        }, e.monthStart = function(e) {
            return i(e).startOf("month").toDate()
        }, e.monthEnd = function(e) {
            return i(e).endOf("month").toDate()
        }, e.confirmInvoices = function() {
            e.savingInvoices = !0, p.add(n.pluck(e.invoices, "payment")).then(function(t) {
                return e.goToInvoices(), n.isArray(t) ? t : [t]
            })["finally"](function() {
                e.savingInvoices = !1
            }).messages({
                ok: "Successfully added invoice records.",
                error: "Unable to add the invoices."
            }).then(function(e) {
                return f.exportInvoices(e)
            })
        }, e.editInvoice = function(e) {
            t.$broadcast("edit-invoice", e)
        }, e.$watch("invoiceSettings.periodStart", function() {
            e.invoiceSettings && (e.invoiceSettings.startDate = e.monthStart(e.invoiceSettings.periodStart), e.invoiceSettings.endDate = e.monthEnd(e.invoiceSettings.periodStart))
        }), e.$watch("invoiceSettings", function() {
            e.invoiceSettings && (e.invoices = u())
        }, !0)
    }]), t.controller("InvoiceController", ["$scope", "$rootScope", "data", "$stateParams", "$window", "billingService", "messageService", "$state", function(e, t, o, i, s, r, l, c) {
        var d = i.id;
        o.get("org", "invoicesModel", "plansModel", "membershipsModel", "membersModel", "teamsModel").spread(function(o, i, s, m, u, p) {
            var f = i.paymentsModel;
            e.invoice = f.findById(d), e.currency = o.settings.billing.currency, e.invoicingType = o.settings.billing.invoicing, e.isPaid = "paid" === e.invoice.status, e.invoice.team ? e.target = p.findById(e.invoice.team) : e.target = u.findById(e.invoice.member), e.lines = r.invoiceLines(e.invoice, m), e.paidAmount = function(e) {
                return n.sum(e.charges, "amount")
            }, e.addCharge = function(e) {
                t.$broadcast("add-charge", e)
            }, e.amountLeft = function(n) {
                return n.amount - e.paidAmount(n)
            }, e.executeCharge = function(n) {
                l.prompt({
                    message: "Are you sure you want to charge customer for invoice " + n.number + " (" + e.amountLeft(n) + " " + e.currency + ")?"
                }).then(function() {
                    return f.executeCharge(n, e.amountLeft(n))
                })
            }, e.removeCharge = function(e, n) {
                f.removeCharge(e, n).messages({
                    ok: "Charge removed successfully",
                    error: "Faild to remove the charge"
                })
            }, e.sendInvoice = function(n) {
                e.target.email ? (n.sendingInvoice = !0, i.sendInvoice(e.invoice, n._id)["finally"](function() {
                    delete n.sendingInvoice
                }).messages({
                    ok: "Mail with invoice sent.",
                    error: "Unable to send mail with invoice."
                })) : a.error("You need to set email for " + e.target.name + " before sending invoice.")
            }, e.deleteDocument = function(n) {
                i.removeInvoice(e.invoice, n._id).messages({
                    ok: "Document remove successfully.",
                    error: "Unable to remove document."
                })
            }, e.generateInvoice = function(n) {
                return i.exportInvoices(e.invoice, n, !0)
            }, e.deleteInvoice = function() {
                l.promptDelete({
                    target: e.invoice,
                    entityName: "invoice"
                }).then(function() {
                    return f.remove(e.invoice)
                }).then(function() {
                    c.go("organization.manage.billing.invoices")
                }).messages({
                    ok: "Successfully deleted the invoice.",
                    error: "Unable to delete the invoice."
                })
            }
        })
    }]), t.controller("RevenueController", ["$scope", "billingService", "$location", function(e, t, a) {
        function o() {
            var n = a.search().office;
            t.projectionsByTeam(e.months, n).then(function(n) {
                e.byTeam = n
            })
        }
        var i = t.generateMonths(-1, 4);
        e.months = n.map(i, function(e) {
            return e.toDate()
        }), e.sumAllInMonth = function(t) {
            return e.byTeam ? n.reduce(e.byTeam, function(e, n) {
                return e + n.months[t]
            }, 0) : void 0
        }, o(), e.$on("$locationChangeStart", function() {
            o()
        })
    }])
}), define("mixins", ["underscore"], function(e) {
    e.mixin({
        flattenShallow: function(n) {
            return e.flatten(n, !0)
        },
        flattenDeep: function(n) {
            return e.flatten(n)
        }
    })
}), define("paymentService", ["require", "exports", "module", "moment", "lodash"], function(e, n, t) {
    function a() {
        return M().startOf("day").toDate()
    }

    function o(e, n, t) {
        var a = M(n).diff(e, t),
            o = M(n).diff(M(e).add(a, t), "days");
        return "month" === t ? a + 12 * o / 365 : "day" === t ? a : "hour" === t ? a : a + 52 * o / 365
    }

    function i(e, n, t, a) {
        var i, s, r, l, c;
        return l = t.startDate, c = M(t.endDate || n).add(1, "day").toDate(), i = S.max([e, l]), s = S.min([n, c]), r = o(i, s, a), {
            startDate: i,
            endDate: s,
            quantity: Math.round(100 * r) / 100,
            membership: t._id
        }
    }

    function s(e, n, t) {
        var a = [];
        return S.each(S.sortBy(t, "startDate"), function(n) {
            M(e).isBefore(n.startDate) && a.push({
                startDate: e,
                endDate: n.startDate
            }), e = n.endDate
        }), M(e).isBefore(n) && a.push({
            startDate: e,
            endDate: n
        }), a
    }

    function r(e, n, t, a, o) {
        var r, l, c, d, m;
        return a = a || [], c = S.chain(e).map(function(e) {
            var r = S.where(a, {
                    membership: e._id
                }),
                l = s(n, t, r);
            return S.map(l, function(n) {
                return i(n.startDate, n.endDate, e, o)
            })
        }).flattenDeep().filter(function(e) {
            return e.quantity > 0
        }).value(), c.length > 1 && 0 === a.length && (d = S.last(c), l = S.last(e), m = S.defaults(S.pick(e[0], "startDate"), l), r = i(n, t, m, o), d.quantity = r.quantity - S.chain(c).initial().reduce(function(e, n) {
            return e + n.quantity
        }, 0).value()), c
    }

    function l(e) {
        return e.plan
    }

    function c(e, n, t) {
        var a, o;
        return a = M(e), o = M(n),
            function(e) {
                var n = e.startDate,
                    i = t ? M(e.endDate || o).add(1, "day").toDate() : e.endDate;
                return a.isSameOrBefore(n) && o.isAfter(n) || a.isBefore(i) && o.isSameOrAfter(i) || a.isBetween(n, i)
            }
    }

    function d(e, n, t, a, o) {
        var i, s, d;
        return d = S.filter(a, c(n, t)), i = S.chain(e).filter(l).filter(c(n, t, !0)).value(), s = p(i, !0), S.chain(s).map(function(e) {
            return S.map(p(e), function(a) {
                var i = o(e[0]);
                return r(a, n, t, d, i)
            })
        }).flattenDeep().value()
    }

    function m(e, n, t) {
        var a = p(e);
        return S.reduce(a, function(e, a) {
            return e + v({
                startDate: S.first(a).startDate,
                endDate: S.last(a).endDate
            }, n(a[0].plan), t)
        }, 0)
    }

    function u(e, n, t) {
        return 1 === M(n.startDate).diff(e.endDate, "days") && (t || e.plan === n.plan)
    }

    function p(e, n) {
        return S.chain(e).sortBy("startDate").groupBy(function(e) {
            return e.member || e.team
        }).map(function(e) {
            return g(e, n)
        }).flattenShallow().value()
    }

    function f(e) {
        return 12 * e.price / 365
    }

    function g(e, n) {
        for (var t, a, o, i, s = S.sortBy(e, "startDate"), r = []; s.length > 0;)
            for (a = s.shift(), t = [a], r.push(t), o = 0; o < s.length; o++) i = s[o], u(a, i, n) && (t.push(i), a = i, s.splice(o--, 1));
        return r
    }

    function h(e, n, t) {
        var a;
        return a = -M(n).diff(t, "days"), a * f(e)
    }

    function v(e, n, t) {
        var a, o, i, s, r, l;
        return n ? (a = M(t), o = M(t).add(1, "month"), i = M(e.startDate), s = e.endDate ? M(e.endDate).add(1, "day") : M(t).add(1, "month").add(1, "day"), r = M.max([a, i]), l = M.min([o, s]), r.isBefore(l) ? r.isSame(a, "day") && l.isSame(o, "day") ? n.price : h(n, r, l) : 0) : 0
    }

    function b(e, n, t, a, o, i, s, r) {
        var l;
        return l = S.filter(e, function(e) {
            return e.plan && M(e.start.dateTime).isBetween(n, t) && !S.find(a, {
                calendarEvent: e._id
            })
        }), S.map(l, function(e) {
            var a = o(e.plan),
                l = r(e, a);
            return {
                calendarEvent: e._id,
                quantity: M.duration(new M(e.end.dateTime).diff(e.start.dateTime)).asHours(),
                unitPrice: l,
                discount: i,
                description: s(a, n, t)
            }
        })
    }

    function y(e, n, t, a, o) {
        var i, s, r, l, c, m, u, p, f, g, h, v, y, k, w, x;
        return u = o.periodStart, p = o.periodLength, g = o.membershipById, f = o.planById, h = o.formatDescription, c = o.taxType, m = o.issueDate, v = o.discount, x = o.calculateDynamicPrice, y = function(e) {
            var n = f(e.plan);
            return n && n.intervalLength
        }, r = M(u).add(p, "month").toDate(), l = M(r).subtract(1, "day").toDate(), k = S.filter(a, S.property("membership")), w = S.filter(a, S.property("calendarEvent")), i = d(n, u, r, k, y), s = b(t, u, l, w, f, v, h, x), S.each(i, function(e) {
            var n, t;
            n = g(e.membership), t = f(n && n.plan), e.unitPrice = t && t.price || 0, e.discount = v, e.description = h(t, e.startDate, M(e.endDate).subtract(1, "day").toDate())
        }), S.extend({
            periodStart: u,
            periodEnd: l,
            lines: i.concat(s),
            date: m,
            taxType: c
        }, e)
    }

    function k(e, n, t) {
        return t = t || a(), n || (n = e.startDate ? M(e.startDate).date() : 1), M(t).date(n).toDate()
    }

    function w(e, n, t) {
        var o;
        return t = t || a(), n || (o = S.chain(e).pluck("startDate").compact().value(), n = o.length > 0 ? M(S.min(o)).date() : 1), M(t).date(n).toDate()
    }
    var M = e("moment"),
        S = e("lodash");
    t.exports = {
        groupRelatedMemberships: p,
        payableProjectionForMemberships: m,
        createPayment: y,
        periodStartForTeam: k,
        periodStartForMember: w,
        paymentLinesForRelatedMemberships: r,
        paymentLinesForMemberships: d,
        payableProjectionForMembership: v
    }
}), define("membersServices", ["jquery", "underscore", "app", "alert", "utils", "moment", "paymentService", "mixins"], function(e, n, t, a, o, i, s) {
    var r = {
        relocate: {
            desk: {
                icon: "fa-exchange",
                text: "relocates"
            },
            team_room: {
                icon: "fa-exchange",
                text: "relocates"
            },
            hotdesk: {
                icon: "fa-exchange",
                text: "plans continued"
            },
            service: {
                icon: "fa-exchange",
                text: "plans continued"
            },
            group: {
                icon: "fa-exchange",
                text: "plans continued"
            }
        },
        start: {
            desk: {
                icon: "fa-user-plus",
                text: "moves in"
            },
            team_room: {
                icon: "fa-user-plus",
                text: "moves in"
            },
            hotdesk: {
                icon: "fa-user-plus",
                text: "starts"
            },
            service: {
                icon: "fa-cogs",
                text: "subscribes"
            },
            group: {
                icon: "fa-users",
                text: "enabled plans"
            }
        },
        end: {
            desk: {
                icon: "fa-user-times",
                text: "moves out"
            },
            team_room: {
                icon: "fa-user-times",
                text: "moves out"
            },
            hotdesk: {
                icon: "fa-user-plus",
                text: "ends"
            },
            service: {
                icon: "fa-cogs",
                text: "unsubscribes"
            },
            group: {
                icon: "fa-users",
                text: "terminated plans"
            }
        }
    };
    t.factory("activityService", ["data", function(e) {
        function t(e) {
            return i(e).format("ll")
        }

        function a(e) {
            return n.chain(e).groupBy(function(e) {
                return e.date
            }).map(function(e) {
                return n.chain(e).groupBy(function(e) {
                    return e.type
                }).map(function(e) {
                    return 1 === e.length ? e[0] : e
                }).value()
            }).flatten(!0).map(function(e) {
                return e.length ? n.extend({
                    date: e[0].date,
                    moment: e[0].moment,
                    type: e[0].type,
                    items: e
                }, r[e[0].type].group) : e
            }).sortBy(function(e) {
                var n;
                return n = e.date, "start" === e.type && (n = i(n).subtract(1, "seconds").toDate()), -n
            }).value()
        }

        function o(e, t) {
            e && (e = n.filter(e, function(e) {
                return e.startDate && e.plan
            }));
            var a = s.groupRelatedMemberships(e);
            return n.chain(a).map(function(e) {
                var a, o, i, s = [];
                return a = n.first(e), o = n.last(e), i = n.rest(e), s.push(t(a, {
                    type: "start",
                    date: a.startDate
                })), n.each(i, function(e) {
                    s.push(t(e, {
                        type: "relocate",
                        date: e.startDate
                    }))
                }), o.endDate && s.push(t(o, {
                    type: "end",
                    date: o.endDate
                })), s
            }).flatten().value()
        }

        function l(e, a, o) {
            var i;
            return o.moment = t(o.date), i = r[o.type][a], o.planType = a, n.extend(o, n.pick(e, "member", "team", "resource", "office", "plan"), i)
        }

        function c(n) {
            return e.get("plansModel").then(function(e) {
                function t(n, t) {
                    var a = e.findById(n.plan),
                        o = a && a.type || "desk";
                    return l(n, o, t)
                }
                return a(o(n, t))
            })
        }

        function d(e, t) {
            var a = n.partial(l, n, t, n);
            return o(e, a)
        }
        return {
            activityPlan: c,
            activity: d
        }
    }])
}), define("common/mrmFilterService", ["jquery", "underscore", "app", "string", "utils"], function(e, n, t, a, o) {
    t.factory("mrmFilterService", [function() {
        function e(e, t, i) {
            var s, r;
            return s = [], t.status && (n.isArray(t.status) ? s = t.status : s.push(t.status)), r = {
                lead: function(e) {
                    return o.isLead(e) && (!t.name || a(e.name.toLowerCase()).contains(t.name.toLowerCase()))
                },
                team: function(e) {
                    var i;
                    return t.office && (i = e.info.office), o.isTeam(e) && (t.status ? n.contains(s, e.info.status) : "terminated" !== e.info.status) && (!t.name || a(e.name.toLowerCase()).contains(t.name.toLowerCase())) && i === t.office
                },
                member: function(e) {
                    var a, i, r, l, c;
                    return e ? (a = e.info.membership, a && (t.office && (i = a.office), t.plan && (r = a.plan)), t.name && (l = (e.info.teamName + e.name).toLowerCase(), c = t.name.toLowerCase()), o.isMember(e) && (!t.name || -1 !== l.indexOf(c)) && (t.status ? n.contains(s, e.info.status) : "terminated" !== e.info.status) && (!t.office || i === t.office) && (!t.plan || r == t.plan)) : void 0
                },
                membership: function(e) {
                    var n = t.status || t.info && t.info.status;
                    return !(n && e.info.status !== n || t.office && e.office !== t.office || t.plan && e.plan !== t.plan)
                }
            }, n.filter(e, function(e) {
                return n.some(i, function(n) {
                    return r[n](e)
                })
            })
        }

        function t(n, t, a) {
            return e(n, t, a).length
        }

        function i(n, t) {
            var a;
            return a = [], t.leads && a.push("lead"), t.members && a.push("member"), t.teams && a.push("team"), 0 === a.length && (a = ["lead", "member", "team"]), e(n, t, a)
        }
        return {
            filter: e,
            count: t,
            filterContacts: i
        }
    }])
}), define("billingServices", ["underscore", "moment", "app", "utils", "paymentService", "string", "mixins", "moment-timezone"], function(e, n, t, a, o, i) {
    t.factory("billingService", ["data", "formatService", function(t, s) {
        function r(e, n, t, a, o) {
            var r = {
                planName: t && t.name,
                planPrice: t && t.price,
                planDescription: t && t.description,
                planInterval: t && t.intervalLength,
                formattedPrice: s.formatPrice(t, n),
                startDate: s.formatDate(a),
                endDate: s.formatDate(o)
            };
            return i(e).template(r).s
        }

        function l(n, t, i, s, l, c, d) {
            var m, u, p, f, g, h, v, b, y, k, w, M;
            return w = i.currency, M = i.lineTemplate, n.team ? (b = n.team, m = {
                team: b._id
            }, g = b.info.memberships, v = o.periodStartForTeam(b, t, i.periodStart)) : n.member && (y = n.member, m = {
                member: y._id
            }, g = y.info.memberships, v = o.periodStartForMember(y.info.memberships, t, i.periodStart)), h = e.where(c.items, m), u = e.where(s.items, m), p = e.chain(u).pluck("lines").flatten().value(), k = e.extend({
                periodStart: v,
                membershipById: e.bind(l.findById, l),
                planById: e.bind(d.findById, d),
                formatDescription: e.partial(r, M, w)
            }, e.pick(i, "periodLength", "taxType", "issueDate", "discount", "calculateDynamicPrice")), f = o.createPayment(m, g, h, p, k), e.some(f.lines) ? ("basic" === i.invoicingType && (f.number = s.nextNumber(), f.method = "bank"), e.each(f.lines, function(e) {
                a.toISODateProps(e, "startDate", "endDate")
            }), f) : void 0
        }

        function c(n, t, a) {
            var i = e.filter(t, function(e) {
                return e.plan
            });
            return e.map(n, function(e) {
                return o.payableProjectionForMemberships(i, a.findById, e)
            })
        }

        function d(e, n, t) {
            var a = (100 - t) / 100;
            return e * n * a
        }

        function m(n, t) {
            return e.chain(n.lines).filter(function(e) {
                return e.unitPrice > 0
            }).groupBy(function(e) {
                var n = t.findById(e.membership);
                return n && n.plan
            }).map(function(n, t) {
                var a, o;
                return o = e.max(n, "quantity"), a = e.reduce(n, function(e, n) {
                    return e + n.quantity
                }, 0), {
                    original: n,
                    quantity: a,
                    discount: o.discount,
                    description: o.description,
                    unitPrice: o.unitPrice,
                    price: d(a, o.unitPrice, o.discount)
                }
            }).value()
        }

        function u(n, o) {
            return t.get("org", "payments", "mrmModel", "plansModel").then(a.spread(function(t, a, i, s) {
                var r, l, d = i.teamsModel,
                    m = i.membersModel;
                return r = e.chain(d.items).map(function(t) {
                    var a;
                    return a = e.filter(t.info.memberships, function(e) {
                        return e.plan && (!o || e.office === o)
                    }), a.length > 0 ? {
                        team: t,
                        months: c(n, a, s)
                    } : void 0
                }).compact().value(), l = e.filter(i.membershipsModel.items, function(e) {
                    if (e.member && e.plan) {
                        var n = m.findById(e.member);
                        return n && !n.team && (!o || e.office === o) && e.plan
                    }
                }), r.concat([{
                    months: c(n, l, s)
                }])
            }))
        }

        function p(n, o) {
            return t.get("org", "payments", "mrmModel", "plansModel").then(a.spread(function(t, a, i, s) {
                var r, l = i.membershipsModel.items;
                return r = o ? e.filter(l, {
                    office: o
                }) : l, c(n, r, s)
            }))
        }

        function f(t, a) {
            var o, i;
            return i = n().startOf("month").add(t, "month"), o = e.map(e.range(0, a - t), function(e) {
                return i.clone().add(e, "month")
            })
        }
        return {
            projectionsByTeam: u,
            projectionsAtLocation: p,
            createPayment: l,
            generateMonths: f,
            invoiceLines: m
        }
    }]), t.factory("accountsService", ["$q", "data", function(n, t) {
        var a = ["Cash", "Bank Transfer", "POS", "Cheque"],
            o = {
                Stripe: ["Stripe Card", "Stripe ACH"]
            };
        return {
            availableAccounts: function(i) {
                return i ? n.resolve(a) : t.get("integrationsModel").then(function(n) {
                    return e.chain(n.items).map(function(e) {
                        return o[e.type]
                    }).compact().flatten().concat(a).value()
                })
            }
        }
    }])
}), define("settingsControllers", ["jquery", "underscore", "app", "alert", "moment", "utils", "string", "kendo"], function(e, n, t, a, o, i, s, r) {
    function l(e) {
        return o([2015, 0, e]).format("Do")
    }
    t.controller("SettingsBaseController", ["$state", "$scope", "$http", "data", "$q", function(e, t, a, o, i) {
        var s = i.defer();
        o.get("org").then(function(e) {
            t.org = e, s.resolve(e)
        }), t.waitForOrg = function() {
            return s.promise
        }, t.updateOrg = function(o) {
            return a.put(t.API_ORG + t.org._id, o).success(function(a) {
                var o = a.slug && a.slug !== t.org.slug;
                n.extend(t.org, a), o && e.go("organization.manage.settings.general")
            }).messages({
                ok: "Successfully updated the organization.",
                error: "Unable to updated the organization."
            })
        }
    }]), t.controller("SettingsController", ["$scope", function(e) {
        e.waitForOrg().then(function(t) {
            e.orgModel = n.pick(t, "name", "slug", "email", "url", "twitterHandle", "image"), e.orgModel.settings = {
                general: n.pick(t.settings.general, "legalName", "address", "logoUrl", "termsUrl")
            }
        })
    }]), t.controller("SettingsSpaceController", ["$scope", "$http", function(t, a) {
        function o() {
            a.put(t.API_ORG + t.org.slug + "/labels", t.org.labels).messages({
                ok: "Successfully updated the labels.",
                error: "Unable to update the labels."
            })
        }
        t.waitForOrg().then(function(e) {
            t.orgModel = n.pick(e, "_id", "settings", "deskTemplate"), t.orgModel.space = n.clone(e.settings.space)
        }), t.addLabel = function() {
            t.label = {}, e("#label-modal").modal("show")
        }, t.editLabel = function(a) {
            t.editing = !0, t.label = n.clone(a), t.originalLabel = a, e("#label-modal").modal("show")
        }, t.commitLabel = function() {
            t.editing ? n.extend(t.originalLabel, t.label) : t.org.labels.push(t.label), o(), e("#label-modal").modal("hide")
        }, t.cleanUpData = function() {
            t.editing = void 0, t.originalLabel = void 0, t.label = void 0
        }, t.deleteLabel = function(e) {
            t.org.labels.splice(e, 1), o()
        }
    }]), t.controller("SettingsPortalController", ["$rootScope", "$scope", function(e, t) {
        var a, o = {
            red: "#f44336",
            pink: "#e91e63",
            purple: "#9c27b0",
            "deep-purple": "#673ab7",
            indigo: "#3f51b5",
            blue: "#2196f3",
            "light-blue": "#03a9f4",
            cyan: "#00bcd4",
            teal: "#009688",
            green: "#4caf50",
            "light-green": "#8bc34a",
            lime: "#cddc39",
            yellow: "#ffeb3b",
            amber: "#ffc107",
            orange: "#ff9800",
            "deep-orange": "#ff5722",
            brown: "#795548",
            grey: "#9e9e9e",
            "blue-grey": "#607d8b"
        };
        a = n.invert(o), t.palette = n.values(o), t.waitForOrg().then(function(a) {
            t.community = n.clone(a.settings.community) || {}, t.pickedColor = o[t.community.primaryColor], t.url = "/community/" + a.slug, t.fullUrl = e.officerndRoot + t.url
        }), t.updateOrgPortal = function() {
            t.community.primaryColor = a[t.pickedColor], t.updateOrg({
                settings: {
                    community: t.community
                }
            })
        }, t.cleanUpData = function() {
            t.community = void 0
        }
    }]), t.controller("SettingsBillingController", ["$scope", "$rootScope", "data", "$http", "iso4217", "$filter", function(e, t, a, o, s, r) {
        e.formatTemplate = r("formatTemplate"), e.currencies = n.map(s.currenciesByCode, function(e, n) {
            return {
                code: n,
                label: e.text + " (" + n + ")"
            }
        }), e.possibleDates = n.map(n.range(1, 31), function(e) {
            return {
                value: e,
                name: l(e)
            }
        }), a.get("org", "integrationsModel").then(i.spread(function(t, a) {
            var o;
            e.org = t, e.settings = {
                billing: n.clone(t.settings.billing),
                payments: n.clone(t.settings.payments) || {},
                invoicing: n.clone(t.settings.invoicing)
            }, e.settings.payments.daysBefore = e.settings.payments.daysBefore || 0, o = a.findByType("Xero"), e.isXeroEnabled = o && o.enabled
        })), e.formatOrdinal = l, e.saveOrgSettings = function() {
            e.updateOrg({
                settings: e.settings
            }).then(function(e) {
                t.initOrg(e.data)
            })
        }
    }]), t.controller("SettingsMembersController", ["$scope", "$rootScope", "data", "$http", "memberImportService", function(t, a, o, s, r) {
        function l() {
            s.put(t.API_ORG + t.org.slug + "/custom-properties", t.org.customProperties).messages({
                ok: "Successfully updated the member properties.",
                error: "Unable to update the member properties."
            })
        }
        t.propertyTypes = [{
            name: "Team",
            plural: "Teams"
        }, {
            name: "Company",
            plural: "Companies"
        }], t.waitForOrg().then(function(e) {
            t.org = e, t.settings = n.clone(e.settings)
        }), t.saveOrgSettings = function() {
            t.updateOrg({
                settings: t.settings
            }).then(function(e) {
                a.initOrg(e.data)
            })
        }, t.addProperty = function() {
            t.property = {
                targets: ["member"]
            }, e("#property-modal").modal("show")
        }, t.editProperty = function(a) {
            t.property = n.clone(a), t.property.targets = n.clone(a.targets), t.originalProperty = a, e("#property-modal").modal("show")
        }, t.commitProperty = function() {
            t.originalProperty ? n.extend(t.originalProperty, t.property) : t.org.customProperties.push(t.property), l(), e("#property-modal").modal("hide")
        }, t.cleanUpData = function() {
            t.originalProperty = void 0, t.property = void 0
        }, t.deleteProperty = function(e) {
            var a = n.findIndex(t.org.customProperties, function(n) {
                return n.title === e.title
            });
            t.org.customProperties.splice(a, 1), l()
        }, t.importMembers = function(a) {
            var o;
            a.files[0] && (o = new FileReader, o.onload = function() {
                var a = o.result;
                t.safeApply(function() {
                    var e = n.pluck(t.org.customProperties, "title");
                    t.importedMembers = n.map(i.CSV2JSON(a), function(a) {
                        var o;
                        return o = n.pick(a, e), o[t.teamProperty.name] = a[t.teamProperty.name], o.Name = a.name || a.Name, o.Email = a.email || a.Email || a["E-mail"] || a["e-mail"], o
                    })
                }), e("#imported-members-modal").modal("show")
            }, o.readAsText(a.files[0]))
        }, t.commitImport = function() {
            t.importingMembers = !0, r.importMembers(t.importedMembers).messages({
                ok: "Members imported successfully",
                error: "Error occurred while importing members."
            })["finally"](function() {
                delete t.importedMembers, delete t.importingMembers, e("#imported-members-modal").modal("hide")
            })
        }, t.cancelImport = function() {
            delete t.importedMembers, e("#imported-members-modal").modal("hide")
        }
    }]).directive("orgCustomPropertyTitleValidator", function() {
        return {
            require: "ngModel",
            link: function(e, t, a, o) {
                o.$validators.orgCustomPropertyTitleValidator = function(t, a) {
                    if (e.org)
                        if (e.originalProperty) {
                            var o = e.originalProperty.title;
                            if (n.some(e.org.customProperties, function(e) {
                                    return e.title !== o && e.title === t
                                })) return !1
                        } else if (n.some(e.org.customProperties, function(e) {
                            return e.title === t
                        })) return !1;
                    return !0
                }
            }
        }
    }).directive("targetsCheckbox", function() {
        return {
            restrict: "E",
            require: "ngModel",
            scope: {
                text: "@",
                property: "=",
                target: "@"
            },
            template: "<label><input type='checkbox' ng-checked='property.targets.indexOf(target) > -1' ng-click='toggleSelection()' />{{ text }}</label>",
            link: function(e, n, t, a) {
                e.toggleSelection = function() {
                    var n = e.property.targets.indexOf(e.target);
                    n > -1 ? e.property.targets.splice(n, 1) : e.property.targets.push(e.target)
                }, a.$validators.orgCustomPropertyTargetsValidator = function(n, t) {
                    return e.property ? e.property.targets.length > 0 : void 0
                }
            }
        }
    }), t.controller("SettingsAdminController", ["$state", "$scope", "$rootScope", "$stateParams", "currentUserService", "data", "messageService", "$http", "$q", function(t, s, r, l, c, d, m, u, p) {
        function f(t) {
            s.permission = {
                role: "Owner"
            }, n.extend(s.permission, t), s.members = n.filter(s.allTeamMembers, function(e) {
                var n = g(e);
                return !n || "None" === n.role || "Member" === n.role
            }), e("#user-modal").modal("show")
        }

        function g(e) {
            return n.find(s.permissionsModel.items, {
                contact: e._id
            })
        }

        function h(e) {
            var n = s.findMember(e);
            return m.promptDelete(n.name).then(function() {
                return s.permissionsModel.remove(e)
            }).messages({
                ok: "Teammate removed successfully.",
                error: "Unable to remove the teammate."
            })
        }

        function v(t) {
            s.permission = n.pick(t, "role"), s.originalPermission = t, s.member = s.findMember(t), e("#user-modal").modal("show")
        }

        function b() {
            return s.systemTeam ? p.resolve(s.systemTeam) : M.add({
                name: s.org.name,
                email: s.org.email,
                twitterHandle: s.org.twitterHandle,
                isSystem: !0
            })
        }

        function y(e) {
            return e.contact ? p.resolve(e) : b().then(function(n) {
                return w.add({
                    name: e.name,
                    email: e.email,
                    team: n._id
                })
            }).then(function(n) {
                return e.contact = n._id, e
            })
        }
        var k, w, M;
        d.get("permissionsModel", "membersModel", "teamsModel").then(i.spread(function(e, t, a) {
            s.permissionsModel = e, w = t, M = a, s.systemTeam = n.find(M.items, {
                isSystem: !0
            }), s.systemTeam && (s.allTeamMembers = w.membersForTeam(s.systemTeam._id))
        })), s.isMe = c.isMe, s.cleanupPermission = function() {
            delete s.permission, delete s.originalPermission, delete s.member
        }, s.addPermission = f, s.editPermission = v, s.deletePermission = h, s.adminMember = function(e) {
            return "Member" !== e.role && "None" !== e.role
        }, s.findMember = function(e) {
            return w.findById(e.contact)
        }, s.editMember = function(e) {
            r.$broadcast("edit-member", e)
        }, s.commitPermission = function() {
            s.originalPermission ? s.permissionsModel.update(s.originalPermission, s.permission).messages({
                ok: "Teammate permission updated successfully.",
                error: "Error occurred while updating teammate permission."
            }) : y(s.permission).then(function(e) {
                var t = n.find(s.permissionsModel.items, {
                    contact: e.contact
                });
                return t ? s.permissionsModel.update(t, e) : s.permissionsModel.add(e)
            }).messages({
                ok: "Teammate added successfully",
                error: "Error occurred while adding teammate."
            }), e("#user-modal").modal("hide")
        }, s.toggleExpandAccessKeys = function() {
            s.accessKeysVisible ? s.accessKeysVisible = !1 : (s.accessKeysVisible = !0, s.accessKeys || d.get("accessKeysModel").then(function(e) {
                k = e, s.accessKeys = k.items
            }).messages({
                error: "Unable to load the organization access keys"
            }))
        }, s.expireIn = function(e) {
            return o(e.createdAt).add("365", "days").fromNow()
        }, s.toggleExpandedAccessKey = function(e) {
            s.expandedAccessKey = s.expandedAccessKey === e ? void 0 : e
        }, s.initNewAccessKey = function() {
            s.newAccessKey = {}
        }, s.addAccessKey = function() {
            s.newAccessKey && k && k.add(s.newAccessKey).messages({
                ok: "Access key added successfuly",
                error: "Unable to add access key to organization"
            })
        }, s.deleteAccessKey = function(e) {
            e && k && m.promptDelete("access key").then(function() {
                return k.remove(e)
            }).messages({
                ok: "Access key removed successfully",
                error: "Unable to remove access key to organization"
            })
        }, s.deleteOrg = function() {
            m.promptDelete(s.org.name).then(function() {
                return u["delete"](s.API_ORG + s.org._id)
            }).then(function() {
                t.go("account.spaces")
            }).messages({
                ok: "Successfully deleted the organization.",
                error: "Unable to delete the organization."
            })
        }, s.cloneOrg = function() {
            u.post(s.API_ORG + s.org._id + "/clone").success(function() {
                t.go("account.spaces"), a.ok("Successfully cloned the organization.")
            }).error(function() {
                a.error("Unable to cloned the organization.")
            })
        }, s.leaveOrg = function() {
            var e = c.currentUser()._id,
                a = n.find(s.permissionsModel.items, function(n) {
                    return n.user._id === e
                });
            a && h(a).then(function() {
                t.go("account.spaces")
            })
        }
    }]), t.factory("integrationsService", ["authenticationService", "data", "$http", "accountsService", "$q", function(e, t, o, i, s) {
        var r = [{
            name: "Capsule",
            title: "Capsule CRM",
            image: "//d35ll89fr5oblf.cloudfront.net/static/integrations/capsule.jpeg",
            canSync: !0,
            properties: [{
                name: "apiKey",
                title: "API Key"
            }, {
                name: "company",
                title: "Company"
            }],
            configure: {
                prepareScope: function(e) {
                    var t, a;
                    return e.settings && e.settings.tagsToLocations && (t = n.chain(e.settings.tagsToLocations).map(function(e) {
                        return [e.office, e.tag]
                    }).object().value(), a = n.chain(e.settings.tagsToLocations).map(function(e) {
                        return [e.office, e.leadTag]
                    }).object().value()), {
                        tagsForOffice: t || {},
                        leadTagsForOffice: a || {}
                    }
                },
                modal: "#capsule-modal"
            },
            save: function(e, t) {
                e.settings.tagsToLocations = n.map(t.tagsForOffice, function(e, n) {
                    return {
                        tag: e,
                        leadTag: t.leadTagsForOffice[n],
                        office: n
                    }
                })
            }
        }, {
            name: "Xero",
            title: "Xero Accounting",
            image: "//d35ll89fr5oblf.cloudfront.net/static/integrations/xero.png",
            properties: [{
                name: "invoicesStatus",
                title: "Default status",
                valueField: "code",
                option: {
                    text: "Draft",
                    code: "DRAFT"
                },
                textField: "text",
                values: [{
                    text: "Submitted",
                    code: "SUBMITTED"
                }, {
                    text: "Approved",
                    code: "AUTHORISED"
                }],
                description: "The status we will send to Xero when creating invoices."
            }, {
                name: "manualSync",
                title: "Sync behaviour",
                valueField: "manual",
                textField: "text",
                option: {
                    text: "Sync autmatically when create",
                    manual: !1
                },
                values: [{
                    text: "Sync manually",
                    manual: !0
                }],
                description: "If manual sync is selected we will not send invoices until you click sync button."
            }, {
                name: "defaultItemCode",
                title: "Xero item code",
                description: 'Xero item code is used to populate the inventory item type in your line items when sending invoices to Xero. For more information about Xero inventory items refer to <a href="https://help.xero.com/int/Inventory" target="_blank">this article</a>.'
            }],
            summary: function(e) {
                var n = e.settings && e.settings.org;
                return n ? "Connected to " + n.name : "Not connected"
            },
            configure: {
                prepareScope: function(e, t) {
                    return e.settings.revenue || (e.settings.revenue = {}), e.settings.payments || (e.settings.payments = {}), s.all([o.get("/i/integrations/Xero/config/" + t), i.availableAccounts()]).spread(function(e, t) {
                        return n.extend({
                            revenueAccountsNames: [{
                                name: "sales",
                                title: "Sales Account",
                                description: "OfficeR&D will submit invoices to this account. It is usually mapped to Xero Sales account (with code 200)."
                            }],
                            paymentsAccountsNames: n.map(t, function(e) {
                                return {
                                    name: e
                                }
                            })
                        }, e.data)
                    })
                },
                modal: "#xero-modal"
            },
            confirm: {
                deactivate: "Deactivating this integration will disconnect all companies and invoices. Are you sure you want to continue?"
            },
            canSync: !0,
            connect: function(n) {
                return e.authXero(!0).then(function() {
                    return t.get("integrationsModel")
                }).then(function(e) {
                    var n = e.findByType("Xero");
                    return e.connectOrg(n)
                })
            },
            connected: function(e) {
                var n = e.settings && e.settings.org;
                return n
            },
            handleError: function(e) {
                return e && "xero" === e.tag && e.details.indexOf("org_mismatch") >= 0 ? (a.error("Organization already connected to different Xero company."), !0) : void 0
            }
        }, {
            name: "Zapier",
            title: "Zapier",
            image: "//d35ll89fr5oblf.cloudfront.net/static/integrations/zapier.png",
            alwaysEnabled: !0,
            configure: {
                modal: "#zapier-modal"
            }
        }, {
            name: "Social",
            title: "Social Hub",
            canSync: !0,
            image: "//d35ll89fr5oblf.cloudfront.net/static/integrations/social-network.jpg"
        }, {
            name: "Stripe",
            title: "Stripe Payment",
            image: "//d35ll89fr5oblf.cloudfront.net/static/integrations/stripe.png",
            properties: [{
                name: "secretKey",
                title: "Secret key",
                secret: !0
            }, {
                name: "publishableKey",
                title: "Publishable key",
                description: "Be careful not to swap the two keys. Publishable key will be publically visible."
            }],
            configure: {
                modal: "#stripe-modal"
            }
        }, {
            name: "Google",
            title: "Google Calendar",
            image: "//d35ll89fr5oblf.cloudfront.net/static/integrations/google.png",
            canSync: !0,
            properties: [{
                name: "tokenCode",
                title: "Token",
                secret: !0,
                description: "Paste the code you received from Google here."
            }],
            summary: function(e) {
                var t = e.settings && e.settings.calendars,
                    a = n.find(t, {
                        primary: !0
                    });
                return a ? "Connected to " + a.id : "Not connected"
            },
            configure: {
                prepareScope: function(e) {
                    var a;
                    return e.settings && e.settings.calendars && (a = n.chain(e.settings.calendars).filter(function(e) {
                        return e.resourceId
                    }).map(function(e) {
                        return [e.resourceId, e.id]
                    }).object().value()), t.get("resourcesModel").then(function(e) {
                        var t = e.resourcesWithType("meeting_room");
                        return {
                            roomMapping: a || {},
                            calendarKeys: n.map(t, function(e) {
                                return {
                                    name: e._id,
                                    title: e.name,
                                    description: e.description
                                }
                            })
                        }
                    })
                },
                modal: "#google-calendar-modal"
            },
            save: function(e, t) {
                var a;
                e.settings.calendars && (a = n.invert(t.roomMapping), e.settings.calendars = n.map(e.settings.calendars, function(e) {
                    return e.resourceId = a[e.id] || null, e
                }))
            }
        }];
        return {
            availableIntegrations: r,
            findByType: function(e) {
                return n.find(r, {
                    name: e
                })
            }
        }
    }]), t.controller("SettingsIntegrationsController", ["$scope", "data", "integrationsService", "$http", "$sce", "messageService", "$q", function(t, o, i, s, r, l, c) {
        var d, m, u = {
                ok: "Integration activated successfully",
                error: "Failed to activate the integration"
            },
            p = {
                ok: "Integration deactivated successfully",
                error: "Failed to deactivate the integration"
            },
            f = {
                initial: "Updating integration settings",
                ok: "Integration updated successfully",
                error: "Failed to update the integration"
            };
        o.get("org", "integrationsModel", "offices").spread(function(e, n, a) {
            t.integrationsModel = n, t.availableIntegrations = i.availableIntegrations, t.findIntegration = function(e) {
                return n.findByType(e.name)
            }, t.offices = a, d = e
        }), t.trustAsHtml = function(e) {
            return r.trustAsHtml(e)
        }, t.toggleActivate = function(e) {
            var a, o, i = t.findIntegration(e);
            i ? i.enabled ? (a = e.confirm && e.confirm.deactivate, o = a ? l.prompt({
                title: "Deactivate " + e.name + "?",
                message: a
            }) : c.resolve(), o.then(function() {
                return t.integrationsModel.remove(i)
            }).messages(p)) : t.integrationsModel.update(i, {
                enabled: !0
            }).messages(u) : t.integrationsModel.add({
                type: e.name,
                enabled: !0,
                secretProperties: n.chain(e.properties).filter({
                    secret: !0
                }).pluck("name").value()
            }).messages(u)
        }, t.configure = function(a) {
            var o, i;
            a.configure && (o = t.findIntegration(a), o && !o.settings && (o.settings = {}), i = a.configure.prepareScope || n.noop, c.resolve(i(o, t.org.slug)).then(function(e) {
                e = e || {}, n.extend(t, e), m = n.keys(e), t.definition = a, t.originalIntegration = o, t.integration = {
                    settings: n.clone(o.settings)
                }
            }), e(a.configure.modal).modal("show"))
        }, t.sync = function(e) {
            e.syncing = !0, s.post("/i/integrations/" + e.name + "/sync/" + t.org.slug).then(function() {
                o.resetCache(), delete e.syncing, a.ok("Sync with " + e.title + " finished successfully")
            }).then(null, function() {
                a.error("Syncing with " + e.title + " failed"), delete e.syncing
            })
        }, t.connect = function(e) {
            e.connecting = !0, e.connect && e.connect(d).then(function() {
                delete e.connecting, a.ok("Connect to " + e.title + " finished successfully")
            }).then(null, function(n) {
                var t = n && n.data;
                e.handleError && e.handleError(t) || a.error("Connect to " + e.title + " failed"), delete e.connecting
            })
        }, t.isEnabled = function(e) {
            var n = t.findIntegration(e);
            return e.alwaysEnabled || n && n.enabled
        }, t.save = function(e) {
            t.integration && t.integrationsModel && (e.save && e.save(t.integration, t), t.integrationsModel.update(t.originalIntegration, t.integration).messages(f))
        }, t.cleanUp = function() {
            delete t.definition, delete t.integration, delete t.originalIntegration, n.each(m, function(e) {
                delete t[e]
            }), m = void 0
        }
    }]);
    var c = {
        member_join: {
            name: "Member Join",
            description: "Sent when member signs up in the member portal",
            params: ["orgName", "memberName", "teamName", "planName", "portalLink"],
            icon: "fa-envelope-o"
        },
        member_request: {
            name: "Member Request",
            description: "Sent when member signs up in the member portal",
            params: ["orgName", "memberName", "teamName", "planName", "portalLink"],
            icon: "fa-envelope-o"
        },
        member_exit: {
            name: "Member Exit",
            description: "Sent when member requests termination",
            params: ["orgName", "memberName", "teamName"],
            icon: "fa-envelope-o"
        },
        member_reset_password: {
            name: "Member Reset Password",
            description: "Sent when member requests to reset password",
            params: ["orgName", "memberName", "resetLink"],
            icon: "fa-envelope-o"
        },
        member_booking_created: {
            name: "Member Booking Created",
            description: "Sent when member successfully book meeting room",
            params: ["orgName", "memberName", "teamName", "period", "meetingRoom"],
            icon: "fa-envelope-o"
        },
        member_invoice: {
            name: "Member Invoice",
            description: "Sent when sending invoice to member",
            params: ["orgName", "name", "invoiceLink"],
            icon: "fa-envelope-o"
        },
        admin_member_join: {
            name: "Admin - Member Join",
            description: "Sent to admins when member signs up in the member portal",
            params: ["orgName", "memberName", "teamName", "planName", "memberLink"],
            icon: "fa-envelope-o"
        },
        admin_member_request: {
            name: "Admin - Member Request",
            description: "Sent to admins when member signs up in the member portal",
            params: ["orgName", "memberName", "teamName", "planName", "memberLink"],
            icon: "fa-envelope-o"
        },
        admin_member_exit: {
            name: "Admin - Member Request Exit",
            description: "Sent to admins when member requests termination",
            params: ["orgName", "memberName", "teamName", "memberLink"],
            icon: "fa-envelope-o"
        },
        admin_member_booking_created: {
            name: "Admin - Member Booking Created",
            description: "Sent to admins when member successfully book meeting room",
            params: ["orgName", "memberName", "teamName", "period", "meetingRoom"],
            icon: "fa-envelope-o"
        }
    };
    t.controller("SettingsTemplatesController", ["$scope", "data", function(e, t) {
        var a, o;
        e.templatesInfo = c, t.get("defaultTemplates", "templatesModel").spread(function(t, i) {
            a = t, o = i, e.templates = n.filter(a, function(e) {
                return !n.some(o.items, {
                    type: e.type
                })
            }).concat(o.items)
        })
    }]), t.controller("EditTemplateController", ["$scope", "$state", "$stateParams", "data", function(e, t, a, o) {
        function i(e, t) {
            return e._id ? r.update(e, t) : r.add(n.extend({
                type: e.type
            }, t))
        }
        var s, r, l;
        e.templatesInfo = c, l = a.templateType, o.get("defaultTemplates", "templatesModel").spread(function(t, a) {
            s = t, r = a, e.originalTemplate = n.find(r.items, {
                type: l
            }) || n.find(s, {
                type: l
            }), e.template = n.pick(e.originalTemplate, "subject", "content")
        }), e.saveTemplate = function() {
            i(e.originalTemplate, e.template).messages({
                ok: "Template saved successfully",
                error: "Failed to save template"
            }).then(function() {
                t.go("organization.manage.settings.templates")
            })
        }
    }]), t.controller("SettingsCalendarController", ["$scope", "data", "$http", function(e, t, a) {
        e.organizationWorkHours = {}, e.openDays = [], e.weekDays = o.localeData("en")._weekdaysShort, e.startOfDay = o().startOf("day").toDate(), e.timezones = r.timezone.windows_zones, e.dateFormats = [{
            text: "12/31/2016",
            value: "MM/dd/yyyy"
        }, {
            text: "31/12/2016",
            value: "dd/MM/yyyy"
        }], e.waitForOrg().then(function(n) {
            var t = o(e.startOfDay).add(n.settings.businessHours.openTime, "hours").toDate(),
                a = o(e.startOfDay).add(n.settings.businessHours.closeTime, "hours").toDate();
            e.openDays = n.settings.businessHours.days, e.organizationWorkHours = {
                open: t,
                close: a
            }, e.dateFormat = n.settings.calendar.dateFormat, e.timezone = n.settings.calendar.timezone
        }), e.updateOrgWorkingHours = function() {
            var n = o(e.organizationWorkHours.open).diff(o(e.startOfDay), "hours", !0),
                t = o(e.organizationWorkHours.close).diff(o(e.startOfDay), "hours", !0);
            e.updateOrg({
                settings: {
                    businessHours: {
                        openTime: n,
                        closeTime: t,
                        days: e.openDays
                    },
                    calendar: {
                        timezone: e.timezone,
                        dateFormat: e.dateFormat
                    }
                }
            })
        }, e.workDay = function(t) {
            return n.contains(e.openDays, t)
        }, e.toggleWorkDay = function(t) {
            var a = n.indexOf(e.openDays, t); - 1 === a ? e.openDays.push(t) : e.openDays.splice(a, 1)
        }
    }]), t.factory("currentUserService", ["$window", function(e) {
        return {
            currentUser: function() {
                return e.user
            },
            isMe: function(n) {
                return n && e.user && n._id === e.user._id
            }
        }
    }])
}), define("availabilityHelper", ["underscore", "utils", "moment"], function(e, n, t) {
    function a(n, a) {
        var i, s, r;
        return n = e.sortBy(n, "startDate"), n.length > 0 && a ? (i = e.last(n), s = t(a), s.isBefore(i.startDate) ? (r = e.find(n, function(e) {
            return !(s.isBefore(e.startDate) || e.endDate && s.isAfter(e.endDate))
        }), r ? {
            name: "occupied",
            membership: r
        } : (r = e.chain(n).filter(function(e) {
            return s.isBefore(e.startDate)
        }).max(function(e) {
            return s.diff(e.startDate)
        }).value(), {
            name: "occupiedFrom",
            membership: r
        })) : i.endDate ? s.isAfter(i.endDate) ? o : {
            name: "availableFrom",
            membership: i
        } : {
            name: "occupied",
            membership: i
        }) : o
    }
    var o = {
        name: "available"
    };
    return {
        status: a
    }
}), define("resourcesServices", ["jquery", "underscore", "app", "alert", "utils", "moment", "availabilityHelper"], function(e, n, t, a, o, i, s) {
    var r, l, c, d, m, u, p = o.today();
    m = "#f58870", u = ["desk", "hotdesk", "team_room"], r = "na", c = [{
        name: "na",
        text: "N/A",
        color: "#FFFFFF"
    }, {
        name: "available",
        text: "Available",
        color: "#3ebeaf"
    }, {
        name: "availableFrom",
        text: "Available soon",
        textTemplate: "Available {time}",
        color: "#96d5cf"
    }, {
        name: "occupied",
        text: "Occupied",
        color: "#9898b7"
    }, {
        name: "occupiedFrom",
        text: "Reserved",
        textTemplate: "Reserved {time}",
        color: "#b8b8d1"
    }, {
        name: "hotdesk",
        text: "Hot desk",
        color: m
    }], d = n.indexBy(c, "name"), l = {
        desk_tr: {
            icon: "fa fa-sitemap",
            title: "Office desk"
        },
        desk: {
            icon: "fa fa-desktop",
            title: "Workstation"
        },
        hotdesk: {
            icon: "fa fa-laptop",
            title: "Hot desk"
        },
        desk_na: {
            icon: "fa fa-user-times",
            title: "Not available"
        }
    }, t.factory("availabilityService", [function() {
        function e(e) {
            var n = d[e];
            return n && n.color
        }

        function n(e, n) {
            var t = d[e] || d[r];
            return n ? t.textTemplate.replace("{time}", i(n).fromNow()) : t.text
        }

        function t(e, n, t) {
            if (n = n || p, "desk" === e.type || "team_room" === e.type) return s.status(e.info.memberships, n);
            if ("desk_tr" === e.type) {
                var a = t.findById(e.parent);
                if (!e.parent || !a) throw new Error("Private office desk should have a parent.");
                return s.status(a.info.memberships, n)
            }
        }
        return {
            hotdeskColor: m,
            deskTypes: l,
            getColor: e,
            getText: n,
            getStatus: t
        }
    }]), t.factory("workstationService", ["data", "availabilityService", "$q", "billingService", "resourceService", function(e, t, a, i, s) {
        function r(e, n) {
            return {
                status: n,
                text: t.getText(n),
                color: t.getColor(n),
                count: e
            }
        }

        function l(e) {
            var t = {};
            return n.each(e, function(e) {
                var n = e.info.status;
                t[n] = (t[n] || 0) + 1
            }), n.map(t, r)
        }

        function c(t) {
            return e.get("occupancyModel").then(function(e) {
                var a = n.where(e.resourcesModel.resourcesWithType("desk"), {
                    room: t
                });
                return l(a)
            })
        }

        function d() {
            return e.get("rooms-by-id", "occupancyModel").then(o.spread(function(e, t) {
                var a = {};
                return n.each(e, function(e) {
                    var o = e.room._id,
                        i = n.where(t.resourcesModel.resourcesWithType("desk"), {
                            room: o
                        });
                    a[o] = l(i)
                }), a
            }))
        }

        function m() {
            return e.get("rooms-by-id", "occupancyModel").then(o.spread(function(e, t) {
                var a = {},
                    o = t.resourcesModel;
                return n.each(e, function(e) {
                    var t = e.room._id,
                        i = e.office.slug,
                        s = n.where(o.resourcesWithType("desk"), {
                            room: t
                        }).length;
                    a[i] = (a[i] || 0) + s
                }), a
            }))
        }

        function u(e) {
            return v(e).then(l)
        }

        function p(e) {
            return "archived" !== e.status
        }

        function f(e) {
            return !e || "available" === e.name || "occupiedFrom" === e.name
        }

        function g(e) {
            return u(e).then(function(e) {
                var t, a, o, i;
                return a = n.chain(e).filter(p).reduce(function(e, n) {
                    return e + n.count
                }, 0).value(), t = n.find(e, {
                    status: "available"
                }), o = n.find(e, {
                    status: "occupiedFrom"
                }), i = (t && t.count || 0) + (o && o.count || 0), 1 - i / a
            })
        }

        function h(o) {
            return a.all([v(o), e.get("resourcesModel")]).spread(function(e, a) {
                var o, s, r;
                return r = n.filter(e, p).length, s = i.generateMonths(-1, 4), o = n.map(s, function(o) {
                    var i = n.chain(e).map(function(e) {
                        return t.getStatus(e, o, a)
                    }).filter(f).value().length;
                    return {
                        month: o.toDate(),
                        occupiedCount: r - i,
                        availableCount: i
                    }
                })
            })
        }

        function v(t) {
            return e.get("rooms-by-id", "occupancyModel").spread(function(e, a) {
                var o, i, s;
                return i = a.resourcesModel.resourcesWithType("desk"), s = a.resourcesModel.resourcesWithType("desk_tr"), o = n.union(i, s), o = t ? n.filter(o, function(n) {
                    return e[n.room].office.slug === t.slug
                }) : n.filter(o, function(n) {
                    var t = e[n.room];
                    return t && t.office.isOpen
                })
            })
        }

        function b(e, n) {
            return s.getResourceByStatusNames(e, n, "desk", ["available", "availableFrom"])
        }
        return {
            workstations: v,
            floorplanStatuses: c,
            organizationStatuses: d,
            organizationWorkstations: m,
            statuses: u,
            occupancy: g,
            occupancyHistory: h,
            assignableDesks: b
        }
    }]), t.factory("privateOfficeService", ["data", "resourceService", function(e, n) {
        function t(e, t) {
            return n.getResourceByStatusNames(e, t, "team_room", ["available", "availableFrom"])
        }
        return {
            assignableTeamRooms: t
        }
    }]), t.factory("resourceService", ["messageService", "$q", "data", "availabilityService", function(e, t, a, i) {
        function s(e, t, a) {
            var o = a.status,
                i = a.name && a.name.toLowerCase(),
                s = a.office,
                r = a.types,
                l = a.room;
            return n.filter(e, function(e) {
                var n = t[e.room];
                return n && (!r || -1 != r.indexOf(e.type)) && (!i || e.name && e.name.toLowerCase().indexOf(i.toLowerCase()) >= 0) && (!o || e.info.status === o) && (!l || n.room.slug === l) && (s ? n.office._id === s : !n.office || n.office.isOpen)
            })
        }

        function r(e) {
            function a(e) {
                return {
                    target: e
                }
            }

            function o(e) {
                var t, o;
                return t = a(e), o = n.where(e, {
                    type: "desk"
                }), t.entityName = "desks", t.attachedEntities = o.length > 0 && ["plans", "history"], t
            }

            function i(e) {
                var n;
                return n = a(e), n.entityName = "meeting room", n.deletedEntities = ["bookings"], n
            }

            function s(e, a, o) {
                var i, s;
                return i = n.where(e, {
                    type: a
                }), s = n.chain(i).map(function(e) {
                    return e.info && e.info.memberships || []
                }).flatten().map(function(e) {
                    return o.update(e, {
                        resource: null
                    })
                }).value(), t.all(s)
            }

            function r(e, a) {
                var o, i;
                return i = n.pluck(e, "_id"), o = n.chain(a.items).filter(function(e) {
                    return n.contains(i, e.parent)
                }).map(function(e) {
                    return a.update(e, {
                        parent: null,
                        type: "desk",
                        targetPlan: null
                    })
                }).value(), t.all(o)
            }

            function l(e, n, t, a) {
                return s(e, "desk", t)
            }

            function c(e, n, a, o) {
                var i = s(e, "team_room", a),
                    l = r(e, n);
                return t.all([i, l])
            }

            function d(e, t, a, o) {
                var i = n.pluck(e, "_id"),
                    s = n.filter(o.items, function(e) {
                        return n.contains(i, e.resourceId)
                    });
                return o.remove(s)
            }
            var m = {
                    desk: {
                        getMessageOptions: o,
                        onResourcesRemoved: l
                    },
                    team_room: {
                        getMessageOptions: a,
                        onResourcesRemoved: c
                    },
                    meeting_room: {
                        getMessageOptions: i,
                        onResourcesRemoved: d
                    }
                },
                u = {
                    getMessageOptions: a,
                    onResourcesRemoved: function() {}
                };
            return m[e] || u
        }

        function l(n) {
            var i, s, l;
            return n = o.ensureArray(n), n.length > 0 ? (l = n[0].type, i = r(l), s = i.getMessageOptions(n), e.promptDelete(s).then(function() {
                return a.get("resourcesModel", "membershipsModel", "rooms-by-id", "calendarEventsModel")
            }).spread(function(e, t, a, o) {
                return e.remove(n).then(function() {
                    return i.onResourcesRemoved(n, e, t, o)
                })
            })) : t.resolve()
        }

        function c(e, t, o, s) {
            return a.get("resourcesModel", "rooms-by-id").spread(function(a, r) {
                var l = a.resourcesWithType(o);
                return n.chain(l).filter(function(o) {
                    if (!t || r[o.room].office._id === t) {
                        var l = e ? i.getStatus(o, e, a).name : o.info.status;
                        return n.contains(s, l)
                    }
                }).map(function(e) {
                    return {
                        id: e._id,
                        name: [e.name, r[e.room].room.name].join(", ")
                    }
                }).value()
            })
        }
        return {
            filter: s,
            count: function(e, n, t) {
                return s(e, n, t).length
            },
            tryDeleteResources: l,
            getResourceByStatusNames: c
        }
    }]), t.factory("hotdeskService", ["data", function(e) {
        function t(t, a) {
            return e.get("membersModel", "membershipsModel", "plansModel").then(o.spread(function(e, o, s) {
                var r, l = i(a),
                    c = a ? l.clone().add(1, "month") : l;
                return r = n.chain(o.items).filter(function(e) {
                    return "terminated" !== e.info.status && (!t || e.office === t._id)
                }).map(function(e) {
                    var n;
                    return (!e.endDate || l.isBefore(e.endDate)) && c.isAfter(e.startDate) && (n = s.findById(e.plan), n && "hotdesk" === n.type) ? {
                        membership: e,
                        plan: n
                    } : void 0
                }).compact().value()
            }))
        }
        return {
            memberships: t
        }
    }])
}), define("calendarKendoUtils", ["underscore", "moment", "utils", "kendo"], function(e, n, t, a) {
    function o(n, t, o, s) {
        var r, l, c;
        return n.recurrence && n.recurrence.rrule && (r = new a.data.SchedulerEvent({
            start: n.start.dateTime,
            end: n.end.dateTime,
            recurrenceRule: n.recurrence.rrule,
            resourceId: n.resourceId
        }), l = r.expand(t, o, s), c = e.chain(l).filter(function(e) {
            return e.start > n.start.dateTime
        }).map(function(t) {
            var a = i(t);
            return a.recurrence = e.pick(n.recurrence, "rrule"), a
        }).value()), c || []
    }

    function i(e) {
        var n = {
            _id: e._id
        };
        if (n.start = c(e.start, e.isAllDay), n.end = c(e.end, e.isAllDay), e.description && (n.description = e.description), n.summary = e.summary, n.resourceId = e.resourceId, n.team = e.team, n.member = e.member, n.plan = e.plan, e.rRule || e.recurrenceException) {
            if (n.recurrence = {
                    rrule: null
                }, e.rRule && e.rRule.freq && e.rRule.freq.value) {
                var t, o;
                t = a.recurrence.rule.serialize, o = l(e.rRule), n.recurrence.rrule = t(o)
            }
            e.recurrenceException && (n.recurrence.exdate = e.recurrenceException)
        }
        return e.recurrenceId && (n.recurringEventId = e.recurrenceId), n
    }

    function s(e, n, t, o) {
        var i = {
            id: n,
            _id: e._id
        };
        if (i.plan = e.plan, i.summary = e.summary, e.description && (i.targetName = e.description), e.start.date ? (i.isAllDay = !0, i.start = new Date(e.start.date), i.end = new Date(e.end.date)) : (i.isAllDay = !1, i.start = new Date(e.start.dateTime), i.end = new Date(e.end.dateTime)), i.resourceId = e.resourceId, t && o ? (i.targetName = o.name + " (" + t.name + ")", i.targetImage = t.twitterInfo && t.twitterInfo.imageUrl, i.member = e.member, i.team = e.team) : o ? (i.targetName = o.name, i.targetImage = o.actualImage, i.member = e.member) : t && (i.targetName = t.name, i.targetImage = t.twitterInfo && t.twitterInfo.imageUrl, i.team = e.team), e.recurrence) {
            if (e.recurrence.rrule) {
                var s, l, c;
                i.recurrenceRule = e.recurrence.rrule, s = a.recurrence.rule.parse, l = s(e.recurrence.rrule), c = r(l, i.start), i.rRule = c
            }
            e.recurrence.exdate && (i.recurrenceException = e.recurrence.exdate)
        }
        return e.targetPlan && (i.targetPlan = e.targetPlan), e.recurringEventId && (i.recurrenceId = e.recurringEventId), e.source && (i.source = e.source), i
    }

    function r(n, t) {
        var a = {
            freq: {
                value: n.freq
            },
            interval: n.interval,
            until: t,
            count: 1
        };
        return n.count ? (a.end = "after", a.count = n.count) : n.until && (a.end = "on", a.until = n.until), a.weekDays = [!1, !1, !1, !1, !1, !1, !1], e.each(n.weekDays, function(e) {
            a.weekDays[e.day] = !0
        }), e.some(a.weekDays, e.identity) || (a.weekDays[t.getDay()] = !0), a
    }

    function l(n) {
        var t = {
            freq: n.freq.value,
            interval: n.interval
        };
        if ("after" === n.end ? t.count = n.count : "on" === n.end && (t.until = n.until), "weekly" === t.freq) {
            var a = n.weekDays;
            e.some(a, e.identity) && (t.weekStart = 0, t.weekDays = [], e.each(a, function(e, n) {
                e && t.weekDays.push({
                    day: n,
                    offset: 0
                })
            }))
        }
        return t
    }

    function c(e, n) {
        var t = {};
        return n ? t.date = e : t.dateTime = e, t
    }
    return {
        expandEventOccurrencesForTimePeriod: o,
        toOrndModelEvent: i,
        toKendoSchedulerEvent: s
    }
}), define("calendarServices", ["jquery", "underscore", "app", "alert", "utils", "moment", "calendarKendoUtils"], function(e, n, t, a, o, i, s) {
    var r, l, c, d, m = o.today();
    l = "Google", c = 2, d = 24, r = ["#92e1c0", "#9fc6e7", "#f691b2", "#fbe983", "#7bd148", "#fad165", "#ac725e", "#f83a22", "#b99aff", "#c2c2c2", "#cca6ac", "#a47ae2"], t.factory("calendarConfig", ["data", "$q", "formatService", function(t, o, u) {
        function p(e) {
            return r[e % r.length]
        }

        function f(n, t) {
            var o, s, r, l, c = t.view().name;
            e(n.target).is("td") && (o = t.select(), i().isSameOrAfter(o.end) ? a.info("You cannot book meeting rooms in the past") : i(o.end).diff(o.start, "hours") <= d && "month" !== c ? t.addEvent({
                start: o.start,
                end: o.end,
                resourceId: o.resources.resourceId
            }) : 1 === o.slots.length && "month" === c ? (s = i(t.options.workDayStart).hours(), l = i(), r = i(o.start).hours(s), r = i.max(r, l), t.addEvent({
                start: r.toDate(),
                end: r.clone().add(1, "hours").toDate(),
                resourceId: o.resources.resourceId
            })) : o.slots.length > 1 && "month" === c ? a.info("Please specify a date") : a.info("You cannot book meeting room for more than " + d + " hours"))
        }

        function g(e, a) {
            return t.get("resourcesModel", "rooms", "teamsModel", "membersModel", "plansModel").spread(function(t, o, i, s, r) {
                var l, c;
                return M = i, S = s, l = n.where(t.resourcesWithType(e), a), c = n.chain(o).map(function(e) {
                    return [e._id, e.office]
                }).object().value(), n.map(l, function(e, n) {
                    return {
                        text: e.name,
                        value: e._id,
                        room: e,
                        color: e.color || p(n),
                        plan: r.findById(e.targetPlan),
                        targetPlan: e.targetPlan,
                        office: c[e.room]
                    }
                })
            })
        }

        function h(n) {
            var t = e("<div />"),
                a = n.targetName || n.summary;
            return n.targetImage && i(n.end).diff(n.start, "hours") > 2 && t.append(e("<img />", {
                src: n.targetImage,
                "class": "calendar-image profile-sm"
            })), a && (t.append(e("<span />", {
                text: a,
                "class": "calendar-title"
            })), n.source === l && t.append(e("<div />", {
                text: "Source: " + n.source,
                "class": "calendar-source"
            }))), t.html()
        }

        function v(e) {
            return i().isSameOrAfter(e.end)
        }

        function b(e, n) {
            var t;
            return e._id = e.event._id, e.resourceId = e.resources.resourceId || e.event.resourceId, t = n.occurrencesInRange(e.start, e.end), y(e, t)
        }

        function y(e, t) {
            return !n.chain(t).filter(function(n) {
                return n._id !== e._id
            }).pluck("resourceId").contains(e.resourceId).value()
        }

        function k(o, r, d) {
            function p(t) {
                var a = e("<div />");
                a.append(e("<div />", {
                    text: t.text,
                    "class": "header-title"
                }));
                var i = n.findWhere(o, {
                    value: t.value
                });
                return i.plan && a.append(e("<div />", {
                    "class": "header-title-price",
                    text: " " + u.formatPlan(i.plan, window.currency, !0)
                })), a.html()
            }

            function f(e) {
                (!d(e.event) || v(e.event)) && (a.error(y), e.preventDefault())
            }

            function g(e) {
                b(e, this) ? e.event.source === l && (e.preventDefault(), a.error(k)) : (e.preventDefault(), a.error(x))
            }
            var y = "You cannot edit this booking",
                k = "You cannot edit bookings imported from Google",
                x = "This slot for the current room is already booked";
            return d = d || n.constant(!0), t.get("calendarEventsModel", "org").spread(function(t, u) {
                var b = u.settings.businessHours.openTime,
                    k = u.settings.businessHours.closeTime;
                return {
                    allDaySlot: !1,
                    minorTickCount: c,
                    height: "100%",
                    selectable: !0,
                    workDayStart: i(m).add(Math.floor(b), "hours").toDate(),
                    workDayEnd: i(m).add(Math.ceil(k), "hours").toDate(),
                    views: [{
                        type: "day",
                        group: {
                            resources: ["Meeting Rooms"]
                        },
                        dateHeader: !1
                    }, {
                        type: "week",
                        selected: !0
                    }, "month"],
                    showWorkHours: !0,
                    dataBound: function() {
                        var t, a, o = this.view();
                        "day" === o.name && e(".k-scheduler-layout tr:first .k-scheduler-table").not(".k-scheduler-header-all-day").find("tr:nth-child(2)").hide(), a = this.dataSource.view();
                        var s = new Date;
                        n.each(a, function(e) {
                            t = o.element.find("[data-uid=" + e.uid + "]"), e.source === l && t.addClass("google-event"), i(e.end).isBefore(s) && t.addClass("google-event")
                        })
                    },
                    dataSource: {
                        transport: {
                            read: function(e) {
                                var a, i;
                                a = n.pluck(o, "value"), i = n.chain(t.items).filter(function(e) {
                                    return n.contains(a, e.resourceId)
                                }).map(function(e, n) {
                                    return s.toKendoSchedulerEvent(e, n + 1, M.findById(e.team), S.findById(e.member))
                                }).value(), w = n.chain(i).pluck("id").max().value() || 0, e.success(i)
                            },
                            create: function(e) {
                                var n = s.toOrndModelEvent(e.data);
                                return t.add(n).then(function(n) {
                                    w++;
                                    var t = s.toKendoSchedulerEvent(n, w, M.findById(n.team), S.findById(n.member));
                                    e.success(t)
                                }).messages({
                                    ok: "Booking created",
                                    error: "Failed to book a room"
                                })
                            },
                            update: function(e) {
                                var n, a;
                                return n = s.toOrndModelEvent(e.data), a = t.findById(n._id), t.update(a, n).then(function(n) {
                                    e.success(s.toKendoSchedulerEvent(n, e.data.id, M.findById(n.team), S.findById(n.member)))
                                }).messages({
                                    ok: "Booking updated",
                                    error: "Failed to update booking"
                                })
                            },
                            destroy: function(e) {
                                var n = t.findById(e.data._id);
                                t.remove(n).then(function() {
                                    e.success({})
                                }).messages({
                                    ok: "Booking deleted",
                                    error: "Failed to delete booking"
                                })
                            }
                        }
                    },
                    groupHeaderTemplate: p,
                    eventTemplate: h,
                    resources: [{
                        field: "resourceId",
                        name: "Meeting Rooms",
                        title: "Meeting Room",
                        dataSource: o
                    }],
                    remove: f,
                    moveStart: f,
                    moveEnd: g,
                    resizeStart: f,
                    resizeEnd: g,
                    editable: {
                        editRecurringMode: "series"
                    },
                    add: function(e) {
                        var t, a, i, s;
                        e.preventDefault(), t = this.dataSource, a = e.event, i = d(a), s = v(a), i && !s && r(a, o).then(function(e) {
                            t.add(n.pick(e, "start", "end", "member", "team", "resourceId", "plan", "rRule", "summary")), t.sync()
                        }).then(null, function() {
                            t.cancelChanges()
                        })
                    },
                    edit: function(e) {
                        var n, t, i, s, l;
                        e.preventDefault(), n = this.dataSource, t = e.event, i = d(t), s = v(t), l = t.isNew(), !i || l && s ? l || a.error(y) : r(t, o).then(function(e) {
                            t.set("start", e.start), t.set("end", e.end), t.set("resourceId", e.resourceId), t.set("team", e.team), t.set("member", e.member), t.set("plan", e.plan), t.set("summary", e.summary), t.set("rRule", e.rRule), n.sync()
                        }).then(null, function() {
                            n.cancelChanges()
                        })
                    }
                }
            })
        }
        var w, M, S;
        return {
            isPastEvent: v,
            addOnClickBehaviour: f,
            isRoomAvailable: y,
            getSchedulerOptions: k,
            getSchedulerResources: g
        }
    }])
}), define("resourcesControllers", ["jquery", "underscore", "app", "alert", "utils"], function(e, n, t, a, o) {
    var i;
    i = o.Constants.DESK_TYPES, t.controller("SpaceController", ["$scope", "data", "resourceService", function(e, n, t) {
        n.get("officesModel", "resourcesModel", "rooms-by-id").then(o.spread(function(n, a, o) {
            e.desksCount = t.count(a.items, o, {
                types: i
            }), e.privateOfficesCount = t.count(a.items, o, {
                types: ["team_room"]
            }), e.meetingRoomsCount = t.count(a.items, o, {
                types: ["meeting_room"]
            }), e.officesCount = n.items.length
        }))
    }]), t.controller("MeetingRoomsController", ["$rootScope", "$scope", "$location", "data", "sortingService", function(e, n, t, a, i) {
        function s() {
            var e = t.search();
            n.search = {
                office: e.office,
                types: ["meeting_room"]
            }
        }
        a.get("resourcesModel", "rooms-by-id").then(o.spread(function(e, t) {
            n.resources = e.items, n.roomsById = t, s()
        })), n.getNormalized = i.getNormalized, n.editResource = function(n) {
            e.$broadcast("edit-resource", {
                resource: n
            })
        }, n.$on("$locationChangeStart", s)
    }]), t.controller("PrivateOfficesController", ["$scope", "$location", "data", "sortingService", function(e, t, a, o) {
        function i() {
            var n = t.search();
            e.search = {
                office: n.office,
                types: ["team_room"]
            }
        }
        a.get("resourcesModel", "rooms-by-id").spread(function(n, t) {
            e.resources = n.items, e.roomsById = t, i()
        }), e.getNormalized = o.getNormalized, e.getDesksCount = function(t) {
            return n.where(e.resources, {
                parent: t._id
            }).length
        }, e.$on("$locationChangeStart", i)
    }]), t.controller("DesksController", ["$scope", "$location", "data", "sortingService", "resourceService", "availabilityService", function(e, n, t, a, s, r) {
        function l() {
            var t = n.search();
            e.search = {
                office: t.office,
                types: i
            }
        }
        e.deskTypes = i, e.deskTypeToDisplayName = r.deskTypes, t.get("rooms-by-id", "occupancyModel").then(o.spread(function(n, t) {
            e.roomsById = n, e.resources = t.resourcesModel.items, l()
        })), e.isSubtabActive = function(e, n) {
            for (var t = e.types.length == n.length, a = 0; a < n.length; a++) t &= -1 != e.types.indexOf(n[a]);
            return t
        }, e.countResources = function(n) {
            return s.filter(e.resources, e.roomsById, n).length
        }, e.statusText = function(e) {
            if (e.info) {
                var n = e.info.status;
                return r.getText(n)
            }
        }, e.statusColor = function(e) {
            if (e.info) {
                var n = e.info.status;
                return r.getColor(n)
            }
        }, e.getNormalized = a.getNormalized, e.$on("$locationChangeStart", l)
    }]), t.controller("DeskOccupancyController", ["$scope", "workstationService", "chartsService", function(e, n, t) {
        e.workstationChartOptions = t.workstations, e.occupancyHistoryOptions = t.workstationOccupancy, n.occupancyHistory().then(function(n) {
            e.occupancyHistory = n
        }), n.statuses().then(function(n) {
            e.statuses = n
        })
    }])
}), define("calendarControllers", ["jquery", "underscore", "app", "alert", "utils", "moment"], function(e, n, t, a, o, i) {
    t.controller("CalendarController", ["$scope", "$q", "$location", "data", "calendarConfig", "$http", "$rootScope", function(t, a, s, r, l, c, d) {
        function m(e) {
            var a, o, i, s;
            if (a = t.container.scheduler) {
                var r = {};
                e && (r = {
                    field: "office",
                    operation: "eq",
                    value: e
                }), i = a.resources[0].dataSource, o = a.dataSource, i.filter(r), s = n.pluck(i.view(), "value"), o.filter({
                    operator: function(e) {
                        return -1 != s.indexOf(e.resourceId)
                    }
                }), a.view(a.view().name)
            }
        }

        function u() {
            return c.post(o.joinPath(t.apiRoot, "i/integrations", "Google", "sync", t.orgSlug)).then(function(e) {
                r.resetCache(), t.scheduler.dataSource.read(), t.syncing = !1
            }, function(e) {
                t.syncing = !1
            })
        }

        function p(e, n) {
            var t, o;
            return t = a.defer(), o = {
                event: e,
                meetingRooms: n,
                deferred: t
            }, d.safeApply(function() {
                d.$broadcast("edit-event", o)
            }), t.promise
        }
        t.container = {}, t.syncing = !1, a.all([r.get("org"), r.get("officesModel"), r.get("integrationsModel"), l.getSchedulerResources("meeting_room")]).spread(function(e, a, o, i) {
            t.orgSlug = e.slug, t.businessHours = e.settings.businessHours, t.schedulerResourcesDS = i, t.googleIntegrationEnabled = o.findByType("Google"), l.getSchedulerOptions(i, p).then(function(e) {
                t.schedulerOptions = e
            }), t.groupedRooms = n.chain(i).groupBy(function(e) {
                return e.office
            }).map(function(e, n) {
                return {
                    rooms: e,
                    office: a.findById(n)
                }
            }).value(), m()
        }), t.syncWithGoogle = function() {
            t.syncing = !0, u().messages({
                ok: "Sync with Google Calendar finished successfully",
                error: "Syncing with Google Calendar failed"
            })
        }, t.filterOffice = function(e) {
            m(e)
        }, t.createBooking = function() {
            var e = i();
            t.scheduler.addEvent({
                start: e.toDate(),
                end: e.clone().add(1, "hours").toDate()
            })
        }, t.$watch("container.scheduler", function(a, o) {
            !o && a && (t.googleIntegrationEnabled && u(), t.scheduler = e("#scheduler").data("kendoScheduler"), e("#scheduler").mouseup(n.partial(l.addOnClickBehaviour, n, t.scheduler)))
        })
    }])
}), define("spaceControllers", ["jquery", "underscore", "app", "alert", "utils"], function(e, n, t, a, o) {
    var i = o.format;
    t.controller("FloorplansController", ["$scope", "importHelper", "s3Upload", "$metrics", "data", "$state", "messageService", function(t, o, s, r, l, c, d) {
        function m(e, n) {
            u.roomsModel.add(e).messages({
                ok: "Successfully added a floorplan.",
                error: "Unable to add a floorplan."
            }).then(function(e) {
                if (n) {
                    var t = u.officesModel.findById(e.office);
                    c.go("organization.office.design", {
                        office: t.slug,
                        roomSlug: e.slug
                    })
                }
            })
        }
        var u = this;
        l.get("org", "officesModel", "roomsModel").spread(function(e, n, a) {
            u.org = e, u.officesModel = n, u.roomsModel = a, t.offices = n.items, t.roomsByOffice = a.groupedView("office")
        }), t.versionFilter = function(e) {
            return !e.original
        }, t.getVersions = function(e) {
            return n.map(e.versions, function(e) {
                return u.roomsModel.findById(e)
            })
        }, t.cleanUpRoom = function() {
            delete t.room, delete t.originalRoom
        }, t.saveRoom = function() {
            u.roomsModel.update(t.originalRoom, t.room).messages({
                ok: "Successfully updated the floorplan.",
                error: "Unable to save the floorplan."
            })
        }, t.addRoomAndOpenDesigner = function() {
            m(t.room, !0)
        }, t.addRoom = function() {
            m(t.room)
        }, t.deleteRoom = function(e) {
            d.promptDelete(e.name).then(function() {
                return u.roomsModel.remove(e)
            }).then(function() {
                l.resetCache()
            }).messages({
                ok: "Successfully deleted the floorplan.",
                error: "Unable to delete the floorplan."
            })
        }, t.chooseImage = function() {
            e("#modal-background-upload").click()
        }, t.backgroundFilePicked = function(e) {
            e && (t.uploading = !0, s.userResource(e, "room-background", "new-room").then(function(e) {
                return o.loadImage(e)
            }).then(function(e) {
                t.room.background = {
                    uri: e.uri,
                    width: r.tom(e.width),
                    height: r.tom(e.height),
                    show: !0,
                    measured: !1
                }, a.ok("Successfully uploaded floorplan."), t.uploading = !1
            }).then(null, function() {
                a.error("We have a problem uploading the floorplan."), t.uploading = !1
            }))
        }, t.editRoom = function(a) {
            t.room = n.pick(a, "_id", "id", "name", "area", "office", "floor", "slug"), t.originalRoom = a, e("#add-room-modal").modal("show")
        }, t.previewUri = function(e) {
            var t, a, o = "walls=true&legend=false&zones=true&furniture=false&watermark=false&members=false&text=false&height=100";
            return a = o.replace(/&/g, "_"), t = n.where(e.exported, {
                id: a
            }), t && t.created >= e.modifiedAt ? t.uri : u.org ? i("/i/organizations/{0}/{1}/{2}/export?{3}", u.org.slug, u.officesModel.findById(e.office).slug, e.slug, o) : void 0
        }, t.cloneRoom = function(e) {
            u.roomsModel.clone(e, {
                name: "Copy of " + e.name
            }).messages({
                ok: "Successfully cloned floorplan.",
                error: "Unable to clone floorplan."
            })
        }, t.renameRoom = function(a) {
            t.room = n.pick(a, "_id", "name"), t.originalRoom = a, e("#rename-room-modal").modal("show")
        }, t.newRoom = function(n) {
            t.room = {
                organization: u.org._id
            }, !n && t.offices && (n = t.offices[0]), n && (t.room.office = n._id), e("#add-room-modal").modal("show")
        }, t.canSaveRoom = function() {
            return t.room && t.room.name && (!t.org || t.room.office)
        }
    }]), t.controller("AssetsController", ["$scope", "data", function(e, n) {
        n.get("furniture").then(function(n) {
            e.data = n
        }, function() {
            a.error("Unable to load furniture"), e.data = {}
        })
    }]), t.controller("SpaceAnalyticsController", ["$scope", "labelsService", "data", "chartsService", function(e, t, i, s) {
        e.getColor = t.getColor, i.get("zones", "offices").then(o.spread(function(a, o) {
            function i(e) {
                return {
                    name: e.type,
                    area: e.area,
                    color: t.getColor(e.type)
                }
            }

            function r(e) {
                return n.map(e, i)
            }
            e.offices = o, e.zoneSummaryByOffice = n.map(o, function(e) {
                return {
                    name: e.name,
                    zoneTypes: r(a.zonesByOffice[e.name])
                }
            }), e.organizationZoneSummary = r(a.allZones), e.zonesChartOptions = s.zones
        }), function() {
            a.error("Unable to load analytics data"), e.data = {}
        })
    }])
}), define("point", ["underscore"], function(e) {
    function n(n, t) {
        e.isUndefined(n) || e.isUndefined(n.x) ? (this.x = n || 0, this.y = t || 0) : (this.x = n.x, this.y = n.y)
    }

    function t(e) {
        var n;
        return e == o ? 0 : (n = Math.atan2(-e.y, e.x), n + Math.PI / 2)
    }

    function a(e) {
        return 180 * e / Math.PI
    }
    var o = new n(0, 0);
    return n.prototype.offset = function(t, a) {
        return e.isUndefined(t.x) ? new n(this.x + t, this.y + a) : new n(this.x + t.x, this.y + t.y)
    }, n.prototype.distance = function(e) {
        var n = this.x - e.x,
            t = this.y - e.y;
        return Math.sqrt(n * n + t * t)
    }, n.prototype.minus = function(e) {
        return new n(this.x - e.x, this.y - e.y)
    }, n.prototype.angle = function(e) {
        var n;
        return n = e ? this.minus(e) : this, 180 - a(t(n))
    }, n.prototype.length = function() {
        return this.distance(o)
    }, n.prototype.scale = function(e) {
        return new n(this.x * e, this.y * e)
    }, n.prototype.normalize = function(e) {
        return this.scale(1 / this.length())
    }, n.prototype.mirror = function() {
        return this.scale(-1)
    }, n.collinearVect = function(e, n) {
        return e.minus(n).getNormalized()
    }, n.middlePoint = function(e, t) {
        return new n((e.x + t.x) / 2, (e.y + t.y) / 2)
    }, n.prototype.getDiff = function(e) {
        return e.minus(this)
    }, n.prototype.getOffset = n.prototype.offset, n.prototype.getScale = n.prototype.scale, n.prototype.getMirror = n.prototype.mirror, n.prototype.getNormalized = n.prototype.normalize, n.getCollinearVect = n.collinearVect, n
}), define("rect", ["underscore", "point", "utils2d"], function(e, n, t) {
    function a(n, t, a, o) {
        e.isNumber(n) ? (this.x = n, this.y = t, this.width = a, this.height = o) : n && !e.isUndefined(n.x) ? (this.x = n.x, this.y = n.y, this.width = n.width, this.height = n.height) : (this.x = null, this.y = null, this.width = null, this.height = null), this.cx = this.x + this.width / 2, this.cy = this.y + this.height / 2
    }

    function o(e, n, t, a) {
        return e >= t && a >= e || t > e && n > t
    }
    return a.fromShape = function(e) {
        return new a(e.cx - e.width / 2, e.cy - e.height / 2, e.width, e.height)
    }, a.empty = new a(null, null, null, null), a.prototype.isEmpty = function() {
        return !(e.isNumber(this.x) && e.isNumber(this.y) && e.isNumber(this.width) && e.isNumber(this.height))
    }, a.prototype.intersectsWith = function(e) {
        return o(this.x, this.x + this.width, e.x, e.x + e.width) && o(this.y, this.y + this.height, e.y, e.y + e.height)
    }, a.prototype.center = function() {
        return new n(this.x + this.width / 2, this.y + this.height / 2)
    }, a.prototype.tl = function() {
        return new n(this)
    }, a.prototype.br = function() {
        return new n(this.x + this.width, this.y + this.height)
    }, a.prototype.tr = function() {
        return new n(this.x + this.width, this.y)
    }, a.prototype.bl = function() {
        return new n(this.x, this.y + this.height)
    }, a.prototype.inflate = function(e, n) {
        return this.x -= e, this.y -= n, this.width += 2 * e, this.height += 2 * n, this
    }, a.prototype._rotatedPoints = function(n, a) {
        var o = this,
            i = [o.br(), o.tl(), o.tr(), o.bl()];
        return e.map(i, function(e) {
            return t.rotate(e, n, a)
        })
    }, a.prototype.containsPoint = function(e) {
        return e.x >= this.x && e.x <= this.x + this.width && e.y >= this.y && e.y <= this.y + this.height
    }, a.prototype.getOffset = function(e) {
        return new a(this.x + e.x, this.y + e.y, this.width, this.height)
    }, a.union = function(n) {
        var t, o, i, s, r;
        return t = e.filter(n, function(e) {
            return !e.isEmpty()
        }), 0 === t.length ? a.empty : (o = t[0].x, i = t[0].y, s = t[0].width, r = t[0].height, e.each(n, function(e) {
            var n = Math.min(o, e.x),
                t = Math.min(i, e.y);
            s += o - n, r += i - t, o = n, i = t, s = Math.max(o + s, e.x + e.width) - o, r = Math.max(i + r, e.y + e.height) - i
        }), new a(o, i, s, r))
    }, a.prototype.union = function(e) {
        return a.union([this, e])
    }, a
}), define("numbers", ["underscore"], function(e) {
    function n(e, n) {
        return Math.abs(e - n) < t
    }
    var t = 1e-5;
    return {
        closeTo: n
    }
}), define("line", ["underscore", "point", "numbers"], function(e, n, t) {
    function a(n, t, a) {
        e.isUndefined(n.x) || e.isUndefined(t.x) ? (this.a = n, this.b = t, this.c = a) : (this.a = t.y - n.y, this.b = n.x - t.x, this.c = n.x * (n.y - t.y) - (n.x - t.x) * n.y)
    }
    return a.prototype.isPointFromLine = function(e) {
        return t.closeTo(this.a * e.x + this.b * e.y + this.c, 0)
    }, a.prototype.getNormalized = function() {
        return t.closeTo(this.a, 0) ? new a(0, 1, this.c / this.b) : new a(1, this.b / this.a, this.c / this.a)
    }, a.prototype.getNormal = function() {
        var e = Math.sqrt(this.a * this.a + this.b * this.b);
        return new n(-this.a / e, -this.b / e)
    }, a.prototype.getOffset = function(e) {
        return new a(this.a, this.b, this.c - e.x * this.a - e.y * this.b)
    }, a.prototype.orientedDistance = function(e) {
        return -(this.a * e.x + this.b * e.y + this.c) / Math.sqrt(this.a * this.a + this.b * this.b)
    }, a.prototype.distance = function(e) {
        return Math.abs(this.orientedDistance(e))
    }, a.perpendicularThrough = function(e, n, t) {
        var o, i, s;
        return o = n.y - e.y, i = e.x - n.x, s = e.x * (e.y - n.y) - (e.x - n.x) * e.y, new a(i, -o, o * t.y - i * t.x)
    }, a.prototype.perpendicularThrough = function(e) {
        return new a(this.b, -this.a, this.a * e.y - this.b * e.x)
    }, a.prototype.parallelThrough = function(e) {
        return new a(this.a, this.b, -this.a * e.x - this.b * e.y)
    }, a.prototype.projection = function(e) {
        return this.perpendicularThrough(e).intersection(this)
    }, a.prototype.intersection = function(e) {
        var a, o, i, s, r;
        return s = this.getNormalized(), r = e.getNormalized(), s.b == r.b || t.closeTo(s.a, 0) && t.closeTo(r.a, 0) ? void 0 : (i = t.closeTo(s.b, 0) ? r : s, a = (s.b * r.c - s.c * r.b) / (s.a * r.b - s.b * r.a), o = -(i.a * a + i.c) / i.b, new n(a, o))
    }, a
}), define("utils2d", ["underscore", "point", "rect", "line", "numbers"], function(e, n, t, a, o) {
    function i(e) {
        return e.getNormalized()
    }

    function s(e, n) {
        return e.getOffset(n)
    }

    function r(e, t, i) {
        var s, r, l, c;
        if (o.closeTo(t.x, i.x)) return new n(t.x, e.y);
        if (l = (i.y - t.y) / (i.x - t.x), s = t.distance(i), r = new a(t, i), c = r.orientedDistance(e), 1 >= l) {
            var d = e.x + c * (i.y - t.y) / s;
            return new n(d, d * l + t.y - t.x * l)
        }
        var m = e.y + c * (t.x - i.x) / s;
        return new n((m - t.y) / l + t.x, m)
    }

    function l(e, n) {
        return n.angle(e)
    }

    function c(e, n) {
        var t = d(n, f(e), e.rotate);
        return t.x >= e.cx - e.width / 2 && t.x <= e.cx + e.width / 2 && t.y >= e.cy - e.height / 2 && t.y <= e.cy + e.height / 2
    }

    function d(e, t, a) {
        var o = a * M,
            i = Math.cos(o),
            s = Math.sin(o),
            r = t.x,
            l = t.y,
            c = e.x,
            d = e.y;
        return new n(r + (c - r) * i + (d - l) * s, l + (d - l) * i - (c - r) * s)
    }

    function m(e) {
        if (e.length < 3) return 0;
        for (var n, t = 0, a = 0; a < e.length; a++) {
            var o = e[a];
            n = a < e.length - 1 ? e[a + 1] : e[0], t += (o.x + n.x) * (o.y - n.y)
        }
        return t / 2
    }

    function u(e) {
        return Math.abs(m(e))
    }

    function p(n) {
        var a = e.map(n, function(e) {
                return e.x
            }),
            o = e.map(n, function(e) {
                return e.y
            }),
            i = e.min(a),
            s = e.min(o);
        return new t(i, s, e.max(a) - i, e.max(o) - s)
    }

    function f(e) {
        return new n(e.cx, e.cy)
    }

    function g(e) {
        return w(e).center()
    }

    function h(t) {
        var a = f(t),
            o = -t.rotate || 0,
            i = [new n(a.x - t.width / 2, a.y - t.height / 2), new n(a.x + t.width / 2, a.y - t.height / 2), new n(a.x + t.width / 2, a.y + t.height / 2), new n(a.x - t.width / 2, a.y + t.height / 2)];
        return e.map(i, function(e) {
            return d(e, a, o)
        })
    }

    function v(e, n) {
        var t, a, o, i;
        for (a = e.length, o = 0, i = a - 1; a > o; i = o, o++)(e[o].y <= n.y && n.y < e[i].y || e[i].y <= n.y && n.y < e[o].y) && n.x < (e[i].x - e[o].x) * (n.y - e[o].y) / (e[i].y - e[o].y) + e[o].x && (t = !t);
        return t
    }

    function b(n) {
        var t = e.chain(n).map(function(e) {
            return h(e)
        }).flatten().value();
        return t
    }

    function y(e) {
        var n = h(e);
        return p(n)
    }

    function k(e) {
        var n = e.rotate,
            t = e.width,
            a = e.height,
            o = a,
            i = t,
            s = n;
        return n = (360 * Math.abs(Math.floor(n / 360)) + n) % 360, n > 45 && 135 > n ? (o = t, i = a, s = n - 90) : n >= 135 && 225 > n ? s = n - 180 : n >= 225 && 315 > n && (o = t, i = a, s = n - 270), {
            cx: e.cx,
            cy: e.cy,
            width: i,
            height: o,
            rotate: s
        }
    }

    function w(a, o) {
        var i, s, r, l, c, m;
        return i = b(a), o ? (s = a[0].rotate, r = new n(0, 0), l = e.map(i, function(e) {
            return d(e, r, s)
        }), c = p(l), m = d(c.center(), r, -s), new t(m.x - c.width / 2, m.y - c.height / 2, c.width, c.height)) : p(i)
    }
    var M = Math.PI / 180,
        S = Math.sign || function(e) {
            return (e = parseFloat(e)) ? e > 0 ? 1 : -1 : e
        };
    return {
        orientedArea: m,
        getIntersectionPoint: r,
        getShapeCenter: f,
        getAngle: l,
        rotate: d,
        area: u,
        isPointInsideShape: c,
        boundingBox: p,
        ptom: function(e, t) {
            return new n(e.tom(t.x), e.tom(t.y))
        },
        ptopx: function(e, t) {
            return new n(e.topx(t.x), e.topx(t.y))
        },
        Point: n,
        Rect: t,
        Line: a,
        normalizeLine: i,
        getColinear: n.getCollinearVect,
        offsetLine: s,
        getLinesIntersection: function(e, n) {
            return e.intersection(n)
        },
        shapePoints: h,
        shapesPoints: b,
        shapeBoundingBox: y,
        shapeInfoBox: k,
        shapesBoundingBox: w,
        shapesCenter: g,
        isPointInsidePoly: v,
        sign: S
    }
}), define("metrics", ["app", "underscore", "utils2d"], function(e, n, t) {
    function a(e) {
        v = e, b = D[e]
    }

    function o(e) {
        return e * y
    }

    function i(e) {
        return Math.round(e * k)
    }

    function s(e) {
        var n = p(b, "largeRound", "floor");
        return u(e, n, n.fractionSize, 2)
    }

    function r(e, n, t) {
        return e * t.ratio / n.ratio
    }

    function l() {
        return h ? new t.Rect(o(h.x), o(h.y), o(h.width), o(h.height)) : new t.Rect(0, 0, 0, 0)
    }

    function c() {
        return h ? h : new t.Rect(0, 0, 0, 0)
    }

    function d(e, n) {
        var a, o, i, s;
        e = new t.Rect(e.x - M, e.y - M, e.width + 2 * M, e.height + 2 * M), h ? (a = Math.min(e.x, h.x), o = Math.min(e.y, h.y), i = Math.max(e.x + e.width, h.x + h.width) - a, s = Math.max(e.y + e.height, h.y + h.height) - o, (h.x !== a || h.y !== o || h.width !== i || h.height !== s) && (h = new t.Rect(a, o, i, s), n())) : (h = e, n())
    }

    function m() {
        h = void 0
    }

    function u(e, n, t, a) {
        return (e * Math.pow(n.ratio, a)).toFixed(t)
    }

    function p(e, n, t) {
        var a;
        return a = b.selectUnit ? e.selectUnit(t) : e, a[n || "medium"]
    }

    function f(e, n, t, a, o) {
        var i = p(b, n);
        return t = t || i.fractionSize, o = o || 1, u(e, i, t, o) + (a ? "" : " " + i.label)
    }
    var g, h, v, b, y, k, w = 15,
        M = 300,
        S = 100,
        x = "uk",
        D = {
            metrics: {
                small: {
                    label: "mm",
                    ratio: 1,
                    fractionSize: 0
                },
                medium: {
                    label: "cm",
                    ratio: .1,
                    fractionSize: 0
                },
                large: {
                    label: "m",
                    ratio: .001,
                    fractionSize: 2
                },
                largeRound: {
                    label: "m",
                    ratio: .001,
                    fractionSize: 0
                }
            },
            imperial: {
                small: {
                    label: "in",
                    ratio: .0393701,
                    fractionSize: 1
                },
                medium: {
                    label: "in",
                    ratio: .0393701,
                    fractionSize: 0
                },
                large: {
                    label: "ft",
                    ratio: .00328084,
                    fractionSize: 2
                },
                largeRound: {
                    label: "ft",
                    ratio: .00328084,
                    fractionSize: 0
                }
            },
            uk: {
                selectUnit: function(e) {
                    return "floor" === e ? D.imperial : D.metrics
                }
            }
        };
    D.measureScale = D.metrics.small, a("metrics"), e.filter("topx", function() {
        return o
    }), e.filter("tom", function() {
        return i
    }), e.filter("areaToValue", function() {
        return s
    }), e.directive("unitLabel", [function() {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                value: "=",
                showUnits: "=",
                power: "=",
                scale: "@",
                target: "@",
                fractionSize: "="
            },
            templateUrl: "/app/designer/unitLabel.html",
            link: function(e) {
                function n() {
                    var n = p(b, e.scale, e.target),
                        t = e.power || 1;
                    e.currentScale = n, e.formattedValue = u(e.value, n, n.fractionSize, t)
                }
                e.$on("unit-changed", n), e.$watch("value", n), e.$watch("scale", n), e.$watch("fractionSize", n)
            }
        }
    }]), e.directive("unitInput", [function() {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                value: "=",
                showUnits: "=",
                scale: "@",
                target: "@",
                inputId: "@",
                blur: "&",
                focus: "&",
                change: "&",
                power: "="
            },
            templateUrl: "/app/designer/unitInput.html",
            link: function(e) {
                function n() {
                    var n, t, a;
                    e.value && (n = Math.pow(10, e.currentScale.fractionSize), t = e.power || 1, a = Math.pow(e.currentScale.ratio, t), e.formattedValue = Math.round(e.value * a * n) / n)
                }

                function t() {
                    var n;
                    e.formattedValue && (n = e.power || 1, e.value = e.formattedValue / Math.pow(e.currentScale.ratio, n), e.change && e.change({
                        value: e.value
                    }))
                }

                function a() {
                    e.currentScale = p(b, e.scale, e.target), n()
                }
                e.$on("unit-changed", a), e.$watch("scale", a), e.$watch("value", n), e.$watch("formattedValue", t)
            }
        }
    }]), e.factory("$metrics", ["$rootScope", "$window", function(e, n) {
        function s() {
            e.$broadcast("page-changed")
        }
        var u;
        return a(n.user ? n.user.screenOptions.unitType || "uk" : x), u = {
            setUnitType: function(n) {
                a(n), e.$broadcast("unit-changed")
            },
            getScale: function(e, n) {
                return p(b, e, n)
            },
            setZoom: function(n) {
                S = n, y = S / (100 * w), k = 1 / y, e.$broadcast("zoom-changed", {
                    zoom: n
                })
            },
            getZoom: function() {
                return S
            },
            baseMilimetersPerPixel: w,
            unitTypes: D,
            convertScale: r,
            formatLabel: f,
            topx: o,
            tom: i,
            getPageBox: l,
            getPageBoxM: c,
            updatePageBox: function(e) {
                d(e, s)
            },
            getPageRatio: function() {
                return h && 0 !== h.height ? h.width / h.height : 1
            },
            setPageOffset: function(e) {
                g = e, s()
            },
            getPageOffset: function() {
                return g || new t.Point(0, 0)
            },
            resetPage: m
        }, u.setZoom(100), u
    }])
}), define("renderService", ["jquery", "app", "underscore", "utils2d"], function(e, n, t, a) {
    var o = new a.Point;
    n.factory("$render", ["$metrics", "shapeService", function(e) {
        function n(e, n, t) {
            var a = "";
            n % 360 !== 0 && (a += "rotate(" + n + "deg)"), !t || 1 === t.x && 1 === t.y || (a += "scale(" + t.x + "," + t.y + ")"), e.transform = e["-moz-transform"] = e["-webkit-transform"] = a
        }

        function i(n) {
            var t, i, s, r, l = e.topx(n.width),
                c = e.topx(n.height),
                d = e.topx(n.cx),
                m = e.topx(n.cy),
                u = 0,
                p = n.rotate || 0;
            return s = d - l / 2, r = m - c / 2, n.snapOffset && n.snapAt && (u = e.topx(n.snapOffset), "top" == n.snapAt ? u -= c / 2 : "bottom" == n.snapAt && (u = c / 2 - u), i = a.rotate(new a.Point(0, u), o, 360 - p), n.scale && (i = i.scale(n.scale.y)), s += i.x, r += i.y), t = {
                left: s,
                top: r,
                width: l,
                height: c
            }
        }

        function s(e, t) {
            var a = t.rotate || 0,
                o = i(t);
            n(o, a, t.scale), e.css(o)
        }

        function r(e, n) {
            var t = i(n);
            e.css(t)
        }

        function l(e, n, a) {
            if (e && e.length > 0) {
                var o = a ? t.extend({}, a, n) : n;
                s(e, o)
            }
        }
        return {
            render: l,
            renderZoom: r
        }
    }])
}), define("snapService", ["underscore", "app", "utils2d", "utils"], function(e, n, t, a) {
    function o(e, n, o) {
        var i, s, r, l, c, d;
        return c = n.start.point, d = n.end.point, i = n.normal.getScale(o), s = t.offsetLine(n.line, i), r = s.orientedDistance(e), l = t.Line.perpendicularThrough(c, d, e), a.sign(l.orientedDistance(c)) !== a.sign(l.orientedDistance(d)) && r > 0 ? r : void 0
    }

    function i(e, n) {
        var t = n % g;
        return h > t ? n - t : h > g - t ? n + g - t : Math.round(n)
    }

    function s(n) {
        return e.chain(u).difference(n).filter(function(e) {
            return !e.isBound
        }).map(t.shapePoints).flatten().value()
    }

    function r(n, a) {
        var i, s = new f,
            r = p.snapDistance,
            l = p.halfWall;
        return i = t.boundingBox(a), i.inflate(1e3, 1e3), n = e.filter(n, i.containsPoint, i), e.each(a, function(t) {
            e.each(n, function(e) {
                var n;
                n = t.distance(e), r > n && (r = n, s = t.getDiff(e))
            }), e.each(m.walls, function(e) {
                var n;
                n = o(t, e, l), n && r > n && (r = n, s = e.normal.getScale(-n)), n = o(t, e, -l), n && r > n && (r = n, s = e.normal.getScale(-n))
            })
        }), s
    }

    function l(n, t) {
        var a, o, i;
        return 0 === t.length ? n : (a = e.min(t, function(e) {
            return e.distance(n)
        }), o = a.projection(n), o.distance(n) <= p.snapStepInmm ? (i = e.chain(t).map(function(e) {
            return a.intersection(e)
        }).filter(function(e) {
            return e && n.distance(e) <= p.snapStepInmm
        }).value(), i.length > 0 ? e.min(i, function(e) {
            return n.distance(e)
        }) : o) : n)
    }

    function c(n) {
        function a(e) {
            o.push(new t.Line(1, -1, e.y - e.x)), o.push(new t.Line(1, 1, -e.x - e.y))
        }
        var o = [];
        return e.each(m.edges, function(e, a) {
            var i = e.point;
            n != a && (o.push(new t.Line(1, 0, -i.x)), o.push(new t.Line(0, 1, -i.y)))
        }), e.each(m.neighbourIndexes(m.edges[n]), function(e) {
            var n = m.edges[e];
            a(n.point)
        }), o
    }

    function d(e, n) {
        var t, a, o;
        return t = m.getClosestWallAndProjection(n), a = t.projection, o = t.wall.normal.angle(), {
            cx: a.x,
            cy: a.y,
            width: e.width,
            height: e.height,
            rotate: o
        }
    }
    var m, u, p = {
            snapStepInPx: 5,
            snapDistance: 60,
            snapStepInmm: void 0,
            halfWall: 100
        },
        f = t.Point,
        g = 90,
        h = 5;
    n.factory("$snap", ["$metrics", "shapeService", "$render", "$rootScope", function(n, a, o, f) {
        function g() {
            p.snapStepInmm = n.tom(p.snapStepInPx)
        }

        function h() {
            var n = e.chain(u).filter(function(e) {
                return e.isBound
            }).map(function(e) {
                return {
                    shape: e,
                    newData: d(e, t.getShapeCenter(e), m)
                }
            }).value();
            e.each(n, function(n) {
                e.extend(n.shape, n.newData)
            }), e.each(n, function(e) {
                o.render(a.getElem(e.shape), e.newData, e.shape)
            })
        }
        return f.$on("zoom-changed", g), f.$on("room-changed", h), g(), {
            updateRoomModel: function(e) {
                m = e
            },
            updateShapes: function(e) {
                u = e
            },
            wallsUpdated: h,
            snapRoomVertex: function(e, n) {
                return l(n, c(e))
            },
            snapPoint: l,
            snapShapes: r,
            prepareSnapShapes: s,
            snapBoundShape: d,
            snapAngle: i
        }
    }])
}), define("selectionService", ["jquery", "app", "underscore", "utils"], function(e, n, t) {
    n.factory("selectionService", ["$rootScope", function(e) {
        var n, a, o, i = [];
        return {
            resetSelection: function() {
                this.selectShapes(), this.selectEdge(), this.selectWall(), this.selectZone()
            },
            selectEdge: function(t) {
                t !== n && (t ? (n = t, this.selectShapes(), this.selectWall(), this.selectZone()) : n = void 0, e.$broadcast("select-edge", n))
            },
            selectWall: function(n) {
                n !== a && (n ? (a = n, this.selectShapes(), this.selectEdge(), this.selectZone()) : a = void 0, e.$broadcast("select-wall", a))
            },
            selectShapes: function(n, a) {
                var o = t.isUndefined(n) ? [] : t.isArray(n) ? n : [n];
                t.some(o) ? (a || (i = []), i = i.concat(o), this.selectEdge(), this.selectWall(), this.selectZone()) : i = [], e.$broadcast("select-shapes", i)
            },
            selectZone: function(n) {
                n !== o && (n ? (o = n, this.selectShapes(), this.selectEdge(), this.selectWall()) : o = n, e.$broadcast("select-zone", o))
            },
            selectedShapes: function() {
                return i
            },
            selectedEdge: function() {
                return n
            },
            selectedWall: function() {
                return a
            },
            selectedZone: function() {
                return o
            }
        }
    }])
}), define("rulersService", ["underscore", "app", "utils2d", "utils"], function(e, n, t, a) {
    function o() {
        return {
            position: new t.Point(0, 0),
            length: 0,
            vertical: !1,
            visible: !1
        }
    }

    function i(e, n) {
        return n || (n = o(), e.push(n)), n
    }

    function s(e, n) {
        n.rightRuler = i(e, n.rightRuler), n.bottomRuler = i(e, n.bottomRuler), n.leftRuler = i(e, n.leftRuler), n.topRuler = i(e, n.topRuler), n.bottomRuler.vertical = !0, n.topRuler.vertical = !0, n.rightRuler.visible = !0, n.bottomRuler.visible = !0, n.leftRuler.visible = !0, n.topRuler.visible = !0
    }

    function r(e) {
        return e.x
    }

    function l(e) {
        return e.y
    }

    function c(n) {
        return e.map(n, function(e, t) {
            return {
                s: e,
                e: n[(t + 1) % n.length]
            }
        })
    }

    function d(n, o, i) {
        var s, r, l;
        return s = new t.Line(n, n.getOffset(o)), r = c(i), l = e.reduce(r, function(e, i) {
            var r, l = new t.Line(i.s, i.e),
                c = t.getLinesIntersection(s, l);
            return c && (r = c.getOffset(o.getScale(-p / 2)), 0 === o.y ? a.sign(r.x - n.x) === o.x && a.between(r.y, i.s.y, i.e.y) && e.push(r) : a.sign(r.y - n.y) === o.y && a.between(r.x, i.s.x, i.e.x) && e.push(r)), e
        }, []), l.length > 0 ? e.min(l, function(e) {
            var a = new t.Point(e.x - n.x, e.y - n.y);
            return Math.sqrt(a.x * a.x + a.y * a.y)
        }) : void 0
    }

    function m(n, a, o) {
        var i = t.shapePoints(a),
            s = e.min(i, r),
            c = e.min(i, l),
            m = e.max(i, r),
            p = e.max(i, l),
            f = d(s, new t.Point(-1, 0), o),
            g = d(c, new t.Point(0, -1), o),
            h = d(m, new t.Point(1, 0), o),
            v = d(p, new t.Point(0, 1), o);
        u(n.leftRuler, s, f), u(n.topRuler, c, g), u(n.rightRuler, h, m), u(n.bottomRuler, v, p)
    }

    function u(e, n, t) {
        n && t ? (e.length = n.distance(t), e.position = t, e.visible = !0) : e.visible = !1
    }
    var p = 200;
    n.factory("rulersService", ["$metrics", "shapeService", "$render", "$rootScope", function(e, n, t, a) {
        return {
            showRulers: function(e) {
                s(e.rulers, e)
            },
            updateRulers: function(e, n, t) {
                m(e, t, n.getFloorPolygon())
            },
            hideRulers: function(e) {
                e.rightRuler && (e.rightRuler.visible = !1, e.bottomRuler.visible = !1, e.leftRuler.visible = !1, e.topRuler.visible = !1)
            }
        }
    }])
}), define("shape", ["angular", "app", "jquery", "underscore", "utils", "moment"], function(e, n, t, a, o, i) {
    n.factory("compileService", [function() {
        function e(e) {
            return a.partial(n, a, e)
        }

        function n(e, n) {
            n.attr("title", e.info && e.info.title)
        }

        function i(e) {
            var n;
            return n = e.find("#text-host"),
                function(e) {
                    n.html(e.label)
                }
        }

        function s(e, n) {
            var t = e._statusFilterFn || a.constant(!0);
            return t(n) ? n : "fade-out"
        }

        function r(e) {
            var t, a;
            return t = e.find("#desk-root"), a = t.attr("class"),
                function(i) {
                    var r, l = o.Constants.DESK_NA_TYPE,
                        c = a;
                    n(i, e), i.info && (l = i.info.status), r = s(d, l), c = a ? a + " " + r : r, t.attr("class", c)
                }
        }
        var l, c = {};
        l = {
            "#text-template": i,
            "#small-desk-template": r
        };
        var d = {
            loadShapeTemplate: function(e) {
                var n;
                return n = c[e], n || (n = t(e), n.length > 0 && (c[e] = n)), n ? n.html() : null
            },
            compile: function(n, t) {
                return (l[t] || e)(n)
            }
        };
        return d
    }]), n.directive("shapes", ["$rootScope", "$render", "shapeService", "selectionService", "toolService", "compileService", function(e, n, o, i, s, r) {
        return {
            restrict: "E",
            scope: {
                shapes: "="
            },
            link: function(e, i) {
                function l(e) {
                    function a() {
                        l(e)
                    }
                    var i = r.loadShapeTemplate(e.template),
                        s = t('<div class="shape"></div>').html(i);
                    o.isPrivate(e) || s.addClass("locked");
                    var l = r.compile(s, e.template);
                    return o.register(e, s, a), a(), n.render(s, e), s
                }

                function c(n) {
                    a.each(n, function(n) {
                        var a = l(n);
                        i.append(a), a.on("mousedown", function(a) {
                            t(":focus").blur(), s.onShapeMouseDown(a, e, n, m)
                        })
                    })
                }

                function d(e) {
                    a.each(e, function(e) {
                        var n = o.getElem(e);
                        n && (n.remove(), n.off("mousedown"))
                    })
                }
                var m = e.shapes;
                e.$on("$destroy", function() {
                    i.children().off("mousedown"), i.empty()
                }), e.$on("zoom-changed", function() {
                    a.each(e.shapes, function(e) {
                        n.renderZoom(t(o.getElem(e)), e)
                    })
                }), e.$watchCollection("shapes", function(e, n) {
                    m = e;
                    var t = a.difference(e, n),
                        o = a.difference(n, e);
                    d(o), c(t)
                }), e.$on("shape-templates-loaded", function() {
                    i.children().off("mousedown"), i.empty(), c(e.shapes)
                }), i.empty(), c(e.shapes)
            }
        }
    }]), n.directive("shapePreview", ["compileService", function(e) {
        return {
            restrict: "E",
            scope: {
                data: "=",
                width: "@",
                height: "@"
            },
            link: function(n, t) {
                var a, o, i, s = n.data,
                    r = s.template;
                t.html(e.loadShapeTemplate(r)), e.compile(t, r)(s), t.attr("id", s.id), i = s.width / s.height, a = n.width ? parseInt(n.width) : 0, o = n.height ? parseInt(n.height) : 0, a && (!o || o >= a / i) ? o = a / i : a = o * i, t.css({
                    width: a,
                    height: o
                }), n.$on("shape-templates-loaded", function() {
                    t.html(e.loadShapeTemplate(r)), e.compile(t, r)(s)
                })
            }
        }
    }])
}), define("canvasDirectives", ["app", "jquery", "underscore", "utils"], function(e, n, t, a) {
    function o(e) {
        e = e || {}, this._settings = {
            x: e.x || 0,
            y: e.y || 0,
            width: e.width || 0,
            height: e.height || 0
        }, this._layers = []
    }
    var i = "<div class='drawing-canvas'><canvas class='page-canvas' id='canvas'></canvas><ng-transclude></ng-transclude></div>";
    o.prototype.init = function(e) {
        this._canvasElement = e
    }, o.prototype.updateSettings = function(e) {
        t.extend(this._settings, e)
    }, o.prototype.setCanvasSize = function(e, n) {
        this._settings.canvasWidth = e, this._settings.canvasHeight = n
    }, o.prototype.addLayer = function(e) {
        this._layers.push(e), this.draw()
    }, o.prototype.removeLayer = function(e) {
        a.remove(this._layers, e), this.draw()
    }, o.prototype.draw = function() {
        var e, n, a;
        this._canvasElement && (e = this, n = this._canvasElement[0], a = n.getContext("2d"), a.setLineDash || (a.setLineDash = function() {}), a.clearRect(0, 0, this._settings.canvasWidth, this._settings.canvasHeight), t.each(this._layers, function(n) {
            n.draw(a, e._settings)
        }))
    }, e.directive("drawingCanvas", ["$window", function(e) {
        return {
            replace: !0,
            restrict: "E",
            transclude: !0,
            template: i,
            scope: {},
            controller: ["$scope", function(e) {
                function n() {
                    !t.isInitialized && e.$elem && t.init(e.$elem)
                }
                var t = new o;
                this.scene = t, this.addLayer = function(e) {
                    this.scene.addLayer(e)
                }, this.removeLayer = function(e) {
                    this.scene.removeLayer(e)
                }, this.requestRedraw = function(e) {
                    n(), t.draw(e)
                }, this.setStageRect = function(e) {
                    n(), t.updateSettings(e), this.requestRedraw()
                }, e.drawingCanvasCtrl = this
            }],
            link: function(t, a) {
                function o() {
                    var e, n, o = t.$elem;
                    o && (e = a.width(), n = a.height(), o[0].width = e, o[0].height = n, t.drawingCanvasCtrl.requestRedraw(), t.drawingCanvasCtrl.scene.setCanvasSize(e, n))
                }
                var i = n(e);
                t.$elem = a.find("#canvas"), o(), t.drawingCanvasCtrl.requestRedraw(), i.on("resize", o), t.$on("canvas-resize", o), t.$on("$destroy", function() {
                    i.off("resize")
                })
            }
        }
    }])
}), define("commands", ["underscore", "app", "alert", "utils2d"], function(e, n, t, a) {
    function o(n, t) {
        this._commands = n, this.title = t || "Room changed", this.affectsRoom = e.some(n, function(e) {
            return e.affectsRoom
        })
    }

    function i(n, t, o, i) {
        this._roomModel = n, this._edgeIndex = e.indexOf(n.edges, t), this._newPos = new a.Point(o), this._oldPos = new a.Point(i), this.title = "Edge moved.", this.affectsRoom = !0
    }

    function s(n, t, a) {
        e.each(n.walls, function(n) {
            n.wall.s === t.wall.s && n.wall.e === t.wall.e && (e.extend(n.wall, a), n.updateProps())
        })
    }

    function r(e, n, t, a) {
        this._roomModel = e, this._wall = n, this._oldGuideOffset = a, this._newGuideOffset = t, this.title = "Wall guide changed.", this.affectsRoom = !0
    }

    function l(e, n, t, a) {
        this._roomModel = e, this._wall = n, this._wallState = t, this._wallOldState = a, this.title = "Wall property changed.", this.affectsRoom = !0
    }

    function c(n, t, a, o, i, s) {
        this._shape = n, this._oldValue = e.pick(a, i), this._newValue = e.pick(t, i), this._applyChange = o, this.title = s || "Change shape.", this.affectsRoom = !1
    }

    function d(e, n, t) {
        this._roomModel = e, this._edgePoint = n, this._index = t, this.title = "Edge added.", this.affectsRoom = !0
    }

    function m(e, n) {
        this._roomModel = e, this._edgePoint = e.edges[n].point, this._index = n, this.title = "Edge deleted.", this.affectsRoom = !0
    }

    function u(e, n, t) {
        this._area = e, this._edge = n, this._edgeIndex = t, this.title = "Edge removed from area.", this.affectsRoom = !0
    }

    function p(e, n, t) {
        this._area = e, this._edge = n, this._edgeIndex = t, this.title = "Edge removed from area.", this.affectsRoom = !0
    }

    function f(e, n, t) {
        this._roomModel = e, this._wallStart = n, this._wallEnd = t, this.title = "Wall added.", this.affectsRoom = !0
    }

    function g(e, n) {
        this._roomModel = e, this._wall = n, this.title = "Wall deleted.", this.affectsRoom = !0
    }

    function h(e, n) {
        this._zoneLayerModel = e, this._zone = n, this.affectsRoom = !0
    }

    function v(e, n) {
        this._zoneLayerModel = e, this._zone = n, this.affectsRoom = !0
    }

    function b(n, t, a) {
        this._zone = n, this._newState = e.clone(t), this._oldState = e.clone(a), this.affectsRoom = !0
    }

    function y(n, t, a) {
        this._node = n, this._newPos = e.clone(t), this._oldPos = e.clone(a), this.affectsRoom = !0
    }
    return o.prototype.redo = function(n) {
        e.each(this._commands, function(e) {
            e.redo(n)
        })
    }, o.prototype.undo = function(n) {
        e.each(e.clone(this._commands).reverse(), function(e) {
            e.undo(n)
        })
    }, o.prototype.getSaveData = function(n) {
        var t = {
            room: !1,
            addedShapes: [],
            removedShapes: [],
            modifiedShapes: []
        };
        return e.each(this._commands, function(a) {
            var o = a.getSaveData(n);
            t.room = t.room || o.room, t.addedShapes = e.union(t.addedShapes, o.addedShapes || []), t.removedShapes = e.union(t.removedShapes, o.removedShapes || []), t.modifiedShapes = e.union(t.modifiedShapes, o.modifiedShapes || [])
        }), (e.some(t.addedShapes) && e.some(t.removedShapes) || e.some(t.addedShapes) && e.some(t.modifiedShapes) || e.some(t.modifiedShapes) && e.some(t.removedShapes)) && (t.room = !0), t
    }, i.prototype.getEdge = function() {
        return this._roomModel.edges[this._edgeIndex]
    }, i.prototype.redo = function() {
        this.getEdge().update(this._newPos)
    }, i.prototype.undo = function() {
        this.getEdge().update(this._oldPos)
    }, i.prototype.getSaveData = function() {
        return {
            room: !0
        }
    }, r.prototype.redo = function() {
        s(this._roomModel, this._wall, {
            guideOffset: this._newGuideOffset
        })
    }, r.prototype.undo = function() {
        s(this._roomModel, this._wall, {
            guideOffset: this._oldGuideOffset
        })
    }, r.prototype.getSaveData = function() {
        return {
            room: !0
        }
    }, l.prototype.redo = function() {
        s(this._roomModel, this._wall, this._wallState)
    }, l.prototype.undo = function() {
        s(this._roomModel, this._wall, this._wallOldState)
    }, l.prototype.getSaveData = function() {
        return {
            room: !0
        }
    }, c.prototype.redo = function() {
        e.extend(this._shape, this._newValue), this._applyChange(this._shape, this._newValue)
    }, c.prototype.undo = function() {
        e.extend(this._shape, this._oldValue), this._applyChange(this._shape, this._oldValue)
    }, c.prototype.getSaveData = function() {
        return {
            modifiedShapes: [this._shape]
        }
    }, d.prototype.redo = function(e) {
        var n;
        this._roomModel.insertEdge(this._edgePoint, this._index), n = this._roomModel.edges[this._index], e.notifyEdgeAdded(n)
    }, d.prototype.undo = function(e) {
        var n = this._roomModel.edges[this._index];
        this._roomModel.removeEdgeAt(this._index), e.notifyEdgeRemoved(n)
    }, d.prototype.getSaveData = function() {
        return {
            room: !0
        }
    }, m.prototype.redo = function(e) {
        var n = this._roomModel.edges[this._index];
        this._roomModel.removeEdgeAt(this._index), e.notifyEdgeRemoved(n)
    }, m.prototype.undo = function(e) {
        var n;
        this._roomModel.insertEdge(this._edgePoint, this._index), n = this._roomModel.edges[this._index], e.notifyEdgeAdded(n)
    }, m.prototype.getSaveData = function() {
        return {
            room: !0
        }
    }, u.prototype.redo = function() {
        this._area.edges.splice(this._edgeIndex, 1)
    }, u.prototype.undo = function() {
        this._area.edges.splice(this._edgeIndex, 0, this._edge)
    }, u.prototype.getSaveData = function() {
        return {
            room: !0
        }
    }, p.prototype.redo = function() {
        this._area.edges.splice(this._edgeIndex, 0, this._edge)
    }, p.prototype.undo = function() {
        this._area.edges.splice(this._edgeIndex, 1)
    }, p.prototype.getSaveData = function() {
        return {
            room: !0
        }
    }, f.prototype.redo = function(e) {
        var n;
        n = this._roomModel.addWall(this._wallStart, this._wallEnd), e.notifyWallAdded(n)
    }, f.prototype.undo = function(e) {
        var n;
        n = this._roomModel.removeWall(this._wallStart, this._wallEnd), e.notifyWallRemoved(n)
    }, f.prototype.getSaveData = function() {
        return {
            room: !0
        }
    }, g.prototype.redo = function(e) {
        this._removedWall = this._roomModel.removeWall(this._wall.s, this._wall.e), e.notifyWallRemoved(this._removedWall)
    }, g.prototype.undo = function(e) {
        var n;
        n = this._roomModel.addWall(this._wall), e.notifyWallAdded(n)
    }, g.prototype.getSaveData = function() {
        return {
            room: !0
        }
    }, h.prototype.redo = function(e) {
        this._zoneLayerModel.add(this._zone), e.notifyZoneAdded(this._zone)
    }, h.prototype.undo = function(e) {
        this._zoneLayerModel.remove(this._zone), e.notifyZoneRemoved(this._zone)
    }, h.prototype.getSaveData = function() {
        return {
            zones: !0
        }
    }, v.prototype.redo = function(e) {
        this._zoneLayerModel.remove(this._zone), e.notifyZoneRemoved(this._zone)
    }, v.prototype.undo = function(e) {
        this._zoneLayerModel.add(this._zone), e.notifyZoneAdded(this._zone)
    }, v.prototype.getSaveData = function() {
        return {
            zones: !0
        }
    }, b.prototype.redo = function() {
        e.extend(this._zone, this._newState)
    }, b.prototype.undo = function(n) {
        e.extend(this._zone, this._oldState)
    }, b.prototype.getSaveData = function() {
        return {
            zones: !0
        }
    }, y.prototype.redo = function() {
        this._node.update(this._newPos)
    }, y.prototype.undo = function(e) {
        this._node.update(this._oldPos)
    }, y.prototype.getSaveData = function() {
        return {
            zones: !0
        }
    }, {
        ChangeWallCommand: l,
        ChangeWallGuideCommand: r,
        MoveEdgeCommand: i,
        InsertEdgeCommand: d,
        RemoveEdgeCommand: m,
        AddEdgeToAreaCommand: p,
        RemoveEdgeFromAreaCommand: u,
        CompositeCommand: o,
        AddWallCommand: f,
        RemoveWallCommand: g,
        ChangeShapeCommand: c,
        UpdateZoneNodeCommand: y,
        AddZoneCommand: h,
        UpdateZoneCommand: b,
        RemoveZoneCommand: v
    }
}), define("dragHelper", ["underscore", "jquery", "utils2d"], function(e, n, t) {
    function a(e, n, t, a, s, r, l) {
        var c = e.pageX,
            d = e.pageY;
        r = r || 0, l = l || 0, o = {
            dragThreshold: s || i,
            startDrag: function(e, t) {
                this.payload = {
                    data: n(e - r, t - l),
                    currentResult: void 0,
                    getOffsetX: o.getOffsetX,
                    getOffsetY: o.getOffsetY
                }
            },
            moveDrag: function(e, n) {
                this.payload.currentResult = t(e - r, n - l, this.payload)
            },
            endDrag: function() {
                a(this.payload)
            },
            getOffsetX: function(e) {
                return e - c
            },
            getOffsetY: function(e) {
                return e - d
            }
        }, 0 === s && (o.isDragging = !0, o.startDrag(e.pageX, e.pageY))
    }
    var o, i = 4;
    return n("body").on("mousemove", function(e) {
        o && (o.isDragging ? (o.moveDrag(e.pageX, e.pageY), e.preventDefault()) : (Math.abs(o.getOffsetX(e.pageX)) >= o.dragThreshold || Math.abs(o.getOffsetY(e.pageY)) >= o.dragThreshold) && (o.isDragging = !0, o.startDrag(e.pageX, e.pageY), e.preventDefault()))
    }).on("mouseup", function(e) {
        o && o.isDragging && (o.endDrag(), e.preventDefault()), o = void 0
    }), {
        trackDragOffsetWithStart: function(n, o, i, s, r) {
            !e.isFunction(s) && e.isUndefined(r) && (r = s, s = void 0), a(n, o, function(e, n, a) {
                return i(new t.Point(a.getOffsetX(e), a.getOffsetY(n)), new t.Point(e, n)), !0
            }, function(e) {
                s && s(e)
            }, r)
        },
        trackDragOffset: function(e, n, t, a) {
            var o = function() {
                return null
            };
            this.trackDragOffsetWithStart(e, o, n, t, a)
        },
        startDrag: a
    }
}), define("roomDecorations", ["jquery", "app", "underscore", "utils2d", "utils", "angular", "commands", "dragHelper"], function(e, n, t, a, o, i, s, r) {
    function l(e) {
        var n = e.$metrics;
        return {
            require: "^drawingCanvas",
            restrict: "E",
            scope: e.scope,
            link: function(i, s, r, l) {
                var c = {
                    draw: function(t, o) {
                        var s = {
                            tom: n.tom,
                            topx: n.topx,
                            ptopx: function(e) {
                                return new a.Point(n.topx(e.x) - o.x, n.topx(e.y) - o.y)
                            },
                            dc: t
                        };
                        e.draw(i, s)
                    }
                };
                e.updateProperties = e.updateProperties || ["model"], o.ensureProperty(e, "updateEvents"), l.addLayer(c), t.each(e.updateProperties, function(e) {
                    i.$watch(e, function() {
                        l.requestRedraw()
                    })
                }), t.each(e.updateEvents, function(e) {
                    i.$on(e, function() {
                        l.requestRedraw()
                    })
                }), i.$on("$destroy", function() {
                    l.removeLayer(c)
                })
            }
        }
    }

    function c(e, n, t, a) {
        var o, i, s;
        o = e.ptopx(t), i = e.ptopx(n), s = e.topx(a), e.dc.arcTo(o.x, o.y, i.x, i.y, s)
    }

    function d(e, n, t, a) {
        e.lineWidth = t, e.strokeStyle = a && n.transparentStroke ? n.transparentStroke : n.stroke, e.lineCap = n.cap, e.lineJoin = n.join
    }

    function m(e, n, t, a) {
        this._$scope = e, this._renderService = n, this._selectionService = t, this._$metrics = a
    }

    function u(e, n, t) {
        var a = e.ptopx(n),
            o = e.ptopx(t);
        e.dc.moveTo(a.x, a.y), e.dc.lineTo(o.x, o.y)
    }

    function p(e, n, t, a) {
        var o = e.tom(S),
            i = a.getScale(-o / 2),
            s = i.getMirror();
        u(e, n.getOffset(i), n.getOffset(s)), u(e, t.getOffset(i), t.getOffset(s)), u(e, n, t)
    }

    function f(e, n) {
        var t, a, o, i, s, r;
        t = n.start.point, a = n.end.point, o = e.tom(M), i = n.normal.getScale(-w / 2 - o), s = t.getOffset(i).getOffset(n.collinear.getScale(-w / 2)), r = a.getOffset(i).getOffset(n.collinear.getScale(w / 2)), e.dc.beginPath(), e.dc.lineWidth = b.thickness, e.dc.strokeStyle = b.color, e.dc.setLineDash([]), p(e, s, r, n.normal), e.dc.stroke()
    }

    function g(e, n) {
        var t, a, o;
        t = e.ptopx(n.round.center), a = e.ptopx(n.round.guide), o = e.topx(b.centerRadius), e.dc.beginPath(), e.dc.setLineDash(b.dash), e.dc.lineWidth = b.thickness, e.dc.strokeStyle = b.color, e.dc.moveTo(a.x, a.y), e.dc.lineTo(t.x, t.y), e.dc.stroke(), e.dc.setLineDash([]), e.dc.beginPath(), e.dc.arc(t.x, t.y, o, 0, 2 * Math.PI, !0), p(e, n.start.point, n.end.point, n.normal), e.dc.stroke()
    }
    var h, v, b, y, k, w = 200,
        M = 10,
        S = 12,
        x = "12px",
        D = 24;
    h = {
        join: "miter",
        cap: "square",
        stroke: "rgba(99, 101, 104, 1)",
        transparentStroke: "rgba(99, 101, 104, 0.9)"
    }, v = {
        join: "bevel",
        cap: "butt",
        stroke: "rgba(255, 255, 255, 1)"
    }, b = {
        color: "#BDBEC0",
        thickness: 1,
        dash: [10, 5],
        centerRadius: 40,
        centerFill: "#FF0000"
    }, y = {
        color: "#000000",
        thickness: 1
    }, k = {
        strokeThickness: 1,
        strokeColor: "#A7A9AC",
        dash: [10, 5],
        alpha: .4
    }, n.directive("room", ["$metrics", "$rootScope", "$snap", "$undo", "shapeService", "selectionService", "zoneRenderService", function(e, n, o, i, s, r, l) {
        return {
            require: "^drawingCanvas",
            restrict: "E",
            scope: {
                roomData: "=",
                roomModel: "=",
                zonesModel: "=",
                showZones: "="
            },
            controller: ["$scope", function(e) {
                this.onEdgeMouseDown = function(e, t) {
                    r.selectEdge(e), n.$broadcast("start-dragging-edge", t)
                }, e.roomCtrl = this
            }],
            link: function(n, i, s, c) {
                function d() {
                    c.requestRedraw()
                }

                function u() {
                    n.roomModel && n.zonesModel && (n.zonesModel.updateInfoFromMatchingWalls(n.roomModel), d())
                }

                function p() {
                    t.isUndefined(n.roomModel) || (o.updateRoomModel(n.roomModel), u())
                }

                function f() {
                    var n = e.getPageBox(),
                        t = e.getPageOffset();
                    c.setStageRect(new a.Rect(-t.x, -t.y, n.width, n.height))
                }
                p(), f(), c.addLayer(new m(n, l, r, e)), n.$watch("roomModel", p), n.$watch("zonesModel", u), n.$watch("showZones", d), n.$on("select-zone", d), n.$on("page-changed", f), n.$on("zoom-changed", f), n.$on("room-changed", u)
            }
        }
    }]), n.directive("polygonPosition", ["$metrics", function(e) {
        var n = {
            "center-bounding-box": function(n, t) {
                var o = a.boundingBox(t);
                return {
                    x: e.topx(o.x),
                    y: e.topx(o.y + o.height / 2) - n.height() / 2,
                    w: e.topx(o.width)
                }
            }
        };
        return {
            restrict: "E",
            scope: {
                polygon: "=",
                type: "@"
            },
            link: function(e, a) {
                function o() {
                    var n;
                    t.isArray(e.polygon) && (n = s(a, e.polygon), a.css({
                        left: Math.round(n.x),
                        top: Math.round(n.y),
                        width: Math.round(n.w)
                    }))
                }
                var i = e.type || "center-bounding-box",
                    s = n[i];
                o(), e.$watch("polygon", o), e.$on("zoom-changed", o), e.$on("room-changed", o)
            }
        }
    }]), n.directive("nodesBox", ["$metrics", function(e) {
        return {
            restrict: "E",
            scope: {
                nodes: "="
            },
            link: function(n, o) {
                function i() {
                    var i, s;
                    t.isArray(n.nodes) && (s = t.map(n.nodes, function(e) {
                        return e.point
                    }), i = a.boundingBox(s), o.css({
                        left: Math.round(e.topx(i.x)),
                        top: Math.round(e.topx(i.y)),
                        width: Math.round(e.topx(i.width)),
                        height: Math.round(e.topx(i.height)),
                        "font-size": 4 + e.getZoom() * (D - 4) / 100 + "px"
                    }))
                }
                i(), n.$watch("nodes", i), n.$on("zoom-changed", i), n.$on("room-changed", i)
            }
        }
    }]), n.directive("wallLabel", ["$metrics", function(e) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                wall: "="
            },
            templateUrl: "/app/designer/wallLabel.html",
            link: function(n, t) {
                function o() {
                    var o, i, s, r, l, c, d, m;
                    o = n.wall, o && (i = o.start.point, s = o.end.point, n.length = i.distance(s), r = a.Point.middlePoint(i, s), l = a.ptopx(e, r), c = (a.getAngle(i, s) + 270) % 360, c >= 315 && 360 >= c || c >= 0 && 45 > c ? (d = "-50%", m = "-100%") : c >= 45 && 135 > c ? (d = "0%", m = "-50%") : c >= 135 && 225 > c ? (d = "-50%", m = "0%") : (d = "-100%", m = "-50%"), t.css({
                        left: l.x,
                        top: l.y,
                        transform: "translate(" + d + ", " + m + ")"
                    }))
                }
                n.$watch("wall", o), n.$on("room-changed", o), n.$on("zoom-changed", o), o()
            }
        }
    }]), n.directive("ruler", ["$metrics", function(e) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                position: "=",
                length: "=",
                vertical: "="
            },
            templateUrl: "/app/designer/ruler.html",
            link: function(n, t) {
                function a() {
                    var a = e.topx(n.position.x),
                        o = e.topx(n.position.y);
                    t.css({
                        left: a,
                        top: o
                    })
                }

                function o() {
                    var a = e.topx(n.length);
                    n.vertical ? t.css({
                        width: x,
                        height: a
                    }) : t.css({
                        width: a,
                        height: x
                    })
                }
                n.$watch("position", a), n.$watch("length", o), n.$watch("vertical", o), n.$on("zoom-changed", function() {
                    a(), o()
                }), a(), o()
            }
        }
    }]), n.directive("edge", ["$metrics", "toolService", function(e, n) {
        return {
            require: "^room",
            restrict: "E",
            replace: !0,
            templateUrl: "/app/designer/edge.html",
            scope: {
                edge: "="
            },
            link: function(t, a, o, i) {
                function s() {
                    var n, o, i, s;
                    t.edge && (n = e.topx(w), o = t.edge.point, i = e.topx(o.x), s = e.topx(o.y), a.css({
                        left: i - n / 2,
                        top: s - n / 2,
                        width: n,
                        height: n
                    }))
                }
                t.$on("zoom-changed", s), t.$on("room-changed", s), t.edgeMouseDown = function(e) {
                    n.canManipulateRoom(e) && n.canSelectEdge(e) && (i.onEdgeMouseDown(t.edge, e), e.preventDefault())
                }, s()
            }
        }
    }]), n.directive("wallHandle", ["$metrics", "toolService", "$rootScope", "$undo", function(e, n, t, o) {
        return {
            restrict: "E",
            replace: !0,
            templateUrl: "/app/designer/edge.html",
            scope: {
                wall: "="
            },
            link: function(i, l) {
                function c() {
                    var n, t, o;
                    n = i.wall, n && n.round && (t = e.topx(w), o = a.ptopx(e, n.round.guide), l.css({
                        left: o.x - t / 2,
                        top: o.y - t / 2,
                        width: t,
                        height: t
                    }))
                }
                i.$on("zoom-changed", c), i.$on("room-changed", c), i.$watch("wall", c), i.edgeMouseDown = function(l) {
                    var c, d, m;
                    c = i.wall, c && n.canManipulateRoom(l) && n.canSelectEdge(l) && (d = c.round.offset, m = c.round.guide, r.trackDragOffset(l, function(n) {
                        var o = m.getOffset(a.ptom(e, n));
                        c.updateGuideOffset(c.line.orientedDistance(o)), t.$broadcast("room-changed")
                    }, function(e) {
                        e.currentResult && o.executeCommand(new s.ChangeWallGuideCommand(c.room, c, c.round.offset, d))
                    }, 0), l.preventDefault())
                }, c()
            }
        }
    }]), n.directive("roomWalls", ["$metrics", function(e) {
        return l({
            $metrics: e,
            scope: {
                model: "=",
                transparent: "="
            },
            updateProperties: ["model", "transparent"],
            draw: function(e, n) {
                function a(e) {
                    var t;
                    e.round && e.round.center ? c(n, e.end.point, e.round.focus, e.round.radius) : (t = n.ptopx(e.end.point), n.dc.lineTo(t.x, t.y))
                }

                function o(e) {
                    var t;
                    t = n.ptopx(e.start.point), n.dc.moveTo(t.x, t.y), a(e)
                }
                var i = n.topx(w),
                    s = e.model;
                s && t.each(s.getPaths(), function(s) {
                    var r, l, c = t.first(s),
                        m = t.last(s);
                    d(n.dc, h, i, e.transparent), n.dc.beginPath(), l = n.ptopx(c.start.point), n.dc.moveTo(l.x, l.y), t.each(s, a), c.wall.s === m.wall.e && n.dc.closePath(), n.dc.stroke(), r = t.filter(s, function(e) {
                        return e.wall.glass
                    }), t.some(r) && (n.dc.beginPath(), d(n.dc, v, i - 2), t.each(r, o), n.dc.stroke(), n.dc.beginPath(), d(n.dc, h, 1), t.each(r, o), n.dc.stroke())
                })
            }
        })
    }]), m.prototype.getContext = function(e, n) {
        var t;
        return t = this._$metrics, {
            tom: t.tom,
            topx: t.topx,
            ptopx: function(e) {
                return new a.Point(t.topx(e.x) - n.x, t.topx(e.y) - n.y)
            },
            dc: e
        }
    }, m.prototype.draw = function(e, n) {
        var a, o, i, s, r;
        o = this._$scope, i = this._renderService, s = this._selectionService.selectedZone(), o.zonesModel && o.showZones && (a = this.getContext(e, n), t.each(o.zonesModel.zoneModels, function(e) {
            i.fillZone(e, a), s === e ? i.drawSelectedZone(e, a) : i.drawZone(e, a)
        }), r = o.zonesModel.currentZone, r && (i.fillZone(r, a), i.drawPendingZone(o.zonesModel.currentZone, a)))
    }, n.factory("zoneRenderService", ["labelsService", function(e) {
        function n(e, n) {
            var a;
            t.some(n) && (a = e.ptopx(t.first(n).point), e.dc.moveTo(a.x, a.y), t.each(t.rest(n), function(n) {
                var t, a;
                a = n.matchingWall, a && a.round && a.round.focus ? n.wallReversed ? c(e, a.start.point, a.round.focus, a.round.radius) : c(e, a.end.point, a.round.focus, a.round.radius) : (t = e.ptopx(n.point), e.dc.lineTo(t.x, t.y))
            }))
        }

        function a(t, a) {
            var o, i;
            t.nodes.length > 0 && (o = e.getColor(t.zone.type), i = a.dc.globalAlpha, a.dc.globalAlpha = .5, a.dc.beginPath(), a.dc.lineWidth = 0, a.dc.fillStyle = o, n(a, t.nodes), a.dc.closePath(), a.dc.fill(), a.dc.globalAlpha = i)
        }

        function o(e, t) {
            e.nodes.length > 0 && (t.dc.beginPath(), t.dc.lineWidth = k.strokeThickness, t.dc.strokeStyle = k.strokeColor, n(t, e.nodes), t.dc.closePath(), t.dc.stroke())
        }

        function i(e, a) {
            e.nodes.length > 0 && (a.dc.beginPath(), a.dc.lineWidth = k.strokeThickness, a.dc.strokeStyle = k.strokeColor, n(a, t.initial(e.nodes, 1)), a.dc.stroke(), a.dc.beginPath(), a.dc.setLineDash(k.dash), n(a, t.last(e.nodes.concat(t.first(e.nodes)), 3)), a.dc.stroke(), a.dc.setLineDash([]))
        }

        function s(e, t) {
            e.nodes.length > 0 && (t.dc.beginPath(), t.dc.lineWidth = k.strokeThickness, t.dc.strokeStyle = k.strokeColor, t.dc.setLineDash(k.dash), n(t, e.nodes), t.dc.closePath(), t.dc.stroke(), t.dc.setLineDash([]))
        }
        return {
            fillZone: a,
            drawZone: o,
            drawPendingZone: i,
            drawSelectedZone: s
        }
    }]), n.directive("zoneHandle", ["$metrics", "toolService", "$rootScope", "$undo", "zoneService", function(e, n, o, i, l) {
        return {
            restrict: "E",
            replace: !0,
            templateUrl: "/app/designer/edge.html",
            scope: {
                node: "=",
                roomModel: "=",
                zoneModel: "="
            },
            link: function(n, c) {
                function d() {
                    var t, o, i;
                    t = n.node, t && (i = e.topx(w), o = a.ptopx(e, t.point), c.css({
                        left: o.x - i / 2,
                        top: o.y - i / 2,
                        width: i,
                        height: i
                    }))
                }
                n.$on("zoom-changed", d), n.$on("room-changed", d), n.edgeMouseDown = function(c) {
                    var d, m, u;
                    d = n.node, m = n.roomModel, d && m && (u = t.clone(d.point), r.trackDragOffsetWithStart(c, function() {
                        l.prepareSnap(n.roomModel, n.zoneModel)
                    }, function(n) {
                        var t = u.getOffset(a.ptom(e, n));
                        t = l.snapZoneNode(t), d.update(t), o.$broadcast("room-changed")
                    }, function(e) {
                        l.cleanupSnap(), e.currentResult && i.executeCommand(new s.UpdateZoneNodeCommand(d, d.point, u))
                    }, 0), c.preventDefault())
                }, d()
            }
        }
    }]), n.directive("wallRulers", ["$metrics", function(e) {
        return l({
            $metrics: e,
            scope: {
                walls: "="
            },
            updateProperties: ["walls"],
            draw: function(e, n) {
                e.walls && (n.dc.setLineDash([]), t.each(e.walls, function(e) {
                    e.round && e.round.center ? g(n, e) : f(n, e)
                }))
            }
        })
    }]), n.directive("measures", ["$metrics", function(e) {
        return l({
            $metrics: e,
            scope: {
                lines: "="
            },
            updateProperties: ["lines"],
            updateEvents: ["measures-changed"],
            draw: function(e, n) {
                e.lines && (n.dc.lineWidth = y.thickness, n.dc.strokeStyle = y.color, t.each(e.lines, function(e) {
                    n.dc.beginPath(), p(n, e.start.point, e.end.point, e.normal), n.dc.stroke()
                }))
            }
        })
    }])
}), define("settingsPanes", ["jquery", "underscore", "app", "utils", "utils2d", "commands"], function(e, n, t, a, o, i) {
    function s(e, t) {
        var a;
        return a = t.split("."), n.reduce(a, function(e, n) {
            return e && e[n]
        }, e)
    }

    function r(e, n) {
        return e === n || e instanceof Date && n instanceof Date && e.getTime() === n.getTime()
    }

    function l(e, t, a) {
        return n.chain(a).map(function(n) {
            return {
                prop: n,
                current: s(e, n),
                original: s(t, n)
            }
        }).filter(function(e) {
            return !r(e.current, e.original)
        }).value()
    }

    function c(e, t, a, o) {
        var i, s, r, c;
        s = l(e, t, a), i = n.pluck(s, "prop"), i.length > 0 && (r = n.object(i, n.pluck(s, "original")), c = n.object(i, n.pluck(s, "current")), o(e, c, r, i))
    }

    function d(e, t) {
        var a;
        return e ? (a = n.pick(e, t), a.properties = {
            name: e.properties && e.properties.name
        }) : a = void 0, a
    }

    function m(e) {
        var t = e && ("desk" === e.type || "team_room" === e.type),
            a = e && t && e.info.memberships;
        return !n.isUndefined(a) && n.all(a, function(e) {
            return e.endDate
        })
    }

    function u(e) {
        var t = e && ("desk" === e.type || "team_room" === e.type),
            a = e && t && e.info.memberships;
        return !n.isUndefined(a) && n.some(a, function(e) {
            return !e.endDate
        })
    }
    var p = {
        meeting_room: {
            icon: "fa fa-briefcase",
            title: "Meeting Room"
        },
        team_room: {
            icon: "fa fa-building",
            title: "Private Office"
        }
    };
    t.directive("shapeDesignerSettings", ["$rootScope", "$undo", "$metrics", "$render", "shapeService", "selectionService", function(e, t, a, o, s, r) {
        return {
            replace: !0,
            restrict: "E",
            templateUrl: "/app/designer/settings/shapeDesignerSettings.html",
            link: function(e) {
                function a(e) {
                    var n;
                    n = s.getElem(e), o.render(n, e), s.updateShapeStatus(e)
                }

                function l() {
                    e.selected && a(e.selected)
                }

                function m() {
                    e.selected && p && (c(e.selected, p, f, function(e, n, o, s) {
                        t.executeCommand(new i.ChangeShapeCommand(e, n, o, a, s))
                    }), p = d(e.selected, f))
                }

                function u(t) {
                    1 === t.length ? e.selected = t[0] : e.selected = void 0, e.selectedDesk = n.find(t, s.isPrivate), p = d(e.selected, f)
                }
                var p, f;
                f = ["width", "height", "rotate", "label", "fontSize"], e.saveLastValue = m, u(r.selectedShapes()), e.$watch("selected.width", l), e.$watch("selected.height", l), e.$watch("selected.rotate", l), e.$watch("selected.fontSize", l), e.$watch("selected.label", l), e.$on("select-shapes", function(e, n) {
                    m(), u(n)
                })
            }
        }
    }]), t.directive("multipleShapesSettings", ["$rootScope", "$undo", "$metrics", "$render", "shapeService", "selectionService", function(e, t, a, s, r, l) {
        return {
            replace: !0,
            restrict: "E",
            templateUrl: "/app/designer/settings/multipleShapesSettings.html",
            link: function(a) {
                function m(n) {
                    var t;
                    t = r.getElem(n), s.render(t, n), e.$broadcast("force-selection-update")
                }

                function u() {
                    a.selectedDesk && y && (c(a.selectedDesk, y, k, function(e, n, a, o) {
                        t.executeCommand(new i.ChangeShapeCommand(e, n, a, m, o))
                    }), y = d(a.selected, k))
                }

                function p(e) {
                    a.selectedItems = e, a.selectedDesk = n.find(e, r.isPrivate), y = d(a.selectedDesk, k)
                }
                var f, g, h, v, b, y, k = ["properties.name"];
                a.rotateInputGotFocus = function() {
                    f = a.selectedItems, b = f[0].rotate, g = o.shapesCenter(f), v = b, h = n.map(f, function(e) {
                        return n.pick(e, "rotate", "cx", "cy")
                    })
                }, a.rotateInputChange = function() {
                    var t;
                    f && (t = f[0].rotate, n.each(f, function(i, l) {
                        var c, d, m, u, p;
                        d = h[l], u = t - v, c = new o.Point(d.cx, d.cy), m = o.rotate(c, g, -u), p = {
                            rotate: d.rotate + u,
                            cx: m.x,
                            cy: m.y
                        }, e.safeApply(a, function() {
                            n.extend(i, p)
                        }), s.render(r.getElem(i), p, i), e.$broadcast("force-selection-update")
                    }))
                }, a.rotateInputLostFocus = function() {
                    var e, a;
                    a = n.map(f, function(e, n) {
                        return new i.ChangeShapeCommand(e, e, h[n], m, ["rotate", "cx", "cy"])
                    }), e = new i.CompositeCommand(a, "Rotate shapes"), t.executeCommand(e)
                }, a.saveLastValue = u, p(l.selectedShapes()), a.$on("select-shapes", function(e, n) {
                    u(), p(n)
                }), a.$on("$destroy", a.rotateInputLostFocus)
            }
        }
    }]), t.directive("shapeManagerSettings", ["$rootScope", "data", "shapeService", "selectionService", function(e, t, o, i) {
        return {
            replace: !0,
            restrict: "E",
            templateUrl: "/app/designer/settings/shapeManagerSettings.html",
            link: function(s) {
                function r(e) {
                    s.selectedDesks = n.filter(e, o.isPrivate), s.selected = 1 === s.selectedDesks.length && s.selectedDesks[0];
                    var t = n.chain(s.selectedDesks).map(function(e) {
                        return e.info.teamId
                    }).unique().value();
                    l && 1 === t.length ? s.team = l.findById(t[0]) : s.team = void 0
                }
                var l, c;
                s.deskNotAvailableType = a.Constants.DESK_NA_TYPE, t.get("teamsModel", "resourcesModel").spread(function(e, n) {
                    l = e, c = n
                }), s.$on("select-shapes", function(e, n) {
                    r(n)
                }), s.canMoveIn = function() {
                    return s.selectedDesks.length > 0 && n.all(s.selectedDesks, function(e) {
                        return e.info && e.info.resource && m(e.info.resource)
                    })
                }, s.canMoveOut = function() {
                    return s.selectedDesks.length > 0 && n.all(s.selectedDesks, function(e) {
                        return e.info && e.info.resource && u(e.info.resource)
                    })
                }, s.moveIn = function() {
                    var t = n.map(s.selectedDesks, function(e) {
                        return e.info.resource
                    });
                    e.$broadcast("move-in", t)
                }, s.moveOut = function() {
                    var t = n.chain(s.selectedDesks).map(function(e) {
                            var t, a;
                            return t = e.info && e.info.resource, a = t && t.info.memberships || [], n.find(a, function(e) {
                                return !e.endDate
                            })
                        }).compact().flatten().value(),
                        a = n.chain(s.selectedDesks).findWhere(function(e) {
                            return e.info && e.info.resource && e.info.resource.type
                        }).value(),
                        o = a.info.resource.type,
                        i = {
                            memberships: t,
                            resourceTypes: [o]
                        };
                    e.$broadcast("end-memberships", i)
                }, s.canEditMembership = function() {
                    return s.selected && s.selected.info.membership
                }, s.editMembership = function() {
                    s.canEditMembership() && e.$broadcast("edit-membership", s.selected.info.membership)
                }, s.relocate = function() {
                    e.$broadcast("relocate-start", s.selectedDesks)
                }, s.history = function() {
                    e.$broadcast("resource-history", s.selected)
                }, s.getDeskType = function(e) {
                    var n;
                    return n = e && e.info.resource, n && n.type || a.Constants.DESK_NA_TYPE
                }, s.getPrivateOfficeName = function(e) {
                    if (c) {
                        var n = c.findById(e.parent);
                        return n.name
                    }
                }, s.editDesk = function() {
                    e.$broadcast("edit-resource", {
                        room: s.room,
                        shapes: s.selectedDesks
                    })
                }, r(i.selectedShapes())
            }
        }
    }]), t.directive("wallSettings", ["wallService", "$undo", "$rootScope", function(e, n, t) {
        return {
            restrict: "E",
            replace: !0,
            scope: {},
            link: function(a) {
                function s(e, n) {
                    var a, o;
                    o = c.getScale(-n), a = e.start.point.getOffset(o), e.end.update(a), t.$broadcast("room-changed")
                }

                function r(e, t) {
                    e && u && t !== l && (s(e, t), n.executeCommand(new i.MoveEdgeCommand(e.room, e.end, e.end.point, m))), u = !1
                }
                var l, c, d, m, u;
                a.$on("select-wall", function(e, n) {
                    r(a.wall, a.length), a.wall = n, n && (d = a.wall.start.point, m = a.wall.end.point, a.length = l = d.distance(m), c = o.getColinear(d, m))
                }), a.lengthGotFocus = function() {
                    a.wall && (u = !0)
                }, a.lengthBlur = function() {
                    r(a.wall, a.length)
                }, a.lengthChange = function(e) {
                    a.wall && c && s(a.wall, e), a.length = e
                }, a.$watch("length", function() {
                    a.wall && c && s(a.wall, a.length)
                }), a.deleteWall = function() {
                    a.wall && e.deleteWall(a.wall.room, a.wall)
                }, a.toggleRound = function() {
                    var e, t;
                    a.wall && (e = a.wall.wall.round, t = a.wall.wall.guideOffset, n.executeCommand(new i.ChangeWallCommand(a.wall.room, a.wall, {
                        round: e,
                        guideOffset: t
                    }, {
                        round: !e,
                        guideOffset: t
                    })))
                }, a.toggleGlass = function() {
                    var e;
                    a.wall && (e = a.wall.wall.glass, n.executeCommand(new i.ChangeWallCommand(a.wall.room, a.wall, {
                        glass: e
                    }, {
                        glass: !e
                    })))
                }
            },
            templateUrl: "/app/designer/settings/wallSettings.html"
        }
    }]), t.directive("zoneManagerSettings", ["zoneService", "labelsService", "selectionService", "data", "$rootScope", function(e, n, t, a, o) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                zonesModel: "=",
                room: "="
            },
            templateUrl: "/app/designer/settings/zoneManagerSettings.html",
            link: function(e) {
                function n(n) {
                    e.selected = n, n ? e.resource = n.info && n.info.resource : delete e.resource
                }
                var i, s;
                a.get("resourcesModel", "teamsModel").spread(function(e, a) {
                    i = e, s = a, n(t.selectedZone())
                }), e.roomTypes = p, e.editZone = function() {
                    o.$broadcast("edit-resource", {
                        resource: e.resource
                    })
                }, e.canMoveIn = m, e.moveIn = function(e) {
                    o.$broadcast("move-in", [e])
                }, e.canMoveOut = u, e.moveOut = function(e) {
                    var n = e.info && e.info.membership,
                        t = {
                            memberships: [n],
                            resourceTypes: ["team_room"]
                        };
                    o.$broadcast("end-memberships", t)
                }, e.history = function() {
                    o.$broadcast("resource-history", e.selected)
                }, e.$on("select-zone", function(e, t) {
                    n(t)
                })
            }
        }
    }]), t.directive("zoneSettings", ["$undo", "$rootScope", "zoneService", "labelsService", "selectionService", "data", function(e, t, a, o, i, s) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                zonesModel: "=",
                room: "="
            },
            templateUrl: "/app/designer/settings/zoneSettings.html",
            link: function(r) {
                function l(e) {
                    var n, t, a;
                    a = e.zone, n = e.info && e.info.resource, t = o.type(a.type), t ? n ? v.resourcesModel.update(n, {
                        type: t,
                        name: a.label
                    }) : v.resourcesModel.add({
                        type: t,
                        name: a.label,
                        target: a._id,
                        room: r.room._id
                    }).then(function(n) {
                        e.info = e.info || {}, e.info.resource = n
                    }) : n && (delete e.info.resource, v.resourcesModel.remove(n))
                }

                function c() {
                    var e;
                    r.zone && f && (e = r.zone.type !== f.type, h.saveRoom(), (p.info && p.info.resource || e) && l(p))
                }

                function d() {
                    f = r.zone ? n.pick(r.zone, g) : void 0
                }

                function m(e) {
                    var n;
                    e ? (p = e, n = p.info && p.info.resource, r.zone = p.zone, r.zone.label = n && n.name || r.zone.label) : (r.zone = void 0, p = void 0), d(), r.labels = o.getLabelsList()
                }

                function u() {
                    r.zone && t.$broadcast("room-changed")
                }
                var p, f, g, h, v = this;
                s.get("resourceModel").then(function(e) {
                    v.resourceModel = e
                }), g = ["label", "type"], h = e.currentHandler(), m(i.selectedZone()), r.saveLastValue = c, r.$on("select-zone", function(e, n) {
                    c(), m(n)
                }), r.deleteZone = function() {
                    r.zone && a.deleteZone(r.zonesModel, p)
                }, n.each(g, function(e) {
                    r.$watch("zone." + e, u)
                }), r.$on("command-executed", d)
            }
        }
    }])
}), define("shapeLocation", ["app", "underscore", "utils2d"], function(e, n, t) {
    var a = 16;
    e.directive("shapeLocation", ["$render", function(e) {
        return {
            transclude: !0,
            restrict: "E",
            template: "<ng-transclude></ng-transclude>",
            scope: {
                shape: "="
            },
            link: function(a, o, i) {
                function s() {
                    var s;
                    a.shape && (s = "ignoreRotate" in i ? t.shapeBoundingBox(a.shape) : n.pick(a.shape, ["cx", "cy", "width", "height", "rotate", "scale", "snapOffset", "snapAt"]), e.render(o, s))
                }
                a.$watch("shape.cx", s), a.$watch("shape.cy", s), a.$watch("shape.width", s), a.$watch("shape.height", s), a.$watch("shape.rotate", s), a.$watch("shape.scale.x", s), a.$watch("shape.scale.y", s), a.$on("zoom-changed", s), s()
            }
        }
    }]), e.directive("zoneLocation", ["$render", function(e) {
        return {
            transclude: !0,
            restrict: "E",
            template: "<ng-transclude></ng-transclude>",
            scope: {
                zone: "="
            },
            link: function(a, o, i) {
                function s() {
                    var i = a.zone;
                    i && e.render(o, t.boundingBox(n.map(i.nodes, function(e) {
                        return e.point
                    })))
                }
                a.$watch("zone", s), a.$on("zoom-changed", s)
            }
        }
    }]), e.directive("shapeMoreInfo", ["$render", function(e) {
        return {
            restrict: "E",
            templateUrl: "/common/shapeMoreInfo.html",
            scope: {
                shape: "="
            },
            replace: !0,
            link: function(n, a) {
                function o() {
                    n.shape && e.render(a, t.shapeInfoBox(n.shape))
                }
                n.$on("zoom-changed", o), o()
            }
        }
    }]), e.directive("zoomPanel", ["$metrics", function(e) {
        return {
            restrict: "E",
            template: "",
            link: function(n, t) {
                function o(e) {
                    var n = e * a / 100;
                    t.css("font-size", n + "px")
                }
                n.$on("zoom-changed", function(e, n) {
                    o(n.zoom)
                }), o(e.getZoom())
            }
        }
    }])
}), define("draggable", ["app", "underscore", "jquery", "dragHelper"], function(e, n, t, a) {
    e.directive("officeDraggable", [function() {
        return {
            restrict: "A",
            replace: !1,
            scope: {
                dragStarted: "=",
                dragMove: "=",
                dragEnd: "=",
                dragData: "="
            },
            link: function(e, n) {
                n.on("mousedown", function(n) {
                    var t = e.dragData,
                        o = {
                            offsetX: 0,
                            offsetY: 0
                        };
                    a.startDrag(n, function(n, a) {
                        return e.dragStarted(t, n, a, o)
                    }, e.dragMove, e.dragEnd, 0, o.offsetX, o.offsetY)
                })
            }
        }
    }])
}), define("selection", ["app", "jquery", "underscore", "utils2d", "dragHelper", "commands"], function(e, n, t, a, o, i) {
    e.directive("selection", ["$rootScope", "$undo", "$metrics", "$render", "$snap", "shapeService", "selectionService", "toolService", function(e, s, r, l, c, d, m, u) {
        return {
            restrict: "E",
            replace: !0,
            link: function(p) {
                function f(e) {
                    var n = d.getElem(e);
                    l.render(n, e)
                }

                function g(e, n, o) {
                    var i, s;
                    return i = p.getPointOnPage(n, o), s = a.ptom(r, i), t.find(e, function(e) {
                        return a.isPointInsideShape(e, s)
                    })
                }

                function h() {
                    var e, n = m.selectedShapes();
                    1 === n.length ? e = n[0] : (e = a.shapesBoundingBox(n, !0), e.rotate = n[0].rotate), p.designerGlobal.selectionLocation = e
                }

                function v() {
                    var e = m.selectedShapes();
                    0 === e.length ? p.selectionVisible = !1 : (h(), p.selectionVisible = !0)
                }
                var b;
                p.selectionVisible = !1, p.startRotate = function(n) {
                    var g, h, v, b, y, k;
                    u.canManipulate(n) && (g = m.selectedShapes(), h = t.map(g, function(e) {
                        return t.pick(e, "rotate", "cx", "cy")
                    }), v = a.shapesCenter(g), k = g[0].rotate, b = p.getPointOnPage(n.pageX, n.pageY), y = a.ptom(r, b), o.trackDragOffsetWithStart(n, function() {
                        e.safeApply(p, function() {
                            p.designerGlobal.isRotating = !0
                        })
                    }, function(e) {
                        var n, o;
                        o = a.ptom(r, e), n = (a.getAngle(v, y.getOffset(o)) + 360) % 360, n = c.snapAngle(g, n), t.each(g, function(e, o) {
                            var i, s, r, c, m;
                            s = h[o], c = n - k, i = new a.Point(s.cx, s.cy), r = a.rotate(i, v, -c), m = {
                                rotate: s.rotate + c,
                                cx: r.x,
                                cy: r.y
                            }, p.$apply(function() {
                                t.extend(e, m), l.render(d.getElem(e), e), p.designerGlobal.selectionLocation.rotate = n
                            })
                        })
                    }, function() {
                        var e, n;
                        n = t.map(g, function(e, n) {
                            return new i.ChangeShapeCommand(e, e, h[n], f, ["rotate", "cx", "cy"])
                        }), e = new i.CompositeCommand(n, "Rotate shapes"), s.executeCommand(e), p.$apply(function() {
                            p.designerGlobal.isRotating = !1
                        })
                    }, 0), n.preventDefault())
                }, p.onSelectionMouseDown = function(e) {
                    n(":focus").blur(), u.canManipulate(e) && (b = !0, p.startDragging(e))
                }, p.onSelectionMouseUp = function(e) {
                    var n = m.selectedShapes();
                    if (n.length > 1 && b && !p.designerGlobal.isDragging) {
                        var t = g(m.selectedShapes(), e.pageX, e.pageY);
                        t && (m.selectShapes(t), e.preventDefault())
                    }
                    b = !1
                }, p.startDragging = function(e) {
                    function n() {
                        p.$apply(function() {
                            p.designerGlobal.isDragging = !0
                        })
                    }

                    function i() {
                        p.$apply(function() {
                            s.moveMany(p.room, u, f, h), p.designerGlobal.isDragging = !1
                        })
                    }
                    var u, f, g, v, b, y, k, w;
                    u = m.selectedShapes(), e.isDefaultPrevented() || (f = t.map(u, function(e) {
                        return t.pick(e, ["cx", "cy"])
                    }), 1 === u.length && u[0].isBound ? (g = u[0], v = f[0], k = n, w = function(e) {
                        var n, o, i;
                        i = a.ptom(r, e), o = new a.Point(v.cx + i.x, v.cy + i.y), n = c.snapBoundShape(g, o), p.$apply(function() {
                            t.extend(g, n), l.render(d.getElem(g), g), h()
                        })
                    }) : (k = function() {
                        n(), y = a.shapesPoints(u), b = c.prepareSnapShapes(u)
                    }, w = function(e) {
                        var n, o, i, s;
                        o = a.ptom(r, e), s = t.map(y, function(e) {
                            return e.offset(o)
                        }), n = c.snapShapes(b, s), i = o.offset(n), p.$apply(function() {
                            t.each(u, function(e, n) {
                                e.cx = f[n].cx + i.x, e.cy = f[n].cy + i.y, l.render(d.getElem(e), e)
                            }), h()
                        })
                    }), o.trackDragOffsetWithStart(e, k, w, i), e.preventDefault())
                }, p.$on("select-shapes", v), p.$on("force-selection-update", v), p.$on("start-dragging-shape", function(e, n) {
                    p.startDragging(n)
                }), v()
            },
            templateUrl: "/app/designer/selection.html"
        }
    }]), e.directive("rectangleSelection", ["$rootScope", "$metrics", "$render", "selectionService", "shapeService", function(e, n, i, s, r) {
        return {
            restrict: "E",
            scope: {
                shapes: "=",
                translate: "="
            },
            replace: !0,
            link: function(i, l) {
                function c(c, d) {
                    var m, u, p;
                    m = i.translate(d.pageX, d.pageY), o.trackDragOffsetWithStart(d, function() {
                        l.css({
                            left: m.x,
                            top: m.y,
                            width: 0,
                            height: 0
                        }), i.visible = !0
                    }, function(e) {
                        var n, t, a, o;
                        n = Math.min(m.x, m.x + e.x), t = Math.min(m.y, m.y + e.y), a = Math.abs(e.x), o = Math.abs(e.y), l.css({
                            left: n,
                            top: t,
                            width: a,
                            height: o
                        }), u = m.x + e.x, p = m.y + e.y
                    }, function() {
                        i.shapes && e.safeApply(i, function() {
                            var e, o, l, c, d, f;
                            l = Math.min(m.x, u), c = Math.min(m.y, p), d = Math.abs(u - m.x), f = Math.abs(p - m.y), e = new a.Rect(n.tom(l), n.tom(c), n.tom(d), n.tom(f)), o = t.filter(i.shapes, function(n) {
                                return !n.isBound && e.intersectsWith(a.shapeBoundingBox(n)) && !r.isStatic(n)
                            }), i.visible = !1, o.length > 0 ? s.selectShapes(o) : s.resetSelection()
                        })
                    }, 0)
                }
                i.$on("start-rect-selection", c)
            },
            templateUrl: "/app/designer/rectangleSelection.html"
        }
    }])
}), define("edgeAdorner", ["app", "jquery", "underscore", "dragHelper", "utils2d", "commands"], function(e, n, t, a, o, i) {
    e.directive("edgeadorner", ["$rootScope", "$metrics", "$snap", "$undo", "toolService", "wallService", function(e, n, s, r, l, c) {
        var d = 200,
            m = d;
        return {
            restrict: "E",
            replace: !0,
            scope: {
                room: "="
            },
            link: function(d, u) {
                function p() {
                    if (h) {
                        var e = Math.ceil(n.topx(m)),
                            t = o.ptopx(n, h.point);
                        u.css({
                            left: t.x - e / 2,
                            top: t.y - e / 2,
                            width: e,
                            height: e
                        })
                    }
                }

                function f() {
                    u.css("display", "block")
                }

                function g() {
                    u.css("display", "none")
                }
                var h, v;
                u.on("mousedown", function(e) {
                    h && l.canManipulateRoom(e) && d.startDraggingEdge(e)
                }), d.$on("select-edge", function(e, n) {
                    n ? (v = d.room, h = n, p(), f()) : g()
                }), d.$on("zoom-changed", p), d.$on("room-changed", p), d.$on("start-dragging-edge", function(e, n) {
                    d.startDraggingEdge(n)
                }), d.deleteEdge = function() {
                    h && c.deleteEdge(v, h)
                }, d.startDraggingEdge = function(l) {
                    var c = new o.Point(h.point),
                        d = t.indexOf(v.edges, h);
                    a.trackDragOffset(l, function(t) {
                        var a = c.getOffset(o.ptom(n, t)),
                            i = s.snapRoomVertex(d, a);
                        h.update(i), e.$broadcast("room-changed")
                    }, function(e) {
                        e.currentResult && r.executeCommand(new i.MoveEdgeCommand(v, h, h.point, c))
                    }, 0), l.preventDefault()
                }
            },
            templateUrl: "/app/designer/edgeAdorner.html"
        }
    }])
}), define("wallAdorner", ["app", "jquery", "underscore", "utils2d", "commands", "dragHelper"], function(e, n, t, a, o, i) {
    var s = 200;
    e.directive("wallAdorner", ["$rootScope", "$metrics", "$render", "toolService", "wallService", "$undo", function(e, n, r, l, c, d) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                room: "="
            },
            link: function(m, u) {
                function p() {
                    var e, n, t, o, i;
                    g && (e = a.Point.middlePoint(g.start.point, g.end.point), t = new a.Line(g.start.point, g.end.point), o = t.getNormal(), i = g.getGuideOffset(), n = {
                        cx: e.x + o.x * i / 2,
                        cy: e.y + o.y * i / 2,
                        width: g.start.point.distance(g.end.point) - s,
                        height: Math.abs(i) + s,
                        rotate: a.getAngle(g.start.point, g.end.point) - 90
                    }, r.render(u, n))
                }
                var f, g;
                m.visible = !1, m.deleteWall = function() {
                    g && c.deleteWall(g.room, g)
                }, u.on("mousedown", function(e) {
                    g && l.canManipulateRoom(e) && m.startDraggingWall(e)
                }), m.startDraggingWall = function(s) {
                    var r, l, c, m;
                    r = g.start, l = g.end, c = t.clone(r.point), m = t.clone(l.point), i.trackDragOffset(s, function(t) {
                        var o, i;
                        o = a.ptom(n, t), i = Math.abs(o.x) > Math.abs(o.y) ? new a.Point(o.x, 0) : new a.Point(0, o.y), a.ptom(n, t), r.update(c.getOffset(i)), l.update(m.getOffset(i)), e.$broadcast("room-changed")
                    }, function(e) {
                        var n = [];
                        e.currentResult && (n.push(new o.MoveEdgeCommand(f, r, r.point, c)), n.push(new o.MoveEdgeCommand(f, l, l.point, m)), d.executeCommand(new o.CompositeCommand(n, "Move wall")))
                    }, 4), s.preventDefault()
                }, m.$on("select-wall", function(e, n) {
                    n ? (f = m.room, g = n, p(), u.css("display", "inline-block")) : u.css("display", "none")
                }), m.$on("start-dragging-wall", function(e, n) {
                    m.startDraggingWall(n)
                }), m.$on("zoom-changed", p), m.$on("room-changed", p)
            },
            templateUrl: "/app/designer/wallAdorner.html"
        }
    }])
}), define("scale", ["app"], function(e) {
    e.directive("scale", ["$metrics", "$rootScope", function(e, n) {
        return {
            restrict: "E",
            scope: {},
            link: function(t, a) {
                function o() {
                    var n;
                    n = e.getScale("largeRound", "floor"), t.length = e.convertScale(1, n, s)
                }

                function i() {
                    var n = a.find(".scale-container");
                    n.css({
                        width: e.topx(t.length)
                    })
                }
                var s = e.unitTypes.measureScale;
                n.$on("zoom-changed", i), n.$on("unit-changed", function() {
                    o(), i()
                }), o(), i()
            },
            templateUrl: "/app/designer/scale.html"
        }
    }])
}), define("shortcuts", ["app", "underscore", "utils2d"], function(e, n, t) {
    var a = 10,
        o = [];
    e.directive("shortcuts", ["shapeService", "hotkeys", "$undo", "$render", "selectionService", "$rootScope", function(e, i, s, r, l, c) {
        return {
            restrict: "A",
            link: function(d) {
                function m(t, o) {
                    var i, s;
                    return b = l.selectedShapes(), b.length > 0 ? (i = t * a, s = o * a, v.x += i, v.y += s, n.each(b, function(n) {
                        n.cx += i, n.cy += s, r.render(e.getElem(n), n)
                    }), !0) : !1
                }

                function u(e, n) {
                    return m(e, n, d)
                }

                function p() {
                    if (b.length > 0) {
                        var e = n.map(b, function(e) {
                            return new t.Point(e.x - v.x, e.y - v.y)
                        });
                        s.moveMany(d.room, b, e), b = o, v = new t.Point
                    }
                }

                function f() {
                    return d.view && "design" === d.view.mode
                }

                function g(e) {
                    return function(n) {
                        f() && e(n) && n.preventDefault()
                    }
                }
                var h, v = new t.Point,
                    b = o;
                i.bindTo(d).add({
                    combo: ["del", "backspace"],
                    description: "Deletes the selected shape.",
                    callback: g(function() {
                        return d.deleteSelected()
                    })
                }).add({
                    combo: ["command+z", "ctrl+z"],
                    description: "Undo.",
                    callback: g(function() {
                        return c.canUndo ? (s.undo(), !0) : void 0
                    })
                }).add({
                    combo: ["command+shift+z", "ctrl+y"],
                    description: "Redo.",
                    callback: g(function() {
                        return c.canRedo ? (s.redo(), !0) : void 0
                    })
                }).add({
                    combo: "left",
                    action: "keydown",
                    callback: g(function() {
                        return u(-1, 0)
                    })
                }).add({
                    combo: "shift+left",
                    action: "keydown",
                    description: "Moves the selected shape left faster.",
                    callback: g(function() {
                        return u(-10, 0)
                    })
                }).add({
                    combo: "up",
                    action: "keydown",
                    description: "Moves the selected shape up.",
                    callback: g(function() {
                        return u(0, -1)
                    })
                }).add({
                    combo: "shift+up",
                    action: "keydown",
                    description: "Moves the selected shape up faster.",
                    callback: g(function() {
                        return u(0, -10)
                    })
                }).add({
                    combo: "down",
                    action: "keydown",
                    description: "Moves the selected shape down.",
                    callback: g(function() {
                        return u(0, 1)
                    })
                }).add({
                    combo: "shift+down",
                    action: "keydown",
                    description: "Moves the selected shape down faster.",
                    callback: g(function() {
                        return u(0, 10)
                    })
                }).add({
                    combo: "right",
                    action: "keydown",
                    description: "Moves the selected shape right.",
                    callback: g(function() {
                        return u(1, 0)
                    })
                }).add({
                    combo: "shift+right",
                    action: "keydown",
                    description: "Moves the selected shape right faster.",
                    callback: g(function() {
                        return u(10, 0)
                    })
                }).add({
                    combo: ["shift+right", "right", "shift+down", "left", "down", "up", "shift+up", "shift+left"],
                    action: "keyup",
                    description: "Moves the selected shape right faster.",
                    callback: g(p)
                }).add({
                    combo: ["command+s", "ctrl+s"],
                    description: "Saves the room.",
                    callback: g(function() {
                        return d.save(), !0
                    })
                }).add({
                    combo: ["command+d", "ctrl+d"],
                    description: "Duplicate the selected shape.",
                    callback: g(function() {
                        return d.duplicateSelected(), !0
                    })
                }).add({
                    combo: ["command+c", "ctrl+c"],
                    description: "Copy selected shape.",
                    callback: g(function() {
                        return h = !0, !0
                    })
                }).add({
                    combo: ["alt+shift+f"],
                    description: "Show/hide furniture.",
                    callback: g(function(e) {
                        return d.view.furniture = !d.view.furniture, !0
                    })
                }).add({
                    combo: ["command+v", "ctrl+v"],
                    description: "Paste selected shape.",
                    callback: g(function() {
                        return h ? (d.duplicateSelected(), h = void 0, !0) : void 0
                    })
                }).add({
                    combo: ["command+a", "ctrl+a"],
                    description: "Select all shapes.",
                    callback: g(function() {
                        return l.selectShapes(n.filter(d.room.shapes, function(n) {
                            return !n.isBound && !e.isStatic(n)
                        })), !0
                    })
                }).add({
                    combo: ["enter"],
                    description: "Confirm current operation",
                    callback: g(function() {
                        return d.confirm()
                    })
                }).add({
                    combo: ["esc", "escape"],
                    description: "Cancel current operation",
                    callback: g(function() {
                        return d.cancel()
                    })
                })
            }
        }
    }])
}), define("undo", ["underscore", "app", "alert", "utils2d", "utils"], function(e, n, t, a, o) {
    function i(n) {
        var t;
        return t = e.pick(n, "_id", "template", "title", "label", "rotate", "scale", "groupName", "fontSize"), e.each(["cx", "cy", "width", "height"], function(e) {
            t[e] = Math.round(n[e])
        }), t
    }

    function s(e, n, t, a) {
        this._$http = e, this._$q = n, this._$undo = t, this._room = a
    }

    function r(n, t) {
        t.zones && e.each(n.zones, function(e, n) {
            var a = t.zones[n],
                o = a._id;
            !e._id && o && (e._id = o)
        })
    }

    function l(n, t) {
        var a = e.pick(n, "_id", "name", "definition", "zones", "background", "state", "office");
        return e.each(a.definition.walls, function(e) {
            e.glass || delete e.glass, e.round || (delete e.round, delete e.guideOffset)
        }), e.each(a.definition.edges, function(e) {
            e.x = Math.round(e.x), e.y = Math.round(e.y)
        }), e.each(a.zones, function(n) {
            e.each(n.nodes, function(e) {
                e.x = Math.round(e.x), e.y = Math.round(e.y)
            })
        }), t && (a.shapes = e.map(n.shapes, i)), a
    }
    var c = [],
        d = [],
        m = 20,
        u = "/i/rooms/",
        p = function() {
            t.ok("Auto-saving...")
        },
        f = function() {
            t.ok("Room saved successfully.")
        },
        g = function() {
            t.error("Unable to save the room.")
        },
        h = function(e) {
            e = e ? " " + e : "", t.alert("Unable to save the room." + e, "alert-warning")
        };
    n.factory("$undo", ["$http", "$rootScope", "$metrics", "$render", "shapeService", "selectionService", "resourceHandlerFactory", function(n, t, a, o, i, s, r) {
        function l() {
            t.canUndo = c.length > 0, t.canRedo = d.length > 0
        }

        function u(e) {
            c.push(e), c.length > m && c.splice(0, 1), e.redo(), e.save(!1), d.length = 0, l()
        }

        function p(n, t, a, o, i, s) {
            var r = e.pick(t, s),
                l = e.pick(a, s),
                c = {
                    title: i,
                    save: function() {
                        h.saveShapes([n])
                    },
                    undo: function() {
                        e.extend(n, l), o(n, l)
                    },
                    redo: function() {
                        e.extend(n, r), o(n, r)
                    }
                };
            u(c)
        }

        function f(e) {
            var n = h,
                a = {
                    redo: function() {
                        e.redo(v), e.affectsRoom && t.$broadcast("room-changed"), t.$broadcast("command-executed")
                    },
                    undo: function() {
                        e.undo(v), e.affectsRoom && t.$broadcast("room-changed"), t.$broadcast("command-executed")
                    },
                    save: function(t) {
                        n.save(e.getSaveData(t))
                    },
                    title: e.title
                };
            u(a)
        }
        var g, h, v;
        v = {
            notifyEdgeAdded: function(e) {
                s.selectEdge(e)
            },
            notifyEdgeRemoved: function(e) {
                s.selectedEdge() === e && s.resetSelection()
            },
            notifyWallAdded: function(e) {},
            notifyWallRemoved: function(e) {
                var n = s.selectedWall();
                n && n.wall === e && s.resetSelection()
            },
            notifyZoneAdded: function(e) {
                s.selectZone(e)
            },
            notifyZoneRemoved: function(e) {
                s.selectedZone() === e && s.resetSelection()
            }
        };
        var b = {
            undo: function() {
                var e = c.pop();
                e && (e.undo(), d.push(e), e.save(!0)), l()
            },
            redo: function() {
                var e = d.pop();
                e && (e.redo(), c.push(e), e.save(!1)), l()
            },
            setCurrentRoom: function(e) {
                g = e, h = r.createRoomHandler(e, b)
            },
            executeCommand: f,
            addShapesCommand: function(e, n, t, a) {
                var o = {
                    title: "Shape added",
                    save: function(e) {
                        e ? h.removeShapes(n) : h.addShapes(n)
                    },
                    undo: function() {
                        a(e, n)
                    },
                    redo: function() {
                        t(e, n)
                    }
                };
                u(o)
            },
            removeShapesCommand: function(e, n, t, a) {
                var o = {
                    title: "Shape removed",
                    save: function(e) {
                        e ? h.addShapes(n) : h.removeShapes(n)
                    },
                    undo: function() {
                        a(e, n)
                    },
                    redo: function() {
                        t(e, n)
                    }
                };
                u(o)
            },
            changeShape: function(n, t, a, o, i) {
                p(n, t, a, o, "Shape property changed.", e.isArray(i) ? i : [i])
            },
            moveMany: function(n, t, a, r) {
                var l, c;
                r = r || function() {}, l = e.map(t, function(n) {
                    return e.pick(n, ["cx", "cy"])
                }), c = {
                    title: "Shapes moved.",
                    save: function() {
                        h.saveShapes(t)
                    },
                    undo: function() {
                        e.each(t, function(n, t) {
                            e.extend(n, a[t]), o.render(i.getElem(n), n)
                        }), s.selectedShapes(t), r()
                    },
                    redo: function() {
                        e.each(t, function(n, t) {
                            e.extend(n, l[t]), o.render(i.getElem(n), n)
                        }), s.selectedShapes(t), r()
                    }
                }, u(c)
            },
            roomAction: function(e, n, t, a) {
                var o = {
                    title: a,
                    save: function() {
                        h.saveRoom()
                    },
                    undo: function() {
                        t(e)
                    },
                    redo: function() {
                        n(e)
                    }
                };
                u(o)
            },
            currentHandler: function() {
                return h
            }
        };
        return b
    }]), s.prototype.tryStartUpdate = function(e) {
        var n = this._$undo;
        return n.canSave || e ? (p(), !0) : (n.canSave || h("Access denied."), !1)
    }, s.prototype.doRequest = function(e) {
        var n = this._room,
            t = this._$http;
        return e(t, n).success(function(e) {
            return f(), n.modifiedAt = e.modifiedAt, r(n, e), e
        }).error(g)
    }, s.prototype.saveRoom = function(e) {
        this.tryStartUpdate() && this.doRequest(function(n, t) {
            return n.put(u + t._id, o.stringify(l(t, e)))
        })
    }, s.prototype.saveShapes = function(n) {
        this.tryStartUpdate() && this.doRequest(function(t, a) {
            return t.put(u + a._id + "/shapes", o.stringify(e.map(n, i)))
        })
    }, s.prototype.addShapes = function(n) {
        this.tryStartUpdate() && this.doRequest(function(t, a) {
            return t.post(u + a._id + "/shapes", o.stringify(e.map(n, i)))
        }).success(function(t) {
            e.each(t.shapeIds, function(e, t) {
                delete n[t].$$hashKey, n[t]._id = e, n[t].id = e
            })
        })
    }, s.prototype.removeShapes = function(n) {
        var t = e.map(n, function(e) {
            return e.id
        });
        this.tryStartUpdate() && this.doRequest(function(e, n) {
            return e({
                url: u + n._id + "/shapes",
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: o.stringify(t)
            })
        })
    }, s.prototype.save = function(n) {
        n.room || n.zones ? this.saveRoom() : e.some(n.addedShapes) ? this.addShapes(n.addedShapes) : e.some(n.removedShapes) ? this.removeShapes(n.removedShapes) : e.some(n.modifiedShapes) && this.saveShapes(n.modifiedShapes)
    }, n.factory("resourceHandlerFactory", ["$http", "$q", function(e, n) {
        return {
            createRoomHandler: function(t, a) {
                return new s(e, n, a, t)
            }
        }
    }])
}), define("roomModels", ["underscore", "utils2d", "utils", "numbers", "moment"], function(e, n, t, a, o) {
    function i(e, n) {
        return e = e || 0, t.clamp(e, -n / 2 + 10, n / 2 - 10)
    }

    function s(e) {
        var t, a;
        t = e.start.point, a = e.end.point, e.line = new n.Line(t, a), e.collinear = n.Point.collinearVect(t, a), e.normal = e.line.getNormal(), e.middle = n.Point.middlePoint(t, a), e.length = t.distance(a)
    }

    function r(t, a) {
        this._onNodeUpdated = a || e.noop, this.node = t, this.point = new n.Point(t)
    }

    function l(n) {
        function t() {
            return a.calculateArea()
        }
        var a = this;
        a.zone = n || {
            label: "Zone",
            nodes: []
        }, a.nodes = e.map(this.zone.nodes, function(e) {
            return new r(e, t)
        }), t()
    }

    function c(n, t) {
        this._roomId = t, this.zones = n, this.zoneModels = e.map(n, function(e) {
            return new l(e)
        })
    }

    function d(n, t, a) {
        return e.find(n.walls, function(e) {
            return e.start === t && e.end === a || e.start === a && e.end === t
        })
    }

    function m(e, n) {
        this.room = n, this.wall = e, this.start = n.edges[e.s], this.end = n.edges[e.e], this.updateProps()
    }

    function u(e) {
        var t, o, s, r, l, c, d, m, u;
        l = e.start.point, t = i(e.wall.guideOffset, e.length), a.closeTo(t, 0) ? e.round = {
            offset: 0,
            guide: e.middle
        } : (o = e.middle.getOffset(e.normal.getScale(t)), c = new n.Line(e.middle, o), d = n.Point.middlePoint(l, o), m = n.Line.perpendicularThrough(l, d, d), e.round = {
            offset: t,
            guide: o
        }, s = c.intersection(m), u = n.Line.perpendicularThrough(s, l, l), r = c.intersection(u), e.round.center = s, e.round.radius = l.distance(s), e.round.focus = r)
    }

    function p(e, t) {
        this.room = t, this.edge = e, this.point = new n.Point(e)
    }

    function f(n) {
        n.walls = e.filter(n.walls, function(e) {
            return e.s !== e.e
        })
    }

    function g(n) {
        var t = this;
        f(n), this.definition = n, this.edges = e.map(n.edges, function(e) {
            return new p(e, t)
        }), this.walls = e.map(n.walls, function(e) {
            return new m(e, t)
        })
    }

    function h(n, t, a) {
        return e.findIndex(n, function(e) {
            return e.wall.s === t && e.wall.e === a
        })
    }

    function v(e, n) {
        var t;
        return t = e.definition.walls.splice(n, 1), e.walls.splice(n, 1), e._paths = void 0, t[0]
    }

    function b(n, t, a) {
        return e.filter(n, function(e) {
            return e.start === t && e.end !== a
        })
    }

    function y(n) {
        for (var a, o, i, s = [], r = e.clone(n.walls); r.length > 0;) {
            for (o = r[0], r.splice(0, 1), a = [o], i = b(r, o.end, o.start); r.length > 0 && i.length > 0 && (o = i[0], t.remove(r, o), a.push(o), o.end !== a[0].start);) i = b(r, o.end, o.start);
            s.push(a)
        }
        return s
    }

    function k(a, o, i) {
        var s;
        return s = e.chain(a).filter(function(e) {
            return e.start.point.x !== e.end.point.x || e.start.point.y !== e.end.point.y
        }).map(function(e) {
            var a, i, s, r, l, c, d, m;
            if (a = e.start.point, i = e.end.point, s = e.line.orientedDistance(o), l = n.Line.perpendicularThrough(a, i, o), r = e.round, r && r.center) {
                if (t.sign(r.offset) === t.sign(s)) return {
                    wall: e,
                    distance: Math.abs(r.radius - r.center.distance(o)),
                    projection: o
                }
            } else if (c = l.intersection(e.line), t.strictlyBetween(c.x, a.x, i.x) || t.strictlyBetween(c.y, a.y, i.y)) return {
                wall: e,
                distance: Math.abs(s),
                projection: c
            };
            return d = a.distance(o), m = i.distance(o), d > m ? {
                wall: e,
                distance: m,
                projection: i
            } : {
                wall: e,
                distance: d,
                projection: a
            }
        }).min(function(e) {
            return e.distance
        }).value(), !i || s.distance < i ? s : void 0
    }
    return r.prototype.update = function(e) {
        this.point = e, this.node.x = e.x, this.node.y = e.y, this._onNodeUpdated(this)
    }, l.prototype.calculateArea = function() {
        var t, a = this;
        t = e.map(a.nodes, function(e) {
            return e.point
        }), a.area = n.area(t)
    }, l.prototype.add = function(e) {
        this.zone.nodes.push(e.node), this.nodes.push(e)
    }, l.prototype.remove = function(e) {
        t.remove(this.zone.nodes, e.node), t.remove(this.nodes, e)
    }, c.prototype.add = function(e) {
        this.zones.push(e.zone), this.zoneModels.push(e)
    }, c.prototype.remove = function(e) {
        t.remove(this.zones, e.zone), t.remove(this.zoneModels, e)
    }, c.prototype.updateInfoFromMatchingWalls = function(n) {
        e.each(this.zoneModels, function(t) {
            var a, o, i, s, r, l, c;
            for (e.each(t.nodes, function(t) {
                    t.closeRoomNode = e.find(n.edges, function(e) {
                        return e.point.distance(t.point) <= 1
                    })
                }), i = t.nodes.length, a = 0, o = i - 1; i > a; o = a, a++) c = t.nodes[o], l = t.nodes[a], s = l.closeRoomNode, r = c.closeRoomNode, s && r ? (l.matchingWall = d(n, s, r), l.matchingWall && (l.wallReversed = l.matchingWall.start === s)) : l.matchingWall = void 0
        })
    }, c.prototype.setResourcesModel = function(n, t) {
        this._resourcesModel = n, this._roomId = t, e.each(this.zoneModels, function(e) {
            e.resource = n.find(t, e.zone._id)
        })
    }, m.prototype.getGuideOffset = function() {
        return this.round ? this.round.offset : 0
    }, m.prototype.updateProps = function() {
        s(this), this.wall.round ? u(this) : (delete this.round, delete this.wall.guideOffset, delete this.wall.round)
    }, m.prototype.updateGuideOffset = function(e) {
        this.wall.round ? (this.wall.guideOffset = i(e, this.length), u(this)) : (delete this.round, delete this.wall.guideOffset, delete this.wall.round)
    }, p.prototype.update = function(e) {
        this.point = e, this.edge.x = e.x, this.edge.y = e.y, this.room.onEdgeUpdated(this)
    }, g.prototype.onEdgeUpdated = function(n) {
        e.each(this.wallsThrough(n), function(e) {
            e.updateProps()
        })
    }, g.getFloorPolygon = function(e) {
        var n = new g(e);
        return n.getFloorPolygon()
    }, g.prototype.getFloorPolygon = function() {
        var n, t;
        return n = this, t = this.definition.areas[0], e.map(t.edges, function(e) {
            return n.edges[e].point
        })
    }, g.prototype.edgeIndex = function(n) {
        return e.indexOf(this.edges, n)
    }, g.prototype.insertEdge = function(n, t) {
        var a = this.edges;
        e.isUndefined(t) && (t = this.edges.length), this.definition.edges.splice(t, 0, n), this.edges.splice(t, 0, new p(n, this)), e.each(this.walls, function(e) {
            e.wall.s >= t && e.wall.s++, e.wall.e >= t && e.wall.e++, e.start = a[e.wall.s], e.end = a[e.wall.e]
        }), e.each(this.definition.areas, function(e) {
            var n, a, o;
            for (o = e.edges, a = o.length, n = 0; a > n; n++) o[n] >= t && o[n]++
        })
    }, g.prototype.addEdge = function(e) {
        this.definition.edges.push(e), this.edges.push(new p(e, this))
    }, g.prototype.removeEdgeAt = function(n) {
        var t = this.edges;
        this.definition.edges.splice(n, 1), this.edges.splice(n, 1), e.each(this.walls, function(e) {
            e.wall.s > n && e.wall.s--, e.wall.e > n && e.wall.e--, e.start = t[e.wall.s], e.end = t[e.wall.e]
        }), e.each(this.definition.areas, function(e) {
            var t, a, o;
            for (o = e.edges, a = o.length, t = 0; a > t; t++) o[t] > n && o[t]--
        })
    }, g.prototype.removeEdge = function(e) {
        var n = this.edgeIndex(e);
        n >= 0 && this.removeEdgeAt(n)
    }, g.prototype.addWall = function(n, t) {
        var a;
        return a = e.isNumber(n) ? {
            s: n,
            e: t
        } : e.clone(n), this.definition.walls.push(a), this.walls.push(new m(a, this)), this._paths = void 0, a
    }, g.prototype.removeWall = function(n, t) {
        var a, o;
        return e.isNumber(n) ? a = n : (a = n.wall.s, t = n.wall.e), o = h(this.walls, a, t), o >= 0 ? v(this, o) : void 0
    }, g.prototype.wallsThrough = function(n) {
        return e.filter(this.walls, function(e) {
            return e.start === n || e.end === n
        })
    }, g.prototype.neighbourIndexes = function(n) {
        return e.map(this.wallsThrough(n), function(e) {
            return e.start === n ? e.wall.e : e.wall.s
        })
    }, g.prototype.getPaths = function() {
        return this._paths || (this._paths = y(this)), this._paths
    }, g.prototype.getClosestWallAndProjection = function(n, t) {
        var a;
        return a = e.filter(this.walls, function(e) {
            return !e.round
        }), k(a, n, t)
    }, g.prototype.getClosestProjection = function(e, n) {
        var t = k(this.walls, e, n);
        return t ? t.projection : void 0
    }, g.prototype.getClosestWall = function(e, n) {
        var t = k(this.walls, e, n);
        return t ? t.wall : void 0
    }, g.prototype.getBoundingBox = function() {
        var t = 200,
            a = n.boundingBox(e.map(this.edges, function(e) {
                return e.point
            }));
        return a.inflate(t / 2, t / 2)
    }, {
        RoomModel: g,
        NodeModel: r,
        ZoneModel: l,
        ZoneLayerModel: c
    }
}), define("tools-zoneService", ["jquery", "app", "underscore", "commands", "utils2d", "utils", "roomModels", "moment"], function(e, n, t, a, o, i, s, r) {
    var l, c;
    l = s.ZoneModel, c = s.NodeModel, n.factory("zoneService", ["$metrics", "$rootScope", "$undo", "$q", "selectionService", "$snap", "resourceService", "resourceHelperService", "availabilityService", "activityService", function(e, n, i, s, d, m, u, p, f, g) {
        function h() {
            n.$broadcast("room-changed")
        }

        function v(e, n) {
            var a;
            a = e.edges, k = t.map(a, function(e) {
                return e.point
            }), w = t.map(e.walls, function(e) {
                return e.line
            }), n && t.each(n.nodes, function(e) {
                var n = e.point;
                w.push(new o.Line(1, 0, -n.x)), w.push(new o.Line(0, 1, -n.y))
            })
        }

        function b(e) {
            var n;
            return n = t.find(k, function(n) {
                return e.distance(n) <= M
            }), n ? n : m.snapPoint(e, w)
        }

        function y(e, n) {
            return o.isPointInsidePoly(t.map(e.nodes, function(e) {
                return e.point
            }), n)
        }
        var k, w, M = 100;
        return {
            setup: function(e) {
                this.cleanup(e)
            },
            onMouseMove: function(e, n, t) {
                return e.lastNode && e.firstNode ? (t = b(t), e.lastNode.update(t), h(), !0) : !1
            },
            trySelect: function(e, n, a) {
                var o = t.find(e.zonesModel.zoneModels, function(e) {
                    return y(e, a)
                });
                return o ? (d.selectZone(o), !0) : (d.resetSelection(), !1)
            },
            onMouseDown: function(e, n, a) {
                return !e.firstNode && this.trySelect(e, n, a) ? !0 : (k && w || v(e.roomModel, e.zonesModel.currentZone), a = b(a), e.lastNode || (e.zonesModel.currentZone = new l, e.firstNode = new c(t.clone(a)), e.zonesModel.currentZone.add(e.firstNode)), e.lastNode && e.firstNode.point.x === a.x && e.firstNode.point.y === a.y ? this.finish(e) : (e.lastNode = new c(t.clone(a)), e.zonesModel.currentZone.add(e.lastNode), v(e.roomModel, e.zonesModel.currentZone), h()), !0)
            },
            finish: function(e) {
                e.zonesModel.currentZone.nodes.length > 3 && (e.zonesModel.currentZone.remove(e.lastNode), i.executeCommand(new a.AddZoneCommand(e.zonesModel, e.zonesModel.currentZone)), this.cleanup(e))
            },
            cancel: function(e) {
                this.cleanup(e)
            },
            cleanup: function(e) {
                e.firstNode = void 0, e.lastNode = void 0, e.zonesModel && (e.zonesModel.currentZone = void 0), h()
            },
            prepareSnap: function(e, n) {
                v(e, n)
            },
            cleanupSnap: function() {
                k = void 0, w = void 0
            },
            snapZoneNode: function(e) {
                return b(e)
            },
            deleteZone: function(e, n) {
                var t, o;
                n && (t = n.info && n.info.resource, o = s.resolve(), t && (o = u.tryDeleteResources(t).then(function() {
                    delete n.info.resource
                })), o.then(function() {
                    i.executeCommand(new a.RemoveZoneCommand(e, n))
                }))
            },
            initZoneResource: function(e, n, t, a, o, i) {
                var s, r, l, c, d;
                s = a.find(n, e.zone._id), s && (d = s.info && s.info.membership, l = d && d.plan && o.findById(d.plan), c = o.findById(s.targetPlan), e.info = {
                    resource: s,
                    plan: p.getPlanLabel(l, c, t, !0)
                }, this.updateZoneModelInfo(e, i, a), r = s.info = s.info || {}, r.zoneModel = e)
            },
            updateZoneModelInfo: function(e, n, a) {
                var o, i, s, l;
                l = l = r().startOf("day"), o = e.info.resource, i = o.info.membership, i ? (e.info.team = n.findById(i.team), e.info.status = f.getStatus(o, void 0, a), e.info.membership = i) : delete e.info.team, s = o.info && o.info.memberships, s && (e.info.activity = g.activity(s, "team_room"), e.info.futureActivity = t.filter(e.info.activity, function(e) {
                    return l.isBefore(e.date)
                }))
            }
        }
    }])
}), define("toolService", ["jquery", "app", "underscore", "commands", "utils2d", "dragHelper", "tools-zoneService"], function(e, n, t, a, o, i) {
    function s(e, n) {
        var a, o;
        if (2 === e.length) {
            if (a = [], o = [], t.each(e, function(e) {
                    e.start === n ? o.push(e.wall.e) : a.push(e.wall.s)
                }), 1 === o.length) return [{
                s: a[0],
                e: o[0]
            }];
            if (2 === o.length) return [{
                s: t.min(o),
                e: t.max(o)
            }];
            if (2 === o.length) return [{
                s: t.min(a),
                e: t.max(a)
            }]
        }
        return []
    }

    function r(e) {
        return {
            edge: {
                x: e.x,
                y: e.y
            },
            point: new o.Point(e)
        }
    }

    function l(e, n) {
        var t;
        return t = new o.Line(e, n), {
            start: r(e),
            end: r(n),
            line: t,
            collinear: o.Point.getCollinearVect(e, n),
            normal: t.getNormal(),
            middle: o.Point.middlePoint(e, n),
            length: e.distance(n)
        }
    }
    var c, d, m;
    c = {
        select: {
            title: "Selection Tool",
            icon: "fa fa-lg fa-location-arrow"
        },
        pan: {
            title: "Panning Tool",
            icon: "fa fa-lg fa-crosshairs"
        },
        wall: {
            title: "Walls Tool",
            icon: "fa fa-pencil fa-lg"
        },
        zone: {
            title: "Zone Tool",
            icon: "fa fa-lg fa-pencil-square-o"
        },
        measure: {
            title: "Measure Tool",
            icon: "fa fa-lg fa-arrows-h",
            hide: !0
        },
        adjustBackground: {
            title: "Adjust Background Tool",
            icon: "fa fa-lg fa-arrows-h",
            hide: !0
        },
        click: {
            title: "Click Tool",
            icon: "fa fa-lg fa-location-arrow",
            hide: !0
        }
    }, d = {
        selectBase: "select-tool",
        measureBase: "measure-tool",
        measureSecond: "measure-tool-second",
        measureCommit: "measure-tool-commit",
        wallBase: "wall-tool"
    }, m = {
        design: "design",
        manage: "manage"
    }, n.factory("toolService", ["zoomService", "wallService", "$rootScope", "$metrics", "$window", "selectionService", "measureService", "adjustBackgroundService", "zoneService", function(n, a, i, s, r, l, d, u, p) {
        function f() {
            return -1 != r.navigator.userAgent.indexOf("Mac OS X")
        }

        function g() {
            _ = "auto", I === c.pan || T ? _ = "move" : I === c.measure ? _ = "crosshair" : I === c.adjustBackground && (_ = "move"), e("#surface-background").css({
                cursor: _
            })
        }

        function h(e) {
            A = e
        }

        function v(e, n, t) {
            return I === c.measure ? (e.measureFirstPoint = void 0, e.measures = [], i.$broadcast("measures-changed")) : I === c.zone ? p.cleanup(e) : I === c.adjustBackground && u.cleanup(e), n && (I = n, g(), t || l.resetSelection()), I === c.zone && p.setup(e), I
        }

        function b(e) {
            n.pan(e, function() {
                T = !0, g()
            }, function() {
                T = !1, g()
            })
        }

        function y(e) {
            return A === m.design || e.isPrivate
        }

        function k(e) {
            return 0 === e.button && I === c.select && !e.shiftKey
        }

        function w(e) {
            return A == m.design && 0 === e.button && I === c.select && !e.shiftKey
        }

        function M(e) {
            return !(A != m.design || I !== c.select && I !== c.wall || e && (e.shiftKey || 0 !== e.button))
        }

        function S(e) {
            return A == m.design && 0 === e.button && (I === c.select || I === c.wall && !P(e) && !e.shiftKey)
        }

        function x(e, t) {
            var a = n.pageOffset(),
                i = e - a.left,
                r = t - a.top;
            return new o.Point(s.tom(i), s.tom(r))
        }

        function D(e) {
            (A === m.manage || !e.isDefaultPrevented() && (1 === e.button || I == c.pan || e.shiftKey)) && (b(e), e.preventDefault())
        }

        function P(e) {
            return f() && e.metaKey || !f() && e.ctrlKey
        }

        function C(e, n, a, o) {
            var s, r, d, m, u;
            switch (I) {
                case c.click:
                    var p, f, g, h, v, b;
                    b = a, v = t.chain(l.selectedShapes()).filter(function(e) {
                        return e.info && e.info.resource && "desk" === e.info.resource.type
                    }).first().value(), p = v && v.info && v.info.resource, f = b && b.info && b.info.resource, h = f && t.chain(f.info.memberships).max("startDate").value(), g = p && t.chain(p.info.memberships).max("startDate").value();
                    var M = {
                        unselectedMembership: g,
                        selectedMembership: h,
                        selectedResource: f,
                        selectedShape: a
                    };
                    i.$broadcast("click-shape", M);
                    break;
                case c.select:
                    k(e) && (s = l.selectedShapes(), t.contains(s, a) || (r = t.some(s, function(e) {
                        return e.isBound
                    }), d = !r && !a.isBound, m = P(e) && d, u = d && a.groupName ? t.filter(o, function(e) {
                        return e.groupName === a.groupName
                    }) : [a], t.any(u, y) && (l.selectShapes(u, m), w(e) && i.$broadcast("start-dragging-shape", e)), e.preventDefault()))
            }
        }

        function z(e, n) {
            var t, o;
            if (!e.isDefaultPrevented()) {
                if (t = x(e.pageX, e.pageY), 0 !== e.button || e.shiftKey) return;
                switch (n.tool) {
                    case c.select:
                        A === m.design ? a.trySelect(n.roomModel, t) ? e.preventDefault() : (n.$broadcast("start-rect-selection", e), e.preventDefault()) : (p.trySelect(n, e, t) || P(e) || l.resetSelection(), b(e), e.preventDefault());
                        break;
                    case c.pan:
                        b(e);
                        break;
                    case c.wall:
                        M(e) && (P(e) ? (o = l.selectedEdge(), o ? a.tryConnect(n.roomModel, t, o) || a.trySplit(n.roomModel, t, o) || a.createWallToPoint(n.roomModel, o, t) : a.trySplit(n.roomModel, t, o) || a.createEdge(n.roomModel, t)) : a.trySplit(n.roomModel, t, null) || l.resetSelection(), e.preventDefault());
                        break;
                    case c.measure:
                        n.measureFirstPoint ? d.endMeasure(n, t) : d.startMeasure(n, t), i.$broadcast("measures-changed"), e.preventDefault();
                        break;
                    case c.adjustBackground:
                        u.startMove(n, e, t);
                        break;
                    case c.zone:
                        p.onMouseDown(n, e, t) && e.preventDefault()
                }
            }
        }

        function $(e, n) {
            var t;
            e.isDefaultPrevented() || A === m.design && (t = x(e.pageX, e.pageY), n.tool === c.measure && n.measureFirstPoint ? (d.moveMeasure(n, t), i.$broadcast("measures-changed")) : n.tool === c.zone && p.onMouseMove(n, e, t) && e.preventDefault())
        }
        var I, _, T, A;
        return {
            onShapeMouseDown: C,
            surfaceBackgroundDown: z,
            surfaceBackgroundMove: $,
            surfaceDown: D,
            setTool: v,
            setMode: h,
            canSelect: k,
            canSelectShape: y,
            canManipulate: w,
            canManipulateRoom: M,
            canSelectEdge: S,
            cmdModifier: P,
            tools: c,
            allTools: t.values(c),
            cancelOperation: function(e) {
                return e.tool === c.zone && e.firstNode ? (p.cancel(e), !0) : e.tool === c.measure ? (d.cancel(e), !0) : !1
            }
        }
    }]), n.factory("measureService", ["$metrics", "$undo", "$rootScope", function(e, n, t) {
        return {
            startMeasure: function(e, n) {
                var t;
                e.measureFirstPoint = n, t = l(e.measureFirstPoint, n), e.measureLength = void 0, e.initialMeasureLength = void 0, e.measures.splice(0, 1, t)
            },
            endMeasure: function(e, n) {
                var t;
                t = l(e.measureFirstPoint, n), e.measures.splice(0, 1, t), e.measureLength = t.length, e.initialMeasureLength = t.length, e.measureFirstPoint = void 0
            },
            moveMeasure: function(e, n) {
                var t;
                t = l(e.measureFirstPoint, n), e.measures.splice(0, 1, t)
            },
            cancel: function(e) {
                e.measureFirstPoint = void 0, e.initialMeasureLength = e.measureLength = void 0, e.measures.splice(0, 1), t.$broadcast("measures-changed")
            }
        }
    }]), n.factory("adjustBackgroundService", ["$metrics", function(e) {
        function n(e) {
            e.adjustBackgroundMove ? e.adjustBackgroundMoving = t.clone(e.adjustBackgroundMove) : e.adjustBackgroundMoving = {
                offset: new o.Point,
                offsetPx: new o.Point
            }
        }

        function a(n, t) {
            var a, i, s;
            return a = n.adjustBackgroundMoving, i = n.adjustBackgroundMove, s = i ? i.offsetPx.offset(t) : t, a ? (a.offset = o.ptom(e, s), a.offsetPx = s, !0) : void 0
        }

        function s(e) {
            e.adjustBackgroundMove = e.adjustBackgroundMoving
        }

        function r(e) {
            delete e.adjustBackgroundMoving, delete e.adjustBackgroundMove
        }
        return {
            startMove: function(e, t) {
                i.trackDragOffsetWithStart(t, function() {
                    e.$apply(function() {
                        n(e)
                    })
                }, function(n) {
                    e.$apply(function() {
                        a(e, n)
                    })
                }, function() {
                    e.$apply(function() {
                        s(e)
                    })
                })
            },
            cleanup: r
        }
    }]), n.factory("wallService", ["$metrics", "$undo", "selectionService", function(e, n, o) {
        function i(e, t, o, i) {
            var s, r, l, c;
            t.wall.s + 1 === t.wall.e ? (s = t.wall.s + 1, r = t.wall.e + 1) : (s = e.edges.length, r = t.wall.e), c = [], c.push(new a.RemoveWallCommand(e, t.wall)), c.push(new a.InsertEdgeCommand(e, o, s)), c.push(new a.AddWallCommand(e, t.wall.s, s)), c.push(new a.AddWallCommand(e, s, r)), i && (l = e.edgeIndex(i), l >= s && (l += 1), c.push(new a.AddWallCommand(e, l, s))), n.executeCommand(new a.CompositeCommand(c, "Split wall."))
        }
        return {
            trySelect: function(n, t) {
                var a;
                return a = n.getClosestWall(t, e.tom(10)), a && o.selectWall(a), !!a
            },
            tryConnect: function(o, i, s) {
                var r, l, c;
                return r = t.min(o.edges, function(e) {
                    return e.point.distance(i)
                }), e.topx(r.point.distance(i)) < 10 ? (l = o.edgeIndex(s), c = o.edgeIndex(r), n.executeCommand(new a.AddWallCommand(o, l, c)), !0) : !1
            },
            trySplit: function(n, t, a) {
                var o;
                return o = n.getClosestWallAndProjection(t, e.tom(10)), o ? (i(n, o.wall, o.projection, a), !0) : !1
            },
            createWallToPoint: function(e, o, i) {
                var s = e.edges.length,
                    r = t.indexOf(e.edges, o),
                    l = [];
                l.push(new a.InsertEdgeCommand(e, i, s)), l.push(new a.AddWallCommand(e, r, s)), n.executeCommand(new a.CompositeCommand(l, "Add interior wall."))
            },
            createEdge: function(e, t) {
                var o = e.edges.length;
                n.executeCommand(new a.InsertEdgeCommand(e, t, o))
            },
            deleteEdge: function(e, o) {
                var i, r, l, c, d;
                d = [], i = e.wallsThrough(o), r = s(i, o), c = [], t.each(r, function(n) {
                    c.push(new a.AddWallCommand(e, n.s, n.e)), d.push(e.edges[n.s]), d.push(e.edges[n.e])
                });
                var m = [];
                t.each(i, function(n) {
                    var i, s;
                    c.push(new a.RemoveWallCommand(e, n.wall)), i = n.start === o ? n.end : n.start, s = e.wallsThrough(i), 1 !== s.length || t.contains(d, i) || m.push(i)
                }), l = t.indexOf(e.edges, o), m.push(o), t.chain(m).map(e.edges.indexOf, e.edges).sortBy(t.identity).reverse().each(function(n) {
                    c.push(new a.RemoveEdgeCommand(e, n))
                }), n.executeCommand(new a.CompositeCommand(c, "Delete edge."))
            },
            deleteWall: function(e, t) {
                var o;
                o = [new a.RemoveWallCommand(e, t.wall)], n.executeCommand(new a.CompositeCommand(o, "Delete wall."))
            }
        }
    }])
}), define("zoomService", ["jquery", "app", "underscore", "commands", "utils2d", "dragHelper"], function(e, n, t, a, o, i) {
    n.factory("zoomService", ["$metrics", function(n) {
        function a(e, t) {
            g = new S(e, t), h.css({
                left: e,
                top: t
            }), n.setPageOffset(g)
        }

        function s(e, t, o, i) {
            var s, r, l;
            s = n.getPageBox(), r = b * e - s.width * o - s.x, l = y * t - s.height * i - s.y, a(r, l)
        }

        function r() {
            v && (b = v.width(), y = v.height())
        }

        function l(e, a, o) {
            var i, r, l, c;
            return i = n.getPageBox(), t.isUndefined(a) && (a = .5), t.isUndefined(o) && (o = .5), r = a * b - g.x - i.x, l = o * y - g.y - i.y, c = e, n.setZoom(c), s(a, o, r / i.width, l / i.height), c
        }

        function c(e, a) {
            var i, r, l, c;
            return e && a && (c = a.getBoundingBox(), t.each(e.zones, function(e) {
                c = c.union(o.boundingBox(e.nodes))
            }), l = e.background, l && l.show && (c = c.union(new o.Rect(0, 0, l.width, l.height))), n.resetPage(), n.updatePageBox(c)), r = n.getPageBoxM(), i = Math.min(y * n.baseMilimetersPerPixel * 100 / r.height, b * n.baseMilimetersPerPixel * 100 / r.width), n.setZoom(i), s(.5, .5, .5, .5), w = Math.min(w, i / 2), i
        }

        function d(e, n) {}

        function m(e, n, a) {
            var i, s = new S;
            t.each(n.edges, function(e) {
                i = o.rotate(e.point, s, 90), e.update(i)
            }), t.each(e, function(e) {
                i = o.rotate(new S(e.cx, e.cy), s, 90), e.cx = i.x, e.cy = i.y, e.rotate -= 90
            }), t.each(a.zoneModels, function(e) {
                t.each(e.nodes, function(e) {
                    i = o.rotate(e.point, s, 90), e.update(i)
                })
            })
        }

        function u(e, n, t) {
            var o = new S(g);
            i.trackDragOffsetWithStart(e, n, function(e) {
                a(o.x + e.x, o.y + e.y)
            }, t)
        }

        function p(e, n, t) {
            return l(Math.max(w, Math.min(M, e)), n, t)
        }

        function f(e, n) {
            var t, a, i, s;
            return t = o.sign(e.deltaY) * k, a = v.offset(), i = e.pageX - a.left, s = e.pageY - a.top, e.preventDefault(), p(10 * Math.ceil((n + t) / 10), i / b, s / y)
        }
        var g, h, v, b, y, k = 10,
            w = 5,
            M = 150,
            S = o.Point;
        return {
            zoom: l,
            fit: c,
            center: function() {
                s(.5, .5, .5, .5)
            },
            pan: u,
            relativeZoom: p,
            wheel: f,
            rotate: m,
            position: function() {
                return g
            },
            fitBackground: d,
            pageOffset: function() {
                return h.offset()
            },
            surfaceOffset: function() {
                return v.offset()
            },
            surfacePosition: function() {
                return v.position()
            },
            updateViewport: r,
            init: function() {
                var t;
                v = e("#design-surface"), h = e(".design-page"), t = n.getPageOffset(), h.css({
                    left: t.x,
                    top: t.y
                }), r()
            }
        }
    }]), n.directive("ngMousewheel", ["$parse", function(e) {
        return {
            restrict: "A",
            link: function(n, t, a) {
                var o = e(a.ngMousewheel),
                    i = function(e) {
                        n.$apply(function() {
                            o(n, {
                                $event: e
                            })
                        })
                    };
                t.on("mousewheel", i), n.$on("$destroy", function() {
                    t.off("mousewheel")
                })
            }
        }
    }])
}), define("commandsService", ["jquery", "app", "underscore", "commands", "utils"], function(e, n, t, a, o) {
    n.factory("commandsService", ["$rootScope", "$undo", "$metrics", "$render", "selectionService", "shapeService", function(e, n, i, s, r, l) {
        function c(n, a) {
            t.each(a, function(e) {
                n.shapes.push(e)
            }), e.$broadcast("shapes-changed", a, void 0)
        }

        function d(n, a) {
            t.each(a, function(e) {
                g(n.shapes, e)
            }), e.$broadcast("shapes-changed", void 0, a)
        }

        function m(e) {
            var n = l.getElem(e);
            s.render(n, e)
        }

        function u(e, o, i) {
            var s, r, l;
            e && (s = t.map(e, function(e) {
                return e.scale = e.scale || {
                    x: 1,
                    y: 1
                }, l = {
                    scale: t.clone(e.scale)
                }, o && (l.scale.x = -e.scale.x), i && (l.scale.y = -e.scale.y), new a.ChangeShapeCommand(e, l, e, m, ["rotate", "scale"])
            }), r = new a.CompositeCommand(s, "Change shapes"), n.executeCommand(r))
        }

        function p(e) {
            var n, a, o, i = r.selectedShapes();
            i.length > 0 && (o = (new Date).getTime(), n = t.map(i, function(e) {
                return a = t.clone(e), delete a.uid, delete a._id, delete a.info, a.groupName && (a.groupName += o), a.isBound || (a.cx += h, a.cy += h), a
            }), v(e, n))
        }

        function f(e, n) {
            b(e, n)
        }
        var g = o.remove,
            h = 100,
            v = function(e, a) {
                var o = t.isArray(a) ? a : [a];
                n.addShapesCommand(e, o, c, d)
            },
            b = function(e, a) {
                var o = t.isArray(a) ? a : [a];
                n.removeShapesCommand(e, o, d, c)
            };
        return {
            flip: u,
            duplicateSelected: p,
            deleteShapes: f,
            removeShapeCommand: b,
            addShapeCommand: v
        }
    }])
}), define("s3Service", ["underscore", "aws"], function(e, n) {
    function t() {
        n.config.update({
            accessKeyId: l,
            secretAccessKey: c
        }), n.config.region = d
    }

    function a(e) {
        return new n.S3({
            params: {
                Bucket: e
            }
        })
    }

    function o() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
    }

    function i(e, n, o) {
        var i, s;
        t(), i = a(u), s = {
            Key: n,
            ContentType: e.type,
            Body: e,
            ServerSideEncryption: m
        }, i.putObject(s, function(e, t) {
            e ? o("Unable to upload file (" + e + ")") : o(null, p + n)
        })
    }

    function s(e) {
        return e && e.type ? e.type.split("/")[1] : null
    }

    function r(e, n, t, a) {
        var r;
        r = s(e), r ? i(e, "user-resources/" + n + "/" + t + "-" + o() + "." + r, a) : a("Invalid file selected")
    }
    var l = "AKIAIAYI7SDSXW4XDHNQ",
        c = "VgCnPULGGnkr5faebd+M5ow8t+T450srkm9Oc3FO",
        d = "eu-west-1",
        m = "AES256",
        u = "officernd-resources",
        p = "//officernd-resources.s3-eu-west-1.amazonaws.com/";
    return {
        uploadUserResource: r
    }
}), define("fileUpload", ["underscore", "app", "alert", "s3Service"], function(e, n, t, a) {
    n.directive("fileModel", [function() {
        return {
            restrict: "A",
            scope: {
                fileModel: "="
            },
            link: function(e, n) {
                n.on("change", function() {
                    e.$apply(function() {
                        e.fileModel = n[0].files[0]
                    })
                }), e.$on("$destroy", function() {
                    n.off("change")
                })
            }
        }
    }]), n.directive("filePicked", [function() {
        return {
            restrict: "A",
            scope: {
                callback: "&filePicked"
            },
            link: function(e, n) {
                n.on("change", function() {
                    e.$apply(function() {
                        e.callback({
                            $file: n[0].files[0]
                        }), n.wrap("<form>").closest("form").get(0).reset(), n.unwrap()
                    })
                }), e.$on("$destroy", function() {
                    n.off("change")
                })
            }
        }
    }]), n.factory("s3Upload", ["$rootScope", "$q", function(e, n) {
        return {
            userResource: function(t, o, i) {
                var s = n.defer();
                return a.uploadUserResource(t, o, i, function(n, t) {
                    e.safeApply(function() {
                        n ? s.reject(n) : s.resolve(t)
                    })
                }), s.promise
            },
            profilePicture: function(e, n) {
                var t;
                return t = n.emails[0].toLowerCase().replace(/[^\w ]+/g, "_").replace(/ +/g, "-"), this.userResource(e, "users", t)
            }
        }
    }]), n.factory("importHelper", ["$q", "$rootScope", function(e, n) {
        return {
            loadImage: function(t) {
                var a, o;
                return o = new Image, a = e.defer(), o.onload = function() {
                    n.$apply(function() {
                        a.resolve({
                            uri: t,
                            width: o.width,
                            height: o.height
                        })
                    })
                }, o.src = t, a.promise
            }
        }
    }])
}), define("labelsService", ["underscore", "app"], function(e, n) {
    function t() {
        o = e.indexBy(i, "name")
    }
    var a, o, i;
    a = "#f0f4f7", n.factory("labelsService", [function() {
        return {
            initialize: function(e) {
                i = e, t()
            },
            getLabelsList: function() {
                return i
            },
            type: function(e) {
                var n;
                return o && (n = o[e]), n && n.type
            },
            getColor: function(e) {
                var n;
                return o && (n = o[e]), n ? n.color : a
            }
        }
    }])
}), define("galleryService", ["underscore", "app"], function(e, n) {
    function t(n, t) {
        var a, o;
        return o = t[l], a = e.findIndex(n.elements, function(e) {
            return e.template === l
        }), o && a > -1 ? e.map(o, function(t) {
            var o, i;
            return o = e.omit(n, ["elements"]), o.elements = e.map(n.elements, function(n) {
                return n.template === l ? e.extend(e.clone(n), t) : n
            }), i = o.elements[a], o.title = o.titleTemplate.replace(/{main}/g, i.title), o.width = i.width, o.height = i.height, o
        }) : [n]
    }

    function a(n, t) {
        var a;
        return a = t[n.template], a ? e.map(a, function(t) {
            return e.extend(e.clone(n), t)
        }) : [n]
    }

    function o(n, o) {
        var i;
        return i = e.groupBy(o, "template"), e.chain(n).map(function(e) {
            return e.elements ? t(e, i) : a(e, i)
        }).flatten().value()
    }
    var i, s, r, l;
    l = "#small-desk-template", s = "css/shapes-{theme}.css", r = "templates.html", i = ["name", "description", "group", "isBound", "isPrivate", "tags", "layer", "snapAt", "snapOffset", "reversed", "price", "stations"], n.factory("galleryService", [function() {
        var n, t, a, s, c;
        return {
            initialize: function(n, t) {
                s = n, this.mainShape = e.find(s.shapes, function(e) {
                    return e.template === l
                }), a = e.first(s.shapes), this.updateGallery(t), this.initialized = !0
            },
            updateGallery: function(a) {
                var i;
                a = a || [], c = a.length > 0 ? o(s.shapes, a) : s.shapes, t = e.indexBy(c, "template"), n = e.map(s.categories, function(n) {
                    var t;
                    return t = e.map(n.categories, function(e) {
                        return {
                            name: e,
                            shapes: []
                        }
                    }), {
                        name: n.name,
                        categories: t
                    }
                }), i = e.chain(n).map(function(e) {
                    return e.categories
                }).flatten().indexBy("name").value(), e.each(c, function(n) {
                    e.each(n.categories, function(e) {
                        var t;
                        t = i[e], t && t.shapes.push(n)
                    })
                })
            },
            initialized: !1,
            categories: function() {
                return n
            },
            shapeById: function(e) {
                return t[e] || a
            },
            applyPrototypeProperties: function(n) {
                var t;
                t = this.shapeById(n.template), e.extend(n, e.pick(t, i))
            },
            templatesPath: function() {
                return s.assets + r
            }
        }
    }])
}), define("designerTour", ["underscore", "app", "jquery", "introjs", "utils"], function(e, n, t, a, o) {
    function i(n) {
        e.each(n, function(e) {
            e.introTemplate && !e.intro && (e.intro = t(e.introTemplate).html())
        })
    }

    function s(e) {
        return i(e), a().setOptions(d).setOptions({
            steps: e
        })
    }

    function r(e) {
        var n;
        return n = e.getItem("tour-states"), n ? JSON.parse(n) : {}
    }

    function l(e, n, t) {
        var a, o;
        return a = r(n), e && (o = e.tourStates), o = o || {}, o[t] || a[t]
    }

    function c(n, t) {
        var a;
        return "" === t.id ? e.findIndex(n, function(e) {
            return !e.element
        }) + 1 : (a = "#" + t.id,
            e.findIndex(n, function(e) {
                return e.element === a
            }) + 1)
    }
    var d, m = "general-designer";
    d = {
        showStepNumbers: !1,
        showProgress: !0,
        showBullets: !1,
        skipLabel: "Hide",
        doneLabel: "Finish",
        exitOnEsc: !0,
        exitOnOverlayClick: !1,
        disableInteraction: !1
    }, n.factory("tourDataService", ["$window", "$http", "apiRoot", function(e, n, t) {
        function a(a, i, s, l) {
            var c;
            c = r(i), c[s] = l, i.setItem("tour-states", JSON.stringify(c)), a && (a.tourStates = a.tourStates || {}, a.tourStates[s] = l, n.put(o.joinPath(t, "profiles", e.user._id, "tours", s), l).then(function(e) {}))
        }
        return {
            tourState: function(n, t) {
                return t ? void a(e.user, e.localStorage, n, t) : l(e.user, e.localStorage, n)
            },
            removeState: function(n) {
                a(e.user, e.localStorage, n, void 0)
            }
        }
    }]), n.directive("contextualHelp", [function() {
        return {
            restrict: "E",
            replace: !0,
            template: '<div class="help-segment"></div>',
            scope: {
                contentsSelector: "@"
            },
            link: function(e, n) {
                n.html(t(e.contentsSelector).html())
            }
        }
    }]), n.factory("designerTourService", ["tourDataService", "analyticsService", function(e, n) {
        function t() {
            a || (a = s(o).onchange(function(n) {
                e.tourState(m, {
                    state: "pending",
                    step: c(o, n)
                })
            }).onexit(function() {
                e.tourState(m, {
                    state: "cancelled"
                }), n.trackEvent("General Designer Tour: Cancelled")
            }).oncomplete(function() {
                e.tourState(m, {
                    state: "completed"
                }), n.trackEvent("General Designer Tour: Completed")
            }))
        }
        var a, o;
        return o = [{
            introTemplate: "#general-designer-welcome"
        }, {
            element: "#layers-properties",
            introTemplate: "#layers-designer-properties",
            position: "right"
        }, {
            element: "#tools-list",
            introTemplate: "#general-designer-tools",
            position: "right"
        }, {
            element: "#shapes-toolbox",
            introTemplate: "#general-designer-toolbox",
            position: "right"
        }, {
            element: "#designer-property-editor",
            introTemplate: "#general-designer-properties",
            position: "left"
        }], {
            tourId: m,
            startGeneral: function() {
                t(), a.start()
            },
            resumeGeneral: function(e) {
                t(), a.goToStep(e).start()
            }
        }
    }])
}), define("designer/controller", ["underscore", "app", "jquery", "alert", "utils", "utils2d", "roomModels", "dragHelper"], function(e, n, t, a, o, i, s, r) {
    var l = "Furniture",
        c = s.RoomModel,
        d = s.ZoneLayerModel,
        m = i.Point,
        u = "design",
        p = ["template", "width", "height", "title"];
    n.controller("DesignerController", ["$rootScope", "$location", "$scope", "$stateParams", "$state", "$http", "$metrics", "shapeService", "selectionService", "$render", "$snap", "$undo", "rulersService", "toolService", "wallService", "zoneService", "zoomService", "commandsService", "s3Upload", "labelsService", "galleryService", "designerTourService", "tourDataService", "importHelper", "viewPropertiesService", "data", "$q", "floorplanService", "resourceService", function(n, o, s, r, f, g, h, v, b, y, k, w, M, S, x, D, P, C, z, $, I, _, T, A, E, R, B, O, L) {
        function U(n) {
            var t, a;
            t = e.partition(n, function(n) {
                return e.contains(n.tags, "layer-floor")
            }), a = e.partition(t[1], function(n) {
                return e.contains(n.tags, "layer-ceiling")
            }), s.floorShapes = t[0], s.ceilingShapes = a[0], s.furnitureShapes = e.sortBy(a[1], "layer"), s.furniture = e.chain(s.furnitureShapes).groupBy(function(e) {
                return (e.title || e.name).toString()
            }).map(function(e) {
                var n = e[0];
                return {
                    name: n.title || n.name,
                    price: n.price,
                    count: e.length,
                    stations: n.stations
                }
            }).value()
        }

        function F(n) {
            e.each(n, function(e) {
                I.applyPrototypeProperties(e)
            })
        }

        function N() {
            var e = s.view.mode;
            "design" === e && j()
        }

        function q() {
            s.labels = e.filter(s.org.labels, function(n) {
                return e.find(s.room.zones, function(e) {
                    return e.type == n.name
                })
            })
        }

        function j() {
            var e;
            e = T.tourState(_.tourId), e ? "completed" !== e.state && "cancelled" !== e.state && _.resumeGeneral(e.step) : _.startGeneral()
        }

        function H() {
            var e;
            e = s.owner ? u : "preview", s.view = E.getModel(o.search(), e), s.view.mode = u, "preview" === e && J(S.tools.pan), S.setMode(u)
        }

        function W() {
            a.error("Unable to load the floorplan.")
        }

        function Z(n) {
            var t = e.chain(n).map(function(e) {
                return ae.resourcesModel.find(s.room._id, e.id)
            }).compact().value();
            return L.tryDeleteResources(t)
        }

        function V() {
            var n = s.room._id;
            R.get("org", "resourcesModel", "plansModel", "teamsModel").spread(function(t, a, o, i) {
                ae.resourcesModel = a, ae.plansModel = o, ae.teamsModel = i, ae.currency = t.settings.billing.currency, e.each(s.room.shapes, function(e) {
                    var t = a.find(n, e.id);
                    t && v.initDeskResource(e, t)
                }), e.each(s.zonesModel.zoneModels, function(e) {
                    D.initZoneResource(e, n, ae.currency, ae.resourcesModel, ae.plansModel, ae.teamsModel)
                })
            })
        }

        function G() {
            s.room.background.uri && (s.backgroundSize = {
                width: h.topx(s.room.background.width),
                height: h.topx(s.room.background.height)
            })
        }

        function K() {
            s.room.background.uri && (s.backgroundLocation = {
                x: h.topx(s.room.background.x || 0),
                y: h.topx(s.room.background.y || 0)
            })
        }

        function Y() {
            var e, n, t, a;
            t = s.room.background.x || 0, a = s.room.background.y || 0, e = s.room.background.width, n = s.room.background.height, h.updatePageBox(new i.Rect(t, a, e, n))
        }

        function X() {
            var n, t, a, o;
            n = s.room.background, t = n.width, a = n.height, o = s.roomModel.edges, e.some(s.room.shapes) || 4 !== o.length || (o[0].update(new m(0, 0)), o[1].update(new m(t, 0)), o[2].update(new m(t, a)), o[3].update(new m(0, a)))
        }

        function J(e) {
            s.tool !== e && ((s.tool === s.tools.measure || e === s.tools.measure) && n.$broadcast("canvas-resize"), s.tool = S.setTool(s, e))
        }

        function Q(e) {
            s.owner && (e ? (ee = s.pane, s.setPane("shape-settings")) : void 0 === ee && (s.setPane(ee), ee = null))
        }
        var ee, ne, te = t("#drag-adorner"),
            ae = this;
        ne = B.defer(), f.current.data = f.current.data || {}, s.category = l, s.viewPropDefs = E.definitions, s.groupedViewProps = e.groupBy(s.viewPropDefs, "category"), s.propDefsByName = e.indexBy(s.viewPropDefs, "name"), s.draggedShapes = [], s.designerGlobal = {}, s.initializeGallery = function(n, t) {
            var a;
            I.initialize(t.gallery, t.redefinitions), a = I.categories(), s.categories = a, s.majorCategories = e.pluck(a, "name"), s.templatesPath = I.templatesPath(), F(n)
        }, s.initializePerm = function(e) {
            w.canSave = s.owner = e >= 3
        }, s.initializeRoom = function(n) {
            return "manage" === f.current.data.mode && n.background && n.background.uri && !n.background.measured ? void s.openDesigner() : (s.room = n, w.setCurrentRoom(n), b.resetSelection(), n.background = n.background || {}, s.roomModel = new c(n.definition), s.zonesModel = new d(n.zones), H(), k.updateShapes(n.shapes), e.each(n.shapes, function(e) {
                v.updateShapeTitle(e)
            }), U(n.shapes), s.search = r.s, P.init(), s.fit(), void(s.room.background && s.room.background.uri && !s.room.background.measured && (s.view.background = !0, s.measureImage())))
        }, s.isFilterSelected = function(e, n) {
            var t = s.search;
            return t ? t.toLocaleLowerCase() === e.toLocaleLowerCase() + ":" + n.toLocaleLowerCase() : void 0
        }, O.load(s).then(function() {
            return R.get("org").then(function(e) {
                v.initializeTemplate(e.deskTemplate), q()
            })
        }).then(function() {
            return ne.promise
        }).then(function() {
            P.init(), N(), V()
        }).then(null, W), s.shouldShowProperty = function(n) {
            return function(t) {
                return e.contains(t.showIn, n)
            }
        }, s.isText = function(e) {
            return e && v.isText(e)
        }, s.undo = function() {
            w.undo()
        }, s.redo = function() {
            w.redo()
        }, s.zoomIn = function() {
            s.setZoom(10 * Math.floor(s.zoomLevel / 10) + 10)
        }, s.zoomOut = function() {
            s.setZoom(10 * Math.floor(s.zoomLevel / 10) - 10)
        }, s.fit = function() {
            n.$broadcast("canvas-resize"), s.zoomLevel = P.fit(s.room, s.roomModel, s.zoomLevel)
        }, s.rotate = function() {
            b.resetSelection(), P.rotate(s.room.shapes, s.roomModel, s.zonesModel), s.fit()
        }, s.deleteSelected = function() {
            var e, n, t, a;
            if (S.cancelOperation(s)) return !0;
            if (w.canSave) {
                if (n = b.selectedWall(), t = b.selectedEdge(), e = b.selectedShapes(), a = b.selectedZone(), e.length > 0) Z(e).then(function() {
                    C.deleteShapes(s.room, e)
                });
                else if (t) x.deleteEdge(s.roomModel, t);
                else if (n) x.deleteWall(s.roomModel, n);
                else {
                    if (!a) return !1;
                    D.deleteZone(s.zonesModel, a)
                }
                return !0
            }
            return !1
        }, s.confirm = function() {
            return s.zonesModel.currentZone ? (D.finish(s), !0) : !1
        }, s.cancel = function() {
            return S.cancelOperation(s)
        }, s.duplicateSelected = function() {
            w.canSave && C.duplicateSelected(s.room)
        }, s.setPane = function(e) {
            s.pane = e, setTimeout(function() {
                n.$broadcast("canvas-resize")
            }, 0)
        }, s.togglePane = function(e) {
            s.setPane(s.pane === e ? void 0 : e)
        }, s.flip = function(e, n) {
            C.flip(s.selectedItems, e, n)
        }, s.autoSaveRoom = function() {
            w.canSave && w.currentHandler().saveRoom()
        }, s.rotate = function() {
            var t = new m(0, 0),
                a = -90,
                o = s.roomModel,
                r = s.room.shapes;
            e.each(r, function(e) {
                var n = i.rotate(new m(e.cx, e.cy), t, a),
                    o = v.getElem(e);
                e.cx = n.x, e.cy = n.y, e.rotate += a, y.render(o, e)
            }), e.each(o.edges, function(e) {
                e.update(i.rotate(e.point, t, a))
            }), e.each(s.zonesModel.zoneModels, function(n) {
                e.each(n.nodes, function(e) {
                    e.update(i.rotate(e.point, t, a))
                })
            }), n.$broadcast("room-changed")
        }, s.save = function() {
            w.currentHandler().saveRoom(!0)
        }, s.measures = [], s.chooseImage = function() {
            t("#backgroundUpload").click()
        }, s.backgroundFilePicked = function(e) {
            e && (s.uploadingBackground = !0, s.view.background = !1, z.userResource(e, "room-background", s.room.id).then(function(e) {
                return A.loadImage(e)
            }, function() {
                a.error("We have a problem uploading the floorplan.")
            }).then(function(e) {
                s.room.background.uri = e.uri, s.room.background.width = h.tom(e.width), s.room.background.height = h.tom(e.height), s.room.background.measured = !1, s.uploadingBackground = !1, s.view.background = !0, s.autoSaveRoom(), Y(), G(), K(), s.measureImage()
            }))
        }, s.measureImage = function() {
            J(S.tools.measure)
        }, s.moveImage = function() {
            J(S.tools.adjustBackground)
        }, s.saveBackgroundOffset = function() {
            var e, n;
            n = s.room.background, n.uri && s.adjustBackgroundMove && (e = s.adjustBackgroundMove.offset, n.x = e.x, n.y = e.y, X(), s.autoSaveRoom(), Y(), K(), J(S.tools.select))
        }, s.measureLengthSubmit = function() {
            if (s.room.background.uri) {
                var e = s.measureLength / s.initialMeasureLength;
                s.room.background.width = e * s.room.background.width, s.room.background.height = e * s.room.background.height, s.room.background.measured = !0, X(), s.autoSaveRoom(), Y(), G(), J(S.tools.select), n.$broadcast("room-changed")
            }
        }, s.$on("zoom-changed", function() {
            G(), K()
        }), s.startDrag = function(n) {
            var t, a, o = P.surfacePosition(),
                i = P.position();
            return te.css({
                left: i.x + o.left + 1,
                top: i.y + o.top
            }), n.elements ? (t = Math.random(), s.draggedShapes = e.map(n.elements, function(n) {
                var a;
                return a = e.extend(e.clone(I.shapeById(n.template)), n), a.groupName = t, a.rotate = n.rotate || 0, a
            })) : (a = e.clone(n), e.indexOf(a.tags, "text") > -1 && (a.label = "Text"), s.draggedShapes.push(a)), e.each(s.draggedShapes, function(e) {
                delete e.uid, delete e._id, delete e.id, e.rotate = e.rotate || 0
            }), s.designerGlobal.isDragging = !0, s.draggedShapes
        }, s.endDrag = function(t) {
            var a = t.data,
                o = t.currentResult;
            o && C.addShapeCommand(s.room, a), n.safeApply(s, function() {
                e.each(s.draggedShapes, function(e) {
                    delete e.ox, delete e.oy, v.updateShapeTitle(e)
                }), s.draggedShapes = [], s.designerGlobal.isDragging = !1
            }), J(S.tools.select)
        }, s.surfaceMouseWheel = function(e) {
            s.zoomLevel = P.wheel(e, s.zoomLevel)
        }, s.setZoom = function(e) {
            s.zoomLevel = P.zoom(parseInt(e, 10))
        }, s.surfaceDown = function(e) {
            S.surfaceDown(e, s.tool)
        }, s.surfaceBackgroundDown = function(e) {
            S.surfaceBackgroundDown(e, s)
        }, s.surfaceBackgroundMove = function(e) {
            S.surfaceBackgroundMove(e, s)
        }, s.getPointOnPage = function(e, n) {
            var t = P.surfaceOffset(),
                a = P.position();
            return new m(e - t.left - a.x, n - t.top - a.y)
        }, s.dragMove = function(t, a, o) {
            var r, l, c, d, m, u;
            return r = o.data, l = P.surfaceOffset(), c = s.getPointOnPage(t, a), m = i.ptom(h, c), d = t >= l.left && a > l.top, e.each(r, function(t) {
                var a, o, i;
                a = v.getElem(t), o = t.ox || 0, i = t.oy || 0, u = {
                    cx: m.x + o,
                    cy: m.y + i
                }, d && t.isBound && (u = k.snapBoundShape(t, m)), a && y.render(a, u, t), n.safeApply(s, function() {
                    e.extend(t, u)
                })
            }), d
        }, s.setIsDragging = function(e) {
            s.isDragging = e
        }, s.selectShape = function(e) {
            b.selectShapes(e)
        }, s.selectZone = function(e) {
            b.selectZone(e)
        }, s.zoneColor = $.getColor, s.initRedefinitions = function() {
            var n;
            delete s.editedRedefinition, delete s.editedRedefinitionIndex, s.org && (s.galleryRedefinitions = e.clone(s.org.galleryRedefinitions)), n = I.mainShape, s.defaultRedefinition = e.pick(n, p), s.defaultRedefinition.title = n.name
        }, s.prepareAddRedefinition = function() {
            s.editedRedefinition = e.pick(s.defaultRedefinition, p), s.editedRedefinitionIndex = -1
        }, s.prepareEditRedefinition = function(n) {
            s.editedRedefinition = e.pick(s.galleryRedefinitions[n], p), s.editedRedefinitionIndex = n
        }, s.deleteRedefinition = function(e) {
            s.galleryRedefinitions.splice(e, 1)
        }, s.submitEditedRedefinition = function() {
            s.editedRedefinition && (-1 === s.editedRedefinitionIndex ? s.galleryRedefinitions.push(s.editedRedefinition) : s.galleryRedefinitions.splice(s.editedRedefinitionIndex, 1, s.editedRedefinition)), delete s.editedRedefinition, delete s.editedRedefinitionIndex
        }, s.redefinitionsFormKeyDown = function(e) {
            27 == e.keyCode && (s.cancelEditRedefinition(), e.preventDefault())
        }, s.cancelEditRedefinition = function() {
            delete s.editedRedefinition, delete s.editedRedefinitionIndex
        }, s.commitRedefinitions = function() {
            s.org && g.put(s.API_ORG + s.org.id + "/redefinitions", s.galleryRedefinitions).success(function() {
                s.org.galleryRedefinitions = s.galleryRedefinitions, I.updateGallery(s.galleryRedefinitions), s.categories = e.clone(I.categories()), a.ok("Successfully updated the gallery.")
            }).error(function() {
                a.error("Unable to update the gallery.")
            })
        }, s.setTool = J, s.openManager = function() {
            f.go("organization.office.floorplan", {
                office: s.office.slug,
                roomSlug: s.room.slug
            })
        }, s.openExport = function() {
            s.$broadcast("open-export")
        }, s.$on("select-shapes", function(n, t) {
            Q(t.length > 0), s.selectedItems = t, s.selectedItemsGrouped = e.groupBy(t, "name")
        }), s.$on("canvas-resize", function() {
            P.updateViewport()
        }), s.$on("select-wall", function() {
            s.selectedWall = b.selectedWall(), Q(s.selectedWall)
        }), s.$on("select-zone", function() {
            s.selectedZone = b.selectedZone(), Q(s.selectedZone)
        }), e.each(s.viewPropDefs, function(e) {
            var n = E.getUpdateLocation(e, function() {
                return s.view
            });
            n(), s.$watch("view." + e.name, n)
        }), s.$on("shape-templates-loaded", function() {
            ne.resolve()
        }), s.$on("shapes-changed", function(e, n) {
            b.selectShapes(n), U(s.room.shapes)
        }), s.$on("$destroy", function() {
            b.resetSelection()
        }), s.toolsList = S.allTools, s.tools = S.tools, J(S.tools.select)
    }])
}), define("designer/manageController", ["underscore", "app", "jquery", "alert", "utils", "moment", "roomModels"], function(e, n, t, a, o, i, s) {
    var r = s.RoomModel,
        l = s.ZoneLayerModel,
        c = "manage";
    n.controller("DesignerManageOfficeController", ["$scope", "$stateParams", "data", function(n, t, a) {
        a.get("org", "officesModel", "roomsModel").spread(function(a, i, s) {
            n.org = a, n.office = e.find(i.items, {
                slug: t.office
            }), n.office && (n.roomsInOffice = o.ensureProperty(s.groupedView("office"), n.office._id))
        })
    }]), n.controller("DesignerManageController", ["$rootScope", "$location", "$scope", "$stateParams", "$state", "$window", "shapeService", "selectionService", "toolService", "zoomService", "availabilityService", "labelsService", "galleryService", "viewPropertiesService", "data", "compileService", "$q", "sortingService", "floorplanService", "workstationService", "hotkeys", "zoneService", function(n, t, i, s, d, m, u, p, f, g, h, v, b, y, k, w, M, S, x, D, P, C) {
        function z(n, t) {
            var a, i;
            return n && t ? (a = o.today(), i = t.office, D.assignableDesks(a, i).then(function(t) {
                var a = e.chain(t).pluck("id").value();
                return e.contains(a, n._id)
            })) : M.reject()
        }

        function $() {
            q(f.tools.select, !0), Z(i.selectedItems > 0), i.isInRelocationMode = !1, j()
        }

        function I(n) {
            var t, a;
            t = e.partition(n, function(n) {
                return e.contains(n.tags, "layer-floor")
            }), a = e.partition(t[1], function(n) {
                return e.contains(n.tags, "layer-ceiling")
            }), i.floorShapes = t[0], i.ceilingShapes = a[0], i.furnitureShapes = e.sortBy(a[1], "layer"), i.deskShapes = e.filter(i.furnitureShapes, u.isPrivate)
        }

        function _(n) {
            var t, a, o, s;
            n && (a = n.split(":"), o = a[0].trim(), s = a[1].trim().toLocaleLowerCase(), t = e.filter(i.room.shapes, function(e) {
                var n = (e[o] || e.info && e.info[o] || "").toLocaleLowerCase();
                return n === s
            }), t && t.length > 0 ? p.selectShapes(t) : (t = e.find(i.zonesModel.zoneModels, function(e) {
                return e.info && e.info.resource ? e.info.resource._id === s : void 0
            }), t && p.selectZone(t)))
        }

        function T(n) {
            e.each(n, function(e) {
                b.applyPrototypeProperties(e)
            })
        }

        function A() {
            "function" == typeof m.callPhantom && m.callPhantom("takeShot")
        }

        function E() {
            i.teamNames = e.chain(i.room.shapes).pluck("info").pluck("team").compact().uniq().value()
        }

        function R() {
            i.labels = e.filter(i.org.labels, function(n) {
                return e.find(i.room.zones, function(e) {
                    return e.type == n.name
                })
            })
        }

        function B() {
            var t = i.room._id,
                a = Y.resourcesModel;
            e.each(i.deskShapes, function(e) {
                var n = a.find(t, e.id);
                n && u.initDeskResource(e, n)
            }), e.each(i.zonesModel.zoneModels, function(e) {
                C.initZoneResource(e, t, Y.currency, a, Y.plansModel, Y.teamsModel)
            }), n.$broadcast("update-availability")
        }

        function O() {
            var n = Y.resourcesModel.forRoom(i.room._id);
            e.each(n, function(e) {
                "desk" === e.type && e.info && e.info.shape && u.updateDeskStatusInfo(e.info.shape)
            })
        }

        function L(e, n) {
            var a;
            a = e + ":" + n, i.search && i.search.indexOf(a) >= 0 && (a = void 0), i.search = a, t.search("s", i.search), _(i.search)
        }

        function U() {
            var e = i.owner ? c : "preview";
            i.view = y.getModel(t.search(), e), i.view.mode = e, "preview" === e && q(f.tools.pan), f.setMode(c)
        }

        function F(e) {
            var t, a;
            t = Y.resourcesModel.findById(e), a = t && t.info && t.info.shape, a && u.updateDeskStatusInfo(a), n.$broadcast("update-availability")
        }

        function N(n) {
            var t, a;
            e.chain(Y.resourcesModel.items).filter({
                parent: n
            }).each(function(e) {
                var n = e.info && e.info.shape;
                u.updateDeskStatusInfo(n)
            }).value(), t = Y.resourcesModel.findById(n), a = t && t.info && t.info.zoneModel, a && C.updateZoneModelInfo(a, Y.teamsModel, Y.resourcesModel)
        }

        function q(e, n) {
            i.tool !== e && (i.tool = f.setTool(i, e, n))
        }

        function j() {
            H()
        }

        function H(n) {
            w._statusFilterFn = n, e.each(i.room.shapes, function(e) {
                u.isPrivate(e) && u.updateDeskStatusInfo(e)
            })
        }

        function W(n) {
            return function(t) {
                return e.contains(n, t)
            }
        }

        function Z(e) {
            i.owner && (e ? (V = i.pane, i.setPane("shape-settings")) : void 0 === V && (i.setPane(V), V = null))
        }
        var V, G, K, Y = this;
        G = M.defer(), i.viewPropDefs = y.definitions, i.groupedViewProps = e.groupBy(i.viewPropDefs, "category"), i.propDefsByName = e.indexBy(i.viewPropDefs, "name"), i.shapeService = u, i.deskTypes = h.deskTypes, i.roomSlug = s.roomSlug, i.pane = null, i.isInRelocationMode = !1, P.bindTo(i).add({
            combo: ["escape"],
            description: "Cancel relocation.",
            callback: function() {
                i.cancelRelocation()
            }
        }), i.$on("relocate-start", function(e, n) {
            q(f.tools.click, !0), i.isInRelocationMode = !0, H(W(["available", "availableFrom"]))
        }), i.$on("click-shape", function(e, t) {
            z(t.selectedResource, t.selectedMembership).then(function(e) {
                t.unselectedMembership && t.selectedMembership && e && n.$broadcast("open-relocate-dialog", t)
            })
        }), i.$on("relocate-complete", function(e, n) {
            $(), p.selectShapes(n)
        }), i.cancelRelocation = $, i.initializeGallery = function(e, n) {
            b.initialize(n.gallery, n.redefinitions), i.templatesPath = b.templatesPath(), T(e)
        }, i.initializeOrg = function(e) {
            v.initialize(e.labels), u.initializeTemplate(e.deskTemplate), R()
        }, i.initializePerm = function(e) {
            i.owner = e >= 3
        }, i.initializeRoom = function(n) {
            i.room = n, p.resetSelection(), i.roomModel = new r(n.definition), i.zonesModel = new l(n.zones), i.setPane("resources"), U(), e.each(n.shapes, function(e) {
                u.updateShapeTitle(e)
            }), I(n.shapes), i.search = s.s, g.init(), i.fit()
        }, i.getNormalized = S.getNormalized, i.selectFilter = L, i.isFilterSelected = function(e, n) {
            var t = i.search;
            return t ? t.toLocaleLowerCase() === e.toLocaleLowerCase() + ":" + n.toLocaleLowerCase() : void 0
        }, i.openExport = function() {
            i.$broadcast("open-export")
        }, x.load(i).then(function() {
            return k.get("org").then(function(e) {
                i.org = e, v.initialize(e.labels), u.initializeTemplate(e.deskTemplate), R()
            })
        }).then(function() {
            i.room.background && i.room.background.uri && !i.room.background.measured && i.openDesigner()
        }).then(function() {
            return k.get("org", "mrmModel", "plansModel", "occupancyModel")
        }).spread(function(n, t, a, s) {
            return Y.resourcesModel = s.resourcesModel, Y.membersModel = t.membersModel, Y.teamsModel = t.teamsModel, Y.plansModel = a, Y.currency = n.settings.billing.currency, i.dateFormat = n.settings.calendar.dateFormat, u.setModels(Y.membersModel, Y.teamsModel, Y.plansModel, Y.resourcesModel, n.settings), B(), O(), i.availabilityDataLoaded = !0, i.groupedPlans = e.chain(Y.resourcesModel.forRoom(i.room._id)).filter(function(n) {
                return e.contains(o.Constants.DESK_TYPES, n.type)
            }).groupBy("targetPlan").map(function(e, n) {
                return n ? {
                    plan: n,
                    count: e.length
                } : void 0
            }).value(), K = t.membershipsModel.registerCollectionChange({
                add: function(e) {
                    e.resource && (F(e.resource), N(e.resource))
                },
                update: function(e, n) {
                    e.resource && (F(e.resource), N(e.resource)), n.resource && (F(n.resource), N(n.resource))
                },
                remove: function(e) {
                    e.resource && (F(e.resource), N(e.resource))
                }
            }), G.promise
        }).then(function() {
            g.init(), _("string" == typeof i.search && i.search), E(), A()
        }).then(null, function() {
            a.error("Unable to load the floorplan.")
        }), i.shouldShowProperty = function(n) {
            return function(t) {
                return e.contains(t.showIn, n)
            }
        }, i.zoomIn = function() {
            i.setZoom(10 * Math.floor(i.zoomLevel / 10) + 10)
        }, i.zoomOut = function() {
            i.setZoom(10 * Math.floor(i.zoomLevel / 10) - 10)
        }, i.fit = function() {
            n.$broadcast("canvas-resize"), i.zoomLevel = g.fit(i.room, i.roomModel, i.zoomLevel)
        }, i.setPane = function(e) {
            i.pane = e, n.$broadcast("canvas-resize")
        }, i.togglePane = function(e) {
            i.setPane(e)
        }, i.surfaceMouseWheel = function(e) {
            i.zoomLevel = g.wheel(e, i.zoomLevel)
        }, i.setZoom = function(e) {
            i.zoomLevel = g.zoom(parseInt(e, 10))
        }, i.surfaceDown = function(e) {
            f.surfaceDown(e, i.tool)
        }, i.surfaceBackgroundDown = function(e) {
            f.surfaceBackgroundDown(e, i)
        }, i.surfaceBackgroundMove = function(e) {
            f.surfaceBackgroundMove(e, i)
        }, i.openDesigner = function() {
            d.go("organization.office.design", {
                roomSlug: i.room.slug
            })
        }, i.$on("select-shapes", function(n, t) {
            i.selectedItems = t, i.selectedDesks = e.filter(t, u.isPrivate), Z(t.length > 0)
        }), i.$on("select-zone", function() {
            var e = p.selectedZone();
            e && e.info && e.info.resource ? i.selectedZone = e : i.selectedZone = void 0, Z(i.selectedZone)
        }), i.$on("canvas-resize", function() {
            g.updateViewport()
        }), i.$on("select-status", function(e, n) {
            var t;
            n && (t = W([n])), H(t)
        }), i.$watch("shapeService.availabilityAt", function() {
            e.each(i.deskShapes, function(e) {
                u.updateDeskStatusInfo(e)
            }), i.$broadcast("update-availability")
        }), e.each(i.viewPropDefs, function(e) {
            var n = y.getUpdateLocation(e, function() {
                return i.view
            });
            n(), i.$watch("view." + e.name, n)
        }), i.$on("shape-templates-loaded", function() {
            G.resolve()
        }), i.$on("$destroy", function() {
            i.isInRelocationMode && i.cancelRelocation(), p.resetSelection(), K && K.destroy()
        }), q(f.tools.select)
    }])
}), define("designer/services/floorplanService", ["app", "utils", "underscore"], function(e, n) {
    e.factory("floorplanService", ["$stateParams", "data", "$q", function(e, n, t) {
        function a() {
            return e.roomSlug && e.office ? (n.setRoomSlug(e.office, e.roomSlug), n.get("org-perm", "gallery", "room").spread(function(e, n, t) {
                return {
                    room: t,
                    perm: e,
                    gallery: n
                }
            })) : t.reject("Nothing to load.")
        }
        return {
            load: function(e) {
                return a().then(function(n) {
                    e.room = n.room, e.initializePerm(n.perm), e.initializeGallery(n.room.shapes, n.gallery), e.initializeRoom(n.room)
                })
            }
        }
    }])
}), define("designer/directives/sideLegend", ["app", "underscore"], function(e, n) {
    e.directive("sideLegend", ["$rootScope", "galleryService", "shapeService", function(e, t, a) {
        return {
            restrict: "E",
            replace: !0,
            templateUrl: "/app/designer/sideLegend.html",
            scope: {
                settings: "=",
                shapes: "=",
                zoneLabels: "="
            },
            link: function(e) {
                function o() {
                    e.shapes && (e.furniture = n.chain(e.shapes).groupBy("template").map(function(e, a) {
                        var o = t.shapeById(a);
                        return n.defaults(o, {
                            count: e.length
                        })
                    }).value())
                }
                e.availabilityAt = a.availabilityAt, o(), e.$watch("shapes", o)
            }
        }
    }])
}), define("designer/directives/resourcesSummary", ["app", "underscore", "utils"], function(e, n) {
    e.directive("resourcesSummary", ["$rootScope", "availabilityService", function(e, t) {
        return {
            restrict: "E",
            replace: !0,
            templateUrl: "/app/designer/resourcesSummary.html",
            scope: {
                shapes: "="
            },
            link: function(a) {
                function o(e, n) {
                    return {
                        status: n,
                        text: t.getText(n),
                        color: t.getColor(n),
                        count: e
                    }
                }

                function i() {
                    var t = n.filter(a.shapes, function(e) {
                        return e.info.resource
                    });
                    t && t.length > 0 && (a.workstationStatuses = n.chain(t).filter(function(e) {
                        return "desk" === e.info.resource.type || "desk_tr" === e.info.resource.type
                    }).map(function(e) {
                        return e.info.status
                    }).countBy().map(function(e, n) {
                        return o(e, n)
                    }).value(), a.workstations = n.reduce(a.workstationStatuses, function(e, n) {
                        return e + n.count
                    }, 0), a.hotdesks = n.chain(t).map(function(e) {
                        return e.info.resource
                    }).filter(function(e) {
                        return "hotdesk" === e.type
                    }).value().length, ("hotdesk" === a.selectedStatus && 0 === a.hotdesks || a.selectedStatus && "hotdesk" !== a.selectedStatus && !n.find(a.workstationStatuses, {
                        status: a.selectedStatus
                    })) && (a.selectedStatus = null, e.$broadcast("select-status", a.selectedStatus)))
                }
                a.hotdeskColor = t.hotdeskColor, a.selectStatus = function(n) {
                    a.selectedStatus === n ? a.selectedStatus = void 0 : a.selectedStatus = n, e.$broadcast("select-status", a.selectedStatus)
                }, a.$on("update-availability", i), a.$watch("shapes", i)
            }
        }
    }])
}), define("designer/main", ["app", "mousewheel", "metrics", "renderService", "snapService", "selectionService", "rulersService", "shape", "canvasDirectives", "roomDecorations", "settingsPanes", "shapeLocation", "draggable", "selection", "edgeAdorner", "wallAdorner", "scale", "shortcuts", "undo", "toolService", "zoomService", "commandsService", "fileUpload", "labelsService", "galleryService", "designerTour", "./controller", "./manageController", "./services/floorplanService", "./directives/sideLegend", "./directives/resourcesSummary"], function(e) {}), define("commonFilters", ["app", "underscore", "moment", "string"], function(e, n, t, a) {
    function o(e) {
        return e.substring(0, 1).toUpperCase() + e.substring(1)
    }
    e.filter("nospace", function() {
        return function(e, n) {
            return n || (n = ""), e ? e.replace(/ /g, n) : ""
        }
    }), e.filter("capitalize", function() {
        return function(e) {
            return e && o(e)
        }
    }), e.filter("reverse", function() {
        return function(e) {
            return (e || []).slice().reverse()
        }
    }), e.filter("formatTemplate", function() {
        return function(e) {
            var n, t;
            return n = /^(\S+)-(\S{2})-(\S{2})$/gi, t = n.exec(e), t ? o(t[1]) + " " + t[2] + "-" + t[3].toUpperCase() : e
        }
    }), e.filter("momentAgo", [function() {
        return function(e) {
            return t(e).fromNow()
        }
    }]), e.filter("formatDateInterval", ["$filter", function(e) {
        return function(n, t, a) {
            if (n && n.startDate) {
                var o, i;
                return o = e("date")(n.startDate, t), a ? o : (i = n.endDate ? e("date")(n.endDate, t) : "", [o, i].join(" - "))
            }
            return "-"
        }
    }]), e.filter("truncate", [function() {
        return function(e, n) {
            return e ? a(e).truncate(n || 20).s : e
        }
    }]), e.filter("smartLimit", function() {
        return function(e, t) {
            return e && e.length > t ? n.first(e, t - 1) : e
        }
    }), e.filter("teamFilter", ["mrmFilterService", function(e) {
        return function(n, t) {
            return e.filter(n, t, ["team"])
        }
    }]), e.filter("memberFilter", ["mrmFilterService", function(e) {
        return function(n, t) {
            return e.filter(n, t, ["member"])
        }
    }]), e.filter("contactFilter", ["mrmFilterService", function(e) {
        return function(n, t) {
            return e.filterContacts(n, t)
        }
    }]), e.filter("membershipFilter", function() {
        return function(e, t) {
            var a = t && t.status,
                o = t && t.office,
                i = t && t.plan;
            return n.filter(e, function(e) {
                return !((a ? e.info.status !== a : "terminated" === e.info.status) || i && e.plan !== i || o && e.office !== o)
            })
        }
    }), e.filter("firstName", function() {
        return function(e) {
            if (e) {
                var n = e.split(" ");
                return n.length > 0 ? n[0] : ""
            }
            return e
        }
    }), e.filter("entities", function() {
        return function(e) {
            return n.isArray(e) ? n.compact([n.initial(e).join(", "), n.last(e)]).join(" and ") : e
        }
    }), e.filter("statusText", ["availabilityService", function(e) {
        return function(n) {
            return e.getText(n)
        }
    }]), e.filter("deskFilter", ["resourceService", function(e) {
        return function(n, t, a) {
            return t ? e.filter(n, t, a) : n
        }
    }]), e.filter("formatPlan", ["formatService", function(e) {
        return e.formatPlan
    }]), e.factory("formatService", ["$filter", function(e) {
        function a(e) {
            return t(e).format("ll")
        }

        function o(e, t) {
            return n.map([e, t], a).join(" - ")
        }

        function i(e, n) {
            var t = r(e.price, n);
            return "month" !== e.intervalLength ? t + "/" + e.intervalLength : t
        }

        function s(e, n, t) {
            var a;
            return e ? (a = [i(e, n)], !t && e.name && a.push(e.name), a.join(", ")) : void 0
        }
        var r = e("isoCurrency");
        return {
            formatDate: a,
            formatPeriod: o,
            formatPrice: i,
            formatPlan: s
        }
    }])
}), define("checkinControllers", ["jquery", "underscore", "app", "alert", "utils", "moment"], function(e, n, t, a, o, i) {
    function s(e) {
        return e && e.lastCheckin && (!e.lastCheckin.end || i(e.lastCheckin.end).isAfter(o.today()))
    }
    t.controller("CheckinsController", ["$scope", "$stateParams", "data", "$http", function(t, r, l, c) {
        function d() {
            if (t.member) {
                var e = t.member.lastCheckin;
                e && !e.end ? t.lastCheckin = {
                    start: t.member.lastCheckin.start,
                    end: new Date
                } : t.lastCheckin = {
                    start: new Date
                }
            }
        }
        t.statuses = ["Online", "Offline"], t.search = {}, t.toggleCheckin = function(n) {
            n && (t.member = n, d()), t.isCheckin = !s(n), e("#checkin-modal").modal("show")
        }, t.onMemberChange = function() {
            t.member = n.find(t.members, function(e) {
                return e._id === t.member._id
            }), d()
        }, t.confirmCheckin = function() {
            t.member.lastCheckin = n.clone(t.lastCheckin);
            var o = {
                member: {
                    _id: t.member._id
                },
                data: t.member.lastCheckin
            };
            t.isCheckin ? c.post(t.API_ORG + r.organization + "/members/checkin/", o).then(function() {
                a.ok("Successfully checked in member")
            }) : c.post(t.API_ORG + r.organization + "/members/checkout/", o).then(function() {
                a.ok("Successfully checked in member")
            }), e("#checkin-modal").modal("hide")
        }, t.cleanUpCheckin = function() {
            delete t.lastCheckin, t.member = void 0
        }, t.lastSeen = function(e) {
            return e ? e.end ? i(e.end).fromNow() : "Now" : void 0
        }, t.period = function(e) {
            return e ? e.end ? i(e.end).from(e.start, !0) : i(e.start).fromNow(!0) : void 0
        }, l.get("mrmModel", "plansModel").then(o.spread(function(e) {
            t.membersModel = e.membersModel, t.teamsModel = e.teamsModel, t.members = t.membersModel.items
        }))
    }])
}), define("kendoWrappers", ["app", "kendo"], function(e, n) {
    n.culture("en-GB"), e.directive("autoCompleteList", function() {
        return {
            restrict: "A",
            scope: {
                autoCompleteList: "="
            },
            link: function(e, n) {
                var t;
                t = n.kendoAutoComplete({
                    data: e.dataSource,
                    filter: "contains",
                    ignoreCase: !0,
                    suggest: !0
                }).data("kendoAutoComplete"), e.$watch("autoCompleteList", function() {
                    t.setDataSource(e.autoCompleteList)
                }), e.$on("$destroy", function() {
                    t.destroy()
                })
            }
        }
    })
}), define("commonDirectives", ["angular", "app", "jquery", "utils", "utils2d", "underscore", "alert", "bookingBilling", "moment", "calendarKendoUtils"], function(e, n, t, a, o, i, s, r, l, c) {
    i.mixin({
        sum: function(e, n) {
            return n = i.isFunction(n) && n || i.isString(n) && i.property(n) || i.identity, i.reduce(e, function(e, t) {
                return e + n(t)
            }, 0)
        }
    }), n.config(["$provide", function(e) {
        e.decorator("$q", ["$delegate", function(e) {
            var n = "__proto__",
                t = e.defer().promise[n];
            return t.messages = function(n) {
                return s.asyncMessages(this, n, e), this
            }, t.messages = function(n) {
                return s.asyncMessages(this, n, e), this
            }, t.spread = function(e) {
                return this.then(a.spread(e))
            }, e
        }])
    }]), n.directive("rndModal", ["$window", "$timeout", function(e, n) {
        return {
            restrict: "A",
            scope: {
                modalFocus: "@",
                modalHidden: "&"
            },
            link: function(a, o, i) {
                var s;
                s = e.document, o.addClass("modal fade"), "allowPopups" in i && (o.on("shown.bs.modal", function() {
                    t(s).off("focusin.modal")
                }), a.$on("$destroy", function() {
                    o.off("shown.bs.modal")
                })), o.on("shown.bs.modal", function() {
                    "allowPopups" in i && t(s).off("focusin.modal"), a.modalFocus && o.find(a.modalFocus).focus()
                }), o.on("hidden.bs.modal", function() {
                    a.modalHidden && n(function() {
                        a.modalHidden({})
                    })
                }), a.$on("$destroy", function() {
                    o.off("shown.bs.modal"), o.off("hidden.bs.modal")
                })
            }
        }
    }]), n.directive("propertiesForm", [function() {
        return {
            restrict: "E",
            replace: !0,
            templateUrl: "/common/propertiesForm.html",
            scope: {
                properties: "=",
                values: "="
            },
            controller: ["$scope", "$sce", function(e, n) {
                e.title = function(e) {
                    return e.title || e.name
                }, e.trustAsHtml = function(e) {
                    return n.trustAsHtml(e)
                }, e.isText = function(n) {
                    return !(n.type && n.type !== String || e.isEnum(n))
                }, e.isEnum = function(e) {
                    return e.values
                }, e.isBool = function(e) {
                    return e.type === Boolean
                }
            }],
            link: function(e, n) {}
        }
    }]), n.directive("mappingsForm", [function() {
        return {
            restrict: "E",
            template: '<properties-form properties="properties" values="values"></properties-form>',
            scope: {
                keys: "=",
                values: "=",
                options: "=",
                textField: "@",
                valueField: "@"
            },
            controller: ["$scope", function(e) {
                function n() {
                    var n, t, a;
                    t = e.textField, a = e.valueField, t || a ? (n = {}, n[t] = "Not selected", n[a] = null) : n = null, e.properties = i.map(e.keys, function(o) {
                        return i.extend({
                            values: e.options,
                            option: n,
                            textField: t,
                            valueField: a
                        }, o)
                    })
                }
                n(), e.$watch("keys", n), e.$watch("options", n)
            }]
        }
    }]), n.directive("rndLoading", function() {
        return {
            restrict: "A",
            scope: {
                rndLoading: "="
            },
            link: function(e, n) {
                function t() {
                    var t;
                    t = e.rndLoading ? "loading" : "reset", n.button(t)
                }
                t(), e.$watch("rndLoading", t)
            }
        }
    }), n.directive("bindHtmlCompile", ["$compile", function(e) {
        return {
            restrict: "A",
            link: function(n, t, a) {
                var o = a.bindHtmlCompile;
                t.html(o && o.toString()), e(t.contents())(n)
            }
        }
    }]), n.directive("color", [function() {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                color: "="
            },
            template: '<div class="color-box"></div>',
            link: function(e, n) {
                function t() {
                    n.css({
                        "background-color": e.color
                    })
                }
                e.$watch("color", t)
            }
        }
    }]), n.directive("emptyBlock", [function() {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                header: "@",
                help: "@",
                command: "&"
            },
            templateUrl: "/common/emptyBlock.html"
        }
    }]), n.directive("searchBox", [function() {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                model: "="
            },
            templateUrl: "/common/searchBox.html",
            link: function(e) {
                e.clear = function() {
                    e.model = void 0
                }
            }
        }
    }]), n.directive("searchMonth", [function() {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                model: "="
            },
            templateUrl: "/common/searchMonth.html"
        }
    }]), n.directive("loading", [function() {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                help: "@"
            },
            templateUrl: "/common/loading.html"
        }
    }]), n.directive("locationLink", ["data", function(e) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                resource: "=",
                office: "=",
                empty: "@",
                team: "="
            },
            templateUrl: "/common/locationLink.html",
            link: function(n) {
                e.get("resourcesModel", "rooms-by-id", "officesModel").then(a.spread(function(e, t, a) {
                    function o() {
                        var o, i, s;
                        o = e.findById(n.resource), i = a.findById(n.office), n.showLocation = a.items.length > 1, o ? (s = t[o.room], n.location = {
                            resource: o,
                            room: s.room,
                            office: s.office
                        }) : i ? n.location = {
                            office: i
                        } : delete n.location
                    }
                    n.officeName = function(e) {
                        var n;
                        return n = a.findById(e), n && n.name
                    }, n.$watch("resource", o), n.$watch("office", o), o()
                }))
            }
        }
    }]), n.directive("genericLink", ["data", function(e) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                target: "=",
                hideTeam: "="
            },
            templateUrl: "/common/genericLink.html",
            link: function(n) {
                e.get("mrmModel").then(function(e) {
                    function t(n) {
                        return n && e.membersModel.findById(n)
                    }

                    function a(n) {
                        return n && e.teamsModel.findById(n)
                    }

                    function o() {
                        delete n.member, delete n.team;
                        var e = n.target;
                        e && (e.member ? (n.member = t(e.member), n.team = a(n.member && n.member.team)) : e.team && (n.team = a(e.team)))
                    }
                    o(), n.$watch("target.team", o), n.$watch("target.member", o)
                })
            }
        }
    }]), n.directive("memberLink", [function() {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                member: "="
            },
            templateUrl: "/common/memberLink.html"
        }
    }]), n.directive("teamLink", [function() {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                team: "="
            },
            templateUrl: "/common/teamLink.html"
        }
    }]), n.directive("userPicture", [function() {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                item: "=",
                icon: "="
            },
            link: function(e, n, t) {
                function a() {
                    var n = e.item;
                    e.image = n && (n.image || n.actualImage || n.twitterInfo && n.twitterInfo.imageUrl), e.icon = e.icon || "fa-user"
                }
                e.removeImage = function() {
                    e.image = null
                }, e.$watch("item", a), e.$watch("item.image", a), e.$watch("item.actualImage", a), e.$watch("item.twitterInfo", a), e.$watch("item.twitterInfo.imageUrl", a)
            },
            templateUrl: "/common/userPicture.html"
        }
    }]), n.directive("onError", ["$parse", function(e) {
        return {
            restrict: "A",
            link: function(n, t, a) {
                var o = e(a.onError);
                t.on("error", function() {
                    n.$apply(function() {
                        o(n)
                    })
                })
            }
        }
    }]), n.directive("contactProfile", function() {
        return {
            scope: {
                contact: "="
            },
            restrict: "E",
            replace: !0,
            templateUrl: "/common/contactProfile.html",
            link: function(e, n, t) {
                e.showLink = !i.has(t, "noLink")
            }
        }
    }), n.directive("wallTeam", function() {
        return {
            restrict: "E",
            controller: ["$scope", "data", function(e, n) {
                n.get("org").then(function(n) {
                    e.teamProperty = n.settings.teamProperty
                })
            }],
            scope: {
                team: "=",
                members: "=",
                search: "="
            },
            templateUrl: "/common/wall-team.html"
        }
    }), n.directive("socialProfiles", [function() {
        var e = {},
            n = {
                angel: "fa fa-angellist"
            };
        return i.each(["facebook", "twitter", "linkedin", "googleplus"], function(n) {
            e[n] = !0
        }), i.each(["stack-overflow", "foursquare", "slideshare", "instagram"], function(e) {
            n[e.replace(/-/g, "")] = "fa fa-" + e
        }), i.each(["facebook", "twitter", "linkedin", "github", "youtube", "pinterest", "google-plus"], function(e) {
            n[e.replace(/-/g, "")] = "fa fa-" + e + "-square"
        }), {
            restrict: "E",
            replace: !0,
            scope: {
                profiles: "="
            },
            templateUrl: "/common/social-profiles.html",
            link: function(t, a, o) {
                t.socialIcon = function(e) {
                    return n[e]
                }, t.essentialFilter = function(n) {
                    return i.isUndefined(o.pickEssential) || e[n.type]
                }
            }
        }
    }]), n.directive("deleteModal", function() {
        return {
            restrict: "E",
            replace: !1,
            scope: {},
            templateUrl: "/common/delete-modal.html",
            link: function(e, n) {
                function t(n) {
                    e.target = n.target, e.deletedEntities = n.deletedEntities, e.attachedEntities = n.attachedEntities, e.preventDeleteEntities = n.preventDeleteEntities, a = n.deferred, o.modal("show")
                }
                var a, o = n.find(".modal");
                e.confirm = function() {
                    a && a.resolve(), a = null
                }, e.hidden = function() {
                    a && a.reject({
                        messagebox: !0,
                        closed: !0
                    }), a = null, delete e.target, delete e.attachedEntities, delete e.preventDeleteEntities
                }, e.$on("prompt-delete", function(e, n) {
                    t(n)
                })
            }
        }
    }), n.directive("promptModal", function() {
        return {
            restrict: "E",
            replace: !1,
            scope: {},
            templateUrl: "/common/prompt-modal.html",
            link: function(e, n) {
                function t(n) {
                    a = n.deferred, e.options = n, o.modal("show")
                }
                var a, o = n.find(".modal");
                e.confirm = function() {
                    a && a.resolve(), delete e.options, a = null
                }, e.hidden = function() {
                    a && a.reject({
                        messagebox: !0,
                        closed: !0
                    }), a = null
                }, e.$on("prompt-modal", function(e, n) {
                    t(n)
                })
            }
        }
    }), n.directive("resourceLink", ["$rootScope", "data", function(e, n) {
        return {
            restrict: "E",
            replace: !1,
            scope: {
                resource: "=",
                menu: "="
            },
            templateUrl: "/common/resourceLink.html",
            link: function(t) {
                n.get("rooms-by-id").then(function(e) {
                    t.roomSlug = function(n) {
                        var t = e[n.room];
                        return t && t.room.slug
                    }, t.officeSlug = function(n) {
                        var t = e[n.room];
                        return t && t.office.slug
                    }
                }), t.editResource = function(n) {
                    e.$broadcast("edit-resource", {
                        resource: n
                    })
                }, t.deleteResource = function(n) {
                    e.$broadcast("delete-resource", n)
                }
            }
        }
    }]), n.directive("customersDropDown", ["data", function(e) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                selectedCustomer: "=",
                includeIndividuals: "=",
                filterMemberFn: "=",
                showSubItems: "="
            },
            templateUrl: "/common/customersDropDown.html",
            link: function(n) {
                function t(e) {
                    return !0
                }

                function o() {
                    var e, t, o;
                    e = i.filter(d, function(e) {
                        return !e.team
                    }), t = i.chain(c).filter(function(e) {
                        return "terminated" !== e.info.status
                    }).map(function(e) {
                        return {
                            _id: e._id,
                            icon: "fa-building-o",
                            name: e.name,
                            twitterInfo: e.twitterInfo,
                            team: e._id
                        }
                    }).sortBy("name").value(), n.itemsSource = t, n.includeIndividuals && (o = i.chain(e).filter(function(e) {
                        return a.isMember(e)
                    }).map(function(e) {
                        return {
                            _id: e._id,
                            icon: "fa-user",
                            name: e.name,
                            actualImage: e.actualImage,
                            member: e._id
                        }
                    }).sortBy("name").value(), n.itemsSource = n.itemsSource.concat(o))
                }

                function s(e) {
                    var a = n.filterMemberFn || t;
                    n.isTeamSelected = e, n.subItemsSource = i.chain(d).filter(function(n) {
                        return n.team === e && a(n)
                    }).map(function(e) {
                        return {
                            _id: e._id,
                            name: e.name,
                            team: e.team
                        }
                    }).sortBy("name").value()
                }

                function r(e, t) {
                    var a = e || t;
                    a ? n.selectedItem = i.find(n.itemsSource, {
                        _id: e || t
                    }) : delete n.selectedItem
                }

                function l(e) {
                    var t = e && i.findWhere(n.subItemsSource, {
                        _id: e
                    });
                    t && t.team ? n.selectedSubItem = t : delete n.selectedSubItem
                }
                var c, d;
                n.teamsDropDownItemTemplate = '<user-picture class="profile-xs inline" item="dataItem" icon="dataItem.icon"></user-picture><span>{{ dataItem.name }}</span>', n.emptySelectionObject = {
                    name: "Not assigned..."
                }, e.get("mrmModel").then(function(e) {
                    c = e.teamsModel.items, d = e.membersModel.items
                }), n.shouldShowSubSelect = function() {
                    return n.showSubItems && n.isTeamSelected
                }, n.$watch("selectedItem", function(e, t) {
                    s(e && e.team), n.selectedCustomer && (n.selectedCustomer.team = e && e.team || null, n.selectedCustomer.member = e && e.member || null)
                }), n.$watch("selectedSubItem", function(e, t) {
                    n.selectedCustomer && (n.selectedCustomer.member = e && e._id || null)
                }), n.$watch("selectedCustomer", function(e, n) {
                    o(), s(e && e.team), r(e && e.team, e && e.member), l(e && e.member)
                })
            }
        }
    }]), n.factory("messageService", ["$q", "$rootScope", function(e, n) {
        return {
            promptDelete: function(t) {
                var a, o = e.defer();
                return i.isString(t) || i.isUndefined(t) ? t = {
                    target: t || ""
                } : (t = i.clone(t), t.entityPlural = t.entityPlural || t.entityName, a = t.target || [], i.isArray(a) || (a = [a]), 1 === a.length ? i.isString(a[0]) ? t.target = a[0] : a[0].name ? t.target = a[0].name : t.target = t.entityName : t.target = a.length + " " + t.entityPlural), n.$broadcast("prompt-delete", i.extend({
                    deferred: o
                }, t)), o.promise
            },
            prompt: function(t) {
                var a = e.defer();
                return n.$broadcast("prompt-modal", i.extend({
                    deferred: a,
                    okButtonLabel: "OK",
                    cancelButtonLabel: "Cancel"
                }, t)), a.promise
            }
        }
    }]), n.directive("sortableHeader", [function() {
        return {
            restrict: "E",
            require: "^rndSortable",
            replace: !0,
            transclude: !0,
            templateUrl: "/common/sortableHeader.html",
            scope: {
                property: "@",
                valueSelector: "="
            },
            link: function(e, n, t, a) {
                function o(n) {
                    var t = e.property;
                    e.sort = n, n.addDescriptor(t, e.valueSelector || t), e.toggleSortBy = function() {
                        n.toggle(t)
                    }, e.isSortedBy = function() {
                        return n.sortedBy(t)
                    }
                }
                o(a.sort), e.$watch("valueSelector", function() {
                    a.sort.updateDescriptor(e.property, e.valueSelector || e.property)
                })
            }
        }
    }]), n.directive("rndSortable", ["$filter", function(e) {
        function n() {
            this._propertyDescriptors = []
        }

        function t(e, n) {
            return i.isFunction(e) ? e : e
        }
        return n.prototype.addDescriptor = function(e, n) {
            this._propertyDescriptors.push({
                name: e,
                selector: t(n, e)
            })
        }, n.prototype.updateDescriptor = function(e, n) {
            var a = i.find(this._propertyDescriptors, {
                name: e
            });
            a && (a.selector = t(n, e), this.sortByName === e && (this.sortBy = a.selector))
        }, n.prototype.toggle = function(e) {
            var n;
            this.sortByName === e ? this.sortDirection = !this.sortDirection : (n = i.find(this._propertyDescriptors, {
                name: e
            }), n && (this.sortByName = e, this.sortBy = n.selector, this.sortDirection = !1))
        }, n.prototype.sortedBy = function(e) {
            return this.sortByName === e
        }, {
            restrict: "A",
            replace: !0,
            controller: ["$scope", function(e) {
                this.sort = e.rndSortable = new n
            }],
            scope: {
                rndSortable: "=",
                sortableDefault: "@"
            },
            link: function(e, n) {
                e.sortableDefault && e.rndSortable.toggle(e.sortableDefault)
            }
        }
    }]), n.directive("imageUpload", ["s3Upload", function(e) {
        return {
            restrict: "E",
            templateUrl: "/common/imageUpload.html",
            scope: {
                imageUrl: "=",
                defaultIcon: "@",
                category: "@",
                target: "@"
            },
            link: function(n, t) {
                n.chooseImage = function() {
                    t.find("#upload-image").click()
                }, n.uploadImg = function(t) {
                    t && (n.uploading = !0, e.userResource(t, n.category || "organization", n.target).then(function(e) {
                        n.uploading = !1, n.imageUrl = e
                    }, function(e) {
                        n.uploading = !1, s.error("Unable to change the image.")
                    }))
                }
            }
        }
    }]), n.directive("expandPlan", ["$rootScope", "data", "formatService", function(e, n, t) {
        return {
            restrict: "E",
            scope: {
                planId: "=",
                membership: "=",
                price: "@",
                menu: "=",
                noColor: "@"
            },
            templateUrl: "/common/expandPlan.html",
            link: function(o) {
                function i() {
                    o.plan ? (o.planColor = r.planTypes[o.plan.type].color, o.formatedPlan = t.formatPlan(o.plan, r.currency, o.price)) : (delete o.planColor, delete o.formatedPlan)
                }

                function s() {
                    var e, t = o.membership;
                    t ? (e = t.plan, o.terminated = "terminated" === t.info.status) : e = o.planId, e ? n.get("plansModel", "org").then(a.spread(function(n, t) {
                        r.currency = t.settings.billing.currency, r.planTypes = n.types, o.plan = n.findById(e)
                    })) : o.plan = void 0
                }
                var r = this;
                o.editMembership = function(n) {
                    e.$broadcast("edit-membership", n)
                }, o.deleteMembership = function(n) {
                    e.$broadcast("delete-memberships", [n])
                }, o.endMembership = function(n) {
                    var t = {
                        memberships: [n]
                    };
                    e.$broadcast("end-memberships", t)
                }, o.$watch("plan", i, !0), o.$watch("planId", s), o.$watch("membership", s, !0)
            }
        }
    }]), n.directive("bookingsList", ["data", "calendarConfig", function(e, n) {
        return {
            restrict: "E",
            templateUrl: "/common/bookingsList.html",
            scope: {
                team: "=",
                member: "="
            },
            link: function(n) {
                function t(e) {
                    return l.duration(new l(e.end.dateTime).diff(e.start.dateTime))
                }

                function o(e) {
                    return a.format("{0}h {1}m", e.hours(), e.minutes())
                }

                function s(e, n) {
                    var t, a, o;
                    return t = [], a = l(n).startOf("month").toDate(), o = l(n).endOf("month").toDate(), i.chain(e).map(function(e) {
                        return c.expandEventOccurrencesForTimePeriod(e, a, o, u)
                    }).compact().flatten().value()
                }

                function r() {
                    var e, t = n.month && l(n.month),
                        a = [];
                    m && (n.team ? a = m.forTeam(n.team) : n.member && (a = m.forMember(n.member)), e = s(a, n.month), a = i.sortBy(a.concat(e), function(e) {
                        return e.start.dateTime
                    }), a && (n.noBookings = 0 === a.length, n.bookings = t ? i.filter(a, function(e) {
                        return t.isSame(e.start.dateTime, "month")
                    }) : a, d()))
                }

                function d() {
                    n.totalHours = o(l.duration(i.reduce(n.bookings, function(e, n) {
                        return e + t(n)
                    }, 0)))
                }
                var m, u;
                n.formatDuration = function(e) {
                    var n = t(e);
                    return o(n)
                }, n.month = a.today(), e.get("org", "resourcesModel", "calendarEventsModel").spread(function(e, t, a) {
                    m = a, u = e.settings.calendar.timezone, n.resource = function(e) {
                        return t.findById(e)
                    }, r()
                }), n.$watch("team", r), n.$watch("member", r), n.$watch("month", r)
            }
        }
    }]), n.directive("billingDetailsList", ["data", function(e) {
        return {
            restrict: "E",
            templateUrl: "/common/billingDetailsList.html",
            scope: {
                team: "="
            },
            controller: ["$rootScope", "$scope", function(e, n) {
                n.verifyAccount = function(t) {
                    e.$broadcast("verify-billing-detail", {
                        team: n.team,
                        billingDetail: t
                    })
                }
            }]
        }
    }])
}), define("membersDirectives", ["angular", "app", "utils", "utils2d", "jquery", "underscore", "moment"], function(e, n, t, a, o, i, s) {
    function r(e) {
        return e && e.lastCheckin && (!e.lastCheckin.end || s(e.lastCheckin.end).isAfter(t.today()))
    }

    function l(e, n) {
        return e ? i.chain(n).map(function(n, t) {
            return n && e.findById(t)
        }).compact().value() : []
    }

    function c(e, n, t) {
        n && i.each(n, function(n) {
            e[n._id] = t
        })
    }

    function d(e, n) {
        return function(e) {
            var t, a;
            return t = n.findById(e.team), a = n.findById(e.member), t && t.name || a && a.name
        }
    }
    var m = '<i class="hover-action btn-icon" ng-click="action()"><i class="fa fa-{0}"></i></i>',
        u = t.format;
    n.directive("locationsFilter", ["$location", "data", function(e, n) {
        return {
            restrict: "E",
            replace: !0,
            scope: !0,
            templateUrl: "/app/organization/space/locationsFilter.html",
            link: function(t) {
                var a = e.search();
                t.office = a.office, n.get("officesModel").then(function(n) {
                    t.offices = n.items, t.filterOffice = function(n) {
                        t.office = n, e.search("office", n)
                    }
                })
            }
        }
    }]), n.directive("statusFilter", ["$location", "mrmFilterService", "data", function(e, n, t) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                items: "=",
                label: "=",
                type: "@"
            },
            templateUrl: "/app/organization/members/statusFilter.html",
            link: function(t) {
                function a() {
                    var e, n = {
                        office: t.search.office,
                        plan: t.search.plan
                    };
                    o.filter && o.count && (e = o.filter(t.items, n, [t.type]), t.active = i.filter(e, function(e) {
                        return "terminated" !== e.info.status
                    }).length, t.terminated = e.length - t.active)
                }
                var o = this;
                if (t.search = e.search(), t.$watch("search.status", function() {
                        e.search("status", t.search.status)
                    }), t.$watchCollection("items", a), t.$on("$locationChangeStart", a), o.filter = n.filter, o.count = n.count, a(), !t.search.status) {
                    var s = i.first(t.statuses);
                    s && e.search("status", s.status)
                }
            }
        }
    }]), n.directive("hoverAction", ["$compile", function(n) {
        return {
            restrict: "A",
            scope: {
                action: "&",
                icon: "@"
            },
            link: function(t, a) {
                var i;
                a.on("mouseenter", function() {
                    var o = e.element(u(m, t.icon));
                    n(o)(t, function(e) {
                        a.append(e), i = e
                    })
                }), a.on("mouseleave", function() {
                    o(i).remove()
                })
            }
        }
    }]), n.directive("membershipsList", ["$rootScope", "data", "$q", "$location", "formatService", "mrmFilterService", function(e, n, t, a, o, s) {
        return {
            scope: {
                memberships: "=",
                selectedItems: "=",
                showTarget: "@",
                showTargetTeam: "=",
                showPlansFilter: "@",
                showStatus: "@",
                sortBy: "@"
            },
            restrict: "E",
            replace: !0,
            templateUrl: "/app/organization/members/membershipsList.html",
            link: function(t) {
                function r() {
                    var e = a.search();
                    t.search = {
                        plan: e.plan,
                        office: e.office,
                        status: e.status
                    }
                }
                var m = this;
                t.selected = {}, t.isSelected = !1, t.assignMemberToPlan = function(n) {
                    e.$broadcast("assign-member-to-membership", n)
                }, t.applyPlanFilter = function() {
                    a.search("plan", t.search.plan)
                }, t.isDeskPlan = function(e) {
                    var n;
                    return e ? (n = m.plansModel.findById(e), "desk" === n.type || "hotdesk" === n.type) : !0
                }, n.get("officesModel", "resourcesModel").spread(function(e, n) {
                    t.getLocationName = function(t) {
                        var a, o;
                        return a = e.findById(t.office), o = n.findById(t.resource), i.compact([o && o.name, a && a.name]).join("@")
                    }
                }), n.get("org", "org-perm", "mrmModel", "plansModel").spread(function(e, n, a, l) {
                    t.settings = e.settings, t.perm = n, m.filter = s.filter, m.membershipsModel = a.membershipsModel, m.plansModel = l, t.getTargetName = d(a.membersModel, a.teamsModel), t.getPlanPrice = function(e) {
                        var n;
                        return n = l.findById(e.plan), n && n.price
                    }, t.getStatus = function(e) {
                        return e.info.status
                    }, t.plans = i.chain(l.items).sortBy("price").map(function(n) {
                        return {
                            _id: n._id,
                            label: o.formatPlan(n, e.settings.billing.currency)
                        }
                    }).value(), r()
                }), c(t.selected, t.selectedItems, !0), t.$watch("isSelected", function() {
                    m.filter && t.search && c(t.selected, m.filter(t.memberships, t.search, ["membership"]), t.isSelected)
                }), t.$watch("selected", function() {
                    m.membershipsModel && (t.selectedItems = l(m.membershipsModel, t.selected))
                }, !0), t.$on("$locationChangeStart", r), t.order = t.order || "membership.startDate"
            }
        }
    }]), n.directive("activityList", ["activityService", function(e) {
        return {
            scope: {
                memberships: "="
            },
            restrict: "E",
            replace: !0,
            templateUrl: "/app/organization/members/activityList.html",
            link: function(n) {
                function t() {
                    e.activityPlan(n.memberships).then(function(e) {
                        n.activity = e
                    })
                }
                n.$watchCollection("memberships", t)
            }
        }
    }]), n.directive("activityItem", function() {
        return {
            scope: {
                item: "="
            },
            restrict: "E",
            replace: !0,
            templateUrl: "/app/organization/members/activityItem.html"
        }
    }), n.directive("activityItemsGroup", function() {
        return {
            scope: {
                item: "="
            },
            restrict: "E",
            replace: !0,
            templateUrl: "/app/organization/members/activityItemsGroup.html"
        }
    }), n.directive("paymentsList", ["$rootScope", "data", "$filter", function(e, n, a) {
        return {
            scope: {
                member: "=",
                team: "=",
                selectedItems: "="
            },
            restrict: "E",
            replace: !0,
            templateUrl: "/app/organization/billing/paymentsList.html",
            link: function(o) {
                var i = this,
                    s = a("invoiceFilter");
                o.search = {
                    issueMonth: t.today()
                }, o.selected = {}, o.isSelected = !1, o.addInvoice = function() {
                    e.$broadcast("add-invoice")
                }, o.exportInvoice = function(e) {
                    i.invoicesModel.exportInvoices(e, null, !0)
                }, n.get("org", "org-perm", "plansModel", "invoicesModel", "mrmModel").spread(function(e, n, t, a, s) {
                    function r() {
                        o.member ? o.payments = i.paymentsModel.forMember(o.member._id) : o.team ? o.payments = i.paymentsModel.forTeam(o.team._id) : o.payments = i.paymentsModel.items
                    }
                    o.membersModel = s.membersModel, o.currency = e.settings.billing.currency, o.basicInvoicing = "xero" !== e.settings.billing.invoicing, o.orgSlug = e.slug, o.perm = n, i.invoicesModel = a, i.paymentsModel = a.paymentsModel, i.billingSettings = e.settings.billing, o.getTargetName = d(s.membersModel, s.teamsModel), o.$watch("team", r), o.$watch("member", r)
                }), c(o.selected, o.selectedItems, !0), o.$watch("isSelected", function() {
                    var e = s(o.payments, o.search);
                    c(o.selected, e, o.isSelected)
                }), o.$watch("selected", function() {
                    o.selectedItems = l(i.paymentsModel, o.selected)
                }, !0)
            }
        }
    }]), n.filter("invoiceFilter", function() {
        return function(e, n) {
            var t = n && n.startDate,
                a = n && n.endDate,
                o = n && n.issueMonth,
                r = n && n.status,
                l = n && (n.number || "").toLowerCase();
            return i.filter(e, function(e) {
                return (!t || !s(e.date).isBefore(t)) && (!a || !s(e.date).isAfter(a)) && (!l || e.number && e.number.toLowerCase().indexOf(l) >= 0) && (!r || e.status === r) && (!o || e.date && s(e.date).isSame(o, "month"))
            })
        }
    }), n.filter("onlineFilter", function() {
        return function(e, n) {
            return e ? i.filter(e, function(e) {
                var t = r(e);
                return "Online" === n ? t : !t
            }) : void 0
        }
    })
}), define("startEndDatesHelper", ["underscore", "moment", "utils"], function(e, n, t) {
    function a(e) {
        return o(e, 1)
    }

    function o(e, t) {
        return n(e).add(t, "day").toDate()
    }

    function i(n) {
        return e.all(n, function(e) {
            return e.endDate
        })
    }

    function s(e) {
        if (e.length > 0 && !i(e)) throw "Target with not terminated membership cannot be used."
    }

    function r(o, i) {
        var r;
        return r = i ? e.filter(o, function(e) {
            return n(e.startDate).isBefore(i.startDate) && e._id != i._id
        }) : o, 0 === r.length ? t.firstPossibleDate : (s(r), e.chain(r).pluck("endDate").map(function(e) {
            return a(e)
        }).max().value())
    }

    function l(a, i, s) {
        var r;
        return r = i ? e.filter(a, function(e) {
            return n(e.startDate).isAfter(i.startDate) && e._id != i._id
        }) : a, 0 === r.length ? t.lastPossibleDate : e.chain(r).pluck("startDate").map(function(e) {
            return o(e, void 0 !== s ? s : -1)
        }).min().value()
    }

    function c(n, a) {
        var o, i, s;
        return o = e.map(n, function(e) {
            return r(e.info.memberships)
        }), i = a ? a.startDate : t.firstPossibleDate, s = e.chain([i, o]).flatten().max().value()
    }

    function d(e) {
        var n;
        return n = r(e.info.memberships)
    }

    function m(n, a, o) {
        var i, s, l, c;
        return i = d(n), s = r(a.info.memberships), l = o ? o.startDate : t.firstPossibleDate, c = e.chain([l, i, s]).flatten().max().value()
    }

    function u(n, o) {
        var i, s, r, l;
        return i = n && n.startDate, r = i ? a(i) : t.firstPossibleDate, s = o && o.endDate, l = s ? a(s) : t.firstPossibleDate, e.max([r, l])
    }

    function p(n, a, o) {
        var i, s, l;
        return l = a ? r(a.info.memberships, n) : t.firstPossibleDate, s = o ? o.startDate : t.firstPossibleDate, i = e.chain([l, s]).flatten().max().value()
    }

    function f(e, n, a) {
        var o;
        return o = n ? l(n.info.memberships, e) : t.lastPossibleDate
    }

    function g(n, t, a, o) {
        var i, s;
        return i = p(n, t, a), s = r(o.info.memberships, n), i = e.chain([i, s]).flatten().max().value()
    }

    function h(n, t, a, o) {
        var i, s;
        return i = f(n, t, a), s = l(o.info.memberships, n), i = e.chain([i, s]).flatten().min().value()
    }

    function v(e) {
        var n;
        return n = r(e.info.memberships)
    }

    function b(e) {
        var n;
        return n = l(e.info.memberships, null, 0)
    }

    function y(n) {
        return e.chain(n).pluck("startDate").max().value()
    }

    function k(e, a) {
        return a || (a = t.today()), e && n(e).isSameOrAfter(a) ? e : a
    }
    return {
        assignResource: {
            getFirstPossibleStartDateForTeam: c,
            getFirstPossibleStartDateForMember: m,
            getFirstPossibleStartDateForResource: d
        },
        relocate: {
            getFirstPossibleStartDate: u
        },
        editPlan: {
            getFirstPossibleStartDateForTeam: p,
            getLastPossibleEndDateForTeam: f,
            getFirstPossibleStartDateForMember: g,
            getLastPossibleEndDateForMember: h
        },
        assignMember: {
            getFirstPossibleStartDateForMember: v
        },
        editTeam: {
            getFirstPossibleStartDate: b
        },
        terminateMultipleMemberships: {
            getFirstPossibleTerminateDate: y
        },
        getInitialDate: k
    }
}), define("teamDialogs", ["underscore", "app", "alert", "utils", "jquery", "startEndDatesHelper"], function(e, n, t, a, o, i) {
    n.directive("teamDialogs", function() {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "/app/teamDialogs.html",
            controller: ["$scope", "$state", "data", "messageService", "$location", "$q", function(n, s, r, l, c, d) {
                function m() {
                    return o("#team-modal")
                }

                function u(t) {
                    n.team = e.extend({
                        startDate: a.today()
                    }, t), o("#team-modal").modal("show")
                }

                function p(n) {
                    var t, a, o;
                    o = e.chain(n).pluck("info").pluck("memberships").flatten().compact().value(), a = e.some(g.paymentsModel.items, function(n) {
                        return e.some(n.lines, function(n) {
                            return e.some(o, function(e) {
                                return e._id === n.membership
                            })
                        })
                    }), t = {
                        target: n,
                        entityName: "team",
                        entityPlural: "teams",
                        deletedEntities: ["members", "plans", "services", "bookings", "history"],
                        preventDeleteEntities: a && ["invoices"]
                    }, l.promptDelete(t).then(function() {
                        var t, a, o, i, s;
                        return a = e.chain(n).pluck("info").pluck("members").flatten().value(), t = e.chain(n).pluck("info").pluck("memberships").flatten().value(), o = e.chain(n).map(function(n) {
                            return e.where(g.calendarEventsModel.items, {
                                team: n._id
                            })
                        }).flatten().value(), i = e.chain(a).map(function(n) {
                            return e.where(g.permissionsModel.items, {
                                contact: n._id
                            })
                        }).flatten().value(), s = e.chain(a).map(function(n) {
                            return e.where(g.leadsModel.items, {
                                contact: n._id
                            })
                        }).flatten().value(), d.all([g.membershipsModel.remove(t), g.calendarEventsModel.remove(o), g.permissionsModel.remove(i), g.leadsModel.remove(s), g.membersModel.remove(a), g.teamsModel.remove(n)])
                    }).then(function() {
                        var t;
                        t = e.some(n, function(e) {
                            return c.path().indexOf(e._id) >= 0
                        }), t && s.go("organization.manage.community.teams")
                    }).messages({
                        ok: "Team removed successfully.",
                        error: "Unable to remove the team."
                    })
                }

                function f(t) {
                    n.team = e.pick(t, "name", "startDate", "personOfContact", "twitterHandle", "email"), n.team.properties = e.clone(t.properties), n.original = t, n.lastPossibleDate = i.editTeam.getFirstPossibleStartDate(t), n.teamMembers = e.chain(t.info.members).map(function(n) {
                        return e.pick(n, "_id", "name")
                    }).value(), m().modal("show")
                }
                var g = this;
                n.firstPossibleDate = a.firstPossibleDate, n.lastPossibleDate = a.lastPossibleDate, r.get("org", "offices", "teamsModel", "membersModel", "membershipsModel", "calendarEventsModel", "paymentsModel", "permissionsModel", "leadsModel").then(a.spread(function(e, t, a, o, i, s, r, l, c) {
                    n.org = e, n.offices = t, n.teamProperty = e.settings.teamProperty, n.dateFormat = e.settings.calendar.dateFormat, g.membershipsModel = i, g.permissionsModel = l, g.leadsModel = c, g.calendarEventsModel = s, g.membersModel = o, g.teamsModel = a, g.paymentsModel = r
                })), n.cleanUpData = function() {
                    delete n.teamMembers, delete n.team, delete n.original, n.lastPossibleDate = a.lastPossibleDate
                }, n.commitTeam = function() {
                    n.original ? r.get("teamsModel").then(function(e) {
                        return e.update(n.original, n.team)
                    }).then(function() {
                        t.ok("Team updated successfully.")
                    }, function() {
                        t.error("Error occurred while updating the team.")
                    })["finally"](function() {
                        m().modal("hide")
                    }) : r.get("teamsModel").then(function(e) {
                        return e.add(n.team)
                    }).then(function(e) {
                        t.ok("Team added successfully"), s.go("organization.manage.team", {
                            team: e._id
                        })
                    }, function() {
                        t.error("Error occurred while adding team.")
                    })["finally"](function() {
                        m().modal("hide")
                    })
                }, n.$on("add-team", function(e, n) {
                    u(n || {})
                }), n.$on("edit-team", function(e, n) {
                    f(n)
                }), n.$on("delete-teams", function(e, n) {
                    p(n)
                })
            }]
        }
    })
}), define("leadDialogs", ["underscore", "app", "utils", "jquery"], function(e, n, t, a) {
    n.directive("leadDialogs", function() {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "/app/leadDialogs.html",
            controller: ["$scope", "$state", "data", "messageService", "$q", function(n, t, o, i, s) {
                function r(e) {
                    n.contact = {}, n.lead = {}, a("#lead-modal").modal("show")
                }

                function l(e) {
                    i.promptDelete(e.name).then(function() {
                        var n = d.membersModel.findById(e.contact);
                        return s.all([d.membersModel.remove(n), d.leadsModel.remove(e)])
                    }).messages({
                        ok: "Lead removed successfully.",
                        error: "Unable to remove the lead."
                    })
                }

                function c(t) {
                    var o = d.membersModel.findById(t.contact);
                    n.lead = e.pick(t, "startDate", "office", "dealSize", "status"), n.contact = e.pick(o, "name", "email"), n.originalLead = t, n.originalContact = o, a("#lead-modal").modal("show")
                }
                var d = this;
                o.get("org", "offices", "leadsModel", "membersModel").spread(function(e, t, a, o) {
                    n.org = e, n.offices = t, d.leadsModel = a, d.membersModel = o
                }), n.cleanUpData = function() {
                    delete n.originalLead, delete n.originalContact, delete n.lead, delete n.contact
                }, n.commitLead = function() {
                    var e, t;
                    return t = n.contact, e = n.lead, e.name = t.name, e.email = t.email, n.originalContact && n.originalLead ? s.all([d.membersModel.update(n.originalContact, t), d.leadsModel.update(n.originalLead, e)]).messages({
                        ok: "Lead updated successfully.",
                        error: "Error occurred while updating the lead."
                    }) : d.membersModel.add(t).then(function(n) {
                        return e.contact = n._id, d.leadsModel.add(e)
                    }).messages({
                        ok: "Lead added successfully",
                        error: "Error occurred while adding lead."
                    })
                }, n.toMember = function() {
                    var e = n.lead;
                    a("#lead-modal").modal("hide"), n.commitLead().then(function() {
                        o.get("membersModel").then(function(n) {
                            return n.add({
                                name: e.name,
                                email: e.email
                            })
                        }).then(function(e) {
                            t.go("organization.manage.member", {
                                id: e._id
                            })
                        }).messages({
                            ok: "Lead converted successfully.",
                            error: "Error occurred while converting the lead."
                        })
                    })
                }, n.toTeam = function() {
                    var e = n.lead;
                    a("#lead-modal").modal("hide"), n.commitLead().then(function() {
                        o.get("teamsModel").then(function(n) {
                            return n.add({
                                name: e.name,
                                email: e.email
                            })
                        }).then(function(e) {
                            t.go("organization.manage.team", {
                                team: e._id
                            })
                        }).messages({
                            ok: "Lead converted successfully.",
                            error: "Error occurred while converting the lead."
                        })
                    })
                }, n.$on("add-lead", function(e, n) {
                    r(n || {})
                }), n.$on("edit-lead", function(e, n) {
                    c(n)
                }), n.$on("delete-lead", function(e, n) {
                    l(n)
                })
            }]
        }
    })
}), define("membershipHelper", ["underscore", "moment", "utils"], function(e, n, t) {
    function a(e, n) {
        return n ? e ? !!n.plan : !!n.resource : !1
    }
    return {
        areBillingRelatedPropertiesSet: a
    }
}), define("memberDialogs", ["underscore", "app", "alert", "utils", "jquery", "moment", "startEndDatesHelper", "membershipHelper"], function(e, n, t, a, o, i, s, r) {
    n.directive("memberDialogs", ["$q", "formatService", function(n, l) {
        return {
            restrict: "E",
            replace: !0,
            scope: {},
            templateUrl: "/app/memberDialogs.html",
            controller: ["$rootScope", "$scope", "data", "availabilityService", "$state", "$location", "messageService", function(c, d, m, u, p, f, g) {
                function h() {
                    var e, n, t;
                    d.member ? t = A.teamsModel.findById(d.member.team) : (e = d.originalMembership || d.membership, n = A.membersModel.findById(e.member), t = n ? A.teamsModel.findById(n.team) : A.teamsModel.findById(e.team)), t ? (d.membership.startDate || (d.membership.startDate = s.getInitialDate(t.startDate)), d.teamName = t.name) : (d.membership.startDate || (d.membership.startDate = a.today()), delete d.teamName), d.terminate && (d.membership.endDate = a.today()), 1 === d.offices.length && (d.membership.office = d.offices[0]._id)
                }

                function v(e, n, t) {
                    d.isAddContact = e, d.isAddMember = n, d.isEditMember = t
                }

                function b(e) {
                    v(!1, !0, !1), k(e, !0)
                }

                function y(e) {
                    v(!0, !1, !1), k(e, !1)
                }

                function k(n) {
                    d.isAssignPlanFormShown = !1, d.member = {}, d.membership = {}, e.extend(d.member, n), d.plansFilter = function(e) {
                        return "desk" === e.type || "hotdesk" === e.type
                    }, A.watchers.push(d.$watch("member.team", function() {
                        d.membership.team = d.member.team
                    })), h(), o("#member-modal").modal("show")
                }

                function w(n) {
                    v(!1, !1, !0), d.member = e.pick(n, "name", "description", "email", "team"), d.member.properties = e.clone(n.properties), d.originalMember = n, d.originalMembership = n.info.membership, d.membership = d.originalMembership ? x(d.originalMembership) : {
                        member: n._id,
                        team: n.team
                    }, d.isAssignPlanFormShown = !!d.originalMembership, d.plansFilter = d.plansFilter = function(e) {
                        return "desk" === e.type || "hotdesk" === e.type
                    }, h(), o("#member-modal").modal("show")
                }

                function M(t) {
                    var a, o;
                    o = e.some(A.paymentsModel.items, function(n) {
                        return e.some(n.lines, function(n) {
                            var a = A.membershipsModel.findById(n.membership);
                            return a && e.some(t, function(e) {
                                return a.member === e._id
                            })
                        })
                    }), a = {
                        target: t,
                        entityName: "member",
                        entityPlural: "members",
                        deletedEntities: ["plans", "services", "bookings", "history"],
                        preventDeleteEntities: o && ["invoices"]
                    }, g.promptDelete(a).then(function() {
                        var a, o, i, s;
                        return a = e.chain(t).map(function(n) {
                            return e.where(A.membershipsModel.items, {
                                member: n._id
                            })
                        }).flatten().value(), o = e.chain(t).map(function(n) {
                            return e.where(A.calendarEventsModel.items, {
                                member: n._id
                            })
                        }).flatten().value(), s = e.chain(t).map(function(n) {
                            return e.where(A.calendarEventsModel.items, {
                                contact: n._id
                            })
                        }).flatten().value(), i = e.chain(t).map(function(n) {
                            return e.where(A.permissionsModel.items, {
                                contact: n._id
                            })
                        }).flatten().value(), n.all([A.membershipsModel.remove(a), A.calendarEventsModel.remove(o), A.leadsModel.remove(s), A.permissionsModel.remove(i), A.membersModel.remove(t)])
                    }).then(function() {
                        var n;
                        n = e.some(t, function(e) {
                            return f.path().indexOf(e._id) >= 0
                        }), n && p.go("organization.manage.community.members")
                    }).messages({
                        ok: "Member removed successfully.",
                        error: "Unable to remove the member."
                    })
                }

                function S(n) {
                    var t;
                    t = e.some(A.paymentsModel.items, function(t) {
                        return e.some(t.lines, function(t) {
                            return e.some(n, function(e) {
                                return t.membership === e._id
                            })
                        })
                    }), g.promptDelete({
                        target: n,
                        entityName: "membership",
                        entityPlural: "memberships",
                        deletedEntities: ["history"],
                        preventDeleteEntities: t && ["invoices"]
                    }).then(function() {
                        return A.membershipsModel.remove(n)
                    }).messages({
                        ok: "Membership removed successfully.",
                        error: "Unable to remove the membership."
                    })
                }

                function x(n) {
                    return e.pick(n, "_id", "plan", "startDate", "endDate", "office", "resource", "team", "member")
                }

                function D(n) {
                    d.team = n, P(e.filter(n.info.memberships, function(e) {
                        return !e.endDate
                    }))
                }

                function P(n) {
                    d.originalMemberships = n, d.firstPossibleDate = s.terminateMultipleMemberships.getFirstPossibleTerminateDate(n), d.membershipsEndDate = e.max([d.firstPossibleDate, a.today()]), o("#end-multiple-memberships-modal").modal("show")
                }

                function C(e) {
                    return "desk" === e.type || "hotdesk" === e.type || "service" === e.type || "team_room" === e.type
                }

                function z(n, t, a) {
                    var i = t ? function(n) {
                        return e.contains(t, n.type)
                    } : void 0;
                    n.team ? (d.team = A.teamsModel.findById(n.team), d.plansFilter = t ? i : C) : (d.member = A.membersModel.findById(n.member), d.plansFilter = d.plansFilter = function(e) {
                        return "desk" === e.type || "hotdesk" === e.type
                    }), d.originalMembership = n, d.membership = x(n), d.terminate = a, h(), o("#membership-modal").modal("show")
                }

                function $(n) {
                    d.membership = e.extend({}, n), d.plansFilter = C, h(), o("#membership-modal").modal("show")
                }

                function I(n, t) {
                    var a = e.clone(t);
                    return "" === a.office && (a.office = null), "" === a.resource && (a.resource = null), "" === a.plan && (a.plan = null), n ? A.membershipsModel.update(n, a) : A.membershipsModel.add(a)
                }

                function _(n) {
                    var t, a, o, i, s, r;
                    return a = n.name, o = e.findWhere(A.rooms, {
                        _id: n.room
                    }), i = o ? ", " + o.name : "", s = o ? e.findWhere(d.offices, {
                        _id: o.office
                    }) : null, r = s ? ", " + s.name : "", t = a + i + r
                }

                function T(n, t, a, i) {
                    var r, c, m;
                    d.originalMembership = n, d.selectedShape = i, n && (r = s.relocate.getFirstPossibleStartDate(n, t), c = s.getInitialDate(r), m = _(a), d.plans = e.chain(A.plans).filter(function(e) {
                        return "desk" === e.type
                    }).sortBy("price").map(function(e) {
                        return {
                            _id: e._id,
                            label: l.formatPlan(e, A.currency)
                        }
                    }).value(), d.membership = e.extend({
                        startDate: c,
                        office: n.office || d.offices[0]._id,
                        resource: a._id,
                        relocateMinDate: r,
                        newLocation: m
                    }, e.pick(n, "plan", "member", "team"))), o("#relocate-modal").modal("show")
                }
                var A = this;
                A.watchers = [], m.get("org", "offices", "mrmModel", "calendarEventsModel", "paymentsModel", "resourcesModel", "rooms", "plans", "permissionsModel", "leadsModel").spread(function(e, n, t, a, o, i, s, r, l, c) {
                    A.membershipsModel = t.membershipsModel, A.calendarEventsModel = a, A.membersModel = t.membersModel, A.teamsModel = t.teamsModel, A.paymentsModel = o, A.resourcesModel = i, A.permissionsModel = l, A.leadsModel = c, A.currency = e.settings.billing.currency, A.rooms = s, A.plans = r, d.dateFormat = e.settings.calendar.dateFormat, d.originalTeams = A.teamsModel.items, d.offices = n, d.settings = e.settings, d.teamProperty = e.settings.teamProperty, d.customProperties = e.customProperties
                }), d.confirmRelocate = function() {
                    var e, o, s;
                    e = d.originalMembership, o = i(d.membership.startDate).subtract(1, "day").toDate(), s = d.selectedShape;
                    var r = [];
                    i(d.originalMembership.startDate).isSameOrAfter(a.today()) ? r.push(A.membershipsModel.update(e, {
                        office: d.membership.office,
                        resource: d.membership.resource
                    })) : (r.push(A.membershipsModel.add(d.membership)), r.push(A.membershipsModel.update(e, {
                        endDate: o
                    }))), n.all(r).then(function() {
                        c.$broadcast("relocate-complete", s), t.ok("Member moved successfully")
                    }, function() {
                        t.error("Error occurred while moving member.")
                    })
                }, d.isMemberValid = function() {
                    return d.member && d.member.name && (!d.isMember() || d.isMember() && !d.isAssignPlanFormShown || d.isMember() && d.isAssignPlanFormShown && d.membership && d.areMembershipPropertiesSet() && d.membership.startDate && d.isMembershipValid)
                }, d.isMember = function() {
                    return d.isAddMember || d.isEditMember
                }, d.teamsValueMapper = function(n) {
                    var t = this.dataValueField;
                    n.success(e.findIndex(d.teams, function(e) {
                        return e[t] === n.value
                    }))
                }, d.commitMember = function() {
                    if (d.isEditMember) {
                        var e = [];
                        e.push(A.membersModel.update(d.originalMember, d.member)), d.isAssignPlanFormShown && e.push(I(d.originalMembership, d.membership)), n.all(e).then(function() {
                            t.ok("Member updated successfully.")
                        }, function() {
                            t.error("Error occurred while updating the member.")
                        })
                    } else {
                        var a = A.membersModel.add(d.member);
                        d.isMember() && d.isAssignPlanFormShown && (a = a.then(function(e) {
                            return d.membership.member = e._id, d.membership.team = e.team, A.membershipsModel.add(d.membership)
                        })), a.then(function() {
                            t.ok("Member added successfully")
                        }, function() {
                            t.error("Error occurred while adding member.")
                        })
                    }
                    o("#member-modal").modal("hide")
                }, d.areMembershipPropertiesSet = function() {
                    return r.areBillingRelatedPropertiesSet(c.settings.billing.enabled, d.membership)
                }, d.confirmUpdateMembership = function() {
                    I(d.originalMembership, d.membership).messages({
                        ok: "Membership saved successfully",
                        error: "Failed to save membership"
                    }), o("#membership-modal").modal("hide")
                }, d.confirmEndMemberships = function() {
                    var a;
                    a = e.map(d.originalMemberships, function(e) {
                        return I(e, {
                            endDate: d.membershipsEndDate
                        })
                    }), n.all(a).then(function() {
                        t.ok("Memberships saved successfully")
                    }, function() {
                        t.error("Failed to save memberships")
                    }), o("#end-team-memberships-modal").modal("hide")
                }, d.confirmAddMembership = function() {
                    A.membershipsModel.add(d.membership).then(function() {
                        t.ok("Membership added successfully")
                    }, function() {
                        t.error("Failed to add membership")
                    }), o("#membership-modal").modal("hide")
                }, d.confirmAddMemberships = function() {
                    e.each(d.memberships, function(e) {
                        e.team = d.team, e.office = d.office, e.startDate = d.date.start
                    }), A.membershipsModel.add(d.memberships).then(function() {
                        t.ok("Membership added successfully")
                    }, function() {
                        t.error("Failed to add membership")
                    }), d.onMembershipsAdded && d.onMembershipsAdded(d.team), o("#add-memberships-modal").modal("hide")
                }, d.toggleMode = function() {
                    d.isAssignPlanFormShown = !d.isAssignPlanFormShown
                }, d.cleanUpMember = function() {
                    delete d.member, delete d.originalMember, d.cleanUpMembership(), e.each(A.watchers, function(e) {
                        e()
                    }), A.watchers.splice(0, A.watchers.length)
                }, d.cleanUpMemberships = function() {
                    d.memberships = [{}], delete d.office, delete d.startDate, delete d.team
                }, d.cleanUpMembership = function() {
                    delete d.member, delete d.team, delete d.membership, delete d.originalMembership, delete d.terminate, delete d.plansFilter, delete d.selectedShape
                }, d.cleanUpEndMemberships = function() {
                    delete d.team, delete d.originalMemberships, delete d.membershipsEndDate, delete d.firstPossibleDate
                }, d.$on("add-member", function(e, n) {
                    b(n)
                }), d.$on("add-contact", function(e, n) {
                    y(n)
                }), d.$on("edit-member", function(e, n) {
                    w(n)
                }), d.$on("delete-members", function(e, n) {
                    M(n)
                }), d.$on("end-memberships", function(e, n) {
                    1 === n.memberships.length ? z(n.memberships[0], n.resourceTypes, !0) : P(n.memberships)
                }), d.$on("end-team-memberships", function(e, n) {
                    D(n)
                }), d.$on("edit-membership", function(e, n) {
                    z(n)
                }), d.$on("delete-memberships", function(e, n) {
                    S(n)
                }), d.$on("add-membership-team", function(e, n) {
                    $({
                        team: n._id
                    })
                }), d.$on("approve-plans", function(t, a) {
                    var i = [];
                    e.each(a.lead.requestedPlans, function(e) {
                        i.push({
                            plan: e
                        })
                    }), 0 === i.length && i.push({}), d.memberships = i, d.date = {
                        start: a.lead.startDate
                    }, d.team = a.team._id, d.onMembershipsAdded = function(t) {
                        var o = e.findWhere(A.permissionsModel.items, {
                            contact: a.lead.contact
                        });
                        n.all([A.leadsModel.update(a.lead, {
                            status: "won"
                        }), A.permissionsModel.update(o, {
                            role: "Member"
                        }), A.teamsModel.update(A.teamsModel.findById(t), {
                            startDate: d.date.start
                        })]).then(function() {
                            c.$broadcast("lead-approved", {
                                lead: a.lead
                            })
                        })
                    }, o("#add-memberships-modal").modal("show")
                }), d.$on("add-memberships", function(e, n) {
                    d.team = n._id, d.date = {
                        start: a.today()
                    }, o("#add-memberships-modal").modal("show")
                }), d.$on("open-relocate-dialog", function(e, n) {
                    T(n.unselectedMembership, n.selectedMembership, n.selectedResource, n.selectedShape)
                }), d.$watchCollection("originalTeams", function(n, t) {
                    n && (t && n.length > t.length && d.member && !d.member.team && (d.member.team = e.last(e.difference(n, t))._id), d.teams = e.map(n, function(n) {
                        return e.pick(n, "_id", "name")
                    }))
                })
            }]
        }
    }]), n.directive("editPlan", ["$q", "formatService", "sortingService", function(n, t, o) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                membership: "=",
                originalMembership: "=",
                filter: "=",
                isMembershipValid: "="
            },
            templateUrl: "/app/editPlan.html",
            controller: ["$rootScope", "$scope", "data", "availabilityService", "$state", "$location", "workstationService", function(n, l, c, d, m, u, p) {
                c.get("mrmModel", "plansModel", "org", "offices", "rooms-by-id", "resourcesModel").then(a.spread(function(a, c, d, m, u, f) {
                    function g() {
                        l.membership ? (b(), l.enableEndDate = !!l.membership.endDate, l.isMembershipActive = h(l.membership), l.updateDesks(), v()) : (delete l.enableEndDate, delete l.firstPossibleDate, delete l.lastPossibleDate, delete l.isMembershipActive)
                    }

                    function h(n) {
                        var t, o, i, s, r, l, d;
                        return d = e.findWhere(c.items, {
                            _id: n.plan
                        }), d && "desk" !== d.type ? !0 : (t = n.resource, o = n.member, r = !0, o && (i = e.chain(a.membershipsModel.items).where({
                            member: o
                        }).sortBy("startDate").last().value(), r = !i || i._id === n._id), l = !0, t && (s = e.chain(a.membershipsModel.items).where({
                            resource: t
                        }).sortBy("startDate").last().value(), l = s._id === n._id), r && l)
                    }

                    function v() {
                        var e, n, t;
                        l.membership && (e = a.teamsModel.findById(l.membership.team), n = a.membersModel.findById(l.membership.member), t = f.findById(l.membership.resource), n ? (l.firstPossibleDate = s.editPlan.getFirstPossibleStartDateForMember(l.membership, t, e, n), l.lastPossibleDate = s.editPlan.getLastPossibleEndDateForMember(l.membership, t, e, n)) : (l.firstPossibleDate = s.editPlan.getFirstPossibleStartDateForTeam(l.membership, t, e), l.lastPossibleDate = s.editPlan.getLastPossibleEndDateForTeam(l.membership, t, e)), l.isMembershipValid = i(l.membership.startDate).isSameOrAfter(l.firstPossibleDate))
                    }

                    function b() {
                        var n = l.filter || function() {
                            return !0
                        };
                        l.plans = e.chain(c.items).filter(n).sortBy("price").map(function(e) {
                            return {
                                _id: e._id,
                                label: t.formatPlan(e, y)
                            }
                        }).value()
                    }
                    l.offices = m, l.settings = d.settings, l.dateFormat = d.settings.calendar.dateFormat, l.getNormalized = o.getNormalized;
                    var y = d.settings.billing.currency;
                    l.isDeskSelectable = function() {
                        var e = n.settings.billing.enabled;
                        return e ? r.areBillingRelatedPropertiesSet(e, l.membership) : !0
                    }, l.toggleEnableEndDate = function() {
                        l.membership && (l.membership.endDate = l.membership.endDate ? null : s.getInitialDate(l.firstPossibleDate, l.membership.startDate))
                    }, l.addDays = function(e, n) {
                        return i(e).add(n, "days").toDate()
                    }, l.updateDesks = function() {
                        var e, n, t, a;
                        e = c.findById(l.membership.plan), a = l.originalMembership && l.originalMembership.resource, e && "desk" !== e.type ? delete l.desks : (n = l.membership && l.membership.startDate, t = l.membership.office, p.assignableDesks(n, t).then(function(e) {
                            var n, o;
                            a && (n = f.findById(a), o = u[n.room], o.office._id === t && e.push({
                                id: n._id,
                                name: [n.name, o.room.name].join(", ")
                            })), l.desks = e
                        }))
                    }, l.$watch("membership", g), l.$watch("membership.resource", v), l.$watch("membership.startDate", v), l.$watch("membership.team", v)
                }))
            }]
        }
    }]), n.directive("addPlans", ["$q", "formatService", "sortingService", function(n, t, a) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                date: "=",
                office: "=",
                memberships: "="
            },
            templateUrl: "/app/addPlans.html",
            controller: ["$rootScope", "$scope", "data", "availabilityService", "$state", "$location", "workstationService", "privateOfficeService", function(n, a, o, i, s, r, l, c) {
                function d(e, n) {
                    var t = a.date && a.date.start;
                    l.assignableDesks(t, n).then(function(e) {
                        a.desks = e
                    })
                }

                function m(e, n, t) {
                    var o = a.date && a.date.start;
                    c.assignableTeamRooms(o, n).then(function(e) {
                        a.teamRooms = e
                    })
                }
                var u = this;
                a.memberships && 0 !== a.memberships.length || (a.memberships = [{}]), a.addMembership = function() {
                    a.memberships.push({})
                }, a.removeMembership = function(e) {
                    var n = a.memberships.indexOf(e);
                    n >= 0 && a.memberships.splice(n, 1)
                }, o.get("org", "offices", "plans", "resources").spread(function(n, o, i, s) {
                    var r = n.settings.billing.currency;
                    u.resources = s, a.settings = n.settings, a.offices = o, a.dateFormat = n.settings.calendar.dateFormat, a.plans = e.chain(i).sortBy("price").map(function(e) {
                        return {
                            _id: e._id,
                            label: t.formatPlan(e, r)
                        }
                    }).value(), a.plansById = e.object(e.pluck(i, "_id"), i), a.office && d(s, a.office)
                }), a.$watch("office", function() {
                    a.office && (d(u.resources, a.office), m(u.resources, a.office))
                })
            }]
        }
    }])
}), define("officeDialogs", ["underscore", "app", "alert", "utils", "jquery"], function(e, n, t, a, o) {
    n.directive("officeDialogs", ["s3Upload", function(n) {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "/app/officeDialogs.html",
            controller: ["$scope", "data", "messageService", function(n, i, s) {
                function r() {
                    return o("#office-modal")
                }

                function l() {
                    n.office = {
                        startDate: a.today()
                    }, r().modal("show")
                }

                function c(t) {
                    n.office = e.pick(t, "name", "description", "image", "isOpen"), n.original = t, r().modal("show")
                }

                function d(e) {
                    s.promptDelete(e.name).then(function() {
                        return i.get("officesModel")
                    }).then(function(n) {
                        return n.remove(e)
                    }).then(function() {
                        i.resetRoomsCache()
                    }).messages({
                        ok: "Location removed successfully.",
                        error: "Failed to remove the location."
                    })
                }
                n.cleanUpData = function() {
                    n.uploading = !1, n.office = void 0, n.original = void 0
                }, n.commitAddOffice = function() {
                    t.ok("Adding new location..."), i.get("officesModel").then(function(e) {
                        return e.add(n.office)
                    }).then(function() {
                        t.ok("Location added successfully")
                    }, function() {
                        t.error("Error occurred while adding location.")
                    }), r().modal("hide")
                }, n.commitEditOffice = function() {
                    t.ok("Saving location..."), i.get("officesModel").then(function(e) {
                        return e.update(n.original, n.office)
                    }).then(function() {
                        t.ok("Location saved successfully")
                    }, function() {
                        t.error("Error occurred while updating location.")
                    }), r().modal("hide")
                }, n.$on("add-office", l), n.$on("edit-office", function(e, n) {
                    c(n)
                }), n.$on("delete-office", function(e, n) {
                    d(n)
                })
            }]
        }
    }])
}), define("paymentDialogs", ["underscore", "app", "alert", "jquery", "utils", "moment", "bookingBilling"], function(e, n, t, a, o, i, s) {
    n.directive("paymentDialogs", ["data", "$http", "billingService", "iso4217", "accountsService", function(n, t, r, l, c) {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "/app/paymentDialogs.html",
            link: function(t) {
                function d() {
                    return e.sum(t.lines, "price") + e.sum(t.additionalLines, "price")
                }

                function m(e) {
                    t.lines = r.invoiceLines(e, b.membershipsModel), t.total = d()
                }

                function u(e) {
                    var n, a, o = t.invoice;
                    b.org && e ? (a = b.org.settings.billing, n = r.createPayment(e, a.date, o, b.paymentsModel, b.mrmModel.membershipsModel, b.calendarEventsModel, b.plansModel), n || (n = {}, e.team ? n.team = e.team._id : n.member = e.member._id, "basic" === a.invoicing && (n.number = b.paymentsModel.nextNumber(), n.method = "bank"), n.status = "draft", n.date = o.issueDate, n.taxType = a.invoicingVat), t.payment && t.payment.number && (n.number = t.payment.number), t.payment = n) : t.payment = {}, m(t.payment)
                }

                function p() {
                    var e, n;
                    e = t.invoice && t.invoice.target, e && (e.team ? n = {
                        team: b.mrmModel.teamsModel.findById(e.team)
                    } : e.member && (n = {
                        member: b.mrmModel.membersModel.findById(e.member)
                    })), u(n)
                }

                function f(n) {
                    t.teams = e.map(b.mrmModel.teamsModel.items, function(n) {
                        return e.pick(n, "_id", "name")
                    }), t.invoicingType = n.invoicing, t.currency = n.currency
                }

                function g(e, n) {
                    v(e), h(e, n)
                }

                function h(n, t) {
                    e.each(n.original, function(e) {
                        e[t] = n[t]
                    })
                }

                function v(e) {
                    e.price = e.unitPrice * e.quantity * (100 - e.discount) / 100, t.total = d()
                }
                var b = this;
                t.currencySymbol = function(e) {
                    var n = l.getCurrencyByCode(e);
                    return n && n.symbol || e
                }, t.onTargetChange = p, n.get("org", "invoicesModel", "plansModel", "mrmModel", "calendarEventsModel").spread(function(e, n, a, o, i) {
                    b.invoicesModel = n, b.paymentsModel = n.paymentsModel, b.mrmModel = o, b.membershipsModel = o.membershipsModel, b.plansModel = a, b.orgSlug = e.slug, b.org = e, t.dateFormat = e.settings.calendar.dateFormat, b.calendarEventsModel = i
                }), t.commitPayment = function() {
                    t.payment.lines = t.payment.lines || [], e.each(t.additionalLines, function(e) {
                        t.payment.lines.push(e)
                    }), b.paymentsModel.add(t.payment).messages({
                        ok: "Invoice added successfully",
                        error: "Error occurred while creating invoice."
                    }).then(function(e) {
                        return e.exporting = !0, b.invoicesModel.exportInvoices(e)["finally"](function() {
                            delete e.exporting
                        })
                    })
                }, t.savePayment = function() {
                    var n;
                    t.payment.lines = t.payment.lines || [], e.each(t.additionalLines, function(e) {
                        t.payment.lines.push(e)
                    }), t.invoice.amount = t.total, n = e.sum(t.payment.lines, function(e) {
                        return e.quantity * e.unitPrice
                    }), t.invoice.discount = 100 * (n - t.total) / n, e.extend(t.originalInvoice, t.invoice), e.extend(t.originalPayment, t.payment)
                }, t.saveCharge = function() {
                    b.paymentsModel.addCharge(t.invoice, t.charge).messages({
                        ok: "Charge added successfully",
                        error: "Faild to add charge"
                    })
                }, t.cleanupCharge = function() {
                    delete t.accounts, delete t.charge, delete t.invoice, delete t.currency
                }, t.$on("add-charge", function(n, o) {
                    t.invoice = o, t.charge = {
                        amount: o.amount - e.sum(o.charges, "amount"),
                        date: i().startOf("day").toDate()
                    }, t.currency = b.org.settings.billing.currency, c.availableAccounts(!0).then(function(e) {
                        t.accounts = e, t.charge.account = e[0]
                    }), a("#add-charge-modal").modal("show")
                }), t.$on("add-invoice", function(e, n) {
                    var r, l;
                    r = b.org.settings.billing, l = b.org.settings.businessHours, f(r), t.invoice = {
                        periodLength: r.invoicingPeriod,
                        invoicingVat: r.invoicingVat,
                        currency: r.currency,
                        lineTemplate: r.lineTemplate,
                        invoicingType: r.invoicing,
                        issueDate: o.today(),
                        periodStart: i(o.today()).add(1, "month").toDate(),
                        discount: 0,
                        target: n,
                        calculateDynamicPrice: function(e, n) {
                            return s.calculateDynamicPrice(e, n, l)
                        }
                    }, p(), t.additionalLines = [], a("#payment-modal").modal("show")
                }), t.$on("edit-invoice", function(n, o) {
                    var i;
                    i = b.org.settings.billing, f(i), t.invoice = e.clone(o), t.payment = e.clone(o.payment), t.originalInvoice = o, t.originalPayment = o.payment, t.additionalLines = [], m(t.payment), a("#payment-modal").modal("show")
                }), t.cleanUpData = function() {
                    delete t.payment, delete t.invoice, delete t.originalInvoice, delete t.originalPayment, delete t.total, delete t.invoicingType, delete t.lines
                }, t.addLine = function() {
                    var e = {
                        quantity: 1,
                        discount: 0,
                        unitPrice: 0
                    };
                    t.additionalLines.push(e), v(e)
                }, t.removeItem = function(n) {
                    var a;
                    a = e.indexOf(t.additionalLines, n), -1 !== a && t.additionalLines.splice(a, 1)
                }, t.quantityChanged = function(n) {
                    var t;
                    n.original && e.some(n.original) && (t = e.sum(e.tail(n.original, 1), "quantity"), n.original[0].quantity = n.quantity - t), v(n)
                }, t.discountChanged = e.partial(g, e, "discount"), t.unitPriceChanged = e.partial(g, e, "unitPrice"), t.issueDateChanged = function() {
                    t.payment.date = t.invoice.issueDate
                }, t.mainDiscountChanged = function() {
                    e.each(t.payment.lines, function(e) {
                        e.discount = t.invoice.discount
                    }), m(t.payment)
                }, t.regenerateLines = p
            }
        }
    }])
}), define("common/charts", ["app", "kendo"], function(e, n) {
    e.factory("chartsService", ["$rootScope", "$filter", function(e, n) {
        function t(n) {
            var t = e.settings && e.settings.billing.currency;
            return t ? s(n, t, 0) : n
        }
        var a = 1,
            o = .8,
            i = "#DF4B38",
            s = n("isoCurrency"),
            r = {
                legend: {
                    visible: !1
                },
                chartArea: {
                    background: "",
                    height: 250
                },
                seriesDefaults: {
                    type: "area",
                    missingValues: "interpolate",
                    categoryField: "date",
                    aggregate: "max",
                    opacity: o
                },
                series: [{
                    field: "occupancyRate",
                    color: "#f69484",
                    labels: {
                        visible: !0,
                        template: "#= kendo.format('{0:P}', value) #"
                    },
                    line: {
                        style: "smooth",
                        color: "black",
                        opacity: 1,
                        width: 1
                    },
                    tooltip: {
                        visible: !0,
                        template: "#= kendo.format('{0:P}', value) # (#= dataItem.occupiedCount # occupied)"
                    }
                }],
                valueAxis: {
                    min: 0,
                    max: 4,
                    labels: {
                        template: "#= kendo.format('{0:P}', value) #"
                    }
                },
                categoryAxis: {
                    baseUnit: "months",
                    baseUnitStep: 1,
                    labels: {
                        dateFormats: {
                            months: "MMMM yyyy"
                        }
                    },
                    majorGridLines: {
                        visible: !1
                    }
                }
            },
            l = {
                legend: {
                    visible: !1
                },
                chartArea: {
                    background: "",
                    height: 250
                },
                seriesDefaults: {
                    type: "area",
                    stack: !0,
                    missingValues: "interpolate",
                    categoryField: "month",
                    labels: {
                        visible: !0
                    },
                    opacity: o
                },
                series: [{
                    field: "cashupancy",
                    color: "#1987b4",
                    labels: {
                        template: "#= kendo.format('{0:P}', value) #",
                        position: "below"
                    },
                    line: {
                        style: "smooth",
                        color: "black",
                        opacity: 1,
                        width: 1
                    },
                    tooltip: {
                        visible: !0,
                        template: "#= kendo.format('{0:P}', value) #"
                    }
                }, {
                    field: "leads",
                    color: i,
                    labels: {
                        template: "#= kendo.format('{0:P}', dataItem.cashupancy + dataItem.leads) #",
                        position: "above"
                    },
                    line: {
                        style: "smooth",
                        color: "black",
                        opacity: 1,
                        width: 1
                    },
                    tooltip: {
                        visible: !0,
                        template: "#= kendo.format('{0:P}', dataItem.cashupancy + dataItem.leads) #"
                    }
                }],
                valueAxis: {
                    min: 0,
                    max: 1.5,
                    labels: {
                        template: "#= kendo.format('{0:P}', value) #"
                    }
                },
                categoryAxis: {
                    baseUnit: "months",
                    baseUnitStep: 1,
                    labels: {
                        dateFormats: {
                            months: "MMMM yyyy"
                        }
                    },
                    majorGridLines: {
                        visible: !1
                    }
                }
            },
            c = {
                legend: {
                    visible: !1
                },
                chartArea: {
                    background: "",
                    height: 250
                },
                seriesDefaults: {
                    type: "area",
                    stack: {
                        type: "100%"
                    },
                    missingValues: "interpolate",
                    categoryField: "month",
                    aggregate: "max",
                    opacity: o
                },
                series: [{
                    field: "occupiedCount",
                    labels: {
                        visible: !0,
                        template: "#= kendo.format('{0:P}', percentage) #"
                    },
                    color: "#9898b7",
                    line: {
                        style: "smooth",
                        color: "black",
                        width: 1
                    },
                    tooltip: {
                        visible: !0,
                        template: "#= kendo.toString(category, 'MMMM yyyy') #: #= kendo.format('{0:P}', percentage) # (#= value #) occupied"
                    }
                }, {
                    field: "availableCount",
                    color: "#3ebeaf",
                    line: {
                        style: "smooth"
                    }
                }],
                valueAxis: {
                    min: 0,
                    max: 1
                },
                categoryAxis: {
                    baseUnit: "months",
                    field: "month",
                    baseUnitStep: 1,
                    labels: {
                        dateFormats: {
                            months: "MMMM yyyy"
                        }
                    },
                    majorGridLines: {
                        visible: !1
                    }
                }
            },
            d = {
                legend: {
                    visible: !1
                },
                chartArea: {
                    background: "",
                    height: 250
                },
                seriesDefaults: {
                    type: "column",
                    stack: !0,
                    overlay: {
                        gradient: "none"
                    },
                    opacity: a
                },
                series: [{
                    labels: {
                        visible: !0,
                        template: function(e) {
                            return t(e.value)
                        },
                        position: "insideEnd"
                    },
                    field: "sum",
                    color: "#1987b4",
                    tooltip: {
                        visible: !0,
                        template: function(e) {
                            return t(e.value)
                        }
                    }
                }, {
                    labels: {
                        visible: !0,
                        template: function(e) {
                            return t(e.dataItem.leads + e.dataItem.sum)
                        }
                    },
                    field: "leads",
                    color: i,
                    tooltip: {
                        visible: !0,
                        template: function(e) {
                            return t(e.value)
                        }
                    }
                }],
                categoryAxis: {
                    baseUnit: "months",
                    field: "month",
                    baseUnitStep: 1,
                    labels: {
                        dateFormats: {
                            months: "MMMM yyyy"
                        }
                    },
                    majorGridLines: {
                        visible: !1
                    }
                },
                valueAxis: {
                    min: 0,
                    labels: {
                        template: function(e) {
                            return t(e.value)
                        }
                    }
                }
            },
            m = {
                legend: {
                    visible: !1
                },
                chartArea: {
                    background: "",
                    height: 200
                },
                seriesDefaults: {
                    type: "column",
                    stack: !0,
                    overlay: {
                        gradient: "none"
                    },
                    opacity: a
                },
                series: [{
                    labels: {
                        visible: !0,
                        template: function(e) {
                            return t(e.value)
                        },
                        position: "insideEnd"
                    },
                    field: "paid",
                    color: "#1caa76",
                    tooltip: {
                        visible: !0,
                        template: function(e) {
                            return "Paid invoices - " + t(e.value)
                        }
                    }
                }, {
                    labels: {
                        visible: !0,
                        template: function(e) {
                            return t(e.value)
                        }
                    },
                    field: "sent",
                    color: "#757596",
                    tooltip: {
                        visible: !0,
                        template: function(e) {
                            return "Awaiting payment invoices - " + t(e.value)
                        }
                    }
                }],
                categoryAxis: {
                    baseUnit: "months",
                    field: "month",
                    baseUnitStep: 1,
                    labels: {
                        dateFormats: {
                            months: "MMMM yyyy"
                        }
                    },
                    majorGridLines: {
                        visible: !1
                    }
                },
                valueAxis: {
                    min: 0,
                    labels: {
                        template: function(e) {
                            return t(e.value)
                        }
                    },
                    line: {
                        visible: !1
                    }
                }
            },
            u = {
                legend: {
                    visible: !1
                },
                chartArea: {
                    background: "",
                    height: 350
                },
                seriesDefaults: {
                    labels: {
                        visible: !0,
                        background: "transparent",
                        template: "#= category #: \n #= kendo.format('{0:P}', percentage) #"
                    }
                },
                series: [{
                    type: "pie",
                    field: "count",
                    categoryField: "text",
                    colorField: "color"
                }],
                tooltip: {
                    visible: !0,
                    template: "${ category } - ${ value }"
                }
            },
            p = {
                legend: {
                    visible: !1
                },
                chartArea: {
                    background: "",
                    height: 300
                },
                seriesDefaults: {
                    labels: {
                        visible: !0,
                        background: "transparent",
                        template: "#= kendo.format('{0:P}', percentage) #"
                    }
                },
                series: [{
                    type: "pie",
                    field: "total",
                    categoryField: "text",
                    colorField: "color"
                }],
                tooltip: {
                    visible: !0,
                    template: function(e) {
                        return t(e.value)
                    }
                }
            },
            f = {
                legend: {
                    visible: !1
                },
                chartArea: {
                    background: "",
                    height: 350
                },
                seriesDefaults: {
                    labels: {
                        visible: !0,
                        background: "transparent",
                        template: '#= category # - \n #= kendo.format("{0:P}", percentage) #'
                    }
                },
                series: [{
                    type: "pie",
                    field: "area",
                    categoryField: "name",
                    colorField: "color"
                }],
                tooltip: {
                    visible: !0,
                    template: "${ category }"
                }
            };
        return {
            hotdeskOccupancy: r,
            cashupancy: l,
            workstationOccupancy: c,
            revenue: d,
            invoices: m,
            workstations: u,
            zones: f,
            plansPie: p
        }
    }])
}), define("resourceDialogs", ["underscore", "app", "alert", "jquery", "utils"], function(e, n, t, a, o) {
    n.directive("resourceDialogs", ["data", "shapeService", "$q", "formatService", "availabilityService", "resourceService", function(n, t, i, s, r, l) {
        var c = {
            "-1": "LG",
            0: "G"
        };
        return {
            restrict: "E",
            replace: !0,
            templateUrl: "/app/resourceDialogs.html",
            link: function(d) {
                function m(n, a) {
                    return n.info.resource ? g.resourcesModel.update(n.info.resource, a).then(function() {
                        t.updateShapeTitle(n), t.updateDeskStatusInfo(n)
                    }) : g.resourcesModel.add(e.extend({
                        room: g.room._id,
                        target: n._id
                    }, e.pick(a, "name", "type", "targetPlan", "parent"))).then(function(e) {
                        t.initDeskResource(n, e)
                    })
                }

                function u(n, t) {
                    var a, o, i, s, r = 0;
                    return e.each(t, function(e) {
                        s = e.name, s && (a = h.exec(s), a && a.length > 2 && (o = parseInt(a[2], 10), o > r && (r = o)))
                    }), i = c[n] || n, i + "-" + (r + 1)
                }

                function p() {
                    var n;
                    g.plansModel && d.resource && (n = d.resource.type, d.plans = e.chain(g.plansModel.items).sortBy("price").where({
                        type: n
                    }).map(function(e) {
                        return {
                            _id: e._id,
                            label: s.formatPlan(e, g.currency)
                        }
                    }).value())
                }

                function f() {
                    var n = d.resource && d.resource.type;
                    d.privateOffices = [], g.resourcesModel && g.room && "desk_tr" === n && (d.privateOffices = e.chain(g.resourcesModel.forRoom(g.room._id)).where({
                        type: "team_room"
                    }).map(function(e) {
                        return {
                            _id: e._id,
                            name: e.name
                        }
                    }).value())
                }
                var g = this,
                    h = /(\w+)-(\d+)/i;
                d.deskTypes = r.deskTypes, n.get("occupancyModel", "plansModel").then(o.spread(function(e, n) {
                    g.resourcesModel = e.resourcesModel, g.plansModel = n
                })), d.confirmResource = function() {
                    var n, t, a, o = g.room;
                    g.shapes ? (t = e.clone(g.resourcesModel.forRoom(o._id)) || [], n = e.map(g.shapes, function(n) {
                        var a, i, s;
                        return i = n.info.resource, i && i.name || !d.multiple ? a = d.resource : (s = u(o.floor, t), a = e.extend({
                            name: s
                        }, d.resource), t.push(a)), m(n, a)
                    }), a = i.all(n).then(function() {
                        d.$broadcast("update-availability")
                    })) : a = g.resourcesModel.update(d.originalResource, d.resource), a.messages({
                        ok: "Resource successfully updated.",
                        error: "Failed to update resource."
                    })
                }, d.canUpdateDesk = function() {
                    var e = d.resource && d.resource.type,
                        n = "desk_tr" === e;
                    return e && (!n || d.resource.parent)
                }, d.changeSelectedType = function(e) {
                    d.resource.targetPlan = null, d.resource.parent = null, d.resource.type = e
                }, d.$on("edit-resource", function(n, t) {
                    var o, i;
                    o = t.resource, g.room = t.room, i = ["type", "targetPlan", "description", "image", "parent", "color", "public"], o ? d.originalResource = o : (g.shapes = t.shapes, d.multiple = g.shapes.length > 1, o = g.shapes[0].info.resource || {}), d.multiple || i.push("name"), d.resource = e.pick(o, i), p(), f(), "team_room" === o.type ? a("#team-room-modal").modal("show") : "meeting_room" === o.type ? a("#meeting-room-modal").modal("show") : (d.multiple || (d.resource.name = o.name || u(g.room.floor, g.resourcesModel.forRoom(g.room._id))), a("#desk-modal").modal("show"))
                }), d.$on("delete-resource", function(e, n) {
                    l.tryDeleteResources(n).messages({
                        ok: "Resource remove successfully.",
                        error: "Failed to remove resource."
                    })
                }), d.cleanUpResource = function() {
                    delete d.resource, delete d.originalResource, delete d.multiple, delete g.shapes, delete g.room
                }, d.$watch("resource.type", function() {
                    p(), f()
                })
            }
        }
    }])
}), define("moveDialogs", ["underscore", "app", "alert", "jquery", "utils", "moment", "startEndDatesHelper", "membershipHelper"], function(e, n, t, a, o, i, s, r) {
    n.directive("moveDialogs", ["$rootScope", "data", "availabilityService", "formatService", "$q", "workstationService", function(n, l, c, d, m, u) {
        return {
            restrict: "E",
            replace: !0,
            scope: {},
            templateUrl: "/app/moveDialogs.html",
            link: function(c) {
                function m(n) {
                    return e.chain(n.info.memberships).filter(function(n) {
                        return e.contains(P, n.plan)
                    }).all(function(e) {
                        return e.endDate
                    }).value()
                }

                function u(e) {
                    var n, t;
                    return n = !e.info.membership, t = m(e), n || t
                }

                function p(n) {
                    c.members = e.chain(C.membersModel.items).filter(function(e) {
                        return u(e) && e.team === n
                    }).map(function(e) {
                        var n = e.info.teamName;
                        return {
                            _id: e._id,
                            name: e.name,
                            team: n,
                            label: e.name + (n ? ", " + n : "")
                        }
                    }).value()
                }

                function f(n) {
                    c.plans = e.chain(C.plansModel.items).where({
                        type: n
                    }).sortBy("price").map(function(e) {
                        return {
                            _id: e._id,
                            label: d.formatPlan(e, C.currency)
                        }
                    }).value(), P = e.pluck(c.plans, "_id")
                }

                function g() {
                    var e, n;
                    e = c.selectedCustomer.team, e ? (n = C.teamsModel.findById(e), h(n.info.memberships), p(e)) : c.existingMemberships = {}, c.firstPossibleDate = s.assignResource.getFirstPossibleStartDateForTeam(C.targetResources, n), c.membership.startDate = s.getInitialDate(c.firstPossibleDate)
                }

                function h(n) {
                    c.existingMemberships = {}, c.existingMemberships.items = e.chain(n).filter(function(n) {
                        return e.contains(P, n.plan) && !n.resource && !n.endDate
                    }).map(function(e) {
                        var n = C.membersModel.findById(e.member),
                            t = n ? " (" + n.name + ")" : "";
                        return {
                            _id: e._id,
                            label: k(e) + t
                        }
                    }).value(), c.existingMemberships.areThereAny = c.existingMemberships.items.length > 0 && !c.multiple, c.existingMemberships.formShown = c.existingMemberships.areThereAny
                }

                function v() {
                    var e, n, t, a;
                    n = c.selectedCustomer.member, t = c.selectedCustomer.team, e = C.membersModel.findById(n), a = C.teamsModel.findById(t), e ? (e.team || h(e.info.memberships), M() && (c.firstPossibleDate = s.assignResource.getFirstPossibleStartDateForMember(C.targetResources[0], e, a), c.membership.startDate = s.getInitialDate(c.firstPossibleDate))) : a ? (c.firstPossibleDate = s.assignResource.getFirstPossibleStartDateForTeam(C.targetResources, a), c.membership.startDate = s.getInitialDate(c.firstPossibleDate)) : c.existingMemberships = {}
                }

                function b() {
                    var e, n, t;
                    c.isExistingMembershipAssignable = !0, c.existingMemberships && (e = C.membershipsModel.findById(c.existingMemberships.selected), e && (n = C.targetResources[0], t = s.assignResource.getFirstPossibleStartDateForResource(n), i(t).isAfter(e.startDate) && (c.isExistingMembershipAssignable = !1, c.firstPossibleAssignDeskDate = o.formatDate(t))))
                }

                function y() {
                    var e, n, t, a;
                    if (n = c.membership.member, e = C.membersModel.findById(n), a = C.resourcesModel.findById(c.membership.resource), c.isMemberAssignable = !0, e) {
                        t = C.teamsModel.findById(e.team);
                        var r = s.assignMember.getFirstPossibleStartDateForMember(e);
                        i(r).isAfter(c.membership.startDate) && (c.isMemberAssignable = !1, c.firstPossibleAssignMemberDate = o.formatDate(r))
                    }
                }

                function k(e) {
                    var n, t, a;
                    return a = "", e.plan && (n = w(e.plan), a += n + ", "), t = "from " + i(e.startDate).format("ll"), a + t
                }

                function w(e) {
                    var n = C.plansModel.findById(e);
                    return n && d.formatPlan(n, C.currency)
                }

                function M() {
                    return !c.existingMemberships.formShown
                }

                function S(e) {
                    var n, t;
                    return n = C.resourcesModel.findById(e), t = C.roomsById[n && n.room], t && t.office && t.office._id
                }

                function x(n) {
                    var t;
                    c.isAssigningToTeamRoom = !1, f("desk"), p(n.team), c.originalMembership = n, c.membership = e.extend({}, n), c.firstPossibleDate = o.firstPossibleDate, t = C.teamsModel.findById(n.team), c.teamName = t.name, c.planDetails = k(n), C.watchers.push(c.$watch("membership.member", y)), a("#assign-member-modal").modal("show")
                }

                function D(n) {
                    var t, o;
                    t = e.chain(n).pluck("targetPlan").compact().first().value(), C.targetResources = n, o = e.first(n).type, c.isAssigningToTeamRoom = "team_room" === o, f(o), C.watchers.push(c.$watch("selectedCustomer.team", g)), C.watchers.push(c.$watch("selectedCustomer.member", v)), C.watchers.push(c.$watch("existingMemberships.selected", b)), c.membership = {
                        plan: t
                    }, c.selectedCustomer = {}, c.multiple = n.length > 1, a("#move-in-modal").modal("show")
                }
                var P, C = this;
                C.watchers = [], l.get("rooms-by-id", "resourcesModel").then(o.spread(function(e, n) {
                    C.roomsById = e, C.resourcesModel = n
                })), l.get("org", "mrmModel", "plansModel").then(o.spread(function(e, n, t) {
                    c.dateFormat = e.settings.calendar.dateFormat, c.teamProperty = e.settings.teamProperty, c.settings = e.settings, C.currency = e.settings.billing.currency, C.plansModel = t, C.membershipsModel = n.membershipsModel, C.teamsModel = n.teamsModel, C.membersModel = n.membersModel
                })), c.filterMemberFn = u, c.$on("move-in", function(e, n) {
                    D(n)
                }), c.$on("assign-member-to-membership", function(e, n) {
                    x(n)
                }), c.$on("resource-history", function(e, n) {
                    c.activity = n.info.activity, a("#history-modal").modal("show")
                }), c.showNewExistingButtonsForm = function() {
                    var e, n;
                    return e = c.selectedCustomer && !c.selectedCustomer.team && c.selectedCustomer.member, n = c.existingMemberships && c.existingMemberships.areThereAny, n && !e
                }, c.showAssignExistingMembershipForm = function() {
                    c.existingMemberships.formShown = !0
                }, c.hideAssignExistingMembershipForm = function() {
                    c.existingMemberships.formShown = !1
                }, c.hasAssignedTo = function() {
                    return c.hasAssignedTeam() || c.hasAssignedMember()
                }, c.hasAssignedTeam = function() {
                    return c.selectedCustomer && c.selectedCustomer.team
                }, c.hasAssignedMember = function() {
                    return c.selectedCustomer && c.selectedCustomer.member
                }, c.canAssignToMember = function() {
                    var e, n, t;
                    return e = c.multiple, n = c.existingMemberships && c.existingMemberships.formShown, t = c.hasAssignedTeam(), !e && !n && t && !c.isAssigningToTeamRoom
                }, c.canMoveIn = function() {
                    var e, t, a, o, i, s;
                    return o = n.settings && n.settings.billing.enabled, i = o ? r.areBillingRelatedPropertiesSet(o, c.membership) : !0, s = c.membership && c.membership.startDate, e = c.existingMemberships && c.existingMemberships.formShown, t = c.selectedCustomer && (c.selectedCustomer.team || c.selectedCustomer.member), a = c.existingMemberships && c.existingMemberships.selected, !e && t && s && i || e && a && c.isExistingMembershipAssignable
                }, c.canAssignMember = function() {
                    return c.membership && c.membership.member && c.isMemberAssignable
                }, c.confirmMoveIn = function() {
                    var n, a, o, i, s, r;
                    c.existingMemberships.areThereAny && c.existingMemberships.formShown ? (a = C.targetResources[0] && C.targetResources[0]._id, o = C.membershipsModel.findById(c.existingMemberships.selected), i = {
                        resource: a,
                        office: S(a)
                    }, n = C.membershipsModel.update(o, i)) : (s = e.map(C.targetResources, function(n) {
                        return a = n && n._id, r = e.extend({}, c.membership, {
                            resource: a,
                            office: S(a),
                            team: c.selectedCustomer.team,
                            member: c.selectedCustomer.member
                        })
                    }), n = C.membershipsModel.add(s)), n.then(function() {
                        t.ok("Members moved in successfully")
                    }, function() {
                        t.error("Error occurred while moving members in.")
                    })
                }, c.confirmAssignMember = function(e) {
                    C.membershipsModel.update(c.originalMembership, c.membership).then(function() {
                        t.ok("Member assigned successfully")
                    }, function() {
                        t.error("Error occurred while assigning member.")
                    })
                }, c.cleanUp = function() {
                    delete c.membership, e.each(C.watchers, function(e) {
                        e()
                    }), C.watchers.splice(0, C.watchers.length)
                }, c.cleanUpAssignDesk = function() {
                    c.cleanUp(), delete c.existingMemberships, delete c.multiple, delete c.selectedCustomer.team, delete c.selectedCustomer.member
                }
            }
        }
    }])
}), define("exportDialogs", ["underscore", "app", "alert", "utils", "jquery", "moment"], function(e, n, t, a, o, i) {
    n.directive("contactsDialogs", [function() {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "/app/organization/members/contactsDialogs.html",
            controller: ["$scope", function(n) {
                function t(t, i) {
                    var s, r, l;
                    s = e.filter(t, function(e) {
                        return i[e._id] && e.email
                    }), r = a.ArrayToCSV(s, ["name", "email"], ["Name", "Email Address"], ","), l = new Blob([r], {
                        type: "text/csv;charset=utf-8;"
                    }), n.downloadHref = URL.createObjectURL(l), n.emailList = e.pluck(s, "email").join("\n"), o("#contacts-modal").modal("show")
                }
                n.copyToClipboard = function() {
                    o("#contacts-list").select(), document.execCommand("copy")
                }, n.cleanUpContacts = function() {
                    delete n.downloadHref, delete n.emailList
                }, n.$on("export-contacts", function(e, n, a) {
                    t(n, a)
                })
            }]
        }
    }]), n.directive("exportMembersDialogs", [function() {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "/app/organization/members/exportMembersDialogs.html",
            controller: ["$scope", function(n) {
                function t(n) {
                    var t = e.chain(n.info.memberships).pluck("endDate").compact().value();
                    return e.some(t) && e.min(t)
                }

                function s(n) {
                    var t = e.chain(n.info.memberships).pluck("startDate").compact().value();
                    return e.some(t) && e.min(t)
                }

                function r(e, n, t) {
                    return n = n || '"', t = t || n, n + e + t
                }

                function l(e) {
                    return e ? r(i(e).format("ll")) : ""
                }

                function c(i) {
                    var c, d, m, u;
                    i.members ? (n.contactType = "members", u = i.members) : (n.contactType = "companies", u = i.teams), c = e.chain(u).filter(function(e) {
                        return "terminater" !== e.info.status
                    }).map(function(e) {
                        var n = t(e),
                            a = s(e);
                        return {
                            name: e.name || "",
                            email: e.email || "",
                            twitterHandle: e.twitterHandle || "",
                            description: r(e.description || e.twitterInfo && e.twitterInfo.description || ""),
                            team: e.info.teamName || "",
                            startDate: l(a),
                            endDate: l(n)
                        }
                    }).value(), d = i.members ? a.ArrayToCSV(c, ["name", "team", "email", "description", "startDate", "endDate"], ["Name", "Company", "Email Address", "Description", "Start Date", "End Date"], ",") : a.ArrayToCSV(c, ["name", "email", "twitterHandle", "description", "startDate", "endDate"], ["Name", "Email Address", "Twitter", "Description", "Start Date", "End Date"], ","), m = new Blob([d], {
                        type: "text/csv;charset=utf-8;"
                    }), n.membersCount = c.length, n.downloadHref = URL.createObjectURL(m), o("#export-members-modal").modal("show")
                }
                n.cleanUpContacts = function() {
                    delete n.downloadHref
                }, n.$on("export-members", function(e, n) {
                    c(n)
                })
            }]
        }
    }])
}), define("exportDialog", ["underscore", "app", "alert", "utils", "jquery"], function(e, n, t, a, o) {
    n.directive("exportDialog", [function() {
        return {
            restrict: "E",
            replace: !0,
            templateUrl: "/app/exportDialog.html",
            controller: ["$scope", "$metrics", "viewPropertiesService", "data", function(n, t, i, s) {
                n.updatePreviewUrl = function() {
                    s.get("org", "officesModel").then(a.spread(function(t, o) {
                        var s, r, l = "";
                        s = i.toJParams(n.exportOptions, n.viewPropDefs, "preview"), r = e.chain(n.exportOptions).pick("width", "height").map(function(e, n) {
                            return n + "=" + e
                        }).value().concat("name=" + n.room.name), n.room && (l = a.format("/{0}/{1}/{2}/download?{3}", t.slug, o.findById(n.room.office).slug, n.room.slug, s.concat(r).join("&"))), n.downloadUrl = l
                    }))
                }, n.updateExportSize = function(e) {
                    var a, o;
                    a = t.getPageRatio(), o = n.exportOptions, "width" === e ? o.height = Math.round(o.width / a) : o.width = Math.round(o.height * a), n.updatePreviewUrl()
                }, n.$on("open-export", function() {
                    n.exportOptions = e.clone(n.view), n.exportOptions.width = 1920, n.updateExportSize("width"), n.updatePreviewUrl(), o("#export-modal").modal("show")
                })
            }]
        }
    }])
}), define("account/authenticationService", ["app", "underscore", "utils"], function(e, n, t) {
    e.factory("authenticationService", ["$window", "$q", "$injector", function(e, t, a) {
        function o() {
            (!r || r.closed) && e.authReady(!1)
        }

        function i() {
            if (!s) {
                s = t.defer();
                var n = "/connect/xero",
                    a = 1e3,
                    i = 650,
                    c = (window.outerHeight - i) / 2,
                    d = (window.outerWidth - a) / 2;
                r = e.open(n, "Authorize OfficeR&D", "width=" + a + ",height=" + i + ",scrollbars=0,top=" + c + ",left=" + d), l = setInterval(o, 1e3)
            }
            return s.promise
        }
        var s, r, l;
        return e.authReady = function(e) {
            s && (e ? s.resolve() : s.reject(), s = null, r = null), l && (clearInterval(l), l = null)
        }, {
            authXero: function(e) {
                var o = a.get("data");
                return o.get("integrations").then(function(e) {
                    var t = n.find(e, {
                        type: "Xero"
                    });
                    return t
                }).then(function(n) {
                    return e || n && n.enabled ? i() : t.reject({
                        message: "You need to connect your Xero account first"
                    })
                })
            }
        }
    }])
}), define("eventDialogs", ["underscore", "app", "alert", "utils", "jquery", "moment", "bookingBilling"], function(e, n, t, a, o, i, s) {
    n.directive("eventDialogs", [function() {
        return {
            restrict: "E",
            replace: !0,
            templateUrl: "/app/eventDialogs.html",
            link: function(e) {
                e.meetingRoomsDropDownItemTemplate = '<div class="color-box" style="background-color: {{ dataItem.color }}"></div>{{ dataItem.text }}', e.teamsDropDownItemTemplate = '<user-picture class="profile-xs inline" item="dataItem" icon="dataItem.icon"></user-picture><span>{{ dataItem.name }}</span>', e.recurrenceIntervals = a.Constants.RECURRENCE_INTERVALS, e.weekDayEntries = i.localeData("en")._weekdaysMin
            },
            controller: "EventDialogsController"
        }
    }])
}), define("manager/billingDetailsDialogs", ["underscore", "app", "alert", "utils", "jquery", "startEndDatesHelper"], function(e, n, t, a, o, i) {
    n.directive("billingDetailsDialogs", function() {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "/app/billingDetailsDialogs.html",
            controller: "BillingDetailsDialogController"
        }
    })
}), define("leadsController", ["jquery", "underscore", "app", "alert", "utils", "moment"], function(e, n, t, a, o, i) {
    t.controller("LeadsController", ["$scope", "data", "$location", function(e, t, a) {
        function o() {
            var n = a.search();
            e.search = {
                office: n.office,
                status: n.status
            }
        }
        t.get("leadsModel", "membersModel").spread(function(t, a) {
            e.leads = t.items, n.each(e.leads, function(e) {
                var n = a.findById(e.contact);
                e.name = n.name, e.email = n.email
            }), o()
        }), e.$on("$locationChangeStart", o)
    }])
}), define("shapeService", ["angular", "app", "jquery", "underscore", "utils", "moment"], function(e, n, t, a, o, i) {
    n.factory("shapeService", ["updateResourceService", function(e) {
        var n, t = {},
            o = {};
        return n = {
            availabilityAt: e.availabilityAt,
            setModels: function(n, t, a, o, i) {
                var s = i.billing.currency,
                    r = i.space.deskId;
                e.setModels(n, t, a, o, r, s)
            },
            initializeTemplate: e.initializeTemplate,
            register: function(e, n, a) {
                e.uid = Math.random(), t[e.uid] = n, o[e.uid] = a
            },
            getElem: function(e) {
                return t[e.uid]
            },
            isStatic: function(e) {
                return a.contains(e.tags, "layer-floor")
            },
            isText: function(e) {
                return a.contains(e.tags, "text")
            },
            isPrivate: function(e) {
                return e.isPrivate
            },
            initDeskResource: function(e, n) {
                var t, a;
                t = e.info = e.info || {}, n ? (a = n.info = n.info || {}, t.resource = n, t["resource-id"] = n._id, a.shape = e) : delete t.resource, this.updateDeskStatusInfo(e)
            },
            updateDeskStatusInfo: function(n) {
                var t, a;
                if (t = n.info = n.info || {}, a = t.resource) {
                    var o = e.getStrategyByDeskType(a.type);
                    o.updateStatus(t), o.updateMemberInfo(t), this.updateShapeTitle(n), this.updateShapeStatus(n)
                }
            },
            updateShapeTitle: function(e) {
                var n, t, o;
                n = e.title || e.name, t = e.info = e.info || {}, this.isPrivate(e) ? (o = t.resource && t.resource.name, t.title = a.compact([o, t.memberFullName]).join(" - ")) : t.title = n
            },
            updateShapeStatus: function(e) {
                if (e.id) {
                    var n = o[e.uid];
                    n && n()
                }
            }
        }
    }])
}), define("updateResourceService", ["app", "underscore", "utils", "moment"], function(e, n, t, a) {
    e.factory("updateResourceService", ["availabilityService", "$sce", "activityService", "resourceHelperService", function(e, o, i, s) {
        function r() {
            return a().startOf("day").toDate()
        }

        function l(e, n, t, a, o, i) {
            M = e, S = n, x = t, D = a, P = o, $ = i
        }

        function c(e) {
            e = e || "", C = n.map(e.split(","), function(e) {
                return e.trim()
            })
        }

        function d(e, n) {
            return "plan" === n ? e[n] : o.trustAsHtml(e[n])
        }

        function m(e, t) {
            var a;
            return e && (a = n.clone(e), a.price = a.price / t), a
        }

        function u(e) {
            e.memberName = "", e.memberFullName = "", e.team = "", e.teamId = "", e.plan = "", e.id = "", e.line1 = "", e.line2 = "", delete e.teamImage, delete e.member, delete e.image
        }

        function p(e) {
            u(e), P && (e.id = e.resource && e.resource.name)
        }

        function f(e) {
            var t, a, o, i, r, l, c, u, f;
            o = "", c = C[0], u = C[1], f = "plan" === c || "plan" === u, p(e), f && (t = D.findById(e.resource.parent), l = n.filter(D.items, {
                parent: t._id
            }).length, a = t.info.membership, a && (i = m(x.findById(a.plan), l)), r = m(x.findById(t.targetPlan), l), o = s.getPlanLabel(i, r, $, !0)), e.plan = o, e.line1 = d(e, c), e.line2 = d(e, u)
        }

        function g(e) {
            p(e);
            var n, t, a, o, i;
            o = "", t = C[0], a = C[1], n = "plan" === t || "plan" === a, i = e.resource && x && x.findById(e.resource.targetPlan), n && i && (o = s.getPlanLabel(null, i, $, !0)), e.plan = o, e.line1 = d(e, t), e.line2 = d(e, a)
        }

        function h(e, n) {
            e.status = n, delete e.futureActivity, delete e.membership
        }

        function v(t) {
            var a, o;
            a = e.getStatus(t.resource, r(), D), o = t.resource && t.resource.info, t.status = a.name, t.membership = a.membership, o && (t.activity = i.activity(o.memberships, "desk"), t.futureActivity = n.filter(t.activity, function(e) {
                return z.isBefore(e.date)
            }))
        }

        function b(n) {
            var t;
            D && (t = e.getStatus(n.resource, r(), D), n.status = t.name, n.membership = t.membership)
        }

        function y(e) {
            var n, a, o, i, r, l, c, m = C[0],
                u = C[1];
            o = e, c = "plan" === m || "plan" === u, S && M && x && (r = o.membership, n = M.findById(r.member), a = S.findById(r.team), n ? (o.image = n.actualImage, o.member = n._id, o.memberName = n.name || "", a = S.findById(n.team), o.team = a && a.name, o.teamId = a && a._id, o.memberFullName = o.team ? t.format("{0}, {1}", o.memberName, o.team) : o.memberName, i = c && r && r.plan) : a && (o.image = a.twitterInfo && a.twitterInfo.imageUrl, o.team = a.name, o.teamId = a._id, i = c && r && r.plan), a && (o.teamImage = a.twitterInfo && a.twitterInfo.imageUrl), P && (o.id = o.resource && o.resource.name), c && (i = i && x.findById(i), l = o.resource && x.findById(o.resource.targetPlan), o.plan = s.getPlanLabel(i, l, $, !0)), o.line1 = d(o, m), o.line2 = d(o, u))
        }

        function k(e) {
            function n(e) {
                u(e), y(e)
            }
            var t = {
                available: {
                    updateMemberInfo: g
                },
                availableFrom: {
                    updateMemberInfo: n
                },
                occupied: {
                    updateMemberInfo: n
                },
                occupiedFrom: {
                    updateMemberInfo: n
                }
            };
            return t[e]
        }

        function w(e) {
            var n = {
                desk: {
                    updateStatus: v,
                    updateMemberInfo: function(e) {
                        k(e.status).updateMemberInfo(e)
                    }
                },
                hotdesk: {
                    updateStatus: function(e) {
                        h(e, "hotdesk")
                    },
                    updateMemberInfo: g
                },
                desk_tr: {
                    updateStatus: b,
                    updateMemberInfo: f
                },
                desk_na: {
                    updateStatus: function(e) {
                        h(e, "desk_na")
                    },
                    updateMemberInfo: p
                }
            };
            return n[e]
        }
        var M, S, x, D, P, C, z, $;
        return z = a().startOf("day"), {
            getStrategyByDeskType: w,
            setModels: l,
            availabilityAt: r(),
            initializeTemplate: c
        }
    }]), e.factory("resourceHelperService", ["$sce", "formatService", function(e, n) {
        function t(t, a, o, i) {
            var s, r, l;
            return l = "", t && (s = n.formatPlan(t, o, i), l += s), a && (r = n.formatPlan(a, o, i), l += '<span class="target-price"> (' + r + ")</span>"), e.trustAsHtml(l)
        }
        return {
            getPlanLabel: t
        }
    }])
}), define("common/controllers/billingDetailsDialogController", ["underscore", "app", "alert", "utils", "jquery", "startEndDatesHelper"], function(e, n, t, a, o, i) {
    n.controller("BillingDetailsDialogController", ["$scope", "$state", "data", "messageService", "$q", "stripeService", "$http", function(n, t, a, i, s, r, l) {
        function c() {
            return "card" === n.type ? r.getCardToken(n.card) : "bankAccount" === n.type ? r.getBankAccountToken(n.bankAccount) : void 0
        }

        function d(e) {
            return e && e.name && e.number && e.expDate && e.cvc
        }

        function m(e) {
            return e && e.name && e.type && e.country && e.currency && e.routingNumber && e.accountNumber
        }
        var u, p, f, g, h;
        a.get("teamsModel", "membersModel", "integrations").spread(function(n, t, a) {
            var o, i;
            u = n, p = t, o = e.find(a, {
                type: "Stripe"
            }), i = o && o.enabled && o.settings, i && r.init(i.publishableKey)
        }), n.options = r.options, n.saveDetails = function() {
            n.canSave() && (n.saving = !0, c().then(function(e) {
                return f.update(g, {
                    stripe_token: e
                })
            }).then(function() {
                o("#card-details-modal").modal("hide"), o("#bank-account-details-modal").modal("hide")
            }).messages({
                ok: "Billing details saved",
                error: "Failed to save billing details"
            })["finally"](function() {
                delete n.saving
            }))
        }, n.canSave = function() {
            return "card" === n.type && d(n.card) || "bankAccount" === n.type && m(n.bankAccount)
        }, n.cleanUpData = function() {
            delete n.saving, delete n.type, delete n.card, delete n.bankAccount, delete n.firstAmount, delete n.secondAmount
        }, n.verifyAccount = function() {
            n.saving = !0, f.update(g, {
                stripe_verify_source: h.sourceId,
                stripe_verify_amounts: [n.firstAmount, n.secondAmount]
            }).then(function() {
                o("#verify-bank-account-modal").modal("hide")
            }).messages({
                ok: "Bank account verified successfully",
                error: "Failed to verify bank account"
            })["finally"](function() {
                delete n.saving
            })
        }, n.$on("add-bank-account-details", function(e, t) {
            t.team ? (f = u, g = t.team) : t.member && (f = p, g = t.member), n.type = "bankAccount", n.bankAccount = {
                name: g.name,
                type: r.options.accountTypes[t.team ? 1 : 0].value,
                country: r.options.countries[0].value,
                currency: r.options.currencies[0]
            }, o("#bank-account-details-modal").modal("show")
        }), n.$on("add-card-details", function(e, t) {
            t.team ? (f = u, g = t.team) : t.member && (f = p, g = t.member), n.type = "card", n.card = {
                name: g.name
            }, o("#card-details-modal").modal("show")
        }), n.$on("verify-billing-detail", function(e, n) {
            n.team ? (f = u, g = n.team) : n.member && (f = p, g = n.member), h = n.billingDetail, h && h.bankAccount && o("#verify-bank-account-modal").modal("show")
        })
    }])
}), define("common/controllers/eventDialogsController", ["underscore", "app", "utils", "jquery", "moment", "bookingBilling"], function(e, n, t, a, o, i) {
    n.controller("EventDialogsController", ["$rootScope", "$scope", "data", "calendarConfig", "$state", "dateFormatService", function(n, s, r, l, c, d) {
        function m() {
            var n, t, a, o;
            s.calendarEvent && (n = y.resourcesModel.findById(s.calendarEvent.resourceId), t = y.plansModel.findById(n && n.targetPlan), s.plan = t, s.calendarEvent.plan = t && t._id, o = y.mrmModel.teamsModel.findById(s.selectedCustomer.team), a = o && o.info.activePlans, s.freeMeetingRooms = e.chain(a).map(function(e) {
                return y.plansModel.findById(e.plan)
            }).some(function(e) {
                return e.freeMeetingRooms
            }).value(), s.canCreateRecurrence = s.hasPermissions || s.freeMeetingRooms, (s.freeMeetingRooms || s.calendarEvent.rRule.freq.value) && (s.plan = null, s.calendarEvent.plan = null)), p()
        }

        function u() {
            s.calendarEvent && (s.calendarEvent.end = o(s.calendarEvent.start).add(s.calendarEvent.duration, "hours"))
        }

        function p() {
            var e, n = s.calendarEvent;
            n && (e = o(n.end), n.duration = o.duration(e.diff(n.start)).asHours(), s.eventDurationHumanized = t.humanizeDuration(n.duration)), s.plan && s.calendarEvent && (s.price = i.calculateDynamicPrice(s.calendarEvent, s.plan, s.businessHours), s.total = s.calendarEvent.duration * s.price)
        }

        function f() {
            var e = s.calendarEvent;
            if (s.scheduler && e) {
                var n = s.scheduler.occurrencesInRange(e.start, e.end);
                e.end = o(e.start).add(e.duration, "hours").toDate(), s.roomAvailable = l.isRoomAvailable(e, n)
            }
        }

        function g(e) {
            var n = {
                interval: 1,
                count: 1,
                until: e,
                freq: s.recurrenceIntervals[0],
                weekDays: []
            };
            return n.weekDays[e.getDay()] = !0, n
        }

        function h(n, i) {
            var r = e.pick(n, "_id", "start", "end", "team", "member", "summary");
            s.originalEvent = n, s.meetingRooms = i, s.isGoogleEvent = "Google" === n.source, s.isRecurringEvent = n.rRule, s.idToMeetingRoom = e.object(e.pluck(i, "value"), i), s.allowEdit = !s.isGoogleEvent && !l.isPastEvent(n), s.calendarEvent = r, s.isNew = !r._id, n.rRule ? (n.rRule.freq = e.findWhere(s.recurrenceIntervals, {
                value: n.rRule.freq.value
            }), r.rRule = e.extend({}, e.pick(n.rRule, "interval", "count", "until", "weekDays", "freq", "end"))) : r.rRule = g(n.start), v(), s.selectedCustomer = s.selectedCustomer || {
                team: n.team,
                member: n.member
            }, r.resourceId = n.resourceId || i.length && i[0].value;
            var c = o(r.end);
            r.duration = o.duration(c.diff(r.start)).asHours(), s.eventDurationHumanized = t.humanizeDuration(r.duration), s.rRuleHumanized = s.isRecurringEvent ? t.humanizeRecurrenceRule(s.calendarEvent.rRule) : "", a("#edit-event-modal").modal("show"), m()
        }

        function v() {
            var e;
            e = y.mrmModel.membersModel.findById(n.perm && n.perm.contact), e && (s.selectedCustomer = {
                member: e._id,
                team: e.team
            })
        }
        var b, y = this;
        s.getDates = function(n) {
            var t = e.range(.5, 24, .5);
            return e.map(t, function(e) {
                return o(n).add(e, "hours").toDate()
            })
        }, s.hidden = function() {
            delete s.calendarEvent.rRule, delete s.calendarEvent, delete s.originalEvent.rRule, delete s.originalEvent, delete s.selectedCustomer, b && (b.reject(), b = null)
        }, s.commitEvent = function() {
            b && (s.calendarEvent.team = s.selectedCustomer.team, s.calendarEvent.member = s.selectedCustomer.member, b.resolve(e.clone(s.calendarEvent)), b = null)
        }, s.bookEvent = function() {
            var n = e.clone(s.calendarEvent);
            setTimeout(function() {
                c.go("organization.checkout.meetingrooms", n)
            }, 300), a("#edit-event-modal").modal("hide")
        }, r.get("resourcesModel", "plansModel", "mrmModel", "org", "org-perm").spread(function(n, t, a, o, i) {
            s.hasPermissions = i > 2, s.currency = o.settings.billing.currency, s.dateFormat = o.settings.calendar.dateFormat, s.dateTimeFormat = e.partial(d.getDateTimeFormat, o.settings.calendar), y.resourcesModel = n, y.plansModel = t, y.mrmModel = a, v()
        }), s.$on("edit-event", function(e, n) {
            h(n.event, n.meetingRooms), b = n.deferred
        }), s.$watch("calendarEvent.resourceId", m), s.$watch("selectedCustomer.team", m), s.$watch("selectedCustomer.member", m), s.$watch("calendarEvent.end", p), s.$watch("calendarEvent.start", u), s.$watch("calendarEvent", f, !0)
    }])
}), define("app_init", ["jquery", "angular", "app", "site/signin", "templates", "commonServices", "bootstrap", "accountControllers", "organizationControllers", "membersControllers", "billingControllers", "membersServices", "./common/mrmFilterService", "billingServices", "settingsControllers", "resourcesServices", "calendarServices", "resourcesControllers", "calendarControllers", "spaceControllers", "./designer/main", "commonFilters", "checkinControllers", "kendoWrappers", "commonDirectives", "membersDirectives", "teamDialogs", "leadDialogs", "memberDialogs", "officeDialogs", "paymentDialogs", "./common/charts", "memberDialogs", "teamDialogs", "resourceDialogs", "moveDialogs", "exportDialogs", "exportDialog", "./account/authenticationService", "eventDialogs", "./manager/billingDetailsDialogs", "fileUpload", "leadsController", "shapeService", "updateResourceService", "./common/controllers/billingDetailsDialogController", "calendarKendoUtils", "./common/controllers/eventDialogsController"], function(e, n, t) {
    var a = e("html");
    n.element(a).ready(function() {
        n.bootstrap(a, [t.name])
    })
});